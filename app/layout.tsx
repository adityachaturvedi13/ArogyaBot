/**
 * Root layout for ArogyaBot.
 * Sets up fonts, metadata, and viewport configuration.
 * No auth providers. No onboarding. Just the app.
 */

import type { Metadata, Viewport } from 'next'
import './globals.css'

/** SEO Metadata */
export const metadata: Metadata = {
  title: 'ArogyaBot — AI Health Awareness Chatbot',
  description:
    'ArogyaBot is an AI-powered public health awareness chatbot that provides verified health information from WHO, CDC, and MoHFW. Get instant answers about symptoms, prevention, myths, and nearby healthcare — in your language.',
  keywords: [
    'health chatbot',
    'AI health assistant',
    'WHO health information',
    'CDC health guidelines',
    'health myths',
    'medical awareness',
    'India healthcare',
    'multilingual health bot',
    'ArogyaBot',
  ],
  authors: [{ name: 'ArogyaBot Team' }],
  openGraph: {
    title: 'ArogyaBot — Verified Health. Zero Misinformation.',
    description:
      'AI-powered health awareness chatbot with verified information from WHO, CDC, and MoHFW. Available in 8 Indian languages.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'ArogyaBot',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArogyaBot — AI Health Awareness Chatbot',
    description:
      'Get verified health information, bust myths, and find healthcare near you. Powered by AI.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

/** Viewport configuration for mobile-first */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0D7377',
}

/**
 * Root layout component.
 * Wraps the entire application with base HTML structure.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Medical disclaimer meta */}
        <meta
          name="medical-disclaimer"
          content="ArogyaBot is not a substitute for professional medical advice. Always consult a qualified healthcare professional."
        />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
