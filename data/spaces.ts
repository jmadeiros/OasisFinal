import {
  Users,
  Calendar,
  Wifi,
  Coffee,
  Utensils,
  Video,
  Dumbbell,
  Zap,
  Layers,
  Award,
  Star,
  MessageSquare,
  UserPlus,
  Music,
} from "lucide-react"

// Consultation room images
export const consultationRoomImages = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/acord%202-hCOZ0RszwoM6ZAlL9woJpsplmjoM8K.png", // Room 1 (was Room 3) - Medium room with desk and table
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/accord%202-xN7DyhaYZEJxHMnb1ujqdlUubMPPIf.png", // Room 2 (was Room 1) - Small meeting room
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Apr%208%2C%202025%2C%2003_01_09%20PM-r7eirxeq0XljLVZI2eXEJWvQJcrr7v.png", // Room 3 (was Room 2) - Office style
]

// Boardroom images
export const boardroomImages = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oaisis_VillageSTMartins_LR_YCUK_16.jpg-xLvQiuOxxzehMhXjQd2nKFyfndBscm.jpeg", // Oaisis_VillageSTMartins_LR_YCUK_16.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oaisis_VillageSTMartins_LR_YCUK_15.jpg-rLhvnzU4UAaxXC2UlITOBqz86dvj06.jpeg", // Oaisis_VillageSTMartins_LR_YCUK_15.jpg
]

// Conference room images
export const conferenceRoomImages = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-08%20201245-jLm7nDAA3eAzOfT6kcWFBsr2MulrIE.png", // First image showing the meeting room with kitchenette
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-08%20201306-CryhcVeK250OU0FpoWV3Hs7CxquVqp.png", // Second image showing the window view
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-08%20201323-AupGjtQoVrsyw0LxFbd7Tf4T9gLMiS.png", // Third image showing the room with stacked chairs
]

// Staff room images
export const staffRoomImages = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-04%20135136-50bH4ZZnQWUCITaBnXoezqWPh10DyV.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-04%20151609-qpVwNZ3bhaJHTi1H8QSmXjzt2olRbL.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-05%20174907-EenOPcw5ONzOOAwhyRN8IaJ0XX563h.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-05%20174041-zi11fIj6yPE90g7IAZVNhYI4H7VGDp.png",
]

