import { SignUp } from "@stackframe/stack";
import Link from "next/link";

export default function RegisterPage() {
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
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Join the Community</h1>
                        <p className="text-slate-500">Start your coding journey today. Create your free account.</p>
                    </div>

                    {/* Stack Auth Component */}
                    <div className="bg-white stack-auth-wrapper">
                        <SignUp fullPage={false} />
                    </div>

                    <div className="text-center text-sm text-slate-600 mt-6">
                        Already have an account? <Link href="/login" className="font-bold text-blue-600 hover:text-blue-500 hover:underline">Log in</Link>
                    </div>

                    <div className="text-center text-sm text-slate-400 mt-8">
                        By signing up, you agree to our <Link href="/terms" className="underline hover:text-slate-600">Terms</Link> and <Link href="/privacy" className="underline hover:text-slate-600">Privacy Policy</Link>.
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
                        <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-teal-500/30">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                        </div>
                        <h2 className="text-4xl font-bold mb-4 leading-tight">Build Your Future with Code</h2>
                        <p className="text-teal-100 text-lg leading-relaxed">
                            Access interactive lessons, real-time feedback, and a supportive community of learners.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
