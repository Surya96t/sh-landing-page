// src/app/page.tsx

import { ContactSection } from "@/components/ContactSection";
import { FeaturesSection } from "@/components/FeatureSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { RoadmapSection } from "@/components/RoadmapSection";
import { UseCasesSection } from "@/components/UseCasesSection";

// You can remove the icons that are no longer used directly on this page


// This data is serializable (plain strings), so it's OK to keep it here.
const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Contact', href: '#contact' }
];

// This data is also serializable, so it's OK.
const roadmapItems = [
  { title: "Supervisor Agent", description: "Top-level orchestrator to manage workflows and route tasks", status: "planning" },
  { title: "FileParserAgent", description: "Handle local file uploads (PDFs, TXT, etc.)", status: "development" },
  { title: "SearchAgent", description: "Search the web for relevant URLs automatically", status: "research" },
  { title: "VectorDBIndexerAgent", description: "Chunk, embed, and store content in vector databases", status: "planning" }
] as const;

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* <Home /> */}
      <Navbar navItems={navItems} />
      <main>
        <HeroSection />
        <UseCasesSection />
        <FeaturesSection />
        <RoadmapSection roadmapItems={roadmapItems} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}