export const spaces = {
  offices: {
    title: "Private Offices",
    description:
      "Fully-furnished private office suites for teams of all sizes. Individual office spaces perfect for small teams or professionals seeking a dedicated workspace with modern amenities and natural lighting.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-14%20at%2018.03.01_e3841300.jpg-gVI9mqfww7jfUW2oaQuiUMxnafej2X.jpeg",
    features: [
      "Lockable private space",
      "Ergonomic furniture",
      "High-speed internet",
      "Business address service",
      "Meeting room credits",
      "Enterprise-grade security",
    ],
    capacity: [
      { type: "Small office", count: "1-4 people" },
      { type: "Medium office", count: "5-12 people" },
      { type: "Large office", count: "13-30 people" },
      { type: "Custom solutions", count: "30+ people" },
    ],
    dimensions: "Sizes from 150 sqft to 800+ sqft",
    cta: "Explore Private Offices",
    ctaLink: "#booking-form",
    color: "var(--village-teal)",
  },
  events: {
    title: "Event Spaces",
    description:
      "Versatile venues for workshops, presentations, and community gatherings. Our historic spaces offer character and charm with modern amenities for successful events.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9FKSmC4UKMXxOdlN0SSrUzVTyaRJXZ.png",
    features: [
      "Multiple venue options",
      "AV equipment and WiFi",
      "Catering options available",
      "Free on-site parking",
      "Flexible layouts",
      "Event planning assistance",
    ],
    capacity: [
      { type: "Main Hall", count: "Up to 250 people" },
      { type: "Sports Hall", count: "Up to 800 people" },
      { type: "Dining Hall", count: "Up to 150 people" },
      { type: "Old Gym", count: "Up to 100 people" },
      { type: "Staff Room", count: "Up to 20 people" },
      { type: "Dance Studio", count: "Up to 25 people" },
    ],
    dimensions: "Various spaces from 42 sqm to 592 sqm",
    cta: "Book Event Space",
    ctaLink: "#booking-form",
    color: "var(--village-orange)",
  },
  coworking: {
    title: "Coworking",
    description:
      "Flexible workspace solutions for individuals and small teams. Hot desks, dedicated desks, and open areas designed for productivity and collaboration.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-13%20184920-nkLASpKdXkVsoSB7kTVCgN0GHsGx8l.png",
    features: [
      "24/7 building access",
      "High-speed internet",
      "Meeting room credits",
      "Printing facilities",
      "Community events",
      "Coffee and refreshments",
    ],
    capacity: [
      { type: "Hot desks", count: "Unlimited" },
      { type: "Dedicated desks", count: "Limited availability" },
      { type: "Private booths", count: "4 available" },
    ],
    dimensions: "Various configurations available",
    cta: "View Coworking Options",
    ctaLink: "#booking-form",
    color: "var(--village-green)",
  },
  "meeting-rooms": {
    title: "Meeting Rooms",
    description:
      "Professional meeting spaces with contemporary design and technology. Choose from executive boardrooms or flexible meeting spaces with natural light and period features.",
    image: boardroomImages[0],
    features: [
      "HD displays",
      "Video conferencing",
      "Multiple configurations",
      "Refreshment facilities",
      "Natural lighting",
      "Presentation equipment",
    ],
    capacity: [
      { type: "Boardroom", count: "8-12 people" },
      { type: "Conference room", count: "Up to 20 people" },
    ],
    dimensions: "Various sizes from 15 sqm to 50 sqm",
    cta: "Book Meeting Room",
    ctaLink: "#booking-form",
    color: "var(--village-teal)",
  },
}

