import Nav from "@/src/components/Nav";
import Hero from "@/src/components/Hero";
import StatsBar from "@/src/components/StatsBar";
import Capabilities from "@/src/components/Capabilities";
import Portfolio from "@/src/components/Portfolio";
import CtaBand from "@/src/components/CtaBand";
import Process from "@/src/components/Process";
import WhyUs from "@/src/components/WhyUs";
import Packages from "@/src/components/Packages";
import TechStack from "@/src/components/TechStack";
import Testimonials from "@/src/components/Testimonials";
import Faq from "@/src/components/Faq";
import ContactForm from "@/src/components/ContactForm";
import Footer from "@/src/components/Footer";
import StickyCta from "@/src/components/StickyCta";
import ScrollToTop from "@/src/components/ScrollToTop";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative">
        {/* Ambient glow layer — adds subtle colour/depth down the long dark
            page (below the hero, which has its own backdrop). */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute left-[-12%] top-[26%] h-[42rem] w-[42rem] rounded-full bg-violet/10 blur-[150px]" />
          <div className="absolute right-[-12%] top-[52%] h-[38rem] w-[38rem] rounded-full bg-cyan/10 blur-[150px]" />
          <div className="absolute left-[18%] top-[80%] h-[36rem] w-[36rem] rounded-full bg-magenta/[0.07] blur-[150px]" />
        </div>
        <Hero />
        <StatsBar />
        <Capabilities />
        <Portfolio />
        <CtaBand />
        <Process />
        <WhyUs />
        <Packages />
        <TechStack />
        <Testimonials />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
      <StickyCta />
      <ScrollToTop />
    </>
  );
}
