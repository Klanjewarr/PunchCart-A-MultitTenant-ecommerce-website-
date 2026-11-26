import { cn, formatCurrency } from "@/lib/utils";
import  Image  from "next/image";
import Link from "next/link";

interface CheckoutItemProps {
    isLast?: boolean;
    imageUrl?: string | null ;
    name: string;
    productUrl: string;
    tenantUrl: string;
    tenantName: string;
    price: number;
    onRemove: () => void;
}

export const CheckoutItem = ({
    isLast,
    imageUrl,
    name,
    productUrl,
    tenantUrl,
    tenantName,
    price,
    onRemove,
}: CheckoutItemProps) => {
    return (
        <div
            className={cn(
                "grid grid-cols-[8.5rem_1fr_auto] gap-4 pr-4 border-b-2 border-black bg-white hover:bg-neutral-50/50 transition-colors",
                isLast && "border-b-0"
            )}
        >
            <div className="overflow-hidden border-r-2 border-black relative aspect-square w-[8.5rem]">
                <Image 
                    src={imageUrl || "/placeholder.png"}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>

            <div className="py-4 flex flex-col justify-between">
                <div className="space-y-2">
                    <Link href={productUrl}>
                        <h4 className="font-black text-lg text-black hover:text-pink-600 hover:underline transition-colors leading-tight">
                            {name}
                        </h4>
                    </Link>
                    <Link href={tenantUrl} className="inline-block">
                        <span className="inline-flex items-center px-2 py-0.5 border border-black bg-yellow-200 text-xs font-black uppercase tracking-wider text-black shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] hover:bg-yellow-300 transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)]">
                            {tenantName}
                        </span>
                    </Link>
                </div>
            </div>

            <div className="py-4 flex flex-col justify-between items-end">
                <span className="font-black text-base bg-pink-100 border border-black px-2.5 py-0.5 shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] text-black">
                    {formatCurrency(price)}
                </span>
                <button 
                    className="cursor-pointer border border-black bg-red-400 hover:bg-red-500 text-black font-extrabold text-[10px] uppercase px-2.5 py-1 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all font-mono tracking-wider" 
                    onClick={onRemove} 
                    type="button"
                >
                    REMOVE
                </button>
            </div>
        </div>
    )
}