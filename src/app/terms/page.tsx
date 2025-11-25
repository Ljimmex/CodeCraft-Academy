import Link from "next/link";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <header className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/CodeAcademy.png" alt="CodeLab Logo" className="w-8 h-8 rounded-lg object-cover" />
                        <span className="font-bold text-xl tracking-tight text-slate-900">CodeCraft</span>
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
                <div className="prose prose-slate max-w-none">
                    <p className="mb-4">Last updated: November 25, 2025</p>

                    <h2 className="text-xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
                    <p className="mb-4">By accessing and using CodeCraft Academy, you accept and agree to be bound by the terms and provision of this agreement.</p>

                    <h2 className="text-xl font-bold mt-8 mb-4">2. Use License</h2>
                    <p className="mb-4">Permission is granted to temporarily download one copy of the materials (information or software) on CodeCraft Academy's website for personal, non-commercial transitory viewing only.</p>

                    <h2 className="text-xl font-bold mt-8 mb-4">3. Disclaimer</h2>
                    <p className="mb-4">The materials on CodeCraft Academy's website are provided on an 'as is' basis. CodeCraft Academy makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

                    <h2 className="text-xl font-bold mt-8 mb-4">4. Limitations</h2>
                    <p className="mb-4">In no event shall CodeCraft Academy or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on CodeCraft Academy's website.</p>
                </div>
            </main>
        </div>
    );
}
