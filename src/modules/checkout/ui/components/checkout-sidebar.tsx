import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { CircleXIcon, ArrowRightIcon } from "lucide-react";

interface CheckoutSidebarProps {
    total:number;
    onPurchase: () => void;
    isCanceled?: boolean;
    disabled ?: boolean
}

export const CheckoutSidebar = ({
    total,
    onPurchase,
    isCanceled,
    disabled ,
}: CheckoutSidebarProps) => {
    return (
        <div className="border-2 border-black rounded-none overflow-hidden bg-white flex flex-col shadow-[6px_6px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between p-6 border-b-2 border-black bg-pink-100/60">
                <h4 className="font-black text-lg uppercase tracking-wider text-black font-mono">Total Due</h4>
                <p className="font-black text-2xl text-black bg-white border-2 border-black px-3 py-1 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                    {formatCurrency(total)}
                </p>
            </div>
            
            <div className="p-6 flex flex-col gap-y-4 bg-white">
                <div className="flex flex-col gap-y-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
                    <div className="flex justify-between">
                        <span>Items Subtotal</span>
                        <span>{formatCurrency(total)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping & Handling</span>
                        <span className="text-green-600 font-extrabold bg-green-50 border border-black px-1 shadow-[1px_1px_0px_rgba(0,0,0,1)]">FREE</span>
                    </div>
                </div>

                <div className="border-t border-black/10 my-2" />

                <Button
                    variant="elevated"
                    disabled={disabled}
                    onClick={onPurchase}
                    size="lg"
                    className="text-sm font-black uppercase tracking-widest w-full bg-pink-400 text-black border-2 border-black rounded-none shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-x-1.5 hover:-translate-y-1.5 hover:bg-pink-500 disabled:opacity-50 transition-all py-7 cursor-pointer flex items-center justify-center gap-x-2"
                >
                    {disabled ? (
                        <span className="flex items-center gap-2">
                            Processing...
                            <span className="size-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        </span>
                    ) : (
                        <>
                            <span>Complete Order</span>
                            <ArrowRightIcon className="w-4 h-4 text-black stroke-[2.5]" />
                        </>
                    )}
                </Button>
            </div>

            {isCanceled && (
                <div className="p-6 flex justify-center items-center border-t-2 border-black bg-red-50">
                   <div className="bg-red-100 border-2 border-black font-extrabold px-4 py-3 rounded-none flex items-center w-full text-black shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                        <div className="flex items-center">
                            <CircleXIcon className="size-6 mr-3 fill-red-500 text-black shrink-0"/>
                            <span className="text-xs uppercase tracking-wider leading-relaxed">Checkout failed. Please check your credentials and try again.</span>
                        </div>
                    </div> 
                </div>
            )}
        </div>
    )
}