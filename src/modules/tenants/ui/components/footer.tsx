import Link from "next/link"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
})

export const Footer = () => {
    return (
        <footer className="border-t-2 border-black font-bold bg-[#F4F4F0] py-8 text-black">
            <div className="max-w-(--breakpoint-xl) mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 px-4 lg:px-12">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
                    © {new Date().getFullYear()} All Rights Reserved.
                </p>
                <div className="flex gap-2 items-center text-sm font-bold border-2 border-black bg-white px-4 py-2 rounded-sm shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all">
                    <span>Powered by</span>
                    <Link href="/">
                        <span className={cn("text-lg font-black uppercase tracking-tight text-pink-600 hover:text-black transition-colors", poppins.className)}>
                            punchcart
                        </span>
                    </Link>
                </div>
            </div>
        </footer>
    )
}