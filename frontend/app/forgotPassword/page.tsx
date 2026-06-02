import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import { Card } from "../components/public/card";

export const metadata = {
    title: "Forgot Password",
}

export default function ForgotPasswordPage() {
    return (
        <main className="flex min-h-screen items-center justify-center gap-4 bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.18),rgba(15,23,42,0.95)_40%),linear-gradient(180deg,rgba(20,6,18,0.96),rgba(10,2,10,0.98))] px-4 py-8">
            <Card className="max-w-md">
                <ForgotPasswordForm />
            </Card>
        </main>
    );
}