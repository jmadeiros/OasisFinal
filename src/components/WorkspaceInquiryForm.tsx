"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  TextInput,
  TextareaField,
  SelectField,
  DatePicker,
  TimeRangePicker,
  SubmitButton,
} from "@/components/enquiry/shared/FormFields"
import EnquirySuccess from "@/components/enquiry/shared/EnquirySuccess"

const usageOptions = [
  { value: "commercial", label: "Commercial" },
  { value: "voluntary", label: "Voluntary/Non-profit" },
]

const membershipOptions = [
  { value: "community", label: "Community" },
  { value: "flex", label: "Flex" },
  { value: "dedicated", label: "Dedicated" },
  { value: "team", label: "Team Plan" },
]

export default function WorkspaceEnquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    spaceType: "",
    usageType: "commercial",
    membershipType: "",
    date: null,
    startTime: "",
    endTime: "",
    additionalInfo: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, date }))
  }

  const handleTimeChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Form submitted:", formData)
    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <section className="py-16 bg-[#f8f5f0]">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <TextInput
                label="Name"
                name="name"
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <TextInput
                label="Email"
                name="email"
                type="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <TextInput
                label="Phone (optional)"
                name="phone"
                type="tel"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
              <SelectField
                label="Space Type"
                name="spaceType"
                options={[
                  { value: "coworking", label: "Coworking" },
                  { value: "private_office", label: "Private Office" },
                  { value: "meeting_room", label: "Meeting Room" },
                  { value: "event_space", label: "Event Space" },
                ]}
                required
                value={formData.spaceType}
                onChange={handleChange}
                placeholder="Select Space Type"
              />
              <SelectField
                label="Usage Type"
                name="usageType"
                options={usageOptions}
                required
                value={formData.usageType}
                onChange={handleChange}
              />
              <SelectField
                label="Membership Type (optional)"
                name="membershipType"
                options={membershipOptions}
                value={formData.membershipType}
                onChange={handleChange}
                placeholder="Select Membership Type"
              />
              <DatePicker
                label="Preferred Date"
                name="date"
                required
                value={formData.date}
                onChange={handleDateChange}
              />
              <TimeRangePicker
                label="Preferred Time"
                startName="startTime"
                endName="endTime"
                required
                startTime={formData.startTime}
                endTime={formData.endTime}
                onStartTimeChange={(time) => handleTimeChange("startTime", time)}
                onEndTimeChange={(time) => handleTimeChange("endTime", time)}
              />
              <TextareaField
                label="Additional Information"
                name="additionalInfo"
                placeholder="Any additional details you'd like to share?"
                value={formData.additionalInfo}
                onChange={handleChange}
              />
              <SubmitButton text="Submit Enquiry" isLoading={isLoading} />
            </form>
          ) : (
            <EnquirySuccess
              spaceType={formData.spaceType}
              usageType={formData.usageType}
              membershipType={formData.membershipType}
            />
          )}
        </motion.div>
      </div>
    </section>
  )
}
