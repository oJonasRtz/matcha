"use client";

import React from "react";

type Option = { value: string; label: string };

type RadioGroupProps = {
  name: string;
  title: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  className?: string;
  /** Tailwind classes applied to the checked/active label (e.g. "bg-red-500 text-white") */
  activeClassName?: string;
  /** Tailwind classes for the group border when focused/active */
  focusRingClassName?: string;
  /** Tailwind ring color used when an option is checked (without the peer-checked: prefix) */
  ringClassName?: string;
};

export default function RadioGroup({
  name,
  title,
  options,
  value,
  onChange,
  required = false,
  className = "",
  activeClassName = "bg-red-500 text-white",
  focusRingClassName = "focus-within:ring-2 focus-within:ring-red-200/40",
  ringClassName = "ring-red-400/60",
}: RadioGroupProps) {
  // Convert space-separated activeClassName into peer-checked: prefixed classes
  const checkedActiveClass = activeClassName
    ? activeClassName.split(" ").map((c) => `peer-checked:${c}`).join(" ")
    : "";
  const checkedRingClass = ringClassName ? `peer-checked:${ringClassName}` : "";
  return (
    <fieldset className={`relative rounded-xl border border-white/20 p-4 pt-6 ${className} ${focusRingClassName}`}>
      <legend className="absolute left-4 top-0 -translate-y-1/2 bg-black/60 px-2 text-xs font-semibold text-white/80">
        {title}
      </legend>

      <div className="flex flex-wrap gap-3">
        {options.map((opt) => (
          <div key={opt.value} className="flex items-center">
            <input
              id={`${name}-${opt.value}`}
              name={name}
              type="radio"
              className="peer sr-only"
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange?.(opt.value)}
              required={required && !value}
            />

            <label
              htmlFor={`${name}-${opt.value}`}
              className={`cursor-pointer select-none rounded-full border border-white/10 px-3 py-2 text-sm font-semibold text-white/80 transition shadow-sm hover:scale-[1.02] peer-checked:scale-100 peer-checked:shadow-md peer-checked:border-transparent peer-checked:bg-red-500 peer-checked:text-white peer-checked:ring-2 peer-checked:ring-red-400/60 ${checkedActiveClass} ${checkedRingClass}`}
            >
              {opt.label}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
