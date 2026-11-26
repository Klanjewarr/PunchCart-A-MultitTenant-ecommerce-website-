"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Zap, ShieldCheck, ShoppingBag, ArrowDown, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700", "800", "900"],
});

export const HeroBanner = () => {
    const scrollToMarketplace = () => {
        const el = document.getElementById("marketplace");
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="border-b-2 border-black bg-[#FFE066] text-black overflow-hidden relative">
            {/* Background decorative grid pattern */}
            <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-14 lg:py-20 flex flex-col items-center text-center relative z-10">
                {/* Product Badge */}
                <div className="inline-flex items-center gap-2 bg-white border-2 border-black px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider shadow-[3px_3px_0px_rgba(0,0,0,1)] mb-6 animate-bounce">
                    <Sparkles className="size-4 text-pink-500 fill-pink-500" />
                    <span>The Multi-Tenant Creator Commerce Platform</span>
                </div>

                {/* Main Headline */}
                <h1 className={cn("text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.05] max-w-5xl mb-6 text-black", poppins.className)}>
                    Sell Digital Products. <br className="hidden sm:inline" />
                    <span className="bg-pink-400 border-2 border-black px-3 py-0.5 shadow-[4px_4px_0px_rgba(0,0,0,1)] inline-block mt-1 sm:mt-0">
                        Own Your Brand.
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-xl font-medium text-neutral-800 max-w-2xl leading-relaxed mb-8">
                    Launch your dedicated creator storefront in 60 seconds. Sell code, design kits, presets, PDFs, and courses with direct Stripe Connect payouts and zero monthly fees.
                </p>

                {/* Action CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
                    <Button
                        asChild
                        variant="elevated"
                        className="w-full sm:w-auto px-8 py-7 text-base font-black uppercase tracking-wider bg-black text-white hover:bg-pink-400 hover:text-black border-2 border-black rounded-none shadow-[5px_5px_0px_rgba(0,0,0,1)] hover:shadow-[7px_7px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all"
                    >
                        <Link href="/sign-up" className="flex items-center justify-center gap-2">
                            <Store className="size-5" />
                            <span>Start Selling for Free</span>
                            <ArrowRight className="size-5" />
                        </Link>
                    </Button>

                    <Button
                        variant="elevated"
                        onClick={scrollToMarketplace}
                        className="w-full sm:w-auto px-8 py-7 text-base font-black uppercase tracking-wider bg-white text-black hover:bg-neutral-100 border-2 border-black rounded-none shadow-[5px_5px_0px_rgba(0,0,0,1)] hover:shadow-[7px_7px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all"
                    >
                        <span className="flex items-center justify-center gap-2">
                            <ShoppingBag className="size-5" />
                            <span>Browse Marketplace</span>
                            <ArrowDown className="size-5" />
                        </span>
                    </Button>
                </div>

                {/* Trust & Feature Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl">
                    {[
                        { icon: Zap, label: "Instant Payouts", desc: "Stripe Connect Transfers", bg: "bg-white" },
                        { icon: Store, label: "Custom Storefront", desc: "/tenants/yourname", bg: "bg-pink-100" },
                        { icon: ShieldCheck, label: "Secure Delivery", desc: "Automatic Cloud Storage", bg: "bg-[#96E6B3]" },
                        { icon: Sparkles, label: "Keep 90%+", desc: "Flat 10% Platform Fee", bg: "bg-[#D8B5FF]" },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                "border-2 border-black p-3.5 sm:p-4 text-left shadow-[3px_3px_0px_rgba(0,0,0,1)] flex flex-col justify-between transition-transform hover:-translate-y-0.5",
                                item.bg
                            )}
                        >
                            <div className="flex items-center gap-2 mb-1.5">
                                <item.icon className="size-4 sm:size-5 text-black shrink-0" />
                                <span className="font-black text-xs sm:text-sm uppercase tracking-wider text-black truncate">{item.label}</span>
                            </div>
                            <span className="text-[11px] sm:text-xs font-semibold text-neutral-700">{item.desc}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