// Event spaces data from the brochure
export const eventSpacesData = {
  "sports-hall": {
    title: "Sports Hall",
    description:
      "A spacious multi-purpose hall suitable for various events and sports activities. With high ceilings and excellent natural light, this versatile space can be configured to suit a wide range of needs.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-13%20144100-U8xYUktGDly7OdjBvj9zbbqwNiZjjn.png",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-13%20144100-U8xYUktGDly7OdjBvj9zbbqwNiZjjn.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-06%20124102-gBMe8SmZwcBbLOwJNS3VTbbaE18Joq.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-13%20143948-NM2tS8fwv8Fhku3C3kgbq2jJCQBjRG.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oaisis_VillageSTMartins_LR_YCUK_37.jpg-8tJus4VLL1unO3W2GqgZhuUEmg4f1U.jpeg",
    ],
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
      "Multiple basketball hoops",
      "Professional wooden sports flooring",
    ],
    icon: Dumbbell,
  },
  "main-hall": {
    title: "Main Hall",
    description:
      "A versatile hall for performances, conferences, and large events. With excellent acoustics and a stage area, this space is perfect for presentations, performances, and formal gatherings.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9FKSmC4UKMXxOdlN0SSrUzVTyaRJXZ.png",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7U0kaRuSq1NjViHuNei9pf1LuSUJ1y.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-bXgaqZt3suL11wsAJjqab3ke1E9rIG.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pWiBrDQ5IzpIdRuoAmKDzZUxhd0h5y.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2akA7G0u19CzUwV4BPdVRy3IOVMbn8.png",
    ],
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
    icon: Calendar,
  },
  "dining-hall": {
    title: "Dining Hall",
    description: "Elegant space with historic features, perfect for formal dining events and receptions.",
    image: "/images/event-space-arched.png",
    images: ["/images/event-space-arched.png"],
    capacity: [
      { type: "Seated dining", count: "Up to 150 people" },
      { type: "Reception style", count: "Up to 200 people" },
    ],
    dimensions: "15m x 25m (375 sqm / 4,036 sq ft)",
    features: [
      "Historic architecture",
      "Excellent natural light",
      "Kitchen access",
      "Flexible layout options",
      "Period features",
      "Elegant atmosphere",
    ],
    icon: Utensils,
  },
  "old-gym": {
    title: "Old Gym",
    description: "Intimate space with character, suitable for smaller gatherings and community events.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9FKSmC4UKMXxOdlN0SSrUzVTyaRJXZ.png",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9FKSmC4UKMXxOdlN0SSrUzVTyaRJXZ.png"],
    capacity: [
      { type: "Workshop style", count: "Up to 50 people" },
      { type: "Theatre style", count: "Up to 100 people" },
    ],
    dimensions: "10m x 15m (150 sqm / 1,615 sq ft)",
    features: [
      "Cozy atmosphere",
      "Original features",
      "Flexible layout",
      "Good acoustics",
      "Intimate setting",
      "Community feel",
    ],
    icon: Users,
  },
  "staff-room": {
    title: "Staff Room",
    description:
      "Comfortable meeting space with a relaxed atmosphere, ideal for team gatherings and informal meetings.",
    image: staffRoomImages[0],
    images: staffRoomImages,
    capacity: [
      { type: "Meeting style", count: "Up to 20 people" },
      { type: "Casual seating", count: "Up to 15 people" },
    ],
    dimensions: "8m x 12m (96 sqm / 1,033 sq ft)",
    features: [
      "Comfortable seating",
      "Kitchenette facilities",
      "Relaxed environment",
      "Natural lighting",
      "Presentation equipment",
      "Breakout areas",
    ],
    icon: Coffee,
  },
  "dance-studio": {
    title: "Dance Studio",
    description:
      "Professional dance studio with wooden flooring, full-length mirrors, and excellent lighting. Perfect for dance classes, fitness sessions, rehearsals, and movement workshops.",
    image: "/images/dance-studio.png",
    images: ["/images/dance-studio.png"],
    capacity: [
      { type: "Dance class", count: "Up to 15 people" },
      { type: "Fitness session", count: "Up to 20 people" },
      { type: "Workshop", count: "Up to 25 people" },
    ],
    dimensions: "6.7m x 6.3m (42.21 sqm / 454 sq ft)",
    features: [
      "Sprung wooden floor",
      "Full-length mirrors",
      "Track lighting",
      "Natural light from windows",
      "Sound system available",
      "Climate controlled",
    ],
    icon: Music,
  },
}

