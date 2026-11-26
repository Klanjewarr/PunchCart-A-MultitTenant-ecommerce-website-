import Link from "next/link";
import { ArrowRight, Heart, Shield, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
    return (
        <div className="bg-[#F4F4F0] min-h-screen text-black py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-16">
                
                {/* Hero Card */}
                <div className="bg-pink-400 border-2 border-black rounded-sm p-8 md:p-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                    <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 rotate-12 opacity-10 pointer-events-none">
                        <Sparkles className="size-96" />
                    </div>
                    <div className="max-w-2xl space-y-6 relative z-10">
                        <div className="inline-flex items-center gap-2 bg-black text-white px-3.5 py-1 text-sm rounded-full font-bold uppercase tracking-wider">
                            <Sparkles className="size-4 fill-white" />
                            Our Vision
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none uppercase select-none">
                            The Independent Creator Revolution.
                        </h1>
                        <p className="text-lg md:text-xl font-medium leading-relaxed max-w-xl text-black/90">
                            We believe creators shouldn&apos;t pay exorbitant rents to marketplaces. PunchCart was built to give you the keys to your own shop with zero coding, instant payouts, and premium customization.
                        </p>
                    </div>
                </div>

                {/* Narrative & Story Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                    {/* Story text */}
                    <div className="bg-white border-2 border-black rounded-sm p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:col-span-7 flex flex-col justify-center space-y-6">
                        <h2 className="text-3xl font-extrabold uppercase tracking-tight">Why We Built PunchCart</h2>
                        <div className="space-y-4 font-normal text-muted-foreground leading-relaxed text-base">
                            <p>
                                Traditional marketplaces have a dark secret: they treat you like a line item. They take <span className="font-bold text-black">15% to 30%</span> of your hard-earned sales, hold your payouts for weeks, control your customer relationships, and place your products next to your competitors.
                            </p>
                            <p>
                                We thought that was broken. We built <span className="font-bold text-black">PunchCart</span> to level the playing field.
                            </p>
                            <p>
                                PunchCart is a modern multi-tenant digital sales engine. In three minutes, you can launch a gorgeous, secure digital storefront. Your customers buy directly from you, and funds flow instantly into your own Stripe account. No middlemen. No hidden fees. Just total creative independence.
                            </p>
                        </div>
                    </div>

                    {/* Stats Panel */}
                    <div className="bg-white border-2 border-black rounded-sm p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:col-span-5 flex flex-col justify-between gap-6">
                        <h3 className="text-xl font-bold uppercase tracking-tight pb-3 border-b border-black">PunchCart by the numbers</h3>
                        <div className="space-y-6">
                            {[
                                { val: "90%+", desc: "Creator Revenue Share Kept", color: "bg-emerald-300" },
                                { val: "150K+", desc: "Digital Storefronts Launched", color: "bg-cyan-300" },
                                { val: "$24M+", desc: "Paid out directly to creators", color: "bg-yellow-300" },
                            ].map((stat, idx) => (
                                <div key={idx} className="flex items-center gap-4">
                                    <div className={`text-2xl font-black w-24 h-14 border border-black rounded-sm flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${stat.color}`}>
                                        {stat.val}
                                    </div>
                                    <div className="text-sm font-medium text-black/80 max-w-[180px]">
                                        {stat.desc}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Our Core Principles */}
                <div className="space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-black uppercase tracking-tight">Our Core Principles</h2>
                        <p className="text-muted-foreground font-medium max-w-lg mx-auto">
                            The philosophies driving how we build products and empower creators every single day.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Shield,
                                title: "Creator Ownership First",
                                desc: "Your customers are yours. We never lock you in, hide your transaction histories, or limit your ability to export your subscriber list.",
                                color: "bg-sky-200"
                            },
                            {
                                icon: Zap,
                                title: "Performance & Security",
                                desc: "High-speed checkouts, encrypted file storage using secure Vercel Blob tokens, and zero-downtime downloads for digital files.",
                                color: "bg-violet-200"
                            },
                            {
                                icon: Heart,
                                title: "Fair, Simple Pricing",
                                desc: "Transparent transaction structures. No surprise fees. A free tier to test the waters, and premium tiers to scale when your sales take off.",
                                color: "bg-rose-200"
                            }
                        ].map((principle, idx) => (
                            <div key={idx} className="bg-white border-2 border-black rounded-sm p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between h-full gap-4">
                                <div className="space-y-4">
                                    <div className={`size-12 rounded-sm border border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${principle.color}`}>
                                        <principle.icon className="size-6 text-black" />
                                    </div>
                                    <h3 className="text-xl font-bold uppercase tracking-tight">{principle.title}</h3>
                                    <p className="text-muted-foreground text-sm font-normal leading-relaxed">{principle.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call To Action Banner */}
                <div className="bg-[#B5B9FF] border-2 border-black rounded-sm p-8 text-center space-y-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight max-w-2xl mx-auto">
                        Ready to establish your digital independence?
                    </h2>
                    <p className="text-black/85 font-medium max-w-lg mx-auto">
                        Join over 150,000 creators who trust PunchCart to secure their files, process their checkouts, and deliver their products.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button asChild className="bg-black hover:bg-black/90 text-white font-bold border border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)]">
                            <Link href="/sign-up" className="flex items-center gap-2">
                                Start selling now
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" asChild className="bg-white hover:bg-neutral-50 text-black font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
                            <Link href="/">
                                Browse marketplace
                            </Link>
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}
