"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useParams } from "next/navigation";

// --- Sub-Components for Different Lesson Types ---

const TextLessonView = ({ title }: { title: string }) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden min-h-[500px] flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wide">
                        Text Lesson
                    </span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h1>
            </div>

            {/* Content */}
            <div className="p-8 md:p-10 text-slate-700 dark:text-slate-300 leading-relaxed space-y-6">
                <p className="text-lg">
                    Welcome to this lesson on <strong>{title}</strong>. In this module, we will explore the core concepts and how to apply them in real-world scenarios.
                </p>

                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8">Key Concepts</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Understanding the syntax and structure.</li>
                    <li>Best practices for clean and efficient code.</li>
                    <li>Common pitfalls and how to avoid them.</li>
                </ul>

                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8">Example Usage</h2>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-x-auto">
                    <pre>{`def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`}</pre>
                </div>

                <p>
                    Take your time to read through the documentation and practice writing your own functions. When you're ready, move on to the practical tasks to test your knowledge.
                </p>
            </div>
        </div>
    );
};
const TasksLessonView = ({ title }: { title: string }) => {
    const tasks = [
        {
            id: 1,
            title: "Task 1: Hello World",
            description: "Fix the function `say_hello` so that it correctly returns the string 'Hello, World!'.",
            input: "None",
            output: "Return the string 'Hello, World!'",
            initialCode: `def say_hello():\n    # Your code here\n    return "Wrong"\n\nprint(say_hello())`,
            expectedOutput: "Hello, World!",
            check: (code: string, output: string) => output.trim() === "Hello, World!"
        },
        {
            id: 2,
            title: "Task 2: Simple Addition",
            description: "Write a function named `add` that takes two arguments `a` and `b` and returns their sum.",
            input: "Two integers, a and b",
            output: "Return the result of a + b",
            initialCode: `def add(a, b):\n    # Your code here\n    return 0\n\nprint(add(3, 5))`,
            expectedOutput: "8",
            check: (code: string, output: string) => output.trim() === "8"
        },
        {
            id: 3,
            title: "Task 3: Loop it",
            description: "Write a loop that prints numbers from 0 to 4.",
            input: "None",
            output: "Print numbers 0, 1, 2, 3, 4 each on a new line",
            initialCode: `# Write your loop here\nfor i in range(1):\n    print(i)`,
            expectedOutput: "0\n1\n2\n3\n4",
            check: (code: string, output: string) => output.trim() === "0\n1\n2\n3\n4"
        }
    ];

    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [code, setCode] = useState(tasks[0].initialCode);
    const [output, setOutput] = useState<string | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [testPassed, setTestPassed] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<string | null>(null);

    const currentTask = tasks[currentTaskIndex];

    // Reset state when task changes
    useEffect(() => {
        setCode(tasks[currentTaskIndex].initialCode);
        setOutput(null);
        setTestPassed(false);
        setAnalysisResult(null);
    }, [currentTaskIndex]);

    const runCode = () => {
        setIsRunning(true);
        setOutput(null);
        setTestPassed(false);
        setAnalysisResult(null);

        // Simulate execution
        setTimeout(() => {
            let result = "";
            // Very basic mock execution logic based on the task
            if (currentTask.id === 1) {
                if (code.includes("return \"Hello, World!\"") || code.includes("return 'Hello, World!'")) {
                    result = "Hello, World!";
                } else {
                    result = "Wrong";
                }
            } else if (currentTask.id === 2) {
                if (code.includes("return a + b") || code.includes("return a+b")) {
                    result = "8";
                } else {
                    result = "0";
                }
            } else if (currentTask.id === 3) {
                if (code.includes("range(5)")) {
                    result = "0\n1\n2\n3\n4";
                } else {
                    result = "0";
                }
            }

            setOutput(result);
            setIsRunning(false);
        }, 1000);
    };

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        setOutput(null);
        setAnalysisResult(null);
        setTestPassed(false);

        setTimeout(() => {
            setIsAnalyzing(false);
            setAnalysisResult("No syntax errors found. Code style is compliant with PEP 8.");
        }, 1500);
    };

    const handleVerify = () => {
        setIsVerifying(true);
        setOutput(null);
        setAnalysisResult(null);
        setTestPassed(false);

        setTimeout(() => {
            setIsVerifying(false);

            let result = "";
            // Reuse execution logic for verification
            if (currentTask.id === 1) {
                if (code.includes("return \"Hello, World!\"") || code.includes("return 'Hello, World!'")) {
                    result = "Hello, World!";
                } else {
                    result = "Wrong";
                }
            } else if (currentTask.id === 2) {
                if (code.includes("return a + b") || code.includes("return a+b")) {
                    result = "8";
                } else {
                    result = "0";
                }
            } else if (currentTask.id === 3) {
                if (code.includes("range(5)")) {
                    result = "0\n1\n2\n3\n4";
                } else {
                    result = "0";
                }
            }

            setOutput(result);
            const passed = currentTask.check(code, result);
            setTestPassed(passed);
        }, 2000);
    };

    return (
        <div className="bg-[#1e293b] rounded-2xl shadow-2xl border border-slate-700 overflow-hidden min-h-[600px] flex flex-col">
            {/* Header - Task Selector */}
            <div className="p-4 border-b border-slate-700 bg-[#0f172a] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-900/30 text-blue-400 text-xs font-bold uppercase tracking-wide border border-blue-500/30">
                        Practical Tasks
                    </span>
                    <h1 className="text-lg font-bold text-white">{title}</h1>
                </div>

                {/* Task Navigation */}
                <div className="flex bg-slate-800 rounded-lg p-1">
                    {tasks.map((task, index) => (
                        <button
                            key={task.id}
                            onClick={() => setCurrentTaskIndex(index)}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${currentTaskIndex === index
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'text-slate-400 hover:text-white hover:bg-slate-700'
                                }`}
                        >
                            Task {index + 1}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row">
                {/* Left Panel: Instructions (Dark Mode) */}
                <div className="w-full lg:w-[350px] bg-slate-900 border-r border-slate-700 p-6 flex flex-col text-left">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="bg-blue-600/20 text-blue-400 p-1.5 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h3 className="text-white font-bold text-lg">Challenge Instructions</h3>
                    </div>

                    <div className="space-y-4 text-slate-300 text-sm leading-relaxed overflow-y-auto pr-2 custom-scrollbar">
                        <h4 className="text-white font-bold text-base border-b border-slate-700 pb-2 mb-2">{currentTask.title}</h4>
                        <p>
                            <strong className="text-white block mb-1">Task:</strong>
                            {currentTask.description}
                        </p>
                        <p>
                            <strong className="text-white block mb-1">Input:</strong>
                            {currentTask.input}
                        </p>
                        <p>
                            <strong className="text-white block mb-1">Output:</strong>
                            {currentTask.output}
                        </p>
                        <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 mt-4">
                            <div className="text-xs text-slate-500 uppercase font-bold mb-2">Example</div>
                            <code className="text-xs font-mono block text-emerald-400 whitespace-pre">
                                Output: {currentTask.expectedOutput}
                            </code>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Editor & Terminal */}
                <div className="flex-1 flex flex-col min-w-0 bg-[#1e293b]">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between px-4 py-3 bg-[#0f172a] border-b border-slate-700">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                        </div>
                        <div className="text-xs text-slate-500 font-mono font-medium ml-4">main.py</div>

                        <div className="flex items-center gap-3 ml-auto">
                            <button
                                onClick={handleAnalyze}
                                disabled={isAnalyzing || isRunning || isVerifying}
                                className={`flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-xs font-bold text-slate-300 border border-slate-700 transition-all hover:text-white ${isAnalyzing ? 'opacity-80 cursor-wait' : ''}`}
                            >
                                {isAnalyzing ? (
                                    <svg className="animate-spin h-3.5 w-3.5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                )}
                                <span>Code Analysis</span>
                            </button>

                            <button
                                onClick={handleVerify}
                                disabled={isVerifying || isRunning || isAnalyzing}
                                className={`flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-xs font-bold text-slate-300 border border-slate-700 transition-all hover:text-white ${isVerifying ? 'opacity-80 cursor-wait' : ''}`}
                            >
                                {isVerifying ? (
                                    <svg className="animate-spin h-3.5 w-3.5 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )}
                                <span>Verify</span>
                            </button>

                            <button
                                onClick={runCode}
                                disabled={isRunning || isAnalyzing || isVerifying}
                                className={`flex items-center gap-2 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded text-xs font-bold text-white shadow-lg shadow-emerald-900/20 transition-all hover:scale-105 cursor-pointer group border border-emerald-500/50 ${isRunning ? 'opacity-80 cursor-wait' : ''}`}
                            >
                                {isRunning ? (
                                    <svg className="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white group-hover:animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                )}
                                <span>Run</span>
                            </button>
                        </div>
                    </div>

                    {/* Editor Area */}
                    <div className="flex-1 relative flex overflow-hidden">
                        {/* Line Numbers */}
                        <div className="py-6 pl-4 pr-4 text-slate-600 select-none text-right border-r border-slate-700/30 bg-[#1e293b] leading-6 font-mono text-xs">
                            {code.split('\n').map((_, i) => (
                                <div key={i}>{i + 1}</div>
                            ))}
                        </div>
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="flex-1 bg-transparent text-slate-300 p-6 outline-none resize-none leading-6 whitespace-pre font-mono w-full h-full"
                            spellCheck="false"
                        />
                    </div>

                    {/* Terminal Output */}
                    <div className="h-[200px] bg-[#0f172a] border-t border-slate-700 p-0 font-mono text-sm flex flex-col">
                        <div className="flex items-center justify-between px-4 py-2 bg-[#1e293b] border-b border-slate-700">
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3" />
                                </svg>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Terminal</span>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                                <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                            </div>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs md:text-sm">
                            {isAnalyzing ? (
                                <div className="text-blue-400 animate-pulse">Running code analysis...</div>
                            ) : isVerifying ? (
                                <div className="text-purple-400 animate-pulse">Verifying solution...</div>
                            ) : analysisResult ? (
                                <div className="text-blue-300 animate-in fade-in slide-in-from-bottom-1 duration-200">
                                    <div className="font-bold mb-1">Analysis Report:</div>
                                    {analysisResult}
                                </div>
                            ) : output ? (
                                <>
                                    <div className="text-slate-400 mb-2">$ python main.py</div>
                                    <div className="text-slate-300 font-semibold mb-4 animate-in fade-in slide-in-from-bottom-1 duration-200">
                                        {output}
                                    </div>

                                    {testPassed ? (
                                        <div className="border-l-2 border-emerald-500 pl-3 py-1 animate-in slide-in-from-left-2 duration-300">
                                            <div className="text-emerald-400 font-bold">✓ Test Passed</div>
                                            <div className="text-emerald-600/80 text-xs mt-0.5">All test cases passed successfully.</div>
                                        </div>
                                    ) : (
                                        <div className="border-l-2 border-red-500 pl-3 py-1 animate-in slide-in-from-left-2 duration-300">
                                            <div className="text-red-400 font-bold">✗ Test Failed</div>
                                            <div className="text-red-500/80 text-xs mt-0.5">AssertionError: Expected {currentTask.expectedOutput}, but got {output}</div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-slate-600 italic">
                                    $ Ready to run...
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const QuizLessonView = ({ title }: { title: string }) => {
    const questions = [
        {
            id: 1,
            text: "What is the correct file extension for Python files?",
            options: [
                { id: 1, text: ".pt" },
                { id: 2, text: ".pyt" },
                { id: 3, text: ".py" },
                { id: 4, text: ".python" },
            ],
            correctOptionId: 3
        },
        {
            id: 2,
            text: "Which of the following is NOT a valid variable name?",
            options: [
                { id: 1, text: "my_var" },
                { id: 2, text: "_var" },
                { id: 3, text: "2var" },
                { id: 4, text: "var2" },
            ],
            correctOptionId: 3
        },
        {
            id: 3,
            text: "How do you create a function in Python?",
            options: [
                { id: 1, text: "function myFunction():" },
                { id: 2, text: "create myFunction():" },
                { id: 3, text: "def myFunction():" },
                { id: 4, text: "func myFunction():" },
            ],
            correctOptionId: 3
        },
        {
            id: 4,
            text: "Which operator is used for exponentiation?",
            options: [
                { id: 1, text: "^" },
                { id: 2, text: "**" },
                { id: 3, text: "//" },
                { id: 4, text: "exp" },
            ],
            correctOptionId: 2
        }
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [answers, setAnswers] = useState<{ [key: number]: number }>({}); // questionId -> selectedOptionId

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    const handleNext = () => {
        if (selectedOption !== null) {
            const isCorrect = selectedOption === currentQuestion.correctOptionId;
            if (isCorrect) setScore(score + 1);

            setAnswers({ ...answers, [currentQuestion.id]: selectedOption });

            if (isLastQuestion) {
                setShowResults(true);
            } else {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOption(null);
            }
        }
    };

    if (showResults) {
        const percentage = (score / questions.length) * 100;
        const passed = percentage >= 70;

        return (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden min-h-[500px] flex flex-col items-center justify-center p-8 text-center">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-6 ${passed ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' : 'bg-red-100 dark:bg-red-900/30 text-red-600'}`}>
                    {passed ? '🏆' : '📚'}
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    {passed ? 'Quiz Completed!' : 'Keep Practicing'}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
                    {passed
                        ? `Great job! You scored ${score} out of ${questions.length} (${percentage}%). You've mastered this module.`
                        : `You scored ${score} out of ${questions.length} (${percentage}%). Review the material and try again to improve your score.`}
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    >
                        Retry Quiz
                    </button>
                    {passed && (
                        <Link
                            href="/courses"
                            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5"
                        >
                            Continue Course
                        </Link>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden min-h-[500px] flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-purple-50/50 dark:bg-purple-900/10">
                <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wide">
                        Module Quiz
                    </span>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h1>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-4 overflow-hidden">
                    <div
                        className="bg-purple-600 h-full transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            <div className="flex-1 p-8 max-w-3xl mx-auto w-full flex flex-col justify-center">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-8 leading-relaxed">
                    {currentQuestion.text}
                </h2>

                <div className="space-y-4 mb-8">
                    {currentQuestion.options.map(option => (
                        <div
                            key={option.id}
                            onClick={() => setSelectedOption(option.id)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${selectedOption === option.id
                                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-purple-300 dark:hover:border-purple-700'
                                }`}
                        >
                            <span className="font-medium">{option.text}</span>
                            {selectedOption === option.id && (
                                <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    disabled={selectedOption === null}
                    className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-lg shadow-purple-600/20 transition-all hover:-translate-y-0.5"
                >
                    {isLastQuestion ? "Finish Quiz" : "Next Question"}
                </button>
            </div>
        </div>
    );
};

// --- Main Page Component ---

export default function LessonPage() {
    const params = useParams();
    const course_slug = Array.isArray(params.course_slug) ? params.course_slug[0] : params.course_slug;
    const lesson_slug = Array.isArray(params.lesson_slug) ? params.lesson_slug[0] : params.lesson_slug;

    if (!course_slug || !lesson_slug) {
        return <div>Loading...</div>;
    }

    // Determine Lesson Type based on slug
    const isQuiz = lesson_slug.includes("quiz");
    const isTasks = lesson_slug.includes("tasks");

    // Mock Data Lookup (In a real app, fetch based on slugs)
    const lessonTitle = lesson_slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Navbar variant="solid" />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {/* Breadcrumbs & Progress Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <Link href="/courses" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Courses</Link>
                        <span>/</span>
                        <Link href={`/courses/${course_slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {course_slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                        </Link>
                        <span>/</span>
                        <span className="text-slate-900 dark:text-white font-medium">{lessonTitle}</span>
                    </div>

                    {/* Mobile/Full-width Progress Indicator (Visible on Tasks/Quiz or Mobile) */}
                    {(isQuiz || isTasks) && (
                        <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Module Progress</span>
                            <div className="w-24 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                <div className="bg-blue-600 h-full w-[35%]"></div>
                            </div>
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">35%</span>
                        </div>
                    )}
                </div>

                <div className={`grid gap-8 ${isQuiz || isTasks ? 'grid-cols-1' : 'lg:grid-cols-3'}`}>
                    {/* Main Content */}
                    <div className={`${isQuiz || isTasks ? 'w-full' : 'lg:col-span-2'} space-y-6`}>

                        {/* Render the appropriate view */}
                        {isQuiz ? (
                            <QuizLessonView title={lessonTitle} />
                        ) : isTasks ? (
                            <TasksLessonView title={lessonTitle} />
                        ) : (
                            <TextLessonView title={lessonTitle} />
                        )}

                        {/* Navigation Footer (Shared) */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                            <button className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors font-medium text-sm flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Previous
                            </button>
                            <button className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 font-bold text-sm flex items-center gap-2">
                                Next Lesson
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Sidebar (Hidden for Tasks/Quiz) */}
                    {!(isQuiz || isTasks) && (
                        <div className="hidden lg:block space-y-6">
                            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Lesson Resources</h3>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-center gap-2 text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 1 0 003 3h10a3 1 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download Source Code
                                    </li>
                                    <li className="flex items-center gap-2 text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 1 0 01-2-2V5a2 1 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 1 0 01-2 2z" />
                                        </svg>
                                        Cheat Sheet PDF
                                    </li>
                                </ul>
                            </div>

                            {/* Progress Card */}
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white">
                                <h3 className="font-bold mb-2">Your Progress</h3>
                                <div className="flex justify-between text-sm mb-2 opacity-90">
                                    <span>Module 1</span>
                                    <span>35%</span>
                                </div>
                                <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden mb-4">
                                    <div className="bg-white h-full w-[35%]"></div>
                                </div>
                                <p className="text-xs opacity-80">Keep going! You're doing great.</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
