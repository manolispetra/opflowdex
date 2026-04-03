/**
 * OPFLOW LOGO - PREMIUM DESIGN
 * Modern, elegant logo with flowing gradient and dynamic animation
 */

'use client';

import { motion } from 'framer-motion';

export function OpflowLogo({ className = '', size = 40 }: { className?: string; size?: number }) {
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <svg
        width={size * 4}
        height={size}
        viewBox="0 0 160 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          {/* Premium gradient */}
          <linearGradient id="opflowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F7931A" stopOpacity="1" />
            <stop offset="50%" stopColor="#FF6B35" stopOpacity="1" />
            <stop offset="100%" stopColor="#0052FF" stopOpacity="1" />
          </linearGradient>
          
          {/* Glow effect */}
          <filter id="opflowGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Shimmer effect */}
          <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        
        {/* Flowing wave background */}
        <motion.path
          d="M5 20 Q15 10, 25 20 T45 20"
          stroke="url(#opflowGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.3"
          animate={{
            d: [
              "M5 20 Q15 10, 25 20 T45 20",
              "M5 20 Q15 30, 25 20 T45 20",
              "M5 20 Q15 10, 25 20 T45 20"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* "O" - Circle with flow */}
        <g>
          <motion.circle
            cx="20"
            cy="20"
            r="12"
            stroke="url(#opflowGradient)"
            strokeWidth="2.5"
            fill="none"
            filter="url(#opflowGlow)"
            animate={{
              strokeWidth: [2.5, 3, 2.5],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Inner flowing circle */}
          <motion.circle
            cx="20"
            cy="20"
            r="6"
            fill="url(#opflowGradient)"
            opacity="0.5"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </g>
        
        {/* "PFLOW" text */}
        <text
          x="42"
          y="27"
          fontSize="24"
          fontWeight="700"
          fill="white"
          fontFamily="var(--font-satoshi), system-ui"
          letterSpacing="-0.5"
        >
          pflow
        </text>
        
        {/* Subtle underline accent */}
        <motion.rect
          x="42"
          y="32"
          width="0"
          height="2"
          fill="url(#opflowGradient)"
          rx="1"
          animate={{
            width: [0, 70, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 2
          }}
        />
        
        {/* Shimmer overlay animation */}
        <motion.rect
          x="0"
          y="0"
          width="40"
          height="40"
          fill="url(#shimmer)"
          style={{ mixBlendMode: 'overlay' }}
          animate={{
            x: [-50, 200]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 2
          }}
        />
      </svg>
    </div>
  );
}
