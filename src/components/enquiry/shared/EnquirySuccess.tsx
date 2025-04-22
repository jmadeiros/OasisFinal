"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface EnquirySuccessProps {
  spaceType?: string
  usageType?: string
  membershipType?: string
}

export default function EnquirySuccess({ spaceType, usageType, membershipType }: EnquirySuccessProps) {
  // Format the space type for display
  const formatSpaceType = (type: string | undefined): string => {
    if (!type) return "space"
    return type.replace("_", " ").toLowerCase()
  }

  return (
    <motion.div
      className="text-center py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-center mb-6">
        <div className="bg-[var(--village-green)] rounded-full p-4 inline-flex">
          <Check className="h-12 w-12 text-white" />
        </div>
      </div>
      <h3 className="text-3xl font-bold mb-4">Thank You!</h3>
      <p className="text-lg mb-6">
        Your enquiry about our {formatSpaceType(spaceType)} has been received.
      </p>
      <p className="mb-8 text-[var(--village-teal)]">
        We'll be in touch within 1-2 business days to discuss your requirements in more detail.
      </p>
      <div className="text-sm text-gray-500 max-w-md mx-auto">
        <p className="mb-2">
          If you have any urgent questions, please call us at <span className="font-semibold">020 1234 5678</span>.
        </p>
      </div>
    </motion.div>
  )
} 