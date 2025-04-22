"use client"

import { useState, useEffect, useRef } from "react"
import {
  Check,
  Users,
  Maximize,
  Calendar,
  Coffee,
  Layers,
  Briefcase,
  Star,
  Zap,
  Video,
  Award,
  Music,
  MessageSquare,
  CreditCard,
  Building,
  UserPlus,
  Dumbbell,
  Utensils,
  Wifi,
} from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { spaces, officeOptions, coworkingOptions, eventSpacesData, meetingRoomOptions } from "@/data/spaces"
import ImageLightbox from "./ImageLightbox"

interface SpacesSectionProps {
  onEnquire?: (spaceName: string, spaceData: any) => void
  activeTab?: string | null
  activeSubTab?: string | null
}

export default function SpacesSection({ activeTab = null, activeSubTab = null, onEnquire }: SpacesSectionProps) {
  const [localActiveTab, setLocalActiveTab] = useState("offices")
  const [localActiveSubTab, setLocalActiveSubTab] = useState("director-office") // Changed default to director-office
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Add refs for scrollable containers
  const officesTabsRef = useRef<HTMLDivElement>(null)
  const coworkingTabsRef = useRef<HTMLDivElement>(null)
  const eventsTabsRef = useRef<HTMLDivElement>(null)
  const meetingRoomsTabsRef = useRef<HTMLDivElement>(null)

  // Update local state when props change
  useEffect(() => {
    if (activeTab) {
      setLocalActiveTab(activeTab)
    }
  }, [activeTab])

  useEffect(() => {
    if (activeSubTab) {
      setLocalActiveSubTab(activeSubTab)
    }
  }, [activeSubTab])

  // Add scroll behavior for tab containers
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const container = e.target as HTMLElement
      const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10

      // Find the parent container
      const parent = container.parentElement
      if (parent) {
        // Find the gradient element (last child)
        const gradient = parent.querySelector("div:last-child")
        if (gradient && gradient.classList.contains("bg-gradient-to-l")) {
          // Hide gradient when at the end of scroll
          gradient.classList.toggle("opacity-0", isAtEnd)
        }
      }
    }

    // Add scroll event listeners to all scroll containers
    const containers = document.querySelectorAll(".scroll-container")
    containers.forEach((container) => {
      container.addEventListener("scroll", handleScroll)
    })

    // Initial check
    containers.forEach((container) => {
      const isAtEnd =
        (container as HTMLElement).scrollLeft + (container as HTMLElement).clientWidth >=
        (container as HTMLElement).scrollWidth - 10
      const parent = container.parentElement
      if (parent) {
        const gradient = parent.querySelector("div:last-child")
        if (gradient && gradient.classList.contains("bg-gradient-to-l")) {
          gradient.classList.toggle("opacity-0", isAtEnd)
        }
      }
    })

    return () => {
      containers.forEach((container) => {
        container.removeEventListener("scroll", handleScroll)
      })
    }
  }, [localActiveTab])

  // Get current content based on active tab and sub-tab
  const getCurrentContent = () => {
    switch (localActiveTab) {
      case "coworking":
        return coworkingOptions[localActiveSubTab] || null
      case "offices":
        return officeOptions[localActiveSubTab] || null
      case "events":
        return eventSpacesData[localActiveSubTab] || null
      case "meeting-rooms":
        return meetingRoomOptions[localActiveSubTab] || null
      default:
        return null
    }
  }

  useEffect(() => {
    // Set default sub-tab when main tab changes
    switch (localActiveTab) {
      case "coworking":
        setLocalActiveSubTab(Object.keys(coworkingOptions)[0])
        break
      case "offices":
        setLocalActiveSubTab("director-office") // Set Director's Office as default
        break
      case "events":
        setLocalActiveSubTab("sports-hall") // Set Sports Hall as default
        break
      case "meeting-rooms":
        setLocalActiveSubTab(Object.keys(meetingRoomOptions)[0])
        break
    }
    setIsImageLoaded(false)
    setCurrentImageIndex(0)
  }, [localActiveTab])

  useEffect(() => {
    // Reset image index when sub-tab changes
    setCurrentImageIndex(0)
    setIsImageLoaded(false)
  }, [localActiveSubTab])

  const handleTabChange = (value: string) => {
    setLocalActiveTab(value)
    setIsImageLoaded(false)
  }

  const handleSubTabChange = (value: string) => {
    setLocalActiveSubTab(value)
    setIsImageLoaded(false)

    // Add this code to update the enquiry form when sub-tab changes
    const currentContent = getCurrentContentForSubTab(value)
    if (onEnquire && currentContent) {
      onEnquire(currentContent.title, {
        title: currentContent.title,
        description: currentContent.description,
        image: currentContent.image || (currentContent.images ? currentContent.images[0] : null),
        features: currentContent.features,
      })
    }
  }

  // Add this helper function to get content for a specific sub-tab
  const getCurrentContentForSubTab = (subTab: string) => {
    switch (localActiveTab) {
      case "coworking":
        return coworkingOptions[subTab] || null
      case "offices":
        return officeOptions[subTab] || null
      case "events":
        return eventSpacesData[subTab] || null
      case "meeting-rooms":
        return meetingRoomOptions[subTab] || null
      default:
        return null
    }
  }

  const scrollToBooking = () => {
    const bookingForm = document.getElementById("booking-form")
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleEnquire = () => {
    const currentContent = getCurrentContent()
    if (onEnquire && currentContent) {
      onEnquire(currentContent.title, {
        title: currentContent.title,
        description: currentContent.description,
        image: currentContent.image || (currentContent.images ? currentContent.images[0] : null),
        features: currentContent.features,
      })
    }

    // Scroll to booking form
    const bookingForm = document.getElementById("booking")
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: "smooth" })
    }
  }

  const currentContent = getCurrentContent()
  const activeColor = spaces[localActiveTab]?.color || "var(--village-orange)"

  // Get the image to display in the main card
  const getCardImage = () => {
    if (
      (localActiveTab === "meeting-rooms" ||
        (localActiveTab === "offices" && localActiveSubTab === "workshop-studio")) &&
      currentContent
    ) {
      const images = (currentContent as any).images
      if (images && images.length > 0) {
        return images[0]
      }
    } else if (localActiveTab === "events" && currentContent) {
      const images = (currentContent as any).images
      if (images && images.length > 0) {
        return images[0]
      }
    } else if (localActiveTab === "events" && currentContent) {
      const images = (currentContent as any).images
      if (images && images.length > 0) {
        return images[0]
      }
    }
    return currentContent?.image || "/placeholder.svg"
  }

  // Function to open the lightbox
  const openLightbox = (index: number) => {
    if (!currentContent) return

    // Determine which images to show in the lightbox
    let images: string[] = []
    if ((currentContent as any).images && (currentContent as any).images.length > 0) {
      images = (currentContent as any).images
    } else if (currentContent.image) {
      images = [currentContent.image]
    }

    if (images.length > 0) {
      setLightboxImages(images)
      setLightboxIndex(index)
      setLightboxOpen(true)
    }
  }

  return (
    <section id="spaces" className="py-20 bg-[#f8f5f0]">
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Custom scrollbar for mobile devices */
        @media (max-width: 768px) {
          .scrollbar-track {
            /* Show scrollbar on mobile */
            -ms-overflow-style: auto;
            scrollbar-width: auto;
          }

          .scrollbar-track::-webkit-scrollbar {
            display: block;
            height: 6px; /* Thicker scrollbar */
          }

          .scrollbar-track::-webkit-scrollbar-track {
            background: #f0f0f0;
            border-radius: 10px;
          }

          .scrollbar-track::-webkit-scrollbar-thumb {
            background: #c0c0c0;
            border-radius: 10px;
          }
        }

        /* Responsive scrollbar styles */
        @media (max-width: 768px) {
          .scroll-container {
            -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
            scroll-behavior: smooth;
            position: relative;
          }

          .scroll-container::-webkit-scrollbar-thumb {
            background: #c0c0c0;
            border-radius: 10px;
            transition: background-color 0.3s;
          }

          .scroll-container::-webkit-scrollbar-thumb:hover {
            background: #a0a0a0;
          }

          .scroll-container::-webkit-scrollbar-thumb:active {
            background: #808080;
          }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="w-full max-w-5xl mx-auto">
          {/* Sub-tabs section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={localActiveTab}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mb-8 mt-0"
            >
              {localActiveTab === "offices" && (
                <div className="relative">
                  <div
                    ref={officesTabsRef}
                    className="w-full flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-4 overflow-x-auto pb-4 px-2 -mx-2 scrollbar-track scroll-container"
                  >
                    {Object.keys(officeOptions).map((key) => (
                      <button
                        key={key}
                        onClick={() => handleSubTabChange(key)}
                        className={`px-4 py-1.5 text-base whitespace-nowrap transition-all border-b-2 flex-shrink-0 ${
                          localActiveSubTab === key
                            ? "text-gray-800 font-medium"
                            : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-200"
                        }`}
                        style={localActiveSubTab === key ? { borderColor: activeColor } : {}}
                      >
                        {officeOptions[key].title}
                      </button>
                    ))}
                  </div>
                  {/* Gradient fade for scrollable area */}
                  <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[#f8f5f0] to-transparent pointer-events-none md:hidden"></div>
                </div>
              )}

              {localActiveTab === "coworking" && (
                <div className="relative">
                  <div
                    ref={coworkingTabsRef}
                    className="w-full flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-4 overflow-x-auto pb-4 px-2 -mx-2 scrollbar-track scroll-container"
                  >
                    {Object.keys(coworkingOptions).map((key) => (
                      <button
                        key={key}
                        onClick={() => handleSubTabChange(key)}
                        className={`px-4 py-1.5 text-base whitespace-nowrap transition-all border-b-2 flex-shrink-0 ${
                          localActiveSubTab === key
                            ? "text-gray-800 font-medium"
                            : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-200"
                        }`}
                        style={localActiveSubTab === key ? { borderColor: activeColor } : {}}
                      >
                        {coworkingOptions[key].title}
                      </button>
                    ))}
                  </div>
                  {/* Gradient fade for scrollable area */}
                  <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[#f8f5f0] to-transparent pointer-events-none md:hidden"></div>
                </div>
              )}

              {localActiveTab === "events" && (
                <div className="relative">
                  <div
                    ref={eventsTabsRef}
                    className="w-full flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-4 overflow-x-auto pb-4 px-2 -mx-2 scrollbar-track scroll-container"
                  >
                    {Object.keys(eventSpacesData).map((key) => (
                      <button
                        key={key}
                        onClick={() => handleSubTabChange(key)}
                        className={`px-4 py-1.5 text-base whitespace-nowrap transition-all border-b-2 flex-shrink-0 ${
                          localActiveSubTab === key
                            ? "text-gray-800 font-medium"
                            : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-200"
                        }`}
                        style={localActiveSubTab === key ? { borderColor: activeColor } : {}}
                      >
                        {eventSpacesData[key].title}
                      </button>
                    ))}
                  </div>
                  {/* Gradient fade for scrollable area */}
                  <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[#f8f5f0] to-transparent pointer-events-none md:hidden"></div>
                </div>
              )}

              {localActiveTab === "meeting-rooms" && (
                <div className="relative">
                  <div
                    ref={meetingRoomsTabsRef}
                    className="w-full flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-4 overflow-x-auto pb-4 px-2 -mx-2 scrollbar-track scroll-container"
                  >
                    {Object.keys(meetingRoomOptions).map((key) => (
                      <button
                        key={key}
                        onClick={() => handleSubTabChange(key)}
                        className={`px-4 py-1.5 text-base whitespace-nowrap transition-all border-b-2 flex-shrink-0 ${
                          localActiveSubTab === key
                            ? "text-gray-800 font-medium"
                            : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-200"
                        }`}
                        style={localActiveSubTab === key ? { borderColor: activeColor } : {}}
                      >
                        {meetingRoomOptions[key].title}
                      </button>
                    ))}
                  </div>
                  {/* Gradient fade for scrollable area */}
                  <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[#f8f5f0] to-transparent pointer-events-none md:hidden"></div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Content for selected tab and option */}
          <AnimatePresence mode="wait">
            {currentContent && (
              <motion.div
                key={`${localActiveTab}-${localActiveSubTab}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div
                    className={`relative ${
                      localActiveTab === "offices" &&
                      (
                        localActiveSubTab === "innovation-studio" ||
                          localActiveSubTab === "team-office" ||
                          localActiveSubTab === "team-hub" ||
                          localActiveSubTab === "creative-labs" ||
                          localActiveSubTab === "education-suite"
                      )
                        ? "h-[400px] sm:h-[500px] md:h-[600px]"
                        : "h-[300px] sm:h-[400px] md:h-full"
                    }`}
                  >
                    <motion.div
                      key={`image-${currentImageIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 cursor-pointer"
                      onClick={() => openLightbox(currentImageIndex)}
                    >
                      <Image
                        src={
                          (currentContent as any).images && (currentContent as any).images.length > 0
                            ? (currentContent as any).images[currentImageIndex]
                            : currentContent.image || "/placeholder.svg"
                        }
                        alt={currentContent.title}
                        fill
                        className="object-cover"
                        onLoad={() => setIsImageLoaded(true)}
                      />
                      <div className="absolute bottom-3 left-3 bg-black/50 hover:bg-black/70 rounded-md p-1.5 transition-colors">
                        <Maximize className="w-4 h-4 text-white" />
                      </div>
                    </motion.div>

                    <div className="absolute top-4 left-4">
                      <Badge
                        className="text-white font-normal px-3 py-1 text-xs"
                        style={{ backgroundColor: spaces[localActiveTab].color }}
                      >
                        {currentContent.title}
                        {localActiveSubTab === "consultation-rooms" && (currentContent as any).images
                          ? ` - Room ${currentImageIndex + 1}`
                          : ""}
                        {(currentContent as any).popular && (
                          <span className="ml-2 bg-white text-[var(--village-teal)] px-1 rounded-sm text-[10px]">
                            POPULAR
                          </span>
                        )}
                      </Badge>
                    </div>

                    {/* Image navigation controls */}
                    {(currentContent as any).images && (currentContent as any).images.length > 1 && (
                      <>
                        {/* Left arrow */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setCurrentImageIndex((prev) =>
                              prev === 0 ? (currentContent as any).images.length - 1 : prev - 1,
                            )
                          }}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full p-1 shadow-sm transition-all"
                          aria-label="Previous image"
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15 18L9 12L15 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>

                        {/* Right arrow */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setCurrentImageIndex((prev) =>
                              prev === (currentContent as any).images.length - 1 ? 0 : prev + 1,
                            )
                          }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full p-1 shadow-sm transition-all"
                          aria-label="Next image"
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 6L15 12L9 18"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>

                        {/* Image counter */}
                        <div className="absolute bottom-3 right-3 bg-white/70 rounded-full px-2 py-0.5 text-xs font-medium text-gray-700">
                          {currentImageIndex + 1} / {(currentContent as any).images.length}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-medium mb-3 text-gray-800">{currentContent.title}</h3>

                    {/* Show price for coworking options */}
                    {localActiveTab === "coworking" && (currentContent as any).price && (
                      <div className="mb-3">
                        <span className="text-lg font-medium text-gray-700">{(currentContent as any).price}</span>
                        <span className="text-gray-500 ml-1 text-sm">{(currentContent as any).period}</span>
                      </div>
                    )}

                    <p className="text-gray-600 mb-6 leading-relaxed">{currentContent.description}</p>

                    {localActiveTab !== "coworking" && (
                      <div className="space-y-4 mb-6">
                        {currentContent.capacity.map((cap, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <Users size={18} className="text-gray-400" />
                            <span className="text-gray-700">
                              {cap.type}: <span className="font-medium">{cap.count}</span>
                            </span>
                          </div>
                        ))}

                        <div className="flex items-start gap-3">
                          <Maximize size={18} className="text-gray-400 mt-1 flex-shrink-0" />
                          <div className="text-gray-700">
                            <span className="font-medium">Dimensions:</span>
                            {localActiveSubTab === "consultation-rooms" ? (
                              <div className="mt-1 space-y-1">
                                <p className="text-sm">Room 1: 3.5m × 4m (14 sqm)</p>
                                <p className="text-sm">Room 2: 4.5m × 5.2m (23.4 sqm)</p>
                                <p className="text-sm">Room 3: 2.8m × 5.3m (14.84 sqm)</p>
                              </div>
                            ) : (
                              <span className="ml-1">{currentContent.dimensions}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className={`${localActiveTab === "coworking" ? "mb-8 mt-6" : "mb-8"}`}>
                      <h4
                        className={`${localActiveTab === "coworking" ? "text-lg font-semibold text-gray-800 mb-4" : "font-medium text-gray-800 mb-3"}`}
                      >
                        {localActiveTab === "coworking" ? "Membership Includes" : "Features"}
                      </h4>
                      <div
                        className={`grid grid-cols-1 ${localActiveTab === "coworking" ? "md:grid-cols-1 gap-y-3" : "md:grid-cols-2 gap-y-2 gap-x-4"}`}
                      >
                        {currentContent.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Check
                              className={`${localActiveTab === "coworking" ? "w-5 h-5 mt-0.5" : "w-4 h-4 mt-1"} flex-shrink-0 ${localActiveTab === "coworking" ? "text-green-500" : "text-gray-400"}`}
                            />

                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Moved buttons outside the card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`button-${localActiveTab}-${localActiveSubTab}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center mt-8 mb-8"
            >
              {currentContent &&
                (localActiveTab === "coworking" ? (
                  <Button
                    className="rounded-full px-10 py-7 text-white hover:opacity-90 transition-all text-xl font-medium shadow-lg hover:shadow-xl hover:scale-105"
                    style={{ backgroundColor: spaces[localActiveTab].color }}
                    onClick={handleEnquire}
                  >
                    {`Choose ${currentContent.title}`}
                  </Button>
                ) : (
                  <Button
                    className="rounded-full px-10 py-7 text-white hover:opacity-90 transition-all text-xl font-medium shadow-lg hover:shadow-xl hover:scale-105"
                    style={{ backgroundColor: spaces[localActiveTab].color }}
                    onClick={handleEnquire}
                  >
                    {localActiveTab === "offices" ? "Enquire Now" : spaces[localActiveTab].cta}
                  </Button>
                ))}
            </motion.div>
          </AnimatePresence>

          {/* Additional info cards - Airbnb-style */}

          <AnimatePresence mode="wait">
            <motion.div
              key={`ideal-for-${localActiveTab}-${localActiveSubTab}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16"
            >
              <div className="text-center mb-10">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Ideal for</h3>
                <div className="w-20 h-1 bg-gray-300 mx-auto rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
                {/* Staff Room */}
                {localActiveSubTab === "staff-room" && (
                  <>
                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-green)]/10 flex items-center justify-center flex-shrink-0">
                          <Coffee className="w-5 h-5 text-[var(--village-green)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">HR & People Teams</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Human resources professionals conducting team meetings, one-on-ones, and creating a comfortable
                        environment for staff discussions.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-teal)]/10 flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-[var(--village-teal)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Non-Profit Organizations</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Charities and community groups needing a welcoming space for volunteer meetings, training, and
                        collaborative planning sessions.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-orange)]/10 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-[var(--village-orange)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Education Professionals</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Teachers, tutors, and education consultants looking for a comfortable space for small group
                        sessions and planning meetings.
                      </p>
                    </motion.div>
                  </>
                )}

                {/* Dance Studio */}
                {localActiveSubTab === "dance-studio" && (
                  <>
                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-green)]/10 flex items-center justify-center flex-shrink-0">
                          <Music className="w-5 h-5 text-[var(--village-green)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Dance Instructors</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Professional dance teachers offering classes in ballet, contemporary, hip-hop, and other styles
                        in a purpose-built studio with mirrors and proper flooring.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-teal)]/10 flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-[var(--village-teal)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Fitness Professionals</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Yoga instructors, pilates teachers, and fitness trainers requiring a bright, clean space with
                        mirrors for movement-based classes and workshops.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-orange)]/10 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-[var(--village-orange)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Performing Arts Groups</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Theater companies, dance troupes, and performance artists needing rehearsal space with mirrors
                        for movement work and choreography development.
                      </p>
                    </motion.div>
                  </>
                )}

                {/* Education Suite */}
                {localActiveSubTab === "education-suite" && (
                  <>
                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-green)]/10 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-[var(--village-green)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Training Providers</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Professional development specialists and corporate trainers delivering structured courses,
                        workshops, and certification programs in a traditional classroom setting.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-teal)]/10 flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-[var(--village-teal)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Educational Institutions</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Schools, colleges, and educational organizations requiring additional classroom space for
                        specialized courses, adult education, and continuing professional development.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-orange)]/10 flex items-center justify-center flex-shrink-0">
                          <Layers className="w-5 h-5 text-[var(--village-orange)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Professional Certification</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Organizations offering professional certifications, exam preparation, and structured learning
                        programs requiring a formal classroom environment with presentation capabilities.
                      </p>
                    </motion.div>
                  </>
                )}

                {/* Director's Office */}
                {localActiveSubTab === "director-office" && (
                  <>
                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-green)]/10 flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-5 h-5 text-[var(--village-green)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Legal Professionals</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Solicitors, barristers, and legal consultants who need a prestigious space for client meetings
                        and confidential work.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-teal)]/10 flex items-center justify-center flex-shrink-0">
                          <Star className="w-5 h-5 text-[var(--village-teal)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Financial Advisors</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Wealth managers, financial planners, and investment consultants requiring a premium environment
                        to meet with high-value clients.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-orange)]/10 flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-[var(--village-orange)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Executive Coaches</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Leadership coaches and business mentors who need an impressive space for one-on-one coaching
                        sessions and small group workshops.
                      </p>
                    </motion.div>
                  </>
                )}

                {/* Creative Labs */}
                {localActiveSubTab === "creative-labs" && (
                  <>
                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-green)]/10 flex items-center justify-center flex-shrink-0">
                          <Zap className="w-5 h-5 text-[var(--village-green)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Design Studios</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Graphic designers, UX/UI teams, and creative agencies needing specialized workspace for
                        collaborative design projects.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-teal)]/10 flex items-center justify-center flex-shrink-0">
                          <Video className="w-5 h-5 text-[var(--village-teal)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Media Production</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Content creators, videographers, and podcast producers requiring adaptable space with equipment
                        areas and creative flexibility.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-orange)]/10 flex items-center justify-center flex-shrink-0">
                          <Award className="w-5 h-5 text-[var(--village-orange)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Tech Startups</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Software developers, product teams, and tech entrepreneurs who need flexible space for
                        prototyping and innovation.
                      </p>
                    </motion.div>
                  </>
                )}

                {/* Consultation Rooms */}
                {localActiveSubTab === "consultation-rooms" && (
                  <>
                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-green)]/10 flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="w-5 h-5 text-[var(--village-green)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Therapists & Counselors</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Mental health professionals, psychologists, and counselors requiring private, comfortable spaces
                        for client sessions.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-teal)]/10 flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-5 h-5 text-[var(--village-teal)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Recruitment Consultants</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        HR recruiters and talent acquisition specialists conducting interviews and confidential
                        candidate meetings.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-orange)]/10 flex items-center justify-center flex-shrink-0">
                          <CreditCard className="w-5 h-5 text-[var(--village-orange)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Financial Consultants</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Accountants, tax advisors, and financial planners needing professional space for private client
                        consultations.
                      </p>
                    </motion.div>
                  </>
                )}

                {/* Training Rooms */}
                {localActiveSubTab === "training-rooms" && (
                  <>
                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-green)]/10 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-[var(--village-green)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Corporate Trainers</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Professional development specialists and corporate trainers delivering workshops and
                        certification programs.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-teal)]/10 flex items-center justify-center flex-shrink-0">
                          <Layers className="w-5 h-5 text-[var(--village-teal)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Tech Education</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Coding bootcamps, software training providers, and digital skills educators requiring equipped
                        learning spaces.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-orange)]/10 flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-[var(--village-orange)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Language Schools</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Language tutors and educational providers conducting classes, conversation groups, and
                        interactive learning sessions.
                      </p>
                    </motion.div>
                  </>
                )}

                {/* Team Office */}
                {localActiveSubTab === "team-office" && (
                  <>
                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-green)]/10 flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-5 h-5 text-[var(--village-green)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Marketing Agencies</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Digital marketing teams, PR firms, and creative agencies needing collaborative space for
                        campaigns and client work.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-teal)]/10 flex items-center justify-center flex-shrink-0">
                          <Layers className="w-5 h-5 text-[var(--village-teal)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Software Development</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Development teams, QA specialists, and product managers requiring dedicated workspace for agile
                        projects.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-orange)]/10 flex items-center justify-center flex-shrink-0">
                          <CreditCard className="w-5 h-5 text-[var(--village-orange)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Financial Services</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Accounting teams, bookkeepers, and financial analysts who need a professional environment with
                        privacy and security.
                      </p>
                    </motion.div>
                  </>
                )}

                {/* Innovation Studio */}
                {localActiveSubTab === "innovation-studio" && (
                  <>
                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-green)]/10 flex items-center justify-center flex-shrink-0">
                          <Zap className="w-5 h-5 text-[var(--village-green)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Product Design Teams</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Industrial designers, product developers, and innovation specialists needing versatile space for
                        ideation and prototyping.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-teal)]/10 flex items-center justify-center flex-shrink-0">
                          <Award className="w-5 h-5 text-[var(--village-teal)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Creative Consultancies</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Innovation consultants, design thinking facilitators, and creative strategists running workshops
                        and client sessions.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-orange)]/10 flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-[var(--village-orange)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Research Teams</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Market researchers, UX researchers, and academic teams conducting collaborative studies and
                        analysis sessions.
                      </p>
                    </motion.div>
                  </>
                )}

                {/* Workshop Studio */}
                {localActiveSubTab === "workshop-studio" && (
                  <>
                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-green)]/10 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-[var(--village-green)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Workshop Facilitators</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Professional trainers and facilitators running interactive workshops, design sprints, and
                        collaborative sessions.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-teal)]/10 flex items-center justify-center flex-shrink-0">
                          <Zap className="w-5 h-5 text-[var(--village-teal)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Creative Educators</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Art instructors, craft teachers, and creative skills educators needing bright, inspiring space
                        with practical work areas.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-orange)]/10 flex items-center justify-center flex-shrink-0">
                          <Video className="w-5 h-5 text-[var(--village-orange)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Digital Content Creators</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Photographers, videographers, and content producers utilizing the natural light and versatile
                        space for shoots and editing.
                      </p>
                    </motion.div>
                  </>
                )}

                {/* Executive Suite */}
                {localActiveSubTab === "executive-suite" && (
                  <>
                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-green)]/10 flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-5 h-5 text-[var(--village-green)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Investment Firms</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Investment managers, private equity teams, and financial advisors requiring premium space with
                        privacy and prestige.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-teal)]/10 flex items-center justify-center flex-shrink-0">
                          <Building className="w-5 h-5 text-[var(--village-teal)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Property Consultants</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Real estate professionals, property developers, and architectural firms needing impressive space
                        for client meetings and planning.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-orange)]/10 flex items-center justify-center flex-shrink-0">
                          <Star className="w-5 h-5 text-[var(--village-orange)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Legal Practices</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Law firms, legal consultants, and corporate legal teams requiring professional environment with
                        meeting facilities and privacy.
                      </p>
                    </motion.div>
                  </>
                )}

                {/* Team Hub */}
                {localActiveSubTab === "team-hub" && (
                  <>
                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-green)]/10 flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-[var(--village-green)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Project Management Teams</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Project managers, coordinators, and delivery teams needing combined individual workspaces and
                        collaborative meeting areas.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-teal)]/10 flex items-center justify-center flex-shrink-0">
                          <Layers className="w-5 h-5 text-[var(--village-teal)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Digital Agencies</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Web development teams, digital designers, and content creators who need a structured environment
                        with both individual and team spaces.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-orange)]/10 flex items-center justify-center flex-shrink-0">
                          <Zap className="w-5 h-5 text-[var(--village-orange)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Tech Startups</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Growing tech companies and software startups requiring flexible workspace that can accommodate
                        both focused work and team collaboration.
                      </p>
                    </motion.div>
                  </>
                )}

                {/* Community Membership */}
                {localActiveSubTab === "community" && (
                  <>
                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-green)]/10 flex items-center justify-center flex-shrink-0">
                          <Coffee className="w-5 h-5 text-[var(--village-green)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Freelance Creatives</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Graphic designers, copywriters, and creative professionals who need occasional workspace and
                        community connections.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-teal)]/10 flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-[var(--village-teal)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Consultants</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Business consultants, coaches, and advisors who primarily work at client sites but need
                        professional space for meetings and networking.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-orange)]/10 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-[var(--village-orange)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Part-time Entrepreneurs</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Side-hustlers, early-stage founders, and entrepreneurs building businesses while maintaining
                        other commitments.
                      </p>
                    </motion.div>
                  </>
                )}

                {/* Flex Membership */}
                {localActiveSubTab === "flex" && (
                  <>
                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-green)]/10 flex items-center justify-center flex-shrink-0">
                          <Wifi className="w-5 h-5 text-[var(--village-green)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Content Creators</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Writers, bloggers, and digital content specialists who need reliable workspace with professional
                        amenities and networking opportunities.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-teal)]/10 flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-5 h-5 text-[var(--village-teal)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Sales Professionals</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Account managers, sales representatives, and business development specialists who split time
                        between client visits and office work.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-orange)]/10 flex items-center justify-center flex-shrink-0">
                          <Zap className="w-5 h-5 text-[var(--village-orange)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Tech Freelancers</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Developers, designers, and digital specialists who need professional workspace with reliable
                        infrastructure and meeting facilities.
                      </p>
                    </motion.div>
                  </>
                )}

                {/* Dedicated Membership */}
                {localActiveSubTab === "dedicated" && (
                  <>
                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-green)]/10 flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-5 h-5 text-[var(--village-green)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Independent Professionals</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Architects, designers, and consultants who need a consistent, professional workspace with their
                        own dedicated area.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-teal)]/10 flex items-center justify-center flex-shrink-0">
                          <Layers className="w-5 h-5 text-[var(--village-teal)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Remote Executives</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Senior managers and executives working remotely who need a professional, reliable workspace
                        separate from home.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-orange)]/10 flex items-center justify-center flex-shrink-0">
                          <CreditCard className="w-5 h-5 text-[var(--village-orange)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Financial Advisors</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Independent financial planners, accountants, and advisors who need a professional base with
                        privacy and meeting facilities.
                      </p>
                    </motion.div>
                  </>
                )}

                {/* Team Plan */}
                {localActiveSubTab === "team-plan" && (
                  <>
                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-green)]/10 flex items-center justify-center flex-shrink-0">
                          <UserPlus className="w-5 h-5 text-[var(--village-green)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Creative Studios</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Small design agencies, production teams, and creative studios needing flexible space for their
                        rotating team members.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-teal)]/10 flex items-center justify-center flex-shrink-0">
                          <Zap className="w-5 h-5 text-[var(--village-teal)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Tech Startups</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Early-stage startups and tech companies with small teams needing professional workspace without
                        the commitment of a private office.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-orange)]/10 flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-[var(--village-orange)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Professional Services</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Small consulting firms, legal practices, and professional service teams needing shared workspace
                        with meeting facilities.
                      </p>
                    </motion.div>
                  </>
                )}

                {/* Sports Hall */}
                {localActiveSubTab === "sports-hall" && (
                  <>
                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-green)]/10 flex items-center justify-center flex-shrink-0">
                          <Dumbbell className="w-5 h-5 text-[var(--village-green)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Sports Clubs</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Basketball teams, volleyball clubs, and indoor sports organizations needing professional
                        facilities for training and competitions.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-teal)]/10 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-[var(--village-teal)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Exhibition Organizers</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Trade show planners, art exhibition curators, and event organizers requiring large, versatile
                        space with excellent lighting.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-orange)]/10 flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-[var(--village-orange)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Corporate Event Planners</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Event management companies organizing large-scale corporate gatherings, product launches, and
                        team-building activities.
                      </p>
                    </motion.div>
                  </>
                )}

                {/* Main Hall */}
                {localActiveSubTab === "main-hall" && (
                  <>
                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-green)]/10 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-[var(--village-green)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Conference Organizers</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Professional conference planners, industry associations, and event companies hosting formal
                        presentations and speaker events.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-teal)]/10 flex items-center justify-center flex-shrink-0">
                          <Video className="w-5 h-5 text-[var(--village-teal)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Performing Arts</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Theater companies, dance troupes, and musical ensembles requiring performance space with
                        excellent acoustics and stage area.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-orange)]/10 flex items-center justify-center flex-shrink-0">
                          <Award className="w-5 h-5 text-[var(--village-orange)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Award Ceremonies</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Organizations hosting recognition events, graduation ceremonies, and formal presentations in an
                        elegant setting.
                      </p>
                    </motion.div>
                  </>
                )}

                {/* Dining Hall */}
                {localActiveSubTab === "dining-hall" && (
                  <>
                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-green)]/10 flex items-center justify-center flex-shrink-0">
                          <Utensils className="w-5 h-5 text-[var(--village-green)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Catering Companies</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Catering businesses, food service providers, and event planners requiring elegant dining space
                        with kitchen access.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-teal)]/10 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-[var(--village-teal)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Gala Organizers</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Charity fundraisers, gala dinners, and formal events requiring a sophisticated dining venue with
                        historic character.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-orange)]/10 flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-[var(--village-orange)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Corporate Functions</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Business luncheons, company celebrations, and corporate dining events requiring an elegant
                        setting with original features.
                      </p>
                    </motion.div>
                  </>
                )}

                {/* Old Gym */}
                {localActiveSubTab === "old-gym" && (
                  <>
                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-green)]/10 flex items-center justify-center flex-shrink-0">
                          <Maximize className="w-5 h-5 text-[var(--village-green)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Wellness Instructors</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Yoga teachers, fitness instructors, and wellness practitioners requiring intimate space for
                        classes and workshops.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-teal)]/10 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-[var(--village-teal)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Workshop Facilitators</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Training providers, educational workshops, and small group sessions requiring a cozy, focused
                        environment.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-orange)]/10 flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-[var(--village-orange)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Community Groups</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Local organizations, hobby clubs, and community initiatives requiring affordable, versatile
                        space for gatherings.
                      </p>
                    </motion.div>
                  </>
                )}

                {/* Boardroom */}
                {localActiveSubTab === "boardroom" && (
                  <>
                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-green)]/10 flex items-center justify-center flex-shrink-0">
                          <Video className="w-5 h-5 text-[var(--village-green)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Executive Teams</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Leadership teams, board meetings, and executive discussions requiring premium facilities and
                        professional atmosphere.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-teal)]/10 flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-5 h-5 text-[var(--village-teal)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Client Presentations</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Sales teams, account managers, and business development professionals presenting to important
                        clients and stakeholders.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-orange)]/10 flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-[var(--village-orange)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Strategy Sessions</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Planning teams, strategic discussions, and focused decision-making meetings requiring privacy
                        and professional tools.
                      </p>
                    </motion.div>
                  </>
                )}

                {/* Conference Room */}
                {localActiveSubTab === "conference-room" && (
                  <>
                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-green)]/10 flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-[var(--village-green)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Team Workshops</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Department meetings, team-building sessions, and collaborative workshops requiring space for
                        larger groups.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-teal)]/10 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-[var(--village-teal)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Training Sessions</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Corporate training, professional development, and educational programs requiring flexible
                        seating and presentation facilities.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--village-orange)]/10 flex items-center justify-center flex-shrink-0">
                          <Video className="w-5 h-5 text-[var(--village-orange)]" />
                        </div>
                        <h4 className="font-medium text-gray-800">Hybrid Meetings</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Organizations conducting meetings with both in-person and remote participants requiring quality
                        AV equipment and connectivity.
                      </p>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      ;
      <ImageLightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(index) => setLightboxIndex(index)}
      />
    </section>
  )
}
