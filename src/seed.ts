// use this for category, product, creator, review, and buyer generation: bun run db:seed

import { getPayload } from "payload";
import config from "@payload-config";
import { stripe } from "./lib/stripe";

const categories = [
  {
    name: "All",
    slug: "all",
  },
  {
    name: "Business & Money",
    color: "#FFB347",
    slug: "business-money",
    subcategories: [
      { name: "Accounting", slug: "accounting" },
      { name: "Entrepreneurship", slug: "entrepreneurship" },
      { name: "Gigs & Side Projects", slug: "gigs-side-projects" },
      { name: "Investing", slug: "investing" },
      { name: "Management & Leadership", slug: "management-leadership" },
      { name: "Marketing & Sales", slug: "marketing-sales" },
      { name: "Networking, Careers & Jobs", slug: "networking-careers-jobs" },
      { name: "Personal Finance", slug: "personal-finance" },
      { name: "Real Estate", slug: "real-estate" },
    ],
  },
  {
    name: "Software Development",
    color: "#7EC8E3",
    slug: "software-development",
    subcategories: [
      { name: "Web Development", slug: "web-development" },
      { name: "Mobile Development", slug: "mobile-development" },
      { name: "Game Development", slug: "game-development" },
      { name: "Programming Languages", slug: "programming-languages" },
      { name: "DevOps", slug: "devops" },
    ],
  },
  {
    name: "Writing & Publishing",
    color: "#D8B5FF",
    slug: "writing-publishing",
    subcategories: [
      { name: "Fiction", slug: "fiction" },
      { name: "Non-Fiction", slug: "non-fiction" },
      { name: "Blogging", slug: "blogging" },
      { name: "Copywriting", slug: "copywriting" },
      { name: "Self-Publishing", slug: "self-publishing" },
    ],
  },
  {
    name: "Other",
    slug: "other",
  },
  {
    name: "Education",
    color: "#FFE066",
    slug: "education",
    subcategories: [
      { name: "Online Courses", slug: "online-courses" },
      { name: "Tutoring", slug: "tutoring" },
      { name: "Test Preparation", slug: "test-preparation" },
      { name: "Language Learning", slug: "language-learning" },
    ],
  },
  {
    name: "Self Improvement",
    color: "#96E6B3",
    slug: "self-improvement",
    subcategories: [
      { name: "Productivity", slug: "productivity" },
      { name: "Personal Development", slug: "personal-development" },
      { name: "Mindfulness", slug: "mindfulness" },
      { name: "Career Growth", slug: "career-growth" },
    ],
  },
  {
    name: "Fitness & Health",
    color: "#FF9AA2",
    slug: "fitness-health",
    subcategories: [
      { name: "Workout Plans", slug: "workout-plans" },
      { name: "Nutrition", slug: "nutrition" },
      { name: "Mental Health", slug: "mental-health" },
      { name: "Yoga", slug: "yoga" },
    ],
  },
  {
    name: "Design",
    color: "#B5B9FF",
    slug: "design",
    subcategories: [
      { name: "UI/UX", slug: "ui-ux" },
      { name: "Graphic Design", slug: "graphic-design" },
      { name: "3D Modeling", slug: "3d-modeling" },
      { name: "Typography", slug: "typography" },
    ],
  },
  {
    name: "Drawing & Painting",
    color: "#FFCAB0",
    slug: "drawing-painting",
    subcategories: [
      { name: "Watercolor", slug: "watercolor" },
      { name: "Acrylic", slug: "acrylic" },
      { name: "Oil", slug: "oil" },
      { name: "Pastel", slug: "pastel" },
      { name: "Charcoal", slug: "charcoal" },
    ],
  },
  {
    name: "Music",
    color: "#FFD700",
    slug: "music",
    subcategories: [
      { name: "Songwriting", slug: "songwriting" },
      { name: "Music Production", slug: "music-production" },
      { name: "Music Theory", slug: "music-theory" },
      { name: "Music History", slug: "music-history" },
    ],
  },
  {
    name: "Photography",
    color: "#FF6B6B",
    slug: "photography",
    subcategories: [
      { name: "Portrait", slug: "portrait" },
      { name: "Landscape", slug: "landscape" },
      { name: "Street Photography", slug: "street-photography" },
      { name: "Nature", slug: "nature" },
      { name: "Macro", slug: "macro" },
    ],
  },
];

const tagsList = [
  "Next.js",
  "React",
  "Tailwind CSS",
  "TypeScript",
  "Figma",
  "Framer",
  "SaaS",
  "Templates",
  "Productivity",
  "Fitness",
];

