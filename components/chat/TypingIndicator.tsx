/**
 * TypingIndicator — Animated dots shown while the AI is streaming a response.
 * Rendered as a bot-style bubble with three bouncing dots.
 */

'use client'

import { motion } from 'framer-motion'

/** Stagger delay for each dot in the bounce animation */
const DOT_VARIANTS = {
  animate: (i: number) => ({
    y: [0, -6, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      delay: i * 0.15,
      ease: 'easeInOut',
    },
  }),
}

/**
 * Typing indicator with three bouncing dots.
 * Appears as a bot message bubble while the AI is generating a response.
 */
export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="flex items-start gap-2 mb-4"
    >
      {/* Bot avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white text-xs font-bold shadow-sm">
        🌿
      </div>

      {/* Dots container styled like a bot bubble */}
      <div className="bg-white rounded-tr-2xl rounded-br-2xl rounded-tl-sm px-5 py-3 shadow-sm border border-gray-100">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              custom={i}
              variants={DOT_VARIANTS}
              animate="animate"
              className="w-2 h-2 rounded-full bg-teal-500"
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
