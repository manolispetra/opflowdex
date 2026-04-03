/**
 * HOW IT WORKS SECTION
 * 
 * 3 animated steps explaining the process
 */

'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Connect & Select',
    description: 'Connect your OP_NET and Base wallets. Choose which OP-20 token you want to sell or which stablecoin to use for buying.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Native Transfer Only',
    description: 'Click SWAP and approve ONE native transfer in your wallet. No smart contract interactions, no approve, no claim. Just a simple transfer to our hot wallet.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Receive USDT/USDC',
    description: 'Your funds arrive in 2-5 minutes. 93% of fair market value (7% platform fee). No waiting, no claims, no bullshit. Direct to your Base wallet.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-white/60">
            Three steps. No complexity. Pure efficiency.
          </p>
        </motion.div>
        
        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="glass-hover p-8 rounded-2xl relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Step Number */}
              <div className="absolute -top-6 -right-6 text-8xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
                {step.number}
              </div>
              
              {/* Icon */}
              <div className="mb-6 text-bitcoin-orange relative z-10">
                {step.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">
                {step.title}
              </h3>
              <p className="text-white/70 leading-relaxed relative z-10">
                {step.description}
              </p>
              
              {/* Connector Line (except last) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-bitcoin-orange to-base-blue opacity-30" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
