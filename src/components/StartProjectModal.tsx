"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { useProjectModal } from "@/context/ProjectModalContext";
import { X, ArrowRight } from "lucide-react";
import PhoneField from "@/components/PhoneField";
import { submitToWeb3Forms, dialCode, DEFAULT_COUNTRY } from "@/lib/contact";
import type { CountryCode } from "libphonenumber-js";

const goals = [
  "Grow my business",
  "Get more customers",
  "Automate repetitive work",
  "Improve operations",
  "Launch a new website",
  "Build a custom solution",
  "Explore an idea",
  "Other",
];

const areas = [
  "Website & Digital Presence",
  "Business Systems",
  "Automation & AI",
  "Customer Experience",
  "Operations & Workflows",
  "Something Else",
];

const STEPS = 4;
const ease = [0.16, 1, 0.3, 1] as const;

const slide = {
  enter: { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

/* ── Pill select button ──────────────────────────────────────────── */
function Pill({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={`px-4 py-[9px] rounded-full border text-[12.5px] leading-none transition-all duration-200 ${
        selected
          ? "border-accent bg-accent-soft text-ink"
          : "border-line bg-surface-2 text-subtle hover:border-line-strong hover:text-ink hover:bg-surface-2"
      }`}
    >
      {label}
    </motion.button>
  );
}

/* ── Sliding description field with shake + error state ─────────── */
function DescField({
  visible,
  value,
  onChange,
  required,
  placeholder,
  label,
  error,
  errorCount,
  errorMessage,
  onType,
}: {
  visible: boolean;
  value: string;
  onChange: (v: string) => void;
  required: boolean;
  placeholder: string;
  label: string;
  error: boolean;
  errorCount: number;
  errorMessage: string;
  onType: () => void;
}) {
  // Each failed submit shakes the box once. Driven through framer's controls rather than a
  // state flip inside an effect (which React 19's linter rejects as a cascading render).
  const shake = useAnimationControls();

  useEffect(() => {
    if (errorCount > 0) {
      shake.start({ x: [0, -10, 10, -7, 7, -4, 4, 0], transition: { duration: 0.35, ease: "easeOut" } });
    }
  }, [errorCount, shake]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: "auto", marginTop: 20 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.28, ease }}
          className="overflow-hidden"
        >
          <p className="text-xs uppercase tracking-[0.3em] mb-2.5"
            style={{ color: error ? "#b45309" : "var(--subtle)" }}>
            {label}
            {required ? (
              <span style={{ color: error ? "#b45309" : "var(--accent)" }} className="ml-1">*</span>
            ) : (
              <span className="text-subtle ml-1">(optional)</span>
            )}
          </p>

          <motion.textarea
            animate={shake}
            value={value}
            onChange={(e) => { onChange(e.target.value); onType(); }}
            placeholder={placeholder}
            rows={3}
            // transition-colors, not transition-all: a CSS transition on `transform` re-eased every
            // frame framer wrote and flattened the error shake to almost nothing (measured 2026-10-08).
            className="w-full text-ink text-[13px] p-3.5 rounded-xl resize-none leading-relaxed placeholder:text-subtle focus:outline-none transition-colors duration-200"
            style={{
              background: error ? "rgb(180 83 9 / 0.06)" : "var(--surface-2)",
              border: `1px solid ${error ? "rgb(180 83 9 / 0.45)" : "var(--line)"}`,
            }}
          />

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="mt-2 text-xs tracking-wide"
                style={{ color: "#b45309" }}
              >
                {errorMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Underline input field ───────────────────────────────────────── */
function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoFocus?: boolean;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-subtle mb-2">{label}</p>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full bg-transparent border-b border-line pb-2 text-ink text-[13px] placeholder:text-subtle focus:outline-none focus:border-accent transition-colors duration-200"
      />
    </div>
  );
}

/* ── Bottom nav row ──────────────────────────────────────────────── */
function NavRow({
  canNext,
  onNext,
  onBack,
  label = "Continue",
  accent = false,
}: {
  canNext: boolean;
  onNext: () => void;
  onBack?: () => void;
  label?: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between mt-7 pt-5 border-t border-line">
      {onBack ? (
        <button
          onClick={onBack}
          className="text-xs uppercase tracking-[0.22em] text-subtle hover:text-subtle transition-colors"
        >
          ← Back
        </button>
      ) : (
        <span />
      )}
      <button
        onClick={onNext}
        className={`flex items-center gap-2 text-xs uppercase tracking-[0.18em] px-6 py-2.5 rounded-full transition-all duration-200 ${
          canNext
            ? accent
              ? "bg-ink text-bg dark:bg-accent dark:text-accent-ink font-semibold hover:opacity-90"
              : "border border-accent text-accent hover:bg-accent-soft"
            : "border border-line text-subtle cursor-not-allowed"
        }`}
      >
        {label}
        {!accent && <ArrowRight size={11} />}
      </button>
    </div>
  );
}

/* ── Main modal ──────────────────────────────────────────────────── */
export default function StartProjectModal() {
  const { isOpen, closeModal } = useProjectModal();

  const [step, setStep] = useState(1);

  // Step 1
  const [goal, setGoal] = useState<string | null>(null);
  const [goalDesc, setGoalDesc] = useState("");
  const [goalError, setGoalError] = useState(false);
  const [goalErrorCount, setGoalErrorCount] = useState(0);

  // Step 2
  const [area, setArea] = useState<string | null>(null);
  const [areaDesc, setAreaDesc] = useState("");
  const [areaError, setAreaError] = useState(false);
  const [areaErrorCount, setAreaErrorCount] = useState(0);

  // Step 3
  const [desc, setDesc] = useState("");

  // Step 4
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState<CountryCode>(DEFAULT_COUNTRY);
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [extra, setExtra] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const reset = () => {
    setTimeout(() => {
      setStep(1);
      setGoal(null); setGoalDesc(""); setGoalError(false); setGoalErrorCount(0);
      setArea(null); setAreaDesc(""); setAreaError(false); setAreaErrorCount(0);
      setDesc("");
      setName(""); setBusiness(""); setEmail(""); setCountry(DEFAULT_COUNTRY);
      setPhone(""); setWhatsapp(""); setExtra("");
      setSubmitting(false); setSubmitError("");
    }, 420);
  };

  const close = () => { closeModal(); reset(); };

  // Escape closes the popup like every other dialog on the site. It keeps what was typed, so an
  // accidental key press doesn't throw the answers away (the X button still starts fresh).
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeModal]);

  // Step 1: button is clickable whenever a pill is selected; validation fires on click
  const handleStep1Next = () => {
    if (!goal) return;
    if (goal === "Other" && goalDesc.trim().length === 0) {
      setGoalError(true);
      setGoalErrorCount((n) => n + 1);
      return;
    }
    setGoalError(false);
    setStep(2);
  };

  // Step 2: same pattern
  const handleStep2Next = () => {
    if (!area) return;
    if (area === "Something Else" && areaDesc.trim().length === 0) {
      setAreaError(true);
      setAreaErrorCount((n) => n + 1);
      return;
    }
    setAreaError(false);
    setStep(3);
  };

  const step3CanNext = desc.trim().length > 0;
  // Name + at least one way to reach them (email OR phone). No format checks.
  const step4CanNext =
    name.trim().length > 0 && (email.trim().length > 0 || phone.trim().length > 0);

  const handleSend = async () => {
    if (!step4CanNext || submitting) return;
    setSubmitting(true);
    setSubmitError("");

    const phoneFull = phone.trim() ? `+${dialCode(country)} ${phone.trim()}` : "";

    // Structured, labelled body so the email is easy to read.
    const message = [
      "🚀 NEW PROJECT INQUIRY",
      "Source: Start a Project",
      "════════════════════",
      `Goal:        ${goal ?? "—"}${goalDesc.trim() ? ` — ${goalDesc.trim()}` : ""}`,
      `Help area:   ${area ?? "—"}${areaDesc.trim() ? ` — ${areaDesc.trim()}` : ""}`,
      "",
      "Project details:",
      desc.trim() || "—",
      "────────────────────",
      `Name:        ${name.trim()}`,
      `Business:    ${business.trim() || "—"}`,
      `Email:       ${email.trim() || "—"}`,
      `Phone:       ${phoneFull || "—"}`,
      `WhatsApp:    ${whatsapp.trim() || "—"}`,
      `Additional:  ${extra.trim() || "—"}`,
    ].join("\n");

    const fields: Record<string, string> = {
      from_name: "AEVINITE — Start a Project",
      subject: `🚀 Project inquiry: ${goal ?? ""} — ${name.trim()}`,
      name: name.trim(),
      message,
    };
    if (email.trim()) fields.email = email.trim(); // reply-to
    if (phoneFull) fields.phone = phoneFull;

    const res = await submitToWeb3Forms(fields);
    setSubmitting(false);

    if (res.success) {
      setStep(5);
    } else {
      setSubmitError(res.message || "Couldn't send. Please try again or email us directly.");
    }
  };

  const fillPct = `${(Math.min(step, STEPS) / STEPS) * 100}%`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center sm:p-6 bg-black/40 backdrop-blur-md"
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        >
          <motion.div
            initial={{ y: 52, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 52, opacity: 0 }}
            transition={{ duration: 0.42, ease }}
            className="relative w-full sm:max-w-[560px] bg-surface border border-line rounded-t-[26px] sm:rounded-[26px] overflow-hidden"
            style={{ boxShadow: "var(--shadow-lg)" }}
          >
            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-surface-2 z-20">
              <motion.div
                className="h-full"
                style={{ background: "var(--accent)" }}
                animate={{ width: fillPct }}
                transition={{ duration: 0.38, ease: "easeOut" }}
              />
            </div>

            {/* Header row */}
            <div className="flex items-center justify-between px-7 pt-8 pb-0 sm:px-9 sm:pt-9">
              <span className="text-xs tracking-[0.38em] text-subtle uppercase">
                {step <= STEPS ? `${String(step).padStart(2, "0")} / ${String(STEPS).padStart(2, "0")}` : "Done"}
              </span>
              <button
                onClick={close}
                aria-label="Close"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-line text-subtle hover:text-muted hover:border-line-strong transition-all duration-200"
              >
                <X size={13} strokeWidth={1.8} />
              </button>
            </div>

            {/* Step body */}
            <div className="px-7 sm:px-9 pt-6 pb-8 sm:pb-9">
              <AnimatePresence mode="wait">

                {/* ── Step 1: Goal ── */}
                {step === 1 && (
                  <motion.div key="s1" variants={slide} initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.28, ease }}>
                    <h2 className="text-[21px] sm:text-[25px] font-semibold tracking-tight text-ink leading-tight mb-6">
                      What are you looking<br />to achieve?
                    </h2>

                    <div className="flex flex-wrap gap-2">
                      {goals.map((g) => (
                        <Pill
                          key={g}
                          label={g}
                          selected={goal === g}
                          onClick={() => { setGoal(g); setGoalDesc(""); setGoalError(false); }}
                        />
                      ))}
                    </div>

                    <DescField
                      visible={!!goal}
                      value={goalDesc}
                      onChange={setGoalDesc}
                      required={goal === "Other"}
                      label={goal === "Other" ? "What are you looking to achieve" : "Tell us more"}
                      placeholder={
                        goal === "Other"
                          ? "Describe what you're looking to achieve..."
                          : `e.g. How would you like to ${goal?.toLowerCase() ?? "proceed"}?`
                      }
                      error={goalError}
                      errorCount={goalErrorCount}
                      errorMessage="Please describe what you're looking to achieve."
                      onType={() => setGoalError(false)}
                    />

                    <NavRow canNext={!!goal} onNext={handleStep1Next} />
                  </motion.div>
                )}

                {/* ── Step 2: Area ── */}
                {step === 2 && (
                  <motion.div key="s2" variants={slide} initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.28, ease }}>
                    <h2 className="text-[21px] sm:text-[25px] font-semibold tracking-tight text-ink leading-tight mb-6">
                      Where do you<br />need help?
                    </h2>

                    <div className="flex flex-wrap gap-2">
                      {areas.map((a) => (
                        <Pill
                          key={a}
                          label={a}
                          selected={area === a}
                          onClick={() => { setArea(a); setAreaDesc(""); setAreaError(false); }}
                        />
                      ))}
                    </div>

                    <DescField
                      visible={!!area}
                      value={areaDesc}
                      onChange={setAreaDesc}
                      required={area === "Something Else"}
                      label={area === "Something Else" ? "What do you need help with" : "Tell us more"}
                      placeholder={
                        area === "Something Else"
                          ? "Describe what you need help with..."
                          : `e.g. What specifically do you need for ${area?.toLowerCase() ?? "this area"}?`
                      }
                      error={areaError}
                      errorCount={areaErrorCount}
                      errorMessage="Please tell us what you need help with."
                      onType={() => setAreaError(false)}
                    />

                    <NavRow canNext={!!area} onNext={handleStep2Next} onBack={() => setStep(1)} />
                  </motion.div>
                )}

                {/* ── Step 3: Description ── */}
                {step === 3 && (
                  <motion.div key="s3" variants={slide} initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.28, ease }}>
                    <h2 className="text-[21px] sm:text-[25px] font-semibold tracking-tight text-ink leading-tight mb-5">
                      Tell us about<br />your project
                    </h2>
                    <textarea
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      autoFocus
                      rows={6}
                      placeholder={"e.g. \"I want more customers from my website.\"\n\"I want to automate manual work in my business.\"\n\"I need a custom system for my team.\"\n\"I have an idea and need help bringing it to life.\""}
                      className="w-full bg-surface-2 border border-line rounded-xl text-ink text-[13px] p-4 focus:outline-none focus:border-accent focus:bg-surface-2 transition-all duration-200 resize-none placeholder:text-subtle leading-relaxed"
                    />
                    <NavRow canNext={step3CanNext} onNext={() => setStep(4)} onBack={() => setStep(2)} />
                  </motion.div>
                )}

                {/* ── Step 4: Contact ── */}
                {step === 4 && (
                  <motion.div key="s4" variants={slide} initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.28, ease }}>
                    <h2 className="text-[21px] sm:text-[25px] font-semibold tracking-tight text-ink leading-tight mb-6">
                      How can we<br />reach you?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                      <Field label="Full Name *" value={name} onChange={setName} placeholder="John Smith" autoFocus />
                      <Field label="Business Name" value={business} onChange={setBusiness} placeholder="Optional" />
                      <Field label="Email Address" type="email" value={email} onChange={setEmail} placeholder="you@company.com" />
                      <PhoneField
                        label="Phone Number"
                        variant="underline"
                        country={country}
                        setCountry={setCountry}
                        phone={phone}
                        setPhone={setPhone}
                      />
                      <Field label="WhatsApp Number" type="tel" value={whatsapp} onChange={setWhatsapp} placeholder="If different from phone" />
                      <Field label="Additional Info" value={extra} onChange={setExtra} placeholder="Optional" />
                    </div>

                    <p className="mt-4 text-xs tracking-wide text-subtle">
                      Add at least an email or phone so we can reach you.
                    </p>

                    <AnimatePresence>
                      {submitError && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="mt-2 text-xs tracking-wide"
                          style={{ color: "#b45309" }}
                        >
                          {submitError}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <NavRow
                      canNext={step4CanNext && !submitting}
                      onNext={handleSend}
                      onBack={() => setStep(3)}
                      label={submitting ? "Sending…" : "Send"}
                      accent
                    />
                  </motion.div>
                )}

                {/* ── Success ── */}
                {step === 5 && (
                  <motion.div key="s5"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.42, ease }}
                    className="flex flex-col items-center text-center py-10"
                  >
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.08, type: "spring", bounce: 0.42 }}
                      className="w-[52px] h-[52px] rounded-full border border-accent bg-accent-soft flex items-center justify-center mb-7"
                      style={{ boxShadow: "0 0 26px var(--glow)" }}
                    >
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <motion.path
                          d="M4.5 11l4 4L17.5 7.5"
                          stroke="var(--accent)"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.32, duration: 0.5, ease: "easeOut" }}
                        />
                      </svg>
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-[22px] sm:text-[26px] font-bold text-ink mb-2.5"
                    >
                      We&apos;re on it.
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-subtle text-[13px] leading-relaxed mb-9 max-w-[260px]"
                    >
                      Expect to hear from us within 24 hours.
                      {email && (
                        <>
                          <br />
                          <span className="text-subtle">{email}</span>
                        </>
                      )}
                    </motion.p>

                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.48 }}
                      onClick={close}
                      className="text-xs uppercase tracking-[0.3em] text-subtle hover:text-subtle transition-colors"
                    >
                      Close
                    </motion.button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
