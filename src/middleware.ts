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

// **What this does:**
// - Loads your main domain from environment variables
// - In your case: `"punchcart.store"`
// **This is stored in `.env` file:**
//
// NEXT_PUBLIC_ROOT_DOMAIN=punchcart.store
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "";

    if (url.pathname.startsWith("/_next")) {
        return NextResponse.next();
    }

// checks:
// "Does the hostname end with .punchcart.store?"
    if (hostname.endsWith(`.${rootDomain}`)) {
// Do NOT tenant-rewrite auth pages; redirect subdomain auth to root domain
/*
**What this does:**
- If someone goes to `john.punchcart.store/sign-in`
- **REDIRECT** them to `punchcart.store/sign-in`

**Why?**
- Authentication happens on the main site only
- You don't want separate logins for each store
- Keeps user accounts centralized

**Example flow:**
```
User types: john.punchcart.store/sign-in
            ↓
Middleware catches this
            ↓
Redirects to: punchcart.store/sign-in
            ↓
User logs in on main site
            ↓
Can access john's store after login
*/
        const authPaths = ["/sign-in", "/sign-up"] as const;
        if (authPaths.some((p) => url.pathname.startsWith(p))) {
            const redirectUrl = new URL(`https://${rootDomain}${url.pathname}`);
            redirectUrl.search = url.search; // preserve query params
            return NextResponse.redirect(redirectUrl);
        }
// Extract the tenant slug from the subdomain
        const tenantSlug = hostname.replace(`.${rootDomain}`, "");
        /***What "rewrite" means:**
- The URL in the browser STAYS the same
- But internally, Next.js loads a different page

**Example:**
```
User sees in browser:
john.punchcart.store/products/123
            ↓
Middleware rewrites to (internal):
punchcart.store/tenants/john/products/123
            ↓
Next.js loads the page at:
src/app/(app)/(tenants)/tenants/[slug]/products/[productId]/page.tsx
            ↓
The page knows: tenant = "john", productId = "123"
```

**Another example:**
```
User visits: sarah.punchcart.store/
            ↓
Rewrites to: /tenants/sarah/
            ↓
Loads: src/app/(app)/(tenants)/tenants/[slug]/page.ts */
        return NextResponse.rewrite(new URL(`/tenants/${tenantSlug}${url.pathname}`, req.url))
    }

    return NextResponse.next();
};