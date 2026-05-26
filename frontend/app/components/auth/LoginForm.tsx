"use client";

import { useRouter } from "next/navigation";
import { Card } from "../public/card";
import { FloatingLabelInput } from "../input/floatingLabel";
import PasswordInput from "../input/password";
import React, { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string | null>(null);

  const accountLinks = [
    { label: "Forgot password?", action: () => router.push("/forgotPassword"), className: "text-white/80" },
    { label: "Create new account", action: () => router.push("/register"), className: "font-semibold text-white" },
    { label: "Return to main page", action: () => router.push("/"), className: "text-white/80" },
  ];

  const footerLinks = [
    { label: "Terms of Service", action: () => router.push("#") },
    { label: "Privacy Policy", action: () => router.push("#") },
  ];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    setPasswordErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;
    const identity = data.identity.trim();
    const payload = {
      password: data.password,
      ...(identity.includes("@") ? { email: identity } : { username: identity }),
    };

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const text = await res.text();
        let data: any = {};

        try {
          data = text ? JSON.parse(text) : {};
        } catch {
          data = { raw: text };
        }

        return { data, res };
      })
      .then(({ data, res }) => {
        if (res.ok) {
          router.push("/dashboard");
        } else {
          const fallbackMessage = "Login failed. Please check your credentials and try again.";
          const message = data?.error || data?.message || fallbackMessage;

          if (res.status === 401) {
            setPasswordErrorMessage("Invalid username or password.");
            setErrorMessage(null);
          } else {
            setErrorMessage(message);
            setPasswordErrorMessage(null);
          }
        }
      })
      .catch((error) => {
        setErrorMessage("Login failed. Please try again later.");
        setPasswordErrorMessage(null);
      });
  }


  return (
    <Card className="max-w-md">
      <h1 className="mb-6 text-center text-white text-3xl font-bold">Login</h1>

      {errorMessage ? (
        <div className="mb-4 rounded-md border border-red-500/60 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {errorMessage}
        </div>
      ) : null}

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <FloatingLabelInput
          id="identity"
          name="identity"
          type="text"
          label="Email or username"
          className="w-full text-gray font-bold"
          focusClassName="focus:border-red-400 focus:ring-2 focus:ring-red-200/40"
          labelFocusClassName="peer-focus:text-red-300 peer-not-placeholder-shown:text-red-300"
          required
        />

        <PasswordInput
          id="password"
          name="password"
          label="Password"
          className="w-full text-gray font-bold"
          focusClassName="focus:border-red-400 focus:ring-2 focus:ring-red-200/40"
          labelFocusClassName="peer-focus:text-red-300 peer-not-placeholder-shown:text-red-300"
          buttonFocusClassName="focus:ring-red-200/40"
          required
        />

        {passwordErrorMessage ? (
          <p className="-mt-3 text-sm font-medium text-red-300">
            {passwordErrorMessage}
          </p>
        ) : null}

        <button
          type="submit"
          className="rounded-xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600"
        >
          Submit
        </button>
      </form>
        <div className="mt-5 flex flex-col items-center gap-3 text-sm">
          {accountLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              className={`${link.className} transition hover:text-red-300 hover:underline`}
            >
              <strong>{link.label}</strong>
            </button>
          ))}
        </div>
      <footer className="mt-8 border-t border-white/20 pt-4">
        <div className="flex justify-center gap-4 text-xs text-white/70">
            {footerLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.action}
                className="transition hover:text-red-300 hover:underline"
              >
                <strong>{link.label}</strong>
              </button>
            ))}
        </div>
      </footer>
    </Card>
  );
}
