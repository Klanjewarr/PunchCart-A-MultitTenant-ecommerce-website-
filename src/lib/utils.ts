import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateTenantURL(tenantSlug: string, absolute = false) {
  const isSubdomainRoutingEnabled = process.env.NEXT_PUBLIC_ENABLE_SUBDOMAIN_ROUTING === "true";
  const rawDomain = (process.env.NEXT_PUBLIC_ROOT_DOMAIN || "").trim().replace(/^["']|["']$/g, "");

  // Use subdomain routing ONLY if enabled and domain is not localhost
  if (
    isSubdomainRoutingEnabled &&
    rawDomain &&
    !rawDomain.includes("localhost") &&
    !rawDomain.includes("127.0.0.1")
  ) {
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    return `${protocol}://${tenantSlug}.${rawDomain}`;
  }

  // If absolute URL is needed (e.g. for Stripe callbacks)
  if (absolute) {
    const rawAppUrl = (process.env.NEXT_PUBLIC_APP_URL || "")
      .trim()
      .replace(/^["']|["']$/g, "")
      .replace(/\/$/, "");
    const base =
      rawAppUrl ||
      (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
    return `${base}/tenants/${tenantSlug}`;
  }

  // Safe relative path for all client links — stays on current domain / port
  return `/tenants/${tenantSlug}`;
}

export function formatCurrency(value: number | string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value))
}