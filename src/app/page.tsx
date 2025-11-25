
"use client";

import Link from "next/link";
import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";
import { UserButton, useUser } from "@stackframe/stack";
import { useState } from "react";

export default function Home() {
  const user = useUser();

  if (user) {
    return <Dashboard />;
  }

  const [code, setCode] = useState(`def sum(a, b):
  # Challenge: Fix this function to return the sum
  return 0

print(sum(3, 5))`);
  const [isRunning, setIsRunning] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [testPassed, setTestPassed] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const runCode = () => {
    setIsRunning(true);
    setOutput(null);
    setTestPassed(false);
    setAnalysisResult(null);

    // Simulate execution delay
    setTimeout(() => {
      // Simple check if user typed the correct logic
      const isCorrect = code.includes("a + b") || code.includes("a+b");

      if (isCorrect) {
        setOutput("8");
      } else {
        setOutput("0");
      }

      setIsRunning(false);

      // Simulate test check delay
      setTimeout(() => {
        setTestPassed(isCorrect);
      }, 500);
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
      const isCorrect = code.includes("a + b") || code.includes("a+b");
      if (isCorrect) {
        setOutput("8");
        setTestPassed(true);
      } else {
        setOutput("0");
        setTestPassed(false);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen font-sans text-slate-900 selection:bg-blue-100">
      {/* Header */}
      <Navbar className="absolute top-0" />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-32 overflow-hidden">
          {/* Background Gradient - Deep Blue to Teal/Green */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#2dd4bf] opacity-100"></div>

          {/* Decorative Blur Elements */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

          <div className="relative max-w-7xl mx-auto px-6 flex flex-col items-center text-center z-10">

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight drop-shadow-sm">
              Learn Code by Coding.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-teal-200">Instant Feedback.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl font-light">
              Tackle practical challenges, solve real-world problems in our in-browser environment, and get immediate automated test results. No setup required.
            </p>

            {/* CTA Button */}
            <Link href="/register" className="btn btn-lg bg-blue-600 hover:bg-blue-500 text-white border-none px-10 py-4 text-lg rounded-xl shadow-xl shadow-blue-900/30 transition-all hover:-translate-y-1 hover:shadow-2xl">
              Create a Free Account
            </Link>

            {/* Code Editor Mockup */}
            <div className="mt-20 w-full max-w-6xl mx-auto perspective-1000">
              <div className="relative rounded-xl overflow-hidden shadow-2xl bg-[#1e293b] border border-slate-700/50 transform transition-transform hover:scale-[1.01] duration-500 flex flex-col md:flex-row h-[600px]">

                {/* Left Panel: Instructions */}
                <div className="w-full md:w-[350px] bg-slate-900 border-r border-slate-700 p-6 flex flex-col text-left">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="bg-blue-600/20 text-blue-400 p-1.5 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-white font-bold text-lg">Challenge Instructions</h3>
                  </div>

                  <div className="space-y-4 text-slate-300 text-sm leading-relaxed overflow-y-auto pr-2 custom-scrollbar">
                    <p>
                      <strong className="text-white block mb-1">Task:</strong>
                      Fix the function <code className="bg-slate-800 px-1.5 py-0.5 rounded text-blue-300">sum(a, b)</code> so that it correctly returns the sum of two numbers.
                    </p>
                    <p>
                      <strong className="text-white block mb-1">Input:</strong>
                      Two integers, <code className="bg-slate-800 px-1.5 py-0.5 rounded text-blue-300">a</code> and <code className="bg-slate-800 px-1.5 py-0.5 rounded text-blue-300">b</code>.
                    </p>
                    <p>
                      <strong className="text-white block mb-1">Output:</strong>
                      Return the result of <code className="bg-slate-800 px-1.5 py-0.5 rounded text-blue-300">a + b</code>.
                    </p>
                    <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 mt-4">
                      <div className="text-xs text-slate-500 uppercase font-bold mb-2">Example</div>
                      <code className="text-xs font-mono block text-emerald-400">
                        Input: sum(3, 5)<br />
                        Output: 8
                      </code>
                    </div>
                  </div>
                </div>

                {/* Right Panel: Editor & Terminal */}
                <div className="flex-1 flex flex-col min-w-0">
                  {/* MacOS Window Controls & Toolbar */}
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

                  {/* Editor Content Area */}
                  <div className="flex-1 flex flex-col text-left min-h-0">
                    {/* Code Input */}
                    <div className="flex-1 bg-[#1e293b] font-mono text-sm md:text-base text-slate-300 relative flex overflow-hidden">
                      {/* Line Numbers */}
                      <div className="py-6 pl-4 pr-4 text-slate-600 select-none text-right border-r border-slate-700/30 bg-[#1e293b] leading-6 font-mono text-xs">
                        {code.split('\n').map((_, i) => (
                          <div key={i}>{i + 1}</div>
                        ))}
                      </div>

                      {/* Textarea */}
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
                                <div className="text-red-500/80 text-xs mt-0.5">AssertionError: Expected 8, but got {output}</div>
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
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center mb-20 text-slate-900 tracking-tight">Key Benefits</h2>
            <div className="grid md:grid-cols-4 gap-12 text-center">
              {[
                {
                  title: "24/7 Practice",
                  desc: "Access thousands of coding exercises and challenges anytime, anywhere.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
                {
                  title: "Instant Feedback",
                  desc: "Get real-time automated test results and hints to learn faster.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )
                },
                {
                  title: "Structured Career Paths",
                  desc: "Follow guided curriculum from beginner to advanced roles.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.923 19.92a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  )
                },
                {
                  title: "Real-World Projects",
                  desc: "Build a professional portfolio with hands-on projects.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  )
                }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center group">
                  <div className="mb-6 text-[#0f172a] transform transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-600">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                  <p className="text-slate-600 text-base leading-relaxed max-w-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof & Footer Area */}
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

              {/* Left Side: Testimonials */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-10">Social Proof</h2>
                <div className="space-y-8">
                  {[
                    {
                      name: "Sarah L.", role: "Software Developer",
                      text: "CodeCraft's instant feedback loop is a game-changer. I learned Python in weeks, not months.",
                      imgColor: "bg-blue-200"
                    },
                    {
                      name: "Michael R.", role: "Data Scientist",
                      text: "The structured challenges really helped me grasp complex algorithms. Highly recommend!",
                      imgColor: "bg-emerald-200"
                    }
                  ].map((person, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className={`w-12 h-12 rounded-full ${person.imgColor} flex-shrink-0 flex items-center justify-center font-bold text-slate-600 opacity-80`}>
                        {person.name[0]}
                      </div>
                      <div>
                        <p className="text-slate-700 italic mb-2 leading-relaxed text-sm md:text-base">"{person.text}"</p>
                        <div className="font-bold text-slate-900 text-sm">
                          {person.name}, <span className="text-slate-500 font-medium">{person.role}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: Stats & Languages */}
              <div className="flex-1">
                {/* Stats Box */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap justify-between text-center mb-12">
                  {[
                    { val: "10,000+", label: "Challenges Completed" },
                    { val: "50+ hours", label: "of code written on the platform" },
                    { val: "98%", label: "User Satisfaction" }
                  ].map((stat, i) => (
                    <div key={i} className="flex-1 min-w-[100px] p-2">
                      <div className="text-2xl md:text-3xl font-extrabold text-slate-900">{stat.val}</div>
                      <div className="text-[10px] md:text-xs text-slate-500 mt-1 uppercase tracking-wide font-semibold">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Languages */}
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-8 text-slate-900">Supported Languages</h3>
                  <div className="flex justify-center gap-6 md:gap-8 flex-wrap grayscale hover:grayscale-0 transition-all duration-500">
                    {[
                      { icon: "🐍", name: "Python", color: "text-yellow-600" },
                      { icon: "📜", name: "JS", color: "text-yellow-400" },
                      { icon: "🗃️", name: "SQL", color: "text-blue-500" },
                      { icon: "☕", name: "Java", color: "text-red-500" },
                      { icon: "⚙️", name: "C++", color: "text-blue-700" },
                      { icon: "💎", name: "Ruby", color: "text-red-600" }
                    ].map((lang, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 group cursor-default">
                        <span className="text-3xl md:text-4xl transform group-hover:scale-110 transition-transform">{lang.icon}</span>
                        <span className="text-xs font-bold text-slate-400 group-hover:text-slate-800">{lang.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer Links */}
            <div className="mt-20 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
              <div className="text-slate-500">
                <div className="font-bold text-slate-900 mb-1">Contact:</div>
                support@codecraftacademy.com <br />
                +1-555-123-4567
              </div>

              <div className="flex gap-6 text-slate-500">
                <Link href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
              </div>

              <div className="flex gap-4">
                {/* Social Icons (SVGs) */}
                {['twitter', 'linkedin', 'github'].map(icon => (
                  <div key={icon} className="w-5 h-5 bg-slate-300 hover:bg-slate-800 transition-colors rounded cursor-pointer"></div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}