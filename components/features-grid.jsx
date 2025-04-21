"use client";
import { Zap, Lock, Users, Clock, ArrowRight } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

// Item animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FeaturesGrid() {
  // Combine benefits and steps data
  const gridItems = [
    {
      title: "Instant Synchronization",
      description: "Keep everyone perfectly in sync, no matter where they are.",
      icon: <Zap className="h-5 w-5 text-indigo-400" />,
      area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
    },
    {
      title: "No Logins Required",
      description: "Create or join a room instantly without signing up or logging in.",
      icon: <Lock className="h-5 w-5 text-indigo-400" />,
      area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
    },
    {
      title: "Create a Room",
      description: "Click the 'Create Room' button and paste a YouTube video URL.",
      number: 1,
      area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/2/9]",
      isLarge: true
    },
    {
      title: "Multiple Viewers",
      description: "Watch with as many friends as you want in the same virtual room.",
      icon: <Users className="h-5 w-5 text-indigo-400" />,
      area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/9/2/13]",
    },
    {
      title: "Share with Friends",
      description: "Copy your unique room link and send it to anyone you want to join.",
      number: 2,
      area: "md:[grid-area:3/1/4/7] xl:[grid-area:2/5/3/9]",
      isLarge: true
    },
    {
      title: "Real-Time Experience",
      description: "Play, pause, and seek with instant updates for all participants.",
      icon: <Clock className="h-5 w-5 text-indigo-400" />,
      area: "md:[grid-area:3/7/4/13] xl:[grid-area:2/9/3/13]",
    },
  ];

  return (
    <section id="features" className="py-24 bg-zinc-900" aria-label="Features and how it works">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold">How Vidsync Works</h2>
          <p className="mt-4 text-lg text-zinc-300">
            Enjoy synchronized video watching with these powerful features
          </p>
        </motion.div>
        
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-6 xl:max-h-[36rem] xl:grid-rows-2">
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              area={item.area}
              icon={item.icon}
              number={item.number}
              title={item.title}
              description={item.description}
              isLarge={item.isLarge}
            />
          ))}
        </ul>
        
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
              Get Started <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

const GridItem = ({
  area,
  icon,
  number,
  title,
  description,
  isLarge
}) => {
  return (
    <motion.li 
      variants={itemVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={`min-h-[14rem] list-none ${area} ${isLarge ? 'md:row-span-1' : ''}`}
    >
      <div className="relative h-full rounded-2xl border border-zinc-800 p-1.5 md:rounded-3xl">
        <GlowingEffect
          spread={80}
          blur={0}
          glow={true}
          disabled={false}
          proximity={64}
          variant="default"
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div
          className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl bg-zinc-950/50 p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-indigo-500/30 p-2 bg-black/30">
              {number ? (
                <div className="flex items-center justify-center w-5 h-5 bg-indigo-600 text-white rounded-full font-bold text-sm">
                  {number}
                </div>
              ) : (
                icon
              )}
            </div>
            <div className="space-y-3">
              <h3
                className="pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-white md:text-2xl/[1.875rem]">
                {title}
              </h3>
              <h2
                className="font-sans text-sm/[1.125rem] text-zinc-300 md:text-base/[1.375rem]">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
}; 