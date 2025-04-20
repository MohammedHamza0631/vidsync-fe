"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/hero-section-dark";

import { ArrowRight, Play, Users, Clock, Zap, Lock, Plus, ChevronDown } from "lucide-react";
import { useState } from "react";

// Container animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

// Item animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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

// Benefits data
const benefits = [
  {
    title: "Instant Synchronization",
    description: "Keep everyone perfectly in sync, no matter where they are.",
    icon: <Zap className="h-6 w-6 text-indigo-500" />,
  },
  {
    title: "No Logins Required",
    description: "Create or join a room instantly without signing up or logging in.",
    icon: <Lock className="h-6 w-6 text-indigo-500" />,
  },
  {
    title: "Multiple Viewers",
    description: "Watch with as many friends as you want in the same virtual room.",
    icon: <Users className="h-6 w-6 text-indigo-500" />,
  },
  {
    title: "Real-Time Experience",
    description: "Play, pause, and seek with instant updates for all participants.",
    icon: <Clock className="h-6 w-6 text-indigo-500" />,
  },
];

// How it works steps
const steps = [
  {
    title: "Create a Room",
    description: "Click the 'Create Room' button and paste a YouTube video URL.",
    number: 1,
  },
  {
    title: "Share with Friends",
    description: "Copy your unique room link and send it to anyone you want to join.",
    number: 2,
  },
  {
    title: "Watch Together",
    description: "Everyone will see the same video, synchronized in real-time.",
    number: 3,
  },
];

// FAQ component
function FAQ({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-zinc-800 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between items-center text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md px-2"
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

      {/* Benefits section */}
      <section id="features" className="py-24 bg-zinc-900" aria-label="Features and benefits">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Everything you need for the perfect watch party</h2>
            <p className="mt-4 text-lg text-zinc-400">
              Vidsync makes it simple to enjoy videos together, no matter where your friends are located.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-zinc-800/50 p-6 rounded-lg border border-zinc-700 hover:border-indigo-500/50 transition-colors"
              >
                <div className="bg-zinc-800 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-zinc-400">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works section */}
      <section id="how-it-works" className="py-24 bg-zinc-950" aria-label="How it works">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Simple as 1-2-3</h2>
            <p className="mt-4 text-lg text-zinc-400">Get started in seconds with these three simple steps</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-zinc-900/50 p-8 rounded-lg border border-zinc-800 relative"
              >
                <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg absolute -top-5 left-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2 mt-4">{step.title}</h3>
                <p className="text-zinc-400">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 h-auto font-medium rounded-lg"
            >
              <Link href="/create-room" className="flex items-center gap-2">
                <Plus className="h-5 w-5" /> Create Your Room Now
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FAQ section */}
      <section id="faq" className="py-24 bg-zinc-900" aria-label="Frequently asked questions">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-zinc-400">Everything you need to know about Vidsync</p>
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
