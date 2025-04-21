import { HeroSection } from "@/components/hero-section"
import { ChevronDown } from "lucide-react"

function HeroSectionDemo() {
  const scrollToFeatures = (e) => {
    e.preventDefault();
    document.getElementById('features').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <>
      <HeroSection
        title="VidSync"
        subtitle={{
          regular: "Sync YouTube videos with ",
          gradient: "friends in real-time",
        }}
        description="Watch YouTube together with perfect synchronization. No accounts, no downloads, just instant video sharing."
        ctaText="Create Room"
        ctaHref="/create-room"
        secondaryCtaText="Join Room"
        secondaryCtaHref="/join-room"
        bottomImage={{
          light: "https://images.unsplash.com/photo-1714978444538-9097293e5b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bXVsdGlwbGUlMjBwZW9wbGUlMjB3YXRjaGluZyUyMHZpZGVvfGVufDB8fDB8fHww",
          dark: "https://images.unsplash.com/photo-1714978444538-9097293e5b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bXVsdGlwbGUlMjBwZW9wbGUlMjB3YXRjaGluZyUyMHZpZGVvfGVufDB8fDB8fHww",
        }}
        gridOptions={{
          angle: 65,
          opacity: 0.4,
          cellSize: 50,
          lightLineColor: "#4a4a4a",
          darkLineColor: "#2a2a2a",
        }}
      />
      <div className="flex justify-center -mt-10 mb-10 relative z-10">
        <button 
          onClick={scrollToFeatures}
          className="flex items-center gap-1 bg-zinc-900/70 border border-purple-800/30 px-4 py-2 rounded-full text-sm text-purple-300 hover:bg-zinc-800/80 transition-colors"
        >
          See Features <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </>
  )
}
export { HeroSectionDemo }
