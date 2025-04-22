import localFont from "next/font/local"

// This is a fallback implementation until the actual font files are added
export const customFont = {
  className: "",
  style: { fontFamily: "Inter, sans-serif" },
  variable: ""
}

/* Uncomment this when you have the font files
export const customFont = localFont({
  src: [
    {
      path: "../public/fonts/your-font-regular.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/your-font-italic.woff2",
      weight: "400",
      style: "italic",
    },
    // Add more variations as needed
  ],
  display: "swap",
})
*/ 