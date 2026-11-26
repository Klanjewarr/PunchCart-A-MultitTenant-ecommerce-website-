"use client";
import { generateTenantURL } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
// import { CheckoutButton } from "@/modules/checkout/ui/components/checkout-button";

const CheckoutButton = dynamic(
    () => import("@/modules/checkout/ui/components/checkout-button").then(
        (mod) => mod.CheckoutButton,
    ),
    {
        ssr: false,
        loading: () => (<Button disabled className="bg-white">
            <ShoppingCartIcon className="text-black" />
        </Button>)
    }
)

interface Props {
    slug: string;
}

export const Navbar = ({ slug }: Props) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }))

    return (
        <nav className="h-20 border-b-2 border-black font-bold bg-white">
            <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
                <Link href={generateTenantURL(slug)} className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                    {data.image?.url && (
                        <Image
                            src={data.image.url}
                            width={36}
                            height={36}
                            className="rounded-full border-2 border-black shrink-0 size-[36px] shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            alt={slug}
                        />
                    )}
                    <p className="text-xl font-black uppercase tracking-tight text-black">{data.name}</p>
                </Link>
                <CheckoutButton hideIfEmpty tenantSlug={slug} />
            </div>
        </nav>
    )
}

export const NavbarSkeleton = () => {
    return (
        <nav className="h-20 border-b-2 border-black font-bold bg-white">
            <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
                <div />
                <Button disabled className="bg-white border-2 border-black">
                    <ShoppingCartIcon className="text-black" />
                </Button>
            </div>
        </nav>
    )
}