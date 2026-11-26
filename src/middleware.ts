import { NextRequest, NextResponse } from "next/server"

export const config = {
    matcher: [
        /*
        *Match all paths except for:
        *1./api routes
        *2./_next (Next.js internals)
        *3. /_static(inside /public)
        *4. all root files inside /public (e.g. /favicon.ico)
        */
        "/((?!api/|_next/|_static/|_vercel|media/|[\\w-]+\\.\\w+).*)"
    ]
}

export default async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    // Extract the hostname (e.g., "antonio.punchcart.com" or "john.localhost:3000")
    const hostname = req.headers.get("host") || "";

// **What this does:**
// - Loads your main domain from environment variables
// - In our case: `"punchcart.store"`
// **This is stored in `.env` file:**
//
// NEXT_PUBLIC_ROOT_DOMAIN=punchcart.store
    const rootDomain = (process.env.NEXT_PUBLIC_ROOT_DOMAIN || "").trim().replace(/^["']|["']$/g, "");
    const enableSubdomain = process.env.NEXT_PUBLIC_ENABLE_SUBDOMAIN_ROUTING === "true";

    if (url.pathname.startsWith("/_next")) {
        return NextResponse.next();
    }

    if (enableSubdomain && rootDomain && hostname.endsWith(`.${rootDomain}`)) {
        const authPaths = ["/sign-in", "/sign-up"] as const;
        if (authPaths.some((p) => url.pathname.startsWith(p))) {
            const proto = req.nextUrl.protocol || "https:";
            const redirectUrl = new URL(`${proto}//${rootDomain}${url.pathname}`);
            redirectUrl.search = url.search; // preserve query params
            return NextResponse.redirect(redirectUrl);
        }
// Extract the tenant slug from the subdomain
        const tenantSlug = hostname.replace(`.${rootDomain}`, "");
        return NextResponse.rewrite(new URL(`/tenants/${tenantSlug}${url.pathname}`, req.url))
    }

    return NextResponse.next();
};