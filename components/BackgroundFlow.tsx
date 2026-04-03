/**
 * BACKGROUND FLOW ANIMATION
 * 
 * Creates subtle, elegant flowing lines across the page
 * - Orange to blue gradient particles
 * - 20-30% opacity for luxury feel
 * - Never distracting, always flowing left-to-right
 * - Multiple layers for depth
 */

'use client';

import { motion } from 'framer-motion';

export function BackgroundFlow() {
  // Create multiple flow lines at different heights
  const flowLines = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    top: `${(i + 1) * 12}%`,
    delay: i * 2,
    duration: 20 + i * 3,
    opacity: 0.15 + (i % 3) * 0.05
  }));
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Flowing lines */}
      {flowLines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute w-[200%] h-[1px]"
          style={{
            top: line.top,
            left: '-100%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(247, 147, 26, 0.4) 20%, rgba(0, 82, 255, 0.4) 80%, transparent 100%)',
            opacity: line.opacity
          }}
          animate={{
            x: ['0%', '100%']
          }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: line.delay
          }}
        />
      ))}
      
      {/* Particle effects */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: '-10px',
            background: i % 2 === 0 ? 'rgba(247, 147, 26, 0.6)' : 'rgba(0, 82, 255, 0.6)',
            boxShadow: i % 2 === 0 
              ? '0 0 10px rgba(247, 147, 26, 0.8)' 
              : '0 0 10px rgba(0, 82, 255, 0.8)'
          }}
          animate={{
            x: ['0vw', '110vw'],
            opacity: [0, 0.8, 0.8, 0],
            scale: [0, 1, 1, 0]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 0.8
          }}
        />
      ))}
      
      {/* Subtle radial gradients for depth */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-bitcoin-orange/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-base-blue/5 rounded-full blur-3xl" />
    </div>
  );
}
