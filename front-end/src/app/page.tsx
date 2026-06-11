import SmoothScroll from "@/components/providers/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import MenuSection from "@/components/sections/MenuSection";
import ScrollStorySection from "@/components/sections/ScrollStorySection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BookingSection from "@/components/sections/BookingSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#fff8ed]">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ScrollStorySection />
        <ServicesSection />
        <MenuSection />
        <HowItWorksSection />
        <StatsSection />
        <WhyUsSection />
        <TestimonialsSection />
        <BookingSection />
        <FAQSection />
        <ContactSection />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
