"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface FlippableCardProps {
  frontImage: string
  altText: string
  title: string
  description: string
  iconColor: string
  iconType?: "user" | "coffee" | "calendar" | "location" // Add this prop
  gradientFrom?: string
  gradientTo?: string
  gradientDirection?: string
  onFlip?: (isFlipped: boolean) => void
  isFlipped?: boolean // Control from parent
}

export default function FlippableCard({
  frontImage,
  altText,
  title,
  description,
  iconColor,
  iconType = "user", // Default to user icon
  gradientFrom = "#e8e2d9",
  gradientTo = "#d8d0c6",
  gradientDirection = "to bottom right",
  onFlip,
  isFlipped: externalIsFlipped,
}: FlippableCardProps) {
  const [internalIsFlipped, setInternalIsFlipped] = useState(false)

  // Use external state if provided, otherwise use internal state
  const isFlipped = externalIsFlipped !== undefined ? externalIsFlipped : internalIsFlipped

  const handleFlip = () => {
    // Only handle flip internally if not controlled externally
    if (externalIsFlipped === undefined) {
      const newFlippedState = !internalIsFlipped
      setInternalIsFlipped(newFlippedState)
      if (onFlip) {
        onFlip(newFlippedState)
      }
    } else if (onFlip) {
      // If externally controlled, just call the callback
      onFlip(!externalIsFlipped)
    }
  }

  // Function to render the appropriate icon based on iconType
  const renderIcon = () => {
    switch (iconType) {
      case "user":
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
              fill={iconColor}
            />
          </svg>
        )
      case "coffee":
        return (
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Cup body - larger size */}
            <rect x="10" y="16" width="14" height="14" rx="2" stroke={iconColor} strokeWidth="2" fill="none" />
            {/* Cup handle - larger size */}
            <path d="M24 20h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4" stroke={iconColor} strokeWidth="2" fill="none" />
            {/* Steam lines - larger size */}
            <line x1="14" y1="10" x2="14" y2="6" stroke={iconColor} strokeWidth="2" strokeLinecap="round" />
            <line x1="17" y1="10" x2="17" y2="6" stroke={iconColor} strokeWidth="2" strokeLinecap="round" />
            <line x1="20" y1="10" x2="20" y2="6" stroke={iconColor} strokeWidth="2" strokeLinecap="round" />
          </svg>
        )
      case "calendar":
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM19 8H5V6H19V8Z"
              fill={iconColor}
            />
          </svg>
        )
      case "location":
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
              fill={iconColor}
            />
          </svg>
        )
      default:
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
              fill={iconColor}
            />
          </svg>
        )
    }
  }

  return (
    <div className="relative w-full h-full perspective-1000 cursor-pointer" onClick={handleFlip}>
      <div className="w-full h-full relative preserve-3d">
        {/* Card container */}
        <motion.div
          className="w-full h-full absolute inset-0"
          initial={false}
          animate={{
            rotateY: isFlipped ? 180 : 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1], // Custom ease curve for smoother animation
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front of card (image) */}
          <div
            className="absolute w-full h-full rounded-lg overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
            }}
          >
            <img src={frontImage || "/placeholder.svg"} alt={altText} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          {/* Back of card (info) - Update with gradient background */}
          <div
            className="absolute w-full h-full rounded-lg p-6 flex flex-col"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
              background: `linear-gradient(${gradientDirection}, ${gradientFrom}, ${gradientTo})`,
            }}
          >
            <div className="mb-4">{renderIcon()}</div>
            <h3 className="text-xl font-medium text-gray-800 mb-3">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
