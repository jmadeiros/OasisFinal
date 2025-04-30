import VolunteerForm from "@/components/VolunteerForm"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import Image from "next/image"

export default function VolunteerPage() {
  return (
    <div className="w-full">
      {/* Header section with background image */}
      <div className="relative pt-16 pb-12 md:pt-24 md:pb-16 overflow-hidden">
        {/* Background Image - No Opacity */}
        <div className="absolute inset-0 z-0">
          <Image src="/images/dome-rotunda.png" alt="Dome Rotunda" fill className="object-cover" priority />

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/15 to-transparent"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 max-w-7xl">
          {/* Back to Home Button */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-[#4a7c59] hover:text-[#3d6548] transition-colors font-medium group bg-white/80 px-3 py-1 rounded-full"
            >
              <ChevronLeft className="h-5 w-5 mr-1 transition-transform group-hover:-translate-x-1" />
              <span className="relative overflow-hidden">
                <span className="inline-block transition-transform group-hover:-translate-y-full duration-300">
                  Back to Home
                </span>
                <span className="absolute top-0 left-0 translate-y-full transition-transform group-hover:translate-y-0 duration-300">
                  Return to main page
                </span>
              </span>
            </Link>
          </div>

          {/* Enhanced Header with Decorative Elements */}
          <div className="text-center mb-12 max-w-3xl mx-auto bg-black/20 px-6 py-4 rounded-2xl">
            <div className="mb-2 text-white font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">THE VILLAGE</div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              <span className="relative inline-block">
                Volunteer With Us
              </span>
            </h1>
            <p className="text-base md:text-lg text-white mt-6 font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
              Join our community of volunteers and help make a difference at The Village.
            </p>
          </div>
        </div>
      </div>

      {/* Main content with lighter background */}
      <div className="bg-[#f8f5f0] py-16 pb-48">
        <div className="container mx-auto px-4 max-w-7xl">
          <VolunteerForm />
        </div>
      </div>
    </div>
  )
}
