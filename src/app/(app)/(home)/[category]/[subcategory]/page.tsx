import { DEFAULT_LIMIT } from "@/constants";
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { trpc, getQueryClient } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";


interface Props{
    params:Promise<{
        subcategory: string;
    }>
    searchParams: Promise<SearchParams>;
}

const Page = async ({params, searchParams}: Props) => {
    const {subcategory}= await params;
    const filters = await loadProductFilters(searchParams);

    const queryClient = getQueryClient();
    try {
      await queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
        ...filters,
        category:subcategory,
        tenantSlug: undefined,
        limit:DEFAULT_LIMIT
      }))
    } catch (error) {
      console.error("Failed to prefetch subcategory products:", error);
    } 

    return ( 
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductListView category={subcategory}/>
      </HydrationBoundary>
     );
}
 

export default Page;