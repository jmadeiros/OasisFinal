"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Info } from "lucide-react"
import { createPortal } from "react-dom"

// Team member data
interface TeamMember {
  id: string
  name: string
  title: string
  image: string
  logo: string // Add logo property
  bio: string
  traits: string[]
  traitIcons: string[]
  websiteUrl: string // Add website URL property
  imageStyle?: React.CSSProperties
  logoStyle?: React.CSSProperties // Add optional logoStyle property
}

// Update the teamMembers array with the new organization logos
const teamMembers: TeamMember[] = [
  {
    id: "member1",
    name: "Lambeth & Croydon Foodbank",
    title: "Trussell Trust Network",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-08%20204736-DMnNlpYcpUmdIlL9C0A2pmT0LdV98M.png",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lambeth-and-Croydon-Foodbank-Positive-Logo-RGB_%C2%A9Trussell.PNG-wIEWWmeMMHXyxrjBxdESizMjIEsp7B.png",
    bio: "Lambeth & Croydon Foodbank, part of the Trussell Trust network, plays a vital role in supporting local people facing crisis. They provide emergency food parcels and compassionate, non-judgemental support to individuals and families in need across Lambeth and Croydon. Last year alone, they distributed over 27,000 food parcels—65% of which supported children. But their impact goes beyond food: through partnerships and community hubs, they offer advice, signposting, and a space for people to find hope during difficult times.",
    traits: ["Food Support", "Crisis Aid", "Community"],
    traitIcons: ["🍲", "🆘", "🤝"],
    websiteUrl: "https://lambethcroydon.foodbank.org.uk",
    imageStyle: {
      objectFit: "cover",
      objectPosition: "center",
    },
    logoStyle: {
      objectFit: "contain",
      background: "white",
      padding: "10px",
    },
  },
  {
    id: "member2",
    name: "Symphony Studios",
    title: "Oasis St Martins",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SYPH.jpg-T5eu9Xr4kny4h8AiO3Qhd3urlGIs4c.jpeg",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-06%20141334-Fh1zqf9KzNaXH8MZKCHvLLAUY84KkT.png",
    bio: "Symphony Studios at Oasis St Martins primarily serves young people from the African and Caribbean communities, creating a vibrant hub for academia, arts, and advocacy in South London. Our facilities will offer free GCSE exam tuition, music and production classes, AI and content creation, a music studio, rehearsal spaces, and a study library.",
    traits: ["Arts", "Education", "Community"],
    traitIcons: ["🎵", "📚", "🤝"],
    websiteUrl: "https://wearesymphony.co/",
    imageStyle: {
      objectFit: "cover",
      objectPosition: "center top",
    },
    logoStyle: {
      objectFit: "contain",
      background: "white",
      padding: "10px",
    },
  },
  {
    id: "member3",
    name: "Palace for Life Foundation",
    title: "Community Sports & Wellbeing",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/oL5r4Ko0_400x400.jpg-0hi1MFOTF78h0nZ3NDqO8tzGQwnbQL.jpeg",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/oL5r4Ko0_400x400.jpg-0hi1MFOTF78h0nZ3NDqO8tzGQwnbQL.jpeg",
    bio: "At Palace for Life Foundation, we work in partnership with local organisations to help improve the lives of young south Londoners. We're looking forward to providing an inclusive sports and wellbeing programme at Oasis St Martins.",
    traits: ["Sports", "Wellbeing", "Inclusion"],
    traitIcons: ["⚽", "🧘", "🤗"],
    websiteUrl: "https://www.palaceforlife.org",
    logoStyle: {
      objectFit: "contain",
      background: "white",
      padding: "10px",
    },
  },
  {
    id: "member4",
    name: "YCUK",
    title: "Creative Agency",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/YCUK.jpg-9xqpxsNnzWYfD4QeEnoqXEEMrW4We5.jpeg",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ab7Fb7Pe_400x400.jpg-FxBtiQZkFhdmrKi9D0UlyRzT8L0OUx.jpeg",
    bio: "YCUK is the UK's first impact-lead creative agency, reimagining how creativity works with underrepresented young people. We provide peer-to-peer learning, equipment lending, paid work, and creative workshops, supporting young people's journeys into media industries – photography, film, and graphic design.",
    traits: ["Creative", "Media", "Opportunity"],
    traitIcons: ["🎨", "📷", "✨"],
    websiteUrl: "https://ycuk.org",
    imageStyle: {
      objectFit: "cover",
      objectPosition: "center",
    },
    logoStyle: {
      objectFit: "contain",
      background: "white",
      padding: "10px",
    },
  },
  {
    id: "member5",
    name: "Spiral",
    title: "Youth Support",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Spiral%20Skills-MvYO2z6sigK87dXXMyrYWjzn9s5mH6.png",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%2Bshare%2B%28%2Bfor%2Bexternal%2Borgs%29-uu2z8Lfc8Lx9inA8v1K0sibGDpzlMV.png",
    bio: "Spiral believes in youth and provides support services to help young people reach their full potential. Through mentoring, workshops, and community engagement, we create opportunities for personal growth and development.",
    traits: ["Support", "Youth", "Development"],
    traitIcons: ["🤲", "👦", "🌱"],
    websiteUrl: "https://www.spiralskills.co.uk/",
    imageStyle: {
      objectFit: "cover",
      objectPosition: "center",
    },
    logoStyle: {
      objectFit: "contain",
      background: "white",
      padding: "10px",
    },
  },
  {
    id: "member6",
    name: "I AM IN ME",
    title: "Youth Support Organisation",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IAMINME.jpg-DMZ7JQynMpjf6bQlnqlXYAk9NkWLG8.jpeg",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cropped-I-AM-IN-ME-logo-crop.png-2-tuJez9Xd1blowczumuhFxWKfLl9x9K.png",
    bio: "I AM IN ME is a dynamic community organisation dedicated to supporting young people up to the age of 25 who are at risk of or experiencing exclusion. Through a mix of engaging group workshops and tailored one-to-one support, they help individuals develop essential life skills, confidence, and pathways to employment. Their work bridges the gap between vulnerable youth and mainstream systems, offering a compassionate and empowering space to grow, connect, and thrive.",
    traits: ["Support", "Skills", "Empowerment"],
    traitIcons: ["🔧", "💪"],
    websiteUrl: "https://www.iaminme.co.uk",
    imageStyle: {
      objectFit: "cover",
      objectPosition: "center",
    },
    logoStyle: {
      objectFit: "contain",
      background: "white",
      padding: "10px",
    },
  },
  {
    id: "member7",
    name: "Rekindle",
    title: "Youth Education & Support",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2_Ruth-msAdBypSBPa5weIah7iebmQIMJpX29.webp",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rekindle-school-ghIqBi6gpjHBcMijg97zAiEbtvtohQ.webp",
    bio: "Rekindle sparks a love of learning in young people aged 11-14. We support their education, aspirations, and wellbeing through a creative and cultural curriculum. Our weekday sanctuary (open 4-7pm) offers mentoring, homework help, meals, access to professional networks, holiday clubs, and more—all free of charge.",
    traits: ["Education", "Mentoring", "Wellbeing"],
    traitIcons: ["📚", "🤝", "💫"],
    websiteUrl: "https://rekindleschool.org",
    imageStyle: {
      objectFit: "cover",
      objectPosition: "center",
    },
    logoStyle: {
      objectFit: "contain",
      background: "white",
      padding: "10px",
    },
  },
]

