import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustSignals from "@/components/TrustSignals";
import ProcessTimeline from "@/components/ProcessTimeline";
import MarketTiming from "@/components/MarketTiming";
import CaseStudies from "@/components/CaseStudies";
import ExitDiagnosCTA from "@/components/ExitDiagnosCTA";
import BuyerGuide from "@/components/BuyerGuide";
import WhoWeServe from "@/components/WhoWeServe";
import FAQ from "@/components/FAQ";
import AboutTeam from "@/components/AboutTeam";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";

export default function Home() {
  // Handle hash-based scroll from other pages (e.g. /#process)
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <TrustSignals />
      <ProcessTimeline />
      <MarketTiming />
      <CaseStudies />
      <ExitDiagnosCTA />
      <BuyerGuide />
      <WhoWeServe />
      <FAQ />
      <AboutTeam />
      <Contact />
      <Footer />
      <StickyCTA />
    </div>
  );
}
