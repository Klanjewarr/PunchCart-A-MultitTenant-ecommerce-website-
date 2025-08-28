import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category } from "@/payload-types";


export const categoriesRouter = createTRPCRouter({
  // Define your procedures here
  getMany: baseProcedure.query(async ({ ctx }) => {

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
    const formattedData = data.docs.map((doc) => ({
      ...doc,
      subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
        // because of "depth:1" we are  confident "doc "will be type of  "Category" 
        ...(doc as Category),
      }))
    }));

    return formattedData;
  })

});