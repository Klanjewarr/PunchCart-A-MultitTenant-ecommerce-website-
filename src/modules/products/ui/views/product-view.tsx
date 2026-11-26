"use client";

import { StarRating } from "@/components/star-rating";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, generateTenantURL } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CheckIcon, LinkIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { toast } from "sonner";
import {  RichText } from "@payloadcms/richtext-lexical/react"

const CartButton = dynamic(
    () => import("../components/cart-button").then(
        (mod) => mod.CartButton,
    ),
    {
        ssr: false,
        loading: () => <Button disabled className="flex-1 bg-pink-400">Add to cart</Button>
    }
)


interface ProductViewProps {
    productId: string;
    tenantSlug: string;
}

export const ProductView = ({ productId, tenantSlug }: ProductViewProps) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.products.getOne.queryOptions({ id: productId }));

    const [isCopied, setIsCopied] = useState(false);

    return (
        <div className="px-4 lg:px-12 py-10">
            <div className="border-2 border-black rounded-sm bg-white overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                <div className="relative aspect-[3.9] border-b-2 border-black bg-neutral-50">
                    <Image
                        src={data.cover?.url || "/placeholder.png"}
                        alt={data.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-6">
                    <div className="col-span-4">
                        <div className="p-6 lg:p-8 bg-[#FFE066] border-b-2 border-black">
                            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black leading-none">{data.name}</h1>
                        </div>
                        <div className="border-b-2 border-black flex flex-wrap items-stretch bg-white">
                            <div className="px-6 py-4 flex items-center justify-center border-r-2 border-black bg-white">
                                <div className="relative px-3 py-1.5 border-2 border-black bg-pink-400 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                    <p className="text-base font-black tracking-wider text-black">{formatCurrency(data.price)}</p>
                                </div>
                            </div>

                            <div className="px-6 py-4 flex items-center justify-center border-r-2 border-black bg-white">
                                <Link href={generateTenantURL(tenantSlug)} className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                                    {data.tenant.image?.url && (
                                        <Image
                                            src={data.tenant.image.url}
                                            alt={data.tenant.name}
                                            width={24}
                                            height={24}
                                            className="rounded-full border-2 border-black shrink-0 size-[24px]"
                                        />
                                    )}
                                    <p className="text-sm font-bold uppercase tracking-wider text-neutral-800 underline hover:text-black transition-colors">{data.tenant.name}</p>
                                </Link>
                            </div>

                            <div className="hidden lg:flex px-6 py-4 items-center justify-center bg-white">
                                <div className="flex items-center gap-3">
                                    <StarRating
                                        rating={data.reviewRating}
                                        iconClassName="size-4 text-black fill-black"
                                    />
                                    <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                                        {data.reviewCount} reviews
                                    </p>
                                </div>
                            </div>

                        </div>

                        <div className="block lg:hidden px-6 py-4 items-center justify-center border-b-2 border-black bg-white">
                            <div className="flex items-center gap-3">
                                <StarRating
                                    rating={data.reviewRating}
                                    iconClassName="size-4 text-black fill-black"
                                />
                                <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                                    {data.reviewCount} reviews
                                </p>
                            </div>
                        </div>

                        <div className="p-6 lg:p-8 text-black prose max-w-none prose-sm leading-relaxed">
                            {data.description ? (
                                <RichText data={data.description} />
                            ) : (
                                <p className="font-bold text-muted-foreground italic text-sm">
                                    No description provided.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="col-span-2">
                        <div className="border-t-2 lg:border-t-0 lg:border-l-2 border-black h-full bg-white flex flex-col justify-between">
                            <div className="flex flex-col gap-4 p-6 border-b-2 border-black bg-[#F4F4F0]">
                                <div className="flex flex-row items-center gap-3">
                                    <CartButton
                                        isPurchased={data.isPurchased}
                                        productId={productId}
                                        tenantSlug={tenantSlug}
                                    />
                                    <Button
                                        className="size-12 border-2 border-black bg-white hover:bg-pink-400 text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all font-bold cursor-pointer shrink-0"
                                        onClick={() => {
                                            setIsCopied(true);
                                            navigator.clipboard.writeText(window.location.href);
                                            toast.success("URL copied to clipboard! 📋");

                                            setTimeout(() => {
                                                setIsCopied(false);
                                            }, 1000)
                                        }}
                                        disabled={isCopied}
                                    >
                                        {isCopied ? <CheckIcon className="size-5" /> : <LinkIcon className="size-5" />}
                                    </Button>
                                </div>

                                <p className="text-center font-bold text-xs uppercase tracking-wider text-muted-foreground pt-1">
                                    {data.refundPolicy === "no-refunds"
                                        ? "🔒 No refunds applicable"
                                        : `🛡️ ${data.refundPolicy} money back guarantee`
                                    }
                                </p>
                            </div>

                            <div className="p-6 flex-1 flex flex-col justify-start gap-6 bg-white">
                                <div className="flex items-center justify-between border-b border-black/10 pb-3">
                                    <h3 className="text-base font-black uppercase tracking-wider text-black">Customer Ratings</h3>
                                    <div className="flex items-center gap-1.5 bg-[#FFE066] border border-black px-2 py-0.5 rounded-sm shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] font-bold text-xs text-black uppercase tracking-wider">
                                        <StarIcon className="size-3.5 fill-black text-black" />
                                        <span>{data.reviewRating} ({data.reviewCount})</span>
                                    </div>
                                </div>
                                <div
                                    className="grid grid-cols-[auto_1fr_auto] gap-x-4 gap-y-3.5 mt-2"
                                >
                                    {[5, 4, 3, 2, 1].map((stars) => (
                                        <Fragment key={stars}>
                                            <div className="font-bold text-xs uppercase tracking-wider text-neutral-800 flex items-center whitespace-nowrap">
                                                {stars} {stars === 1 ? "star" : "stars"}
                                            </div>
                                            <div className="flex items-center">
                                                <Progress
                                                    value={data.ratingDistribution[stars]}
                                                    className="h-5 border-2 border-black bg-neutral-100 rounded-none w-full shadow-[1px_1px_0px_rgba(0,0,0,1)] overflow-hidden"
                                                />
                                            </div>
                                            <div className="font-black text-xs text-right tracking-wide text-neutral-800 flex items-center min-w-[32px] justify-end">
                                                {data.ratingDistribution[stars]}%
                                            </div>
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const ProductViewSkeleton = () => {
    return (
        <div className="px-4 lg:px-12 py-10 animate-pulse">
            <div className="border-2 border-black rounded-sm bg-white overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                <div className="relative aspect-[3.9] border-b-2 border-black bg-neutral-200" />
                <div className="grid grid-cols-1 lg:grid-cols-6">
                    <div className="col-span-4 p-8 space-y-6">
                        <div className="h-12 bg-neutral-200 rounded-sm w-3/4 border-2 border-black" />
                        <div className="h-4 bg-neutral-200 rounded-sm w-1/2" />
                    </div>
                </div>
            </div>
        </div>
    )
}