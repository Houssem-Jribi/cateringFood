"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { TESTIMONIALS } from "@/lib/data";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1 text-[#d9a441]">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(id);
  }, [auto]);

  const go = (i: number) => {
    setAuto(false);
    setIndex((i + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const t = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="relative section-padding bg-[#fff8ed] overflow-hidden">
      <div className="absolute top-10 -right-32 w-[440px] h-[440px] blob bg-[#f4e6d0]/80 pointer-events-none" />
      <div className="absolute -bottom-24 -left-28 w-[400px] h-[400px] blob-2 bg-[#dce8da]/60 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Reveal>
            <span className="eyebrow">B2B Testimonials</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl text-[#263128] mt-6 mb-5">
              Trusted by teams that{" "}
              <span className="accent-text italic">host serious events</span>
            </h2>
          </Reveal>
        </div>

        {/* Featured card */}
        <Reveal delay={0.15}>
          <div className="relative card-surface rounded-[2.5rem] p-8 md:p-12 soft-shadow overflow-hidden min-h-[320px]">
            <span className="absolute top-6 left-8 font-display text-[120px] leading-none text-[#8faf8b]/20 select-none">
              &ldquo;
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 36 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -36 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10"
              >
                <Stars count={t.rating} />
                <p className="text-lg md:text-xl text-[#263128]/75 leading-relaxed mt-5 mb-8 max-w-3xl">
                  {t.review}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-[52px] h-[52px] rounded-full bg-[#4f6f52] text-white flex items-center justify-center font-semibold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-[#263128]">{t.name}</p>
                    <p className="text-sm text-[#263128]/55">
                      {t.role} · {t.company}
                    </p>
                    <p className="text-xs text-[#4f6f52] mt-0.5">{t.event}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* arrows */}
            <div className="absolute bottom-8 right-8 flex gap-2 z-10">
              <button
                onClick={() => go(index - 1)}
                aria-label="Previous testimonial"
                className="w-11 h-11 rounded-full border border-[#263128]/15 bg-white text-[#263128]/70 hover:bg-[#4f6f52] hover:text-white hover:border-[#4f6f52] transition-all duration-300"
              >
                ←
              </button>
              <button
                onClick={() => go(index + 1)}
                aria-label="Next testimonial"
                className="w-11 h-11 rounded-full border border-[#263128]/15 bg-white text-[#263128]/70 hover:bg-[#4f6f52] hover:text-white hover:border-[#4f6f52] transition-all duration-300"
              >
                →
              </button>
            </div>
          </div>
        </Reveal>

        {/* selector row */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {TESTIMONIALS.map((item, i) => (
            <button
              key={item.name}
              onClick={() => go(i)}
              className={`flex items-center gap-2.5 rounded-full pl-1.5 pr-4 py-1.5 border transition-all duration-300 ${
                i === index
                  ? "bg-white border-[#c96b3c]/40 soft-shadow"
                  : "bg-white/50 border-[#263128]/10 hover:bg-white"
              }`}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold text-white ${
                  i === index ? "bg-[#c96b3c]" : "bg-[#8faf8b]"
                }`}
              >
                {item.avatar}
              </span>
              <span className="text-xs font-medium text-[#263128]/70">{item.role}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
