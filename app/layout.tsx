import type { Metadata } from 'next'
import { Playfair_Display, Outfit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CinematicTransition } from '@/components/BarbaProvider'
import { BottomNav } from '@/components/Navigation'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-playfair'
})

const outfit = Outfit({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit'
})

export const metadata: Metadata = {
  title: 'ByTheBay Studio - Creative Direction & Content',
  description: 'Premium creative studio specializing in brand direction, content creation, and digital experiences for emerging brands.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable} bg-neutral-50`}>
      <body className="font-outfit antialiased text-neutral-900">
        <CinematicTransition>
          {children}
        </CinematicTransition>
        {/* Global fixed bottom nav — always visible on all pages */}
        <BottomNav />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
