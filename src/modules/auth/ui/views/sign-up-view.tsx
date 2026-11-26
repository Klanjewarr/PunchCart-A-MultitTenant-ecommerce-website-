"use client";

import { Poppins } from "next/font/google"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { registerSchema } from "../../schemas";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"
import { useRouter } from "next/navigation";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});

export const SignUpView = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const trpc = useTRPC();
    const register = useMutation(trpc.auth.register.mutationOptions({
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(trpc.auth.session.queryOptions())
            router.push("/");
        }
    }));

    const form = useForm<z.infer<typeof registerSchema>>({
        mode: 'all',
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
        },
    });

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        register.mutate(values);
        // Here you would typically call your registration API
    }

    const username = form.watch('username');
    const usernameErrors = form.formState.errors.username;

    const showPreview = username && !usernameErrors;



    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 min-h-screen">
            <div className="bg-[#F4F4F0] min-h-screen w-full lg:col-span-3 overflow-y-auto flex flex-col justify-between py-8 px-4 sm:px-8 lg:px-16">
                <div className="w-full max-w-xl mx-auto flex items-center justify-between mb-8">
                    <Link href="/">
                        <span className={cn("text-3xl font-black tracking-tight uppercase border-2 border-black bg-pink-400 px-4 py-1.5 shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all", poppins.className)}>
                            PunchCart
                        </span>
                    </Link>

                    <Button
                        asChild
                        variant="elevated"
                        size="sm"
                        className="text-sm font-bold border-2 border-black bg-white hover:bg-pink-400 hover:text-black uppercase tracking-wider"
                    >
                        <Link prefetch href="/sign-in">
                            Sign in
                        </Link>
                    </Button>
                </div>

                <div className="w-full max-w-xl mx-auto my-auto py-8">
                    <div className="bg-white border-2 border-black p-8 lg:p-12 rounded-sm shadow-[8px_8px_0px_rgba(0,0,0,1)] space-y-8">
                        <div className="space-y-3">
                            <div className="inline-flex items-center gap-1 bg-[#FFE066] border border-black px-3 py-1 font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                Start Selling
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-black uppercase tracking-tight leading-none text-black">
                                Join over 1,570+ creators earning money on PunchCart.
                            </h1>
                            <p className="text-muted-foreground text-sm font-medium">
                                Create your store in seconds and start selling your design assets, templates, or code files instantly.
                            </p>
                        </div>

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flex flex-col gap-6"
                            >
                                <FormField
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-black">Username / Store Handle</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="jane_creative"
                                                    className="border-2 border-black rounded-sm shadow-[3px_3px_0px_rgba(0,0,0,1)] focus:outline-none focus-visible:ring-0 focus-visible:border-black focus-visible:shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:bg-pink-100/10 transition-all font-medium px-4 h-12"
                                                    {...field}
                                                />
                                            </FormControl>
                                            {showPreview && (
                                                <div className="bg-pink-50 border border-black p-3 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)] text-xs font-bold text-black flex items-center justify-between animate-fade-in">
                                                    <span>Your Store URL:</span>
                                                    <span className="text-pink-600 font-black tracking-wide lowercase">{username}.punchcart.store</span>
                                                </div>
                                            )}
                                            <FormMessage className="text-xs font-bold text-red-500" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-black">Email Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="jane@creatorspace.com"
                                                    className="border-2 border-black rounded-sm shadow-[3px_3px_0px_rgba(0,0,0,1)] focus:outline-none focus-visible:ring-0 focus-visible:border-black focus-visible:shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:bg-pink-100/10 transition-all font-medium px-4 h-12"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs font-bold text-red-500" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-black">Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    className="border-2 border-black rounded-sm shadow-[3px_3px_0px_rgba(0,0,0,1)] focus:outline-none focus-visible:ring-0 focus-visible:border-black focus-visible:shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:bg-pink-100/10 transition-all font-medium px-4 h-12"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs font-bold text-red-500" />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    disabled={register.isPending}
                                    type="submit"
                                    size="lg"
                                    className="w-full bg-black text-white hover:bg-pink-400 hover:text-black font-bold border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_rgba(0,0,0,1)] disabled:opacity-50 transition-all py-6 text-sm uppercase tracking-wider"
                                >
                                    {register.isPending ? (
                                        <span className="flex items-center gap-2">
                                            Creating store...
                                            <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        </span>
                                    ) : (
                                        "Create account"
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>

                <div className="w-full max-w-xl mx-auto mt-8 flex justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider border-t-2 border-black/10 pt-4">
                    <span>© {new Date().getFullYear()} PunchCart</span>
                    <Link href="/contact" className="hover:underline hover:text-black">
                        Help & Support
                    </Link>
                </div>
            </div>

            <div className="h-screen w-full lg:col-span-2 hidden lg:block border-l-2 border-black"
                style={{
                    backgroundImage: "url('/auth_bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
        </div>
    );
}