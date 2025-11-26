"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/components/providers/LanguageProvider";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock Data for a specific course
const COURSE_DATA = {
    title: "Python for Beginners",
    description: "Master the fundamentals of Python programming, from variables to data structures.",
    progress: 35, // Percentage
    modules: [
        {
            id: 1,
            title: "Introduction to Python",
            lessons: [
                { id: 101, title: "Setting up your environment", type: "video", status: "done", slug: "setting-up-environment" },
                { id: 102, title: "Module 1 Tasks", type: "tasks", status: "done", slug: "module-1-tasks" },
                { id: 104, title: "Module 1 Quiz", type: "quiz", status: "done", slug: "module-1-quiz" },
            ]
        },
        {
            id: 2,
            title: "Control Flow",
            lessons: [
                { id: 201, title: "If/Else Statements", type: "video", status: "done", slug: "if-else-statements-video" },
                { id: 202, title: "Module 2 Tasks", type: "tasks", status: "todo", slug: "module-2-tasks" },
                { id: 204, title: "Module 2 Quiz", type: "quiz", status: "locked", slug: "module-2-quiz" },
            ]
        },
        {
            id: 3,
            title: "Data Structures",
            lessons: [
                { id: 301, title: "Lists & Dictionaries", type: "video", status: "locked", slug: "lists-dictionaries" },
                { id: 302, title: "Module 3 Tasks", type: "tasks", status: "locked", slug: "module-3-tasks" },
                { id: 304, title: "Module 3 Quiz", type: "quiz", status: "locked", slug: "module-3-quiz" },
            ]
        },
        {
            id: 4,
            title: "Functions & Modules",
            lessons: [
                { id: 401, title: "Defining Functions", type: "video", status: "locked", slug: "defining-functions" },
                { id: 402, title: "Module 4 Tasks", type: "tasks", status: "locked", slug: "module-4-tasks" },
                { id: 404, title: "Module 4 Quiz", type: "quiz", status: "locked", slug: "module-4-quiz" },
            ]
        }
    ]
};

