"use client";
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function TubelightNavbar({ className }) {
  const navLinks = [
    {name: "Home", href: "/"},
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "FAQ", href: "#faq" },
    { name: "Create Room", href: "/create-room", isButton: true }
  ];

  const [activeTab, setActiveTab] = useState(navLinks[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  // Handle smooth scrolling for anchor links
  const handleNavClick = (e, item) => {
    setActiveTab(item.name);

    // Only do smooth scroll for hash links
    if (item.href.startsWith('#')) {
      e.preventDefault();
      const targetId = item.href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100, // Offset for the navbar
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div 
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-50 mt-6",
        className
      )}
    >
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 bg-black/30 border border-zinc-800 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg"
      >
        {navLinks.map((item) => {
          const isActive = activeTab === item.name;

          if (item.isButton) {
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className="relative text-sm font-semibold px-6 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
              >
                <span>{item.name}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-zinc-400 hover:text-white",
                isActive && "bg-zinc-800/50 text-white"
              )}>
              <span>{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-indigo-600/10 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}>
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-indigo-600 rounded-t-full">
                    <div
                      className="absolute w-12 h-6 bg-indigo-600/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-indigo-600/20 rounded-full blur-md -top-1" />
                    <div
                      className="absolute w-4 h-4 bg-indigo-600/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}
