import { Suspense } from "react"
import { ProductFilters } from "../components/product-filters"
import { ProductSort } from "../components/product-sort"
import { ProductList, ProductListSkeleton } from "../components/product-list"

interface Props{
    category?: string;
    tenantSlug?: string;
    narrowView?: boolean;
}

export const ProductListView = ({category, tenantSlug, narrowView}:Props) => {
    return(
    <div id="marketplace" className="px-4 lg:px-12 py-8 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-y-3 justify-between pb-3 border-b-2 border-black/10">
            <div className="flex items-center gap-2.5">
                <span className="size-3.5 bg-pink-400 border border-black shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] rotate-45" />
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
                    {category ? `${category.replace(/-/g, " ")} Products` : "Curated Digital Goods"}
                </h2>
            </div>
            <ProductSort />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12">
            <div className="lg:col-span-2 xl:col-span-2">
                <ProductFilters />
            </div>
            <div className="lg:col-span-4 xl:col-span-6">
                <Suspense fallback={<ProductListSkeleton narrowView={narrowView}/>}>
                    <ProductList category={category} tenantSlug={tenantSlug} narrowView={narrowView} />
                </Suspense>
            </div>
        </div>
    </div>
    )
}