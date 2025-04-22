"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

export default function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isAboutUsOpen, setIsAboutUsOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        // Only show header when at the top of the page (scrollY is 0 or very close to 0)
        if (window.scrollY <= 10) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }

        // remember current page location to use in the next move
        setLastScrollY(window.scrollY)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar)

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar)
      }
    }
  }, [lastScrollY])

  useEffect(() => {
    const handleToggleAbout = (e) => {
      // If the event includes a state property, use it, otherwise toggle
      setIsAboutUsOpen(e.detail?.state !== undefined ? e.detail.state : !isAboutUsOpen)
    }

    document.addEventListener("toggleAboutUs", handleToggleAbout)

    return () => {
      document.removeEventListener("toggleAboutUs", handleToggleAbout)
    }
  }, [isAboutUsOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 pt-4 pb-8 px-6 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="text-white text-2xl font-bold">
          The Village
        </Link>

        <div className="flex items-center space-x-6">
          <Link href="/" className="text-white hover:text-white/80 hidden md:block">
            Spaces
          </Link>
          <Link href="/volunteer" className="text-white hover:text-white/80 hidden md:block">
            Volunteer
          </Link>
          <Link href="/" className="text-white hover:text-white/80 hidden md:block">
            Community
          </Link>
          <Link href="/" className="text-white hover:text-white/80 hidden md:block">
            About
          </Link>
          <Link href="/" className="text-white hover:text-white/80 hidden md:block">
            Contact
          </Link>
          <Link href="/book-tour" className="hidden md:block">
            <Button className="bg-white text-black hover:bg-white/90">Book a Tour</Button>
          </Link>
          <button
            className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/95 pt-20 px-6 pb-6 z-40 overflow-y-auto">
          <nav className="flex flex-col space-y-6">
            {/* Menu items */}
            <Link href="/" className="text-white text-lg font-medium hover:text-white/80 py-2">
              Spaces
            </Link>
            <Link href="/volunteer" className="text-white text-lg font-medium hover:text-white/80 py-2">
              Volunteer
            </Link>
            <Link href="/" className="text-white text-lg font-medium hover:text-white/80 py-2">
              Community
            </Link>
            <Link href="/" className="text-white text-lg font-medium hover:text-white/80 py-2">
              About
            </Link>
            <Link href="/" className="text-white text-lg font-medium hover:text-white/80 py-2">
              Contact
            </Link>
            {/* Other menu items */}
            <Link href="/book-tour">
              <Button className="bg-white text-black hover:bg-white/90 w-full py-3 mt-4">Book a Tour</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
