"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { IMG } from "@/lib/images";

const PILLARS = [
  { icon: "🏢", title: "B2B Only", text: "We work exclusively with companies, offices, and corporate teams." },
  { icon: "🌿", title: "Fresh Daily", text: "Ingredients sourced every morning from trusted local suppliers." },
  { icon: "🤍", title: "Elegant Service", text: "Professional presentation that reflects well on your brand." },
  { icon: "📈", title: "Built to Scale", text: "From 10-person boardrooms to 1,000-guest conferences." },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgOneY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imgTwoY = useTransform(scrollYProgress, [0, 1], [120, -40]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [40, -80]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative section-padding bg-[#fdf3e3] overflow-hidden rounded-t-[3rem]"
    >
      <div className="absolute top-12 right-0 w-[420px] h-[420px] blob bg-[#dce8da]/60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Parallax image collage */}
        <div className="relative h-[480px] md:h-[560px]">
          <motion.div
            style={{ y: imgOneY }}
            className="absolute top-0 left-0 w-[68%] h-[64%] rounded-[2rem] overflow-hidden soft-shadow-lg border-8 border-white"
          >
            <img src={IMG.chefPrep} alt="Our chefs preparing corporate menus" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            style={{ y: imgTwoY }}
            className="absolute bottom-0 right-0 w-[58%] h-[58%] rounded-[2rem] overflow-hidden soft-shadow-lg border-8 border-white"
          >
            <img src={IMG.fineDining} alt="Elegant corporate plating" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            style={{ y: badgeY }}
            className="absolute top-[48%] left-[44%] glass-strong rounded-2xl px-6 py-5 soft-shadow z-10"
          >
            <p className="font-display text-3xl text-[#4f6f52]">10+</p>
            <p className="text-xs text-[#263128]/60 whitespace-nowrap">years of corporate catering</p>
          </motion.div>
        </div>

        {/* Copy */}
        <div>
          <Reveal>
            <span className="eyebrow mb-6">About Platter Catering</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.12] text-[#263128] mt-6 mb-6">
              Professional food experiences,{" "}
              <span className="accent-text italic">designed for business</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[#263128]/65 text-lg leading-relaxed mb-5">
              Platter Catering helps companies organize professional food experiences
              for corporate events. From recurring office lunches to thousand-guest
              conferences, we bring restaurant-grade quality with business-grade
              reliability.
            </p>
            <p className="text-[#263128]/55 leading-relaxed mb-10">
              HR teams, office managers, and event coordinators trust us because we
              make corporate catering effortless — one form, one account manager,
              one invoice, and a flawless event.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.title} delay={0.25 + i * 0.08}>
                <div className="card-surface rounded-2xl p-5 h-full hover:-translate-y-1 transition-transform duration-300">
                  <span className="text-2xl">{pillar.icon}</span>
                  <p className="font-semibold text-[#263128] mt-3 mb-1">{pillar.title}</p>
                  <p className="text-sm text-[#263128]/55 leading-relaxed">{pillar.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