// Office options data
export const officeOptions = {
  "director-office": {
    title: "Director's Office",
    description:
      "Premium office space combining an executive desk with an integrated meeting area. Ideal for directors, managers, or small teams requiring a professional environment with meeting capabilities.",
    image: "/images/director-office.png",
    capacity: [{ type: "Capacity", count: "1 executive + up to 8 meeting attendees" }],
    dimensions: "60.75 sqm (8.1m × 7.5m)",
    features: [
      "Executive desk with ergonomic chair",
      "Meeting table for 8 people",
      "Natural lighting with garden views",
      "Storage cabinets and filing space",
      "Professional, quiet environment",
      "Artwork and premium furnishings",
    ],
    icon: Star,
  },
  "creative-labs": {
    title: "Creative Labs",
    description:
      "Specialized spaces equipped for creative work, research, and practical activities. Features built-in workbenches, storage, and specialist equipment areas.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Apr%208%2C%202025%2C%2005_10_25%20PM-r9FCkwsK7eoeROwpWMfjpugaMS3KND.png",
    capacity: [{ type: "Capacity", count: "Up to 30 people" }],
    dimensions: "60.75 sqm (8.1m × 7.5m)",
    features: [
      "Customizable layout",
      "Specialist equipment areas",
      "Storage solutions",
      "Prep area facilities",
      "Flexible workspace",
    ],
    icon: Award,
  },
  "team-office": {
    title: "Team Office",
    description:
      "Dedicated private office space designed for collaborative teams requiring both privacy and interaction. Features ergonomic workstations, dedicated meeting areas, and customizable layouts to support team productivity and creativity in a professional environment.",
    image: "/images/team-office-1.png",
    images: ["/images/team-office-1.png", "/images/team-office-2.png"],
    capacity: [{ type: "Capacity", count: "5-15 people" }],
    dimensions: "300-500 sq ft",
    features: [
      "Private entrance with secure access",
      "Dedicated internal meeting area",
      "Ergonomic height-adjustable workstations",
      "High-speed fiber internet connection",
      "Built-in storage solutions and filing cabinets",
      "Customizable layout to suit team workflows",
      "Natural lighting with garden views",
      "Climate control and excellent acoustics",
    ],
    icon: Users,
  },
  "innovation-studio": {
    title: "Innovation Studio",
    description:
      "Versatile creative space specifically designed for innovation workshops, design thinking, and collaborative ideation sessions. Features modular furniture, writable surfaces, and flexible layouts that can be reconfigured to support different creative processes and team dynamics.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-04%20110740-1vaPQ5f4yyeAsjH4eqRuQkwHfVrFI6.png",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-04%20110740-1vaPQ5f4yyeAsjH4eqRuQkwHfVrFI6.png",
      "/images/innovation-studio-2.png",
    ],
    capacity: [{ type: "Capacity", count: "Up to 20 people" }],
    dimensions: "400-600 sq ft",
    features: [
      "360° whiteboard walls for ideation",
      "Modular, reconfigurable furniture",
      "Advanced presentation equipment",
      "Dedicated breakout areas for small groups",
      "Abundant natural lighting with blackout options",
      "Integrated technology for digital collaboration",
      "Inspiration wall for pinning ideas and materials",
      "Creative supplies and design thinking toolkits",
    ],
    icon: Zap,
  },
  "workshop-studio": {
    title: "Workshop Studio & Conservatory",
    description:
      "Practical workspace for hands-on projects and creative production. Features a beautiful conservatory area with floor-to-ceiling windows, abundant natural light, and long wooden workbenches perfect for creative work and workshops.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/science%20room%20not%20lab-3bDed6PX0RyOQrc37MHSG2fzMljNHL.png",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/science%20room%20not%20lab-3bDed6PX0RyOQrc37MHSG2fzMljNHL.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/science%20room%20not%20lab%20conservatory%20.jpg-p7s4oJtOSIZRkKtFAuPdN5EsO1pCsr.jpeg",
    ],
    capacity: [{ type: "Capacity", count: "Up to 15 people" }],
    dimensions: "60.75 sqm (8.1m × 7.5m) / 654 sq ft",
    features: [
      "Modern classroom setup",
      "Conservatory with panoramic views",
      "Large display screen for presentations",
      "Flexible seating arrangements",
      "Abundant natural lighting",
      "Perfect for workshops and training",
    ],
    icon: Layers,
  },
  "executive-suite": {
    title: "Team Collaboration Suite",
    description:
      "Versatile workspace designed for team productivity with integrated meeting and work areas. Perfect for collaborative teams requiring both individual workstations and discussion space.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/our%20hQ-abWPghPyzfIRisqWBTMzvKYpGhDOIe.png",
    capacity: [{ type: "Capacity", count: "4-8 team members" }],
    dimensions: "42.34 sqm (7.3m × 5.8m)",
    features: [
      "L-shaped workstations",
      "Central meeting table",
      "Natural lighting with panoramic views",
      "Multiple computer stations",
      "Integrated storage solutions",
      "Collaborative layout",
    ],
    icon: Users,
  },
  "team-hub": {
    title: "Team Hub",
    description:
      "Open-concept collaborative workspace designed to foster team productivity, spontaneous interaction, and cross-functional collaboration. Features a mix of workstations, meeting pods, and social areas that create a dynamic environment for teams that thrive on communication and shared energy.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-04%20115740-BWWnFXj76CrseU6XgB5H60KkuO7FYe.png",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-04%20115740-BWWnFXj76CrseU6XgB5H60KkuO7FYe.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-04%20120551-8EAlQFOirMJi2YAKijWgho16TkyFce.png",
    ],
    capacity: [{ type: "Capacity", count: "8-20 team members" }],
    dimensions: "400-700 sq ft",
    features: [
      "Open plan design with acoustic considerations",
      "Collaborative zones with shared displays",
      "Private meeting pods for focused discussions",
      "Shared resources and technology hub",
      "Flexible breakout spaces with comfortable seating",
      "Team storage solutions and lockers",
      "Communal kitchen and refreshment area",
      "Integrated digital and physical project boards",
    ],
    icon: Users,
  },
  "consultation-rooms": {
    title: "Consultation Rooms",
    description:
      "Private, professional spaces designed for one-on-one meetings and client consultations. Ideal for therapists, advisors, and consultants requiring confidentiality and comfort.",
    image: consultationRoomImages[0],
    images: consultationRoomImages,
    capacity: [{ type: "Capacity", count: "2-8 people" }],
    dimensions: "Various sizes from 14 sqm to 23.4 sqm",
    features: [
      "Complete privacy",
      "Professional furnishings",
      "Natural lighting",
      "Soundproofed spaces",
      "Comfortable seating",
      "Multiple room options",
    ],
    icon: MessageSquare,
  },
  "education-suite": {
    title: "Education Suite",
    description:
      "Traditional classroom environment ideal for training sessions, workshops, and educational programs. Features rows of tables with comfortable seating, ceiling-mounted projector, and large windows providing natural light.",
    image: "/images/education-suite-classroom.png",
    capacity: [{ type: "Capacity", count: "Up to 30 students" }],
    dimensions: "400-600 sq ft",
    features: [
      "Classroom-style setup",
      "Ceiling-mounted projector",
      "Multiple windows for natural light",
      "Ergonomic green chairs",
      "High-speed internet",
      "Ideal for training and workshops",
    ],
    icon: Calendar,
  },
}

