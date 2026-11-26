import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

interface LogoProps {
  showText?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const LogoIcon = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center bg-pink-400 border-2 border-black rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5 select-none shrink-0",
        className || "size-11"
      )}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[72%] h-[72%]"
      >
        {/* Shadow layer for the P */}
        <path
          d="M32 80V22H58C69.0457 22 78 30.9543 78 42C78 53.0457 69.0457 62 58 62H48V80H32Z"
          fill="#000000"
          transform="translate(4, 4)"
        />
        {/* Main white P letterform */}
        <path
          d="M32 80V22H58C69.0457 22 78 30.9543 78 42C78 53.0457 69.0457 62 58 62H48V80H32Z"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="7"
          strokeLinejoin="round"
        />
        {/* Inner cutout of the P bowl */}
        <path
          d="M48 35H56C59.866 35 63 38.134 63 42C63 45.866 59.866 49 56 49H48V35Z"
          fill="#000000"
        />
        {/* Sparkle punch accent in vibrant yellow */}
        <path
          d="M74 20L77 12L85 15L79 22L84 30L76 27L72 34L71 25L64 22L71 18L74 20Z"
          fill="#FFE066"
          stroke="#000000"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export const Logo = ({ showText = true, size = "md", className }: LogoProps) => {
  const sizeClasses = {
    sm: "size-8",
    md: "size-10",
    lg: "size-12",
    xl: "size-14",
  };

  const textClasses = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-4xl",
    xl: "text-5xl",
  };

  return (
    <Link href="/" className={cn("flex items-center gap-3 group select-none", className)}>
      <LogoIcon className={sizeClasses[size]} />
      {showText && (
        <span
          className={cn(
            "font-black tracking-tight text-black transition-colors group-hover:text-pink-600",
            textClasses[size],
            poppins.className
          )}
        >
          Punch<span className="text-black group-hover:text-black">Cart</span>
        </span>
      )}
    </Link>
  );
};
