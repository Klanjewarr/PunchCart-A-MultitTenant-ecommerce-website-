
import { isSuperAdmin } from '@/lib/access';
import type { CollectionConfig } from 'payload';

export const Reviews: CollectionConfig = {
    slug: "reviews",
        access: {
            read: () => true,
            create: ({ req }) => Boolean(req.user),
            update: ({ req }) => {
                if (isSuperAdmin(req.user)) return true;
                if (!req.user) return false;
                // Users can only update their own reviews
                return {
                    user: {
                        equals: req.user.id,
                    },
                };
            },
            delete: ({ req }) => isSuperAdmin(req.user),
        },
    admin: {
        useAsTitle:"description"
    },

    fields: [
        {
            name: "description",
            type: "textarea",
            required: true,

        },
        {
            name: "rating",
            type: "number",
            required: true,
            min: 1,
            max: 5,
        },
        {
            name:"product",
            type: "relationship",
            relationTo: "products",
            hasMany: false,
            required: true,
        },
        {
            name:"user",
            type: "relationship",
            relationTo: "users",
            hasMany: false,
            required: true,
        },
       
    ],
};