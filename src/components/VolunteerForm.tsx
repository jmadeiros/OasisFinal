"use client"

import { useState } from "react"
import { CheckIcon } from "lucide-react"
import Image from "next/image"

export default function VolunteerForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interests: {
      events: false,
      administrative: false,
      marketing: false,
      fundraising: false,
      community: false,
      other: false,
    },
    availability: {
      weekdays: false,
      weekends: false,
      mornings: false,
      afternoons: false,
      evenings: false,
    },
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "checkbox") {
      const [category, item] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [item]: checked,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Volunteer form submitted:", formData)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-[#4a7c59] rounded-full flex items-center justify-center mx-auto">
            <CheckIcon className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-[#1e293b] mb-4">Thank You for Volunteering!</h2>
        <p className="text-[#475569] mb-6">
          We've received your volunteer application and will be in touch soon. Your contribution to The Village
          community is greatly appreciated!
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3 bg-[#4a7c59] text-white font-medium rounded-lg hover:bg-[#3d6548] transition-colors"
        >
          Return to Home
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row lg:gap-24 lg:items-start">
      {/* Form Column - Left Side */}
      <div className="lg:w-[60%] max-w-xl mx-auto lg:mx-0">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-base font-semibold text-[#1e293b] mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Your first name"
                className="w-full px-5 py-4 font-medium bg-[#e9e2d8] border border-[#d0c7b8] rounded-lg text-[#1e293b] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-base font-semibold text-[#1e293b] mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Your last name"
                className="w-full px-5 py-4 font-medium bg-[#e9e2d8] border border-[#d0c7b8] rounded-lg text-[#1e293b] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
                required
              />
            </div>
          </div>

          {/* Contact Information */}
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
                className="w-full px-5 py-4 font-medium bg-[#e9e2d8] border border-[#d0c7b8] rounded-lg text-[#1e293b] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
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
                placeholder="07700 900000"
                className="w-full px-5 py-4 font-medium bg-[#e9e2d8] border border-[#d0c7b8] rounded-lg text-[#1e293b] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
              />
            </div>
          </div>

          {/* Areas of Interest */}
          <div>
            <label className="block text-base font-semibold text-[#1e293b] mb-4">
              Areas of Interest (select all that apply)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="interests.events"
                  name="interests.events"
                  checked={formData.interests.events}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-[#d0c7b8] text-[#4a7c59] focus:ring-[#4a7c59]"
                />
                <label htmlFor="interests.events" className="ml-2 text-[#1e293b]">
                  Events Support
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="interests.administrative"
                  name="interests.administrative"
                  checked={formData.interests.administrative}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-[#d0c7b8] text-[#4a7c59] focus:ring-[#4a7c59]"
                />
                <label htmlFor="interests.administrative" className="ml-2 text-[#1e293b]">
                  Administrative
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="interests.marketing"
                  name="interests.marketing"
                  checked={formData.interests.marketing}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-[#d0c7b8] text-[#4a7c59] focus:ring-[#4a7c59]"
                />
                <label htmlFor="interests.marketing" className="ml-2 text-[#1e293b]">
                  Marketing & Communications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="interests.fundraising"
                  name="interests.fundraising"
                  checked={formData.interests.fundraising}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-[#d0c7b8] text-[#4a7c59] focus:ring-[#4a7c59]"
                />
                <label htmlFor="interests.fundraising" className="ml-2 text-[#1e293b]">
                  Fundraising
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="interests.community"
                  name="interests.community"
                  checked={formData.interests.community}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-[#d0c7b8] text-[#4a7c59] focus:ring-[#4a7c59]"
                />
                <label htmlFor="interests.community" className="ml-2 text-[#1e293b]">
                  Community Outreach
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="interests.other"
                  name="interests.other"
                  checked={formData.interests.other}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-[#d0c7b8] text-[#4a7c59] focus:ring-[#4a7c59]"
                />
                <label htmlFor="interests.other" className="ml-2 text-[#1e293b]">
                  Other
                </label>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-base font-semibold text-[#1e293b] mb-4">
              Availability (select all that apply)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="availability.weekdays"
                  name="availability.weekdays"
                  checked={formData.availability.weekdays}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-[#d0c7b8] text-[#4a7c59] focus:ring-[#4a7c59]"
                />
                <label htmlFor="availability.weekdays" className="ml-2 text-[#1e293b]">
                  Weekdays
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="availability.weekends"
                  name="availability.weekends"
                  checked={formData.availability.weekends}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-[#d0c7b8] text-[#4a7c59] focus:ring-[#4a7c59]"
                />
                <label htmlFor="availability.weekends" className="ml-2 text-[#1e293b]">
                  Weekends
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="availability.mornings"
                  name="availability.mornings"
                  checked={formData.availability.mornings}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-[#d0c7b8] text-[#4a7c59] focus:ring-[#4a7c59]"
                />
                <label htmlFor="availability.mornings" className="ml-2 text-[#1e293b]">
                  Mornings
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="availability.afternoons"
                  name="availability.afternoons"
                  checked={formData.availability.afternoons}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-[#d0c7b8] text-[#4a7c59] focus:ring-[#4a7c59]"
                />
                <label htmlFor="availability.afternoons" className="ml-2 text-[#1e293b]">
                  Afternoons
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="availability.evenings"
                  name="availability.evenings"
                  checked={formData.availability.evenings}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-[#d0c7b8] text-[#4a7c59] focus:ring-[#4a7c59]"
                />
                <label htmlFor="availability.evenings" className="ml-2 text-[#1e293b]">
                  Evenings
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-5 px-4 bg-[#4a7c59] text-white font-medium rounded-lg hover:bg-[#3d6548] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4a7c59] text-lg"
          >
            Submit Application
          </button>
        </form>
      </div>

      {/* Image and Text Column - Right Side */}
      <div className="lg:w-[40%] mt-16 lg:mt-0 max-w-md mx-auto lg:mx-0">
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-6 shadow-md">
          <Image
            src="/images/community-conversation.jpeg"
            alt="People talking together at The Village"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
          />
        </div>
        <h3 className="text-xl font-bold text-[#1e293b] mb-3">Join Our Volunteer Team</h3>
        <p className="text-[#475569]">
          Volunteering at The Village is a rewarding way to contribute to our community while developing new skills and
          connections.
        </p>
      </div>
    </div>
  )
}
