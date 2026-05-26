"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Card } from "../components/public/card";
import { FloatingLabelInput } from "../components/input/floatingLabel";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");

    const isFirstStep = step === 1;
    const isSecondStep = step === 2;

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isFirstStep) {
            setStep(2);
            return;
        }

        alert("Test only: reset code submitted.");
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-black/20 px-6 py-10 text-white">
            <Card className="w-full max-w-md">
                <h1 className="mb-3 text-center text-3xl font-bold text-white">Forgot Password</h1>
                <p className="mb-8 text-center text-sm text-white/70">
                    {isFirstStep
                        ? "Enter your email to receive a reset code."
                        : "Enter the code we sent to your email to continue."}
                </p>

                <div className="mb-6 flex items-center justify-center gap-2 text-xs font-semibold text-white/60">
                    <div className={`rounded-full px-3 py-1 transition ${isFirstStep ? "bg-red-500 text-white" : "bg-white/10 text-white/60"}`}>
                        1. Email
                    </div>
                    <div className={`rounded-full px-3 py-1 transition ${isSecondStep ? "bg-red-500 text-white" : "bg-white/10 text-white/60"}`}>
                        2. Code
                    </div>
                </div>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    {isFirstStep ? (
                        <FloatingLabelInput
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            value={email}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                            className="w-full text-white font-bold"
                            focusClassName="focus:border-red-400 focus:ring-2 focus:ring-red-200/40"
                            labelFocusClassName="peer-focus:text-red-300 peer-not-placeholder-shown:text-red-300"
                            required
                        />
                    ) : (
                        <FloatingLabelInput
                            id="code"
                            name="code"
                            type="text"
                            label="Reset code"
                            value={code}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCode(event.target.value)}
                            className="w-full text-white font-bold"
                            focusClassName="focus:border-red-400 focus:ring-2 focus:ring-red-200/40"
                            labelFocusClassName="peer-focus:text-red-300 peer-not-placeholder-shown:text-red-300"
                            required
                        />
                    )}

                    <button
                        type="submit"
                        className="rounded-xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600"
                    >
                        {isFirstStep ? "Send reset code" : "Verify code"}
                    </button>
                </form>

                <div className="mt-5 flex flex-col items-center gap-3 text-sm">
                    <button
                        type="button"
                        onClick={() => router.push("/login")}
                        className="font-semibold text-white transition hover:text-red-300 hover:underline"
                    >
                        Back to login
                    </button>
                </div>
            </Card>
        </div>
    );
}