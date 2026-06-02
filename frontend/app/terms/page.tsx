import Link from "next/link";

export const metadata = {
    title: "Terms of Service",
}

export default function TermsPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.06),rgba(15,23,42,0.96)_40%),linear-gradient(180deg,rgba(20,6,18,0.96),rgba(10,2,10,0.98))] px-4 py-8">
            <div className="max-w-3xl w-full px-4">
                <div className="bg-white/5 rounded-xl p-6 text-white">
                    <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
                    <p className="mb-3 text-sm text-white/80">These Terms of Service govern your use of Matcha. By accessing or using the service, you agree to be bound by these terms. You must be at least 18 years old to use the service. You agree not to use the service for unlawful purposes, to harass others, or to upload viruses or other harmful code.</p>
                    <p className="mb-3 text-sm text-white/80">We reserve the right to remove content that violates our policies and to suspend or terminate accounts that breach these Terms. You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.</p>
                    <p className="mb-6 text-sm text-white/80">We may modify these Terms from time to time; continued use after changes constitutes acceptance of the updated terms.</p>

                    <div className="flex justify-center">
                        <Link href="/login" className="rounded-xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600">Back to login</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
