import { SignIn } from "@stackframe/stack";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-white">
            {/* Left Side: Form */}
            <div className="flex flex-col justify-center items-center p-8 lg:p-12 xl:p-24 relative">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo & Header */}
                    <div className="text-center mb-10">
                        <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
                            <img src="/CodeAcademy.png" alt="CodeCraft Academy Logo" className="w-10 h-10 rounded-lg shadow-md group-hover:scale-105 transition-transform" />
                            <span className="font-bold text-xl text-slate-900">CodeCraft Academy</span>
                        </Link>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Welcome Back</h1>
                        <p className="text-slate-500">Enter your details to access your learning dashboard.</p>
                    </div>

                    {/* Stack Auth Component */}
                    <div className="bg-white stack-auth-wrapper">
                        <SignIn fullPage={false} />
                    </div>

                    <div className="text-center text-sm text-slate-600 mt-6">
                        Don't have an account? <Link href="/register" className="font-bold text-blue-600 hover:text-blue-500 hover:underline">Sign up</Link>
                    </div>

                    <div className="text-center text-sm text-slate-400 mt-8">
                        By continuing, you agree to our <Link href="/terms" className="underline hover:text-slate-600">Terms</Link> and <Link href="/privacy" className="underline hover:text-slate-600">Privacy Policy</Link>.
                    </div>
                </div>
            </div>

            {/* Right Side: Image & Overlay */}
            <div className="hidden lg:block relative overflow-hidden bg-slate-900">
                <div className="absolute inset-0">
                    <img
                        src="/auth-image.png"
                        alt="Coding Environment"
                        className="w-full h-full object-cover opacity-90"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-16 text-white z-10">
                    <div className="max-w-md">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/30">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h2 className="text-4xl font-bold mb-4 leading-tight">Master Coding with Instant Feedback</h2>
                        <p className="text-blue-100 text-lg leading-relaxed">
                            Join thousands of developers building real-world projects and advancing their careers with CodeCraft Academy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
