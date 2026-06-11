"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import { PACKAGES } from "@/lib/data";

function scrollToBooking() {
  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
}

export default function MenuSection() {
  const [added, setAdded] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const addToQuote = (name: string) => {
    setAdded((prev) => (prev.includes(name) ? prev : [...prev, name]));
  };

  const onScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.children[0]?.getBoundingClientRect().width || 300;
      const gap = 28; // gap-7 is 28px
      const itemWidth = cardWidth + gap;
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(index);
    }
  };

  const scrollPrev = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = container.children[0]?.getBoundingClientRect().width || 300;
      const gap = 28;
      const targetIndex = Math.max(0, activeIndex - 1);
      container.scrollTo({
        left: targetIndex * (cardWidth + gap),
        behavior: "smooth",
      });
      setActiveIndex(targetIndex);
    }
  };

  const scrollNext = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = container.children[0]?.getBoundingClientRect().width || 300;
      const gap = 28;
      const targetIndex = Math.min(PACKAGES.length - 1, activeIndex + 1);
      container.scrollTo({
        left: targetIndex * (cardWidth + gap),
        behavior: "smooth",
      });
      setActiveIndex(targetIndex);
    }
  };

  const scrollToItem = (index: number) => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = container.children[0]?.getBoundingClientRect().width || 300;
      const gap = 28;
      container.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  return (
    <section id="menus" className="relative section-padding bg-[#fdf3e3] overflow-hidden rounded-t-[3rem]">
      <div className="absolute top-1/4 -right-40 w-[520px] h-[520px] blob bg-[#fbe9d6]/90 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] blob-2 bg-[#dce8da]/60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal>
            <span className="eyebrow">Corporate Menu Packages</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl text-[#263128] mt-6 mb-5">
              Menus built for <span className="accent-text italic">business</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[#263128]/60 text-lg">
              Nine signature packages — each one customizable to your guest count,
              dietary needs, and event schedule.
            </p>
          </Reveal>
        </div>

        <div
          ref={scrollContainerRef}
          onScroll={onScroll}
          className="flex md:grid md:grid-cols-2 xl:grid-cols-3 gap-7 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-none pb-6 md:pb-0"
        >
          {PACKAGES.map((pkg, i) => {
            const isAdded = added.includes(pkg.name);
            return (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.75, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="snap-start shrink-0 w-[85vw] sm:w-[60vw] md:w-auto"
              >
                <TiltCard className="h-full">
                  <div className="group card-surface rounded-[1.75rem] overflow-hidden h-full flex flex-col transition-shadow duration-500 hover:shadow-[0_40px_80px_-24px_rgba(38,49,40,0.28)]">
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#263128]/45 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                        <h3 className="font-display text-2xl text-white drop-shadow">{pkg.name}</h3>
                        <span className="glass rounded-full px-3 py-1 text-[11px] font-semibold text-[#263128] whitespace-nowrap">
                          {pkg.serves}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-xs uppercase tracking-widest text-[#4f6f52] font-semibold mb-2">
                        {pkg.eventType}
                      </p>
                      <p className="text-sm text-[#263128]/60 leading-relaxed flex-1">
                        {pkg.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-4 mb-5">
                        {pkg.dietary.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#8faf8b]/15 text-[#4f6f52] border border-[#8faf8b]/25"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => addToQuote(pkg.name)}
                        className={`w-full py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                          isAdded
                            ? "bg-[#8faf8b]/20 text-[#4f6f52] border border-[#8faf8b]/40"
                            : "btn-primary"
                        }`}
                      >
                        {isAdded ? "✓ Added to Quote" : "Add to Quote"}
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Navigation (Mobile Only) */}
        <div className="flex md:hidden items-center justify-center gap-4 mt-6">
          <button
            onClick={scrollPrev}
            className="w-11 h-11 rounded-full bg-white border border-[#263128]/10 flex items-center justify-center soft-shadow disabled:opacity-40 disabled:pointer-events-none"
            aria-label="Previous menu"
            disabled={activeIndex === 0}
          >
            <svg
              className="w-5 h-5 text-[#263128]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex items-center gap-1.5">
            {PACKAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToItem(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? "w-6 bg-[#c96b3c]" : "w-2 bg-[#263128]/15"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            className="w-11 h-11 rounded-full bg-white border border-[#263128]/10 flex items-center justify-center soft-shadow disabled:opacity-40 disabled:pointer-events-none"
            aria-label="Next menu"
            disabled={activeIndex === PACKAGES.length - 1}
          >
            <svg
              className="w-5 h-5 text-[#263128]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Floating quote tray */}
        <AnimatePresence>
          {added.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 glass-strong rounded-full soft-shadow-lg pl-6 pr-2 py-2 flex items-center gap-4"
            >
              <p className="text-sm text-[#263128]/75">
                <span className="font-semibold text-[#263128]">{added.length}</span>{" "}
                package{added.length > 1 ? "s" : ""} selected
              </p>
              <button
                onClick={scrollToBooking}
                className="btn-primary px-5 py-2.5 rounded-full text-sm"
              >
                Continue to Quote →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
