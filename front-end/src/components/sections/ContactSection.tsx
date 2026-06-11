"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

const CONTACT_CARDS = [
  { icon: "📧", label: "B2B Email", value: "corporate@plattercatering.com", action: "mailto:corporate@plattercatering.com", actionLabel: "Send Email" },
  { icon: "📞", label: "Direct Line", value: "+1 (800) PLATTER", action: "tel:+18007528837", actionLabel: "Call Now" },
  { icon: "📍", label: "Service Area", value: "Greater New York & Tri-State Area", action: null, actionLabel: null },
  { icon: "⏰", label: "Working Hours", value: "Monday – Friday, 8:00am – 6:00pm", action: null, actionLabel: null },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSend = () => {
    if (!formData.name.trim()) return setError("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return setError("Please enter a valid work email.");
    if (!formData.message.trim()) return setError("Please write a short message.");
    setError("");
    setSent(true);
  };

  return (
    <section id="contact" className="relative section-padding bg-[#fff8ed] overflow-hidden">
      <div className="absolute -bottom-24 -left-24 w-[420px] h-[420px] blob bg-[#dce8da]/60 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <Reveal>
            <span className="eyebrow">Get In Touch</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl text-[#263128] mt-6 mb-5">
              Start your corporate{" "}
              <span className="accent-text italic">catering journey</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[#263128]/60 text-lg max-w-xl mx-auto">
              Our corporate catering specialists are ready to help you plan the
              perfect business event.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: contact cards */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
              {CONTACT_CARDS.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group card-surface rounded-3xl p-5 hover:-translate-y-1 transition-transform duration-300"
                >
                  <span className="text-2xl">{card.icon}</span>
                  <p className="text-[11px] uppercase tracking-widest text-[#263128]/40 mt-2.5 mb-1 font-semibold">
                    {card.label}
                  </p>
                  <p className="text-sm font-medium text-[#263128]/80 leading-snug mb-2.5">{card.value}</p>
                  {card.action && (
                    <a
                      href={card.action}
                      className="text-[#c96b3c] text-xs font-semibold inline-flex items-center gap-1 group-hover:gap-2.5 transition-all duration-300"
                    >
                      {card.actionLabel} →
                    </a>
                  )}
                </motion.div>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="rounded-3xl bg-[#2f4632] text-white p-7 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-40 h-40 blob bg-[#4f6f52]/60" />
                <div className="relative">
                  <h3 className="font-display text-2xl mb-2">Ready to start?</h3>
                  <p className="text-white/60 text-sm mb-5 leading-relaxed">
                    Skip the inquiry — go straight to our corporate quote form and
                    hear back within 24 hours.
                  </p>
                  <button
                    onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                    className="btn-primary w-full py-3.5 rounded-full text-sm"
                  >
                    Request Corporate Quote →
                  </button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: quick inquiry form */}
          <Reveal delay={0.15}>
            <div className="card-surface rounded-[2rem] p-7 md:p-9 h-full">
              {sent ? (
                <div className="text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 14 }}
                    className="w-16 h-16 rounded-full bg-[#8faf8b]/20 border-2 border-[#4f6f52]/30 flex items-center justify-center mx-auto mb-5 text-2xl"
                  >
                    ✓
                  </motion.div>
                  <h3 className="font-display text-2xl text-[#263128] mb-2">Message sent!</h3>
                  <p className="text-[#263128]/55 text-sm">
                    We&apos;ll get back to you within one business day.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-2xl text-[#263128] mb-6">Send a B2B inquiry</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wide text-[#263128]/55 mb-1.5">
                          Your Name
                        </label>
                        <input
                          className="input-light"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Jane Smith"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wide text-[#263128]/55 mb-1.5">
                          Company
                        </label>
                        <input
                          className="input-light"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Acme Corp"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide text-[#263128]/55 mb-1.5">
                        Work Email
                      </label>
                      <input
                        type="email"
                        className="input-light"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide text-[#263128]/55 mb-1.5">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        className="input-light resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your corporate event or catering needs…"
                      />
                    </div>
                    {error && (
                      <p className="text-sm text-[#d05a4e] bg-[#d05a4e]/8 border border-[#d05a4e]/20 rounded-xl px-4 py-2.5">
                        {error}
                      </p>
                    )}
                    <button
                      onClick={handleSend}
                      className="btn-secondary w-full py-3.5 rounded-full text-sm"
                    >
                      Send Inquiry →
                    </button>
                    <p className="text-xs text-[#263128]/40 text-center">
                      For detailed quotes, use our{" "}
                      <button
                        onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                        className="text-[#c96b3c] underline"
                      >
                        corporate quote form
                      </button>
                      .
                    </p>
                  </div>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
