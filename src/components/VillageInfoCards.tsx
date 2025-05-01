"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface CardProps {
  title: string
  description: string
  expandedDescription: string
  image: string
  linkText: string
  linkHref: string
  index: number
}

const Card = ({ title, description, expandedDescription, image, linkText, linkHref, index }: CardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-md h-auto md:h-[460px] border border-gray-100" // Auto height on mobile, fixed on desktop
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: isHovered
          ? "0 10px 25px rgba(0, 0, 0, 0.08), 0 15px 15px -10px rgba(0, 0, 0, 0.12)"
          : "0 4px 12px rgba(0, 0, 0, 0.04), 0 8px 8px -4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="relative h-full flex flex-col">
        {/* Image container - fixed position, changes height on hover */}
        <div
          className="w-full h-[180px] md:h-auto transition-all duration-300 ease-in-out"
          style={{
            height: isHovered ? "180px" : "220px",
          }}
        >
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* Text content - fixed position below image */}
        <div className="p-4 md:p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-medium text-gray-800 mb-3">{title}</h3>
          <div
            className="text-gray-600 text-sm leading-relaxed overflow-hidden transition-all duration-300 ease-in-out flex-grow"
            style={{
              maxHeight: isHovered ? "160px" : "120px",
            }}
          >
            {isHovered ? expandedDescription : description}
          </div>

          {/* Link at the bottom, always visible on hover and on mobile */}
          <div
            className="mt-4 transition-opacity duration-300 ease-in-out h-6 md:opacity-0 md:hover:opacity-100"
            style={{
              opacity: isHovered ? 1 : undefined,
            }}
          >
            <Link
              href={linkHref}
              className="inline-flex items-center text-[var(--village-orange)] hover:text-[var(--village-orange)]/80 transition-colors group text-sm font-medium"
              onClick={() => {
                // Navigate to top without animation
                window.scrollTo(0, 0)
              }}
            >
              {linkText}
              <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function VillageInfoCards() {
  const cards = [
    {
      title: "Who We Are",
      description:
        "Oasis St Martin's Village is a hub for community transformation, providing spaces where people can connect, learn, and grow together in a supportive environment.",
      expandedDescription:
        "Oasis St Martin's Village is a hub for community transformation, providing spaces where people can connect, learn, and grow together in a supportive environment. Our mission is to create inclusive spaces that foster belonging, development, and positive change for everyone in our community.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/oasis-logo-wITmx0qFbjchtrFuhC8sX6a6rVvlgD.svg",
      linkText: "About Oasis",
      linkHref: "/about-us",
    },
    {
      title: "Our Story",
      description:
        "Founded in 1699 as a school for girls by Thomas Tenison, our historic building has evolved through centuries of service to become a modern community hub with deep local roots.",
      expandedDescription:
        "Founded in 1699 as a school for girls by Thomas Tenison, our historic building has evolved through centuries of service to become a modern community hub with deep local roots. This pioneering spirit continues to inspire our work today as we honor our legacy while creating new opportunities for future generations.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-fJZWLjySaEDfGMct34TJUuNzNWxe9t.png",
      linkText: "Our Historical Journey",
      linkHref: "/history",
    },
    {
      title: "Community",
      description:
        "Our vibrant community includes youth programs, creative studios, educational initiatives, and social enterprises all working together to create positive change in our neighborhood.",
      expandedDescription:
        "Our vibrant community includes youth programs, creative studios, educational initiatives, and social enterprises all working together to create positive change in our neighborhood. We provide a platform for diverse organizations to collaborate, share resources, and amplify their impact through collective action.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WDICiLMHh8oeJBmHEtgyqGkraaSvGm.png",
      linkText: "Community Partners & Programs",
      linkHref: "/community",
    },
  ]

  return (
    <section className="w-full pt-0 pb-20 bg-transparent relative z-[1]">
      <div className="container mx-auto px-6 md:px-12 -mt-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h3 className="text-2xl font-medium text-[var(--village-orange)] mb-4">Discover More About Our Community</h3>
          <p className="text-gray-600 mb-6">
            Learn about who we are, our history, and the vibrant community that makes The Village special.
          </p>
          <div className="inline-flex items-center justify-center">
            <div className="h-px w-16 bg-[var(--village-orange)] mr-4"></div>
            <span className="text-[var(--village-orange)] font-medium">Find Out More</span>
            <div className="h-px w-16 bg-[var(--village-orange)] ml-4"></div>
          </div>
        </div>

        {/* Desktop version - hidden on mobile */}
        <div className="max-w-5xl mx-auto hidden md:grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <Card
              key={`desktop-${index}`}
              title={card.title}
              description={card.description}
              expandedDescription={card.expandedDescription}
              image={card.image}
              linkText={card.linkText}
              linkHref={card.linkHref}
              index={index}
            />
          ))}
        </div>

        {/* Mobile version - horizontal scrollable row, hidden on desktop */}
        <div className="md:hidden w-full overflow-x-auto hide-scrollbar pb-6">
          <div className="flex space-x-4 px-4 w-max">
            {cards.map((card, index) => (
              <div key={`mobile-${index}`} className="w-[280px] flex-shrink-0">
                <Card
                  title={card.title}
                  description={card.description}
                  expandedDescription={card.expandedDescription}
                  image={card.image}
                  linkText={card.linkText}
                  linkHref={card.linkHref}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
