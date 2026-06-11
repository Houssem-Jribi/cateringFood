"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Magnetic from "@/components/ui/Magnetic";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Corporate Catering", href: "#services" },
  { label: "Menus", href: "#menus" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div
            className={cn(
              "flex items-center justify-between rounded-full px-5 md:px-7 glass-strong transition-all duration-500",
              scrolled ? "soft-shadow py-2.5" : "py-2"
            )}
          >
            {/* Logo */}
            <button
              onClick={() => goTo("#home")}
              className="flex items-center gap-2.5 group"
              aria-label="Platter Catering — home"
            >
              <span className="w-9 h-9 rounded-full bg-[#4f6f52] text-white flex items-center justify-center font-display text-lg leading-none transition-transform duration-300 group-hover:rotate-12">
                P
              </span>
              <span className="font-display text-xl text-[#263128]">
                Platter <span className="italic text-[#c96b3c]">Catering</span>
              </span>
            </button>

            {/* Desktop links */}
            <nav className="hidden xl:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => goTo(link.href)}
                  className="px-3.5 py-2 rounded-full text-[13.5px] font-medium text-[#263128]/65 hover:text-[#263128] hover:bg-[#8faf8b]/15 transition-all duration-300"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Magnetic strength={0.25} className="hidden md:inline-block">
                <button
                  onClick={() => goTo("#booking")}
                  className="btn-primary px-6 py-2.5 rounded-full text-sm"
                >
                  Request Quote
                </button>
              </Magnetic>

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="xl:hidden w-10 h-10 rounded-full bg-white/70 border border-[#263128]/10 flex flex-col items-center justify-center gap-[5px]"
                aria-label="Toggle menu"
              >
                <span
                  className={cn(
                    "w-4.5 h-[2px] bg-[#263128] rounded transition-all duration-300 w-[18px]",
                    mobileOpen && "rotate-45 translate-y-[7px]"
                  )}
                />
                <span
                  className={cn(
                    "w-[18px] h-[2px] bg-[#263128] rounded transition-all duration-300",
                    mobileOpen && "opacity-0"
                  )}
                />
                <span
                  className={cn(
                    "w-[18px] h-[2px] bg-[#263128] rounded transition-all duration-300",
                    mobileOpen && "-rotate-45 -translate-y-[7px]"
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[76px] left-4 right-4 z-40 glass-strong rounded-3xl soft-shadow-lg p-4 xl:hidden"
          >
            <nav className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  onClick={() => goTo(link.href)}
                  className="text-left px-4 py-3 rounded-2xl text-[#263128]/75 font-medium hover:bg-[#8faf8b]/15 transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              <button
                onClick={() => goTo("#booking")}
                className="btn-primary mt-3 px-6 py-3.5 rounded-full text-sm"
              >
                Request Quote →
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