// Community options data
export const communityOptions = {
  networking: {
    title: "Networking Events",
    description: "Regular events designed to connect members and foster collaboration within The Village community.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-16%20200034-RkSkXb6PWOma24jAqPu0a0ieVF2Gn0.png",
    capacity: [{ type: "Typical attendance", count: "30-100 people" }],
    dimensions: "Various spaces depending on event size",
    features: [
      "Industry-specific meetups",
      "Pitch nights",
      "Expert panels",
      "Networking breakfasts",
      "Community introductions",
    ],
    icon: Users,
  },
  "social-events": {
    title: "Social Events",
    description: "Fun, relaxed gatherings that help build relationships and create a vibrant community atmosphere.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-16%20200034-RkSkXb6PWOma24jAqPu0a0ieVF2Gn0.png",
    capacity: [{ type: "Typical attendance", count: "20-150 people" }],
    dimensions: "Various spaces depending on event type",
    features: [
      "Community lunches",
      "After-work socials",
      "Holiday celebrations",
      "Cultural events",
      "Wellness activities",
    ],
    icon: Coffee,
  },
  workshops: {
    title: "Workshops & Learning",
    description: "Educational sessions and skill-building workshops to help community members grow professionally.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-16%20200034-RkSkXb6PWOma24jAqPu0a0ieVF2Gn0.png",
    capacity: [{ type: "Typical attendance", count: "10-50 people" }],
    dimensions: "Configured for optimal learning experience",
    features: [
      "Skill-sharing sessions",
      "Professional development",
      "Expert-led workshops",
      "Hands-on learning",
      "Mentorship programs",
    ],
    icon: Calendar,
  },
}

