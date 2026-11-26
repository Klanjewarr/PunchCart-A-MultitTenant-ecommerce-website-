

import { ChangeEvent } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props{
    minPrice?: string | null;
    maxPrice?: string | null;
    onMinPriceChange: (value:string) => void;
    onMaxPriceChange: (value:string) => void;
}

export const formatAsCurrency = (value:string) =>{
    const numericValue = value.replace(/[^0-9.]/g,"");

    const parts = numericValue.split(".");
    const formmattedValue = parts[0]+(parts.length>1?"."+parts[1]?.slice(0,2):"");
    
    if (!formmattedValue) return "";

    const numberValue = parseFloat(formmattedValue);
    if(isNaN(numberValue)) return "";

    return new Intl.NumberFormat("en-US", {
        style:"currency",
        currency:"USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(numberValue);
};

export const PriceFilter = ({
    minPrice,
    maxPrice,
    onMinPriceChange,
    onMaxPriceChange,
}: Props) =>{
    const handleMinPriceChange = (e:ChangeEvent<HTMLInputElement>) =>{
        const numericValue = e.target.value.replace(/[^0-9]/g,"");
        onMinPriceChange(numericValue);
    }

    const handleMaxPriceChange = (e:ChangeEvent<HTMLInputElement>) =>{
        const numericValue = e.target.value.replace(/[^0-9]/g,"");
        onMaxPriceChange(numericValue);
    }

    return(
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
                <Label className="font-bold text-xs uppercase tracking-wider text-black">
                    Minimum Price
                </Label>
                <Input
                type="text"
                placeholder="$0"
                value={minPrice ? formatAsCurrency(minPrice): ""}
                onChange={handleMinPriceChange}
                className="border-2 border-black rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:outline-none focus-visible:ring-0 focus-visible:border-black focus-visible:shadow-[3px_3px_0px_rgba(0,0,0,1)] focus:bg-pink-100/10 font-medium px-3 h-10 bg-white text-black text-sm"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <Label className="font-bold text-xs uppercase tracking-wider text-black">
                    Maximum Price
                </Label>
                <Input
                type="text"
                placeholder="∞"
                value={maxPrice ? formatAsCurrency(maxPrice): ""}
                onChange={handleMaxPriceChange}
                className="border-2 border-black rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:outline-none focus-visible:ring-0 focus-visible:border-black focus-visible:shadow-[3px_3px_0px_rgba(0,0,0,1)] focus:bg-pink-100/10 font-medium px-3 h-10 bg-white text-black text-sm"
                />
            </div>
        </div>
        
    )
}