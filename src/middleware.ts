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
    // Extract teh hostname (e.g., "antonio.punchcart.com" or "john.localhost:3000")
    const hostname = req.headers.get("host") || "";

    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "";

    if (url.pathname.startsWith("/_next")) {
        return NextResponse.next();
    }

    if (hostname.endsWith(`.${rootDomain}`)) {
        // Do NOT tenant-rewrite auth pages; redirect subdomain auth to root domain
        const authPaths = ["/sign-in", "/sign-up"] as const;
        if (authPaths.some((p) => url.pathname.startsWith(p))) {
            const redirectUrl = new URL(`https://${rootDomain}${url.pathname}`);
            redirectUrl.search = url.search; // preserve query params
            return NextResponse.redirect(redirectUrl);
        }
        const tenantSlug = hostname.replace(`.${rootDomain}`, "");
        return NextResponse.rewrite(new URL(`/tenants/${tenantSlug}${url.pathname}`, req.url))
    }

    return NextResponse.next();
};