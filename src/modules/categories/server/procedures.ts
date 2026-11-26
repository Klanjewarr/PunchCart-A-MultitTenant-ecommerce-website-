import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category } from "@/payload-types";

export type FormattedCategory = Category & {
  subcategories: Category[];
};

// In-memory cache with 5-minute TTL to make category fetches instant (0ms) on SSR/page loads
let cachedCategories: FormattedCategory[] | null = null;
let lastCategoriesFetch = 0;
const CATEGORIES_CACHE_TTL = 1000 * 60 * 5; // 5 minutes

export const categoriesRouter = createTRPCRouter({
  // Define your procedures here
  getMany: baseProcedure.query(async ({ ctx }) => {
    const now = Date.now();
    if (cachedCategories && now - lastCategoriesFetch < CATEGORIES_CACHE_TTL) {
      return cachedCategories;
    }

    const data = await ctx.db.find({
      collection: 'categories',
      depth: 1, // Fetch categories with depth 1
      pagination: false,
      where: {
        parent: {
          exists: false,
        },
      },
      sort: 'name',
    });
    const formattedData: FormattedCategory[] = data.docs.map((doc) => ({
      ...doc,
      subcategories: (doc.subcategories?.docs ?? []).map((subDoc) => ({
        // because of "depth:1" we are confident "subDoc" will be type of "Category" 
        ...(subDoc as Category),
      }))
    }));

    cachedCategories = formattedData;
    lastCategoriesFetch = now;

    return formattedData;
  })

});