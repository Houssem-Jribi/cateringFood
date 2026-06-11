"use client";
import Reveal from "@/components/ui/Reveal";
import BookingForm from "@/components/forms/BookingForm";

export default function BookingSection() {
  return (
    <section id="booking" className="relative section-padding bg-[#fdf3e3] overflow-hidden rounded-t-[3rem]">
      <div className="absolute -top-20 -left-28 w-[420px] h-[420px] blob bg-[#dce8da]/60 pointer-events-none" />
      <div className="absolute bottom-0 -right-32 w-[460px] h-[460px] blob-2 bg-[#fbe9d6]/80 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <Reveal>
            <span className="eyebrow">Corporate Quote</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl text-[#263128] mt-6 mb-5">
              Request your <span className="accent-text italic">custom B2B quote</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[#263128]/60 text-lg max-w-2xl mx-auto">
              Tell us about your corporate event and receive a professional,
              itemized catering quote within 24 business hours.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-5 mt-6 text-sm text-[#263128]/55">
              {["24h Response", "No Obligation", "Invoice-Ready", "Fully Customized"].map((tag) => (
                <span key={tag} className="flex items-center gap-1.5">
                  <span className="text-[#4f6f52]">✓</span> {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="glass-strong rounded-[2.5rem] soft-shadow-lg p-6 md:p-12">
            <BookingForm />
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-[#263128]/40">
            <span>🔒 Secure &amp; confidential</span>
            <span>📧 corporate@plattercatering.com</span>
            <span>📞 +1 (800) PLATTER</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
