import { HeroSection } from "@/components/hero-section"

function HeroSectionDemo() {
  return (
    <HeroSection
      title="VidSync"
      subtitle={{
        regular: "Sync YouTube videos with ",
        gradient: "friends in real-time",
      }}
      description="Transform your ideas into reality with our comprehensive suite of development tools and resources."
      ctaText="Create Room"
      ctaHref="/create-room"
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
  )
}
export { HeroSectionDemo }
