"use client";

import { useState } from "react";
import Link from "next/link";
import { 
    ArrowRight, Sparkles, Check, Database, CreditCard, 
    ShieldCheck, BarChart3, Tag, ShoppingBag, Laptop, Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";

const THEMES = [
    { id: "pink", label: "Retro Pink", color: "bg-pink-400" },
    { id: "blue", label: "Neon Blue", color: "bg-sky-400" },
    { id: "yellow", label: "Bold Yellow", color: "bg-yellow-400" },
] as const;

export default function FeaturesPage() {
    // State for interactive storefront customizer mockup
    const [selectedTheme, setSelectedTheme] = useState<"pink" | "blue" | "yellow">("pink");
    const [storeName, setStoreName] = useState("PixelCraft Labs");
    const [bioText, setBioText] = useState("Premium templates & digital tools");

    const themeStyles = {
        pink: {
            bg: "bg-[#FFD2FC]",
            btn: "bg-pink-400 hover:bg-pink-500",
            accentText: "text-pink-600",
            accentBg: "bg-pink-100",
            shadowColor: "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
            border: "border-black"
        },
        blue: {
            bg: "bg-[#7EC8E3]",
            btn: "bg-sky-400 hover:bg-sky-500",
            accentText: "text-sky-600",
            accentBg: "bg-sky-100",
            shadowColor: "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
            border: "border-black"
        },
        yellow: {
            bg: "bg-[#FFE066]",
            btn: "bg-yellow-400 hover:bg-yellow-500",
            accentText: "text-yellow-600",
            accentBg: "bg-yellow-50",
            shadowColor: "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
            border: "border-black"
        }
    };

    const currentStyle = themeStyles[selectedTheme];

    return (
        <div className="bg-[#F4F4F0] min-h-screen text-black py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-16">
                
                {/* Hero Section */}
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-[#FFE066] border border-black px-4 py-1 text-sm rounded-full font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <Sparkles className="size-4 fill-yellow-400" />
                        Platform Features
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none">
                        Built for ultimate creator control.
                    </h1>
                    <p className="text-lg md:text-xl font-medium text-muted-foreground max-w-xl mx-auto">
                        Say goodbye to complex configurations and massive fee reductions. PunchCart provides you with professional commerce super-powers out of the box.
                    </p>
                </div>

                {/* Main Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            icon: Laptop,
                            title: "Multi-Tenant Storefronts",
                            desc: "Deploy a dedicated, beautiful storefront under your unique slug instantly. Keep your bio, links, and products grouped beautifully.",
                            color: "bg-[#D8B5FF]"
                        },
                        {
                            icon: CreditCard,
                            title: "Instant Stripe Connect",
                            desc: "Connect your Stripe account in 1 click. When a user buys a product, money transfers directly to your bank. No delay, no withholding.",
                            color: "bg-[#FFCAB0]"
                        },
                        {
                            icon: ShieldCheck,
                            title: "Secure File Vault",
                            desc: "Upload PDFs, audio, videos, templates, or zip archives. Our secure Vercel Blob integrations authorize access only after a valid Stripe session.",
                            color: "bg-[#96E6B3]"
                        },
                        {
                            icon: ShoppingBag,
                            title: "Zero-Friction Checkout",
                            desc: "Fully responsive, optimized neobrutalist multi-step checkout. Complete with cart badges, secure verification, and instant billing.",
                            color: "bg-pink-300"
                        },
                        {
                            icon: BarChart3,
                            title: "Creator Analytics",
                            desc: "Real-time, clear tracking of page visits, specific product orders, referral channels, conversion rates, and lifetime earnings metrics.",
                            color: "bg-[#7EC8E3]"
                        },
                        {
                            icon: Tag,
                            title: "Smart Promo System",
                            desc: "Launch customized discounts and sales. Generate code tokens, apply percentage reductions, and limit usage periods to drive sales.",
                            color: "bg-[#FFE066]"
                        }
                    ].map((feature, idx) => (
                        <div 
                            key={idx} 
                            className="bg-white border-2 border-black rounded-sm p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between gap-6"
                        >
                            <div className="space-y-4">
                                <div className={`size-12 rounded-sm border border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${feature.color}`}>
                                    <feature.icon className="size-6 text-black" />
                                </div>
                                <h3 className="text-xl font-bold uppercase tracking-tight">{feature.title}</h3>
                                <p className="text-muted-foreground text-sm font-normal leading-relaxed">{feature.desc}</p>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-black uppercase tracking-wider">
                                <Check className="size-4 text-emerald-500 stroke-[3px]" />
                                Fully Integrated
                            </div>
                        </div>
                    ))}
                </div>

                {/* Interactive Demo Showcase Section */}
                <div className="border-2 border-black rounded-sm bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
                    
                    {/* Control Panel */}
                    <div className="p-8 lg:col-span-5 border-b-2 lg:border-b-0 lg:border-r-2 border-black flex flex-col justify-between gap-6 bg-[#F4F4F0]/40">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-1.5 bg-black text-white px-3 py-0.5 text-xs rounded-full font-bold uppercase">
                                <Palette className="size-3 fill-white" />
                                Live Interactive Mockup
                            </div>
                            <h2 className="text-2xl lg:text-3xl font-extrabold uppercase tracking-tight">Design your store Front in real-time</h2>
                            <p className="text-muted-foreground text-sm font-normal leading-relaxed">
                                Pick an accent theme, type your store name, and see how PunchCart generates a custom storefront experience instantly.
                            </p>
                            
                            {/* Inputs */}
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider">Store Name</label>
                                    <input 
                                        type="text" 
                                        value={storeName}
                                        onChange={(e) => setStoreName(e.target.value)}
                                        className="w-full px-3 py-2 text-sm font-medium border border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all bg-white"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider">Store Description</label>
                                    <input 
                                        type="text" 
                                        value={bioText}
                                        onChange={(e) => setBioText(e.target.value)}
                                        className="w-full px-3 py-2 text-sm font-medium border border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all bg-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Theme Selectors */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider block">Select Store Accent Theme</label>
                            <div className="flex gap-3">
                                {THEMES.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => setSelectedTheme(t.id)}
                                        className={`px-3 py-1.5 text-xs font-bold border border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] bg-white ${
                                            selectedTheme === t.id ? "bg-neutral-100 ring-2 ring-black ring-offset-1" : ""
                                        }`}
                                    >
                                        <span className={`size-3.5 rounded-full border border-black ${t.color}`} />
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Store Preview Screen Mock */}
                    <div className="lg:col-span-7 bg-[#EFEFE9] p-8 flex items-center justify-center relative min-h-[350px]">
                        {/* Mock Store Window */}
                        <div className="w-full max-w-md bg-white border border-black rounded-sm overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col">
                            {/* Browser Bar */}
                            <div className="bg-neutral-100 border-b border-black px-4 py-2 flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <span className="size-2.5 rounded-full bg-red-400 border border-black/30" />
                                    <span className="size-2.5 rounded-full bg-yellow-400 border border-black/30" />
                                    <span className="size-2.5 rounded-full bg-green-400 border border-black/30" />
                                </div>
                                <div className="bg-white border border-black/20 rounded-md px-2 py-0.5 text-[10px] font-normal text-muted-foreground max-w-xs truncate flex-1 text-center select-none">
                                    punchcart.com/tenants/{storeName.toLowerCase().replace(/\s+/g, '-')}
                                </div>
                            </div>
                            
                            {/* Mock Store Header */}
                            <div className="p-4 border-b border-black flex justify-between items-center bg-white">
                                <div className="flex items-center gap-2">
                                    <div className={`size-8 rounded-full border border-black ${currentStyle.bg} flex items-center justify-center font-bold text-sm shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]`}>
                                        {storeName.substring(0, 2).toUpperCase()}
                                    </div>
                                    <p className="font-bold text-xs">{storeName}</p>
                                </div>
                                <span className={`size-7 border border-black rounded-sm flex items-center justify-center bg-white shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]`}>
                                    <ShoppingBag className="size-3.5 text-black" />
                                </span>
                            </div>

                            {/* Store Hero Bio */}
                            <div className="p-4 bg-[#F8F9FA] border-b border-black/5 flex flex-col gap-1">
                                <p className="text-[10px] font-normal text-muted-foreground uppercase tracking-wider">CREATOR STOREFRONT</p>
                                <h4 className="text-sm font-black uppercase tracking-tight">{storeName}</h4>
                                <p className="text-xs text-muted-foreground font-normal leading-relaxed">{bioText}</p>
                            </div>

                            {/* Store Product Grid Mock */}
                            <div className="p-4 grid grid-cols-2 gap-3 bg-white">
                                {[
                                    { title: "Ultimate Asset Pack", price: "$29.00" },
                                    { title: "Quickstart Guide PDF", price: "$9.00" },
                                ].map((p, idx) => (
                                    <div key={idx} className="border border-black rounded-sm overflow-hidden flex flex-col bg-white">
                                        <div className={`aspect-video border-b border-black flex items-center justify-center ${currentStyle.bg} p-2`}>
                                            <Database className="size-6 text-black opacity-45" />
                                        </div>
                                        <div className="p-2 flex flex-col justify-between flex-1 gap-1">
                                            <h5 className="text-[10px] font-bold line-clamp-1">{p.title}</h5>
                                            <div className="flex justify-between items-center mt-1">
                                                <div className={`px-1 py-0.5 border border-black ${currentStyle.btn} text-[9px] font-bold`}>
                                                    {p.price}
                                                </div>
                                                <span className="text-[8px] font-bold text-emerald-600 uppercase">IN STOCK</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call To Action */}
                <div className="bg-[#FFCAB0] border-2 border-black rounded-sm p-8 text-center space-y-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <h2 className="text-3xl font-black uppercase tracking-tight max-w-xl mx-auto">
                        Enjoy the features. Own the platform.
                    </h2>
                    <p className="text-black/85 font-medium max-w-md mx-auto">
                        It takes less than three minutes to go live. Connect Stripe, customize your themes, and launch your digital store today.
                    </p>
                    <div className="flex justify-center">
                        <Button asChild className="bg-black hover:bg-black/90 text-white font-bold border border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)]">
                            <Link href="/sign-up" className="flex items-center gap-2">
                                Start selling now
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}
