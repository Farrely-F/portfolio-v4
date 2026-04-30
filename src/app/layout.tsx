import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
})

export const metadata: Metadata = {
  title: "Farrely Firenza — Front-End Engineer",
  description:
    "Front-End Engineer with 3+ years of experience building scalable, high-performance web applications using Next.js, TypeScript, and Tailwind CSS. Skilled in integrating blockchain, AI, and payment systems.",
  keywords: [
    "Front-End Engineer",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "React",
    "Web3",
    "Blockchain",
    "Farrely Firenza",
  ],
  authors: [{ name: "Farrely Firenza" }],
  creator: "Farrely Firenza",
  metadataBase: new URL("https://site.xfarr.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://site.xfarr.dev",
    siteName: "Farrely Firenza",
    title: "Farrely Firenza — Front-End Engineer",
    description:
      "Front-End Engineer with 3+ years of experience building scalable, high-performance web applications using Next.js, TypeScript, and Tailwind CSS.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Farrely Firenza — Front-End Engineer",
    description:
      "Front-End Engineer with 3+ years of experience building scalable, high-performance web applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-full bg-background text-foreground font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
