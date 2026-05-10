import type { Metadata } from 'next'
import './global.css'

export const metadata: Metadata = {
  title: 'Traveloop — Personalized Travel Planning',
  description: 'Plan your perfect multi-city trip with Traveloop.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Montserrat:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        {/* Grain texture overlay */}
        <div className="grain-overlay fixed inset-0 z-[60] pointer-events-none" />
        {children}
      </body>
    </html>
  )
}
