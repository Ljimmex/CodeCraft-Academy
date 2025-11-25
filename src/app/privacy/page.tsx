import Link from "next/link";

export default function PrivacyPage() {
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
                <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
                <div className="prose prose-slate max-w-none">
                    <p className="mb-4">Last updated: November 25, 2025</p>

                    <h2 className="text-xl font-bold mt-8 mb-4">1. Information We Collect</h2>
                    <p className="mb-4">We collect information you provide directly to us, such as when you create an account, participate in interactive features, or communicate with us.</p>

                    <h2 className="text-xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
                    <p className="mb-4">We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect CodeCraft Academy and our users.</p>

                    <h2 className="text-xl font-bold mt-8 mb-4">3. Sharing of Information</h2>
                    <p className="mb-4">We do not share your personal information with third parties except as described in this policy or with your consent.</p>

                    <h2 className="text-xl font-bold mt-8 mb-4">4. Security</h2>
                    <p className="mb-4">We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
                </div>
            </main>
        </div>
    );
}
