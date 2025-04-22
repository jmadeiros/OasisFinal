import "./globals.css"
import Footer from "../components/Footer"
import type React from "react"
import { inter } from "./fonts"

export const metadata = {
  title: "The Village - Community Workspace",
  description: "A vibrant community workspace where people connect, create, and collaborate",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.className} overflow-x-hidden`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </head>
      <body className="flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