const creators = [
  {
    username: "devstarter",
    email: "devstarter@demo.com",
    name: "DevStarter Labs",
    stripeAccountId: "acct_demo_devstarter",
  },
  {
    username: "pixelcraft",
    email: "pixelcraft@demo.com",
    name: "PixelCraft Design",
    stripeAccountId: "acct_demo_pixelcraft",
  },
  {
    username: "growthhacks",
    email: "growthhacks@demo.com",
    name: "GrowthHacks Studio",
    stripeAccountId: "acct_demo_growthhacks",
  },
  {
    username: "fitpro",
    email: "fitpro@demo.com",
    name: "FitPro Athletics",
    stripeAccountId: "acct_demo_fitpro",
  },
];

const dummyProducts = [
  {
    creatorSlug: "devstarter",
    categorySlug: "web-development",
    parentCategorySlug: "software-development",
    name: "Next.js 15 SaaS Production Starter Kit",
    price: 49,
    refundPolicy: "14-day" as const,
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript", "SaaS"],
  },
  {
    creatorSlug: "devstarter",
    categorySlug: "mobile-development",
    parentCategorySlug: "software-development",
    name: "Fullstack React Native & Expo Boilerplate",
    price: 39,
    refundPolicy: "14-day" as const,
    tags: ["React", "TypeScript", "Templates"],
  },
  {
    creatorSlug: "devstarter",
    categorySlug: "devops",
    parentCategorySlug: "software-development",
    name: "Docker, Kubernetes & Microservices Production Handbook",
    price: 24,
    refundPolicy: "30-day" as const,
    tags: ["Productivity", "Templates"],
  },
  {
    creatorSlug: "pixelcraft",
    categorySlug: "ui-ux",
    parentCategorySlug: "design",
    name: "Enterprise Figma Design System (2,400+ Components)",
    price: 59,
    refundPolicy: "30-day" as const,
    tags: ["Figma", "UI/UX", "Templates"],
  },
  {
    creatorSlug: "pixelcraft",
    categorySlug: "ui-ux",
    parentCategorySlug: "design",
    name: "Minimalist Framer Agency & Portfolio Template",
    price: 29,
    refundPolicy: "14-day" as const,
    tags: ["Framer", "Templates", "Tailwind CSS"],
  },
  {
    creatorSlug: "pixelcraft",
    categorySlug: "3d-modeling",
    parentCategorySlug: "design",
    name: "3D Tech & Abstract Isometric Icons (Blender + PNG)",
    price: 19,
    refundPolicy: "7-day" as const,
    tags: ["Templates"],
  },
  {
    creatorSlug: "growthhacks",
    categorySlug: "entrepreneurship",
    parentCategorySlug: "business-money",
    name: "The $100K Solo Creator Playbook & Operating System",
    price: 27,
    refundPolicy: "30-day" as const,
    tags: ["Productivity", "Templates"],
  },
  {
    creatorSlug: "growthhacks",
    categorySlug: "marketing-sales",
    parentCategorySlug: "business-money",
    name: "High-Converting Cold Email & Sales Copywriting Vault",
    price: 19,
    refundPolicy: "14-day" as const,
    tags: ["Templates"],
  },
  {
    creatorSlug: "growthhacks",
    categorySlug: "personal-finance",
    parentCategorySlug: "business-money",
    name: "Financial Freedom & Multi-Stream Notion Command Center",
    price: 15,
    refundPolicy: "30-day" as const,
    tags: ["Productivity", "Templates"],
  },
  {
    creatorSlug: "fitpro",
    categorySlug: "workout-plans",
    parentCategorySlug: "fitness-health",
    name: "12-Week Hypertrophy Strength Training Protocol",
    price: 35,
    refundPolicy: "30-day" as const,
    tags: ["Fitness"],
  },
  {
    creatorSlug: "fitpro",
    categorySlug: "nutrition",
    parentCategorySlug: "fitness-health",
    name: "Plant-Based High-Protein Athlete Meal Bible",
    price: 19,
    refundPolicy: "14-day" as const,
    tags: ["Fitness"],
  },
];

