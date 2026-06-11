"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { STATS } from "@/lib/data";

function AnimatedCounter({
  target,
  suffix,
  duration = 1800,
}: {
  target: number;
  suffix: string;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.4 });

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="font-display text-4xl md:text-5xl text-[#2f4632]">
      {value.toLocaleString()}
      <span className="text-[#c96b3c]">{suffix}</span>
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bandY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} className="relative py-24 bg-[#fff8ed] overflow-hidden">
      <motion.div style={{ y: bandY }} className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none">
        <div className="h-64 bg-[#dce8da]/40 -rotate-2 scale-110" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong rounded-[2.5rem] soft-shadow-lg px-8 py-12 md:py-14"
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-6 text-center">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={i === STATS.length - 1 ? "col-span-2 md:col-span-1" : ""}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="text-sm text-[#263128]/55 mt-2 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
