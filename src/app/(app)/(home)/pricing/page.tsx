"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, HelpCircle, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

    const proPrice = billingCycle === "monthly" ? 19 : 15;
    const proSavings = billingCycle === "annual" ? "Save $48 billed annually" : "Billed monthly";

    return (
        <div className="bg-[#F4F4F0] min-h-screen text-black py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-16">
                
                {/* Hero Section */}
                <div className="text-center space-y-6 max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-[#96E6B3] border border-black px-4 py-1 text-sm rounded-full font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <Star className="size-4 fill-black" />
                        Simple Pricing
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none">
                        Fair, transparent creator rates.
                    </h1>
                    <p className="text-lg md:text-xl font-medium text-muted-foreground max-w-xl mx-auto">
                        No surprise fees. No hidden setup costs. Start for free and scale only when your shop scales.
                    </p>
                </div>

                {/* Billing Toggle - Interactive neobrutalist pill switch */}
                <div className="flex flex-col items-center gap-4">
                    <div className="bg-white border-2 border-black rounded-full p-1.5 flex items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <button
                            onClick={() => setBillingCycle("monthly")}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                                billingCycle === "monthly" 
                                    ? "bg-black text-white" 
                                    : "bg-transparent text-black hover:bg-neutral-100"
                            }`}
                        >
                            Monthly Billing
                        </button>
                        <button
                            onClick={() => setBillingCycle("annual")}
                            className={`px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${
                                billingCycle === "annual" 
                                    ? "bg-black text-white" 
                                    : "bg-transparent text-black hover:bg-neutral-100"
                            }`}
                        >
                            Annual Billing
                            <span className="bg-pink-400 text-black border border-black text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-tight select-none">
                                -20%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-3xl mx-auto">
                    
                    {/* Starter Plan (Free) */}
                    <div className="bg-white border-2 border-black rounded-sm p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between gap-8 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <span className="bg-[#D8B5FF] text-black border border-black text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wide">
                                    Starter
                                </span>
                                <h3 className="text-2xl font-black uppercase mt-4">Free Plan</h3>
                                <p className="text-muted-foreground text-sm font-normal">
                                    Everything you need to launch your digital store and get your first sales.
                                </p>
                            </div>
                            
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-black">$0</span>
                                <span className="text-muted-foreground text-sm font-bold">/ forever</span>
                            </div>

                            <ul className="space-y-3.5 text-sm font-medium">
                                {[
                                    "10% transaction fee",
                                    "Unlimited digital products",
                                    "High-speed secure downloads",
                                    "Standard SEO Optimization",
                                    "Basic customer statistics",
                                    "Direct Stripe Connect transfers"
                                ].map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5">
                                        <Check className="size-4.5 text-emerald-600 stroke-[3px] shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Button asChild variant="outline" className="w-full bg-white border-2 border-black hover:bg-neutral-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all py-6">
                            <Link href="/sign-up">
                                Get Started Free
                            </Link>
                        </Button>
                    </div>

                    {/* Creator Pro Plan (Standout) */}
                    <div className="bg-pink-400 border-2 border-black rounded-sm p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between gap-8 relative overflow-hidden ring-4 ring-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all">
                        {/* Hot Badge */}
                        <div className="absolute right-0 top-0 bg-black text-white text-[9px] font-black uppercase py-1 px-10 rotate-45 translate-x-8 translate-y-4 border-b border-white select-none">
                            Creator Pro
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <span className="bg-black text-white border border-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wide inline-flex items-center gap-1">
                                    <Sparkles className="size-3 fill-yellow-400 text-yellow-400" />
                                    Most Popular
                                </span>
                                <h3 className="text-2xl font-black uppercase mt-4">Creator Pro</h3>
                                <p className="text-black/80 text-sm font-medium">
                                    For active creators looking to scale their storefront and reduce fees.
                                </p>
                            </div>
                            
                            <div className="space-y-1">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-black">${proPrice}</span>
                                    <span className="text-black/70 text-sm font-bold">/ month</span>
                                </div>
                                <p className="text-xs font-bold text-black/85">{proSavings}</p>
                            </div>

                            <ul className="space-y-3.5 text-sm font-bold text-black/90">
                                {[
                                    "2% transaction fee (Save 60%!)",
                                    "Everything in Starter plan",
                                    "Use custom domain option",
                                    "Priority support response (< 2h)",
                                    "Unlimited coupon & discount codes",
                                    "Automated PDF custom invoicing",
                                    "Advanced traffic analytics integrations"
                                ].map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5">
                                        <Check className="size-4.5 text-black stroke-[3px] shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Button asChild className="w-full bg-black hover:bg-black/90 text-white font-bold border border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] transition-all py-6">
                            <Link href="/sign-up" className="flex items-center justify-center gap-2">
                                Upgrade to Pro
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </div>

                </div>

                {/* FAQ Section */}
                <div className="space-y-8 max-w-3xl mx-auto">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-black uppercase tracking-tight inline-flex items-center gap-2">
                            <HelpCircle className="size-8" />
                            Frequently Asked Questions
                        </h2>
                        <p className="text-muted-foreground font-medium">
                            Got questions about plans, transfers, or payouts? We have answers.
                        </p>
                    </div>

                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {[
                            {
                                q: "How do transaction fees work?",
                                a: "We collect our fee dynamically during checkout. If you sell an asset for $10 on the Starter plan, Stripe processes the payment, PunchCart deducts our $1.00 (10%) fee, and the remaining $9.00 is paid out directly into your bank account instantly via Stripe Connect."
                            },
                            {
                                q: "Can I switch plans or cancel at any time?",
                                a: "Absolutely. You can upgrade to Creator Pro, downgrade to Starter, or cancel your Pro membership in your dashboard with one click. Upgrades and downgrades are prorated instantly, so you only pay for exactly what you use."
                            },
                            {
                                q: "What digital files are supported?",
                                a: "PunchCart supports all major digital formats. You can sell PDF ebooks, ZIP files, graphic archives, video tutorials, audio loops, software keys, notion templates, and more. Files are held in secure cloud vaults and download tokens are generated dynamically for customers."
                            },
                            {
                                q: "Is there a storage or file size limit?",
                                a: "We offer completely unlimited lifetime hosting for your digital products. The only limit is a maximum file size of 5GB per individual file upload, which covers even the largest high-fidelity video tutorials and software packages."
                            }
                        ].map((faq, idx) => (
                            <AccordionItem 
                                key={idx} 
                                value={`faq-${idx}`}
                                className="bg-white border-2 border-black rounded-sm px-6 py-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] data-[state=open]:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
                            >
                                <AccordionTrigger className="text-left font-bold text-base hover:no-underline uppercase py-3">
                                    {faq.q}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-sm font-normal leading-relaxed pt-2 pb-4 border-t border-black/10 mt-2">
                                    {faq.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                {/* Risk-Free Banner */}
                <div className="bg-[#FFE066] border-2 border-black rounded-sm p-8 text-center space-y-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-3xl mx-auto">
                    <h3 className="text-2xl font-black uppercase tracking-tight">100% Risk-Free Guarantee</h3>
                    <p className="text-black/85 font-medium max-w-lg mx-auto text-sm leading-relaxed">
                        Try Creator Pro risk-free. If you are not completely satisfied with your premium storefront dashboard features, send us an email within 14 days and we will issue a full refund immediately. No questions asked.
                    </p>
                </div>

            </div>
        </div>
    );
}
