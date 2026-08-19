import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { RegistrationGoal } from "@/components/sections/RegistrationGoal";
import { StatsBar } from "@/components/sections/StatsBar";
import { Identity } from "@/components/sections/Identity";
import { WhyThisExists } from "@/components/sections/WhyThisExists";
import { Experience } from "@/components/sections/Experience";
import { Schedule } from "@/components/sections/Schedule";
import { Roadmap } from "@/components/sections/Roadmap";
import { Lineup } from "@/components/sections/Lineup";
import { Tickets } from "@/components/sections/Tickets";
import { Sponsors } from "@/components/sections/Sponsors";
import { FoundingListForm } from "@/components/sections/FoundingListForm";

// The registration count below is live data, not static marketing copy —
// render this page per-request instead of freezing the count at build
// time (which would also require DB access during the build step).
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <RegistrationGoal />
        <StatsBar />
        <Identity />
        <WhyThisExists />
        <Experience />
        <Schedule />
        <Roadmap />
        <Lineup />
        <Tickets />
        <Sponsors />
        <FoundingListForm />
      </main>
      <Footer />
    </>
  );
}
