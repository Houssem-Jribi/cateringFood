"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const FOOTER_LINKS = {
  "Corporate Catering": [
    { label: "Business Meetings", href: "#services" },
    { label: "Office Lunches", href: "#services" },
    { label: "Conferences", href: "#services" },
    { label: "Product Launches", href: "#services" },
    { label: "Coffee Breaks", href: "#services" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Corporate Menus", href: "#menus" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Testimonials", href: "#testimonials" },
  ],
  Support: [
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
    { label: "Request a Quote", href: "#booking" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const goTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="relative bg-[#2f4632] text-white/85 overflow-hidden rounded-t-[3rem] mt-[-1px]">
      <div className="absolute -top-24 -right-24 w-[420px] h-[420px] blob bg-[#4f6f52]/40 pointer-events-none" />
      <div className="absolute -bottom-32 -left-24 w-[380px] h-[380px] blob-2 bg-[#8faf8b]/15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-full bg-[#fff8ed] flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Platter Catering Logo"
                  className="w-7 h-7 object-contain"
                />
              </div>
              <span className="font-display text-2xl text-white">
                Platter <span className="italic text-[#e8956a]">Catering</span>
              </span>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-7 max-w-sm">
              Platter Catering provides premium corporate catering solutions for
              meetings, conferences, office lunches, and professional business events.
            </p>

            {/* Newsletter */}
            <p className="text-xs uppercase tracking-widest text-[#8faf8b] font-semibold mb-3">
              Corporate Newsletter
            </p>
            {subscribed ? (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-[#a8c8a4]"
              >
                ✓ Subscribed — corporate menus and offers are on the way.
              </motion.p>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="work@company.com"
                  className="flex-1 bg-white/10 border border-white/15 rounded-full px-5 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#e8956a] transition-colors"
                />
                <button
                  onClick={() => email.includes("@") && setSubscribed(true)}
                  className="btn-primary px-5 py-3 rounded-full text-sm shrink-0"
                >
                  Join
                </button>
              </div>
            )}
          </div>

          {/* Link columns */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title}>
                <p className="text-white font-semibold text-sm mb-4">{title}</p>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => goTo(link.href)}
                        className="text-white/50 text-sm hover:text-[#e8956a] transition-colors duration-300"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <p className="text-white font-semibold text-sm mb-4">Contact</p>
            <ul className="space-y-3 text-sm text-white/55">
              <li>
                <a href="mailto:corporate@plattercatering.com" className="hover:text-[#e8956a] transition-colors">
                  corporate@plattercatering.com
                </a>
              </li>
              <li>
                <a href="tel:+18007528837" className="hover:text-[#e8956a] transition-colors">
                  +1 (800) PLATTER
                </a>
              </li>
              <li>Greater New York &amp; Tri-State Area</li>
              <li>Mon – Fri · 8:00am – 6:00pm</li>
            </ul>

            <div className="flex gap-3 mt-6">
              {["in", "X", "ig"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={`Social: ${s}`}
                  className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-xs font-semibold text-white/70 hover:bg-[#c96b3c] hover:border-[#c96b3c] hover:text-white transition-all duration-300"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Platter Catering. All rights reserved.</p>
          <p>Premium B2B corporate catering — companies and business events only.</p>
        </div>
      </div>
    </footer>
  );
}
