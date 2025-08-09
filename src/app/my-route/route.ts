import configPromise from '@payload-config'
import { CollectionSlug, getPayload } from 'payload'

export const GET = async (request: Request) => {
  const payload = await getPayload({
    config: configPromise,
  })
  const data = await payload.find({
    collection: 'categories' as CollectionSlug,
  })
  return Response.json(data)
}
