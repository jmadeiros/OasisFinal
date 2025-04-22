"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export interface EnquirySuccessProps {
  spaceType?: string
  usageType?: string
  membershipType?: string
  roomName?: string
}

export default function EnquirySuccess({ spaceType, usageType, membershipType, roomName }: EnquirySuccessProps) {
  return (
    <motion.div
      className="text-center py-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        className="mx-auto mb-6"
      >
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
      </motion.div>
      <motion.h3
        className="text-2xl font-bold text-gray-800 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Thank You!
      </motion.h3>
      <motion.p
        className="text-lg text-gray-600 mb-6 max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        We've received your enquiry about our{" "}
        {roomName ? (
          <span className="font-medium">{roomName}</span>
        ) : (
          <>
            <span className="font-medium">{spaceType}</span>
            {usageType && (
              <>
                {" "}
                for <span className="font-medium">{usageType}</span>
              </>
            )}
            {membershipType && (
              <>
                {" "}
                with a <span className="font-medium">{membershipType}</span> membership
              </>
            )}
          </>
        )}
        . Our team will be in touch with you shortly.
      </motion.p>
      <motion.p
        className="text-sm text-gray-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Please check your email for confirmation.
      </motion.p>
    </motion.div>
  )
}
