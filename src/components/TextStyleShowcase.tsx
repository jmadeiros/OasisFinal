"use client"

import { motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"

export default function TextStyleShowcase() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Using the original Village theme colors
  const themeColors = {
    green: "var(--village-green)", // #4a7c59
    teal: "var(--village-teal)", // #39a0a9
    orange: "var(--village-orange)", // #f26c4f
    cream: "var(--village-cream)", // #f0e9df
    gold: "var(--village-gold)", // #f7b733
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.1,
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  }

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 md:py-32 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #e8e2d9 0%, #ebe6e1 100%)`,
      }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 25px 25px, rgba(74, 124, 89, 0.3) 2px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Large Gradient Heading */}
          <motion.div
            className="space-y-0"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={textVariants}
            custom={0}
          >
            <h2 className="text-7xl md:text-8xl lg:text-9xl font-light leading-none">
              <span className="block bg-gradient-to-r from-[var(--village-green)] via-[var(--village-teal)] to-[var(--village-orange)] text-transparent bg-clip-text">
                Text Style
              </span>
              <span className="block bg-gradient-to-r from-[var(--village-orange)] via-[var(--village-gold)] to-[var(--village-green)] text-transparent bg-clip-text">
                Showcase
              </span>
            </h2>
          </motion.div>

          {/* Subheading */}
          <motion.h3
            className="text-2xl md:text-3xl font-light text-gray-800"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={textVariants}
            custom={1}
          >
            The Village Typography System
          </motion.h3>

          {/* Body Text */}
          <motion.p
            className="text-lg text-gray-700 leading-relaxed font-light"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={textVariants}
            custom={2}
          >
            Create and grow your ideas at The Village, our vibrant community workspace and platform for business in
            Tulse Hill. This paragraph demonstrates the standard body text styling used throughout the site.
          </motion.p>

          {/* Secondary Body Text */}
          <motion.p
            className="text-lg text-gray-700 leading-relaxed font-light"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={textVariants}
            custom={3}
          >
            Offering beautifully designed private studios and flexible workspaces, with access to fully serviced social
            and meeting areas, The Village is home to a neighbourhood café, event spaces, and collaborative zones.
          </motion.p>

          {/* Heading Variations */}
          <div className="space-y-6 pt-8">
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-gray-800 tracking-tight"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={textVariants}
              custom={4}
            >
              Large Section Heading
            </motion.h2>

            <motion.h3
              className="text-3xl font-bold text-gray-800 mb-4"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={textVariants}
              custom={5}
            >
              Medium Section Heading
            </motion.h3>

            <motion.h4
              className="text-xl font-semibold text-gray-800 mb-2"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={textVariants}
              custom={6}
            >
              Small Section Heading
            </motion.h4>
          </div>

          {/* Colored Text Examples */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
            <motion.div
              className="space-y-2"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={textVariants}
              custom={7}
            >
              <h4 className="text-xl font-medium mb-3" style={{ color: themeColors.green }}>
                Green Theme Text
              </h4>
              <p className="text-gray-700">
                This text demonstrates the standard paragraph styling with a green heading, using the Village's primary
                brand color.
              </p>
            </motion.div>

            <motion.div
              className="space-y-2"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={textVariants}
              custom={8}
            >
              <h4 className="text-xl font-medium mb-3" style={{ color: themeColors.teal }}>
                Teal Theme Text
              </h4>
              <p className="text-gray-700">
                This text demonstrates the standard paragraph styling with a teal heading, using one of the Village's
                secondary brand colors.
              </p>
            </motion.div>

            <motion.div
              className="space-y-2"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={textVariants}
              custom={9}
            >
              <h4 className="text-xl font-medium mb-3" style={{ color: themeColors.orange }}>
                Orange Theme Text
              </h4>
              <p className="text-gray-700">
                This text demonstrates the standard paragraph styling with an orange heading, using one of the Village's
                accent brand colors.
              </p>
            </motion.div>

            <motion.div
              className="space-y-2"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={textVariants}
              custom={10}
            >
              <h4 className="text-xl font-medium mb-3" style={{ color: themeColors.gold }}>
                Gold Theme Text
              </h4>
              <p className="text-gray-700">
                This text demonstrates the standard paragraph styling with a gold heading, using one of the Village's
                accent brand colors.
              </p>
            </motion.div>
          </div>

          {/* Button Styling */}
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={textVariants}
            custom={11}
            className="pt-8"
          >
            <button className="flex items-center gap-2 px-6 py-3 rounded-md text-white transition-all duration-300 bg-[var(--village-green)] hover:bg-[var(--village-green)]/90 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
              <span className="font-medium">Primary Button Style</span>
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
