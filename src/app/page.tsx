import { Header } from "@/components/Header";
import { Apply } from "@/components/sections/Apply";
import { EcosystemProof } from "@/components/sections/EcosystemProof";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { Mentors } from "@/components/sections/Mentors";
import { Network } from "@/components/sections/Network";
import { Portfolio } from "@/components/sections/Portfolio";
import { StageSelector } from "@/components/sections/StageSelector";
import { StartupClock } from "@/components/sections/StartupClock";
import { Vision } from "@/components/sections/Vision";

/**
 * TALK → UNDERSTAND → EXPLORE → MEET → BELIEVE → APPLY
 * Section order follows the experience formula. Content lives in src/content.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        {/* TALK */}
        <Hero />
        <LogoMarquee label="Our technology support" kind="Technology partner" />
        {/* UNDERSTAND */}
        <StartupClock />
        <LogoMarquee label="Our startups come from" kind="University" tone="paper-2" />
        <StageSelector />
        <LogoMarquee label="Our investment network" kind="Investor network" tone="paper-2" />
        {/* EXPLORE / MEET */}
        <EcosystemProof />
        <Network />
        {/* BELIEVE */}
        <Portfolio />
        <Mentors />
        <Vision />
        {/* APPLY */}
        <Apply />
      </main>
      <Footer />
    </>
  );
}
