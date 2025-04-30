"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Users, Calendar, Heart, MessageSquare, Briefcase, Lightbulb, Clock } from "lucide-react"
import Link from "next/link"
import { inter } from "../fonts"
import { useRef, useEffect, useState } from "react"

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

// Add custom scrollbar styles for testimonials
const testimonialScrollbarStyle = {
  testimonialsScroll: {
    "@media (max-width: 768px)": {
      "&::-webkit-scrollbar": {
        height: "6px",
      },
      "&::-webkit-scrollbar-track": {
        background: "#f1f1f1",
        borderRadius: "10px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "var(--village-orange)",
        borderRadius: "10px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "#e05e3f",
      },
      scrollbarWidth: "thin",
      scrollbarColor: "var(--village-orange) #f1f1f1",
    },
  },
}

export default function CommunityPage() {
  // Add these state variables inside the component
  const [activeEventIndex, setActiveEventIndex] = useState(0)
  const [activeValueIndex, setActiveValueIndex] = useState(0)
  const [activeBenefitIndex, setActiveBenefitIndex] = useState(0)
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0)
  const eventsScrollRef = useRef<HTMLDivElement>(null)
  const valuesScrollRef = useRef<HTMLDivElement>(null)
  const benefitsScrollRef = useRef<HTMLDivElement>(null)
  const testimonialsScrollRef = useRef<HTMLDivElement>(null)

  // Updated upcoming events data with "Coming Soon" dates
  const upcomingEvents = [
    {
      id: 1,
      category: "Networking",
      title: "Networking Breakfast",
      time: "9:00 AM - 10:00 AM",
      description:
        "Start your day with coffee, pastries, and connections. Meet fellow members and local entrepreneurs in a relaxed setting.",
      icon: <Calendar className="w-16 h-16 text-[var(--village-orange)]" />,
    },
    {
      id: 2,
      category: "Workshop",
      title: "Workshop: Digital Marketing Essentials",
      description: "Learn the fundamentals of digital marketing to grow your business online.",
    },
    {
      id: 3,
      category: "Community",
      title: "Community Showcase",
      description: "Celebrate and discover the diverse talents and projects within our community.",
    },
    {
      id: 4,
      category: "Wellness",
      title: "Wellness Wednesday: Desk Yoga",
      description: "Learn simple yoga techniques you can do at your desk to reduce stress and improve wellbeing.",
    },
  ]

  // Community benefits data with expanded content
  const communityBenefits = [
    {
      title: "Networking Opportunities",
      description:
        "Connect with like-minded individuals, potential collaborators, and clients through our regular networking events and community platform.",
      icon: <Users className="w-8 h-8" />,
      color: "var(--village-green)",
    },
    {
      title: "Skill Development",
      description:
        "Enhance your professional skills through workshops, talks, and membership programs offered exclusively to our community members.",
      icon: <Calendar className="w-8 h-8" />,
      color: "var(--village-teal)",
    },
    {
      title: "Wellbeing Support",
      description:
        "Access wellness programs, including yoga sessions, mindfulness workshops, and a supportive environment that prioritizes work-life balance.",
      icon: <Heart className="w-8 h-8" />,
      color: "var(--village-orange)",
    },
    {
      title: "Collaborative Environment",
      description:
        "Work alongside diverse professionals in a space designed to foster creativity, innovation, and cross-disciplinary collaboration.",
      icon: <MessageSquare className="w-8 h-8" />,
      color: "var(--village-gold)",
    },
  ]

  // New community values section
  const communityValues = [
    {
      title: "Inclusivity",
      description:
        "We believe in creating a space where everyone feels welcome, valued, and respected regardless of background or experience level.",
      icon: <Users className="w-12 h-12" />,
    },
    {
      title: "Collaboration",
      description:
        "Our community thrives on shared knowledge, mutual support, and the magic that happens when diverse minds work together.",
      icon: <Lightbulb className="w-12 h-12" />,
    },
    {
      title: "Growth",
      description:
        "We're committed to providing resources, opportunities, and support that help our members develop both personally and professionally.",
      icon: <Briefcase className="w-12 h-12" />,
    },
  ]

  // Testimonials section
  const testimonials = [
    {
      quote:
        "The Village has transformed how I work. The community aspect has led to collaborations I never would have found elsewhere.",
      author: "Sarah J., Graphic Designer",
    },
    {
      quote:
        "More than just a workspace, The Village is where I've found mentors, partners, and friends who have helped my business thrive.",
      author: "Michael T., Tech Entrepreneur",
    },
    {
      quote:
        "The supportive environment and networking opportunities have been invaluable for my professional development.",
      author: "Priya K., Marketing Consultant",
    },
  ]

  // Add these functions inside the component
  const scrollToEvent = (index: number) => {
    if (!eventsScrollRef.current) return
    const itemWidth = 280 + 24 // width + gap
    eventsScrollRef.current.scrollTo({
      left: index * itemWidth,
      behavior: "smooth",
    })
    setActiveEventIndex(index)
  }

  const scrollToValue = (index: number) => {
    if (!valuesScrollRef.current) return
    const itemWidth = 280 + 48 // width + gap
    valuesScrollRef.current.scrollTo({
      left: index * itemWidth,
      behavior: "smooth",
    })
    setActiveValueIndex(index)
  }

  const scrollToBenefit = (index: number) => {
    if (!benefitsScrollRef.current) return
    const itemWidth = 240 + 24 // width + gap
    benefitsScrollRef.current.scrollTo({
      left: index * itemWidth,
      behavior: "smooth",
    })
    setActiveBenefitIndex(index)
  }

  const scrollToTestimonial = (index: number) => {
    if (!testimonialsScrollRef.current) return
    const itemWidth = 280 + 32 // width + gap
    testimonialsScrollRef.current.scrollTo({
      left: index * itemWidth,
      behavior: "smooth",
    })
    setActiveTestimonialIndex(index)
  }

  // Add these useEffect hooks inside the component
  useEffect(() => {
    const eventsContainer = eventsScrollRef.current
    if (!eventsContainer) return

    const handleEventsScroll = () => {
      const { scrollLeft } = eventsContainer
      const itemWidth = 280 + 24 // width + gap
      const index = Math.round(scrollLeft / itemWidth)
      setActiveEventIndex(Math.min(index, upcomingEvents.slice(1).length - 1))
    }

    eventsContainer.addEventListener("scroll", handleEventsScroll)
    return () => eventsContainer.removeEventListener("scroll", handleEventsScroll)
  }, [upcomingEvents.length])

  useEffect(() => {
    const valuesContainer = valuesScrollRef.current
    if (!valuesContainer) return

    const handleValuesScroll = () => {
      const { scrollLeft } = valuesContainer
      const itemWidth = 280 + 48 // width + gap
      const index = Math.round(scrollLeft / itemWidth)
      setActiveValueIndex(Math.min(index, communityValues.length - 1))
    }

    valuesContainer.addEventListener("scroll", handleValuesScroll)
    return () => valuesContainer.removeEventListener("scroll", handleValuesScroll)
  }, [communityValues.length])

  useEffect(() => {
    const benefitsContainer = benefitsScrollRef.current
    if (!benefitsContainer) return

    const handleBenefitsScroll = () => {
      const { scrollLeft } = benefitsContainer
      const itemWidth = 240 + 24 // width + gap
      const index = Math.round(scrollLeft / itemWidth)
      setActiveBenefitIndex(Math.min(index, communityBenefits.length - 1))
    }

    benefitsContainer.addEventListener("scroll", handleBenefitsScroll)
    return () => benefitsContainer.removeEventListener("scroll", handleBenefitsScroll)
  }, [communityBenefits.length])

  useEffect(() => {
    const testimonialsContainer = testimonialsScrollRef.current
    if (!testimonialsContainer) return

    const handleTestimonialsScroll = () => {
      const { scrollLeft } = testimonialsContainer
      const itemWidth = 280 + 32 // width + gap
      const index = Math.round(scrollLeft / itemWidth)
      setActiveTestimonialIndex(Math.min(index, testimonials.length - 1))
    }

    testimonialsContainer.addEventListener("scroll", handleTestimonialsScroll)
    return () => testimonialsContainer.removeEventListener("scroll", handleTestimonialsScroll)
  }, [testimonials.length])

  return (
    <main className="min-h-screen bg-[#f8f5f0]">
      {/* Header */}
      <div className="w-full py-12 md:py-16 bg-[#f0e9df]">
        <div className="container mx-auto px-6 md:px-12">
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
            className={`text-5xl md:text-6xl font-bold leading-tight ${inter.className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="block text-transparent bg-clip-text"
              style={{
                background: "linear-gradient(to right, #f26c4f, #f7b733)",
                WebkitBackgroundClip: "text",
              }}
            >
              Our Community
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-700 mt-4 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            The Village is more than just a workspace—it's a vibrant community of creators, entrepreneurs, and
            changemakers.
          </motion.p>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 md:px-12 py-16">
        {/* Community Hero Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h2 className={`text-3xl md:text-4xl font-bold mb-6 text-gray-800 ${inter.className}`}>
                  A Community Built for Connection
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  At The Village, we believe that meaningful connections are the foundation of success. Our community
                  brings together diverse professionals, entrepreneurs, and creatives who share knowledge, inspire each
                  other, and collaborate on exciting projects.
                </p>
                <p className="text-lg text-gray-700 mb-8">
                  Whether you're looking for a collaborative workspace, professional development opportunities, or
                  simply a supportive network, you'll find your place in our community.
                </p>
                <div>
                  <Link
                    href="/coworking"
                    className="inline-flex items-center px-6 py-3 bg-[var(--village-green)] text-white font-medium rounded-md hover:bg-[var(--village-green)]/90 transition-colors"
                  >
                    Join Our Community
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 bg-[#f0e9df] flex items-center justify-center relative">
                <img
                  src="/images/community-connection.jpeg"
                  alt="Community members connecting"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Events Section - Styled to match the image */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className={`text-3xl font-bold mb-8 text-gray-800 ${inter.className}`}>Upcoming Events</h2>

          {/* Featured Event */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 mb-8">
            <div className="md:flex">
              <div className="md:w-1/3 bg-[#f9f5f2] flex items-center justify-center p-8">
                <Calendar className="w-20 h-20 text-[var(--village-orange)]" />
              </div>
              <div className="p-6 md:w-2/3">
                <div className="text-sm text-[var(--village-orange)] uppercase tracking-wide mb-1">
                  {upcomingEvents[0].category}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{upcomingEvents[0].title}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{upcomingEvents[0].time}</span>
                </div>
                <p className="text-gray-700 mb-4">{upcomingEvents[0].description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Coming Soon</span>
                  <button className="px-4 py-2 bg-[var(--village-orange)]/20 text-[var(--village-orange)] rounded hover:bg-[var(--village-orange)]/30 transition-colors">
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Other Events Grid - Horizontally scrollable on mobile */}
          <div className="md:overflow-visible">
            <div
              ref={eventsScrollRef}
              className="overflow-x-auto hide-scrollbar md:overflow-visible -mx-6 px-6 md:mx-0 md:px-0"
              style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
            >
              <div className="flex md:grid md:grid-cols-3 gap-6 w-[900px] md:w-auto">
                {upcomingEvents.slice(1).map((event) => (
                  <motion.div
                    key={event.id}
                    className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 flex-shrink-0 w-[280px] md:w-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + event.id * 0.1 }}
                  >
                    <div className="p-6">
                      <div className="text-sm text-[var(--village-orange)] uppercase tracking-wide mb-1">
                        {event.category}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800">{event.title}</h3>
                      <p className="text-gray-700 mb-4">{event.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 font-medium">Coming Soon</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pagination dots - only visible on mobile */}
            <div className="flex justify-center mt-4 space-x-2 md:hidden">
              {upcomingEvents.slice(1).map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeEventIndex === index ? "bg-[var(--village-orange)] w-5" : "bg-gray-300"
                  }`}
                  onClick={() => scrollToEvent(index)}
                  aria-label={`View event ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex justify-center mt-2 md:hidden">
              <p className="text-sm text-gray-500 italic">Swipe to explore</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="#"
              className="inline-flex items-center px-6 py-3 bg-[var(--village-green)] text-white font-medium rounded-md hover:bg-[var(--village-green)]/90 transition-colors"
            >
              View All Events
            </Link>
          </div>
        </motion.div>

        {/* Community Values */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className={`text-3xl font-bold mb-12 text-center text-gray-800 ${inter.className}`}>
            Our Community Values
          </h2>

          {/* Desktop view - unchanged */}
          <div className="hidden md:grid md:grid-cols-3 gap-12">
            {communityValues.map((value, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <div className="text-[var(--village-orange)] mb-6">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Mobile view - carousel with buttons */}
          <div className="md:hidden">
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="flex flex-col items-center text-center">
                <div className="text-[var(--village-orange)] mb-6">{communityValues[activeValueIndex].icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{communityValues[activeValueIndex].title}</h3>
                <p className="text-gray-700">{communityValues[activeValueIndex].description}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setActiveValueIndex((prev) => (prev > 0 ? prev - 1 : communityValues.length - 1))}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-200"
                aria-label="Previous value"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>

              <div className="flex space-x-2">
                {communityValues.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      activeValueIndex === index ? "bg-[var(--village-orange)] w-5" : "bg-gray-300"
                    }`}
                    onClick={() => setActiveValueIndex(index)}
                    aria-label={`View value ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveValueIndex((prev) => (prev < communityValues.length - 1 ? prev + 1 : 0))}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-200"
                aria-label="Next value"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 transform rotate-180" />
              </button>
            </div>

            <div className="text-center mt-2">
              <p className="text-sm text-gray-500">
                <span className="font-medium">{activeValueIndex + 1}</span> of{" "}
                <span className="font-medium">{communityValues.length}</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Community Benefits */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h2 className={`text-3xl font-bold mb-12 text-center text-gray-800 ${inter.className}`}>
            Community Benefits
          </h2>

          <div className="md:overflow-visible">
            <div
              ref={benefitsScrollRef}
              className="overflow-x-auto hide-scrollbar md:overflow-visible -mx-6 px-6 md:mx-0 md:px-0"
              style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
            >
              <div className="flex md:grid md:grid-cols-4 gap-6 w-[1000px] md:w-auto">
                {communityBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-md border border-gray-100 h-full flex-shrink-0 w-[240px] md:w-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${benefit.color}20`, color: benefit.color }}
                    >
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">{benefit.title}</h3>
                    <p className="text-gray-700">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pagination dots - only visible on mobile */}
            <div className="flex justify-center mt-4 space-x-2 md:hidden">
              {communityBenefits.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeBenefitIndex === index ? "bg-[var(--village-orange)] w-5" : "bg-gray-300"
                  }`}
                  onClick={() => scrollToBenefit(index)}
                  aria-label={`View benefit ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex justify-center mt-2 md:hidden">
              <p className="text-sm text-gray-500 italic">Swipe to explore</p>
            </div>
          </div>
        </motion.div>

        {/* Testimonials with more classic, rounded quotation marks */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <h2 className={`text-3xl font-bold mb-12 text-center text-gray-800 ${inter.className}`}>Community Voices</h2>

          {/* Desktop view - unchanged grid layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={`desktop-${index}`}
                className="bg-white rounded-xl p-8 shadow-md border border-gray-100 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
              >
                {/* Classic, rounded quotation mark */}
                <div className="absolute -top-6 left-8 w-12 h-12 flex items-center justify-center rounded-full bg-[#f8f5f0]">
                  <span
                    className="text-[var(--village-orange)] text-4xl font-serif"
                    style={{
                      fontFamily: "Georgia, serif",
                      lineHeight: "1",
                      paddingBottom: "8px",
                    }}
                  >
                    "
                  </span>
                </div>
                <p className="text-gray-700 mb-6 pt-4 italic">{testimonial.quote}</p>
                <p className="text-gray-900 font-medium">{testimonial.author}</p>
              </motion.div>
            ))}
          </div>

          {/* Mobile view - horizontal scrollable row, hidden on desktop */}
          <div
            className="md:hidden w-full overflow-x-auto hide-scrollbar pb-6"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div className="flex space-x-6 px-4 w-max">
              {testimonials.map((testimonial, index) => (
                <div
                  key={`mobile-${index}`}
                  className="w-[280px] flex-shrink-0"
                  style={{
                    scrollSnapAlign: "center",
                    scrollSnapStop: "always",
                  }}
                >
                  <motion.div
                    className="bg-white rounded-xl p-8 shadow-md border border-gray-100 relative h-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                  >
                    {/* Classic, rounded quotation mark */}
                    <div className="absolute -top-6 left-8 w-12 h-12 flex items-center justify-center rounded-full bg-[#f8f5f0]">
                      <span
                        className="text-[var(--village-orange)] text-4xl font-serif"
                        style={{
                          fontFamily: "Georgia, serif",
                          lineHeight: "1",
                          paddingBottom: "8px",
                        }}
                      >
                        "
                      </span>
                    </div>
                    <p className="text-gray-700 mb-6 pt-4 italic">{testimonial.quote}</p>
                    <p className="text-gray-900 font-medium">{testimonial.author}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          {/* Add this right after the testimonials mobile container */}
          <div className="flex justify-center mt-2 md:hidden">
            <p className="text-sm text-gray-500 italic">Swipe to explore</p>
          </div>
        </motion.div>

        {/* Join the Community */}
        <motion.div
          className="text-center bg-[#f0e9df] rounded-xl p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <h2 className={`text-3xl font-bold mb-6 text-gray-800 ${inter.className}`}>Ready to Join Our Community?</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Experience the power of connection and collaboration. Book a tour today to see our spaces and learn more
            about becoming a member of The Village community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#booking-form"
              className="px-8 py-4 bg-[var(--village-green)] text-white font-medium rounded-md hover:bg-[var(--village-green)]/90 transition-colors text-lg"
            >
              Book a Tour
            </Link>
            <Link
              href="/coworking"
              className="px-8 py-4 border border-[var(--village-green)] text-[var(--village-green)] font-medium rounded-md hover:bg-[var(--village-green)]/10 transition-colors text-lg"
            >
              Ways to Join Us
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
