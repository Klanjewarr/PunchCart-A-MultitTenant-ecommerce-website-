import { formatCurrency, generateTenantURL } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProductCardProps{
    id: string;
    name: string;
    imageUrl?: string|null;
    tenantSlug:string;
    tenantImageUrl?:string|null;
    reviewRating:number;
    reviewCount:number;
    price:number;
};

export const ProductCard = ({
    id,
    name,
    imageUrl,
    tenantSlug,
    tenantImageUrl,
    reviewRating,
    reviewCount,
    price,
}:ProductCardProps)=>{
    const router = useRouter();

    const handleUserClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        router.push(generateTenantURL(tenantSlug))
    }

    return (
        <Link href={`${generateTenantURL(tenantSlug)}/products/${id}`}>
            <div className="border-2 border-black rounded-sm bg-white overflow-hidden h-full flex flex-col shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all">
                <div className="relative aspect-square border-b-2 border-black bg-neutral-50">
                    <Image
                        alt={name}
                        fill
                        src={imageUrl || "/placeholder.png"}
                        className="object-cover"
                    />
                </div>
                <div className="p-4 flex flex-col gap-3 flex-1">
                    <h2 className="text-lg font-black uppercase tracking-tight line-clamp-2 hover:text-pink-600 transition-colors">{name}</h2>
                    <div className="flex items-center gap-2" onClick={handleUserClick}>
                        {tenantImageUrl && (
                            <Image
                                alt={tenantSlug}
                                src={tenantImageUrl}
                                width={20}
                                height={20}
                                className="rounded-full border-2 border-black shrink-0 size-[20px]"
                            />
                        )}
                        <p className="text-sm underline font-bold uppercase tracking-wider text-muted-foreground hover:text-black transition-colors">{tenantSlug}</p>
                    </div>
                    {reviewCount > 0 && (
                        <div className="flex items-center gap-1 bg-[#FFE066] border border-black px-2 py-0.5 rounded-sm w-fit shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                            <StarIcon className="size-3.5 fill-black text-black" />
                            <p className="text-xs font-black tracking-wider">
                                {reviewRating} ({reviewCount})
                            </p>
                        </div>
                    )}
                </div>
                <div className="p-4 border-t-2 border-black bg-[#F4F4F0] flex items-center justify-between">
                    <div className="relative px-3 py-1 border-2 border-black bg-pink-400 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                        <p className="text-sm font-black tracking-wider text-black">
                            {formatCurrency(price)}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
};

export const ProductCardSkeleton = () => {
    return (
        <div className="w-full aspect-[3/4] border-2 border-black rounded-sm bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden animate-pulse">
            <div className="bg-neutral-200 flex-1 aspect-square border-b-2 border-black" />
            <div className="p-4 flex flex-col gap-3">
                <div className="h-5 bg-neutral-200 rounded-sm w-3/4" />
                <div className="h-4 bg-neutral-200 rounded-sm w-1/2" />
            </div>
            <div className="p-4 border-t-2 border-black bg-[#F4F4F0]">
                <div className="h-7 bg-neutral-200 rounded-sm w-1/3" />
            </div>
        </div>
    )
}