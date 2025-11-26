"use client";

import { UserButton, useUser } from "@stackframe/stack";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import OnboardingModal from "@/components/OnboardingModal";
import { checkOnboardingStatus } from "@/actions/onboarding";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const user = useUser();
    const [showOnboarding, setShowOnboarding] = useState(false);

    useEffect(() => {
        async function check() {
            const completed = await checkOnboardingStatus();
            if (!completed) {
                setShowOnboarding(true);
            }
        }
        check();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
            {showOnboarding && <OnboardingModal />}
            {/* Header */}
            <Navbar variant="solid" />

            <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

                {/* Top Section: Hero & Stats */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Hero Card */}
                    <div className="lg:col-span-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
                        <div className="relative z-10">
                            <div className="text-blue-100 text-sm font-medium mb-1 uppercase tracking-wide">Back to Learning</div>
                            <div className="text-blue-200 text-xs mb-4">Continue Module:</div>
                            <h2 className="text-3xl font-bold mb-6">Introduction to For Loops (Python)</h2>

                            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors shadow-sm mb-6">
                                Start
                            </button>

                            <div className="w-full bg-blue-800/50 h-2 rounded-full overflow-hidden">
                                <div className="bg-blue-200 h-full w-[75%] rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-4">
                        {/* XP Card */}
                        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between transition-colors duration-300">
                            <div>
                                <div className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wide mb-1">Current XP & Level</div>
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">500 XP <span className="text-slate-400 dark:text-slate-500 text-lg font-normal">(Lvl 5)</span></div>
                            </div>
                            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                        </div>

                        {/* Streak Card */}
                        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between transition-colors duration-300">
                            <div>
                                <div className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wide mb-1">Weekly Streak</div>
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">3 Days</div>
                            </div>
                            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center text-orange-500 dark:text-orange-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.45-.412-1.725a1 1 0 00-1.457-.895c-.33.183-.65.41-.937.68-.86.808-1.49 2.01-1.49 3.525 0 2.485 1.96 4.5 4.375 4.5a4.375 4.375 0 004.375-4.375c0-.98-.406-1.875-1.066-2.52-.356-.348-.63-.75-.792-1.19a4.825 4.825 0 01-.304-1.7c.01-.475.126-.935.33-1.36.19-.395.405-.77.633-1.11.218-.325.46-.62.716-.88zM8 14.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5S10.328 16 9.5 16 8 15.328 8 14.5z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        {/* Challenges Card */}
                        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between transition-colors duration-300">
                            <div>
                                <div className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wide mb-1">Total Challenges</div>
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">42 <span className="text-xs font-normal text-slate-400 dark:text-slate-500 block">Completed</span></div>
                            </div>
                            <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.616a1 1 0 01.894-1.79l1.599.8L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Personalized Path */}
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Personalized Path</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all cursor-pointer group">
                            <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2">Challenge of the Week</div>
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Reverse a String</h4>
                            <div className="flex justify-between items-center mt-auto">
                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all cursor-pointer group">
                            <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2">Suggested Module</div>
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Data Structures 101</h4>
                            <div className="flex justify-between items-center mt-auto">
                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all cursor-pointer group">
                            <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2">Fix Your Bug</div>
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Correct Your Last Submission</h4>
                            <div className="flex justify-between items-center mt-auto">
                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Grid: Community & Gamification */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Community Activity */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors duration-300">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Community Activity</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-slate-900 dark:text-white">New Forum Post: "Help with recursion!" by UserA</div>
                                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">2.5m ago</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-slate-900 dark:text-white">UserB completed "Web Scraper Project"</div>
                                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">18m ago</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-slate-900 dark:text-white">New Blog: "Top Python Tips" published</div>
                                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">3.3h ago</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gamification */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors duration-300">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Gamification and Achievements</h3>
                        <div className="flex gap-4">
                            {/* Badges */}
                            <div className="flex-1">
                                <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-4">Recent Badges:</div>
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 border-2 border-indigo-200 dark:border-indigo-800">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 text-center leading-tight">Loop<br />Master</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-yellow-600 dark:text-yellow-400 border-2 border-yellow-200 dark:border-yellow-800">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 text-center leading-tight">First 10<br />Challenges</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 border-2 border-orange-200 dark:border-orange-800">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.45-.412-1.725a1 1 0 00-1.457-.895c-.33.183-.65.41-.937.68-.86.808-1.49 2.01-1.49 3.525 0 2.485 1.96 4.5 4.375 4.5a4.375 4.375 0 004.375-4.375c0-.98-.406-1.875-1.066-2.52-.356-.348-.63-.75-.792-1.19a4.825 4.825 0 01-.304-1.7c.01-.475.126-.935.33-1.36.19-.395.405-.77.633-1.11.218-.325.46-.62.716-.88zM8 14.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5S10.328 16 9.5 16 8 15.328 8 14.5z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 text-center leading-tight">Streak<br />Keeper</span>
                                    </div>
                                </div>
                            </div>

                            {/* Mini Leaderboard */}
                            <div className="flex-1 border-l border-slate-100 dark:border-slate-700 pl-4">
                                <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-4">Mini-leaderboard</div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                                        <div className="flex-1">
                                            <div className="text-xs font-bold text-slate-900 dark:text-white">1. UserC</div>
                                            <div className="text-[10px] text-slate-500 dark:text-slate-400">750 XP</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 p-1.5 rounded-lg -mx-1.5">
                                        <div className="w-8 h-8 rounded-full bg-blue-200 dark:bg-blue-800"></div>
                                        <div className="flex-1">
                                            <div className="text-xs font-bold text-blue-900 dark:text-blue-200">2. You</div>
                                            <div className="text-[10px] text-blue-600 dark:text-blue-400">500 XP</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                                        <div className="flex-1">
                                            <div className="text-xs font-bold text-slate-900 dark:text-white">3. UserD</div>
                                            <div className="text-[10px] text-slate-500 dark:text-slate-400">480 XP</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>


        </div>
    );
}
