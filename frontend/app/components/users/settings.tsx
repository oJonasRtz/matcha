"use client";

import { CheckCircle2, Mail, ShieldCheck, UserCog } from "lucide-react";
import { useState } from "react";
import { FloatingLabelInput } from "../input/floatingLabel";
import PasswordInput from "../input/password";
import PasswordStrengthGroup from "../input/passwordStrength";
import RadioGroup from "../input/radioGroup";
import { Card } from "../public/card";

type SettingsTab = "name" | "password" | "identity";

const tabs: Array<{ id: SettingsTab; label: string }> = [
  { id: "name", label: "Change name" },
  { id: "password", label: "Change password" },
  { id: "identity", label: "Gender and orientation" },
];

export default function UserSettingsComponent() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("name");
  const [name, setName] = useState("myBeautifulCat");
  const [username, setUsername] = useState("myBeautifulCat");
  const [firstName, setFirstName] = useState("Mia");
  const [lastName, setLastName] = useState("Cat");

  const [codeSent, setCodeSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [emailCode] = useState("123456");
  const [emailCodeInput, setEmailCodeInput] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [identityForm, setIdentityForm] = useState({
    gender: "man",
    orientation: "heterosexual",
  });

  function sendCode() {
    setCodeSent(true);
    setVerified(false);
    setEmailCodeInput("");
    setMessage("A verification code was sent to your email. Template code: 123456");
  }

  function confirmCode() {
    if (emailCodeInput.trim() === emailCode) {
      setVerified(true);
      setMessage("Code confirmed. You can now change your password.");
      return;
    }

    setVerified(false);
    setMessage("Invalid code. Please try again.");
  }

  return (
    <div className="w-full max-w-6xl py-8">
      <div className="mb-6 rounded-3xl border border-rose-300/20 bg-gradient-to-r from-rose-500/20 via-red-500/10 to-transparent p-5 backdrop-blur-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-200/75">Settings</p>
        <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">Account settings</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-rose-100/70">Update your profile information. Password change requires email code confirmation.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
        <Card className="space-y-4 border-rose-300/20 bg-black/35 p-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-white/45">User profile</p>
            <h2 className="mt-2 text-2xl font-bold text-white">{firstName} {lastName} <span className="text-sm text-white/60">(@{username})</span></h2>
            <p className="mt-2 text-sm text-white/60">Personal account preferences.</p>
          </div>

          <div className="rounded-2xl border border-rose-300/20 bg-rose-500/10 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-rose-100">
              <ShieldCheck className="h-4 w-4" />
              Password security
            </div>
            <p className="mt-2 text-sm leading-6 text-rose-50/80">Only password updates require an email verification code.</p>
            <button
              type="button"
              onClick={sendCode}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-rose-300/30 bg-rose-500/20 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-500/30"
            >
              <Mail className="h-4 w-4" />
              Send password code
            </button>
          </div>
        </Card>

        <Card className="flex min-h-[620px] flex-col gap-5 border-rose-300/20 bg-black/35 p-5">
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={["rounded-xl px-4 py-2 text-sm font-semibold transition", isActive ? "bg-rose-500/25 text-rose-100" : "text-white/65 hover:bg-white/10 hover:text-white"].join(" ")}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {activeTab === "name" ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-2xl font-bold text-white">Change name</h2>
              <p className="mt-2 text-sm leading-6 text-white/60">Change how your name appears on your profile.</p>

              <div className="grid gap-4">
                <FloatingLabelInput
                  label="Username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="mt-5 w-full"
                  focusClassName="focus:border-rose-300/40 focus:ring-2 focus:ring-rose-400/20"
                  labelFocusClassName="peer-focus:text-rose-200 peer-not-placeholder-shown:text-rose-200"
                />

                <FloatingLabelInput
                  label="First name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  className="w-full"
                  focusClassName="focus:border-rose-300/40 focus:ring-2 focus:ring-rose-400/20"
                  labelFocusClassName="peer-focus:text-rose-200 peer-not-placeholder-shown:text-rose-200"
                />

                <FloatingLabelInput
                  label="Last name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  className="w-full"
                  focusClassName="focus:border-rose-300/40 focus:ring-2 focus:ring-rose-400/20"
                  labelFocusClassName="peer-focus:text-rose-200 peer-not-placeholder-shown:text-rose-200"
                />

                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      // simple validation
                      if (!username.trim() || !firstName.trim() || !lastName.trim()) {
                        setMessage("Please fill username, first name and last name.");
                        return;
                      }
                      // persist locally for prototype
                      try {
                        localStorage.setItem("userProfile", JSON.stringify({ username, firstName, lastName }));
                        setName(username);
                        setMessage("Name updated successfully.");
                      } catch (e) {
                        console.error(e);
                        setMessage("Failed to save profile locally.");
                      }
                    }}
                    className="rounded-xl bg-gradient-to-r from-rose-500 to-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:from-rose-400 hover:to-red-400"
                  >
                    Save name
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {activeTab === "password" ? (
            <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <h2 className="text-2xl font-bold text-white">Change password</h2>
                <p className="mt-2 text-sm leading-6 text-white/60">This section unlocks only after email code verification.</p>

                {!verified ? (
                  <div className="mt-5 rounded-2xl border border-dashed border-white/15 bg-black/25 p-4">
                    <p className="text-sm text-white/70">Send the code and confirm it to unlock password fields.</p>
                    {codeSent ? (
                      <>
                        <FloatingLabelInput
                          label="Email code"
                          value={emailCodeInput}
                          onChange={(event) => setEmailCodeInput(event.target.value)}
                          className="mt-4 w-full"
                          inputMode="numeric"
                          focusClassName="focus:border-rose-300/40 focus:ring-2 focus:ring-rose-400/20"
                          labelFocusClassName="peer-focus:text-rose-200 peer-not-placeholder-shown:text-rose-200"
                        />
                        <button
                          type="button"
                          onClick={confirmCode}
                          className="mt-3 w-full rounded-xl bg-gradient-to-r from-rose-500 to-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:from-rose-400 hover:to-red-400"
                        >
                          Confirm code
                        </button>
                      </>
                    ) : null}
                  </div>
                ) : (
                  <div className="mt-5 grid gap-4">
                    <PasswordInput
                      label="Current password"
                      value={passwordForm.currentPassword}
                      onChange={(event) => setPasswordForm((current) => ({ ...current, currentPassword: event.target.value }))}
                      className="w-full"
                      focusClassName="focus:border-rose-300/40 focus:ring-2 focus:ring-rose-400/20"
                      labelFocusClassName="peer-focus:text-rose-200 peer-not-placeholder-shown:text-rose-200"
                      buttonFocusClassName="focus:ring-rose-300/40"
                    />

                    <PasswordStrengthGroup
                      password={passwordForm.newPassword}
                      confirmPassword={passwordForm.confirmPassword}
                      onPasswordChange={(event) => setPasswordForm((current) => ({ ...current, newPassword: event.target.value }))}
                      onConfirmPasswordChange={(event) => setPasswordForm((current) => ({ ...current, confirmPassword: event.target.value }))}
                      passwordLabel="New password"
                      confirmLabel="Confirm new password"
                      focusClassName="focus:border-rose-300/40 focus:ring-2 focus:ring-rose-400/20"
                      labelFocusClassName="peer-focus:text-rose-200 peer-not-placeholder-shown:text-rose-200"
                      buttonFocusClassName="focus:ring-rose-300/40"
                    />

                    <div className="flex justify-end">
                      <button type="button" className="rounded-xl bg-gradient-to-r from-rose-500 to-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:from-rose-400 hover:to-red-400">
                        Save password
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-3xl border border-rose-300/20 bg-rose-500/10 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-rose-100">
                  <CheckCircle2 className="h-4 w-4" />
                  Verification status
                </div>
                <p className="mt-2 text-sm text-rose-50/80">{verified ? "Password section unlocked." : "Password section locked until code is verified."}</p>
                {message ? <p className="mt-4 rounded-2xl border border-rose-300/20 bg-black/25 p-4 text-sm text-rose-50/90">{message}</p> : null}
              </div>
            </div>
          ) : null}

          {activeTab === "identity" ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="mb-4 flex items-center gap-2 text-white">
                <UserCog className="h-5 w-5 text-rose-300" />
                <h2 className="text-2xl font-bold">Gender and orientation</h2>
              </div>

              <div className="grid gap-4">
                <RadioGroup
                  name="gender"
                  title="Your gender"
                  value={identityForm.gender}
                  onChange={(value) => setIdentityForm((current) => ({ ...current, gender: value }))}
                  options={[
                    { value: "man", label: "Man" },
                    { value: "woman", label: "Woman" },
                    { value: "non-binary", label: "Non-binary" },
                    { value: "other", label: "Other" },
                  ]}
                />

                <RadioGroup
                  name="orientation"
                  title="Sexual orientation"
                  value={identityForm.orientation}
                  onChange={(value) => setIdentityForm((current) => ({ ...current, orientation: value }))}
                  options={[
                    { value: "heterosexual", label: "Heterosexual" },
                    { value: "homosexual", label: "Homossexual" },
                    { value: "bisexual", label: "Bisexual" },
                    { value: "other", label: "Other" },
                  ]}
                />
              </div>

              <div className="mt-5 flex justify-end">
                <button type="button" className="rounded-xl bg-gradient-to-r from-rose-500 to-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:from-rose-400 hover:to-red-400">
                  Save identity
                </button>
              </div>
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
