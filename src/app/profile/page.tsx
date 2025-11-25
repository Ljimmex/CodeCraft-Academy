import { stackServerApp } from "@/stack";
import { UserButton } from "@stackframe/stack";
import pool, { syncUser } from "@/lib/db";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import ActivityHeatmap from "@/components/ActivityHeatmap";

export default async function ProfilePage() {
    const user = await stackServerApp.getUser();

    if (!user) {
        redirect("/login");
    }

    // Sync user to local DB
    await syncUser(user);

    // Fetch user stats from our DB
    const client = await pool.connect();
    let dbUser;
    try {
        const res = await client.query(
            "SELECT total_xp, created_at, username, bio, badges, certificates FROM users WHERE auth_id = $1",
            [user.id]
        );
        dbUser = res.rows[0];
    } finally {
        client.release();
    }

    // Mock Heatmap Data (last 365 days)
    const heatmapData = Array.from({ length: 52 * 7 }, (_, i) => ({
        date: new Date(Date.now() - (364 - i) * 24 * 60 * 60 * 1000),
        count: Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0,
    }));

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar className="bg-white border-b border-slate-200" variant="solid" />

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: User Card */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
                            <div className="relative inline-block mb-4">
                                <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center text-3xl font-bold text-slate-500 overflow-hidden mx-auto">
                                    {user.profileImageUrl ? (
                                        <img src={user.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <span>{user.displayName ? user.displayName[0] : "?"}</span>
                                    )}
                                </div>
                                <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full" title="Online"></div>
                            </div>

                            <h1 className="text-2xl font-bold text-slate-900 mb-1">{user.displayName || "Anonymous Coder"}</h1>
                            <p className="text-slate-500 text-sm mb-4">@{dbUser?.username || "username"}</p>

                            {dbUser?.bio && (
                                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                                    {dbUser.bio}
                                </p>
                            )}

                            <div className="flex justify-center gap-4 text-sm text-slate-500 mb-6">
                                <div className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>Joined {dbUser?.created_at ? new Date(dbUser.created_at).toLocaleDateString() : "Recently"}</span>
                                </div>
                            </div>

                            <a href={stackServerApp.urls.accountSettings} className="btn btn-outline btn-sm w-full">
                                Edit Profile
                            </a>
                        </div>

                        {/* Stats Summary */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-4">Stats</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 text-sm">Total XP</span>
                                    <span className="font-bold text-slate-900">{dbUser?.total_xp || 0}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 text-sm">Current Streak</span>
                                    <span className="font-bold text-slate-900">3 Days</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 text-sm">Problems Solved</span>
                                    <span className="font-bold text-slate-900">12</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Activity & Achievements */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Heatmap */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-6">Activity</h3>
                            <ActivityHeatmap data={heatmapData} />
                        </div>

                        {/* Badges Showcase */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-6">Badges</h3>
                            {dbUser?.badges && dbUser.badges.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {/* Map badges here */}
                                    {/* Example Badge */}
                                    <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="text-4xl mb-2">🏆</div>
                                        <div className="font-bold text-sm text-slate-900">First Win</div>
                                        <div className="text-xs text-slate-500">Solved 1st problem</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-slate-500">
                                    <div className="text-4xl mb-2 grayscale opacity-50">🏅</div>
                                    <p>No badges earned yet. Keep coding!</p>
                                </div>
                            )}
                        </div>

                        {/* Certificates */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-6">Certificates</h3>
                            {dbUser?.certificates && dbUser.certificates.length > 0 ? (
                                <div className="space-y-4">
                                    {/* Map certificates here */}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-slate-500">
                                    <div className="text-4xl mb-2 grayscale opacity-50">📜</div>
                                    <p>No certificates earned yet. Complete a course to earn one!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
