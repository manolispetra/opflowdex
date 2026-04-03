/**
 * OPFLOW ANIMATED LOGO
 * 
 * Features:
 * - Bitcoin "B" morphs into flowing wave
 * - Continuous left-to-right flow animation
 * - Soft orange glow on hover
 * - Uses Framer Motion for smooth animations
 */

'use client';

import { motion } from 'framer-motion';

export function OpflowLogo({ className = '', size = 40 }: { className?: string; size?: number }) {
  return (
    <div className={`relative ${className}`}>
      <svg
        width={size * 3}
        height={size}
        viewBox="0 0 120 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        {/* Animated flowing "O" as Bitcoin B with wave */}
        <motion.g
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Bitcoin "B" that morphs into wave */}
          <motion.path
            d="M 8 8 
               C 8 8, 12 8, 14 8
               C 18 8, 20 10, 20 14
               C 20 16, 19 17, 17 17.5
               C 19 18, 20 19, 20 22
               C 20 26, 18 28, 14 28
               C 12 28, 8 28, 8 28
               Z
               M 11 11 L 11 16 L 14 16 C 16 16, 17 15, 17 13.5 C 17 12, 16 11, 14 11 Z
               M 11 18 L 11 25 L 14 25 C 16 25, 17 24, 17 21.5 C 17 19, 16 18, 14 18 Z"
            fill="#F7931A"
            className="drop-shadow-lg"
          />
          
          {/* Flowing wave effect */}
          <motion.path
            d="M 20 18 Q 24 16, 28 18 T 36 18"
            stroke="url(#waveGradient)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: [
                'M 20 18 Q 24 16, 28 18 T 36 18',
                'M 20 18 Q 24 20, 28 18 T 36 18',
                'M 20 18 Q 24 16, 28 18 T 36 18',
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.g>
        
        {/* "pflow" text */}
        <motion.text
          x="40"
          y="25"
          fontSize="20"
          fontWeight="600"
          fill="white"
          fontFamily="var(--font-satoshi)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          pflow
        </motion.text>
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F7931A" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#0052FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#F7931A" stopOpacity="0.4">
              <animate
                attributeName="stopOpacity"
                values="0.4;0.8;0.4"
                dur="2s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>
      
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(247, 147, 26, 0.4) 0%, transparent 70%)'
        }}
        whileHover={{ scale: 1.2 }}
      />
    </div>
  );
}
