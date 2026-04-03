/**
 * MAIN PAGE - OPFLOW
 * 
 * Complete single-page application
 */

'use client';

import { BackgroundFlow } from '@/components/BackgroundFlow';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { Chart } from '@/components/Chart';
import { Transparency } from '@/components/Transparency';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Background Animation */}
      <BackgroundFlow />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <HowItWorks />
        <Chart />
        <Transparency />
        <Footer />
      </div>
    </main>
  );
}
