import Link from "next/link";
import { Github, Twitter, MessageSquare, ArrowRight, Heart } from "lucide-react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700", "800"],
});

export const Footer = () => {
    return (
        <footer className="border-t-2 border-black bg-white text-black font-medium">
            {/* Top Footer Section */}
            <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                
                {/* Brand Column */}
                <div className="lg:col-span-2 flex flex-col gap-5">
                    <Link href="/" className="inline-block">
                        <span className={cn("text-3xl font-extrabold tracking-tight uppercase", poppins.className)}>
                            PunchCart
                        </span>
                    </Link>
                    <p className="text-muted-foreground text-sm max-w-sm font-normal leading-relaxed">
                        The ultimate multi-tenant platform for digital creators. Sell your PDFs, software, templates, design kits, and courses directly to customers with custom subdomains and instant Stripe transfers.
                    </p>
                    
                    {/* Social Media - Neobrutalist styling */}
                    <div className="flex gap-3 mt-2">
                        {[
                            { icon: Twitter, href: "https://twitter.com" },
                            { icon: Github, href: "https://github.com" },
                            { icon: MessageSquare, href: "https://discord.com" },
                        ].map((social, idx) => (
                            <a
                                key={idx}
                                href={social.href}
                                target="_blank"
                                rel="noreferrer"
                                className="size-10 bg-white border border-black rounded-sm flex items-center justify-center transition-all hover:bg-pink-400 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <social.icon className="size-5 text-black" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Links Columns */}
                <div>
                    <h3 className="font-bold text-base uppercase tracking-wider mb-4 border-b border-black/10 pb-2">Platform</h3>
                    <ul className="flex flex-col gap-2.5 text-sm font-normal text-muted-foreground">
                        <li>
                            <Link href="/features" className="hover:text-black transition-colors">Features</Link>
                        </li>
                        <li>
                            <Link href="/pricing" className="hover:text-black transition-colors">Pricing</Link>
                        </li>
                        <li>
                            <Link href="/" className="hover:text-black transition-colors">Browse Products</Link>
                        </li>
                        <li>
                            <Link href="/sign-up" className="hover:text-black transition-colors font-medium text-pink-500">Start Selling</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-base uppercase tracking-wider mb-4 border-b border-black/10 pb-2">Company</h3>
                    <ul className="flex flex-col gap-2.5 text-sm font-normal text-muted-foreground">
                        <li>
                            <Link href="/about" className="hover:text-black transition-colors">About Us</Link>
                        </li>
                        <li>
                            <a href="#" className="hover:text-black transition-colors">Careers</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-black transition-colors">Press Kit</a>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-black transition-colors">Contact Support</Link>
                        </li>
                    </ul>
                </div>

                {/* Newsletter Column */}
                <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-base uppercase tracking-wider border-b border-black/10 pb-2">Newsletter</h3>
                    <p className="text-xs font-normal text-muted-foreground leading-relaxed">
                        Get high-converting tips, digital product ideas, and PunchCart news.
                    </p>
                    <div className="flex border border-black rounded-sm overflow-hidden bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus-within:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                        <input
                            type="email"
                            placeholder="creator@email.com"
                            className="w-full px-3 py-2 text-xs font-normal bg-transparent focus:outline-none placeholder:text-muted-foreground"
                        />
                        <button className="bg-pink-400 border-l border-black px-3 flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-200">
                            <ArrowRight className="size-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Footer Section */}
            <div className="border-t border-black bg-[#F4F4F0] py-6 px-6">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-normal text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <span>© 2026 PunchCart, Inc. Made with</span>
                        <Heart className="size-3 fill-pink-500 text-pink-500 animate-pulse" />
                        <span>for creators worldwide.</span>
                    </div>
                    <div className="flex gap-4 sm:gap-6">
                        <a href="#" className="hover:underline hover:text-black transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:underline hover:text-black transition-colors">Terms of Service</a>
                        <a href="#" className="hover:underline hover:text-black transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
