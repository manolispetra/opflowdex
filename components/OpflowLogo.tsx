/**
 * OPFLOW NEW LOGO
 * Modern circular design with gradient and flow animation
 */

'use client';

import { motion } from 'framer-motion';

export function OpflowLogo({ className = '', size = 40 }: { className?: string; size?: number }) {
  return (
    <div className={`relative ${className} group`}>
      <svg
        width={size * 3.5}
        height={size}
        viewBox="0 0 140 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F7931A" />
            <stop offset="100%" stopColor="#0052FF" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <motion.circle
          cx="20"
          cy="20"
          r="18"
          fill="url(#logoGradient)"
          opacity="0.2"
          filter="url(#glow)"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <circle
          cx="20"
          cy="20"
          r="16"
          fill="none"
          stroke="url(#logoGradient)"
          strokeWidth="2"
        />
        
        <text
          x="20"
          y="26"
          fontSize="16"
          fontWeight="700"
          fill="white"
          textAnchor="middle"
          fontFamily="var(--font-satoshi)"
        >
          OF
        </text>
        
        <motion.path
          d="M 4 20 Q 12 15, 20 20 T 36 20"
          stroke="#F7931A"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
          animate={{
            d: [
              "M 4 20 Q 12 15, 20 20 T 36 20",
              "M 4 20 Q 12 25, 20 20 T 36 20",
              "M 4 20 Q 12 15, 20 20 T 36 20",
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <text
          x="48"
          y="27"
          fontSize="22"
          fontWeight="700"
          fill="white"
          fontFamily="var(--font-satoshi)"
        >
          pflow
        </text>
      </svg>
      
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(247, 147, 26, 0.6) 0%, transparent 70%)'
        }}
      />
    </div>
  );
}
