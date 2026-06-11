"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/data";

function scrollToBooking() {
  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
}

export default function ServicesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.children[0]?.getBoundingClientRect().width || 280;
      const gap = 20; // gap-5 is 20px
      const itemWidth = cardWidth + gap;
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(index);
    }
  };

  const scrollPrev = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = container.children[0]?.getBoundingClientRect().width || 280;
      const gap = 20;
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
      const cardWidth = container.children[0]?.getBoundingClientRect().width || 280;
      const gap = 20;
      const targetIndex = Math.min(SERVICES.length - 1, activeIndex + 1);
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
      const cardWidth = container.children[0]?.getBoundingClientRect().width || 280;
      const gap = 20;
      container.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  return (
    <section id="services" className="relative section-padding bg-[#fff8ed] overflow-hidden">
      <div className="absolute -top-20 -left-32 w-[460px] h-[460px] blob-2 bg-[#f4e6d0]/80 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[380px] h-[380px] blob bg-[#dce8da]/50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal>
            <span className="eyebrow">Our Only Service — Done Perfectly</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl text-[#263128] mt-6 mb-5">
              Corporate Events <span className="accent-text italic">Catering</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[#263128]/60 text-lg">
              One specialty, ten ways to serve your company. Every corporate
              occasion, catered with precision.
            </p>
          </Reveal>
        </div>

        <div
          ref={scrollContainerRef}
          onScroll={onScroll}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-none pb-6 md:pb-0"
        >
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 5) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group card-surface rounded-3xl overflow-hidden flex flex-col hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_32px_64px_-20px_rgba(38,49,40,0.25)] snap-start shrink-0 w-[85vw] sm:w-[50vw] md:w-auto"
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                <span className="absolute bottom-3 left-3 w-9 h-9 rounded-full glass-strong flex items-center justify-center text-lg">
                  {service.icon}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-[#263128] mb-2">{service.title}</h3>
                <p className="text-sm text-[#263128]/55 leading-relaxed flex-1">
                  {service.description}
                </p>
                <button
                  onClick={scrollToBooking}
                  className="mt-4 text-sm font-semibold text-[#c96b3c] flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300"
                >
                  Request Quote <span aria-hidden>→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel Navigation (Mobile Only) */}
        <div className="flex md:hidden items-center justify-center gap-4 mt-6">
          <button
            onClick={scrollPrev}
            className="w-11 h-11 rounded-full bg-white border border-[#263128]/10 flex items-center justify-center soft-shadow disabled:opacity-40 disabled:pointer-events-none"
            aria-label="Previous service"
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
            {SERVICES.map((_, idx) => (
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
            aria-label="Next service"
            disabled={activeIndex === SERVICES.length - 1}
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
      </div>
    </section>
  );
}
