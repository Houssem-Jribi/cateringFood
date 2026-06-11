"use client";
import { useRef, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";
import { IMG } from "@/lib/images";

/* Floating ingredient chips orbiting the hero platter.
   depth controls mouse-parallax intensity; speed controls scroll drift. */
const FLOATERS = [
  { src: IMG.herbs, label: "Fresh herbs", size: 110, top: "8%", left: "4%", depth: 28, speed: -90, delay: 0 },
  { src: IMG.veggies, label: "Vegetables", size: 88, top: "14%", left: "76%", depth: 46, speed: -150, delay: 0.6 },
  { src: IMG.bread, label: "Artisan bread", size: 96, top: "60%", left: "2%", depth: 38, speed: -120, delay: 1.2 },
  { src: IMG.cheeseBoard, label: "Cheese", size: 76, top: "74%", left: "88%", depth: 54, speed: -180, delay: 0.3 },
  { src: IMG.fruit, label: "Fruits", size: 70, top: "38%", left: "92%", depth: 34, speed: -110, delay: 0.9 },
  { src: IMG.croissants, label: "Pastries", size: 82, top: "86%", left: "14%", depth: 48, speed: -160, delay: 1.5 },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function Floater({
  f,
  smx,
  progress,
}: {
  f: (typeof FLOATERS)[number];
  smx: MotionValue<number>;
  progress: MotionValue<number>;
}) {
  const x = useTransform(smx, (v) => v * f.depth);
  const y = useTransform(progress, [0, 1], [0, f.speed]);

  return (
    <motion.div
      className="absolute hidden md:block pointer-events-none z-10"
      style={{ top: f.top, left: f.left, x, y }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.4 + f.delay * 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 6 + f.delay, repeat: Infinity, ease: "easeInOut", delay: f.delay }}
          className="rounded-full overflow-hidden soft-shadow border-4 border-white"
          style={{ width: f.size, height: f.size }}
        >
          <img src={f.src} alt={f.label} className="w-full h-full object-cover" loading="eager" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 50, damping: 16 });
  const smy = useSpring(my, { stiffness: 50, damping: 16 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const plateY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const plateRotate = useTransform(scrollYProgress, [0, 1], [0, 14]);
  const plateScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const plateMouseX = useTransform(smx, (v) => v * -22);
  const plateMouseY = useTransform(smy, (v) => v * -22);

  const onMouseMove = (e: MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#fff8ed] grain"
    >
      {/* Soft background washes */}
      <motion.div style={{ y: blobY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[560px] h-[560px] blob bg-[#f4e6d0] opacity-80" />
        <div className="absolute top-1/3 -right-48 w-[640px] h-[640px] blob-2 bg-[#dce8da] opacity-70" />
        <div className="absolute -bottom-40 left-1/4 w-[480px] h-[480px] blob bg-[#fbe9d6] opacity-60" />
      </motion.div>
      <div className="absolute inset-0 dot-bg opacity-40 pointer-events-none" />

      {/* Floating ingredient chips */}
      {FLOATERS.map((f) => (
        <Floater key={f.label} f={f} smx={smx} progress={scrollYProgress} />
      ))}

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-14 items-center pt-32 pb-20">
        {/* Copy */}
        <motion.div style={{ y: contentY, opacity: contentOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow mb-6">B2B Corporate Catering</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-6xl xl:text-7xl leading-[1.05] text-[#263128] mt-6 mb-6"
          >
            Premium Corporate Catering for{" "}
            <span className="accent-text italic">Modern Companies</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-[#263128]/65 leading-relaxed max-w-xl mb-10"
          >
            Fresh ingredients, elegant presentation, and reliable service for
            meetings, conferences, office lunches, and corporate events.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Magnetic>
              <button
                onClick={() => scrollTo("booking")}
                className="btn-primary px-8 py-4 rounded-full text-base"
              >
                Request a Corporate Quote →
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => scrollTo("menus")}
                className="btn-outline px-8 py-4 rounded-full text-base"
              >
                Explore Corporate Menus
              </button>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex items-center gap-3 mt-10 text-sm text-[#263128]/50"
          >
            <div className="flex -space-x-2">
              {[IMG.saladBowls, IMG.canapes, IMG.coffee].map((src, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden soft-shadow">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            Trusted catering partner for modern companies, teams, and business events.
          </motion.div>
        </motion.div>

        {/* Hero platter visual */}
        <motion.div
          style={{ y: plateY, scale: plateScale }}
          className="relative hidden lg:flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* organic rings behind platter */}
            <div className="absolute -inset-10 blob bg-[#8faf8b]/20" />
            <div className="absolute -inset-4 blob-2 bg-[#d9a441]/15" />

            <motion.div
              style={{ rotate: plateRotate, x: plateMouseX, y: plateMouseY }}
              className="relative w-[420px] h-[420px] xl:w-[480px] xl:h-[480px] rounded-full overflow-hidden border-[10px] border-white soft-shadow-lg"
            >
              <img
                src={IMG.grillPlatter}
                alt="Premium corporate catering platter"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* floating info cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-10 glass-strong rounded-2xl px-5 py-4 soft-shadow"
            >
              <p className="text-xs uppercase tracking-widest text-[#4f6f52] font-semibold mb-1">
                Next-day quotes
              </p>
              <p className="text-sm text-[#263128]/70">Itemized B2B quote in 24h</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-4 -right-8 glass-strong rounded-2xl px-5 py-4 soft-shadow"
            >
              <p className="font-display text-2xl text-[#c96b3c]">500+</p>
              <p className="text-xs text-[#263128]/60">corporate events served</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#263128]/40">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-5 h-9 rounded-full border-2 border-[#263128]/20 flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-[#c96b3c]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
