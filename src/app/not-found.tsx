import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="mb-8 text-lg">The page you&apos;re looking for does not exist or has been moved.</p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-[#f9a826] text-white rounded-md font-medium hover:bg-[#f97316] transition-colors"
      >
        Return Home
      </Link>
    </div>
  )
} 