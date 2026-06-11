"use client";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { IMG } from "@/lib/images";

/* 4-stage scroll story: Ingredients → Preparation → Plating → Corporate Setup */
const STAGES = [
  {
    id: "ingredients",
    eyebrow: "Stage 01 — Fresh Ingredients",
    title: "It starts with the freshest ingredients",
    text: "Vegetables, herbs, artisan bread, fruit, and cheese — sourced daily and selected for corporate menus.",
    image: IMG.veggies,
    accent: "#8faf8b",
  },
  {
    id: "preparation",
    eyebrow: "Stage 02 — Expert Preparation",
    title: "Crafted by chefs who cook for business",
    text: "Our culinary team prepares every menu with precision, balancing flavor, dietary needs, and presentation.",
    image: IMG.chefPrep,
    accent: "#d9a441",
  },
  {
    id: "plating",
    eyebrow: "Stage 03 — Premium Plating",
    title: "Plated to impress every guest",
    text: "Clean corporate platters, elegant arrangements — food presentation that reflects your company's standards.",
    image: IMG.fineDining,
    accent: "#c96b3c",
  },
  {
    id: "setup",
    eyebrow: "Stage 04 — Corporate Catering Setup",
    title: "Delivered and styled at your venue",
    text: "Conference tables, business lunch buffets, coffee stations — set up on time and presented flawlessly.",
    image: IMG.eventTables,
    accent: "#4f6f52",
  },
];

/* Ingredient chips that converge toward the platter as the story progresses */
const CHIPS = [
  { src: IMG.herbs, from: { x: -260, y: -180 }, size: 90 },
  { src: IMG.fruit, from: { x: 280, y: -150 }, size: 74 },
  { src: IMG.bread, from: { x: -300, y: 140 }, size: 84 },
  { src: IMG.cheeseBoard, from: { x: 300, y: 170 }, size: 70 },
  { src: IMG.veggies, from: { x: 0, y: -260 }, size: 80 },
];

function Chip({
  chip,
  progress,
}: {
  chip: (typeof CHIPS)[number];
  progress: MotionValue<number>;
}) {
  // Converge to center across stages 1→2, fade out during plating
  const x = useTransform(progress, [0, 0.45], [chip.from.x, 0]);
  const y = useTransform(progress, [0, 0.45], [chip.from.y, 0]);
  const scale = useTransform(progress, [0, 0.45, 0.6], [1, 0.5, 0.2]);
  const opacity = useTransform(progress, [0, 0.4, 0.55], [1, 0.9, 0]);
  const rotate = useTransform(progress, [0, 0.45], [0, 180]);

  return (
    <motion.div
      style={{ x, y, scale, opacity, rotate }}
      className="absolute rounded-full overflow-hidden border-4 border-white soft-shadow pointer-events-none"
    >
      <img
        src={chip.src}
        alt=""
        style={{ width: chip.size, height: chip.size }}
        className="object-cover"
        loading="lazy"
      />
    </motion.div>
  );
}

function StagePanel({
  stage,
  index,
  progress,
}: {
  stage: (typeof STAGES)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const n = STAGES.length;
  const start = index / n;
  const end = (index + 1) / n;
  const mid = (start + end) / 2;

  const opacity = useTransform(
    progress,
    index === 0
      ? [start, start + 0.02, end - 0.06, end]
      : index === n - 1
        ? [start, start + 0.06, end - 0.02, end]
        : [start, start + 0.06, end - 0.06, end],
    [index === 0 ? 1 : 0, 1, 1, index === n - 1 ? 1 : 0]
  );
  const imgScale = useTransform(progress, [start, mid, end], [1.12, 1, 1.08]);
  const textY = useTransform(progress, [start, start + 0.08], [44, 0]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex items-center pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <motion.div style={{ y: textY }} className="order-2 lg:order-1">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-[0.18em] px-4 py-2 rounded-full mb-6"
            style={{ background: `${stage.accent}22`, color: stage.accent }}
          >
            {stage.eyebrow}
          </span>
          <h3 className="font-display text-3xl md:text-5xl text-[#263128] leading-[1.12] mb-5">
            {stage.title}
          </h3>
          <p className="text-[#263128]/60 text-lg leading-relaxed max-w-md">{stage.text}</p>
        </motion.div>

        {/* Visual */}
        <div className="order-1 lg:order-2 relative flex items-center justify-center">
          <div
            className="absolute w-[110%] h-[110%] blob opacity-25"
            style={{ background: stage.accent }}
          />
          <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-[2.5rem] overflow-hidden border-8 border-white soft-shadow-lg">
            <motion.img
              src={stage.image}
              alt={stage.title}
              style={{ scale: imgScale }}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          {/* converging ingredient chips only over the first half of the story */}
          {index === 0 && (
            <div className="absolute inset-0 hidden md:flex items-center justify-center">
              {CHIPS.map((chip, i) => (
                <Chip key={i} chip={chip} progress={progress} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ScrollStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const barWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div
      id="story"
      ref={containerRef}
      className="relative bg-[#fff8ed]"
      style={{ height: `${STAGES.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden grain">
        <div className="absolute inset-0 dot-bg opacity-30 pointer-events-none" />

        {/* Header */}
        <div className="absolute top-24 left-0 right-0 text-center z-20 px-6">
          <span className="eyebrow">From Kitchen to Conference Room</span>
        </div>

        {STAGES.map((stage, i) => (
          <StagePanel key={stage.id} stage={stage} index={i} progress={progress} />
        ))}

        {/* Progress bar + stage dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-[min(420px,80vw)]">
          <div className="flex justify-between mb-3">
            {STAGES.map((stage, i) => (
              <StageDot key={stage.id} index={i} progress={progress} accent={stage.accent} />
            ))}
          </div>
          <div className="h-1 rounded-full bg-[#263128]/10 overflow-hidden">
            <motion.div
              style={{ width: barWidth }}
              className="h-full rounded-full bg-gradient-to-r from-[#8faf8b] via-[#d9a441] to-[#c96b3c]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StageDot({
  index,
  progress,
  accent,
}: {
  index: number;
  progress: MotionValue<number>;
  accent: string;
}) {
  const n = STAGES.length;
  const active = useTransform(progress, (v): number =>
    v >= index / n && v < (index + 1) / n ? 1 : 0.35
  );
  const scale = useTransform(active, [0.35, 1], [1, 1.35]);

  return (
    <motion.div
      style={{ opacity: active, scale, background: accent }}
      className="w-2.5 h-2.5 rounded-full"
    />
  );
}
