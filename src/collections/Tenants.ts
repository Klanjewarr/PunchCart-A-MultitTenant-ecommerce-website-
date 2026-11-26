import { isSuperAdmin } from '@/lib/access'
import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  access: {
    read: () => true,
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req, id }) => {
      if (isSuperAdmin(req.user)) return true;
      // Allow tenant members to update their own tenant profile (name, image)
      const userTenantId = req.user?.tenants?.[0]?.tenant;
      const tenantId = typeof userTenantId === 'object' ? userTenantId?.id : userTenantId;
      return tenantId === id;
    },
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  admin: {
    useAsTitle: 'slug',
  },

  fields: [
    {
      name: "name",
      required: true,
      type: "text",
      label: "Store Name",
      admin: {
        description: "This is the name of the store(e.g. Kanchan's Store)",
      }
    },
    {
      name: "slug",
      type: "text",
      index: true,
      required: true,
      unique: true,
      access:{
        update:({req})=>isSuperAdmin(req.user),
      },
      admin: {
        description: "This is the subdomain of the store(e.g. [slug].punchcart.com)",
      }
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "stripeAccountId",
      type: "text",
      required: true,
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
      admin: {
        description: "Stripe Account ID associated with your shop."
      }
    },
    {
      name: "stripeDetailsSubmitted",
      type: "checkbox",
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
      admin: {
        description: "You cannot create products until you submit your Stripe details."
      }
    },
  ],
}
