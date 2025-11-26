import pool from "@/lib/db";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import ActivityHeatmap from "@/components/ActivityHeatmap";
import { stackServerApp } from "@/stack";
import { dictionaries } from "@/lib/i18n/dictionaries";

export default async function PublicProfilePage({ params }: { params: { username: string } }) {
    const { username } = params;

    // Fetch viewer to determine language
    const viewer = await stackServerApp.getUser();
    let lang = "en";

    if (viewer) {
        const client = await pool.connect();
        try {
            const res = await client.query("SELECT language FROM users WHERE auth_id = $1", [viewer.id]);
            if (res.rows[0]?.language) {
                lang = res.rows[0].language;
            }
        } finally {
            client.release();
        }
    }
    const t = dictionaries[lang] || dictionaries.en;

    // Fetch user stats from our DB
    const client = await pool.connect();
    let dbUser;
    try {
        const res = await client.query(
            "SELECT total_xp, created_at, username, bio, badges, certificates, auth_id, avatar_slug FROM users WHERE username = $1",
            [username]
        );
        dbUser = res.rows[0];
    } finally {
        client.release();
    }

    if (!dbUser) {
        notFound();
    }

    // Mock Heatmap Data (last 365 days)
    const heatmapData = Array.from({ length: 52 * 7 }, (_, i) => ({
        date: new Date(Date.now() - (364 - i) * 24 * 60 * 60 * 1000),
        count: Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0,
    }));

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Navbar className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700" variant="solid" />

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: User Card */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 text-center">
                            <div className="relative inline-block mb-4">
                                <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-3xl font-bold text-slate-500 dark:text-slate-400 overflow-hidden mx-auto border-4 border-white dark:border-slate-600 shadow-md">
                                    {dbUser.avatar_slug ? (
                                        <img src={`/avatars/${dbUser.avatar_slug}.png`} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <span>{dbUser.username[0].toUpperCase()}</span>
                                    )}
                                </div>
                            </div>

                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{dbUser.username}</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">@{dbUser.username}</p>

                            {dbUser.bio && (
                                <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed">
                                    {dbUser.bio}
                                </p>
                            )}

                            <div className="flex justify-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
                                <div className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>{t.profile.joined} {dbUser.created_at ? new Date(dbUser.created_at).toLocaleDateString() : t.profile.recently}</span>
                                </div>
                            </div>
                        </div>

                        {/* Stats Summary */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4">{t.profile.stats}</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 dark:text-slate-400 text-sm">{t.profile.totalXp}</span>
                                    <span className="font-bold text-slate-900 dark:text-white">{dbUser.total_xp || 0}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 dark:text-slate-400 text-sm">{t.profile.currentStreak}</span>
                                    <span className="font-bold text-slate-900 dark:text-white">3 {t.profile.days}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 dark:text-slate-400 text-sm">{t.profile.problemsSolved}</span>
                                    <span className="font-bold text-slate-900 dark:text-white">12</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Activity & Achievements */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Heatmap */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-6">{t.profile.activity}</h3>
                            <ActivityHeatmap data={heatmapData} />
                        </div>

                        {/* Badges Showcase */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-6">{t.profile.badges}</h3>
                            {dbUser.badges && dbUser.badges.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {/* Map badges here */}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                                    <div className="text-4xl mb-2 grayscale opacity-50">🏅</div>
                                    <p>{t.profile.noBadges}</p>
                                </div>
                            )}
                        </div>

                        {/* Certificates */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-6">{t.profile.certificates}</h3>
                            {dbUser.certificates && dbUser.certificates.length > 0 ? (
                                <div className="space-y-4">
                                    {/* Map certificates here */}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                                    <div className="text-4xl mb-2 grayscale opacity-50">📜</div>
                                    <p>{t.profile.noCertificates}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
