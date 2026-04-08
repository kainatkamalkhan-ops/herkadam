import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const brandDisplay = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-brand-family',
  weight: ['500', '600', '700'],
  display: 'swap',
})

const siteUrl = "https://www.herkadam.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Her Kadam",
  description: 'Your central hub for discovering global opportunities including scholarships, fellowships, jobs, grants, and leadership programs for women worldwide.',
  keywords: ['scholarships', 'fellowships', 'women opportunities', 'grants', 'leadership programs', 'global opportunities'],
  authors: [{ name: "Her Kadam" }],
  icons: {
    icon: [
      {
        url: "/favicon.ico?v=6",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Her Kadam",
    description: 'Discover global opportunities for women - scholarships, fellowships, jobs, grants, and leadership programs.',
    type: "website",
    url: siteUrl,
  },
}

export const viewport: Viewport = {
  themeColor: '#6e3a6c',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${brandDisplay.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
