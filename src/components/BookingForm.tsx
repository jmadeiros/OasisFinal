"use client"

import { useState, useEffect } from "react"
import { CheckIcon, Calendar } from "lucide-react"
import Image from "next/image"

// Define the space data interface
interface SpaceData {
  title: string
  description: string
  image?: string
  features?: string[]
}

// Default space data for Director's Office
const defaultSpaceData: SpaceData = {
  title: "Director's Office",
  description:
    "A premium private office space designed for executives and directors, featuring elegant furnishings and a professional atmosphere.",
  image: "/images/director-office.png",
  features: ["Private executive workspace", "Professional meeting area", "Premium furnishings and decor"],
}

interface BookingFormProps {
  selectedSpace?: string | null
  spaceData?: SpaceData | null
  isVisible?: boolean
}

export default function BookingForm({ 
  selectedSpace = null, 
  spaceData = null, 
  isVisible = true 
}: BookingFormProps) {
  const today = new Date().toISOString().split("T")[0]

  const [currentSpace, setCurrentSpace] = useState(selectedSpace || "Director's Office")
  const [currentSpaceData, setCurrentSpaceData] = useState<SpaceData | null>(spaceData || defaultSpaceData)
  const [multipleDays, setMultipleDays] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    usageType: "commercial",
    singleDate: "",
    startDate: today,
    endDate: "",
    additionalInfo: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (selectedSpace) {
      setCurrentSpace(selectedSpace)
    }
  }, [selectedSpace])

  useEffect(() => {
    if (spaceData) {
      setCurrentSpaceData(spaceData)
    }
  }, [spaceData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // If setting start date and it's after end date, update end date
    if (name === "startDate" && value && formData.endDate && new Date(value) > new Date(formData.endDate)) {
      setFormData((prev) => ({ ...prev, endDate: value }))
    }

    // If setting end date and it's before start date, update start date
    if (name === "endDate" && value && formData.startDate && new Date(value) < new Date(formData.startDate)) {
      setFormData((prev) => ({ ...prev, startDate: value }))
    }
  }

  const handleUsageTypeChange = (type: string) => {
    setFormData((prev) => ({ ...prev, usageType: type }))
  }

  const handleMultipleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    console.log("Multiple days checkbox changed:", isChecked)
    setMultipleDays(isChecked)

    // If switching to multiple days, initialize start date with single date if available
    if (isChecked) {
      setFormData((prev) => ({
        ...prev,
        startDate: prev.singleDate || today, // Use single date or today
        endDate: prev.singleDate || today, // Initialize end date too
      }))
    }
    // If switching to single day, initialize single date with start date if available
    else if (!isChecked && formData.startDate) {
      setFormData((prev) => ({
        ...prev,
        singleDate: prev.startDate,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Start processing
    setIsProcessing(true)

    const submissionData = {
      ...formData,
      // Include only relevant date fields based on selection
      date: multipleDays ? { start: formData.startDate, end: formData.endDate } : formData.singleDate,
    }
    console.log("Form submitted:", submissionData)

    // Simulate processing time (1.5 seconds)
    setTimeout(() => {
      setIsProcessing(false)
      setIsSubmitted(true)

      // Hide confirmation after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  // Check if the space type should show date fields
  const shouldShowDateFields = () => {
    // Don't show date fields for Private Offices and Coworking (but keep for Event Spaces)
    const excludedSpaceTypes = [
      "Director's Office",
      "Creative Labs",
      "Team Office",
      "Innovation Studio",
      "Workshop Studio",
      "Executive Suite",
      "Team Hub",
      "Consultation Rooms",
      "Education Suite", // Private Offices
      "Community",
      "Flex",
      "Dedicated",
      "Team Plan", // Coworking
    ]

    return !excludedSpaceTypes.includes(currentSpace)
  }

  if (!isVisible) return null

  return (
    <section id="booking" className="w-full py-24 pb-48 bg-[#f8f5f0]">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Centralized Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e293b] mb-4">Enquire about {currentSpace}</h2>
          <p className="text-lg text-[#475569]">
            Fill out the form below and our team will get back to you with availability and pricing information.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-24 lg:items-start">
          {/* Form Column - Left Side */}
          <div className="lg:w-[60%] max-w-xl mx-auto lg:mx-0">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-base font-semibold text-[#1e293b] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full px-5 py-4 font-medium bg-[#e9e2d8] border-0 rounded-lg text-[#1e293b] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
                  required
                />
              </div>

              {/* Email and Phone Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-base font-semibold text-[#1e293b] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-5 py-4 font-medium bg-[#e9e2d8] border-0 rounded-lg text-[#1e293b] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-base font-semibold text-[#1e293b] mb-2">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-5 py-4 font-medium bg-[#e9e2d8] border-0 rounded-lg text-[#1e293b] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
                  />
                </div>
              </div>

              {/* Usage Type */}
              <div>
                <label className="block text-base font-semibold text-[#1e293b] mb-2">Usage Type</label>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center cursor-pointer">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        id="commercial"
                        name="usageType"
                        checked={formData.usageType === "commercial"}
                        onChange={() => handleUsageTypeChange("commercial")}
                        className="sr-only"
                      />
                      <div className="w-6 h-6 rounded-full flex items-center justify-center border border-gray-400 bg-[#e9e2d8]">
                        {formData.usageType === "commercial" && (
                          <div className="w-4 h-4 rounded-full bg-[#4a7c59]"></div>
                        )}
                      </div>
                    </div>
                    <span className="ml-2 text-base text-[#1e293b]">Commercial</span>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        id="voluntary"
                        name="usageType"
                        checked={formData.usageType === "voluntary"}
                        onChange={() => handleUsageTypeChange("voluntary")}
                        className="sr-only"
                      />
                      <div className="w-6 h-6 rounded-full flex items-center justify-center border border-gray-400 bg-[#e9e2d8]">
                        {formData.usageType === "voluntary" && (
                          <div className="w-4 h-4 rounded-full bg-[#4a7c59]"></div>
                        )}
                      </div>
                    </div>
                    <span className="ml-2 text-base text-[#1e293b]">Voluntary/Non-profit</span>
                  </label>
                </div>
              </div>

              {/* Date Selection - Styled Version */}
              {shouldShowDateFields() && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-base font-semibold text-[#1e293b]">Date (optional)</label>
                    <div className="flex items-center">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={multipleDays}
                          onChange={handleMultipleDaysChange}
                          className="sr-only peer"
                        />
                        <div className="w-6 h-6 rounded-md flex items-center justify-center border border-gray-400 bg-[#e9e2d8] peer-checked:bg-[#e9e2d8]">
                          {multipleDays && <CheckIcon className="h-4 w-4 text-[#4a7c59]" />}
                        </div>
                        <span className="ml-2 text-sm text-[#6b7280]">Multiple days</span>
                      </label>
                    </div>
                  </div>

                  {!multipleDays ? (
                    // Single Date Selection
                    <div className="relative">
                      <input
                        type="date"
                        id="singleDate"
                        name="singleDate"
                        value={formData.singleDate}
                        onChange={handleChange}
                        min={today}
                        className="w-full px-5 py-4 font-medium bg-[#e9e2d8] border-0 rounded-lg text-[#6b7280] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#4a7c59] appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:top-0 [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                      />
                      <Calendar className="absolute right-4 top-[calc(50%+2px)] transform -translate-y-1/2 text-[#6b7280] pointer-events-none h-5 w-5" />
                    </div>
                  ) : (
                    // Date Range Selection
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <label htmlFor="startDate" className="block text-sm text-[#6b7280] mb-1">
                          From
                        </label>
                        <input
                          type="date"
                          id="startDate"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          min={today}
                          className="w-full px-5 py-4 font-medium bg-[#e9e2d8] border-0 rounded-lg text-[#6b7280] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#4a7c59] appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:top-0 [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                        />
                        <Calendar className="absolute right-4 top-[calc(50%+4px)] transform -translate-y-1/2 text-[#6b7280] pointer-events-none h-5 w-5" />
                      </div>
                      <div className="relative">
                        <label htmlFor="endDate" className="block text-sm text-[#6b7280] mb-1">
                          To
                        </label>
                        <input
                          type="date"
                          id="endDate"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                          min={formData.startDate || today}
                          className="w-full px-5 py-4 font-medium bg-[#e9e2d8] border-0 rounded-lg text-[#6b7280] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#4a7c59] appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:top-0 [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                        />
                        <Calendar className="absolute right-4 top-[calc(50%+4px)] transform -translate-y-1/2 text-[#6b7280] pointer-events-none h-5 w-5" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-5 px-4 bg-[#4a7c59] text-white font-medium rounded-lg hover:bg-[#3d6548] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4a7c59] text-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Enquire Now"
                )}
              </button>
              {isSubmitted && (
                <div className="mt-4 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg flex items-center">
                  <CheckIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p>Thank you for your inquiry! We'll be in touch with you shortly.</p>
                </div>
              )}
            </form>
          </div>

          {/* Image and Info Column - Right Side */}
          <div className="lg:w-[40%] mt-12 lg:mt-0">
            <div className="rounded-lg overflow-hidden mb-6 h-[300px] bg-[#e0d5c8]">
              {currentSpaceData && currentSpaceData.image && (
                <div className="relative w-full h-full">
                  <Image
                    src={currentSpaceData.image || "/placeholder.svg"}
                    alt={currentSpace}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#1e293b]">{currentSpace}</h3>

              <p className="text-[#475569]">
                {currentSpaceData?.description ||
                  "The Village offers flexible workspace solutions for individuals and teams of all sizes. Our spaces are designed to foster creativity, productivity, and community."}
              </p>

              <div className="space-y-2">
                {currentSpaceData?.features ? (
                  currentSpaceData.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-[#4a7c59] mr-2 mt-0.5" />
                      <span className="text-[#475569]">{feature}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-[#4a7c59] mr-2 mt-0.5" />
                      <span className="text-[#475569]">Flexible booking options</span>
                    </div>
                    <div className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-[#4a7c59] mr-2 mt-0.5" />
                      <span className="text-[#475569]">High-speed internet included</span>
                    </div>
                    <div className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-[#4a7c59] mr-2 mt-0.5" />
                      <span className="text-[#475569]">Access to community events</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
