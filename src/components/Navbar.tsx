"use client";

import Link from "next/link";
import { useUser } from "@stackframe/stack";
import UserMenu from "./UserMenu";

export default function Navbar({ className = "", variant = "transparent" }: { className?: string, variant?: "transparent" | "solid" }) {
    const user = useUser();

    const isTransparent = variant === "transparent";

    return (
        <header className={`w-full relative z-[100] px-6 py-4 transition-all duration-300 ${isTransparent ? '' : 'bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm'} ${className}`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <img src="/CodeAcademy.png" alt="CodeCraft Academy Logo" className="w-10 h-10 rounded-lg shadow-lg object-cover group-hover:scale-105 transition-transform" />
                    <span className={`font-bold text-lg leading-tight tracking-tight ${isTransparent ? 'text-white' : 'text-slate-900'}`}>
                        CodeCraft Academy
                    </span>
                </Link>

                {/* Nav */}
                <nav className={`hidden md:flex items-center gap-8 text-sm font-medium ${isTransparent ? 'text-blue-100' : 'text-slate-600'}`}>
                    <Link href="/#about" className={`transition-colors ${isTransparent ? 'hover:text-white' : 'hover:text-blue-600'}`}>About Us</Link>
                    <Link href="/#courses" className={`transition-colors ${isTransparent ? 'hover:text-white' : 'hover:text-blue-600'}`}>Courses</Link>
                    <Link href="/#pricing" className={`transition-colors ${isTransparent ? 'hover:text-white' : 'hover:text-blue-600'}`}>Pricing</Link>
                </nav>

                {/* Auth Buttons */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <UserMenu />
                    ) : (
                        <>
                            <Link href="/login" className={`hidden md:block px-5 py-2 font-semibold text-sm transition-colors ${isTransparent ? 'text-white hover:text-blue-200' : 'text-slate-600 hover:text-blue-600'}`}>
                                Log In
                            </Link>
                            <Link href="/register" className="btn bg-blue-600 hover:bg-blue-700 text-white border-none font-bold px-6 py-2.5 rounded shadow-lg shadow-blue-600/20 text-sm transition-all hover:-translate-y-0.5">
                                Start Coding for Free
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
