"use client"

import { motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { Users, Coffee, Calendar, Heart, Sparkles } from "lucide-react"
import FlippableCard from "./FlippableCard"
// Add the import for our new hook at the top with the other imports
import { useMacOS } from "../hooks/useMacOS"

export default function BuiltForCommunity() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null)
  const hasAnimatedRef = useRef(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftScroll, setShowLeftScroll] = useState(false)
  const [showRightScroll, setShowRightScroll] = useState(true)
  const [activeDot, setActiveDot] = useState(0)

  // Inside the component, add the hook call after the other state declarations
  const isMac = useMacOS()

  // Using the original Village theme colors
  const themeColors = {
    green: "var(--village-green)", // #4a7c59
    teal: "var(--village-teal)", // #39a0a9
    orange: "var(--village-orange)", // #f26c4f
    cream: "var(--village-cream)", // #f0e9df
    gold: "var(--village-gold)", // #f7b733
  }

  // Updated gallery of images with proper paths to existing images
  const galleryImages = [
    "/images/coworking-green-chairs.png",
    "/images/coworking-pink-sofa.png",
    "/images/event-space-arched.png",
    "/images/wooden-hall.png",
  ]

  // Update the card content for the flippable cards to show amenities and perks
  const cardContents = [
    {
      title: "Our Vision",
      description:
        "We believe every child deserves the chance to thrive — especially those who feel lost, left out, or let down by mainstream education.",
      iconColor: themeColors.teal,
      iconType: "user" as const,
      gradientFrom: "#fae7b3", // Light gold
      gradientTo: "#fac4b6", // Light orange
      gradientDirection: "135deg",
    },
    {
      title: "Kitchen & Refreshments",
      description:
        "Free tea, coffee and filtered water. Fully-equipped kitchen with fridge and microwave. Weekly community lunches.",
      iconColor: themeColors.orange,
      iconType: "coffee" as const,
      gradientFrom: "#fac4b6", // Light orange
      gradientTo: "#b8e4e7", // Light teal
      gradientDirection: "135deg",
    },
    {
      title: "Meeting Spaces",
      description:
        "Access to bookable meeting rooms with AV equipment, whiteboards, and video conferencing. Perfect for client meetings or team collaborations.",
      iconColor: themeColors.green,
      iconType: "calendar" as const,
      gradientFrom: "#b8e4e7", // Light teal
      gradientTo: "#c5dbc9", // Light green
      gradientDirection: "135deg",
    },
    {
      title: "Community Perks",
      description:
        "Regular networking events, professional development workshops, and wellness activities. Join our vibrant community of professionals.",
      iconColor: themeColors.gold,
      iconType: "location" as const,
      gradientFrom: "#c5dbc9", // Light green
      gradientTo: "#fae7b3", // Light gold
      gradientDirection: "135deg",
    },
  ]

  // Handle card flip
  const handleCardFlip = (index: number, isFlipped: boolean) => {
    if (isFlipped) {
      setActiveCardIndex(index)
    } else if (activeCardIndex === index) {
      setActiveCardIndex(null)
    }
  }

  // Manual flip animation for the main card
  useEffect(() => {
    if (isVisible && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true

      // Wait for all animations to complete
      const timer1 = setTimeout(() => {
        // Flip the main card
        setActiveCardIndex(0)

        // Flip it back after 1 second (reduced from 2 seconds)
        const timer2 = setTimeout(() => {
          setActiveCardIndex(null)
        }, 1000)

        return () => clearTimeout(timer2)
      }, 4000)

      return () => clearTimeout(timer1)
    }
  }, [isVisible])

  // First, update the menuItems to remove gradients and simplify
  const menuItems = [
    {
      icon: <Users className="h-5 w-5" />,
      label: "Community",
      sectionId: "community-section",
      color: themeColors.teal,
    },
    {
      icon: <Coffee className="h-5 w-5" />,
      label: "About Us",
      sectionId: "about-section",
      color: themeColors.orange,
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Our History",
      sectionId: "history-section",
      color: themeColors.gold,
    },
  ]

  // Replace the button variants with more subtle link variants
  const linkVariants = {
    initial: {
      opacity: 0.8,
      x: 0,
    },
    hover: {
      opacity: 1,
      x: 8,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }

  // Animation variants for the menu buttons
  const buttonVariants = {
    initial: {
      opacity: 0.9,
      scale: 1,
    },
    hover: {
      opacity: 1,
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  }

  // Scroll indicator animation
  const scrollIndicatorVariants = {
    initial: { y: 0, opacity: 0.6 },
    animate: {
      y: [0, 10, 0],
      opacity: [0.6, 1, 0.6],
      transition: {
        y: {
          repeat: Number.POSITIVE_INFINITY,
          duration: 1.5,
          ease: "easeInOut",
        },
        opacity: {
          repeat: Number.POSITIVE_INFINITY,
          duration: 1.5,
          ease: "easeInOut",
        },
      },
    },
  }

  // Navigation functions
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
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

  // Handle horizontal scroll for mobile
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
        setShowLeftScroll(scrollLeft > 20)
        setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 20)

        // Calculate which dot should be active based on scroll position
        const scrollPercentage = scrollLeft / (scrollWidth - clientWidth)
        const dotIndex = Math.round(scrollPercentage * 2) // 2 because we have 3 dots (0, 1, 2)
        setActiveDot(dotIndex)
      }
    }

    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll)
      // Initial check
      handleScroll()
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

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

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotate: i % 2 === 0 ? 2 : -2, // Subtle rotation for professional look
      transition: {
        delay: 0.15 * i,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  }

  // Subtle animation for decorative elements
  const decorativeVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 0.7,
      scale: 1,
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  }

  // Animation for the handwritten arrow
  const arrowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 1.5,
        duration: 0.8,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    },
  }

  // Base z-indices for each card position
  const baseZIndices = [20, 10, 30, 20]

  return (
    <>
      {/* Full page background with organic shapes */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        <svg viewBox="0 0 1000 1000" className="absolute w-[100vw] h-full opacity-10" preserveAspectRatio="none">
          <path
            d="M0,500 C150,400 350,300 500,500 C650,700 850,600 1000,500 L1000,1000 L0,1000 Z"
            fill="url(#grad1)"
          ></path>
          <path
            d="M0,600 C200,500 400,700 600,600 C800,500 900,400 1000,600 L1000,1000 L0,1000 Z"
            fill="url(#grad2)"
            opacity="0.7"
          ></path>
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={themeColors.green} />
              <stop offset="100%" stopColor={themeColors.teal} />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={themeColors.orange} />
              <stop offset="100%" stopColor={themeColors.gold} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating circles for the entire page */}
      <motion.div
        className="fixed top-[15%] right-[10%] w-16 h-16 rounded-full bg-[var(--village-gold)]/20 z-0 pointer-events-none"
        animate={{
          y: [0, -15, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="fixed bottom-[20%] left-[15%] w-24 h-24 rounded-full bg-[var(--village-green)]/20 z-0 pointer-events-none"
        animate={{
          y: [0, 20, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="fixed top-[40%] left-[25%] w-20 h-20 rounded-full bg-[var(--village-teal)]/15 z-0 pointer-events-none"
        animate={{
          y: [0, 15, 0],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="fixed bottom-[35%] right-[20%] w-32 h-32 rounded-full bg-[var(--village-orange)]/10 z-0 pointer-events-none"
        animate={{
          y: [0, -10, 0],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      <div className="w-full bg-[#f8f5f0] relative overflow-hidden" style={{ zIndex: 1 }}>
        {/* Modify the main section element to apply conditional styling based on OS */}
        <section
          ref={sectionRef}
          className={`w-full ${isMac ? "pt-16 pb-8 md:pt-24 md:pb-6" : "pt-24 pb-12 md:pt-32 md:pb-8"}`}
          id="built-for-community"
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-start">
              {/* Left side - Professional scattered image collage */}
              <div className="relative lg:col-span-5">
                {/* Updated container dimensions for mobile */}
                <div className="relative h-[500px] md:h-[700px] max-w-[600px] mx-auto">
                  {/* "Click to Flip" text */}
                  {/* Find the div that contains the "Click to Flip" text and arrow
                  // Change this:
                  <div className="absolute top-[-140px] sm:top-[-80px] left-[-30px] sm:left-[-60px] z-50 scale-75 sm:scale-100">

                  // To this (moving it a bit lower on mobile only): */}
                  <div className="absolute top-[-110px] sm:top-[-80px] left-[-30px] sm:left-[-60px] z-50 scale-75 sm:scale-100">
                    {/* "Click to Flip" text */}
                    <motion.div
                      className="transform rotate-[-5deg]"
                      initial="hidden"
                      animate={isVisible ? "visible" : "hidden"}
                      whileHover="hover"
                      variants={arrowVariants}
                    >
                      <div className="relative">
                        <svg
                          width="100"
                          height="100"
                          viewBox="0 0 100 100"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <text
                            x="20"
                            y="30"
                            className="handwriting"
                            style={{
                              fontSize: "24px",
                              fill: themeColors.orange,
                              fontFamily: "cursive",
                              fontWeight: "bold",
                            }}
                          >
                            click
                          </text>
                          <text
                            x="30"
                            y="55"
                            className="handwriting"
                            style={{
                              fontSize: "24px",
                              fill: themeColors.orange,
                              fontFamily: "cursive",
                              fontWeight: "bold",
                            }}
                          >
                            to
                          </text>
                          <text
                            x="20"
                            y="80"
                            className="handwriting"
                            style={{
                              fontSize: "24px",
                              fill: themeColors.orange,
                              fontFamily: "cursive",
                              fontWeight: "bold",
                            }}
                          >
                            flip!
                          </text>
                        </svg>
                      </div>
                    </motion.div>

                    {/* Curved arrow pointing down and right */}
                    <motion.div
                      className="mt-0 ml-16"
                      initial="hidden"
                      animate={isVisible ? "visible" : "hidden"}
                      whileHover="hover"
                      variants={arrowVariants}
                    >
                      <svg
                        width="120"
                        height="100"
                        viewBox="0 0 120 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 10 C30 10, 60 10, 80 30 C90 40, 90 50, 90 70 M90 70 L80 55 M90 70 L100 55"
                          stroke={themeColors.orange}
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Main image - center with subtle border - Updated for mobile */}
                  <motion.div
                    className="absolute top-[5%] md:top-[10%] left-[5%] w-[80%] md:w-[70%] h-[45%] md:h-[50%]"
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    variants={imageVariants}
                    custom={0}
                    style={{
                      zIndex: activeCardIndex === 0 ? 100 : baseZIndices[0],
                    }}
                  >
                    <FlippableCard
                      frontImage={galleryImages[0] || "/placeholder.svg"}
                      altText="The Village workspace"
                      title={cardContents[0].title}
                      description={cardContents[0].description}
                      iconColor={themeColors.teal}
                      iconType={cardContents[0].iconType}
                      gradientFrom={cardContents[0].gradientFrom}
                      gradientTo={cardContents[0].gradientTo}
                      gradientDirection={cardContents[0].gradientDirection}
                      onFlip={(isFlipped) => handleCardFlip(0, isFlipped)}
                      isFlipped={activeCardIndex === 0}
                    />
                  </motion.div>

                  {/* Second image - top right - Updated for mobile */}
                  <motion.div
                    className="absolute top-[0%] right-[-5%] w-[60%] md:w-[50%] h-[35%] md:h-[40%]"
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    variants={imageVariants}
                    custom={1}
                    style={{
                      zIndex: activeCardIndex === 1 ? 100 : baseZIndices[1],
                    }}
                  >
                    <FlippableCard
                      frontImage={galleryImages[1] || "/placeholder.svg"}
                      altText="The Village workspace"
                      title={cardContents[1].title}
                      description={cardContents[1].description}
                      iconColor={themeColors.orange}
                      iconType={cardContents[1].iconType}
                      gradientFrom={cardContents[1].gradientFrom}
                      gradientTo={cardContents[1].gradientTo}
                      gradientDirection={cardContents[1].gradientDirection}
                      onFlip={(isFlipped) => handleCardFlip(1, isFlipped)}
                      isFlipped={activeCardIndex === 1}
                    />
                  </motion.div>

                  {/* Third image - bottom left - Updated for mobile */}
                  <motion.div
                    className="absolute bottom-[20%] md:bottom-[15%] left-[-5%] w-[65%] md:w-[55%] h-[35%] md:h-[40%]"
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    variants={imageVariants}
                    custom={2}
                    style={{
                      zIndex: activeCardIndex === 2 ? 100 : baseZIndices[2],
                    }}
                  >
                    <FlippableCard
                      frontImage={galleryImages[2] || "/placeholder.svg"}
                      altText="The Village workspace"
                      title={cardContents[2].title}
                      description={cardContents[2].description}
                      iconColor={themeColors.green}
                      iconType={cardContents[2].iconType}
                      gradientFrom={cardContents[2].gradientFrom}
                      gradientTo={cardContents[2].gradientTo}
                      gradientDirection={cardContents[2].gradientDirection}
                      onFlip={(isFlipped) => handleCardFlip(2, isFlipped)}
                      isFlipped={activeCardIndex === 2}
                    />
                  </motion.div>

                  {/* Fourth image - bottom right - Updated for mobile */}
                  <motion.div
                    className="absolute bottom-[5%] right-[-5%] w-[60%] md:w-[50%] h-[40%] md:h-[45%]"
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    variants={imageVariants}
                    custom={3}
                    style={{
                      zIndex: activeCardIndex === 3 ? 100 : baseZIndices[3],
                    }}
                  >
                    <FlippableCard
                      frontImage={galleryImages[3] || "/placeholder.svg"}
                      altText="The Village workspace"
                      title={cardContents[3].title}
                      description={cardContents[3].description}
                      iconColor={themeColors.gold}
                      iconType={cardContents[3].iconType}
                      gradientFrom={cardContents[3].gradientFrom}
                      gradientTo={cardContents[3].gradientTo}
                      gradientDirection={cardContents[3].gradientDirection}
                      onFlip={(isFlipped) => handleCardFlip(3, isFlipped)}
                      isFlipped={activeCardIndex === 3}
                    />
                  </motion.div>

                  {/* Subtle connecting lines */}
                  <svg
                    className="absolute inset-0 w-full h-full z-0"
                    viewBox="0 0 500 600"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path
                      d="M150,150 C200,100 300,200 350,100"
                      stroke={`${themeColors.green}80`}
                      strokeWidth="1.5"
                      strokeDasharray="4,4"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: isVisible ? 1 : 0 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                    <motion.path
                      d="M150,300 C200,350 300,250 350,400"
                      stroke={`${themeColors.teal}80`}
                      strokeWidth="1.5"
                      strokeDasharray="4,4"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: isVisible ? 1 : 0 }}
                      transition={{ duration: 1.5, delay: 0.7 }}
                    />
                    <motion.path
                      d="M250,150 C250,250 250,350 250,450"
                      stroke={`${themeColors.orange}80`}
                      strokeWidth="1.5"
                      strokeDasharray="4,4"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: isVisible ? 1 : 0 }}
                      transition={{ duration: 1.5, delay: 0.9 }}
                    />
                  </svg>
                </div>
              </div>

              {/* Right side - Text Content with theme colors */}
              <div className="space-y-6 lg:col-span-7">
                {/* Oasis logo positioned near the title */}

                <motion.div
                  className="space-y-0 relative"
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={textVariants}
                  custom={0}
                >
                  {/* Modify the title heading */}
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight">
                    <span
                      className="block text-transparent bg-clip-text pb-2"
                      style={{
                        background: "linear-gradient(to right, #f7b733, #f26c4f)",
                        WebkitBackgroundClip: "text",
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Built for
                    </span>
                    <span
                      className="block text-transparent bg-clip-text pb-2"
                      style={{
                        background: "linear-gradient(to right, #f26c4f, #39a0a9, #4a7c59)",
                        WebkitBackgroundClip: "text",
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Community
                    </span>
                  </h2>

                  {/* Oasis logo positioned at the end of "Community" as a tag */}
                  <motion.div
                    className="absolute w-24 h-24 z-40"
                    initial={{ opacity: 0, scale: 0, rotate: 0 }}
                    animate={{
                      opacity: isVisible ? 1 : 0,
                      scale: isVisible ? 1 : 0,
                      rotate: isVisible ? 45 : 0,
                    }}
                    transition={{ delay: 1, duration: 1 }}
                    style={{
                      transformOrigin: "top left",
                      right: "-60px",
                      top: "100px",
                    }}
                  >
                    <div className="w-full h-full"></div>
                  </motion.div>
                </motion.div>

                {/* Modify the paragraph text */}
                <p className={`${isMac ? "text-2xl" : "text-3xl"} text-gray-700 font-light max-w-3xl mt-6`}>
                  A Place to Belong, Grow, and Make a Difference
                </p>

                {/* Desktop version - original text */}
                <div className="hidden md:block text-lg text-gray-700 font-light max-w-3xl mt-6 space-y-4">
                  <p>
                    Oasis St Martin's Village carries forward a powerful legacy. In 1699, Thomas Tenison founded a
                    school for girls — a radical act in a time when few believed in their education. That same
                    pioneering spirit lives on in The Village today: a space where everyone is welcome to thrive, learn,
                    and contribute to the greater good.
                  </p>

                  <p>
                    At its heart, The Village exists to support children who are struggling in mainstream education —
                    offering the support, opportunity, and belief they need to thrive. Rooted in the values of the Oasis
                    charity, we believe it takes more than a classroom to raise a child — it takes a village. That same
                    belief guides how we support people and enterprise, challenge injustice, and build a stronger, more
                    inclusive community.
                  </p>

                  <p>
                    To strengthen this mission, The Village also serves as a vibrant community workspace — offering
                    beautifully designed co-working areas, private studios, and shared social spaces. This platform for
                    local people and businesses not only fosters creativity, connection, and collaboration, but also
                    sustains and enriches the wider ecosystem that supports young people.
                  </p>

                  <p>
                    By combining education, community development, and co-working under one roof, The Village offers a
                    unique environment where purpose-driven work and meaningful relationships grow side by side — for
                    the good of each other, and the good of all.
                  </p>
                </div>

                {/* Mobile version - shorter text with matched styling */}
                <div className="md:hidden text-lg text-gray-700 font-light max-w-3xl mt-6 space-y-4">
                  <p>
                    Founded on a legacy of inclusion dating back to 1699, The Village creates a space where everyone can
                    thrive and contribute. Our history began with Thomas Tenison's radical act of founding a school for
                    girls.
                  </p>

                  <p>
                    We support children struggling in mainstream education while building a community that fosters
                    growth. Rooted in Oasis values, we believe it takes more than a classroom to raise a child—it takes
                    a village.
                  </p>

                  <p>
                    Our vibrant workspace brings together education, community, and co-working—creating an ecosystem
                    where purpose and relationships flourish. We offer beautifully designed spaces that foster
                    creativity and connection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* "Our Community Space" section - directly following the previous content */}
        <div className="container mx-auto px-6 md:px-12 pb-20 mt-16">
          {/* Header with fluid design */}
          <div className="mb-20 relative">
            <motion.div
              className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-[var(--village-orange)]/10 z-0"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />

            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-[var(--village-orange)] font-light mb-4 max-w-3xl">Our Community Space</div>
              <h2 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
                <span
                  className="block text-transparent bg-clip-text pb-2"
                  style={{
                    background: "linear-gradient(to right, #f7b733, #f26c4f)",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  Creating a Better
                </span>
                <span
                  className="block text-transparent bg-clip-text pb-2"
                  style={{
                    background: "linear-gradient(to right, #f26c4f, #39a0a9, #4a7c59)",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  Community for All
                </span>
              </h2>

              <p className="text-2xl text-gray-700 font-light max-w-3xl mt-6">
                What happens when education grows beyond four walls into the heart of the village?
              </p>

              <p className="text-lg text-gray-700 font-light max-w-3xl mt-6">
                While many community support systems across the UK are struggling, we're seeing emerging solutions for
                those who need them most. Young people—especially those with special educational needs, mental health
                challenges, or from disadvantaged backgrounds—deserve better support than they've been receiving.
                <br />
                <br />
                Against this backdrop, a powerful alternative is emerging.
              </p>
            </motion.div>
          </div>

          {/* Mobile Horizontal Scrollable Layout (hidden on desktop) */}
          <div className="md:hidden mt-8 mb-16">
            <div className="relative">
              {/* Horizontal scrollable container */}
              <div
                ref={scrollContainerRef}
                className="overflow-x-auto pb-10 flex snap-x snap-mandatory"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {/* Vision Section - Mobile */}
                <div className="snap-center w-[90vw] flex-shrink-0 px-3">
                  <motion.div
                    className="relative overflow-visible h-full"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    {/* Organic background shapes */}
                    <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[var(--village-teal)]/5 z-0 transform rotate-12"></div>
                    <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-[var(--village-teal)]/10 z-0 transform -rotate-12"></div>

                    <div className="relative z-10 p-6 h-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-white/80 rounded-[30px] -z-10"></div>

                      <div className="flex items-center mb-4">
                        <div className="bg-[var(--village-teal)]/10 p-3 rounded-full mr-4">
                          <Users className="h-5 w-5 text-[var(--village-teal)]" />
                        </div>
                        <h3 className="text-xl font-medium text-[var(--village-teal)]">Our Vision</h3>
                      </div>

                      <div>
                        <p className="text-base text-gray-700 leading-relaxed font-light mb-3">
                          We believe every child deserves the chance to thrive — especially those who feel lost, left
                          out, or let down by mainstream education. But we also know that thriving children can only
                          come from thriving communities.
                        </p>

                        <p className="text-base text-gray-700 leading-relaxed font-light mb-3">
                          <span className="text-[var(--village-teal)] font-medium">Our vision</span> is to build a
                          village that nurtures possibility — a place where hope and direction are part of everyday
                          life.
                        </p>

                        <p className="text-base text-gray-700 leading-relaxed font-light">
                          We create spaces where everyone belongs and can contribute their unique gifts to the
                          community.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Mission Section - Mobile */}
                <div className="snap-center w-[90vw] flex-shrink-0 px-3">
                  <motion.div
                    className="relative overflow-visible h-full"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                  >
                    {/* Organic background shapes */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[var(--village-orange)]/5 z-0 transform -rotate-12"></div>
                    <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-[var(--village-orange)]/10 z-0 transform rotate-12"></div>

                    <div className="relative z-10 p-6 h-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-white/80 rounded-[30px] -z-10"></div>

                      <div className="flex items-center mb-4">
                        <div className="bg-[var(--village-orange)]/10 p-3 rounded-full mr-4">
                          <Heart className="h-5 w-5 text-[var(--village-orange)]" />
                        </div>
                        <h3 className="text-xl font-medium text-[var(--village-orange)]">Our Mission</h3>
                      </div>

                      <div>
                        <p className="text-base text-gray-700 leading-relaxed font-light mb-3">
                          Oasis St Martin's Village builds on a powerful legacy. In 1699, a school for girls was founded
                          by Thomas Tenison — a radical act in a time when few believed in educating girls. Today, we
                          carry that same spirit forward.
                        </p>

                        <p className="text-base text-gray-700 leading-relaxed font-light mb-3">
                          <span className="text-[var(--village-orange)] font-medium">We exist</span> to take on the
                          challenges too many young people face: exclusion, absence, unmet special needs, and mental
                          health struggles. Our mission is to provide support that's personal, flexible, and focused on
                          the whole child.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* What Makes Us Different - Mobile */}
                <div className="snap-center w-[90vw] flex-shrink-0 px-3">
                  <motion.div
                    className="relative overflow-visible h-full"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                  >
                    {/* Organic background shapes */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[var(--village-gold)]/5 z-0 transform rotate-12"></div>
                    <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-[var(--village-gold)]/10 z-0 transform -rotate-12"></div>

                    <div className="relative z-10 p-6 h-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-white/80 rounded-[30px] -z-10"></div>

                      <div className="flex items-center mb-4">
                        <div className="bg-[var(--village-gold)]/10 p-3 rounded-full mr-4">
                          <Sparkles className="h-5 w-5 text-[var(--village-gold)]" />
                        </div>
                        <h3 className="text-xl font-medium text-[var(--village-gold)]">What Makes Us Different</h3>
                      </div>

                      <div>
                        <p className="text-base text-gray-700 leading-relaxed font-light mb-3">
                          We're not a conventional school — we're a village. A place where education meets community. We
                          believe it takes more than a classroom to raise a child — it takes connection, trust, and
                          shared responsibility.
                        </p>

                        <p className="text-base text-gray-700 leading-relaxed font-light">
                          Our work is grounded in radical inclusion. We believe every person holds unique worth —
                          regardless of background, behaviour, or circumstances. Everyone matters. Everyone belongs.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Pagination dots */}
              <div className="flex justify-center mt-4 space-x-2">
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                    activeDot === 0 ? "bg-[var(--village-teal)]" : "bg-gray-300"
                  }`}
                  onClick={() => {
                    scrollContainerRef.current?.scrollTo({
                      left: 0,
                      behavior: "smooth",
                    })
                  }}
                ></div>
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                    activeDot === 1 ? "bg-[var(--village-orange)]" : "bg-gray-300"
                  }`}
                  onClick={() => {
                    const container = scrollContainerRef.current
                    if (container) {
                      const scrollAmount = container.scrollWidth / 3
                      container.scrollTo({
                        left: scrollAmount,
                        behavior: "smooth",
                      })
                    }
                  }}
                ></div>
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                    activeDot === 2 ? "bg-[var(--village-gold)]" : "bg-gray-300"
                  }`}
                  onClick={() => {
                    const container = scrollContainerRef.current
                    if (container) {
                      const scrollAmount = (container.scrollWidth / 3) * 2
                      container.scrollTo({
                        left: scrollAmount,
                        behavior: "smooth",
                      })
                    }
                  }}
                ></div>
              </div>

              {/* Swipe indicator */}
              <div className="flex justify-center items-center mt-4 text-gray-500 text-sm">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>Swipe to explore</span>
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Desktop Content Sections - unchanged */}
          <div className="hidden md:grid grid-cols-12 gap-8 mt-8">
            {/* Vision Section */}
            <motion.div
              className="relative overflow-visible col-span-12 md:col-span-5"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover="hover"
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {/* Organic background shapes */}
              <div className="absolute -top-20 -left-20  w-64 h-64 rounded-full bg-[var(--village-teal)]/5 z-0 transform rotate-12"></div>
              <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-[var(--village-teal)]/10 z-0 transform -rotate-12"></div>

              <div className="relative z-10 p-6 md:p-8 h-full">
                <motion.div
                  className="absolute inset-0 rounded-[40px] border-2 border-transparent z-0"
                  variants={{
                    hover: {
                      boxShadow: "0 0 20px rgba(57, 160, 169, 0.3)",
                      borderColor: "rgba(57, 160, 169, 0.3)",
                      transition: { duration: 0.3 },
                    },
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-white/80 rounded-[40px] -z-10"></div>

                <div className="flex items-center mb-6">
                  <div className="bg-[var(--village-teal)]/10 p-3 rounded-full mr-4">
                    <Users className="h-6 w-6 text-[var(--village-teal)]" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-medium text-[var(--village-teal)]">Our Vision</h3>
                </div>

                <div>
                  <p className="text-lg text-gray-700 leading-relaxed font-light mb-4">
                    We believe every child deserves the chance to thrive — especially those who feel lost, left out, or
                    let down by mainstream education. But we also know that thriving children can only come from
                    thriving communities.
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed font-light mb-4">
                    <span className="text-[var(--village-teal)] font-medium">Our vision</span> is to build a village
                    that nurtures possibility — a place where hope and direction are part of everyday life.
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed font-light">
                    We create spaces where everyone belongs and can contribute their unique gifts to the community.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Mission Section */}
            <motion.div
              className="relative overflow-visible col-span-12 md:col-span-7"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover="hover"
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {/* Organic background shapes */}
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[var(--village-orange)]/5 z-0 transform -rotate-12"></div>
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[var(--village-orange)]/10 z-0 transform rotate-12"></div>

              <div className="relative z-10 p-6 md:p-8 h-full">
                <motion.div
                  className="absolute inset-0 rounded-[40px] border-2 border-transparent z-0"
                  variants={{
                    hover: {
                      boxShadow: "0 0 20px rgba(242, 108, 79, 0.3)",
                      borderColor: "rgba(242, 108, 79, 0.3)",
                      transition: { duration: 0.3 },
                    },
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-white/80 rounded-[40px] -z-10"></div>

                <div className="flex items-center mb-6">
                  <div className="bg-[var(--village-orange)]/10 p-3 rounded-full mr-4">
                    <Heart className="h-6 w-6 text-[var(--village-orange)]" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-medium text-[var(--village-orange)]">Our Mission</h3>
                </div>

                <div>
                  <p className="text-lg text-gray-700 leading-relaxed font-light mb-4">
                    Oasis St Martin's Village builds on a powerful legacy. In 1699, a school for girls was founded by
                    Thomas Tenison — a radical act in a time when few believed in educating girls. Today, we carry that
                    same spirit forward.
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed font-light mb-4">
                    <span className="text-[var(--village-orange)] font-medium">We exist</span> to take on the challenges
                    too many young people face: exclusion, absence, unmet special needs, and mental health struggles.
                    Our mission is to provide support that's personal, flexible, and focused on the whole child — with a
                    special, but not exclusive, focus on girls.
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed font-light">
                    And because we know that thriving children come from thriving communities, we're also creating
                    shared spaces — including co-working — that strengthen connection, collaboration, and opportunity
                    for the families and people around them.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* What Makes Us Different - Fluid, asymmetrical layout - desktop only */}
          <motion.div
            className="relative mt-16 mb-24 overflow-visible hidden md:block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover="hover"
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {/* Organic background shapes */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[var(--village-gold)]/5 z-0 transform rotate-12"></div>
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[var(--village-gold)]/10 z-0 transform -rotate-12"></div>

            <div className="relative z-10 p-6 md:p-10">
              <motion.div
                className="absolute inset-0 rounded-[40px] border-2 border-transparent z-0"
                variants={{
                  hover: {
                    boxShadow: "0 0 20px rgba(247, 183, 51, 0.3)",
                    borderColor: "rgba(247, 183, 51, 0.3)",
                    transition: { duration: 0.3 },
                  },
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-white/80 rounded-[40px] -z-10"></div>

              <div className="flex items-center mb-4">
                <div className="bg-[var(--village-gold)]/10 p-3 rounded-full mr-4">
                  <Sparkles className="h-6 w-6 text-[var(--village-gold)]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-medium text-[var(--village-gold)]">What Makes Us Different</h3>
              </div>

              <div className="space-y-3">
                <p className="text-lg text-gray-700 leading-relaxed font-light">
                  We're not a conventional school — we're a village. A place where education meets community. We believe
                  it takes more than a classroom to raise a child — it takes connection, trust, and shared
                  responsibility. Our work is grounded in radical inclusion. We believe every person holds unique worth
                  — regardless of background, behaviour, or circumstances. Everyone matters. Everyone belongs.
                </p>

                <div className="relative pl-6">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[var(--village-gold)]/30 to-transparent rounded-full"></div>
                  <p className="text-lg text-gray-700 leading-relaxed font-light">
                    That's why we work alongside families, local services, and partners to build a nurturing ecosystem
                    around each child. That belief drives us to challenge exclusion and inequality wherever it exists.
                    And because we know that thriving children come from thriving communities, we're also creating
                    shared spaces — including co-working — that strengthen connection, collaboration, and opportunity
                    for the families and people around them. Our approach combines education, community development, and
                    social support in one integrated model.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
