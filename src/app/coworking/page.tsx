"use client"

import { motion } from "framer-motion"
import { Check, ArrowLeft, Briefcase, CalendarDays, HandHeart, Users, ChevronRight, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { inter } from "../fonts"
import { useState } from "react"
import Image from "next/image"

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
        <div className="container mx-auto px-6 md:px-12">
          {/* Back Link */}
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

          {/* Updated Title and Subtitle */}
          <motion.h1
            className={`text-5xl md:text-6xl font-bold leading-tight ${inter.className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="block text-transparent bg-clip-text"
              style={{
                background: "linear-gradient(to right, var(--village-orange), var(--village-green))",
                WebkitBackgroundClip: "text",
              }}
            >
              Ways to Join The Village
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-700 mt-4 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover the various ways you can connect, work, and contribute at The Village.
          </motion.p>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 md:px-12 py-16 space-y-16 md:space-y-24">
        {/* Other Spaces Section */}
        <motion.section
          className="grid md:grid-cols-2 gap-12 items-center bg-white p-8 md:p-12 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-8 h-8 text-[var(--village-orange)]" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">Offices & Event Spaces</h2>
            </div>
            <p className="text-lg text-gray-700 mb-6">
              Beyond coworking, The Village offers dedicated private offices for teams and versatile event spaces for
              meetings, workshops, and gatherings.
            </p>
            <Link
              href="/#frames-section"
              className="inline-flex items-center px-6 py-3 bg-[var(--village-orange)] text-white font-medium rounded-md hover:bg-[var(--village-orange)]/90 transition-colors"
            >
              Explore All Spaces
            </Link>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image 
              src="/images/event-space-arched.png" 
              alt="Event space at The Village"
              fill 
              className="object-cover"
            />
          </div>
        </motion.section>

        {/* Volunteer Section */}
        <motion.section
          className="grid md:grid-cols-2 gap-12 items-center bg-white p-8 md:p-12 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
           <div className="relative aspect-video rounded-lg overflow-hidden md:order-last">
             <Image 
               src="/images/community-conversation.jpeg" 
               alt="Volunteers at The Village"
               fill 
               className="object-cover"
             />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <HandHeart className="w-8 h-8 text-[var(--village-teal)]" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">Volunteer With Us</h2>
            </div>
            <p className="text-lg text-gray-700 mb-6">
              Become part of our vibrant community by volunteering your time and skills. Help us make a difference and
              support our mission.
            </p>
            <Link
              href="/volunteer"
              className="inline-flex items-center px-6 py-3 border border-[var(--village-teal)] text-[var(--village-teal)] font-medium rounded-md hover:bg-[var(--village-teal)]/10 transition-colors"
            >
              Learn About Volunteering
            </Link>
          </div>
        </motion.section>

        {/* Community Events Section */}
        <motion.section
          className="grid md:grid-cols-2 gap-12 items-center bg-white p-8 md:p-12 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-[var(--village-gold)]" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">Join Our Events</h2>
            </div>
            <p className="text-lg text-gray-700 mb-6">
              Connect with fellow members and the wider Tulse Hill community through our regular events, workshops, and social gatherings. See what's coming up!
            </p>
            <Link
              href="/community"
              className="inline-flex items-center px-6 py-3 border border-[var(--village-gold)] text-[var(--village-gold)] font-medium rounded-md hover:bg-[var(--village-gold)]/10 transition-colors"
            >
              Explore Community & Events
            </Link>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image 
              src="/images/community-connection.jpeg" 
              alt="Community event at The Village"
              fill 
              className="object-cover object-[center_25%]"
            />
          </div>
        </motion.section>

        {/* Coworking Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight mb-4">Flexible Coworking Plans</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Find the perfect coworking membership to suit your work style and budget.
            </p>
          </div>
          
          {/* Add the style tag */}
          <style jsx global>{hideScrollbarStyle}</style>
          
          {/* Desktop Grid View (hidden on mobile) */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {membershipPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-xl overflow-hidden ${plan.popular ? "transform md:-translate-y-4 shadow-lg" : "shadow-md"}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-[var(--village-teal)] text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
                    MOST POPULAR
                  </div>
                )}
                <div
                  className="bg-white border-t-4 p-8 h-full flex flex-col"
                  style={{ borderColor: plan.color === "var(--village-cream)" ? "var(--village-gold)" : plan.color }}
                >
                  <h3 className="text-2xl font-bold mb-2" style={{ color: plan.color }}>
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-800">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-gray-700 mb-6 text-sm">{plan.description}</p>
                  <ul className="space-y-2 mb-8 flex-grow text-sm">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600">
                        <Check
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: plan.color === "var(--village-cream)" ? "var(--village-gold)" : plan.color }}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="w-full py-2.5 rounded-lg font-medium text-sm transition-colors mt-auto"
                    style={{
                      backgroundColor: `${plan.color === "var(--village-cream)" ? "var(--village-gold)" : plan.color}20`,
                      color: plan.color === "var(--village-cream)" ? "var(--village-gold)" : plan.color,
                      border: `1px solid ${plan.color === "var(--village-cream)" ? "var(--village-gold)" : plan.color}40`,
                    }}
                    onClick={scrollToBooking}
                  >
                    Enquire about {plan.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Horizontal Scroll View (shown only on mobile) */}
          <div className="sm:hidden overflow-x-auto hide-scrollbar pb-6">
            <div className="flex space-x-4 px-4 w-max">
              {membershipPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative rounded-xl overflow-hidden flex-shrink-0 w-[280px] ${plan.popular ? "shadow-lg" : "shadow-md"}`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-[var(--village-teal)] text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
                      MOST POPULAR
                    </div>
                  )}
                  <div
                    className="bg-white border-t-4 p-6 h-full flex flex-col"
                    style={{ borderColor: plan.color === "var(--village-cream)" ? "var(--village-gold)" : plan.color }}
                  >
                    <h3 className="text-xl font-bold mb-2" style={{ color: plan.color }}>
                      {plan.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-gray-800">{plan.price}</span>
                      <span className="text-gray-600 ml-1">{plan.period}</span>
                    </div>
                    <p className="text-gray-700 mb-4 text-sm">{plan.description}</p>
                    <ul className="space-y-2 mb-6 flex-grow text-sm">
                      {plan.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-600">
                          <Check
                            className="w-4 h-4 mt-0.5 flex-shrink-0"
                            style={{ color: plan.color === "var(--village-cream)" ? "var(--village-gold)" : plan.color }}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {plan.features.length > 3 && (
                        <li className="text-xs text-gray-500 italic">+ {plan.features.length - 3} more benefits</li>
                      )}
                    </ul>
                    <button
                      className="w-full py-2.5 rounded-lg font-medium text-sm transition-colors mt-auto"
                      style={{
                        backgroundColor: `${plan.color === "var(--village-cream)" ? "var(--village-gold)" : plan.color}20`,
                        color: plan.color === "var(--village-cream)" ? "var(--village-gold)" : plan.color,
                        border: `1px solid ${plan.color === "var(--village-cream)" ? "var(--village-gold)" : plan.color}40`,
                      }}
                      onClick={scrollToBooking}
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Swipe indicator for mobile */}
            <div className="flex justify-center items-center mt-3 text-gray-500 text-sm">
              <ChevronLeft className="w-4 h-4 mr-1" />
              <span>Swipe to see more options</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </motion.section>

        {/* Retained CTA section at the bottom */}
        <motion.div
          className="text-center mt-16 md:mt-24 bg-[#e0d9cf] p-8 md:p-12 rounded-xl shadow-inner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to Join Our Community?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Book a tour to experience our spaces firsthand or contact us to discuss membership or volunteering options.
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
