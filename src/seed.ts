// run with: bun run db:seed

import { getPayload } from "payload";
import config from "@payload-config";
import sharp from "sharp";
import { Product, User } from "@/payload-types";

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case "\"": return "&quot;";
      default: return c;
    }
  });
}

async function generateProductImageBuffer({
  title,
  subtitle,
  categoryColor,
  tag,
  icon,
}: {
  title: string;
  subtitle: string;
  categoryColor: string;
  tag: string;
  icon: string;
}): Promise<Buffer> {
  const safeTitle = escapeXml(title.length > 32 ? title.substring(0, 32) + "..." : title);
  const safeSubtitle = escapeXml(subtitle);
  const safeTag = escapeXml(tag);

  const svg = `
  <svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#000000" stroke-width="1" stroke-opacity="0.08"/>
      </pattern>
    </defs>
    <!-- Background with retro color & subtle pattern -->
    <rect width="800" height="800" fill="${categoryColor}"/>
    <rect width="800" height="800" fill="url(#grid)"/>

    <!-- Black offset shadow -->
    <rect x="66" y="66" width="680" height="680" rx="4" fill="#000000"/>
    <!-- Main white card -->
    <rect x="54" y="54" width="680" height="680" rx="4" fill="#FFFFFF" stroke="#000000" stroke-width="8"/>

    <!-- Header retro bar -->
    <rect x="54" y="54" width="680" height="85" fill="#000000"/>
    <circle cx="95" cy="96" r="12" fill="#FF5F56" stroke="#000000" stroke-width="3"/>
    <circle cx="130" cy="96" r="12" fill="#FFBD2E" stroke="#000000" stroke-width="3"/>
    <circle cx="165" cy="96" r="12" fill="#27C93F" stroke="#000000" stroke-width="3"/>

    <!-- Tag Badge -->
    <rect x="520" y="76" width="180" height="40" rx="4" fill="${categoryColor}" stroke="#FFFFFF" stroke-width="3"/>
    <text x="610" y="103" font-family="system-ui, sans-serif" font-size="15" font-weight="900" fill="#000000" text-anchor="middle" letter-spacing="1">${safeTag.toUpperCase()}</text>

    <!-- Center Art Frame -->
    <rect x="94" y="180" width="600" height="300" rx="4" fill="#F4F4F0" stroke="#000000" stroke-width="6"/>
    <!-- Icon badge in center -->
    <circle cx="394" cy="330" r="90" fill="${categoryColor}" stroke="#000000" stroke-width="6"/>
    <text x="394" y="368" font-family="system-ui, sans-serif" font-size="95" text-anchor="middle">${icon}</text>

    <!-- Title and Subtitle -->
    <text x="94" y="545" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="900" fill="#000000">${safeTitle}</text>
    <text x="94" y="595" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="600" fill="#555555">${safeSubtitle}</text>

    <!-- Footer strip -->
    <line x1="54" y1="645" x2="734" y2="645" stroke="#000000" stroke-width="5"/>
    <rect x="94" y="666" width="200" height="40" rx="3" fill="#000000"/>
    <text x="194" y="692" font-family="system-ui, sans-serif" font-size="14" font-weight="900" fill="#FFE066" text-anchor="middle">VERIFIED CREATOR</text>
    <text x="694" y="692" font-family="system-ui, sans-serif" font-size="18" font-weight="900" fill="#000000" text-anchor="end">INSTANT DELIVERY ⚡</text>
  </svg>
  `;

  return await sharp(Buffer.from(svg)).png().toBuffer();
}

async function generateAvatarBuffer({ initial, bg }: { initial: string; bg: string }): Promise<Buffer> {
  const svg = `
  <svg width="240" height="240" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="240" fill="${bg}" stroke="#000000" stroke-width="10" rx="120"/>
    <text x="120" y="155" font-family="system-ui, sans-serif" font-size="95" font-weight="900" fill="#000000" text-anchor="middle">${initial.toUpperCase()}</text>
  </svg>
  `;
  return await sharp(Buffer.from(svg)).png().toBuffer();
}

const categories = [
  { name: "All", slug: "all" },
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
  "AI",
  "Python",
  "Go",
  "Mobile",
];

