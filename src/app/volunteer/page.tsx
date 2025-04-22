import VolunteerForm from "@/components/VolunteerForm"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function VolunteerPage() {
  return (
    <div className="w-full">
      {/* Header section with darker background */}
      <div className="bg-[#f0e9df] pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Back to Home Button */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-[#4a7c59] hover:text-[#3d6548] transition-colors">
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>

          {/* Enhanced Header with Decorative Elements */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="mb-2 text-[#4a7c59] font-medium">THE VILLAGE</div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1e293b] mb-4 relative">
              <span className="relative inline-block">
                Volunteer With Us
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#4a7c59] rounded-full"></div>
              </span>
            </h1>
            <p className="text-lg text-[#475569] mt-6">
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
