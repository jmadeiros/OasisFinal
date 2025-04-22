"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FrameComponent } from "./FrameComponent"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

const GRID_SIZE = 12
const CELL_SIZE = 60 // pixels per grid cell

interface DynamicFrameLayoutProps {
  onFrameSelect: (spaceName: string) => void
}

interface Frame {
  id: number
  video: string | null
  fallbackImage: string
  textContent: string
  defaultPos: { x: number; y: number; w: number; h: number }
  corner: string
  edgeHorizontal: string
  edgeVertical: string
  mediaSize: number
  borderThickness: number
  borderSize: number
  autoplayMode: "all" | "hover"
  isHovered: boolean
  label: string
  enableTextSwitch: boolean
}

const perks = [
  "Flexible workspace",
  "Networking opportunities",
  "Cost-effective solutions",
  "Professional environment",
  "High-speed internet",
  "Meeting rooms access",
  "24/7 availability",
  "Community events",
  "Fully equipped kitchens",
]

const initialFrames: Frame[] = [
  {
    id: 1,
    video: null,
    fallbackImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-06%20124040-mlStremZ6CjXR9PCTXhSqOXrSPMPUD.png",
    textContent: perks[0],
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_corner_update.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_vert_update.png",
    edgeVertical: "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_hori_update.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    label: "The Village",
    enableTextSwitch: true,
  },
  {
    id: 2,
    video: null,
    fallbackImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-05%20174041-VGWVMjvOJBca655bkseCPqrgOeNYq3.png",
    textContent: perks[1],
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/bcf576df9c38b05f/2_corner_update.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/bcf576df9c38b05f/2_vert_update.png",
    edgeVertical: "https://static.cdn-luma.com/files/bcf576df9c38b05f/2_hori_update.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    label: "Offices",
    enableTextSwitch: true,
  },
  {
    id: 3,
    video: null,
    fallbackImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-04%20120551-OBdEfOgMExl3C70er93HbDRXMrqNfh.png",
    textContent: perks[2],
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/3d36d1e0dba2476c/3_Corner_update.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/3d36d1e0dba2476c/3_hori_update.png",
    edgeVertical: "https://static.cdn-luma.com/files/3d36d1e0dba2476c/3_Vert_update.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    label: "Co-working",
    enableTextSwitch: true,
  },
  {
    id: 4,
    video: "https://wework.com/assets/videos/common-area.mp4",
    fallbackImage: "/images/event-space-arched.png",
    textContent: perks[3],
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/9e67e05f37e52522/4_corner_update.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/9e67e05f37e52522/4_hori_update.png",
    edgeVertical: "https://static.cdn-luma.com/files/9e67e05f37e52522/4_vert_update.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    label: "Event Rooms",
    enableTextSwitch: true,
  },
  {
    id: 7,
    video: null,
    fallbackImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-06%20124102-vX3SmLlnBJErvsHtRCfD3yBNZ0a4nS.png",
    textContent: perks[6],
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/b80b5aa00ccc33bd/7_corner.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/b80b5aa00ccc33bd/7_hori.png",
    edgeVertical: "https://static.cdn-luma.com/files/b80b5aa00ccc33bd/7_vert.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    label: "Oasis Story",
    enableTextSwitch: true,
  },
  {
    id: 6,
    video: null,
    fallbackImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-06%20125944-d2wKMDZvHfb7wJpuf3irqK4X2mvNaO.png",
    textContent: perks[5],
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/1199340587e8da1d/6_corner.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/1199340587e8da1d/6_corner-1.png",
    edgeVertical: "https://static.cdn-luma.com/files/1199340587e8da1d/6_vert.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    label: "History",
    enableTextSwitch: true,
  },
  {
    id: 5,
    video: null,
    fallbackImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-04%20110906-cZyWJIgLkBNhXUajK8q9Rj10A8ohN5.png",
    textContent: perks[4],
    defaultPos: { x: 0, y: 8, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/9e67e05f37e52522/5_corner_update.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/9e67e05f37e52522/5_hori_update.png",
    edgeVertical: "https://static.cdn-luma.com/files/9e67e05f37e52522/5_verti_update.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    label: "Community Spaces",
    enableTextSwitch: true,
  },
  {
    id: 8,
    video: "https://wework.com/assets/videos/wellness-room.mp4",
    fallbackImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-05%20174813.png-NQEWAvpk0UYCOycrkCnsRittbXYjQV.jpeg",
    textContent: perks[7],
    defaultPos: { x: 4, y: 8, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/981e483f71aa764b/8_corner.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/981e483f71aa764b/8_hori.png",
    edgeVertical: "https://static.cdn-luma.com/files/981e483f71aa764b/8_verticle.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    label: "Partners",
    enableTextSwitch: true,
  },
  {
    id: 9,
    video: "https://wework.com/assets/videos/reception.mp4",
    fallbackImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-04%20151434-xf6RJDRDhlc0cEgKIVn3idy7xRKiTS.png",
    textContent: perks[8],
    defaultPos: { x: 8, y: 8, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/981e483f71aa764b/9_corner.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/981e483f71aa764b/9_hori.png",
    edgeVertical: "https://static.cdn-luma.com/files/981e483f71aa764b/9_vert.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    label: "Contact Us",
    enableTextSwitch: true,
  },
]

function DynamicFrameLayout({ onFrameSelect }: DynamicFrameLayoutProps) {
  const [frames, setFrames] = useState<Frame[]>(initialFrames)
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)
  const [hoverSize, setHoverSize] = useState(6)
  const [gapSize, setGapSize] = useState(1)
  const [showControls, setShowControls] = useState(false)
  const [cleanInterface, setCleanInterface] = useState(true)
  // Set fixed values instead of toggleable states
  const [showFrames] = useState(false)
  const [autoplayMode] = useState<"all" | "hover">("all")
  const [activeTextFrames, setActiveTextFrames] = useState<number[]>([])

  const getRowSizes = () => {
    if (hovered === null) {
      return "4fr 4fr 4fr"
    }
    const { row } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getColSizes = () => {
    if (hovered === null) {
      return "4fr 4fr 4fr"
    }
    const { col } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getTransformOrigin = (x: number, y: number) => {
    const vertical = y === 0 ? "top" : y === 4 ? "center" : "bottom"
    const horizontal = x === 0 ? "left" : x === 4 ? "center" : "right"
    return `${vertical} ${horizontal}`
  }

  const updateFrameProperty = (id: number, property: keyof Frame, value: any) => {
    setFrames(frames.map((frame) => (frame.id === id ? { ...frame, [property]: value } : frame)))
  }

  const handleTextSwitch = (frameId: number, isShowingText: boolean) => {
    if (isShowingText) {
      setActiveTextFrames((prev) => {
        if (prev.length < 2) {
          return [...prev, frameId]
        } else {
          const [_, ...rest] = prev
          return [...rest, frameId]
        }
      })
    } else {
      setActiveTextFrames((prev) => prev.filter((id) => id !== frameId))
    }
  }

  const toggleControls = () => {
    setShowControls(!showControls)
  }

  const toggleCleanInterface = () => {
    setCleanInterface(!cleanInterface)
    if (!cleanInterface) {
      setShowControls(false)
    }
  }

  const updateCodebase = () => {
    console.log("Updating codebase with current values:")
    console.log("Hover Size:", hoverSize)
    console.log("Gap Size:", gapSize)
    console.log("Frames:", frames)
  }

  const handleFrameClick = (label: string) => {
    onFrameSelect(label)
  }

  return (
    <div className="space-y-4 w-full h-full">
      {/* Controls removed */}
      {!cleanInterface && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Dynamic Frame Layout</h2>
          <div className="space-x-2">
            <Button onClick={toggleControls}>{showControls ? "Hide Controls" : "Show Controls"}</Button>
            <Button onClick={updateCodebase}>Update Codebase</Button>
            <Button onClick={toggleCleanInterface}>{cleanInterface ? "Show UI" : "Hide UI"}</Button>
          </div>
        </div>
      )}
      {!cleanInterface && showControls && (
        <>
          <div className="space-y-2">
            <label htmlFor="hover-size" className="block text-sm font-medium text-gray-200">
              Hover Size: {hoverSize}
            </label>
            <Slider
              id="hover-size"
              min={4}
              max={8}
              step={0.1}
              value={[hoverSize]}
              onValueChange={(value) => setHoverSize(value[0])}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="gap-size" className="block text-sm font-medium text-gray-200">
              Gap Size: {gapSize}px
            </label>
            <Slider
              id="gap-size"
              min={0}
              max={20}
              step={1}
              value={[gapSize]}
              onValueChange={(value) => setGapSize(value[0])}
            />
          </div>
        </>
      )}
      <div
        className="relative w-full h-full rounded-lg"
        style={{
          display: "grid",
          gridTemplateRows: getRowSizes(),
          gridTemplateColumns: getColSizes(),
          gap: `${gapSize}px`,
          transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
          boxShadow: "0 0 40px rgba(74, 124, 89, 0.1)",
          background: "linear-gradient(145deg, #e8e2d9, #d8d0c6, #e8e2d9)",
        }}
      >
        {frames.map((frame) => {
          const row = Math.floor(frame.defaultPos.y / 4)
          const col = Math.floor(frame.defaultPos.x / 4)
          const transformOrigin = getTransformOrigin(frame.defaultPos.x, frame.defaultPos.y)

          return (
            <motion.div
              key={frame.id}
              className="relative"
              style={{
                transformOrigin,
                transition: "transform 0.4s ease",
              }}
              onMouseEnter={() => setHovered({ row, col })}
              onMouseLeave={() => setHovered(null)}
            >
              <FrameComponent
                key={frame.id}
                video={frame.video}
                fallbackImage={frame.fallbackImage}
                textContent={frame.textContent}
                width="100%"
                height="100%"
                className="absolute inset-0"
                corner={frame.corner}
                edgeHorizontal={frame.edgeHorizontal}
                edgeVertical={frame.edgeVertical}
                mediaSize={frame.mediaSize}
                borderThickness={frame.borderThickness}
                borderSize={frame.borderSize}
                onMediaSizeChange={(value) => updateFrameProperty(frame.id, "mediaSize", value)}
                onBorderThicknessChange={(value) => updateFrameProperty(frame.id, "borderThickness", value)}
                onBorderSizeChange={(value) => updateFrameProperty(frame.id, "borderSize", value)}
                showControls={showControls && !cleanInterface}
                label={frame.label}
                showFrame={showFrames}
                autoplayMode={autoplayMode}
                isHovered={
                  hovered?.row === Math.floor(frame.defaultPos.y / 4) &&
                  hovered?.col === Math.floor(frame.defaultPos.x / 4)
                }
                enableTextSwitch={
                  frame.enableTextSwitch && (activeTextFrames.includes(frame.id) || activeTextFrames.length < 2)
                }
                onTextSwitch={(isShowingText) => handleTextSwitch(frame.id, isShowingText)}
                onClick={() => handleFrameClick(frame.label)}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default DynamicFrameLayout
