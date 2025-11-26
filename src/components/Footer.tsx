"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-8 mt-auto transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <img src="/CodeAcademy.png" alt="CodeCraft Academy Logo" className="w-6 h-6 rounded object-cover bg-white" />
                    <span className="font-bold text-slate-900 dark:text-white">CodeCraft Academy</span>
                    <span className="text-slate-400 dark:text-slate-500 text-sm ml-4">Support: support@codecraftacademy.com</span>
                </div>
                <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</Link>
                    <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Sitemap</Link>
                </div>
                <div className="flex gap-4 text-slate-400 dark:text-slate-500">
                    {/* Social Icons */}
                    <div className="w-5 h-5 bg-slate-200 dark:bg-slate-700 rounded-full hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors cursor-pointer"></div>
                    <div className="w-5 h-5 bg-slate-200 dark:bg-slate-700 rounded-full hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors cursor-pointer"></div>
                    <div className="w-5 h-5 bg-slate-200 dark:bg-slate-700 rounded-full hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors cursor-pointer"></div>
                    <div className="w-5 h-5 bg-slate-200 dark:bg-slate-700 rounded-full hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors cursor-pointer"></div>
                </div>
            </div>
        </footer>
    );
}
