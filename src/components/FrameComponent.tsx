"use client"
import { Slider } from "@/components/ui/slider"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface FrameComponentProps {
  video: string
  fallbackImage: string
  textContent: string
  width: number | string
  height: number | string
  className?: string
  corner: string
  edgeHorizontal: string
  edgeVertical: string
  mediaSize: number
  borderThickness: number
  borderSize: number
  onMediaSizeChange: (value: number) => void
  onBorderThicknessChange: (value: number) => void
  onBorderSizeChange: (value: number) => void
  showControls: boolean
  label: string
  showFrame: boolean
  autoplayMode: "all" | "hover"
  isHovered: boolean
  enableTextSwitch: boolean
  onTextSwitch: (value: boolean) => void
  onClick?: () => void
}

export function FrameComponent({
  video,
  fallbackImage,
  textContent,
  width,
  height,
  className = "",
  corner,
  edgeHorizontal,
  edgeVertical,
  mediaSize,
  borderThickness,
  borderSize,
  onMediaSizeChange,
  onBorderThicknessChange,
  onBorderSizeChange,
  showControls,
  label,
  showFrame,
  autoplayMode,
  isHovered,
  enableTextSwitch,
  onTextSwitch,
  onClick,
}: FrameComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    // Don't set videoError to true for the first frame (The Village)
    if (!video && label !== "The Village") {
      setVideoError(true)
      return
    }

    if (autoplayMode === "all") {
      videoRef.current?.play().catch(() => setVideoError(true))
    } else if (autoplayMode === "hover") {
      if (isHovered) {
        videoRef.current?.play().catch(() => setVideoError(true))
      } else {
        videoRef.current?.pause()
      }
    }
  }, [isHovered, autoplayMode, video, label])

  const handleVideoError = () => {
    setVideoError(true)
  }

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  }

  const labelVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  }

  return (
    <div
      className={`relative ${className} ${onClick ? "cursor-pointer" : ""}`}
      style={{
        width,
        height,
        transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
      }}
      onClick={onClick}
    >
      <div className="relative w-full h-full overflow-hidden">
        {/* Video or Fallback Image */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            zIndex: 1,
            transition: "all 0.3s ease-in-out",
            padding: showFrame ? `${borderThickness}px` : "0",
            width: showFrame ? `${borderSize}%` : "100%",
            height: showFrame ? `${borderSize}%` : "100%",
            left: showFrame ? `${(100 - borderSize) / 2}%` : "0",
            top: showFrame ? `${(100 - borderSize) / 2}%` : "0",
          }}
        >
          <div
            className="w-full h-full overflow-hidden"
            style={{
              transformOrigin: "center",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <AnimatePresence mode="wait">
              {video && !videoError ? (
                <motion.video
                  key="video"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full h-full object-cover"
                  src={video}
                  loop
                  muted
                  playsInline
                  autoPlay={autoplayMode === "all" || (autoplayMode === "hover" && isHovered)}
                  ref={videoRef}
                  onError={handleVideoError}
                  onMouseEnter={(e) => {
                    if (autoplayMode === "hover") {
                      e.currentTarget.play().catch(() => setVideoError(true))
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (autoplayMode === "hover") {
                      e.currentTarget.pause()
                    }
                  }}
                />
              ) : (
                <motion.img
                  key="fallback"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  src={fallbackImage}
                  alt={label}
                  className="w-full h-full object-cover"
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Frame Elements (Higher z-index) */}
        {showFrame && (
          <div className="absolute inset-0" style={{ zIndex: 2 }}>
            {/* Corners */}
            <div
              className="absolute top-0 left-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})` }}
            />
            <div
              className="absolute top-0 right-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})`, transform: "scaleX(-1)" }}
            />
            <div
              className="absolute bottom-0 left-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})`, transform: "scaleY(-1)" }}
            />
            <div
              className="absolute bottom-0 right-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})`, transform: "scale(-1, -1)" }}
            />

            {/* Edges */}
            <div
              className="absolute top-0 left-16 right-16 h-16"
              style={{
                backgroundImage: `url(${edgeHorizontal})`,
                backgroundSize: "auto 64px",
                backgroundRepeat: "repeat-x",
              }}
            />
            <div
              className="absolute bottom-0 left-16 right-16 h-16"
              style={{
                backgroundImage: `url(${edgeHorizontal})`,
                backgroundSize: "auto 64px",
                backgroundRepeat: "repeat-x",
                transform: "rotate(180deg)",
              }}
            />
            <div
              className="absolute left-0 top-16 bottom-16 w-16"
              style={{
                backgroundImage: `url(${edgeVertical})`,
                backgroundSize: "64px auto",
                backgroundRepeat: "repeat-y",
              }}
            />
            <div
              className="absolute right-0 top-16 bottom-16 w-16"
              style={{
                backgroundImage: `url(${edgeVertical})`,
                backgroundSize: "64px auto",
                backgroundRepeat: "repeat-y",
                transform: "scaleX(-1)",
              }}
            />
          </div>
        )}
      </div>

      {/* Hover indicator - simplified with no arrow */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 z-20"
            variants={labelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 z-10">
          <div className="text-white font-bold mb-2">{label}</div>
          <div className="space-y-2">
            <div>
              <label htmlFor={`media-size-${label}`} className="block text-sm font-medium text-white">
                Media Size: {mediaSize.toFixed(2)}
              </label>
              <Slider
                id={`media-size-${label}`}
                min={0.5}
                max={3}
                step={0.01}
                value={[mediaSize]}
                onValueChange={(value) => onMediaSizeChange(value[0])}
              />
            </div>
            <div>
              <label htmlFor={`border-thickness-${label}`} className="block text-sm font-medium text-white">
                Border Thickness: {borderThickness}px
              </label>
              <Slider
                id={`border-thickness-${label}`}
                min={0}
                max={20}
                step={1}
                value={[borderThickness]}
                onValueChange={(value) => onBorderThicknessChange(value[0])}
              />
            </div>
            <div>
              <label htmlFor={`border-size-${label}`} className="block text-sm font-medium text-white">
                Border Size: {borderSize}%
              </label>
              <Slider
                id={`border-size-${label}`}
                min={50}
                max={100}
                step={1}
                value={[borderSize]}
                onValueChange={(value) => onBorderSizeChange(value[0])}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
