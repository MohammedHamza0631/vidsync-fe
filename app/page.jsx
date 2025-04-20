"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/hero-section-dark";
import { FeaturesGrid } from "@/components/features-grid";

import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { useState } from "react";

// FAQs
const faqs = [
  {
    question: "Do I need to create an account?",
    answer: "No, Vidsync is completely anonymous and requires no login or account creation. Just create a room and share the link with friends."
  },
  {
    question: "How many people can join a room?",
    answer: "There's no hard limit on the number of people who can join a Vidsync room, although performance may vary with extremely large groups."
  },
  {
    question: "Is my room permanent?",
    answer: "No, rooms are ephemeral and exist only as long as they have active users. When everyone leaves a room, it will be deleted."
  },
  {
    question: "Can I use Vidsync on mobile devices?",
    answer: "Yes! Vidsync works on any device with a modern web browser that supports YouTube embeds."
  },
];

// FAQ component
function FAQ({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-zinc-800 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between items-center text-left rounded-md px-2"
        aria-expanded={isOpen}
      >
        <h3 className="font-medium text-white">{question}</h3>
        <ChevronDown className={`h-5 w-5 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-sm text-zinc-400">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      
      {/* Hero section */}
      <HeroSection
        title="YouTube Watch Parties"
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
          light: "https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?auto=format&fit=crop&w=800&q=80",
          dark: "https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?auto=format&fit=crop&w=800&q=80",
        }}
        gridOptions={{
          angle: 65,
          opacity: 0.4,
          cellSize: 50,
          lightLineColor: "#6366F1",
          darkLineColor: "#4F46E5",
        }}
      />

      {/* Features and How It Works combined grid */}
      <FeaturesGrid />

      {/* FAQ section */}
      <section id="faq" className="py-24 bg-zinc-950" aria-label="Frequently asked questions">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-zinc-300">Everything you need to know about Vidsync</p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <FAQ question={faq.question} answer={faq.answer} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA section */}
      <section className="py-24 bg-gradient-to-b from-zinc-950 to-indigo-950">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Ready to watch together?</h2>
            <p className="mt-6 text-xl text-zinc-300">
              Create a room in seconds and start sharing videos with your friends, no signup required.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 h-auto font-medium rounded-lg"
              >
                <Link href="/create-room" className="flex items-center gap-2">
                  Create Room <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-indigo-700/50 bg-indigo-950/50 text-white hover:bg-indigo-900/50 px-8 py-6 h-auto font-medium rounded-lg"
              >
                <Link href="/join-room">
                  Join Room
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
