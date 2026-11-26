
import { generateTenantURL } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
    slug: string;
}

export const Navbar = ({ slug }: Props) => {
    return (
        <nav className="h-20 border-b-2 border-black font-bold bg-[#F4F4F0] sticky top-0 z-50">
            <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
                <div className="flex items-center gap-x-2.5">
                    <span className="inline-block w-3.5 h-3.5 bg-pink-400 border border-black rotate-45 shadow-[1px_1px_0px_rgba(0,0,0,1)]"></span>
                    <p className="text-xl font-black uppercase tracking-widest text-black">Checkout Console</p>
                </div>

                <Button
                    variant="elevated"
                    asChild
                    className="border-2 border-black rounded-none bg-yellow-200 text-black hover:bg-yellow-300 font-bold uppercase tracking-wider text-xs px-4 py-2 shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer"
                >
                    <Link href={generateTenantURL(slug)}>
                        Continue Shopping
                    </Link>
                </Button>
            </div>
        </nav>
    )
}

