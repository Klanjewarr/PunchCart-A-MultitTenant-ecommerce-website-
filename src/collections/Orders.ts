import { isSuperAdmin } from "@/lib/access";
import type { CollectionConfig } from "payload";

export const Orders: CollectionConfig = {
    slug: 'orders',
    access: {
        read: ({ req }) => {
            if (isSuperAdmin(req.user)) return true;
            if (!req.user) return false;
            // Users can read their own orders
            return {
                user: {
                    equals: req.user.id,
                },
            };
        },
        create: ({ req }) => isSuperAdmin(req.user),
        update: ({ req }) => isSuperAdmin(req.user),
        delete: ({ req }) => isSuperAdmin(req.user),
    },
    admin: {
        useAsTitle: "name",
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: false,
        },
        {
            name: "product",
            type: "relationship",
            relationTo: "products",
            required: true,
            hasMany: false,
        },
        {
            name: "stripeCheckoutSessionId",
            type: "text",
            required: true,
            admin: {
                description:"Stripe checkout session associated with the order"
            }
        },
        {
            name: "stripeAccountId",
            type: "text",
            admin: {
                description:"Stripe account session associated with the order"
            }
        },
    ]
}