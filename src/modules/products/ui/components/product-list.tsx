"use client"

import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useProductFilters } from "../../hooks/use-product-filters";
import { ProductCard, ProductCardSkeleton } from "./product-card";
import { DEFAULT_LIMIT } from "@/constants";
import { Button } from "@/components/ui/button";
import { InboxIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
    category?: string;
    tenantSlug?: string;
    narrowView?: boolean;
}


export const ProductList = ({ category, tenantSlug, narrowView }: Props) => {
    const [filters] = useProductFilters();

    const trpc = useTRPC();
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useSuspenseInfiniteQuery(trpc.products.getMany.infiniteQueryOptions(
        {
            ...filters,
            category,
            tenantSlug,
            limit: DEFAULT_LIMIT,
        },
        {
            getNextPageParam: (lastPage) => {
                return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
            }
        }

    ));

    if (data.pages?.[0]?.docs.length === 0) {
        return (
            <div className="border-2 border-black rounded-none p-12 flex items-center justify-center flex-col gap-y-4 bg-white w-full shadow-[6px_6px_0px_rgba(0,0,0,1)] text-center">
                <div className="size-16 rounded-full border-2 border-black bg-[#FFE066] flex items-center justify-center shadow-[3px_3px_0px_rgba(0,0,0,1)] mb-2">
                    <InboxIcon className="size-8 text-black" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black">No Products Found</h3>
                <p className="text-sm font-medium text-neutral-600 max-w-md">
                    We couldn&apos;t find any items matching your criteria. Try adjusting your filters or be the first creator to list a product in this section!
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                    <Button
                        asChild
                        variant="elevated"
                        className="bg-pink-400 text-black border-2 border-black rounded-none font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:bg-pink-500 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                    >
                        <Link href="/sign-up">
                            Sell Your Product Here
                        </Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
            narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
            )}>
                {data?.pages.flatMap((page) => page.docs).map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        imageUrl={product.image?.url}
                        tenantSlug={product.tenant?.slug}
                        tenantImageUrl={product.tenant?.image?.url}
                        reviewRating={product.reviewRating}
                        reviewCount={product.reviewCount}
                        price={product.price}
                    />
                ))}
            </div>
            <div className="flex justify-center pt-8">
                {hasNextPage && (
                    <Button
                        disabled={isFetchingNextPage}
                        onClick={() => fetchNextPage()}
                        className="font-medium disabled:opacity-50 text-base bg-white"
                        variant="elevated"
                    >
                        Load more
                    </Button>
                )}
            </div>
        </>
    )
}

export const ProductListSkeleton = ({narrowView}:Props) => {
    return (
        <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
            narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
            )}>
            {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </div>
    )
}