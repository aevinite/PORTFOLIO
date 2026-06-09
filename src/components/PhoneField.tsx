"use client";

import { COUNTRIES, dialCode, flagEmoji } from "@/lib/contact";
import type { CountryCode } from "libphonenumber-js";

/**
 * Reusable country-aware phone input.
 *  - "boxed"     -> matches the contact page's rounded inputs
 *  - "underline" -> matches the Start-a-Project modal's underline fields
 * No validation: the data is taken as given. The country picker is for a
 * professional feel + capturing the dial code alongside the number.
 */
export default function PhoneField({
  country,
  setCountry,
  phone,
  setPhone,
  label,
  variant = "boxed",
}: {
  country: CountryCode;
  setCountry: (c: CountryCode) => void;
  phone: string;
  setPhone: (p: string) => void;
  label: string;
  variant?: "boxed" | "underline";
}) {
  const boxed = variant === "boxed";

  return (
    <div className="flex flex-col gap-2">
      <label
        className={
          boxed
            ? "text-xs uppercase tracking-widest text-white/50 font-bold"
            : "text-[9px] uppercase tracking-[0.3em] text-white/28 font-mono"
        }
      >
        {label}
      </label>

      <div
        className={
          boxed
            ? "flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl pl-2 pr-3 focus-within:border-neon-blue transition-colors"
            : "flex items-center gap-1 border-b border-white/[0.09] focus-within:border-neon-blue/38 transition-colors"
        }
      >
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value as CountryCode)}
          aria-label="Country"
          className={`bg-transparent text-white/70 focus:outline-none cursor-pointer ${
            boxed ? "py-3 text-sm" : "pb-2 text-[13px]"
          }`}
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code} className="bg-[#06070d] text-white">
              {flagEmoji(c.code)} {c.code} +{c.dial}
            </option>
          ))}
        </select>

        <span className="text-white/40 text-sm select-none">+{dialCode(country)}</span>

        <input
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="98765 43210"
          className={`flex-1 min-w-0 bg-transparent text-white focus:outline-none placeholder:text-white/25 ${
            boxed ? "py-3 text-sm" : "pb-2 text-[13px] text-white/90"
          }`}
        />
      </div>
    </div>
  );
}
