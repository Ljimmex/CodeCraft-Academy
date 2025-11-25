"use client";

import { useUser } from "@stackframe/stack";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { getCurrentUser, updateUserProfile } from "@/actions/user";

export default function SettingsPage() {
    const user = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const [formData, setFormData] = useState({
        username: "",
        bio: "",
        coding_goal: "",
        preferred_language: "",
        avatar_slug: "",
    });

    const avatars = [
        { id: "algo-bot", label: "The Algo-Bot", desc: "Friendly AI helper", img: "/avatars/algo-bot.png" },
        { id: "cyber-ninja", label: "The Cyber Ninja", desc: "Hacker & Puzzle Solver", img: "/avatars/cyber-ninja.png" },
        { id: "code-wizard", label: "The Code Wizard", desc: "Wise Architect", img: "/avatars/code-wizard.png" },
        { id: "debugging-cat", label: "The Debugging Cat", desc: "Rubber Duck Fan", img: "/avatars/debugging-cat.png" },
        { id: "space-explorer", label: "The Space Explorer", desc: "Visionary Fullstack", img: "/avatars/space-explorer.png" },
    ];

    useEffect(() => {
        async function fetchUser() {
            if (user) {
                const data = await getCurrentUser();
                if (data) {
                    setFormData({
                        username: data.username || "",
                        bio: data.bio || "",
                        coding_goal: data.coding_goal || "",
                        preferred_language: data.preferred_language || "",
                        avatar_slug: data.avatar_slug || "",
                    });
                }
                setIsLoading(false);
            }
        }
        fetchUser();
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage(null);

        try {
            const result = await updateUserProfile(formData);
            if (result.success) {
                setMessage({ type: "success", text: "Profile updated successfully!" });
                // Force reload to update UserMenu
                window.location.reload();
            } else {
                setMessage({ type: "error", text: "Failed to update profile." });
            }
        } catch (error) {
            setMessage({ type: "error", text: "An unexpected error occurred." });
        } finally {
            setIsSaving(false);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar variant="solid" />

            <main className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Account Settings</h1>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-8 border-b border-slate-100">
                        <h2 className="text-xl font-bold text-slate-900 mb-2">Profile Information</h2>
                        <p className="text-slate-500">Update your public profile details.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {/* Avatar Selection */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-4">Choose your Avatar</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                {avatars.map((avatar) => (
                                    <button
                                        key={avatar.id}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, avatar_slug: avatar.id })}
                                        className={`p-2 rounded-xl border-2 text-center transition-all flex flex-col items-center gap-2 ${formData.avatar_slug === avatar.id
                                            ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                                            : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                                            }`}
                                    >
                                        <img src={avatar.img} alt={avatar.label} className="w-12 h-12 object-contain" />
                                        <div className="text-[10px] font-bold text-slate-900 leading-tight">{avatar.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Current Avatar Display */}
                        <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
                            <div className="w-20 h-20 rounded-full bg-slate-200 overflow-hidden border-4 border-white shadow-md relative">
                                {formData.avatar_slug ? (
                                    <img src={`/avatars/${formData.avatar_slug}.png`} alt="Avatar" className="w-full h-full object-cover" />
                                ) : user.profileImageUrl ? (
                                    <img src={user.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white text-2xl font-bold">
                                        {formData.username ? formData.username[0].toUpperCase() : "U"}
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="font-bold text-slate-900">Current Profile Picture</div>
                                <div className="text-sm text-slate-500">Select an avatar above or use your default image.</div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                    placeholder="username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                                <input
                                    type="text"
                                    value={user.primaryEmail || ""}
                                    disabled
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Bio</label>
                            <textarea
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all h-32 resize-none"
                                placeholder="Tell us a bit about yourself..."
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Coding Goal</label>
                                <select
                                    value={formData.coding_goal}
                                    onChange={(e) => setFormData({ ...formData, coding_goal: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
                                >
                                    <option value="">Select a goal</option>
                                    <option value="career">Career Change</option>
                                    <option value="hobby">Hobby Project</option>
                                    <option value="school">School / University</option>
                                    <option value="upskill">Upskilling</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Language</label>
                                <select
                                    value={formData.preferred_language}
                                    onChange={(e) => setFormData({ ...formData, preferred_language: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
                                >
                                    <option value="">Select a language</option>
                                    <option value="python">Python</option>
                                    <option value="javascript">JavaScript</option>
                                    <option value="java">Java</option>
                                    <option value="cpp">C++</option>
                                </select>
                            </div>
                        </div>

                        {message && (
                            <div className={`p-4 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                                {message.text}
                            </div>
                        )}

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={isSaving || isLoading}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2"
                            >
                                {isSaving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
