import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { WhyThisExists } from "@/components/sections/WhyThisExists";
import { Experience } from "@/components/sections/Experience";
import { Schedule } from "@/components/sections/Schedule";
import { Lineup } from "@/components/sections/Lineup";
import { Tickets } from "@/components/sections/Tickets";
import { SaturdayNight } from "@/components/sections/SaturdayNight";
import { Sponsors } from "@/components/sections/Sponsors";
import { FoundingListForm } from "@/components/sections/FoundingListForm";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <WhyThisExists />
        <Experience />
        <Schedule />
        <Lineup />
        <Tickets />
        <SaturdayNight />
        <Sponsors />
        <FoundingListForm />
      </main>
      <Footer />
    </>
  );
}