// Meeting room options data - Updated with separate images for boardroom and conference room
export const meetingRoomOptions = {
  boardroom: {
    title: "Boardroom",
    description:
      "Executive boardroom with premium furnishings and technology. Perfect for important client meetings, board discussions, and presentations requiring a professional setting.",
    images: boardroomImages,
    capacity: [{ type: "Capacity", count: "8-12 people" }],
    dimensions: "Approximately 25-30 sqm",
    features: [
      "Executive furniture",
      "Large display screen",
      "Video conferencing",
      "Whiteboard",
      "Refreshment service",
    ],
    icon: Video,
  },
  "conference-room": {
    title: "Conference Room",
    description:
      "Larger meeting space ideal for team gatherings, workshops, and presentations. Features flexible seating arrangements and comprehensive presentation equipment.",
    images: conferenceRoomImages,
    capacity: [{ type: "Capacity", count: "Up to 20 people" }],
    dimensions: "Approximately 40-50 sqm",
    features: ["Flexible seating", "Projector and screen", "Sound system", "High-speed WiFi", "Catering options"],
    icon: Users,
  },
}

// Coworking options data - Updated with new membership plans
export const coworkingOptions = {
  community: {
    title: "Community",
    description: "For occasional use and networking. Our most flexible membership option.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/co%20working-yWGOZlLcmMEdUT5gpd8as411z2ZXgi.png",
    price: "£75",
    period: "per month",
    capacity: [{ type: "Available spots", count: "Unlimited" }],
    dimensions: "Access to all shared spaces",
    features: [
      "8 days access per month (more flexible than standard 5-day plans)",
      "Access to coworking lounge & community events",
      "Discounted meeting rooms (£10/hour)",
      "High-speed Wi-Fi & free tea/coffee",
      "Printing available (pay-as-you-go)",
    ],
    icon: Coffee,
  },
  flex: {
    title: "Flex",
    description: "For freelancers & remote workers who need regular space.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-13%20184948-RC1OakqKhDVvuQ3CiNq34tDdmAQQnn.png",
    price: "£225",
    period: "per month",
    popular: true,
    capacity: [{ type: "Available spots", count: "Unlimited hot desks" }],
    dimensions: "Access to all shared coworking areas",
    features: [
      "Unlimited hot desk access (8 AM – 8 PM)",
      "Use of shared coworking areas",
      "4 hours of meeting room credits (more than typical 2-hour offers)",
      "Printing credits (50 pages/month)",
      "Locker storage option (+£20/month for dedicated storage)",
    ],
    icon: Wifi,
  },
  dedicated: {
    title: "Dedicated",
    description: "For those who need a fixed, reliable workspace.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-13%20184920-nkLASpKdXkVsoSB7kTVCgN0GHsGx8l.png",
    price: "£350",
    period: "per month",
    capacity: [{ type: "Capacity", count: "1 person per desk" }],
    dimensions: "Personal desk space plus access to all shared areas",
    features: [
      "Unlimited access (8 AM – 8 PM)",
      "Dedicated desk (your own reserved workspace)",
      "8 hours of meeting room credits (competitive vs. the usual 5-hour offers)",
      "Printing credits (100 pages/month)",
      "Personal locker included",
      "Business address & mail handling (+£30/month option)",
    ],
    icon: Users,
  },
  "team-plan": {
    title: "Team Plan",
    description: "For small teams needing collaborative workspace.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-13%20184948-RC1OakqKhDVvuQ3CiNq34tDdmAQQnn.png",
    price: "From £600",
    period: "per month",
    capacity: [{ type: "Capacity", count: "Up to 5 people" }],
    dimensions: "Shared team space with flexible seating",
    features: [
      "3 floating desks for a team of up to 5 people (rotational use)",
      "15 hours of meeting room credits per month",
      "Printing & storage access for all members",
      "Ability to add more seats at discounted rates",
      "Option for private breakout area (+£300/month)",
    ],
    icon: UserPlus,
  },
}