// Component to render the modal outside the normal component hierarchy
function ModalPortal({
  isOpen,
  onClose,
  selectedMember,
}: {
  isOpen: boolean
  onClose: () => void
  selectedMember: TeamMember | null
}) {
  // Only render if we have a selected member and modal is open
  if (!isOpen || !selectedMember) return null

  // Use createPortal to render at the document body level
  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/80" style={{ isolation: "isolate" }}>
      <div
        className="fixed inset-0 flex items-center justify-center p-4"
        onClick={onClose}
        style={{ touchAction: "none" }}
      >
        <div
          className="bg-white overflow-hidden max-w-4xl w-[85%] md:w-full max-h-[70vh] md:max-h-[90vh] shadow-2xl rounded-2xl md:rounded-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col md:flex-row h-full overflow-auto">
            {/* Left side - Logo */}
            <div className="w-full md:w-2/5 h-36 md:h-auto relative bg-[#f0e9df] rounded-t-2xl md:rounded-t-none md:rounded-l-3xl">
              <img
                src={selectedMember.logo || "/placeholder.svg"}
                alt={`${selectedMember.name} logo`}
                className="w-full h-full object-contain p-6"
                style={selectedMember.logoStyle || {}}
              />
              <button className="absolute top-4 left-4 md:hidden bg-white/80 rounded-full p-1" onClick={onClose}>
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Right side - Content */}
            <div className="w-full md:w-3/5 p-3 md:p-8 overflow-y-auto">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl md:text-3xl font-medium text-gray-900">{selectedMember.name}</h2>
                  <p className="text-sm md:text-lg text-gray-600 mb-2 md:mb-4">{selectedMember.title}</p>
                </div>
                <button
                  className="hidden md:block bg-gray-100 rounded-full p-1 hover:bg-gray-200 transition-colors"
                  onClick={onClose}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mb-4 md:mb-6">
                <p className="text-xs md:text-base text-gray-700 leading-relaxed">{selectedMember.bio}</p>
              </div>

              <div className="mb-4 md:mb-8">
                <h3 className="text-sm md:text-lg font-medium text-gray-900 mb-1 md:mb-3">
                  {selectedMember.name}'s style
                </h3>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {selectedMember.traits.map((trait, i) => (
                    <div
                      key={trait}
                      className="flex items-center gap-1 md:gap-2 px-1.5 md:px-3 py-0.5 md:py-1.5 rounded-full bg-[#f8f5f0] text-xs md:text-sm"
                    >
                      <span>{selectedMember.traitIcons[i]}</span>
                      <span>{trait}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visit Website Button */}
              <div className="flex justify-center items-center pt-3 md:pt-4 border-t border-gray-200">
                <a
                  href={selectedMember.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-6 md:px-8 py-2.5 md:py-3.5 overflow-hidden rounded-full bg-gradient-to-r from-[var(--village-green)] to-[var(--village-teal)] text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 text-sm md:text-base"
                >
                  {/* Button content */}
                  <span className="relative flex items-center justify-center gap-2">
                    <span>Visit {selectedMember.name}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transform group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default function Partners() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollPositionRef = useRef(0)

  const openModal = (member: TeamMember) => {
    // Store current scroll position before locking
    scrollPositionRef.current = window.pageYOffset
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Track scroll position to determine active card
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      const { scrollLeft } = scrollContainer
      // Calculate which card is most visible (centered)
      const cardWidth = 280 + 16 // card width + spacing
      const index = Math.round(scrollLeft / cardWidth)
      setActiveCardIndex(Math.min(index, teamMembers.length - 1))
    }

    scrollContainer.addEventListener("scroll", handleScroll)
    return () => scrollContainer.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (!isModalOpen) return

    // Store original styles
    const originalStyle = window.getComputedStyle(document.body).overflow
    const scrollY = window.scrollY

    // Apply fixed position to body
    document.body.style.overflow = "hidden"
    document.body.style.position = "fixed"
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = "100%"

    // Cleanup function to restore original state
    return () => {
      document.body.style.overflow = originalStyle
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""

      // Restore scroll position
      window.scrollTo(0, scrollY)
    }
  }, [isModalOpen])

  // Function to scroll to a specific card
  const scrollToCard = (index: number) => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const cardWidth = 280 + 16 // card width + spacing
    scrollContainer.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    })
  }

  // Calculate the distance from hovered card
  const getDistanceFactor = (index: number) => {
    if (hoveredIndex === null) return 0
    const distance = Math.abs(index - hoveredIndex)
    return distance
  }

  // Function to determine the initial rotation of each card
  const getInitialRotation = (index: number, totalCards: number) => {
    // Special case for the last card (far right)
    if (index === totalCards - 1) {
      return 2 // Slant to the right
    }
    // For other cards, alternate between -2 and 2
    return index % 2 === 0 ? -2 : 2
  }

  return (
    <section className="w-full py-16 md:py-24 bg-transparent relative z-[1]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold leading-none tracking-tight mb-4">
            <span
              className="block text-transparent bg-clip-text"
              style={{
                background: "linear-gradient(to right, #f7b733, #f26c4f)",
                WebkitBackgroundClip: "text",
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Meet Our Partners
            </span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            The passionate people behind The Village who make our community thrive.
          </p>
        </div>

        {/* Desktop layout - hidden on mobile */}
        <div className="relative hidden md:flex justify-center items-center h-[500px] sm:h-[400px] mx-auto w-full max-w-[90vw] xl:max-w-[1400px] my-12 overflow-visible">
          <div className="relative w-full h-full flex justify-center">
            {teamMembers.map((member, index) => {
              // Calculate position based on total width and number of cards
              const cardWidth = 220 // Card width in pixels
              const overlap = 30 // Reduced overlap amount for wider spread
              const effectiveCardWidth = cardWidth - overlap

              // Calculate the position of each card
              const middleCardIndex = Math.floor(teamMembers.length / 2)
              const offsetFromMiddle = (index - middleCardIndex) * effectiveCardWidth

              const isHovered = hoveredIndex === index
              const distanceFactor = getDistanceFactor(index)
              const zIndex = isHovered ? 50 : 20 - distanceFactor

              // Get the initial rotation for this card
              const initialRotation = getInitialRotation(index, teamMembers.length)

              // Calculate scale and position adjustments based on distance from hovered card
              let scaleAdjust = 1
              let yAdjust = 0
              let opacityAdjust = 1
              let rotateYAdjust = 0

              if (hoveredIndex !== null) {
                if (isHovered) {
                  scaleAdjust = 1.15
                  yAdjust = -20
                  rotateYAdjust = 0
                } else {
                  // Cards further away get pushed back more
                  scaleAdjust = Math.max(0.9, 1 - distanceFactor * 0.05)
                  yAdjust = distanceFactor * 2 // Push down slightly
                  opacityAdjust = 1 // Keep all cards fully opaque

                  // Add slight 3D rotation based on position relative to hovered card
                  rotateYAdjust = index < hoveredIndex ? 5 : -5
                }
              }

              // Special styling for the last card to keep bottom aligned
              const isLastCard = index === teamMembers.length - 1
              const transformOrigin = isLastCard ? "bottom center" : "center"

              return (
                <motion.div
                  key={member.id}
                  className="absolute cursor-pointer perspective-1000"
                  style={{
                    left: `calc(50% - ${cardWidth / 2}px + ${offsetFromMiddle}px)`,
                    zIndex,
                    perspective: "1000px",
                    transformOrigin,
                  }}
                  initial={{
                    rotate: initialRotation,
                    y: 0,
                    rotateY: 0,
                  }}
                  animate={{
                    zIndex,
                    rotate: isHovered ? 0 : initialRotation,
                    rotateY: rotateYAdjust,
                    scale: scaleAdjust,
                    y: isHovered ? -20 : yAdjust,
                    opacity: opacityAdjust,
                    transition: {
                      duration: 0.5,
                      ease: [0.19, 1, 0.22, 1], // Cubic bezier for smooth motion
                      opacity: { duration: 0.3 },
                    },
                  }}
                  whileHover={{
                    scale: 1.15,
                    zIndex: 50,
                    rotate: 0,
                    rotateY: 0,
                    y: -20,
                    transition: {
                      duration: 0.5,
                      ease: [0.19, 1, 0.22, 1],
                    },
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onClick={() => openModal(member)}
                >
                  <div
                    className="relative overflow-hidden w-[180px] sm:w-[220px] h-[280px] sm:h-[320px] transition-shadow duration-500"
                    style={{
                      borderRadius: "16px",
                      background: isHovered ? "#e8d5b5" : "#fdf6e9",
                      boxShadow: isHovered
                        ? "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
                        : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    }}
                  >
                    {/* Card texture overlay - simplified to avoid SVG errors */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-gray-200"></div>

                    {/* Image container with same border radius */}
                    <div className="h-full w-full overflow-hidden" style={{ borderRadius: "14px" }}>
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover object-center"
                        style={member.imageStyle || {}}
                      />
                    </div>

                    {/* Gradient overlay for text */}
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4"
                      style={{ borderRadius: "0 0 14px 14px" }}
                    >
                      <h3 className="text-white text-lg font-medium">{member.name}</h3>
                      <p className="text-white/80 text-sm">{member.title}</p>
                    </div>

                    {/* Info label that appears on hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 bg-white rounded-full px-3 py-1 shadow-md flex items-center gap-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <Info className="w-4 h-4" />
                          <span className="whitespace-nowrap text-sm font-medium">
                            More about {member.name.split(" ")[0]}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile layout - horizontal scrollable container with snap points */}
        <div className="md:hidden w-full">
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto hide-scrollbar py-8 px-4 snap-x snap-mandatory scroll-smooth"
            style={{
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div className="flex space-x-4 w-max pb-4">
              {teamMembers.map((member, index) => {
                const isActive = activeCardIndex === index

                return (
                  <div
                    key={member.id}
                    className={`flex-shrink-0 w-[280px] cursor-pointer snap-center transition-transform duration-300 ${
                      isActive ? "scale-[1.02]" : "scale-100"
                    }`}
                    onClick={() => openModal(member)}
                  >
                    <div
                      className={`relative overflow-hidden h-[320px] transition-all duration-500`}
                      style={{
                        borderRadius: "16px",
                        background: "#fdf6e9",
                        boxShadow: isActive
                          ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                          : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      }}
                    >
                      {/* Card texture overlay - simplified to avoid SVG errors */}
                      <div className="absolute inset-0 opacity-10 pointer-events-none bg-gray-200"></div>

                      {/* Image container with same border radius */}
                      <div className="h-full w-full overflow-hidden" style={{ borderRadius: "14px" }}>
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover object-center"
                          style={member.imageStyle || {}}
                        />
                      </div>

                      {/* Gradient overlay for text */}
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4"
                        style={{ borderRadius: "0 0 14px 14px" }}
                      >
                        <h3 className="text-white text-lg font-medium">{member.name}</h3>
                        <p className="text-white/80 text-sm">{member.title}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeCardIndex === index ? "bg-[var(--village-orange)] w-5" : "bg-gray-300"
                }`}
                onClick={() => scrollToCard(index)}
                aria-label={`View partner ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex justify-center mt-2">
            <p className="text-sm text-gray-500 italic">Swipe to explore</p>
          </div>
        </div>
      </div>

      {/* Modal Portal Component */}
      <ModalPortal isOpen={isModalOpen} onClose={closeModal} selectedMember={selectedMember} />
    </section>
  )
}
