"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import { HOW_IT_WORKS } from "@/lib/data";

export default function HowItWorksSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });
  const lineScale = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 90,
    damping: 26,
  });

  return (
    <section id="how-it-works" className="relative section-padding bg-[#fff8ed] overflow-hidden">
      <div className="absolute top-0 -left-32 w-[420px] h-[420px] blob bg-[#dce8da]/50 pointer-events-none" />
      <div className="absolute bottom-20 -right-32 w-[460px] h-[460px] blob-2 bg-[#f4e6d0]/80 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <Reveal>
            <span className="eyebrow">How It Works</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl text-[#263128] mt-6 mb-5">
              From inquiry to event in{" "}
              <span className="accent-text italic">six smooth steps</span>
            </h2>
          </Reveal>
        </div>

        {/* Vertical timeline */}
        <div ref={timelineRef} className="relative">
          {/* progress spine */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 bg-[#263128]/8 rounded-full" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-[#8faf8b] via-[#d9a441] to-[#c96b3c]"
          />

          <div className="space-y-12 md:space-y-20">
            {HOW_IT_WORKS.map((step, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 44 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex items-center gap-8 pl-16 md:pl-0 ${
                    left ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-12 h-12 rounded-full bg-white border-[3px] border-[#c96b3c] soft-shadow flex items-center justify-center text-xl"
                    >
                      {step.icon}
                    </motion.div>
                  </div>

                  {/* card */}
                  <div className={`md:w-[calc(50%-3.5rem)] ${left ? "md:mr-auto md:text-right" : "md:ml-auto"}`}>
                    <div className="card-surface rounded-3xl p-7 hover:-translate-y-1.5 transition-transform duration-400">
                      <span className="font-display text-4xl accent-text">{step.step}</span>
                      <h3 className="font-semibold text-lg text-[#263128] mt-2 mb-2">{step.title}</h3>
                      <p className="text-sm text-[#263128]/55 leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* spacer for the opposite side */}
                  <div className="hidden md:block md:w-[calc(50%-3.5rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.15} className="text-center mt-20">
          <Magnetic>
            <button
              onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary px-9 py-4 rounded-full"
            >
              Start Step One — Request a Quote →
            </button>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