const creators = [
  {
    username: "devstarter",
    email: "devstarter@demo.com",
    name: "DevStarter Labs",
    stripeAccountId: "acct_demo_devstarter",
    color: "#7EC8E3",
  },
  {
    username: "pixelcraft",
    email: "pixelcraft@demo.com",
    name: "PixelCraft Design",
    stripeAccountId: "acct_demo_pixelcraft",
    color: "#FFD2FC",
  },
  {
    username: "growthhacks",
    email: "growthhacks@demo.com",
    name: "GrowthHacks Studio",
    stripeAccountId: "acct_demo_growthhacks",
    color: "#FFE066",
  },
  {
    username: "fitpro",
    email: "fitpro@demo.com",
    name: "FitPro Athletics",
    stripeAccountId: "acct_demo_fitpro",
    color: "#FF9AA2",
  },
];

const productsCatalog = [
  // Software Development
  {
    creatorSlug: "devstarter",
    categorySlug: "web-development",
    parentCategorySlug: "software-development",
    name: "Next.js 15 SaaS Production Starter Kit",
    subtitle: "Complete boilerplate with Stripe, tRPC, Tailwind & Auth",
    price: 49,
    refundPolicy: "14-day" as const,
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript", "SaaS"],
    color: "#7EC8E3",
    icon: "⚡",
  },
  {
    creatorSlug: "devstarter",
    categorySlug: "mobile-development",
    parentCategorySlug: "software-development",
    name: "Fullstack React Native & Expo Boilerplate",
    subtitle: "iOS & Android ready with offline sync & push notifications",
    price: 39,
    refundPolicy: "14-day" as const,
    tags: ["React", "TypeScript", "Mobile"],
    color: "#7EC8E3",
    icon: "📱",
  },
  {
    creatorSlug: "devstarter",
    categorySlug: "devops",
    parentCategorySlug: "software-development",
    name: "Docker, Kubernetes & Microservices Production Handbook",
    subtitle: "Architecture blueprints, CI/CD pipelines & Helm charts",
    price: 24,
    refundPolicy: "30-day" as const,
    tags: ["Templates", "Productivity"],
    color: "#7EC8E3",
    icon: "🐳",
  },
  {
    creatorSlug: "devstarter",
    categorySlug: "programming-languages",
    parentCategorySlug: "software-development",
    name: "Python AI Agent & RAG Pipeline Boilerplate",
    subtitle: "LangChain, LlamaIndex, Vector DBs & FastAPI backend",
    price: 45,
    refundPolicy: "14-day" as const,
    tags: ["AI", "Python", "Templates"],
    color: "#7EC8E3",
    icon: "🤖",
  },
  {
    creatorSlug: "devstarter",
    categorySlug: "programming-languages",
    parentCategorySlug: "software-development",
    name: "Go High-Throughput REST & gRPC API Starter",
    subtitle: "Clean architecture, PostgreSQL, Redis cache & Docker setup",
    price: 29,
    refundPolicy: "30-day" as const,
    tags: ["Go", "Templates"],
    color: "#7EC8E3",
    icon: "🚀",
  },

  // Design
  {
    creatorSlug: "pixelcraft",
    categorySlug: "ui-ux",
    parentCategorySlug: "design",
    name: "Enterprise Figma Design System (2,400+ Components)",
    subtitle: "Auto-layout v5, token variables, light/dark themes",
    price: 59,
    refundPolicy: "30-day" as const,
    tags: ["Figma", "UI/UX", "Templates"],
    color: "#D8B5FF",
    icon: "🎨",
  },
  {
    creatorSlug: "pixelcraft",
    categorySlug: "ui-ux",
    parentCategorySlug: "design",
    name: "Minimalist Framer Agency & Portfolio Template",
    subtitle: "Fluid animations, CMS-powered projects & responsive mobile",
    price: 29,
    refundPolicy: "14-day" as const,
    tags: ["Framer", "Templates", "Tailwind CSS"],
    color: "#D8B5FF",
    icon: "✨",
  },
  {
    creatorSlug: "pixelcraft",
    categorySlug: "3d-modeling",
    parentCategorySlug: "design",
    name: "3D Tech & Abstract Isometric Icons (Blender + PNG)",
    subtitle: "120+ high-res 4K renders with transparent backgrounds",
    price: 19,
    refundPolicy: "7-day" as const,
    tags: ["Templates"],
    color: "#D8B5FF",
    icon: "🧊",
  },
  {
    creatorSlug: "pixelcraft",
    categorySlug: "graphic-design",
    parentCategorySlug: "design",
    name: "Retro Neobrutalism UI Component Kit & Badges",
    subtitle: "Vibrant high-contrast stickers, cards, buttons & borders",
    price: 22,
    refundPolicy: "30-day" as const,
    tags: ["Figma", "Templates"],
    color: "#D8B5FF",
    icon: "👾",
  },
  {
    creatorSlug: "pixelcraft",
    categorySlug: "typography",
    parentCategorySlug: "design",
    name: "Modern Display & Monospace Font Family (Desktop + Web)",
    subtitle: "8 weights, variable TTF/WOFF2 font files & commercial license",
    price: 34,
    refundPolicy: "no-refunds" as const,
    tags: ["Templates"],
    color: "#D8B5FF",
    icon: "🔤",
  },

  // Business & Money
  {
    creatorSlug: "growthhacks",
    categorySlug: "entrepreneurship",
    parentCategorySlug: "business-money",
    name: "The $100K Solo Creator Playbook & Operating System",
    subtitle: "Positioning, distribution funnels & recurring revenue model",
    price: 27,
    refundPolicy: "30-day" as const,
    tags: ["Productivity", "Templates"],
    color: "#FFB347",
    icon: "📈",
  },
  {
    creatorSlug: "growthhacks",
    categorySlug: "marketing-sales",
    parentCategorySlug: "business-money",
    name: "High-Converting Cold Email & Sales Copywriting Vault",
    subtitle: "85+ battle-tested outreach templates with 60%+ open rates",
    price: 19,
    refundPolicy: "14-day" as const,
    tags: ["Templates"],
    color: "#FFB347",
    icon: "✉️",
  },
  {
    creatorSlug: "growthhacks",
    categorySlug: "personal-finance",
    parentCategorySlug: "business-money",
    name: "Financial Freedom & Multi-Stream Notion Command Center",
    subtitle: "Net worth tracking, monthly P&L, dividend planner & tax hub",
    price: 15,
    refundPolicy: "30-day" as const,
    tags: ["Productivity", "Templates"],
    color: "#FFB347",
    icon: "💰",
  },
  {
    creatorSlug: "growthhacks",
    categorySlug: "gigs-side-projects",
    parentCategorySlug: "business-money",
    name: "Micro-SaaS Acquisition & Due Diligence Checklist",
    subtitle: "Financial audits, tech stack risk assessment & transfer steps",
    price: 39,
    refundPolicy: "14-day" as const,
    tags: ["SaaS", "Templates"],
    color: "#FFB347",
    icon: "🔍",
  },
  {
    creatorSlug: "growthhacks",
    categorySlug: "marketing-sales",
    parentCategorySlug: "business-money",
    name: "Digital Product Launch Funnel Blueprint & Swipe File",
    subtitle: "Pre-launch hype, launch day sequence & objection killers",
    price: 24,
    refundPolicy: "30-day" as const,
    tags: ["Templates"],
    color: "#FFB347",
    icon: "🎯",
  },

  // Fitness & Health
  {
    creatorSlug: "fitpro",
    categorySlug: "workout-plans",
    parentCategorySlug: "fitness-health",
    name: "12-Week Hypertrophy Strength Training Protocol",
    subtitle: "Scientific periodization, video demos & exercise substitutions",
    price: 35,
    refundPolicy: "30-day" as const,
    tags: ["Fitness"],
    color: "#FF9AA2",
    icon: "🏋️",
  },
  {
    creatorSlug: "fitpro",
    categorySlug: "nutrition",
    parentCategorySlug: "fitness-health",
    name: "Plant-Based High-Protein Athlete Meal Bible",
    subtitle: "70+ macro-counted recipes, meal preps & grocery checklists",
    price: 19,
    refundPolicy: "14-day" as const,
    tags: ["Fitness"],
    color: "#FF9AA2",
    icon: "🥗",
  },
  {
    creatorSlug: "fitpro",
    categorySlug: "yoga",
    parentCategorySlug: "fitness-health",
    name: "Desk Worker Posture & Daily Mobility Routine (PDF + Videos)",
    subtitle: "15-minute daily sessions to eliminate lower back & neck tension",
    price: 15,
    refundPolicy: "30-day" as const,
    tags: ["Fitness", "Productivity"],
    color: "#FF9AA2",
    icon: "🧘",
  },
  {
    creatorSlug: "fitpro",
    categorySlug: "mental-health",
    parentCategorySlug: "fitness-health",
    name: "Breathwork & Nervous System Reset Guidebook",
    subtitle: "Physiological sigh techniques for deep sleep & stress control",
    price: 12,
    refundPolicy: "30-day" as const,
    tags: ["Fitness"],
    color: "#FF9AA2",
    icon: "🌬️",
  },

  // Education & Productivity
  {
    creatorSlug: "growthhacks",
    categorySlug: "productivity",
    parentCategorySlug: "self-improvement",
    name: "Deep Work Mastery: Focus Protocol for Knowledge Workers",
    subtitle: "Time-blocking templates, dopamine detox guide & flow state cues",
    price: 18,
    refundPolicy: "14-day" as const,
    tags: ["Productivity"],
    color: "#96E6B3",
    icon: "🧠",
  },
];

