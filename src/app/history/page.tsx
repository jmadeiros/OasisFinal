"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Clock, Home, School, Users } from "lucide-react"
import Link from "next/link"
import { inter } from "../fonts"
import { useState } from "react"

// Add CSS for hiding scrollbars
const hideScrollbarStyle = `
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`

export default function HistoryPage() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)

  const timelineEvents = [
    {
      year: "1846",
      title: "Berry House",
      description:
        "The site was originally built as Berry House, a grand private residence in Tulse Hill designed in the Italianate Classical style.",
      color: "var(--village-green)",
      image: "/images/berry-house-historical.png",
      imageCaption: "Berry House, a grand private residence in Tulse Hill with horse-drawn carriage, circa 1846",
    },
    {
      year: "1912",
      title: "Silwood House",
      description:
        "The property was purchased by St Martin-in-the-Fields High School for Girls, beginning its transformation into an educational institution.",
      color: "var(--village-teal)",
      image: "/images/silwood-house-1912.png",
      imageCaption: "Formal ceremony at Silwood House after purchase by St Martin's School, 1912",
    },
    {
      year: "1928",
      title: "St Martin's School",
      description:
        "The new St Martin-in-the-Fields High School for Girls officially opened its doors, becoming a pillar of education in South London.",
      color: "var(--village-orange)",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0XsYfFAGLxiabdjWColvdxG3sQK2Jk.png",
      imageCaption: "Teaching staff at St Martin's in the Field, Girls High School, Tulse Hill.",
    },
    {
      year: "2025",
      title: "The Village",
      description:
        "The Village offers flexible community spaces, mentorship programs, and continues the legacy of community service in a new form.",
      color: "var(--village-gold)",
      image: "/images/the-village-today.png",
      imageCaption: "The Village community workspace today, housed in the historic building",
    },
  ]

  // Group timeline events into sections
  const timelineSections = [
    {
      title: "The Beginning",
      events: timelineEvents.slice(0, 2),
    },
    {
      title: "The Transformation",
      events: timelineEvents.slice(2),
    },
  ]

  // Journey highlights for the interactive elements
  const journeyHighlights = [
    {
      icon: <Home className="w-6 h-6" />,
      title: "Grand Residence",
      year: "1846",
      description: "Originally built as Berry House, a private residence in the Italianate Classical style",
      color: "var(--village-green)",
    },
    {
      icon: <School className="w-6 h-6" />,
      title: "Educational Institution",
      year: "1928",
      description: "Transformed into St Martin-in-the-Fields High School for Girls",
      color: "var(--village-teal)",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Hub",
      year: "2025",
      description: "Evolved into The Village, a vibrant community workspace",
      color: "var(--village-gold)",
    },
  ]

  return (
    <main className="min-h-screen bg-[#f8f5f0]">
      {/* Add the style tag */}
      <style jsx global>{hideScrollbarStyle}</style>
      
      {/* Header with colored background */}
      <div className="w-full pt-16 pb-6 md:pt-20 md:pb-8 bg-[#f0e9df]">
        <div className="container mx-auto px-6 md:px-12">
          <Link
            href="/"
            className="inline-flex items-center text-gray-700 hover:text-[var(--village-green)] transition-colors mb-12 group"
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

          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className={`text-5xl md:text-6xl font-bold ${inter.className} inline-flex items-center justify-center`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="relative inline-flex items-center">
                <motion.div
                  className="w-28 h-28 md:w-36 md:h-36 relative -mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 15,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-fJZWLjySaEDfGMct34TJUuNzNWxe9t.png"
                    alt="O"
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                <span className="-ml-2 md:-ml-4">ur Story</span>
              </span>
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Interactive journey highlights - Desktop version */}
      <div className="container mx-auto px-6 md:px-12 pt-8 pb-4 hidden md:block">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-row justify-between items-center gap-6 mb-8">
            {journeyHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="relative group bg-white/50 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center text-center w-1/3 cursor-pointer shadow-sm"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div
                  className="mb-2 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: highlight.color }}
                >
                  {highlight.icon}
                </div>
                <h3 className="text-lg font-semibold mb-1" style={{ color: highlight.color }}>
                  {highlight.title}
                </h3>
                <div className="text-sm text-gray-500 mb-2">{highlight.year}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive journey highlights - Mobile version with horizontal scroll */}
      <div className="md:hidden container mx-auto px-0 pt-8 pb-6 overflow-x-auto hide-scrollbar">
        <div className="pl-6 flex space-x-4 w-max pb-4">
          {journeyHighlights.map((highlight, index) => (
            <motion.div
              key={index}
              className="relative group bg-white/50 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center text-center w-[220px] flex-shrink-0 shadow-sm"
              whileTap={{ scale: 0.98 }}
            >
              <div
                className="mb-2"
                style={{ color: highlight.color }}
              >
                {highlight.icon}
              </div>
              <h3 className="text-base font-semibold mb-1" style={{ color: highlight.color }}>
                {highlight.title}
              </h3>
              <div className="text-sm text-gray-500 mb-2">{highlight.year}</div>
              <p className="text-xs text-gray-600">{highlight.description}</p>
            </motion.div>
          ))}
        </div>
        {/* Swipe indicator */}
        <div className="flex justify-center items-center mt-2 text-gray-500 text-sm">
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

      {/* Paragraph section */}
      <div className="container mx-auto px-6 md:px-12 pb-10">
        <div className="max-w-4xl mx-auto">
          <motion.p
            className="text-xl text-gray-700 max-w-3xl mx-auto text-center leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            The rich history of The Village spans over 150 years, from a grand private residence to a place for the
            community to meet, work, play and thrive. This historic building has witnessed generations of change,
            evolving from an elegant Victorian home to an educational institution, and now into a vibrant community hub
            that honors its legacy while embracing the future.
          </motion.p>

          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 text-[var(--village-green)] font-medium">
              <Clock className="w-4 h-4" />
              <span>Scroll down to explore our timeline</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Timeline - Desktop version (hidden on mobile) */}
          <div className="relative mb-16 p-8 md:p-12 hidden md:block">
            {timelineSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-20">
                {/* Section title */}
                <div className="text-center mb-12 relative">
                  <h2 className="text-2xl font-bold text-gray-800 inline-block px-8 bg-[#f8f5f0] relative z-10">
                    {section.title}
                  </h2>

                  {/* Vertical line for this section - starts below the section title */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-12 bottom-0 w-0.5 bg-gray-300"></div>
                </div>

                {/* Timeline events */}
                <div className="relative">
                  {/* Vertical line continuation for events */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-300"></div>

                  {section.events.map((event, eventIndex) => {
                    const isEven = eventIndex % 2 === 0

                    return (
                      <motion.div
                        key={eventIndex}
                        className="relative mb-16 flex items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + eventIndex * 0.1 }}
                      >
                        {/* Center dot */}
                        <div
                          className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white z-10"
                          style={{ backgroundColor: event.color }}
                        ></div>

                        {/* Left side - Image or Text */}
                        <div className="w-1/2 pr-8 flex justify-end">
                          {isEven ? (
                            <div className="max-w-xs">
                              <div
                                className="inline-block px-4 py-1 rounded-full text-white text-lg font-medium mb-3"
                                style={{ backgroundColor: event.color }}
                              >
                                {event.year}
                              </div>
                              <h3 className="text-xl font-medium text-gray-800 mb-2">{event.title}</h3>
                              <p className="text-gray-700">{event.description}</p>
                            </div>
                          ) : (
                            <div className="w-full max-w-xs relative group">
                              <div className="overflow-hidden rounded-lg h-48">
                                <img
                                  src={event.image || "/placeholder.svg"}
                                  alt={event.title}
                                  className="w-full h-full object-cover object-center"
                                />
                              </div>
                              <div className="absolute top-full left-0 right-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                <div className="p-2 rounded-lg mt-2 text-xs border shadow-sm text-gray-700 bg-[#f0e9df]">
                                  {event.imageCaption}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Right side - Text or Image */}
                        <div className="w-1/2 pl-8">
                          {isEven ? (
                            <div className="w-full max-w-xs relative group">
                              <div className="overflow-hidden rounded-lg h-48">
                                <img
                                  src={event.image || "/placeholder.svg"}
                                  alt={event.title}
                                  className="w-full h-full object-cover object-center"
                                />
                              </div>
                              <div className="absolute top-full left-0 right-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                <div className="p-2 rounded-lg mt-2 text-xs border shadow-sm text-gray-700 bg-[#f0e9df]">
                                  {event.imageCaption}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="max-w-xs">
                              <div
                                className="inline-block px-4 py-1 rounded-full text-white text-lg font-medium mb-3"
                                style={{ backgroundColor: event.color }}
                              >
                                {event.year}
                              </div>
                              <h3 className="text-xl font-medium text-gray-800 mb-2">{event.title}</h3>
                              <p className="text-gray-700">{event.description}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Timeline - vertical card layout (shown only on mobile) */}
          <div className="md:hidden mb-16">
            {timelineSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-12">
                {/* Section title */}
                <div className="text-center mb-8 relative">
                  <h2 className="text-2xl font-bold text-gray-800 inline-block px-8 bg-[#f8f5f0] relative z-10">
                    {section.title}
                  </h2>
                  
                  {/* Horizontal line below section title */}
                  <div className="w-full h-px bg-gray-300 mt-4"></div>
                </div>
                
                {/* Mobile timeline events */}
                <div className="space-y-10 relative">
                  {/* Vertical line for mobile */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                  
                  {section.events.map((event, eventIndex) => (
                    <motion.div
                      key={eventIndex}
                      className="relative pl-12"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + eventIndex * 0.1 }}
                    >
                      {/* Timeline dot */}
                      <div
                        className="absolute left-2 top-1 transform -translate-x-1/2 w-5 h-5 rounded-full border-3 border-white z-10"
                        style={{ backgroundColor: event.color }}
                      ></div>
                      
                      {/* Year indicator */}
                      <div
                        className="inline-block px-3 py-1 rounded-full text-white text-base font-medium mb-2"
                        style={{ backgroundColor: event.color }}
                      >
                        {event.year}
                      </div>
                      
                      {/* Card content */}
                      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">{event.title}</h3>
                        <p className="text-gray-700 text-sm mb-4">{event.description}</p>
                        
                        {/* Image */}
                        <div className="overflow-hidden rounded-lg h-36 mb-2">
                          <img
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        
                        {/* Image caption always visible on mobile */}
                        <div className="text-xs text-gray-600 italic">{event.imageCaption}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <motion.div
            className="text-center mb-12 bg-[#f0e9df] p-8 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <p className="text-lg text-gray-700 leading-relaxed">
              Today, The Village continues to honor its rich history while creating new opportunities for the community.
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Link
              href="/book-tour"
              className="px-6 py-3 bg-[var(--village-green)] text-white font-medium rounded-md hover:bg-[var(--village-green)]/90 transition-colors"
            >
              Book a Tour
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
