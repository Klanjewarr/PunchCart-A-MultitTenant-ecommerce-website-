"use client";

import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { useCart } from "../../hooks/use-cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { generateTenantURL } from "@/lib/utils";
import { CheckoutItem } from "../components/checkout-items";
import { CheckoutSidebar } from "../components/checkout-sidebar";
import { InboxIcon, LoaderIcon } from "lucide-react";
import { useCheckoutStates } from "../../hooks/use-checkout-states";
import { useRouter } from "next/navigation";


interface CheckoutViewProps {
    tenantSlug: string;
}

export const CheckoutView = ({ tenantSlug }: CheckoutViewProps) => {
    const router = useRouter();
    const [states, setStates]= useCheckoutStates();
    const { productIds, removeProduct, clearCart } = useCart(tenantSlug);

    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const { data, error, isLoading } = useQuery(trpc.checkout.getProducts.queryOptions({
        ids: productIds,
    }));

    const purchase = useMutation(trpc.checkout.purchase.mutationOptions({
        onMutate:()=>{
            setStates({ success: false, cancel: false });
        },
        onSuccess: (data) => {
            window.location.href = data.url;
        },
        onError: (error) => {
            if (error.data?.code ==="UNAUTHORIZED"){
                // TODO: Modify when subdomains enabled
                router.push("/sign-in");
            }

            toast.error(error.message);
        },
    }));

    useEffect(()=>{
        if(states.success){
            setStates({ success: false, cancel: false})
            clearCart();
            queryClient.invalidateQueries(trpc.library.getMany.infiniteQueryFilter())
            router.push("/library")
        }
    }, [
        states.success,
         clearCart,
          router,
         setStates,
         queryClient,
         trpc.library.getMany,
        ]);

    useEffect(() => {
        if (error?.data?.code === "NOT_FOUND") {
            clearCart();
            toast.warning("Invalid products found, cart cleared")
        }
    },[error, clearCart]);

    if(isLoading){
        return(
            <div className="lg:pt-16 pt-4 lg:px-12">
                <div className="border-2 border-black border-dashed flex items-center justify-center p-16 flex-col gap-y-4 bg-[#F4F4F0] w-full rounded-none shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                    <LoaderIcon className="w-10 h-10 text-black animate-spin" />
                    <p className="text-sm font-black uppercase tracking-widest text-black">Verifying Cart Items...</p>
                </div>
            </div>
        )
    }

    if (data?.totalDocs === 0){
          return (
             <div className="lg:pt-16 pt-4 lg:px-12">
                <div className="border-2 border-black border-dashed flex items-center justify-center p-16 flex-col gap-y-4 bg-[#F4F4F0] w-full rounded-none shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                    <div className="p-4 bg-white border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                        <InboxIcon className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-wider text-black mt-2">Your Cart is Empty</h3>
                    <p className="text-sm font-medium text-neutral-600">Looks like you haven&apos;t added any products to your cart yet.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="lg:pt-16 pt-4 lg:px-12">
           <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 lg:gap-16">

            <div className="lg:col-span-4">
                <div className="border-2 border-black rounded-none overflow-hidden bg-white shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                 {data?.docs.map((product, index)=>(   
                    <CheckoutItem
                    key = {product.id}
                    isLast={index === data.docs.length -1}
                    imageUrl = {product.image?.url}
                    name={product.name}
                    productUrl={`${generateTenantURL(product.tenant.slug)}/products/${product.id}`}
                    tenantUrl={generateTenantURL(product.tenant.slug)}
                    tenantName = {product.tenant.name}
                    price={product.price}
                    onRemove={()=>removeProduct(product.id)}
                    />))}
                </div>
            </div>

            <div className="lg:col-span-3">
                <CheckoutSidebar
                total = {data?.totalPrice || 0}
                onPurchase ={()=> purchase.mutate({ tenantSlug, productIds})}
                isCanceled ={states.cancel}
                disabled = {purchase.isPending}
                />
            </div>

           </div>
        </div>
    )
}