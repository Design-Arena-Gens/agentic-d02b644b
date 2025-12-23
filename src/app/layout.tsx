import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Be Found. V | Premium Digital Marketing & Production Agency Bangalore',
  description: 'Be Found. V is a premium digital marketing and production agency in Bangalore specializing in cinematic branding, SEO, content strategy, video production, social media handling, and end-to-end marketing solutions.',
  keywords: 'Digital Marketing Agency Bangalore, Cinematic Branding, SEO, Content Strategy, Video Production, Social Media Marketing, Brand Shoots, Web Design',
  openGraph: {
    title: 'Be Found. V | Premium Digital Marketing & Production Agency',
    description: 'Cinematic branding and digital marketing solutions that make your brand visible.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
