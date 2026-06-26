import Nav from "@/src/components/Nav";
import Hero from "@/src/components/Hero";
import StatsBar from "@/src/components/StatsBar";
import Portfolio from "@/src/components/Portfolio";
import CtaBand from "@/src/components/CtaBand";
import Process from "@/src/components/Process";
import WhyUs from "@/src/components/WhyUs";
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
      <main>
        <Hero />
        <StatsBar />
        <Portfolio />
        <CtaBand />
        <Process />
        <WhyUs />
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
