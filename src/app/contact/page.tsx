"use client";

import { motion } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { useState } from "react";
import PhoneField from "@/components/PhoneField";
import { submitToWeb3Forms, dialCode, DEFAULT_COUNTRY } from "@/lib/contact";
import type { CountryCode } from "libphonenumber-js";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [country, setCountry] = useState<CountryCode>(DEFAULT_COUNTRY);
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState(""); // spam trap — humans never fill this

  // At least one way to reach them. (No format verification — data taken as given.)
  const hasContact = formState.email.trim().length > 0 || phone.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) { setIsSuccess(true); return; } // bot trap
    if (!hasContact) {
      setError("Please add an email or phone number so we can reach you.");
      return;
    }
    setIsSubmitting(true);
    setError("");

    const phoneFull = phone.trim() ? `+${dialCode(country)} ${phone.trim()}` : "";

    // Structured, labelled body so the email is easy to read.
    const message = [
      "📩 NEW CONTACT MESSAGE",
      "Source: Contact page",
      "────────────────────",
      `Name:    ${formState.name}`,
      `Email:   ${formState.email.trim() || "—"}`,
      `Phone:   ${phoneFull || "—"}`,
      `Subject: ${formState.subject.trim() || "—"}`,
      "",
      "Message:",
      formState.message.trim(),
    ].join("\n");

    const fields: Record<string, string> = {
      from_name: "AEVINITE — Contact",
      subject: `📩 Contact: ${formState.subject.trim() || formState.name}`,
      name: formState.name,
      message,
    };
    if (formState.email.trim()) fields.email = formState.email.trim(); // reply-to
    if (phoneFull) fields.phone = phoneFull;

    const res = await submitToWeb3Forms(fields);
    setIsSubmitting(false);

    if (res.success) {
      setIsSuccess(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
      setPhone("");
      setTimeout(() => setIsSuccess(false), 5000);
    } else {
      setError(res.message || "Something went wrong. Please email us directly.");
    }
  };

  return (
    <>
      <SmoothScroll>
        <ParticleBackground />
        <Navbar />
        
        <main className="flex flex-col relative z-10 w-full min-h-screen pt-32 pb-20">
          <div className="container mx-auto px-6 md:px-12 flex-1 flex flex-col justify-center">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              
              {/* Left Column: Contact Info */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col justify-center"
              >
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  Let's create the <span className="text-neon-blue text-glow">future.</span>
                </h1>
                <p className="text-xl text-white/60 mb-12 max-w-lg font-light leading-relaxed">
                  Whether you have a specific project in mind or just want to explore possibilities, we're ready to bring your vision to life.
                </p>
                
                <div className="flex flex-col gap-8">
                  <div className="flex items-start gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 group-hover:border-neon-blue group-hover:text-neon-blue group-hover:bg-neon-blue/10 transition-all duration-300">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h3 className="text-white uppercase tracking-widest text-sm font-bold mb-1">Email Us</h3>
                      <p className="text-white/60 group-hover:text-white transition-colors">aevinite@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 group-hover:border-neon-blue group-hover:text-neon-blue group-hover:bg-neon-blue/10 transition-all duration-300">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h3 className="text-white uppercase tracking-widest text-sm font-bold mb-1">Call Us</h3>
                      <a href="tel:+919409901526" className="interactive text-white/60 group-hover:text-white transition-colors">+91 94099 01526</a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Contact Form */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden"
              >
                {/* Form Background Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-neon-blue/10 via-transparent to-transparent opacity-50" />
                
                <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
                  {/* Honeypot — hidden from people, irresistible to bots */}
                  <input
                    type="text"
                    name="botcheck"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs uppercase tracking-widest text-white/50 font-bold">Name</label>
                      <input 
                        type="text" 
                        id="name"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs uppercase tracking-widest text-white/50 font-bold">Email</label>
                      <input
                        type="email"
                        id="email"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <PhoneField
                    label="Phone"
                    variant="boxed"
                    country={country}
                    setCountry={setCountry}
                    phone={phone}
                    setPhone={setPhone}
                  />
                  <p className="-mt-3 text-xs text-white/35">Add at least an email or a phone number so we can reach you.</p>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="text-xs uppercase tracking-widest text-white/50 font-bold">Subject</label>
                    <input 
                      type="text" 
                      id="subject"
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState({...formState, subject: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all"
                      placeholder="Project Inquiry"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-xs uppercase tracking-widest text-white/50 font-bold">Message</label>
                    <textarea 
                      id="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="interactive group relative w-full py-4 mt-4 rounded-xl overflow-hidden"
                  >
                    <div className={`absolute inset-0 transition-transform duration-300 ${isSuccess ? "bg-green-500" : "bg-neon-blue group-hover:scale-[1.02]"}`} />
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    
                    <span className="relative z-10 flex items-center justify-center gap-2 text-black uppercase tracking-widest text-sm font-bold">
                      {isSubmitting ? "Sending..." : isSuccess ? "Message Sent!" : "Send Message"}
                      {!isSubmitting && !isSuccess && <ArrowRight size={16} />}
                    </span>
                  </button>

                  {error && (
                    <p className="text-red-400 text-sm text-center" role="alert">
                      {error}
                    </p>
                  )}
                </form>
              </motion.div>

            </div>
          </div>
        </main>

        <Footer />
      </SmoothScroll>
    </>
  );
}
