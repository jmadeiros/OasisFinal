"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

interface ImageLightboxProps {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function ImageLightbox({ images, currentIndex, isOpen, onClose, onNavigate }: ImageLightboxProps) {
  const [loading, setLoading] = useState(true)

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        onNavigate(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
      } else if (e.key === "ArrowRight") {
        onNavigate(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentIndex, images.length, onClose, onNavigate])

  // Prevent body scrolling when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <div
            className="relative max-w-7xl w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            {/* Image container */}
            <div className="relative w-full h-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <div className="relative w-full max-w-5xl h-auto max-h-[80vh]">
                    {loading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                        <div className="w-12 h-12 border-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
                      </div>
                    )}
                    <Image
                      src={images[currentIndex] || "/placeholder.svg"}
                      alt={`Enlarged view ${currentIndex + 1} of ${images.length}`}
                      width={1200}
                      height={800}
                      className="object-contain w-full h-full max-h-[80vh]"
                      onLoad={() => setLoading(false)}
                      priority
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation buttons - only show if there are multiple images */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onNavigate(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
                  }}
                  className="absolute left-4 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onNavigate(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
                  }}
                  className="absolute right-4 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
