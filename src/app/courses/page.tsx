"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/components/providers/LanguageProvider";

import Link from "next/link";

// Mock Data for Courses
const COURSES = [
    {
        id: 1,
        title: "Python for Beginners",
        language: "Python",
        level: "beginner",
        topic: "dataScience",
        modules: 12,
        rating: 4.8,
        icon: "🐍",
        color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        slug: "python-for-beginners",
    },
    {
        id: 2,
        title: "Advanced Java Patterns",
        language: "Java",
        level: "advanced",
        topic: "systems",
        modules: 20,
        rating: 4.9,
        icon: "☕",
        color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        slug: "advanced-java-patterns",
    },
    {
        id: 3,
        title: "React & Next.js Masterclass",
        language: "JavaScript",
        level: "intermediate",
        topic: "web",
        modules: 15,
        rating: 4.7,
        icon: "⚛️",
        color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        slug: "react-nextjs-masterclass",
    },
    {
        id: 4,
        title: "Data Analysis with Pandas",
        language: "Python",
        level: "intermediate",
        topic: "dataScience",
        modules: 8,
        rating: 4.6,
        icon: "🐼",
        color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
        slug: "data-analysis-pandas",
    },
    {
        id: 5,
        title: "C++ System Programming",
        language: "C++",
        level: "advanced",
        topic: "systems",
        modules: 25,
        rating: 4.9,
        icon: "⚙️",
        color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
        slug: "cpp-system-programming",
    },
    {
        id: 6,
        title: "Mobile Apps with Flutter",
        language: "Dart",
        level: "beginner",
        topic: "mobile",
        modules: 18,
        rating: 4.5,
        icon: "📱",
        color: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
        slug: "mobile-apps-flutter",
    },
];

export default function CoursesPage() {
    const { t } = useLanguage();
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

    // Filter Logic
    const filteredCourses = COURSES.filter(course => {
        if (selectedLanguage && course.language !== selectedLanguage) return false;
        if (selectedLevel && course.level !== selectedLevel) return false;
        if (selectedTopic && course.topic !== selectedTopic) return false;
        return true;
    });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Navbar variant="solid" />

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Sidebar Filters */}
                    <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
                        <div className="flex items-center gap-2 mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t.courses.filterTitle}</h2>
                        </div>

                        {/* Language Filter */}
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wide">{t.courses.language}</h3>
                            <div className="space-y-2">
                                {["Python", "Java", "JavaScript", "C++", "Dart"].map(lang => (
                                    <label key={lang} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="language"
                                            className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
                                            checked={selectedLanguage === lang}
                                            onChange={() => setSelectedLanguage(selectedLanguage === lang ? null : lang)}
                                            onClick={() => { if (selectedLanguage === lang) setSelectedLanguage(null); }}
                                        />
                                        <span className="text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors text-sm">{lang}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Level Filter */}
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wide">{t.courses.level}</h3>
                            <div className="space-y-2">
                                {[
                                    { id: "beginner", label: t.courses.beginner },
                                    { id: "intermediate", label: t.courses.intermediate },
                                    { id: "advanced", label: t.courses.advanced }
                                ].map(level => (
                                    <label key={level.id} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="level"
                                            className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
                                            checked={selectedLevel === level.id}
                                            onChange={() => setSelectedLevel(selectedLevel === level.id ? null : level.id)}
                                            onClick={() => { if (selectedLevel === level.id) setSelectedLevel(null); }}
                                        />
                                        <span className="text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors text-sm">{level.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Topic Filter */}
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wide">{t.courses.topic}</h3>
                            <div className="space-y-2">
                                {[
                                    { id: "web", label: t.courses.web },
                                    { id: "dataScience", label: t.courses.dataScience },
                                    { id: "mobile", label: t.courses.mobile },
                                    { id: "systems", label: t.courses.systems }
                                ].map(topic => (
                                    <label key={topic.id} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="topic"
                                            className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
                                            checked={selectedTopic === topic.id}
                                            onChange={() => setSelectedTopic(selectedTopic === topic.id ? null : topic.id)}
                                            onClick={() => { if (selectedTopic === topic.id) setSelectedTopic(null); }}
                                        />
                                        <span className="text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors text-sm">{topic.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Course Grid */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t.courses.title}</h1>
                            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">{filteredCourses.length} results</span>
                        </div>

                        {filteredCourses.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredCourses.map(course => (
                                    <Link href={`/courses/${course.slug}`} key={course.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col">
                                        <div className="p-6 flex-1">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className={`w-12 h-12 rounded-xl ${course.color} flex items-center justify-center text-2xl shadow-sm`}>
                                                    {course.icon}
                                                </div>
                                                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-xs font-bold text-slate-600 dark:text-slate-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    {course.rating}
                                                </div>
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">{course.title}</h3>
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 capitalize">
                                                    {course.level}
                                                </span>
                                                <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
                                                    {course.modules} {t.courses.modules}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 rounded-b-xl flex justify-between items-center">
                                            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">{course.language}</span>
                                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">Start &rarr;</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 border-dashed">
                                <div className="text-5xl mb-4">🔍</div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No courses found</h3>
                                <p className="text-slate-500 dark:text-slate-400">Try adjusting your filters to see more results.</p>
                                <button
                                    onClick={() => { setSelectedLanguage(null); setSelectedLevel(null); setSelectedTopic(null); }}
                                    className="mt-6 text-blue-600 dark:text-blue-400 font-bold hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
