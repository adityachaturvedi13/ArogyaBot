/**
 * EmergencyBanner — Red alert banner shown when emergency keywords are detected.
 * Fixed to top of screen with call-to-action buttons for 108 and 112.
 */

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useChatStore } from '@/store/chatStore'

/**
 * Emergency banner that slides down from the top when an emergency is detected.
 * Shows call buttons for ambulance (108) and emergency (112).
 */
export default function EmergencyBanner() {
  const emergencyDetected = useChatStore((state) => state.emergencyDetected)
  const dismissEmergency = useChatStore((state) => state.dismissEmergency)

  return (
    <AnimatePresence>
      {emergencyDetected && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed top-0 left-0 right-0 z-50"
          role="alert"
          aria-live="assertive"
        >
          <div className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white px-4 py-4 shadow-2xl">
            {/* Pulse animation overlay */}
            <div className="absolute inset-0 bg-red-400 opacity-20 animate-pulse" />

            <div className="relative max-w-2xl mx-auto">
              {/* Dismiss button */}
              <button
                onClick={dismissEmergency}
                className="absolute top-0 right-0 p-1 text-white/80 hover:text-white transition-colors"
                aria-label="Dismiss emergency banner"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Banner content */}
              <div className="text-center">
                <p className="text-lg font-bold mb-2">
                  🚨 Emergency Detected — Call for help immediately
                </p>
                <p className="text-sm text-red-100 mb-3">
                  If this is a medical emergency, do not wait. Call now.
                </p>

                {/* CTA Buttons */}
                <div className="flex items-center justify-center gap-3">
                  <a
                    href="tel:108"
                    className="inline-flex items-center gap-2 bg-white text-red-600 font-bold px-6 py-2.5 rounded-full shadow-lg hover:bg-red-50 transition-colors text-sm"
                    aria-label="Call 108 for ambulance"
                  >
                    🚑 Call 108
                    <span className="text-xs font-normal">(Ambulance)</span>
                  </a>
                  <a
                    href="tel:112"
                    className="inline-flex items-center gap-2 bg-white text-red-600 font-bold px-6 py-2.5 rounded-full shadow-lg hover:bg-red-50 transition-colors text-sm"
                    aria-label="Call 112 for emergency"
                  >
                    🆘 Call 112
                    <span className="text-xs font-normal">(Emergency)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
