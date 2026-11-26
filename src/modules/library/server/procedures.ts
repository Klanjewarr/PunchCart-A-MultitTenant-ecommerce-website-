import z from "zod";

import { DEFAULT_LIMIT } from "@/constants";
import {  Media, Tenant } from "@/payload-types";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

export const libraryRouter = createTRPCRouter({
   getOne: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const ordersData = await ctx.db.find({
        collection: 'orders',
        limit:1,
        pagination:false,
        where: {
          and:[
            {
              product: {
                equals: input.productId,
              }
            },
            {
              user:{
                equals: ctx.session.user.id,
              }
            },
          ]
        },
      });

      const order = ordersData.docs[0];

      if(!order){
        throw new TRPCError({
          code:"NOT_FOUND",
          message: "Order not found"
        })
      }

      const product = await ctx.db.findByID({
        collection: "products",
        id: input.productId,
      });

      if(!product){
        throw new TRPCError({
          code:"NOT_FOUND",
          message: "Product not found",
        })
      }

      return product;
    }),

  getMany: protectedProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
      }),
    )
    .query(async ({ ctx, input }) => {
      const ordersData = await ctx.db.find({
        collection: 'orders',
        depth: 0, // we want to just get ids, without populating
        page: input.cursor,
        limit: input.limit,
        where: {
          user: {
            equals: ctx.session.user.id,
          },
        },
      });

      const productIds = ordersData.docs.map((order)=> order.product);

      const productsData = await ctx.db.find({
        collection: "products",
        pagination:false,
        where: {
          id:{
            in: productIds,
          },
        },
      });

      const uniqueProductIds = Array.from(new Set(productIds));
      const reviewsMap: Record<string, { totalRating: number; count: number }> = {};

      if (uniqueProductIds.length > 0) {
        const allReviews = await ctx.db.find({
          collection: "reviews",
          pagination: false,
          where: {
            product: {
              in: uniqueProductIds,
            },
          },
        });

        allReviews.docs.forEach((review) => {
          const prodId = typeof review.product === "object" && review.product !== null
            ? (review.product as { id: string }).id
            : (review.product as string);
          if (prodId) {
            if (!reviewsMap[prodId]) {
              reviewsMap[prodId] = { totalRating: 0, count: 0 };
            }
            reviewsMap[prodId].totalRating += (review.rating || 0);
            reviewsMap[prodId].count += 1;
          }
        });
      }

      const dataWithSummarizedReviews = productsData.docs.map((doc) => {
        const stats = reviewsMap[doc.id];
        const reviewRating = stats && stats.count > 0
          ? Math.round((stats.totalRating / stats.count) * 10) / 10
          : 0;
        const reviewCount = stats ? stats.count : 0;
        return {
          ...doc,
          reviewRating,
          reviewCount,
        };
      });

      return {
        ...productsData,
        // Use ordersData pagination (the actual paginated query) instead of productsData
        hasNextPage: ordersData.hasNextPage,
        nextPage: ordersData.nextPage,
        totalDocs: ordersData.totalDocs,
        totalPages: ordersData.totalPages,
        docs: dataWithSummarizedReviews.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null },
        }))
      };
    })

});