const seed = async () => {
  const payload = await getPayload({ config });

  console.log("🌱 Starting complete PunchCart database seeding with rich images...");

  // Clear existing reviews, orders, products, and media so everything is clean and linked with images
  await payload.delete({ collection: "reviews", where: { id: { exists: true } } });
  await payload.delete({ collection: "orders", where: { id: { exists: true } } });
  await payload.delete({ collection: "products", where: { id: { exists: true } } });
  await payload.delete({ collection: "media", where: { id: { exists: true } } });
  console.log("🧹 Previous items refreshed.");

  // 1. Categories
  const categoryMap = new Map<string, string>();
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

  // 2. Tags
  const tagMap = new Map<string, string>();
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

  // 3. Admin User & Tenant
  let adminTenant = (
    await payload.find({
      collection: "tenants",
      where: { slug: { equals: "admin" } },
      limit: 1,
    })
  ).docs[0];

  if (!adminTenant) {
    adminTenant = await payload.create({
      collection: "tenants",
      data: {
        name: "admin",
        slug: "admin",
        stripeAccountId: "acct_demo_admin",
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

  // 4. Creator Tenants, Avatars & Users
  const tenantMap = new Map<string, string>();

  for (const c of creators) {
    let tenantDoc = (
      await payload.find({
        collection: "tenants",
        where: { slug: { equals: c.username } },
        limit: 1,
      })
    ).docs[0];

    if (!tenantDoc) {
      tenantDoc = await payload.create({
        collection: "tenants",
        data: {
          name: c.name,
          slug: c.username,
          stripeAccountId: c.stripeAccountId,
          stripeDetailsSubmitted: true,
        },
      });
    }

    // Generate custom brand avatar for the creator
    const avatarBuffer = await generateAvatarBuffer({ initial: c.name.charAt(0), bg: c.color });
    const avatarMedia = await payload.create({
      collection: "media",
      data: {
        alt: `${c.name} Avatar`,
        tenant: tenantDoc.id,
      },
      file: {
        data: avatarBuffer,
        mimetype: "image/png",
        name: `${c.username}-avatar.png`,
        size: avatarBuffer.length,
      },
    });

    await payload.update({
      collection: "tenants",
      id: tenantDoc.id,
      data: {
        image: avatarMedia.id,
      },
    });

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
  console.log("✅ Creator storefronts & avatars generated.");

  // 5. Buyers
  const buyers = [
    { username: "alex", email: "alex@demo.com" },
    { username: "sarah", email: "sarah@demo.com" },
  ];
  const buyerDocs: User[] = [];

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

  // 6. Products with Custom Graphic Media
  const createdProducts: Product[] = [];

  for (const [i, p] of productsCatalog.entries()) {
    const tenantId = tenantMap.get(p.creatorSlug);
    const categoryId = categoryMap.get(p.categorySlug) || categoryMap.get(p.parentCategorySlug);

    if (!tenantId || !categoryId) continue;

    // Generate custom high-res branded image card for this product
    const imgBuffer = await generateProductImageBuffer({
      title: p.name,
      subtitle: p.subtitle,
      categoryColor: p.color,
      tag: p.tags[0] || "Digital",
      icon: p.icon,
    });

    const fileSlug = p.name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
    const mediaDoc = await payload.create({
      collection: "media",
      data: {
        alt: p.name,
        tenant: tenantId,
      },
      file: {
        data: imgBuffer,
        mimetype: "image/png",
        name: `${fileSlug}.png`,
        size: imgBuffer.length,
      },
    });

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
        image: mediaDoc.id,
        cover: mediaDoc.id,
        isPrivate: false,
        isArchived: false,
      },
    });

    createdProducts.push(newProd);
    console.log(`🖼️ Created product with custom image [${i + 1}/${productsCatalog.length}]: ${p.name}`);
  }

  // 7. Reviews
  const reviewsData = [
    {
      productIndex: 0, // Next.js SaaS
      user: buyerDocs[0],
      rating: 5,
      description: "Hands down the cleanest Next.js 15 starter kit I have ever used. Saved me 3 weeks of work! Stripe integration worked out of the box.",
    },
    {
      productIndex: 0,
      user: buyerDocs[1],
      rating: 5,
      description: "Outstanding code quality. The tRPC routers, caching, and clean Tailwind styling are top tier.",
    },
    {
      productIndex: 1, // Mobile app
      user: buyerDocs[0],
      rating: 5,
      description: "React Native configuration with Expo worked flawlessly on my iPhone test build. Clean navigation structure.",
    },
    {
      productIndex: 5, // Figma design system
      user: buyerDocs[0],
      rating: 5,
      description: "Worth every penny. The auto-layout constraints and color token variables saved our agency hundreds of hours in design debt.",
    },
    {
      productIndex: 6, // Framer template
      user: buyerDocs[1],
      rating: 5,
      description: "Super slick animations and responsive on mobile without touching a single breakpoint setting. Fantastic work!",
    },
    {
      productIndex: 10, // Solo creator playbook
      user: buyerDocs[0],
      rating: 5,
      description: "Actionable frameworks without fluff. I used the positioning template and secured my first 5 paying subscribers within a week.",
    },
    {
      productIndex: 11, // Cold email vault
      user: buyerDocs[1],
      rating: 5,
      description: "The cold email sequences got me a 42% reply rate for my web design agency. Already made 10x ROI on this guide.",
    },
    {
      productIndex: 15, // Workout plan
      user: buyerDocs[1],
      rating: 5,
      description: "Solid, progressive overload split with great exercise alternatives. Down 4% body fat in 8 weeks.",
    },
    {
      productIndex: 16, // Nutrition
      user: buyerDocs[0],
      rating: 4,
      description: "High protein recipes that actually taste great and don't take hours to cook. The grocery list is a big plus.",
    },
  ];

  for (const rev of reviewsData) {
    const targetProd = createdProducts[rev.productIndex];
    if (!targetProd || !rev.user) continue;

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
  console.log("✅ Reviews & ratings seeded.");

  // 8. Orders for Alex and Sarah
  if (buyerDocs.length >= 2 && createdProducts.length >= 6) {
    const sampleOrders = [
      { user: buyerDocs[0], prod: createdProducts[0] }, // Alex: Next.js SaaS
      { user: buyerDocs[0], prod: createdProducts[5] }, // Alex: Figma Design System
      { user: buyerDocs[0], prod: createdProducts[10] }, // Alex: Creator Playbook
      { user: buyerDocs[1], prod: createdProducts[6] }, // Sarah: Framer Template
      { user: buyerDocs[1], prod: createdProducts[15] }, // Sarah: Workout Protocol
    ];

    for (const ord of sampleOrders) {
      if (!ord.user || !ord.prod) continue;
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
    console.log("✅ Digital library orders linked.");
  }
};

try {
  await seed();
  console.log("🎉 Complete seeding with images finished successfully!");
  process.exit(0);
} catch (error) {
  console.error("❌ Error during seeding:", error);
  process.exit(1);
}
