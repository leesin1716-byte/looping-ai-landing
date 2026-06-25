import Nav from "@/src/components/Nav";
import Hero from "@/src/components/Hero";
import StatsBar from "@/src/components/StatsBar";
import Services from "@/src/components/Services";
import Portfolio from "@/src/components/Portfolio";
import CtaBand from "@/src/components/CtaBand";
import Process from "@/src/components/Process";
import WhyUs from "@/src/components/WhyUs";
import Testimonials from "@/src/components/Testimonials";
import Faq from "@/src/components/Faq";
import ContactForm from "@/src/components/ContactForm";
import Footer from "@/src/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <Services />
        <Portfolio />
        <CtaBand />
        <Process />
        <WhyUs />
        <Testimonials />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
