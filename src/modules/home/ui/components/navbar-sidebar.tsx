import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

import type { User } from "@/payload-types";

interface NavbarItem {
    href: string;
    children: React.ReactNode;
}

interface Props {
    items: NavbarItem[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
    session?: {
        user?: User | null;
    } | null;
}

export const NavbarSidebar = ({
    items, open, onOpenChange, session }: Props
) => {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="left" className="p-0 transition-none bg-white">
                <SheetHeader className="p-4 border-b border-black">
                    <SheetTitle className="font-black uppercase tracking-wider text-black">
                        Menu
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">

                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-bold transition-all border-b border-neutral-100"
                            onClick={() => onOpenChange(false)}
                        >
                            {item.children}
                        </Link>
                    ))}

                    <div className="border-t border-black mt-2">
                        {session?.user ? (
                            <Link
                                onClick={() => onOpenChange(false)}
                                href="/admin"
                                className="w-full text-left bg-black text-white hover:bg-pink-400 hover:text-black p-4 flex items-center text-base font-black uppercase tracking-wider transition-colors"
                            >
                                Dashboard Console
                            </Link>
                        ) : (
                            <>
                                <Link
                                    onClick={() => onOpenChange(false)}
                                    href="/sign-in"
                                    className="w-full text-left hover:bg-black p-4 hover:text-white flex items-center text-base font-medium transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    onClick={() => onOpenChange(false)}
                                    href="/sign-up"
                                    className="w-full text-left hover:bg-black p-4 hover:text-white flex items-center text-base font-medium transition-colors"
                                >
                                    Start selling
                                </Link>
                            </>
                        )}
                    </div>

                </ScrollArea>
            </SheetContent>
        </Sheet>);
};