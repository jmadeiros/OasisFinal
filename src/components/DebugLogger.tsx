"use client"

import { useEffect } from "react"

export default function DebugLogger({ componentName }: { componentName: string }) {
  useEffect(() => {
    console.log(`${componentName} component mounted`)

    // Log DOM structure around this component
    const element = document.currentScript?.parentElement
    if (element) {
      console.log(`${componentName} parent:`, element.parentElement)
      console.log(`${componentName} siblings:`, element.parentElement?.children)
    }

    return () => {
      console.log(`${componentName} component unmounted`)
    }
  }, [componentName])

  return (
    <div data-debug={componentName} className="hidden">
      {/* Hidden debug element */}
    </div>
  )
}
