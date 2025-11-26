"use client";

import { useUser } from "@stackframe/stack";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { getCurrentUser } from "@/actions/user";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function UserMenu() {
    const user = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [localUser, setLocalUser] = useState<any>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();

    useEffect(() => {
        async function fetchUser() {
            if (user) {
                const data = await getCurrentUser();
                setLocalUser(data);
            }
        }
        fetchUser();
    }, [user]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!user) return null;

    const displayName = localUser?.username || user.displayName || "User";
    const avatarSlug = localUser?.avatar_slug;

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 focus:outline-none transition-transform active:scale-95"
            >
                <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border-2 border-white dark:border-slate-600 shadow-sm ring-2 ring-slate-100 dark:ring-slate-800 hover:ring-blue-100 dark:hover:ring-blue-900 transition-all">
                    {avatarSlug ? (
                        <img src={`/avatars/${avatarSlug}.png`} alt="Avatar" className="w-full h-full object-cover" />
                    ) : user.profileImageUrl ? (
                        <img src={user.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm font-bold">
                            {displayName[0].toUpperCase()}
                        </div>
                    )}
                </div>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-[100] animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700 mb-1">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{displayName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.primaryEmail}</p>
                    </div>

                    <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {t.navbar.profile}
                    </Link>

                    <Link
                        href="/settings"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {t.navbar.settings}
                    </Link>

                    <div className="border-t border-slate-100 dark:border-slate-700 my-1"></div>

                    <button
                        onClick={() => {
                            setIsOpen(false);
                            user.signOut();
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        {t.navbar.signOut}
                    </button>
                </div>
            )}
        </div>
    );
}
