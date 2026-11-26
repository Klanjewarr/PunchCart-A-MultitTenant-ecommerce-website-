"use client";

import { useState } from "react";
import Link from "next/link";
import { 
    Mail, MapPin, Clock, MessageSquare, ArrowRight, 
    Send, CheckCircle2, Sparkles, HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("support");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!name || !email || !message) {
            toast.error("Please fill out all required fields.");
            return;
        }

        setIsSubmitting(true);

        // Mock network delay
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            toast.success("Message sent successfully! 🚀", {
                description: "Our support crew is on it. Expect a reply soon.",
            });
        }, 1500);
    };

    return (
        <div className="bg-[#F4F4F0] min-h-screen text-black py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-16">
                
                {/* Hero Section */}
                <div className="text-center space-y-6 max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-[#FFCAB0] border border-black px-4 py-1 text-sm rounded-full font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <MessageSquare className="size-4 text-black fill-black/10" />
                        Get In Touch
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none">
                        We&apos;re here to help you scale.
                    </h1>
                    <p className="text-lg md:text-xl font-medium text-muted-foreground max-w-xl mx-auto">
                        Have a question about Stripe payments, subdomains, or premium plans? Drop us a line and we&apos;ll reply in no time.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                    
                    {/* Left Pane: Info Columns (5 cols) */}
                    <div className="lg:col-span-5 flex flex-col gap-6 justify-between h-full">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-black uppercase tracking-tight">Support Headquarters</h2>
                            <p className="text-muted-foreground text-sm font-normal leading-relaxed">
                                Our dedicated support team is spread across multiple time zones to make sure you get quick answers when you need them most.
                            </p>
                            
                            {/* Contact Detail Cards */}
                            <div className="space-y-4">
                                {[
                                    {
                                        icon: Mail,
                                        title: "Direct Emails",
                                        desc: "Support: support@punchcart.com\nSales: partner@punchcart.com",
                                        color: "bg-[#7EC8E3]"
                                    },
                                    {
                                        icon: Clock,
                                        title: "Support Schedules",
                                        desc: "Monday - Friday, 9:00 AM - 6:00 PM PST\nCreator Pro Priority Support: 24/7/365",
                                        color: "bg-[#FFE066]"
                                    },
                                    {
                                        icon: MapPin,
                                        title: "Global Office",
                                        desc: "100 Creative Commons Blvd, Suite 400\nSan Francisco, CA 94107",
                                        color: "bg-[#96E6B3]"
                                    }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-white border-2 border-black rounded-sm p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-start gap-4">
                                        <div className={`size-10 rounded-sm border border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${item.color}`}>
                                            <item.icon className="size-5 text-black" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-bold text-sm uppercase tracking-wide">{item.title}</h3>
                                            <p className="text-muted-foreground text-xs font-normal leading-relaxed whitespace-pre-line">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fast Support Banner */}
                        <div className="bg-[#D8B5FF] border-2 border-black rounded-sm p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-3">
                            <div className="flex items-center gap-1.5 text-xs font-black uppercase">
                                <Sparkles className="size-3.5 fill-black text-black" />
                                Premium Response Rates
                            </div>
                            <h4 className="font-bold text-base uppercase">Are you a Creator Pro member?</h4>
                            <p className="text-black/85 text-xs font-medium leading-relaxed">
                                Pro members get access to a private priority support queue with a guaranteed response window of under 2 hours.
                            </p>
                        </div>
                    </div>

                    {/* Right Pane: Contact Form (7 cols) */}
                    <div className="lg:col-span-7">
                        <div className="bg-white border-2 border-black rounded-sm p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col justify-center min-h-[500px]">
                            
                            {!isSubmitted ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-black uppercase tracking-tight">Send Us A Message</h2>
                                        <p className="text-muted-foreground text-sm font-normal">
                                            Fill out the form below and we&apos;ll route your request instantly.
                                        </p>
                                    </div>

                                    {/* Name Field */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider block">Your Name <span className="text-pink-500 font-bold">*</span></label>
                                        <input 
                                            type="text" 
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Jane Doe"
                                            className="w-full px-4 py-2.5 text-sm font-medium border border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-pink-100/30 focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all bg-white"
                                        />
                                    </div>

                                    {/* Email Field */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider block">Email Address <span className="text-pink-500 font-bold">*</span></label>
                                        <input 
                                            type="email" 
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="jane@creatorspace.com"
                                            className="w-full px-4 py-2.5 text-sm font-medium border border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-pink-100/30 focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all bg-white"
                                        />
                                    </div>

                                    {/* Topic Selector */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider block">What is your question about?</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { id: "support", label: "Help Crew" },
                                                { id: "sales", label: "Partners" },
                                                { id: "billing", label: "Billing" },
                                            ].map((topic) => (
                                                <button
                                                    key={topic.id}
                                                    type="button"
                                                    onClick={() => setSubject(topic.id)}
                                                    className={`px-3 py-2 text-xs font-bold border border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all uppercase tracking-wider ${
                                                        subject === topic.id ? "bg-pink-400 text-black" : "bg-white"
                                                    }`}
                                                >
                                                    {topic.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Message Field */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider block">Your Message <span className="text-pink-500 font-bold">*</span></label>
                                        <textarea 
                                            required
                                            rows={4}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="How can we help your digital business succeed?"
                                            className="w-full px-4 py-2.5 text-sm font-medium border border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-pink-100/30 focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all bg-white resize-none"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <Button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="w-full bg-black hover:bg-black/90 text-white font-bold border border-black shadow-[4px_4px_0px_0px_rgba(255,210,252,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(255,210,252,1)] disabled:opacity-50 disabled:pointer-events-none transition-all py-6 text-sm uppercase tracking-wider"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                Sending details...
                                                <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                Transmit Message
                                                <Send className="size-4" />
                                            </span>
                                        )}
                                    </Button>
                                </form>
                            ) : (
                                /* Success State */
                                <div className="text-center space-y-6 py-10 animate-fade-in">
                                    <div className="inline-flex items-center justify-center size-20 rounded-full border-2 border-black bg-[#96E6B3] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <CheckCircle2 className="size-10 text-black stroke-[2.5px]" />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-black uppercase tracking-tight">Transmission Complete!</h2>
                                        <p className="text-muted-foreground text-sm font-medium max-w-sm mx-auto leading-relaxed">
                                            Thank you, <span className="font-bold text-black">{name}</span>! Your request has been securely routed to our <span className="font-bold text-black">{subject}</span> desk.
                                        </p>
                                    </div>
                                    <div className="bg-[#F4F4F0] border border-black rounded-sm p-4 text-xs font-bold text-left max-w-sm mx-auto shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] space-y-1">
                                        <div className="flex justify-between">
                                            <span>Subject:</span>
                                            <span className="uppercase text-pink-600">{subject}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Reference ID:</span>
                                            <span className="font-normal text-muted-foreground">PC-{Math.floor(100000 + Math.random() * 900000)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Est. Reply Time:</span>
                                            <span className="text-emerald-600">&lt; 4 hours</span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            setName("");
                                            setEmail("");
                                            setMessage("");
                                        }}
                                        className="text-sm font-bold text-black underline hover:text-pink-600 transition-colors uppercase tracking-wide block mx-auto"
                                    >
                                        Submit another response
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

                {/* Quick documentation help deck */}
                <div className="border-2 border-black rounded-sm bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center space-y-4 max-w-3xl mx-auto flex flex-col md:flex-row md:text-left justify-between items-center gap-6">
                    <div className="space-y-1.5 max-w-lg">
                        <h3 className="text-xl font-bold uppercase tracking-tight flex items-center justify-center md:justify-start gap-2">
                            <HelpCircle className="size-6 text-black" />
                            Looking for quick answers?
                        </h3>
                        <p className="text-muted-foreground text-sm font-normal leading-relaxed">
                            Check out our comprehensive Developer Documentation and Creator Guides first. 80% of our creators find solutions in seconds.
                        </p>
                    </div>
                    <Button asChild variant="outline" className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-sm bg-white hover:bg-neutral-50 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all whitespace-nowrap shrink-0">
                        <Link href="/features" className="flex items-center gap-2">
                            Read Creator Guides
                            <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>

            </div>
        </div>
    );
}
