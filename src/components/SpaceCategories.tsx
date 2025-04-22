"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface SpaceCategoryProps {
  onCategorySelect: (category: string, subCategory: string | null) => void
  activeCategory?: string
}

export default function SpaceCategories({ onCategorySelect, activeCategory = "" }: SpaceCategoryProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  // Update the categories array to include defaultSubCategory
  const categories = [
    {
      id: "offices",
      title: "Private Offices",
      description: "Private studios and shared workspace to suit you",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-06%20125944-d2wKMDZvHfb7wJpuf3irqK4X2mvNaO.png",
      defaultSubCategory: "creative-labs",
    },
    {
      id: "events",
      title: "Event Spaces",
      description: "Versatile venues for workshops, presentations, and gatherings",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-05%20174813.png-NQEWAvpk0UYCOycrkCnsRittbXYjQV.jpeg",
      defaultSubCategory: "main-hall",
    },
    {
      id: "meeting-rooms",
      title: "Meeting Rooms",
      description: "Professional spaces for discussions, presentations, and client meetings",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-04%20151434-xf6RJDRDhlc0cEgKIVn3idy7xRKiTS.png",
      defaultSubCategory: "boardroom",
    },
    {
      id: "coworking",
      title: "Coworking",
      description: "Flexible workspace solutions for individuals and small teams",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-13%20184948-RC1OakqKhDVvuQ3CiNq34tDdmAQQnn.png",
      defaultSubCategory: "community",
    },
  ]

  return (
    <section className="py-0 md:py-16 mt-0 md:mt-16 bg-[#f8f5f0]">
      <div className="container mx-auto px-0 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 max-w-7xl mx-auto">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className={`relative overflow-hidden rounded-xl shadow-md bg-white cursor-pointer group ${
                activeCategory === category.id
                  ? "ring-2 md:ring-4 ring-[var(--village-teal)] ring-offset-2 md:ring-offset-4 ring-offset-[#f8f5f0]"
                  : ""
              }`}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => onCategorySelect(category.id, category.defaultSubCategory)}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-40 sm:h-44 md:h-64 overflow-hidden">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 text-white">
                <h3 className="text-center md:text-left text-base md:text-2xl font-medium mb-1 md:mb-2">
                  {category.title}
                </h3>

                <div className="flex items-center justify-center md:justify-start text-xs md:text-sm font-medium">
                  <span className="mr-1 md:mr-2">Explore options</span>
                  <motion.div animate={{ x: hoveredCategory === category.id ? 5 : 0 }} transition={{ duration: 0.2 }}>
                    <ArrowRight size={14} className="md:w-4 md:h-4" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
