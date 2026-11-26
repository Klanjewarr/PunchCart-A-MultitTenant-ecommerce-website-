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
    // Extract the hostname (e.g., "devstarter.punchcart.shop" or "www.punchcart.shop")
    const hostname = (req.headers.get("host") || "").split(":")[0];

    const rootDomain = (process.env.NEXT_PUBLIC_ROOT_DOMAIN || "").trim().replace(/^["']|["']$/g, "").split(":")[0];
    const enableSubdomain = process.env.NEXT_PUBLIC_ENABLE_SUBDOMAIN_ROUTING === "true";

    if (url.pathname.startsWith("/_next")) {
        return NextResponse.next();
    }

    if (enableSubdomain && rootDomain && hostname.endsWith(`.${rootDomain}`)) {
        // Extract the tenant slug from the subdomain (e.g. "devstarter" from "devstarter.punchcart.shop")
        const tenantSlug = hostname.replace(`.${rootDomain}`, "").toLowerCase();

        // If it's the root domain itself or "www", treat it as the main marketplace!
        const reservedSubdomains = ["", "www", "api", "admin", "app", "mail", "static"];
        if (reservedSubdomains.includes(tenantSlug)) {
            return NextResponse.next();
        }

        const authPaths = ["/sign-in", "/sign-up"] as const;
        if (authPaths.some((p) => url.pathname.startsWith(p))) {
            const proto = req.nextUrl.protocol || "https:";
            const redirectUrl = new URL(`${proto}//${rootDomain}${url.pathname}`);
            redirectUrl.search = url.search; // preserve query params
            return NextResponse.redirect(redirectUrl);
        }

        return NextResponse.rewrite(new URL(`/tenants/${tenantSlug}${url.pathname}`, req.url));
    }

    return NextResponse.next();
};