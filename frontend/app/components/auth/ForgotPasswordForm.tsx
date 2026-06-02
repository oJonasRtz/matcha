"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FloatingLabelInput } from "../input/floatingLabel";
import PasswordStrengthGroup, { type PasswordStrengthStatus } from "../input/passwordStrength";

export default function ForgotPasswordForm() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [passwordStatus, setPasswordStatus] = useState<PasswordStrengthStatus>({
        isPasswordStrong: false,
        passwordsMatch: false,
        isValid: false,
    });

    const isFirstStep = step === 1;
    const isSecondStep = step === 2;
    const isThirdStep = step === 3;

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setErrorMessage(null);

        if (isFirstStep) {
            setStep(2);
            return;
        }

        if (isSecondStep) {
            setStep(3);
            return;
        }

        if (!passwordStatus.isPasswordStrong) {
            setErrorMessage("Please choose a stronger password.");
            return;
        }

        if (!passwordStatus.passwordsMatch) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        alert("Test only: reset code submitted.");
    }

    function resendCode(){
        alert("Test only: resend code.");
    }

    return (
        <>
            <h1 className="mb-3 text-center text-3xl font-bold text-white">Forgot Password</h1>
            <p className="mb-8 text-center text-sm text-white/70">
                {isFirstStep
                    ? "Enter your email to receive a reset code."
                    : isSecondStep
                        ? "Enter the code we sent to your email to continue."
                        : "Create a new password and confirm it to finish."}
            </p>

            <div className="mb-6 flex items-center justify-center gap-2 text-xs font-semibold text-white/60">
                <div className={`rounded-full px-3 py-1 transition ${isFirstStep ? "bg-red-500 text-white" : "bg-white/10 text-white/60"}`}>
                    1. Email
                </div>
                <div className={`rounded-full px-3 py-1 transition ${isSecondStep ? "bg-red-500 text-white" : "bg-white/10 text-white/60"}`}>
                    2. Code
                </div>
                <div className={`rounded-full px-3 py-1 transition ${isThirdStep ? "bg-red-500 text-white" : "bg-white/10 text-white/60"}`}>
                    3. Password
                </div>
            </div>

            {errorMessage ? (
                <div className="mb-4 rounded-md border border-red-600 bg-red-600/20 px-4 py-2 text-sm text-red-100">
                    {errorMessage}
                </div>
            ) : null}

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
                ) : isSecondStep ? (
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
                ) : (
                    <PasswordStrengthGroup
                        password={newPassword}
                        confirmPassword={confirmPassword}
                        passwordLabel="New password"
                        confirmLabel="Confirm password"
                        onPasswordChange={(event) => {
                            setNewPassword(event.target.value);
                            setErrorMessage(null);
                        }}
                        onConfirmPasswordChange={(event) => {
                            setConfirmPassword(event.target.value);
                            setErrorMessage(null);
                        }}
                        onStatusChange={setPasswordStatus}
                    />
                )}

                <button
                    type="submit"
                    className="rounded-xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600"
                >
                    {isFirstStep ? "Send reset code" : isSecondStep ? "Verify code" : "Save new password"}
                </button>
                {isSecondStep && (
                    <button
                        type="button"
                        onClick={resendCode}
                        className="text-sm text-white/80 transition hover:text-white"
                    >
                        <p className="text-white/80 hover:text-white">Resend code</p>
                    </button>
                )

                }
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
        </>
    );
}
