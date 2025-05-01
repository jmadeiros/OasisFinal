"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, MapPin } from "lucide-react"
import { saveContactMessage, FirestoreResult } from "../firebase/firestore"

// Define form data interface
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Save to Firestore
      const result = await saveContactMessage({
        ...formData,
        submittedAt: new Date().toISOString(),
      })
      
      console.log("Contact form submitted to Firestore:", result)
      
      if (result.success) {
        setIsSubmitting(false)
        setIsSubmitted(true)
        
        // Reset form
        setFormData({
          name: "",
          email: "", 
          message: ""
        })
      } else {
        throw new Error("Failed to save message")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setIsSubmitting(false)
      setError("Failed to send message. Please try again later.")
    }
  }

  return (
    <section id="contact" className="py-20 bg-[#f8f5f0]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Have questions about our spaces or membership options? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#e0d9cf] border border-[#d8d0c6] text-gray-800 focus:outline-none focus:border-[var(--village-green)] rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#e0d9cf] border border-[#d8d0c6] text-gray-800 focus:outline-none focus:border-[var(--village-green)] rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-[#e0d9cf] border border-[#d8d0c6] text-gray-800 focus:outline-none focus:border-[var(--village-green)] resize-none rounded-md"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[var(--village-green)] text-white font-medium hover:bg-[var(--village-green)]/90 transition-colors disabled:opacity-50 rounded-md"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#e0d9cf] p-8 text-center rounded-lg border border-[#d8d0c6]"
              >
                <div className="text-[var(--village-green)] mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-medium text-gray-800 mb-2">Thank You!</h3>
                <p className="text-gray-700">
                  Your message has been sent successfully. We'll get back to you as soon as possible.
                </p>
              </motion.div>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="text-[var(--village-green)]">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-1">Phone</h3>
                <p className="text-gray-700">+44 (0) 7758 822426</p>
                <p className="text-gray-700">Mon-Fri, 9am-6pm</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-[var(--village-green)]">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-1">Location</h3>
                <p className="text-gray-700">155 Tulse Hill</p>
                <p className="text-gray-700">London, SW2 3UP</p>
              </div>
            </div>

            <div className="aspect-video w-full mt-6 rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.459134662097!2d-0.1142016245070226!3d51.44915137179676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876046f907b00c9%3A0x4a339711975471a5!2s155%20Tulse%20Hill%2C%20London%20SW2%203UP!5e0!3m2!1sen!2suk!4v1718119737255!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="The Village Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
