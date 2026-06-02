import Link from "next/link";

export const metadata = {
    title: "Privacy Policy",
}

export default function PolicyPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.06),rgba(15,23,42,0.96)_40%),linear-gradient(180deg,rgba(20,6,18,0.96),rgba(10,2,10,0.98))] px-4 py-8">
            <div className="max-w-3xl w-full px-4">
                <div className="bg-white/5 rounded-xl p-6 text-white">
                    <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
                    <p className="mb-3 text-sm text-white/80">Your privacy is important to us. This Privacy Policy explains how Matcha collects, uses, discloses, and protects your personal information. We collect only the information necessary to provide and improve the service, such as registration data, profile information, and messages you send.</p>
                    <p className="mb-3 text-sm text-white/80">We use industry-standard safeguards to protect your data, but no system is completely secure. We retain data as necessary for service operation and legal compliance. You can request deletion of your account and associated data via account settings.</p>
                    <p className="mb-6 text-sm text-white/80">By using the service you consent to the practices described in this policy. We may update this policy occasionally; changes will be posted to this page.</p>

                    <div className="flex justify-center">
                        <Link href="/login" className="rounded-xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600">Back to login</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
