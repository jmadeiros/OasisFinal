"use client"

import { motion } from "framer-motion"
import { Check, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { inter } from "../fonts"
import { useState } from "react"

export default function CoworkingPage() {
  const [expandedCards, setExpandedCards] = useState<number[]>([])

  const toggleCardExpansion = (planId: number) => {
    setExpandedCards((prev) => (prev.includes(planId) ? prev.filter((id) => id !== planId) : [...prev, planId]))
  }

  const membershipPlans = [
    {
      id: 1,
      name: "Community",
      price: "£75",
      period: "per month",
      description: "For occasional use and networking",
      features: [
        "8 days access per month (more flexible than standard 5-day plans)",
        "Access to coworking lounge & community events",
        "Discounted meeting rooms (£10/hour)",
        "High-speed Wi-Fi & free tea/coffee",
        "Printing available (pay-as-you-go)",
      ],
      color: "var(--village-green)",
      popular: false,
    },
    {
      id: 2,
      name: "Flex",
      price: "£225",
      period: "per month",
      description: "For freelancers & remote workers who need regular space",
      features: [
        "Unlimited hot desk access (8 AM – 8 PM)",
        "Use of shared coworking areas",
        "4 hours of meeting room credits (more than typical 2-hour offers)",
        "Printing credits (50 pages/month)",
        "Locker storage option (+£20/month for dedicated storage)",
      ],
      color: "var(--village-teal)",
      popular: true,
    },
    {
      id: 3,
      name: "Dedicated",
      price: "£350",
      period: "per month",
      description: "For those who need a fixed, reliable workspace",
      features: [
        "Unlimited access (8 AM – 8 PM)",
        "Dedicated desk (your own reserved workspace)",
        "8 hours of meeting room credits (competitive vs. the usual 5-hour offers)",
        "Printing credits (100 pages/month)",
        "Personal locker included",
        "Business address & mail handling (+£30/month option)",
      ],
      color: "var(--village-orange)",
      popular: false,
    },
    {
      id: 4,
      name: "Team Plan",
      price: "From £600",
      period: "per month",
      description: "For small teams needing collaborative workspace",
      features: [
        "3 floating desks for a team of up to 5 people (rotational use)",
        "15 hours of meeting room credits per month",
        "Printing & storage access for all members",
        "Ability to add more seats at discounted rates",
        "Option for private breakout area (+£300/month)",
      ],
      color: "var(--village-cream)",
      popular: false,
    },
  ]

  const scrollToBooking = () => {
    // Navigate to home page with booking form
    window.location.href = "/#booking-form"
  }

  return (
    <main className="min-h-screen bg-[#f8f5f0]">
      {/* Header */}
      <div className="w-full py-12 md:py-16 bg-[#f0e9df]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-700 hover:text-[var(--village-green)] transition-colors mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
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
                background: "linear-gradient(to right, #4a7c59, #39a0a9)",
                WebkitBackgroundClip: "text",
              }}
            >
              Coworking Memberships
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-700 mt-4 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Choose from a variety of flexible coworking plans designed to meet your needs. All memberships include
            access to our community events and high-speed internet.
          </motion.p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        {/* Membership Plans */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="text-center space-y-6 max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Membership Options</h2>
            <p className="text-xl text-gray-700">
              Choose the plan that works best for you. All memberships include access to our community events and
              high-speed internet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-xl overflow-hidden ${plan.popular ? "transform md:-translate-y-4" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-[var(--village-teal)] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}
                <div className="bg-[#e0d9cf] border-t-4 p-8 h-full flex flex-col" style={{ borderColor: plan.color }}>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: plan.color }}>
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-800">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-gray-700 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <Check className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: plan.color }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="w-full py-3 rounded-lg font-medium transition-colors mt-auto"
                    style={{
                      backgroundColor: `${plan.color}20`,
                      color: plan.color,
                      border: `1px solid ${plan.color}40`,
                    }}
                    onClick={scrollToBooking}
                  >
                    Choose {plan.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Why Choose Our Coworking Space?</h2>
            <p className="text-lg text-gray-700 mb-6">
              At The Village, we believe in creating more than just a workspace. Our coworking environment is designed
              to foster creativity, productivity, and meaningful connections.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Whether you're a freelancer, remote worker, or small team, we have the perfect membership option to suit
              your needs.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 mt-1 text-[var(--village-green)]" />
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-1">Flexible Terms</h3>
                  <p className="text-gray-700">
                    No long-term commitments required. Choose the plan that works for you.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 mt-1 text-[var(--village-teal)]" />
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-1">Community Events</h3>
                  <p className="text-gray-700">Regular networking opportunities, workshops, and social gatherings.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 mt-1 text-[var(--village-orange)]" />
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-1">Premium Amenities</h3>
                  <p className="text-gray-700">High-speed internet, meeting rooms, printing services, and more.</p>
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-16%20200107-gVqZVuyGJqddxwjqbjYWa403iLIRCG.png"
              alt="The Village Coworking Space"
              className="rounded-xl shadow-md w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white font-medium text-lg">
                Experience the perfect balance of community and productivity
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-24 bg-[#e0d9cf] p-12 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to Join Our Coworking Community?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Book a tour to experience our coworking space firsthand or contact us to discuss custom membership options.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={scrollToBooking}
              className="px-8 py-4 bg-[var(--village-green)] text-white font-medium rounded-md hover:bg-[var(--village-green)]/90 transition-colors"
            >
              Book a Tour
            </button>
            <Link
              href="/#contact"
              className="px-8 py-4 border border-[var(--village-green)] text-[var(--village-green)] font-medium rounded-md hover:bg-[var(--village-green)]/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
