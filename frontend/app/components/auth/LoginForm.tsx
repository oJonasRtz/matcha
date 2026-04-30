"use client";

import { useRouter } from "next/navigation";
import { Card } from "../public/card";
import React from "react";

export default function LoginForm() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;
    const payload = {
      ...data,
      username: data.identity
    };

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json().then(data => ({ data, res })))
      .then(({ data, res }) => {
        if (res.ok) {
          alert("Login successful!");
          router.push("/");
        } else {
          alert(data.message || "Login failed!");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again.");
      });
  }


  return (
    <Card className="max-w-md">
      <h1 className="mb-6 text-center text-white text-3xl font-bold">Login</h1>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="relative">
          <input
            id="identity"
            name="identity"
            type="text"
            placeholder=" "
            className="peer w-full text-gray font-bold rounded-xl border border-gray-300 px-4 pb-3 pt-6 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            required
          />
	<label
    	     htmlFor="identity"
    	     className="pointer-events-none absolute left-4
      		top-2 translate-y-0
      		text-sm font-semibold text-white-500
      		transition-all duration-200

      		peer-placeholder-shown:top-1/2
      		peer-placeholder-shown:-translate-y-1/2
      		peer-placeholder-shown:text-base

      		peer-focus:top-2
      		peer-focus:translate-y-0
      		peer-focus:text-sm
      		peer-focus:text-red-500

		peer-not-placeholder-shown:top-2
    		peer-not-placeholder-shown:translate-y-0
    		peer-not-placeholder-shown:text-sm
    		peer-not-placeholder-shown:text-blue-400"
  	>
    		Email or username
  	</label>
        </div>

        <div className="relative">
          <input
            id="password"
            name="password"
            type="password"
            placeholder=" "
            className="peer w-full rounded-xl font-bold text-gray border border-gray-300 px-4 pb-3 pt-6 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-blue-200"
            required
          />
          <label
            htmlFor="password"
		className="pointer-events-none absolute left-4
                top-2 translate-y-0
                text-sm font-semibold text-white-500
                transition-all duration-200

                peer-placeholder-shown:top-1/2
                peer-placeholder-shown:-translate-y-1/2
                peer-placeholder-shown:text-base

                peer-focus:top-2
                peer-focus:translate-y-0
                peer-focus:text-sm
                peer-focus:text-red-500

		peer-not-placeholder-shown:top-2
                peer-not-placeholder-shown:translate-y-0
                peer-not-placeholder-shown:text-sm
                peer-not-placeholder-shown:text-blue-400"
          >
            Password
          </label>
        </div>

        <button
          type="submit"
          className="rounded-xl bg-blue-500 px-4 py-3 font-semibold text-white transition hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      <div className="mt-5 flex flex-col items-center gap-3 text-sm">
        <button
          onClick={() => router.push("#")}
          className="text-white/80 transition hover:text-blue-300 hover:underline"
        >
          <strong>Forgot password?</strong>
        </button>

        <button
          onClick={() => router.push("/register")}
          className="font-semibold text-white transition hover:text-blue-300 hover:underline"
        >
          <strong>Create new account</strong>
        </button>
        <button
          onClick={() => router.push("/")}
          className="transition hover:text-blue-300 hover:underline"
        >
          <strong>Return to main page</strong>
        </button>
      </div>
      <footer className="mt-8 border-t border-white/20 pt-4">
        <div className="flex justify-center gap-4 text-xs text-white/70">
          <button onClick={() => router.push("#")} className="transition hover:text-blue-300 hover:underline">
            <strong>Terms of Service</strong>
          </button>
          <button onClick={() => router.push("#")} className="transition hover:text-blue-300 hover:underline">
            <strong>Privacy Policy</strong>
          </button>
        </div>
      </footer>
    </Card>
  );
}
