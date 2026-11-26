import { useCart } from "../../hooks/use-cart";
import { Button } from "@/components/ui/button";
import { cn, generateTenantURL } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

interface CheckoutButtonProps {
    className?: string;
    hideIfEmpty?: boolean;
    tenantSlug: string;
}

export const CheckoutButton = ({
    className,
    hideIfEmpty,
    tenantSlug,
}: CheckoutButtonProps) => {
    const { totalItems } = useCart(tenantSlug);

    if (hideIfEmpty && totalItems === 0) return null;

    return (
        <Button 
            variant="elevated" 
            asChild 
            className={cn(
                "bg-pink-400 text-black border-2 border-black rounded-none font-bold shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 hover:bg-pink-500 transition-all px-5 py-2", 
                className
            )}
        >
            <Link href={`${generateTenantURL(tenantSlug)}/checkout`} className="flex items-center gap-x-2">
                <ShoppingCartIcon className="w-5 h-5 text-black" />
                <span className="font-black tracking-wider uppercase text-sm">Cart</span>
                {totalItems > 0 && (
                    <span className="bg-yellow-300 text-black border border-black px-1.5 py-0.5 text-xs font-black rounded-none shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                        {totalItems}
                    </span>
                )}
            </Link>
        </Button>
    )
}