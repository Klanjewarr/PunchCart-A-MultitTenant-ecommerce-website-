import { initTRPC, TRPCError } from '@trpc/server';
import { cache } from 'react';
import { getPayload, type Payload } from 'payload';
import config from '@payload-config';
import  superjson  from 'superjson';
import {headers as getHeaders} from 'next/headers';


export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return {};
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Memoized payload instance to avoid repeated cold-start initialization
declare global {
  var _cachedPayloadPromise: Promise<Payload> | undefined;
}

const getCachedPayload = async (): Promise<Payload> => {
  if (!globalThis._cachedPayloadPromise) {
    globalThis._cachedPayloadPromise = getPayload({ config }).catch((err) => {
      globalThis._cachedPayloadPromise = undefined;
      throw err;
    });
  }
  return globalThis._cachedPayloadPromise;
};

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure.use(async({ next })=>{
  const payload = await getCachedPayload();

  return next({ ctx : { db:payload } });
} )

export const protectedProcedure = baseProcedure.use(async({ctx, next})=>{
  const headers = await getHeaders();
  const session = await ctx.db.auth({headers});

  if (!session.user){
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message:"Not authenticated",
    })
  }

  return next({
    ctx:{
      ...ctx,
      session:{
        ...session,
        user:session.user,
      }
    }
  })
})