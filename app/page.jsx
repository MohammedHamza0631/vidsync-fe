"use client";
import Link from "next/link";
import Image from "next/image";
import { HeroSectionDemo } from "@/components/hero-demo";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { useState } from "react";
import { GlowingEffectDemoSecond } from "@/components/glowdemo";

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

  const scrollToFeatures = (e) => {
    e.preventDefault();
    document.getElementById('features').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      
      {/* Hero section */}
      <HeroSectionDemo/>

      {/* Features section */}
      <section id="features" className="py-20">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Features</h2>
            <p className="mt-4 text-lg text-zinc-300">Everything you need for synchronized viewing</p>
          </motion.div>
          <GlowingEffectDemoSecond/>
        </div>
      </section>

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
      <section className="py-24 bg-gradient-to-b from-zinc-950 to-purple-950/40">
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
              {/* <Button
                asChild
                size="lg"
                variant="cushy"
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-6 h-auto font-medium rounded-full"
              >
                <Link href="/create-room" className="flex items-center gap-2">
                  Create Room <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button
                asChild
                size="lg"
                variant="cushy"
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-6 h-auto font-medium rounded-full"
              >
                <Link href="/join-room">
                  Join Room
                </Link>
              </Button> */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                <span className="relative inline-block overflow-hidden rounded-full p-[1.5px] w-full sm:w-auto">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white dark:bg-gray-950 text-xs font-medium backdrop-blur-3xl">
                    <a
                      href="/create-room"
                      className="inline-flex rounded-full text-center group items-center w-full justify-center bg-gradient-to-tr from-zinc-300/20 via-purple-400/30 to-transparent dark:from-zinc-300/5 dark:via-purple-400/20 text-gray-900 dark:text-white border-input border-[1px] hover:bg-gradient-to-tr hover:from-zinc-300/30 hover:via-purple-400/40 hover:to-transparent dark:hover:from-zinc-300/10 dark:hover:via-purple-400/30 transition-all sm:w-auto py-4 px-10"
                    >
                      Create Room
                    </a>
                  </div>
                </span>

                
                  <span className="relative inline-block overflow-hidden rounded-full p-[1px] w-full sm:w-auto">
                    <span
                      className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] opacity-30 bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <div
                      className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white dark:bg-gray-950 text-xs font-medium backdrop-blur-3xl">
                      <a
                        href="/join-room"
                        className="inline-flex w-full rounded-full text-center items-center justify-center bg-transparent text-gray-900 dark:text-white border-input border-[1px] border-purple-400/30 hover:bg-purple-400/10 transition-all sm:w-auto py-4 px-10"
                      >
                        Join Room
                      </a>
                    </div>
                  </span>
                
              </div>
            </div>
            <div className="mt-6">
              <button 
                onClick={scrollToFeatures}
                className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1 mx-auto"
              >
                Learn more about features <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
