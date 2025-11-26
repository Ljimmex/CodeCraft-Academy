"use client";

import Link from "next/link";
import { useUser } from "@stackframe/stack";
import UserMenu from "./UserMenu";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Navbar({ className = "", variant = "transparent" }: { className?: string, variant?: "transparent" | "solid" }) {
    const user = useUser();
    const { t } = useLanguage();

    const isTransparent = variant === "transparent";

    return (
        <header className={`w-full relative z-[100] px-6 py-4 transition-all duration-300 ${isTransparent ? '' : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm'} ${className}`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <img src="/CodeAcademy.png" alt="CodeCraft Academy Logo" className="w-10 h-10 rounded-lg shadow-lg object-cover group-hover:scale-105 transition-transform" />
                    <span className={`font-bold text-lg leading-tight tracking-tight ${isTransparent ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                        CodeCraft Academy
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="/dashboard"
                        className={`text-sm font-medium transition-colors ${isTransparent ? "text-slate-300 hover:text-white" : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                            }`}
                    >
                        {t.navbar.dashboard}
                    </Link>
                    <Link
                        href="/learn"
                        className={`text-sm font-medium transition-colors ${isTransparent ? "text-slate-300 hover:text-white" : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                            }`}
                    >
                        {t.navbar.learn}
                    </Link>
                    <Link
                        href="/challenges"
                        className={`text-sm font-medium transition-colors ${isTransparent ? "text-slate-300 hover:text-white" : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                            }`}
                    >
                        {t.navbar.challenges}
                    </Link>
                    <Link
                        href="/community"
                        className={`text-sm font-medium transition-colors ${isTransparent ? "text-slate-300 hover:text-white" : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                            }`}
                    >
                        {t.navbar.community}
                    </Link>
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <UserMenu />
                    ) : (
                        <>
                            <Link href="/login" className={`hidden md:block px-5 py-2 font-semibold text-sm transition-colors ${isTransparent ? 'text-white hover:text-blue-200' : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'}`}>
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
