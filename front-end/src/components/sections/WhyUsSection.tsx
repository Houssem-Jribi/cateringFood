"use client";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import { WHY_US } from "@/lib/data";
import { IMG } from "@/lib/images";

export default function WhyUsSection() {
  return (
    <section id="why-us" className="relative section-padding bg-[#fdf3e3] overflow-hidden rounded-t-[3rem]">
      <div className="absolute -top-24 right-1/4 w-[400px] h-[400px] blob bg-[#fbe9d6] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal>
            <span className="eyebrow">Why Companies Choose Us</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl text-[#263128] mt-6 mb-5">
              The catering partner your{" "}
              <span className="accent-text italic">office can rely on</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_US.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group card-surface rounded-3xl p-6 hover:-translate-y-2 hover:shadow-[0_28px_56px_-20px_rgba(38,49,40,0.22)] transition-all duration-500"
            >
              <span className="inline-flex w-12 h-12 rounded-2xl bg-[#8faf8b]/15 items-center justify-center text-2xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-400">
                {item.icon}
              </span>
              <h3 className="font-semibold text-[#263128] mb-1.5">{item.title}</h3>
              <p className="text-sm text-[#263128]/55 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA banner */}
        <Reveal delay={0.1} className="mt-16">
          <div className="relative overflow-hidden rounded-[2.5rem] soft-shadow-lg">
            <img
              src={IMG.eventTables}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2f4632]/92 via-[#2f4632]/80 to-[#2f4632]/40" />
            <div className="relative px-8 md:px-14 py-14 md:py-16 max-w-2xl">
              <h3 className="font-display text-3xl md:text-4xl text-white mb-4">
                Ready to upgrade your company&apos;s catering?
              </h3>
              <p className="text-white/70 mb-8 leading-relaxed">
                Join 500+ companies that trust Platter Catering for their meetings,
                conferences, and office lunches.
              </p>
              <Magnetic>
                <button
                  onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                  className="btn-primary px-8 py-4 rounded-full"
                >
                  Request a Corporate Quote →
                </button>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
