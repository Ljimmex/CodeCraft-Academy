"use client";

import { useState } from "react";
import { useUser } from "@stackframe/stack";
import { completeOnboarding } from "@/actions/onboarding";
import { useRouter } from "next/navigation";

export default function OnboardingModal() {
    const user = useUser();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        coding_goal: "",
        preferred_language: "",
        username: user?.displayName || "",
        avatar_slug: "",
    });

    const goals = [
        { id: "career", label: "Career Change", icon: "💼" },
        { id: "hobby", label: "Hobby Project", icon: "🎨" },
        { id: "school", label: "School / University", icon: "🎓" },
        { id: "upskill", label: "Upskilling", icon: "🚀" },
    ];

    const languages = [
        { id: "python", label: "Python", icon: "🐍" },
        { id: "javascript", label: "JavaScript", icon: "📜" },
        { id: "java", label: "Java", icon: "☕" },
        { id: "cpp", label: "C++", icon: "⚙️" },
    ];

    const avatars = [
        { id: "algo-bot", label: "The Algo-Bot", desc: "Friendly AI helper", img: "/avatars/algo-bot.png" },
        { id: "cyber-ninja", label: "The Cyber Ninja", desc: "Hacker & Puzzle Solver", img: "/avatars/cyber-ninja.png" },
        { id: "code-wizard", label: "The Code Wizard", desc: "Wise Architect", img: "/avatars/code-wizard.png" },
        { id: "debugging-cat", label: "The Debugging Cat", desc: "Rubber Duck Fan", img: "/avatars/debugging-cat.png" },
        { id: "space-explorer", label: "The Space Explorer", desc: "Visionary Fullstack", img: "/avatars/space-explorer.png" },
    ];

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            await completeOnboarding({
                coding_goal: formData.coding_goal,
                preferred_language: formData.preferred_language,
                username: formData.username,
                avatar_slug: formData.avatar_slug,
            });
            // Force a hard refresh to update server components
            window.location.reload();
        } catch (error) {
            console.error("Failed to save onboarding:", error);
            setIsLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Progress Bar */}
                <div className="h-1.5 bg-slate-100 w-full">
                    <div
                        className="h-full bg-blue-600 transition-all duration-500 ease-out"
                        style={{ width: `${(step / 4) * 100}%` }}
                    ></div>
                </div>

                <div className="p-8 max-h-[80vh] overflow-y-auto">
                    {/* Step 1: Goal */}
                    {step === 1 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">What brings you here?</h2>
                                <p className="text-slate-500">Select your primary goal to help us personalize your path.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {goals.map((goal) => (
                                    <button
                                        key={goal.id}
                                        onClick={() => setFormData({ ...formData, coding_goal: goal.id })}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${formData.coding_goal === goal.id
                                                ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                                                : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                                            }`}
                                    >
                                        <div className="text-2xl mb-2">{goal.icon}</div>
                                        <div className="font-bold text-slate-900">{goal.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Language */}
                    {step === 2 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Choose your weapon</h2>
                                <p className="text-slate-500">Which language do you want to focus on first?</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.id}
                                        onClick={() => setFormData({ ...formData, preferred_language: lang.id })}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${formData.preferred_language === lang.id
                                                ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                                                : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                                            }`}
                                    >
                                        <div className="text-2xl mb-2">{lang.icon}</div>
                                        <div className="font-bold text-slate-900">{lang.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Avatar */}
                    {step === 3 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Choose your Avatar</h2>
                                <p className="text-slate-500">Select a character that represents you.</p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {avatars.map((avatar) => (
                                    <button
                                        key={avatar.id}
                                        onClick={() => setFormData({ ...formData, avatar_slug: avatar.id })}
                                        className={`p-3 rounded-xl border-2 text-center transition-all flex flex-col items-center gap-2 ${formData.avatar_slug === avatar.id
                                                ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                                                : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                                            }`}
                                    >
                                        <img src={avatar.img} alt={avatar.label} className="w-16 h-16 object-contain" />
                                        <div>
                                            <div className="font-bold text-sm text-slate-900">{avatar.label}</div>
                                            <div className="text-[10px] text-slate-500 leading-tight">{avatar.desc}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Profile */}
                    {step === 4 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Almost there!</h2>
                                <p className="text-slate-500">Confirm your profile details to get started.</p>
                            </div>

                            <div className="flex flex-col items-center gap-4">
                                <div className="w-24 h-24 rounded-full bg-slate-200 overflow-hidden border-4 border-white shadow-lg relative">
                                    {formData.avatar_slug ? (
                                        <img src={`/avatars/${formData.avatar_slug}.png`} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : user.profileImageUrl ? (
                                        <img src={user.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white text-3xl font-bold">
                                            {formData.username ? formData.username[0].toUpperCase() : "U"}
                                        </div>
                                    )}
                                </div>

                                <div className="w-full">
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Username</label>
                                    <input
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                        placeholder="Choose a username"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Footer Buttons */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
                        <button
                            onClick={handleBack}
                            disabled={step === 1}
                            className={`px-6 py-2 rounded-lg font-bold text-slate-500 hover:bg-slate-100 transition-colors ${step === 1 ? "opacity-0 pointer-events-none" : ""
                                }`}
                        >
                            Back
                        </button>

                        {step < 4 ? (
                            <button
                                onClick={handleNext}
                                disabled={
                                    (step === 1 && !formData.coding_goal) ||
                                    (step === 2 && !formData.preferred_language) ||
                                    (step === 3 && !formData.avatar_slug)
                                }
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-900/20"
                            >
                                Continue
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading || !formData.username}
                                className="px-8 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-900/20 flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Setting up...
                                    </>
                                ) : (
                                    "Finish Setup"
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
