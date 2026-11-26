"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { PriceFilter } from "./price-filter";
import { useProductFilters } from "../../hooks/use-product-filters";
import { TagsFilter } from "./tags-filter";

interface ProductFiltersProps{
    title: string;
    className?: string;
    children: React.ReactNode;
}

const ProductFilter =({title, className, children}:ProductFiltersProps) =>{
    const[isOpen, setIsOpen] = useState(false);

    const Icon = isOpen ? ChevronDownIcon:ChevronRightIcon;

    return(
        <div className={cn("p-4 border-b-2 border-black flex flex-col gap-3 bg-white", className)}>
            <div
            onClick={()=> setIsOpen((current)=>!current)}
            className="flex items-center justify-between cursor-pointer group"
            >
                <p className="font-black uppercase text-xs tracking-wider text-black group-hover:text-pink-600 transition-colors">{title}</p>
                <Icon className="size-4 text-black shrink-0" />
            </div>
            {isOpen && <div className="pt-2 animate-fade-in">{children}</div>}
        </div>
    );
};

export const ProductFilters = () =>{
    const [filters, setFilters]=useProductFilters();

    const hasAnyFilters = Object.entries(filters).some(([key, value])=>{
        if(key=="sort") return false;

        if(Array.isArray(value)){
            return value.length>0;
        }

        if(typeof value==="string"){
            return value!=="";
        }

        return value!== null;
    })

    const onClear = () => {
        setFilters({
            minPrice:"",
            maxPrice:"",
            tags:[],
        })
    }

    const onChange = (key: keyof typeof filters, value:unknown )=>{
        setFilters({...filters, [key]:value});
    }

    return(
        <div className="border-2 border-black rounded-sm bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="p-4 border-b-2 border-black flex items-center justify-between bg-[#FFE066]">
                <p className="font-black uppercase text-sm tracking-wider text-black">Filters</p>
                {hasAnyFilters &&(
                    <button className="underline font-bold text-xs uppercase cursor-pointer text-black hover:text-pink-600 transition-colors" onClick={()=>onClear()} type="button">
                    Clear All
                </button>
                )}
            </div>
            <ProductFilter title="Price" >
               <PriceFilter 
               minPrice={filters.minPrice}
               maxPrice={filters.maxPrice}
               onMinPriceChange={(value)=>onChange("minPrice", value)}
               onMaxPriceChange={(value)=>onChange("maxPrice", value)}
               />
            </ProductFilter>

            <ProductFilter title="Tags" className="border-b-0">
               <TagsFilter
               value={filters.tags}
               onChange={(value)=>onChange("tags", value)}
               />
            </ProductFilter>
        </div>
    )
}