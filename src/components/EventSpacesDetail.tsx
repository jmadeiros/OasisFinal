"use client"

import { useState } from "react"
import Image from "next/image"
import { Users, Maximize, Expand, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Event spaces data from the brochure
const eventSpaces = {
  "main-hall": {
    title: "Main Hall",
    description:
      "A versatile hall for performances, conferences, and large events. With excellent acoustics and a stage area, this space is perfect for presentations, performances, and formal gatherings.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9FKSmC4UKMXxOdlN0SSrUzVTyaRJXZ.png",
    capacity: [
      { type: "Seated on benches", count: "144 (36 benches, 4 per bench)" },
      { type: "Seated on chairs", count: "250" },
      { type: "Standing capacity", count: "250" },
    ],
    dimensions: "11m x 21.9m (240.9 sqm / 2,593 sq ft)",
    features: [
      "Stage area",
      "Excellent acoustics",
      "Natural lighting",
      "AV equipment available",
      "Flexible seating arrangements",
    ],
  },
  "sports-hall": {
    title: "Sports Hall",
    description:
      "A spacious multi-purpose hall suitable for various events and sports activities. With high ceilings and excellent natural light, this versatile space can be configured to suit a wide range of needs.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oaisis_VillageSTMartins_LR_YCUK_37.jpg-8tJus4VLL1unO3W2GqgZhuUEmg4f1U.jpeg",
    capacity: [
      { type: "Seated at round tables", count: "192 (24 tables, 8 per table)" },
      { type: "Standing capacity", count: "At least 800" },
    ],
    dimensions: "18m x 32.9m (592.2 sqm / 6,374 sq ft)",
    features: [
      "High ceilings",
      "Excellent natural light",
      "Football capacity: 6-a-side",
      "Versatile configuration options",
      "Our largest venue space",
    ],
  },
  "dining-hall": {
    title: "Dining Hall",
    description:
      "Ideal for dining events and gatherings with natural light and a spacious feel. This elegant space retains many original features and provides a charming setting for lunches, dinners, and receptions.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gSby6nWOx8F8TTgpzd7yc4C0kwksbV.png",
    capacity: [{ type: "Seated at tables", count: "Approx. 150 (36 tables, 4 per table)" }],
    dimensions: "14.8m x 15.5m (229.4 sqm / 2,469 sq ft)",
    features: [
      "Natural light",
      "Original architectural features",
      "Elegant atmosphere",
      "Adjacent to kitchen facilities",
      "Perfect for dining events",
    ],
  },
  "conference-room": {
    title: "Conference Room",
    description:
      "A professional meeting space with period features and modern amenities. Perfect for board meetings, training sessions, and small group discussions. The room features a kitchenette, storage facilities, and plenty of natural light.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oaisis_VillageSTMartins_LR_YCUK_1.jpg-VhdTZUj8klX8GSxBfc8oOTmMSO3yzF.jpeg",
    capacity: [{ type: "Boardroom style", count: "8-10 people" }],
    dimensions: "6.7m x 14.5m (97.15 sqm / 1,046 sq ft)",
    features: [
      "Kitchenette with refreshment facilities",
      "Display boards and presentation facilities",
      "High-speed WiFi",
      "Natural light",
      "Period features",
    ],
  },
  "old-gym": {
    title: "Old Gym",
    description:
      "Great for meetings, yoga classes, and standing events. This intimate space offers a cozy atmosphere for smaller gatherings and activities requiring a more personal setting.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0p7SmbepYizLFydtqTQpAt9pqLqi8o.png",
    capacity: [
      { type: "Seated at tables", count: "64 (8 tables, 8 per table)" },
      { type: "Standing capacity", count: "100" },
      { type: "Yoga/mat space", count: "30–35 people" },
    ],
    dimensions: "7.4m x 21.5m (159.1 sqm / 1,713 sq ft)",
    features: [
      "Intimate atmosphere",
      "Perfect for smaller gatherings",
      "Versatile space",
      "Good natural light",
      "Cozy setting",
    ],
  },
}

export default function EventSpacesDetail() {
  const [activeSpace, setActiveSpace] = useState("main-hall")
  const [showGallery, setShowGallery] = useState(false)

  const handleSpaceChange = (space: string) => {
    setActiveSpace(space)
  }

  const scrollToBooking = () => {
    const bookingForm = document.getElementById("booking-form")
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Our Event Spaces</h2>

        <Tabs defaultValue="main-hall" onValueChange={handleSpaceChange}>
          <TabsList className="w-full flex flex-wrap mb-6">
            <TabsTrigger
              value="main-hall"
              className="data-[state=active]:bg-[var(--village-orange)] data-[state=active]:text-white transition-all duration-300"
            >
              Main Hall
            </TabsTrigger>
            <TabsTrigger
              value="sports-hall"
              className="data-[state=active]:bg-[var(--village-orange)] data-[state=active]:text-white transition-all duration-300"
            >
              Sports Hall
            </TabsTrigger>
            <TabsTrigger
              value="dining-hall"
              className="data-[state=active]:bg-[var(--village-orange)] data-[state=active]:text-white transition-all duration-300"
            >
              Dining Hall
            </TabsTrigger>
            <TabsTrigger
              value="conference-room"
              className="data-[state=active]:bg-[var(--village-orange)] data-[state=active]:text-white transition-all duration-300"
            >
              Conference Room
            </TabsTrigger>
            <TabsTrigger
              value="old-gym"
              className="data-[state=active]:bg-[var(--village-orange)] data-[state=active]:text-white transition-all duration-300"
            >
              Old Gym
            </TabsTrigger>
          </TabsList>

          {Object.keys(eventSpaces).map((spaceKey) => {
            const space = eventSpaces[spaceKey]
            return (
              <TabsContent key={spaceKey} value={spaceKey} className="animate-in fade-in-50 duration-300">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative h-80 rounded-lg overflow-hidden shadow-md group">
                    <Image
                      src={space.image || "/placeholder.svg"}
                      alt={space.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[var(--village-orange)] hover:bg-[var(--village-orange)]/90 text-white">
                        {space.title}
                      </Badge>
                    </div>
                    <button
                      className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                      aria-label={`View ${space.title} gallery`}
                    >
                      <Expand className="h-4 w-4 text-white" />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">{space.title}</h3>
                    <p className="text-gray-700 mb-6">{space.description}</p>

                    <div className="space-y-4 mb-6">
                      {space.capacity.map((cap, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Users size={20} className="text-[var(--village-orange)]" />
                          <span className="text-gray-700">
                            {cap.type}: {cap.count}
                          </span>
                        </div>
                      ))}

                      <div className="flex items-center gap-3">
                        <Maximize size={20} className="text-[var(--village-orange)]" />
                        <span className="text-gray-700">Dimensions: {space.dimensions}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium text-gray-800 mb-2">Features:</h4>
                      <ul className="grid grid-cols-1 gap-2">
                        {space.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-700">
                            <Check className="w-5 h-5 text-[var(--village-orange)] flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      className="bg-[var(--village-orange)] hover:bg-[var(--village-orange)]/90 text-white"
                      onClick={scrollToBooking}
                    >
                      Book This Space
                    </Button>
                  </div>
                </div>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </div>
  )
}