const seed = async () => {
  const payload = await getPayload({ config });

  console.log("🌱 Starting PunchCart database seeding...");

  // 1. Seed Categories & Subcategories
  const categoryMap = new Map<string, string>(); // slug -> id

  for (const cat of categories) {
    let parentDoc = (
      await payload.find({
        collection: "categories",
        where: { slug: { equals: cat.slug } },
        limit: 1,
      })
    ).docs[0];

    if (!parentDoc) {
      parentDoc = await payload.create({
        collection: "categories",
        data: {
          name: cat.name,
          slug: cat.slug,
          color: cat.color,
          parent: null,
        },
      });
    }
    categoryMap.set(cat.slug, parentDoc.id);

    for (const sub of cat.subcategories || []) {
      let subDoc = (
        await payload.find({
          collection: "categories",
          where: { slug: { equals: sub.slug } },
          limit: 1,
        })
      ).docs[0];

      if (!subDoc) {
        subDoc = await payload.create({
          collection: "categories",
          data: {
            name: sub.name,
            slug: sub.slug,
            parent: parentDoc.id,
          },
        });
      }
      categoryMap.set(sub.slug, subDoc.id);
    }
  }
  console.log("✅ Categories and subcategories verified.");

  // 2. Seed Tags
  const tagMap = new Map<string, string>(); // name -> id
  for (const tagName of tagsList) {
    let tagDoc = (
      await payload.find({
        collection: "tags",
        where: { name: { equals: tagName } },
        limit: 1,
      })
    ).docs[0];

    if (!tagDoc) {
      tagDoc = await payload.create({
        collection: "tags",
        data: { name: tagName },
      });
    }
    tagMap.set(tagName, tagDoc.id);
  }
  console.log("✅ Tags verified.");

  // 3. Seed Admin
  let adminTenant = (
    await payload.find({
      collection: "tenants",
      where: { slug: { equals: "admin" } },
      limit: 1,
    })
  ).docs[0];

  if (!adminTenant) {
    let adminStripeId = "acct_demo_admin";
    try {
      const acc = await stripe.accounts.create({});
      if (acc?.id) adminStripeId = acc.id;
    } catch {
      // Use fallback
    }

    adminTenant = await payload.create({
      collection: "tenants",
      data: {
        name: "admin",
        slug: "admin",
        stripeAccountId: adminStripeId,
        stripeDetailsSubmitted: true,
      },
    });
  }

  const existingAdmin = (
    await payload.find({
      collection: "users",
      where: { username: { equals: "admin" } },
      limit: 1,
    })
  ).docs[0];

  if (!existingAdmin) {
    await payload.create({
      collection: "users",
      data: {
        email: "admin@demo.com",
        password: "demo",
        roles: ["super-admin"],
        username: "admin",
        tenants: [{ tenant: adminTenant.id }],
      },
    });
  }

  // 4. Seed Creator Tenants & Users
  const tenantMap = new Map<string, string>(); // slug -> id

  for (const c of creators) {
    let tenantDoc = (
      await payload.find({
        collection: "tenants",
        where: { slug: { equals: c.username } },
        limit: 1,
      })
    ).docs[0];

    if (!tenantDoc) {
      let stripeAccId = c.stripeAccountId;
      try {
        const acc = await stripe.accounts.create({});
        if (acc?.id) stripeAccId = acc.id;
      } catch {
        // Fallback
      }

      tenantDoc = await payload.create({
        collection: "tenants",
        data: {
          name: c.name,
          slug: c.username,
          stripeAccountId: stripeAccId,
          stripeDetailsSubmitted: true,
        },
      });
    }
    tenantMap.set(c.username, tenantDoc.id);

    const userDoc = (
      await payload.find({
        collection: "users",
        where: { username: { equals: c.username } },
        limit: 1,
      })
    ).docs[0];

    if (!userDoc) {
      await payload.create({
        collection: "users",
        data: {
          email: c.email,
          password: "demo",
          username: c.username,
          tenants: [{ tenant: tenantDoc.id }],
        },
      });
    }
  }
  console.log("✅ Creator accounts and storefronts verified.");

  // 5. Seed Buyers
  const buyers = [
    { username: "alex", email: "alex@demo.com" },
    { username: "sarah", email: "sarah@demo.com" },
  ];
  const buyerDocs: any[] = [];

  for (const b of buyers) {
    let buyer = (
      await payload.find({
        collection: "users",
        where: { username: { equals: b.username } },
        limit: 1,
      })
    ).docs[0];

    if (!buyer) {
      buyer = await payload.create({
        collection: "users",
        data: {
          email: b.email,
          password: "demo",
          username: b.username,
        },
      });
    }
    buyerDocs.push(buyer);
  }
  console.log("✅ Buyer demo accounts verified.");

  // 6. Seed Products
  const createdProducts: any[] = [];

  for (const p of dummyProducts) {
    const tenantId = tenantMap.get(p.creatorSlug);
    const categoryId = categoryMap.get(p.categorySlug) || categoryMap.get(p.parentCategorySlug);

    if (!tenantId || !categoryId) continue;

    const existingProd = (
      await payload.find({
        collection: "products",
        where: { name: { equals: p.name } },
        limit: 1,
      })
    ).docs[0];

    if (existingProd) {
      createdProducts.push(existingProd);
      continue;
    }

    const matchedTagIds = p.tags
      .map((t) => tagMap.get(t))
      .filter(Boolean) as string[];

    const newProd = await payload.create({
      collection: "products",
      data: {
        name: p.name,
        price: p.price,
        refundPolicy: p.refundPolicy,
        tenant: tenantId,
        category: categoryId,
        tags: matchedTagIds,
        isPrivate: false,
        isArchived: false,
      },
    });

    createdProducts.push(newProd);
  }
  console.log(`✅ ${createdProducts.length} digital products verified.`);

  // 7. Seed Reviews
  const reviewsData = [
    {
      productIndex: 0, // Next.js SaaS
      user: buyerDocs[0],
      rating: 5,
      description: "Hands down the cleanest Next.js 15 starter kit I have ever tested. Cut my MVP launch time from 4 weeks to 3 days! The Stripe integration is rock solid.",
    },
    {
      productIndex: 0,
      user: buyerDocs[1],
      rating: 5,
      description: "Exceptional architecture with tRPC and React Query. The multi-tenant database routing is super well documented.",
    },
    {
      productIndex: 3, // Figma design system
      user: buyerDocs[0],
      rating: 5,
      description: "Worth every penny. The auto-layout constraints and color token variables saved our agency hundreds of hours in design debt.",
    },
    {
      productIndex: 4, // Framer template
      user: buyerDocs[1],
      rating: 5,
      description: "Super slick animations and responsive on mobile without touching a single breakpoint setting. Fantastic work!",
    },
    {
      productIndex: 6, // Solo creator playbook
      user: buyerDocs[0],
      rating: 5,
      description: "Actionable frameworks without fluff. I used the positioning template and secured my first 5 paying subscribers within a week.",
    },
    {
      productIndex: 9, // Workout plan
      user: buyerDocs[1],
      rating: 4,
      description: "Solid, progressive overload split. Easy to follow on my phone at the gym with clear rest intervals.",
    },
  ];

  for (const rev of reviewsData) {
    const targetProd = createdProducts[rev.productIndex];
    if (!targetProd || !rev.user) continue;

    const existingRev = (
      await payload.find({
        collection: "reviews",
        where: {
          and: [
            { product: { equals: targetProd.id } },
            { user: { equals: rev.user.id } },
          ],
        },
        limit: 1,
      })
    ).docs[0];

    if (!existingRev) {
      await payload.create({
        collection: "reviews",
        data: {
          product: targetProd.id,
          user: rev.user.id,
          rating: rev.rating,
          description: rev.description,
        },
      });
    }
  }
  console.log("✅ Product reviews and star ratings verified.");

  // 8. Seed Customer Orders (for Alex & Sarah's Digital Library)
  if (buyerDocs.length >= 2 && createdProducts.length >= 2) {
    const sampleOrders = [
      { user: buyerDocs[0], prod: createdProducts[0] }, // Alex bought Next.js SaaS
      { user: buyerDocs[0], prod: createdProducts[3] }, // Alex bought Figma system
      { user: buyerDocs[1], prod: createdProducts[4] }, // Sarah bought Framer template
    ];

    for (const ord of sampleOrders) {
      const existingOrd = (
        await payload.find({
          collection: "orders",
          where: {
            and: [
              { user: { equals: ord.user.id } },
              { product: { equals: ord.prod.id } },
            ],
          },
          limit: 1,
        })
      ).docs[0];

      if (!existingOrd) {
        await payload.create({
          collection: "orders",
          data: {
            user: ord.user.id,
            product: ord.prod.id,
            name: ord.prod.name,
            stripeCheckoutSessionId: `cs_test_${Date.now()}_${Math.random().toString(36).substring(7)}`,
            stripeAccountId: "acct_demo",
          },
        });
      }
    }
    console.log("✅ Customer orders and digital library items verified.");
  }
};

try {
  await seed();
  console.log("🎉 All dummy data injected successfully!");
  process.exit(0);
} catch (error) {
  console.error("❌ Error during seeding:", error);
  process.exit(1);
}
