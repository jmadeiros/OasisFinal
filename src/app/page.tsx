"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import IntroSection from "@/components/IntroSection"
import BuiltForCommunity from "@/components/BuiltForCommunity"
import DynamicFrameLayout from "@/components/DynamicFrameLayout"
import SpaceCategories from "@/components/SpaceCategories"
import SpacesSection from "@/components/SpacesSection"
import ContactSection from "@/components/ContactSection"
import BookingForm from "@/components/BookingForm"
import Partners from "@/components/Partners"
import VillageInfoCards from "@/components/VillageInfoCards"
import DebugLogger from "@/components/DebugLogger"
import { officeOptions, coworkingOptions, eventSpacesData, meetingRoomOptions } from "@/data/spaces"

// Define a type for the space data to avoid using 'any'
interface SpaceData {
  title: string
  description: string
  image?: string
  images?: string[]
  features?: string[]
  [key: string]: any // For other potential properties
}

// Create a type for the indexes of each option object
type OfficeOptionKey = keyof typeof officeOptions
type CoworkingOptionKey = keyof typeof coworkingOptions
type EventSpacesDataKey = keyof typeof eventSpacesData
type MeetingRoomOptionKey = keyof typeof meetingRoomOptions

export default function Home() {
  useEffect(() => {
    console.log("Home component mounted")

    // Log the DOM structure to understand where elements are positioned
    setTimeout(() => {
      console.log("DOM structure after render:")
      console.log("frames-section:", document.getElementById("frames-section"))
      console.log("space-categories:", document.getElementById("space-categories"))
      console.log("spaces:", document.getElementById("spaces"))

      // Look for any "Our Spaces" text
      const elements = document.querySelectorAll("h2")
      elements.forEach((el) => {
        if (el.textContent?.includes("Explore Our Spaces")) {
          console.log("Found 'Explore Our Spaces' title:", el)
          console.log("Parent:", el.parentElement)
        }
      })
    }, 1000)
  }, [])

  const [selectedSpace, setSelectedSpace] = useState<string | null>(null)
  const [selectedSpaceData, setSelectedSpaceData] = useState<SpaceData | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(true)
  const [activeSpaceTab, setActiveSpaceTab] = useState<string | null>("offices")
  const [activeSpaceSubTab, setActiveSpaceSubTab] = useState<string | null>("creative-labs")

  const framesRef = useRef<HTMLDivElement>(null)
  const spacesSectionRef = useRef<HTMLDivElement>(null)
  const spaceCategoriesRef = useRef<HTMLDivElement>(null)

  // Animation variants for the title
  const titleContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const titleWord = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  // Scroll to frames section
  const scrollToFrames = () => {
    const framesSection = document.getElementById("frames-section")
    if (framesSection) {
      framesSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Map frame labels to space tabs and subtabs
  const mapFrameToSpaceTab = (label: string): { tab: string; subTab: string | null } => {
    switch (label) {
      case "Offices":
        return { tab: "offices", subTab: "creative-labs" }
      case "Co-working":
        return { tab: "coworking", subTab: "hot-desk" }
      case "Event Rooms":
        return { tab: "events", subTab: "main-hall" }
      case "Community Spaces":
        return { tab: "events", subTab: "sports-hall" }
      default:
        return { tab: "offices", subTab: "creative-labs" }
    }
  }

  // Handle frame selection
  const handleFrameSelect = (spaceName: string) => {
    setSelectedSpace(spaceName)

    // Map the frame label to the appropriate space tab and subtab
    const { tab, subTab } = mapFrameToSpaceTab(spaceName)
    setActiveSpaceTab(tab)
    setActiveSpaceSubTab(subTab)

    // Scroll to the space categories section
    const spaceCategoriesSection = document.getElementById("space-categories")
    if (spaceCategoriesSection) {
      spaceCategoriesSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Update the handleCategorySelect function to also update the enquiry form
  const handleCategorySelect = (category: string, subCategory: string | null) => {
    console.log("Category selected:", category, subCategory)

    // Update the active tab and sub-tab
    setActiveSpaceTab(category)

    // Set a default sub-tab based on the category if none is provided
    let defaultSubCategory = subCategory
    if (!defaultSubCategory) {
      // Default sub-tabs for each category
      switch (category) {
        case "offices":
          defaultSubCategory = "director-office" // Set Director's Office as default
          break
        case "coworking":
          defaultSubCategory = "community"
          break
        case "events":
          defaultSubCategory = "main-hall"
          break
        case "meeting-rooms":
          defaultSubCategory = "boardroom"
          break
        default:
          defaultSubCategory = null
      }
    }

    setActiveSpaceSubTab(defaultSubCategory)

    // Get the default space data for the enquiry form
    let spaceData = null
    let spaceName = ""

    if (category && defaultSubCategory) {
      switch (category) {
        case "offices":
          if (officeOptions && defaultSubCategory in officeOptions) {
            const key = defaultSubCategory as OfficeOptionKey
            spaceData = officeOptions[key]
            spaceName = spaceData.title
          }
          break
        case "coworking":
          if (coworkingOptions && defaultSubCategory in coworkingOptions) {
            const key = defaultSubCategory as CoworkingOptionKey
            spaceData = coworkingOptions[key]
            spaceName = spaceData.title
          }
          break
        case "events":
          if (eventSpacesData && defaultSubCategory in eventSpacesData) {
            const key = defaultSubCategory as EventSpacesDataKey
            spaceData = eventSpacesData[key]
            spaceName = spaceData.title
          }
          break
        case "meeting-rooms":
          if (meetingRoomOptions && defaultSubCategory in meetingRoomOptions) {
            const key = defaultSubCategory as MeetingRoomOptionKey
            spaceData = meetingRoomOptions[key]
            spaceName = spaceData.title
          }
          break
      }

      // Update the enquiry form if we have valid space data
      if (spaceData) {
        setSelectedSpace(spaceName)
        setSelectedSpaceData({
          title: spaceName,
          description: spaceData.description,
          image: spaceData.image || (spaceData.images && spaceData.images.length > 0 ? spaceData.images[0] : undefined),
          features: spaceData.features,
        })
        setShowBookingForm(true)
      }
    }

    // Scroll to the spaces section with an offset to keep categories visible
    setTimeout(() => {
      const spacesSection = document.getElementById("spaces")
      const spaceCategoriesSection = document.getElementById("space-categories")

      if (spacesSection && spaceCategoriesSection) {
        const spaceCategoriesHeight = spaceCategoriesSection.offsetHeight
        const spacesRect = spacesSection.getBoundingClientRect()
        const offsetPosition = spacesRect.top + window.scrollY - spaceCategoriesHeight - 20 // 20px extra padding

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }, 100) // Small timeout to ensure DOM is updated
  }

  // Handle inquire button click from SpacesSection
  const handleEnquire = (spaceName: string, spaceData: SpaceData) => {
    setSelectedSpace(spaceName)
    setSelectedSpaceData(spaceData)
    setShowBookingForm(true)
  }

  return (
    <main className="min-h-screen bg-[#f8f5f0]">
      {/* Hero Section */}
      <IntroSection onScrollToFrames={scrollToFrames} />

      {/* Built for Community Section */}
      <BuiltForCommunity />

      {/* New Village Info Cards Section */}
      <VillageInfoCards />

      <Partners />

      {/* What&apos;s on Offer Section */}
      <section className="w-full py-24 md:py-32 bg-transparent relative z-[1] overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={titleContainer}
              className="inline-block"
            >
              <motion.h2
                className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-16 leading-none tracking-tight"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                <motion.span
                  className="inline-block bg-gradient-to-r from-[#f9a826] via-[#f97316] to-[#f43f5e] text-transparent bg-clip-text"
                  variants={titleWord}
                >
                  What&apos;s on Offer
                </motion.span>
              </motion.h2>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dynamic Frame Layout */}
      <section id="frames-section" className="w-full py-16 md:py-24 bg-transparent relative z-[1]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-[#ff7b7b] mb-6">Our Workspace Options</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-12">
              <span className="text-[#f9a826]">Explore Our Spaces</span>
            </h2>
          </div>

          <div className="hidden sm:block w-full aspect-square md:aspect-[16/9] max-w-7xl mx-auto" ref={framesRef}>
            <DynamicFrameLayout onFrameSelect={handleFrameSelect} />
          </div>
        </div>
      </section>

      {/* Space Categories */}
      <div id="space-categories" ref={spaceCategoriesRef} className="bg-transparent relative z-[1]">
        <DebugLogger componentName="BeforeSpaceCategories" />
        <SpaceCategories onCategorySelect={handleCategorySelect} activeCategory={activeSpaceTab} />
        <DebugLogger componentName="AfterSpaceCategories" />
      </div>

      {/* Main Content Sections */}
      <div ref={spacesSectionRef} className="bg-transparent relative z-[1]">
        <DebugLogger componentName="BeforeSpacesSection" />
        <SpacesSection activeTab={activeSpaceTab} activeSubTab={activeSpaceSubTab} onEnquire={handleEnquire} />
        <DebugLogger componentName="AfterSpacesSection" />
      </div>

      {/* Booking Form */}
      <div id="booking-form" className="w-full relative">
        <BookingForm selectedSpace={selectedSpace} spaceData={selectedSpaceData} isVisible={showBookingForm} />
      </div>

      {/* Contact Section */}
      <ContactSection />
    </main>
  )
}
