"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowDown, Menu, Mail, Phone, MapPin } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useMacOS } from "@/hooks/useMacOS"

interface IntroSectionProps {
  onScrollToFrames: () => void
}

export default function IntroSection({ onScrollToFrames }: IntroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isMac = useMacOS()

  const placeUses = [
    "Community",
    "Learning",
    "Gathering",
    "Belonging",
    "Volunteering",
    "Your Team",
    "Your Office",
    "Co-working",
    "Your Meetings",
    "Your Events",
    "Sports",
    "Hosting with Food",
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [animationKey, setAnimationKey] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % placeUses.length)
      setAnimationKey((prev) => prev + 1)
    }, 3000)

    return () => clearInterval(intervalId)
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

  // Character stagger animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.04,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
  }

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
  }

  useEffect(() => {
    setIsVisible(true)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (sectionRef.current) observer.unobserve(sectionRef.current)
          }
        })
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  // Custom scroll function with smooth acceleration and deceleration
  const scrollWithSmoothPace = (targetId: string) => {
    const targetElement = document.getElementById(targetId)
    if (!targetElement) return

    const startPosition = window.scrollY

    // Calculate the header height to account for fixed header
    const headerHeight = 80 // Approximate header height in pixels

    // Add a larger negative offset to make it scroll even less far
    const additionalOffset = -350 // Increased negative value to scroll even higher

    // Get the position of the target element
    const targetRect = targetElement.getBoundingClientRect()

    // Calculate target position with the negative offset
    const targetPosition = window.scrollY + targetRect.top - headerHeight + additionalOffset

    const distance = targetPosition - startPosition
    const duration = 1800 // Longer duration for smoother animation
    let startTime: number | null = null

    // Easing function: ease-in-out cubic - smooth start, smooth stop
    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    function animation(currentTime: number) {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)
      const easedProgress = easeInOutCubic(progress)

      window.scrollTo(0, startPosition + distance * easedProgress)

      if (timeElapsed < duration) {
        requestAnimationFrame(animation)
      }
    }

    requestAnimationFrame(animation)
  }

  // Update the onScrollToFrames function to use the custom scroll
  const handleScrollToFrames = () => {
    scrollWithSmoothPace("frames-section")
  }

  // Function to scroll to the spaces section with smooth pacing
  const scrollToSpaces = (e: React.MouseEvent) => {
    e.preventDefault()
    scrollWithSmoothPace("frames-section")
  }

  // Function to scroll to the Built for Community section
  const scrollToBuiltForCommunity = () => {
    // Get the height of the intro section
    const introSection = document.getElementById("intro-section")
    if (introSection) {
      // Scroll to a position just past the intro section
      const targetPosition = introSection.offsetHeight

      const startPosition = window.scrollY
      const distance = targetPosition - startPosition
      const duration = 1800 // Longer duration for smoother animation
      let startTime: number | null = null

      // Easing function: ease-in-out cubic - smooth start, smooth stop
      const easeInOutCubic = (t: number) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      }

      function animation(currentTime: number) {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        const easedProgress = easeInOutCubic(progress)

        window.scrollTo(0, startPosition + distance * easedProgress)

        if (timeElapsed < duration) {
          requestAnimationFrame(animation)
        }
      }

      requestAnimationFrame(animation)
    }
  }

  return (
    <section ref={sectionRef} className="w-full h-screen relative overflow-hidden" id="intro-section">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 py-6 px-6 md:px-12">
        <div className="w-full flex justify-end items-center">
          <div className="w-auto absolute left-[-15px] md:left-[-10px] top-2 z-50">
            <Link href="/">
              <div className="relative">
                <img 
                  src="/images/oasis-st-martins-village-logo.png" 
                  alt="Oasis St Martins Village Logo" 
                  className="h-52 w-auto brightness-125"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-end space-x-6 pr-0">
            <a
              href="#frames-section"
              onClick={scrollToSpaces}
              className="text-white text-sm font-medium hover:text-[var(--village-green)] hover:font-bold transition-all"
            >
              Spaces
            </a>
            <Link
              href="/community"
              className="text-white text-sm font-medium hover:text-[var(--village-green)] hover:font-bold transition-all"
            >
              Community
            </Link>
            <Link
              href="/volunteer"
              className="text-white text-sm font-medium hover:text-[var(--village-green)] hover:font-bold transition-all"
            >
              Volunteer
            </Link>
            <Link
              href="/about-us"
              className="text-white text-sm font-medium hover:text-[var(--village-green)] hover:font-bold transition-all"
            >
              About
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-white text-sm font-medium hover:text-[var(--village-green)] hover:font-bold transition-all focus:outline-none">
                Contact
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-72 p-4 bg-[#f8f5f0] border border-gray-200 rounded-xl shadow-lg"
              >
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-[var(--village-green)] mb-4">Get in Touch</h3>

                  <div className="space-y-3">
                    <a href="mailto:enquiries@oasisstmartins.org" className="flex items-center group">
                      <div className="p-1 rounded-full mr-3">
                        <Mail className="h-5 w-5 text-[var(--village-green)]" />
                      </div>
                      <span className="text-gray-700 group-hover:text-[var(--village-green)] transition-colors">
                        enquiries@oasisstmartins.org
                      </span>
                    </a>

                    <a href="tel:02045243260" className="flex items-center group">
                      <div className="p-1 rounded-full mr-3">
                        <Phone className="h-5 w-5 text-[var(--village-green)]" />
                      </div>
                      <span className="text-gray-700 group-hover:text-[var(--village-green)] transition-colors">
                        0204 524 3260
                      </span>
                    </a>

                    <div className="flex items-start group">
                      <div className="p-1 rounded-full mr-3 mt-0.5 flex-shrink-0">
                        <MapPin className="h-5 w-5 text-[var(--village-green)]" />
                      </div>
                      <span className="text-gray-700">
                        155 Tulse Hill
                        <br />
                        London, SW2 3UP
                      </span>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href="/book-tour"
              className="bg-white text-black px-4 py-2 text-sm font-medium rounded-md hover:bg-[var(--village-green)] hover:text-white transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 ml-2"
            >
              Book a Tour
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/videos/village-background-new-2023.mp4" type="video/mp4" />
        </video>
        {/* Background Video */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 md:px-12 py-20">
        <div className="text-center max-w-4xl mx-auto relative">
          <motion.div
            custom={0}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={textVariants}
            className="mb-4 sm:mb-6 leading-tight tracking-tight text-white flex flex-col items-center"
            style={{
              fontFamily: "sans-serif",
              fontWeight: 600,
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              lineHeight: 1.1,
            }}
          >
            <div className="mb-2">A place for</div>
            <div className="relative" style={{ minWidth: "200px", minHeight: "70px" }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={animationKey}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-white absolute left-1/2 transform -translate-x-1/2"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {placeUses[currentIndex].split("").map((char, index) => (
                    <motion.span
                      key={index}
                      variants={childVariants}
                      className="inline-block"
                      style={{ whiteSpace: "pre" }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.p
            custom={1}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={textVariants}
            className="text-lg sm:text-xl md:text-2xl text-white/80 mb-6 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0"
          >
            The Village offers flexible community spaces designed for productivity, collaboration, and growth.
          </motion.p>

          <motion.div
            custom={2}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={textVariants}
            className="flex flex-col w-full px-4 sm:px-0 sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={handleScrollToFrames}
              className="px-8 py-4 bg-[var(--village-green)] text-white font-medium rounded-md hover:bg-[var(--village-green)]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 w-full sm:w-auto sm:min-w-[200px]"
            >
              Find Your Space
            </button>
            <button
              className="px-8 py-4 border-2 border-white text-white font-medium rounded-md hover:bg-white/20 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 w-full sm:w-auto sm:min-w-[200px]"
              onClick={scrollToBuiltForCommunity}
            >
              Learn More
            </button>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 mx-auto w-fit cursor-pointer"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            repeatDelay: 0.5,
          }}
          onClick={scrollToBuiltForCommunity}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/80 text-sm uppercase tracking-wider">Explore</span>
            <ArrowDown className="h-5 w-5 text-white/80" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
