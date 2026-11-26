import { trpc, getQueryClient } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs/server";
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { HeroBanner } from "@/modules/home/ui/components/hero-banner";
import { DEFAULT_LIMIT } from "@/constants";

interface Props{
    searchParams: Promise<SearchParams>;
}

const Page = async ({searchParams}: Props) => {
    const filters = await loadProductFilters(searchParams);

    const queryClient = getQueryClient();
    try {
      await queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
        ...filters,
        category: undefined,
        tenantSlug: undefined,
        limit: DEFAULT_LIMIT,
      }))
    } catch (error) {
      console.error("Failed to prefetch products:", error);
    } 

    const hasActiveFilters = Boolean(
      filters.search || 
      filters.minPrice || 
      filters.maxPrice || 
      (filters.tags && filters.tags.length > 0)
    );

    return ( 
      <div>
        {!hasActiveFilters && <HeroBanner />}
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProductListView />
        </HydrationBoundary>
      </div>
     );
}

export default Page;