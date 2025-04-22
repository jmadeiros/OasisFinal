import Link from "next/link"
import { Instagram, Linkedin, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[var(--village-cream)]/30 text-gray-700 py-8 sm:py-12 border-t border-[var(--village-green)]/10">
      <div className="container mx-auto px-5 sm:px-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[var(--village-green)]">The Village</h3>
            <ul className="space-y-3 sm:space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-[var(--village-green)] transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="text-gray-600 hover:text-[var(--village-green)] transition duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/history"
                  className="text-gray-600 hover:text-[var(--village-green)] transition duration-300"
                >
                  Our History
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[var(--village-green)]">Spaces</h3>
            <ul className="space-y-3 sm:space-y-2">
              <li>
                <Link
                  href="/coworking"
                  className="text-gray-600 hover:text-[var(--village-green)] transition duration-300"
                >
                  Coworking
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-gray-600 hover:text-[var(--village-green)] transition duration-300"
                >
                  Community Hub
                </Link>
              </li>
              <li>
                <Link
                  href="/#spaces-section"
                  className="text-gray-600 hover:text-[var(--village-green)] transition duration-300"
                >
                  Event Spaces
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[var(--village-green)]">Get Involved</h3>
            <ul className="space-y-3 sm:space-y-2">
              <li>
                <Link
                  href="/book-tour"
                  className="text-gray-600 hover:text-[var(--village-green)] transition duration-300"
                >
                  Book a Tour
                </Link>
              </li>
              <li>
                <Link
                  href="/volunteer"
                  className="text-gray-600 hover:text-[var(--village-green)] transition duration-300"
                >
                  Volunteer
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact-section"
                  className="text-gray-600 hover:text-[var(--village-green)] transition duration-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[var(--village-green)]">Contact</h3>
            <ul className="space-y-3 sm:space-y-2">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-[var(--village-green)] mt-0.5 mr-2" />
                <span className="text-gray-600">
                  155 Tulse Hill
                  <br />
                  London, SW2 3UP
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-[var(--village-green)] mr-2" />
                <span className="text-gray-600">+44 (0) 7758 822426</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.instagram.com/thevillagebyoasis/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[var(--village-green)] transition duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/the-village-by-oasis/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[var(--village-green)] transition duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} The Village. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
