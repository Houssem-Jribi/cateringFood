"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { FAQ_ITEMS } from "@/lib/data";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative section-padding bg-[#fff8ed] overflow-hidden">
      <div className="absolute top-16 -right-28 w-[400px] h-[400px] blob bg-[#f4e6d0]/80 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <Reveal>
            <span className="eyebrow">Frequently Asked Questions</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl text-[#263128] mt-6 mb-5">
              Corporate catering, <span className="accent-text italic">answered</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[#263128]/60 text-lg">
              Everything companies need to know about working with Platter Catering.
            </p>
          </Reveal>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const open = openIndex === i;
            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={`rounded-3xl border-[1.5px] overflow-hidden transition-all duration-400 ${
                  open
                    ? "bg-white border-[#c96b3c]/30 soft-shadow"
                    : "bg-white/60 border-[#263128]/8 hover:border-[#263128]/20"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="w-full px-6 md:px-7 py-5 flex items-center justify-between gap-4 text-left"
                >
                  <span className="font-medium text-[#263128]/85 leading-snug">{item.question}</span>
                  <motion.span
                    animate={{ rotate: open ? 45 : 0, backgroundColor: open ? "#c96b3c" : "#f4e6d0" }}
                    transition={{ duration: 0.3 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-lg ${
                      open ? "text-white" : "text-[#263128]/60"
                    }`}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 md:px-7 pb-6 text-sm text-[#263128]/60 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <Reveal delay={0.1} className="text-center mt-12">
          <p className="text-[#263128]/55 mb-5">Still have questions about corporate catering?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-secondary px-7 py-3.5 rounded-full text-sm"
            >
              Contact Our Team
            </button>
            <button
              onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-outline px-7 py-3.5 rounded-full text-sm"
            >
              Request a Quote
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