export default function CourseSyllabusPage() {
    const params = useParams();
    const course_slug = Array.isArray(params.course_slug) ? params.course_slug[0] : params.course_slug;
    const { t } = useLanguage();
    const [expandedModules, setExpandedModules] = useState<number[]>([1, 2]); // Default expanded

    const toggleModule = (id: number) => {
        setExpandedModules(prev =>
            prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
        );
    };

    if (!course_slug) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Navbar variant="solid" />

            <main className="max-w-4xl mx-auto px-6 py-12">

                {/* Back Link */}
                <Link href="/courses" className="inline-flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Courses
                </Link>

                {/* Course Header */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 mb-12">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-20 h-20 rounded-2xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-4xl shadow-sm flex-shrink-0">
                            🐍
                        </div>
                        <div className="flex-1 w-full">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{COURSE_DATA.title}</h1>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">{COURSE_DATA.description}</p>

                            {/* Progress Bar */}
                            <div className="w-full">
                                <div className="flex justify-between text-sm font-bold mb-2">
                                    <span className="text-slate-700 dark:text-slate-300">Course Progress</span>
                                    <span className="text-blue-600 dark:text-blue-400">{COURSE_DATA.progress}%</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                                    <div
                                        className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${COURSE_DATA.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline / Syllabus */}
                <div className="relative pl-8 md:pl-0">
                    {/* Vertical Line (Desktop centered, Mobile left) */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 -translate-x-1/2 hidden md:block"></div>
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 md:hidden"></div>

                    <div className="space-y-12">
                        {COURSE_DATA.modules.map((module, index) => {
                            const isExpanded = expandedModules.includes(module.id);
                            const isLeft = index % 2 === 0;

                            return (
                                <div key={module.id} className={`relative flex flex-col md:flex-row items-center ${isLeft ? 'md:flex-row-reverse' : ''}`}>

                                    {/* Timeline Dot */}
                                    <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-slate-900 shadow-sm -translate-x-[7px] md:-translate-x-1/2 z-10 mt-6 md:mt-0"></div>

                                    {/* Spacer for opposite side */}
                                    <div className="flex-1 hidden md:block"></div>

                                    {/* Content Card */}
                                    <div className={`flex-1 w-full pl-8 md:pl-0 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                                        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                                            {/* Module Header */}
                                            <div
                                                className="p-5 flex justify-between items-center cursor-pointer bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                                                onClick={() => toggleModule(module.id)}
                                            >
                                                <div>
                                                    <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">Module {index + 1}</div>
                                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{module.title}</h3>
                                                </div>
                                                <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* Lessons List */}
                                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                                <div className="p-2">
                                                    {module.lessons.map((lesson) => {
                                                        const isLocked = lesson.status === 'locked';
                                                        const content = (
                                                            <div className={`flex items-center gap-4 p-3 rounded-lg transition-colors group ${isLocked ? 'cursor-not-allowed opacity-70' : 'hover:bg-slate-50 dark:hover:bg-slate-700/30 cursor-pointer'}`}>
                                                                {/* Status Icon */}
                                                                <div className="flex-shrink-0">
                                                                    {lesson.status === 'done' && (
                                                                        <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                            </svg>
                                                                        </div>
                                                                    )}
                                                                    {lesson.status === 'todo' && (
                                                                        <div className="w-6 h-6 rounded-full border-2 border-blue-600 dark:border-blue-400"></div>
                                                                    )}
                                                                    {lesson.status === 'locked' && (
                                                                        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                                            </svg>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Lesson Title */}
                                                                <div className="flex-1">
                                                                    <div className={`text-sm font-medium ${isLocked ? 'text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'}`}>
                                                                        {lesson.title}
                                                                        {lesson.type === 'quiz' && (
                                                                            <span className="ml-2 text-xs font-bold bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded uppercase tracking-wide">
                                                                                Quiz
                                                                            </span>
                                                                        )}
                                                                        {lesson.type === 'tasks' && (
                                                                            <span className="ml-2 text-xs font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded uppercase tracking-wide">
                                                                                Tasks
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                {/* Action / Type Icon */}
                                                                <div className="text-slate-400">
                                                                    {lesson.type === 'video' && (
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                        </svg>
                                                                    )}
                                                                    {lesson.type === 'tasks' && (
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                                                        </svg>
                                                                    )}
                                                                    {lesson.type === 'quiz' && (
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                        </svg>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );

                                                        if (isLocked) {
                                                            return <div key={lesson.id}>{content}</div>;
                                                        }

                                                        return (
                                                            <Link key={lesson.id} href={`/courses/${course_slug}/${lesson.slug}`}>
                                                                {content}
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Final Exam Section */}
                    <div className="relative flex flex-col items-center mt-16 z-10">
                        <div className="w-16 h-16 rounded-full bg-slate-900 dark:bg-white border-4 border-slate-200 dark:border-slate-700 shadow-lg flex items-center justify-center text-3xl mb-6">
                            🎓
                        </div>
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 text-white dark:text-slate-900 rounded-2xl p-8 max-w-2xl w-full text-center shadow-xl">
                            <h2 className="text-2xl font-bold mb-2">Final Exam</h2>
                            <p className="text-slate-300 dark:text-slate-600 mb-6">Prove your mastery of Python to earn your certificate.</p>

                            <div className="flex justify-center gap-4">
                                <div className="flex items-center gap-2 text-sm font-medium bg-white/10 dark:bg-slate-900/10 px-3 py-1.5 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    45 Minutes
                                </div>
                                <div className="flex items-center gap-2 text-sm font-medium bg-white/10 dark:bg-slate-900/10 px-3 py-1.5 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                    30 Questions
                                </div>
                            </div>

                            <button className="mt-8 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-900/30 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                                Locked (Complete all modules)
                            </button>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
