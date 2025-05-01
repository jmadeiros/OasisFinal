"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  ChevronRight,
  Users,
  Heart,
  Lightbulb,
  Sparkles,
  MessageSquareQuote,
  Users2,
  BookOpen,
  Globe,
  Check,
} from "lucide-react"
import Link from "next/link"
import { inter } from "../fonts"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import type { ReactElement } from 'react'

// Add this CSS class to hide scrollbars
const style = {
  hideScrollbar: {
    msOverflowStyle: "none" /* IE and Edge */,
    scrollbarWidth: "none" /* Firefox */,
    "&::-webkit-scrollbar": {
      display: "none" /* Chrome, Safari and Opera */,
    },
  },
}

// Define TypeScript interfaces for data structures
interface Value {
  name: string
  description: string
  color: string
}

interface Habit {
  name: string
  color: string
}

interface ImpactMetric {
  figure: string
  label: string
  description: string
  icon: ReactElement
  color: string
}

interface Testimonial {
  quote: string
  author: string
  image: string
}

export default function AboutUsPage() {
  // Add state to track which value is selected
  const [selectedValue, setSelectedValue] = useState<string | null>(null)
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)

  const valuesScrollRef = useRef<HTMLDivElement>(null)
  const habitsScrollRef = useRef<HTMLDivElement>(null)
  const metricsScrollRef = useRef<HTMLDivElement>(null)
  const testimonialsScrollRef = useRef<HTMLDivElement>(null)

  // Define the values with their descriptions
  const values: Value[] = [
    {
      name: "A passion to include",
      description:
        "We believe everyone should be included in the benefits, resources and opportunities available to all. We&apos;re committed to serving and engaging with everyone in our communities, especially the most vulnerable.",
      color: "var(--village-green)",
    },
    {
      name: "A sense of hope",
      description:
        "We have a deep-seated belief that things can change, be transformed and improved. We&apos;re committed to identifying and developing potential in people and communities, and to working for justice and equity.",
      color: "var(--village-teal)",
    },
    {
      name: "A commitment to persevere",
      description:
        "We won&apos;t give up on people or communities. We&apos;re committed to finding solutions to problems, to learning from our mistakes and to building on our successes.",
      color: "var(--village-orange)",
    },
    {
      name: "A willingness to work together",
      description:
        "We believe in the power of community and collaboration. We&apos;re committed to working with others, to sharing our resources and to learning from one another.",
      color: "var(--village-gold)",
    },
    {
      name: "A determination to act",
      description:
        "We&apos;re committed to taking practical action to address injustice and to meet the needs of communities. We believe in being the change we want to see in the world.",
      color: "var(--village-green)",
    },
  ]

  // Define the 9 habits with their colors
  const habits: Habit[] = [
    { name: "Compassionate", color: "#dc3545" }, // Red
    { name: "Joyful", color: "#ffc107" }, // Yellow
    { name: "Considerate", color: "#fd7e14" }, // Orange
    { name: "Patient", color: "#20c997" }, // Teal
    { name: "Honest", color: "#0dcaf0" }, // Blue
    { name: "Forgiving", color: "#17a2b8" }, // Turquoise
    { name: "Humble", color: "#28a745" }, // Green
    { name: "Hopeful", color: "#6f42c1" }, // Purple
    { name: "Self-controlled", color: "#6610f2" }, // Light Purple
  ]

  // Define impact metrics
  const impactMetrics: ImpactMetric[] = [
    {
      figure: "40",
      label: "Oasis Communities in the UK",
      description: "Local hubs serving neighborhoods across the country",
      icon: <Users2 className="h-6 w-6 text-white" />,
      color: "#8e44ad", // Purple color
    },
    {
      figure: "54",
      label: "Schools in the Oasis family",
      description: "Educational institutions providing quality learning",
      icon: <BookOpen className="h-6 w-6 text-white" />,
      color: "#3498db", // Blue color
    },
    {
      figure: "23,304",
      label: "People access our community services",
      description: "Individuals benefiting from our programs and support",
      icon: <Heart className="h-6 w-6 text-white" />,
      color: "#f1c40f", // Gold/yellow color
    },
  ]

  // Define testimonials with explicit type
  const testimonials: Testimonial[] = [
    {
      quote:
        "Oasis has transformed our local community. Their commitment to inclusion and creating spaces where everyone can thrive has led to partnerships and opportunities we never would have imagined possible.",
      author: "Sarah J., Community Leader",
      image: "/images/placeholder-person1.jpg", // Placeholder image
    },
    {
      quote:
        "Being part of the Oasis family has been life-changing for our students. The holistic approach to education and community development has created an environment where young people truly flourish.",
      author: "Marcus T., Headteacher",
      image: "/images/placeholder-person2.jpg", // Placeholder image
    },
  ]

  const toggleValue = (valueName: string) => {
    setSelectedValue((prev) => (prev === valueName ? null : valueName))
  }

  const scrollToTestimonial = (index: number) => {
    if (!testimonialsScrollRef.current) return
    const itemWidth = testimonialsScrollRef.current.offsetWidth
    testimonialsScrollRef.current.scrollTo({
      left: index * itemWidth,
      behavior: "smooth",
    })
    setCurrentTestimonialIndex(index)
  }

  // Handle scroll for habits (if needed for future features)
    const handleHabitsScroll = () => {
    if (!habitsScrollRef.current) return
    const { scrollLeft } = habitsScrollRef.current
    const itemWidth = habitsScrollRef.current.children[0]?.clientWidth || 0
    const index = Math.round(scrollLeft / (itemWidth + 16)) // Adjust gap (gap-4)
  }

  // Handle scroll for metrics (if needed for future features)
    const handleMetricsScroll = () => {
    if (!metricsScrollRef.current) return
    const { scrollLeft } = metricsScrollRef.current
    const itemWidth = metricsScrollRef.current.children[0]?.clientWidth || 0
    const index = Math.round(scrollLeft / (itemWidth + 24)) // Adjust gap (gap-6)
  }

  // Handle scroll for testimonials
  const handleTestimonialsScroll = () => {
    if (!testimonialsScrollRef.current) return
    const { scrollLeft } = testimonialsScrollRef.current
    const itemWidth = testimonialsScrollRef.current.offsetWidth
      const index = Math.round(scrollLeft / itemWidth)
    setCurrentTestimonialIndex(index)
    }

  // Auto-scroll testimonials
  useEffect(() => {
    if (testimonials && testimonials.length > 0) { // Check if testimonials exist
      const timer = setInterval(() => {
        setCurrentTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      }, 5000) // Change testimonial every 5 seconds

      return () => clearInterval(timer)
    }
  }, [testimonials.length])

  useEffect(() => {
    if (testimonialsScrollRef.current) {
      const itemWidth = testimonialsScrollRef.current.offsetWidth
      testimonialsScrollRef.current.scrollTo({
        left: currentTestimonialIndex * itemWidth,
        behavior: "smooth",
      })
    }
  }, [currentTestimonialIndex])

  return (
    <main className="min-h-screen bg-[#f8f5f0]">
      {/* Header with Oasis Logo on the right */}
      <div className="w-full py-16 md:py-24 bg-[#f0e9df] relative">
        {/* Logo positioned on the right - enlarged and partially visible */}
        <div className="absolute right-[15%] top-1/2 transform -translate-y-1/2 hidden md:block">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/oasis-logo-Qm57dhfdgogMg1T0XTeO6c3zyO8Acx.svg"
            alt="Oasis Logo"
            width={800}
            height={800}
            className="object-contain"
            aria-hidden="true"
            priority
          />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center text-gray-700 hover:text-[var(--village-green)] transition-colors mb-8 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="relative overflow-hidden">
              <span className="inline-block transition-transform group-hover:-translate-y-full duration-300">
            Back to home
              </span>
              <span className="absolute top-0 left-0 translate-y-full transition-transform group-hover:translate-y-0 duration-300">
                Return to main page
              </span>
            </span>
          </Link>

          <motion.h1
            className={`text-5xl md:text-6xl font-bold leading-tight ${inter.className} mb-6`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="block text-transparent bg-clip-text"
              style={{
                background: "linear-gradient(to right, #f7b733, #f26c4f)",
                WebkitBackgroundClip: "text",
              }}
            >
              Who We Are
            </span>
          </motion.h1>

          <motion.p
            className="hidden md:flex text-lg md:text-xl text-gray-700 max-w-xl mt-6 mr-auto flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span>The Village is a vibrant community workspace</span>
            <span>where people connect, create, and collaborate</span>
            <span>in the heart of Tulse Hill.</span>
          </motion.p>

          <motion.p
            className="md:hidden text-lg text-gray-700 max-w-xl mt-6 mr-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            The Village is a vibrant community workspace where people connect, create, and collaborate in the heart of Tulse Hill.
          </motion.p>
        </div>
      </div>

      {/* Rest of the page content remains the same */}
      {/* Introduction Section with Visual Element */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-[var(--village-green)] p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h2 className={`text-3xl font-bold text-gray-800 ${inter.className}`}>Our Community</h2>
              </div>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We&apos;re a diverse collective of organizations and individuals committed to creating positive change in our
                community. Our mission is to provide a platform for business, education, and community development that
                serves the local area and its people.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                We believe in the power of collaboration and shared resources to create meaningful impact. As part of
                the Oasis family, we&apos;re committed to creating inclusive spaces where everyone can thrive.
              </p>
            </motion.div>

            <motion.div
              className="col-span-1 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Smiling_girls-978Fdn69XiZXIrMO4DJ8qicwhnHfQM.jpeg"
                  alt="Oasis Academy students smiling together"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mission Section with Accent Background */}
      <div className="py-16 bg-[#f0e9df]">
        <div className="container mx-auto px-6 md:px-12 relative">
          {/* Community Image - Left Side */}
          <motion.div
            className="absolute left-[-100px] top-20 hidden xl:block z-10"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Image
              src="/images/community-conversation.jpeg"
              alt="Community conversation at Oasis"
              width={400}
              height={267}
              className="object-cover rounded-xl shadow-lg"
              style={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)" }}
            />
          </motion.div>

          {/* NOLO Image - Right Side */}
          <motion.div
            className="absolute right-[-100px] top-20 hidden xl:block z-10"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NOLO%203.jpg-SR2Q622LpQUmkoNfRvBwmGFuJebKLq.jpeg"
              alt="Oasis community event"
              width={400}
              height={267}
              className="object-cover rounded-xl shadow-lg"
              style={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)" }}
            />
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto text-center relative z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex justify-center mb-6">
              <div className="bg-[var(--village-orange)] p-3 rounded-full">
                <Heart className="h-6 w-6 text-white" />
              </div>
            </div>

            <h2 className={`text-3xl font-bold mb-6 text-gray-800 ${inter.className}`}>Our Mission</h2>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Oasis exists to help create a just and inclusive society where everyone can thrive. We believe that every
              person matters and that we all have a contribution to make.
            </p>

            <div className="text-xl font-medium text-[var(--village-orange)] mb-6 px-6 py-4 border-l-4 border-r-4 border-[var(--village-orange)] mx-auto max-w-2xl">
              &quot;We work to create communities where everyone is included, making a contribution and reaching their full
              potential.&quot;
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              The Village is a space where this vision comes to life - a community workspace where people from all walks
              of life can connect, create, and collaborate.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Values and Ethos Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              className="md:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-[#f8f5f0] rounded-2xl p-6 shadow-md border border-gray-100 h-full">
                <div className="flex items-center mb-6">
                  <div className="bg-[var(--village-teal)] p-2 rounded-full mr-3">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-800">Our Values</h3>
                </div>

                <ul className="space-y-5">
                  {values.map((value, index) => (
                    <li key={index} className="space-y-2 overflow-hidden">
                      <button
                        className="flex items-center gap-2 w-full text-left group"
                        onClick={() => toggleValue(value.name)}
                      >
                        <span className="text-[var(--village-green)] font-bold text-lg">•</span>
                        <span className="text-gray-800 font-medium group-hover:text-gray-900 transition-colors">
                          {value.name}
                        </span>
                        <ChevronRight
                          className={`ml-auto h-4 w-4 text-gray-500 transition-transform duration-300 ${
                            selectedValue === value.name ? "rotate-90" : ""
                          }`}
                        />
                      </button>

                      {/* Value description dropdown */}
                      <AnimatePresence>
                        {selectedValue === value.name && (
                          <motion.div
                            className="ml-6 pl-2 border-l-2 text-sm text-gray-700 overflow-hidden"
                            style={{ borderColor: value.color }}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                              height: "auto",
                              opacity: 1,
                              transition: {
                                height: { duration: 0.3, ease: "easeOut" },
                                opacity: { duration: 0.2, delay: 0.1 },
                              },
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                              transition: {
                                height: { duration: 0.3, ease: "easeIn" },
                                opacity: { duration: 0.1 },
                              },
                            }}
                          >
                            <div className="py-2">{value.description}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-[var(--village-gold)] p-2 rounded-full mr-3">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                <h2 className={`text-3xl font-bold text-gray-800 ${inter.className}`}>Our Ethos</h2>
              </div>

              <div className="bg-[#f8f5f0] rounded-2xl p-8 shadow-md border border-gray-100">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  At the heart of Oasis is a deep-rooted and unwavering commitment to inclusion. We believe that
                  everyone, regardless of their background, identity or circumstance, should be included in the
                  benefits, resources and opportunities available to all.
                </p>

                <div className="border-t border-b border-gray-300 py-6 my-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Our ethos is shaped by our commitment to five core values that inform everything we do. These values
                    guide our approach to creating community spaces like The Village, where everyone can feel welcome,
                    supported, and empowered to reach their full potential.
                  </p>
                </div>

                <div className="flex justify-end">
                  <Link
                    href="https://www.oasisuk.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[var(--village-gold)] text-white font-medium rounded-md hover:bg-[var(--village-gold)]/90 transition-colors"
                  >
                    Learn More About Us
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 9 Habits Section with Colorful Background */}
      <div className="py-16 bg-gradient-to-br from-[#f0e9df] to-[#f8f5f0]">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className={`text-3xl font-bold mb-4 text-gray-800 ${inter.className}`}>Our 9 Habits</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Our 9 Habits are the behaviours through which we aim to reflect our ethos
            </p>
          </motion.div>

          {/* Desktop Layout - Hidden on Mobile */}
          <div className="hidden md:block">
            {/* Left Column - Explanatory Text */}
            <motion.div
              className="bg-white rounded-xl shadow-md p-8 w-1/2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                These habits form our organisational behaviours. They are lived out every day in who we are, and how we
                behave towards each other.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                In all our work we encourage each other to keep on becoming the best version of ourselves through living
                out the 9 Habits; they are our organisational DNA and present through all our work from our philosophy
                and policies to our practice and everyday interactions.
              </p>
            </motion.div>

            {/* Right Column - Habits Grid */}
            <div className="w-1/2">
              <div className="grid grid-cols-3 gap-4">
                {habits.map((habit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-center p-4 rounded-md text-white font-medium text-center shadow-md"
                    style={{ backgroundColor: habit.color }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    {habit.name}
                  </motion.div>
                ))}
              </div>

              <motion.p
                className="text-lg text-gray-700 mt-6 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                These habits guide our daily interactions and help us create a community that is welcoming, supportive,
                and transformative.
              </motion.p>
            </div>
          </div>

          {/* Mobile Layout - Hidden on Desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="md:hidden"
          >
            <div className="grid grid-cols-3 gap-2">
              {habits.map((habit, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-center p-2 rounded-md text-white font-medium text-center shadow-md text-sm h-[70px]"
                  style={{ backgroundColor: habit.color }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  {habit.name}
                </motion.div>
              ))}
            </div>

            <p className="text-lg text-gray-700 mt-6 leading-relaxed bg-white p-4 rounded-lg shadow-sm">
              These habits guide our daily interactions and help us create a community that is welcoming, supportive,
              and transformative.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Our Impact Section - Showing metrics and testimonials */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex justify-center mb-6">
              <div className="bg-[#f26c4f] p-3 rounded-full">
                <Globe className="h-6 w-6 text-white" />
              </div>
            </div>

            <h2 className={`text-4xl font-bold mb-8 text-gray-800 ${inter.className}`}>Our Impact</h2>

            <div className="max-w-3xl mx-auto bg-[#f8f5f0] p-8 rounded-2xl shadow-md border border-gray-100 mb-10">
              <p className="text-xl text-gray-700 leading-relaxed">
                <span className="font-semibold">For 35 years</span> Oasis has been helping to build community where
                everyone can thrive. We work to end disadvantage and create opportunity for all, providing education,
                housing, health, justice, youth and family support.
              </p>
            </div>

            <motion.h3
              className="text-3xl font-bold mb-6 text-[#f26c4f] max-w-4xl mx-auto leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Oasis works nationally and in local neighbourhoods to build stronger communities where everyone can
              thrive.
            </motion.h3>
          </motion.div>

          {/* Impact Metrics - Desktop and Mobile */}
          <div className="md:overflow-visible mb-12">
            <div
              ref={metricsScrollRef}
              className="overflow-x-auto hide-scrollbar md:overflow-visible -mx-6 px-6 md:mx-0 md:px-0"
              style={{
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
                scrollSnapType: "x mandatory", // Add scroll snap for mobile
              }}
            >
              <div className="flex md:grid md:grid-cols-3 gap-6 w-[800px] md:w-auto">
                {impactMetrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex-shrink-0 w-[250px] md:w-auto"
                    style={{ scrollSnapAlign: "center" }} // Add scroll snap alignment
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-2 rounded-full mr-3" style={{ backgroundColor: metric.color }}>
                          {metric.icon}
                        </div>
                        <h3 className="text-xl font-medium text-gray-800">{metric.label}</h3>
                      </div>
                      <div className="text-5xl font-bold mb-3" style={{ color: metric.color }}>
                        {metric.figure}
                      </div>
                      <p className="text-gray-600">{metric.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Swipe indicator for mobile */}
            <div className="flex justify-center mt-4 md:hidden">
              <p className="text-sm text-gray-500 italic">Swipe to explore</p>
            </div>
          </div>

          {/* Testimonials - Desktop and Mobile */}
          <div className="md:overflow-visible">
            <div
              ref={testimonialsScrollRef}
              className="overflow-x-auto hide-scrollbar md:overflow-visible -mx-6 px-6 md:mx-0 md:px-0"
              style={{ 
                scrollbarWidth: "none", 
                WebkitOverflowScrolling: "touch",
                scrollSnapType: "x mandatory" 
              }}
            >
              <div className="flex md:grid md:grid-cols-2 gap-8 w-[800px] md:w-auto">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 flex-shrink-0 w-[350px] md:w-auto"
                    style={{ scrollSnapAlign: "center" }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 * index }}
                  >
                    <div className="flex items-start mb-6">
                      <div className="bg-[var(--village-orange)] p-2 rounded-full mr-4 mt-1">
                        <MessageSquareQuote className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-lg text-gray-700 italic leading-relaxed">"{testimonial.quote}"</p>
                    </div>
                    <div className="ml-12">
                      <p className="font-medium text-gray-800">{testimonial.author}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pagination dots - only visible on mobile */}
            <div className="flex justify-center mt-4 space-x-2 md:hidden">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentTestimonialIndex === index ? "bg-[var(--village-orange)] w-5" : "bg-gray-300"
                  }`}
                  onClick={() => scrollToTestimonial(index)}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex justify-center mt-2 md:hidden">
              <p className="text-sm text-gray-500 italic">Swipe to explore</p>
            </div>
          </div>
        </div>
      </div>

      {/* Join Our Community Section */}
      <div className="py-16 bg-[#f0e9df]">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className={`text-3xl font-bold mb-6 text-gray-800 ${inter.className}`}>Join Our Community</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Whether you&apos;re looking for a workspace, want to host an event, or are interested in becoming a partner,
                we&apos;d love to hear from you. The Village is always open to new members who share our vision for a
                collaborative, supportive community.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md text-center">
              <h3 className="text-xl font-medium text-gray-800 mb-6">Ready to get started?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/book-tour"
                  className="px-6 py-3 bg-[var(--village-green)] text-white font-medium rounded-md hover:bg-[var(--village-green)]/90 transition-colors"
                >
                  Book a Tour
                </Link>
                <Link
                  href="/#contact"
                  className="px-6 py-3 border border-[var(--village-green)] text-[var(--village-green)] font-medium rounded-md hover:bg-[var(--village-green)]/10 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
