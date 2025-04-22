"use client"

import { useState, useEffect } from "react"
import { Clock, CheckIcon, ChevronLeft, Info, Calendar, MapPin, Users, Coffee } from "lucide-react"
import { format, addDays, isWeekend } from "date-fns"
import Image from "next/image"
import Link from "next/link"

// Custom styles for text shadow
const textShadowStyles = {
  textShadow: {
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
  },
  textShadowSm: {
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
  },
}

export default function BookTourForm() {
  // Calculate next business day (skip weekends)
  const getNextBusinessDay = () => {
    let date = new Date()
    date = addDays(date, 1)
    while (isWeekend(date)) {
      date = addDays(date, 1)
    }
    return date
  }

  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    tourDate: null,
    tourTime: "",
    interests: [],
  })

  const [dateString, setDateString] = useState("")
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  // Set default date to next business day on component mount
  useEffect(() => {
    const nextBusinessDay = getNextBusinessDay()
    setFormData((prev) => ({
      ...prev,
      tourDate: nextBusinessDay,
    }))
    setDateString(format(nextBusinessDay, "yyyy-MM-dd"))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateInputChange = (e) => {
    try {
      const value = e.target.value
      setDateString(value)

      if (value) {
        const date = new Date(value + "T00:00:00") // Add time component to avoid timezone issues
        if (!isNaN(date.getTime())) {
          setFormData((prev) => ({ ...prev, tourDate: date }))
        }
      } else {
        setFormData((prev) => ({ ...prev, tourDate: null }))
      }

      // Close the date picker after selection
      setIsDatePickerOpen(false)
    } catch (error) {
      console.error("Error handling date input:", error)
    }
  }

  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen)
  }

  const handleInterestToggle = (interest) => {
    setFormData((prev) => {
      const currentInterests = [...prev.interests]
      if (currentInterests.includes(interest)) {
        return { ...prev, interests: currentInterests.filter((i) => i !== interest) }
      } else {
        return { ...prev, interests: [...currentInterests, interest] }
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      console.log("Tour booking submitted:", formData)
      // In a real app, you would send this data to your backend
      setFormSubmitted(true)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error booking your tour. Please try again.")
    }
  }

  // Create formatted time options for business hours (9am-5pm)
  const timeOptions = [
    { value: "9:00", label: "9:00 AM" },
    { value: "9:30", label: "9:30 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "10:30", label: "10:30 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "11:30", label: "11:30 AM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "12:30", label: "12:30 PM" },
    { value: "13:00", label: "1:00 PM" },
    { value: "13:30", label: "1:30 PM" },
    { value: "14:00", label: "2:00 PM" },
    { value: "14:30", label: "2:30 PM" },
    { value: "15:00", label: "3:00 PM" },
    { value: "15:30", label: "3:30 PM" },
    { value: "16:00", label: "4:00 PM" },
    { value: "16:30", label: "4:30 PM" },
    { value: "17:00", label: "5:00 PM" },
  ]

  const interestOptions = [
    { id: "office", label: "Office Space", icon: <Coffee className="h-4 w-4 mr-2" /> },
    { id: "events", label: "Event Spaces", icon: <Users className="h-4 w-4 mr-2" /> },
    { id: "coworking", label: "Coworking", icon: <MapPin className="h-4 w-4 mr-2" /> },
    { id: "all", label: "It All!", icon: <CheckIcon className="h-4 w-4 mr-2" /> },
  ]

  if (formSubmitted) {
    return (
      <div className="w-full">
        <div className="bg-[#f0e9df] pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="mb-8">
              <Link href="/" className="inline-flex items-center text-[#4a7c59] hover:text-[#3d6548] transition-colors">
                <ChevronLeft className="h-5 w-5 mr-1" />
                <span className="font-medium">Back to Home</span>
              </Link>
            </div>

            <div className="text-center mb-12 max-w-3xl mx-auto">
              <div className="mb-2 text-[#4a7c59] font-medium">THE VILLAGE</div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#1e293b] mb-4 relative">
                <span className="relative inline-block">
                  Thank You!
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#4a7c59] rounded-full"></div>
                </span>
              </h1>
            </div>
          </div>
        </div>

        <div className="bg-[#f8f5f0] py-16 pb-48">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-[#4a7c59]/10 flex items-center justify-center mx-auto mb-6">
                <CheckIcon className="h-10 w-10 text-[#4a7c59]" />
              </div>
              <h2 className="text-3xl font-bold text-[#1e293b] mb-4">Your Tour is Booked!</h2>
              <p className="text-lg text-[#475569] mb-8">
                We've received your booking request and will send a confirmation to your email shortly. Our team is
                looking forward to showing you around The Village!
              </p>
              <Link
                href="/"
                className="inline-block py-3 px-6 bg-[#4a7c59] text-white font-medium rounded-lg hover:bg-[#3d6548] transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Hero section with image background */}
      <div className="relative pt-16 pb-16 md:pt-24 md:pb-20">
        <div className="absolute inset-0 z-0">
          <Image src="/images/wooden-hall.png" alt="The Village Tour" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1e293b]/40 z-0"></div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {/* Back to Home Button */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-white hover:text-[#e9e2d8] transition-colors font-medium shadow-sm"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>

          {/* Enhanced Header with Decorative Elements */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="mb-2 text-[#4a7c59] font-medium">THE VILLAGE</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 relative text-shadow">
              <span className="relative inline-block">
                Book a Tour
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#4a7c59] rounded-full"></div>
              </span>
            </h1>
            <p className="text-lg text-white mt-8 leading-relaxed text-shadow-sm">
              Schedule a guided tour of The Village to explore our spaces and discover the perfect fit for your needs.
              Our team will show you around and answer any questions you may have.
            </p>
          </div>
        </div>
      </div>

      {/* Main content with lighter background */}
      <div className="bg-[#f8f5f0] py-16 pb-32">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Tour benefits section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#4a7c59]/10 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-[#4a7c59]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1e293b] mb-2">Explore Our Spaces</h3>
                <p className="text-[#475569]">
                  See all our workspace options and find the perfect environment for your needs.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#4a7c59]/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-[#4a7c59]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1e293b] mb-2">Meet Our Team</h3>
                <p className="text-[#475569]">Connect with our community team and learn about membership benefits.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#4a7c59]/10 flex items-center justify-center mb-4">
                  <Coffee className="h-6 w-6 text-[#4a7c59]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1e293b] mb-2">Experience The Village</h3>
                <p className="text-[#475569]">Get a feel for our community atmosphere and discover our events.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-16 lg:items-start">
            {/* Form Column - Left Side */}
            <div className="lg:w-[60%] max-w-2xl mx-auto lg:mx-0">
              <div className="bg-white p-5 md:p-8 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold text-[#1e293b] mb-8">Schedule Your Visit</h2>

                <form onSubmit={handleSubmit} className="space-y-5 md:space-y-8">
                  {/* Email Field */}
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
                      className="w-full px-4 py-3 md:px-5 md:py-4 font-medium bg-[#f8f5f0] border border-[#d0c7b8] rounded-lg text-[#1e293b] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
                      required
                    />
                  </div>

                  {/* Mobile Field */}
                  <div>
                    <label htmlFor="mobile" className="block text-base font-semibold text-[#1e293b] mb-2">
                      Mobile
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="07700 900000"
                      className="w-full px-4 py-3 md:px-5 md:py-4 font-medium bg-[#f8f5f0] border border-[#d0c7b8] rounded-lg text-[#1e293b] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
                      required
                    />
                  </div>

                  {/* Interests Checkboxes */}
                  <div>
                    <label className="block text-base font-semibold text-[#1e293b] mb-3">
                      What are you interested in?
                    </label>
                    <div className="grid grid-cols-2 md:flex md:flex-nowrap gap-2 w-full">
                      {interestOptions.map((option) => (
                        <div
                          key={option.id}
                          onClick={() => handleInterestToggle(option.id)}
                          className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors justify-center ${
                            formData.interests.includes(option.id)
                              ? "bg-[#4a7c59]/10 border-[#4a7c59]"
                              : "border-[#d0c7b8] hover:bg-[#f0e9df]"
                          }`}
                        >
                          {option.icon}
                          <span className="text-sm font-medium">{option.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:gap-6">
                    {/* Tour Date - Custom Clickable Field */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="dateField" className="block text-base font-semibold text-[#1e293b]">
                          Tour Date
                        </label>
                        <span className="text-xs text-[#4a7c59] flex items-center">
                          <Info className="h-3 w-3 mr-1" />
                          Monday-Friday only
                        </span>
                      </div>

                      {/* Custom clickable date field */}
                      <div className="relative">
                        <div
                          className="w-full px-3 py-3 md:px-5 md:py-4 font-medium bg-[#f8f5f0] border border-[#d0c7b8] rounded-lg text-[#1e293b] cursor-pointer flex justify-between items-center"
                          onClick={toggleDatePicker}
                        >
                          <span>{formData.tourDate ? format(formData.tourDate, "dd/MM/yyyy") : "Select a date"}</span>
                          <Calendar className="h-5 w-5 text-[#6b7280]" />
                        </div>

                        {isDatePickerOpen && (
                          <div className="absolute z-10 mt-1 w-full bg-white border border-[#d0c7b8] rounded-lg shadow-lg p-4">
                            <input
                              type="date"
                              id="tourDate"
                              name="tourDate"
                              value={dateString}
                              onChange={handleDateInputChange}
                              className="w-full p-2 border border-[#d0c7b8] rounded-md"
                              min={format(new Date(), "yyyy-MM-dd")}
                              required
                            />
                          </div>
                        )}
                      </div>

                      <p className="mt-1 text-xs text-[#475569]">
                        {formData.tourDate && isWeekend(formData.tourDate)
                          ? "Please select a weekday (Monday-Friday)"
                          : ""}
                      </p>
                    </div>

                    {/* Tour Time - Simplified Direct Approach */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="tourTime" className="block text-base font-semibold text-[#1e293b]">
                          Tour Time
                        </label>
                        <span className="text-xs text-[#4a7c59] flex items-center">
                          <Info className="h-3 w-3 mr-1" />
                          30 min duration
                        </span>
                      </div>

                      {/* Simple select for time */}
                      <div className="relative">
                        <select
                          id="tourTime"
                          name="tourTime"
                          value={formData.tourTime}
                          onChange={handleChange}
                          className={`w-full px-3 py-3 md:px-5 md:py-4 font-medium bg-[#f8f5f0] border border-[#d0c7b8] rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4a7c59] ${
                            formData.tourTime ? "text-[#1e293b]" : "text-[#6b7280]"
                          }`}
                          required
                        >
                          <option value="" disabled className="text-[#6b7280]">
                            Select a time
                          </option>
                          <optgroup label="Morning">
                            {timeOptions.slice(0, 6).map((time) => (
                              <option key={time.value} value={time.value} className="text-[#1e293b]">
                                {time.label}
                              </option>
                            ))}
                          </optgroup>
                          <optgroup label="Afternoon">
                            {timeOptions.slice(6).map((time) => (
                              <option key={time.value} value={time.value} className="text-[#1e293b]">
                                {time.label}
                              </option>
                            ))}
                          </optgroup>
                        </select>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <Clock className="h-5 w-5 text-[#6b7280]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 md:py-5 px-4 bg-[#4a7c59] text-white font-medium rounded-lg hover:bg-[#3d6548] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4a7c59] text-lg mt-4"
                  >
                    Book Tour
                  </button>
                </form>
              </div>
            </div>

            {/* Image and Info Column - Right Side */}
            <div className="lg:w-[40%] mt-8 lg:mt-0">
              <div className="bg-white p-5 md:p-8 rounded-xl shadow-sm">
                <div className="rounded-lg overflow-hidden mb-6 h-[250px] bg-[#e0d5c8]">
                  <div className="relative w-full h-full">
                    <Image src="/images/wooden-hall-long.jpeg" alt="The Village Tour" fill className="object-cover" />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-[#1e293b]">What to Expect</h3>

                  <p className="text-[#475569] leading-relaxed">
                    Your guided tour will take you through our beautiful historic building, showcasing our range of
                    workspaces, event venues, and community areas. Our team will explain membership options and answer
                    any questions you have.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-[#4a7c59] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[#475569]">Personalized tour of all facilities</span>
                    </div>
                    <div className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-[#4a7c59] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[#475569]">Overview of membership options and pricing</span>
                    </div>
                    <div className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-[#4a7c59] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[#475569]">Introduction to our community programs</span>
                    </div>
                    <div className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-[#4a7c59] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[#475569]">Opportunity to meet current members</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#e0d5c8]">
                    <p className="text-sm text-[#6b7280] italic">
                      "The Village tour was incredibly helpful. I got to see all the different spaces and immediately
                      knew it was the right fit for my business."
                    </p>
                    <p className="text-sm font-medium text-[#1e293b] mt-2">— Sarah, Member since 2022</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
