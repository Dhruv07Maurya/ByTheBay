'use client'

import { LenisScroll } from '@/components/LenisScroll'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/components/home/HeroSection'
import { SelectedWorksSection } from '@/components/home/SelectedWorksSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { ClientsMarquee } from '@/components/home/ClientsMarquee'
import { AboutPhilosophySection } from '@/components/home/AboutPhilosophySection'
import { ProcessSection } from '@/components/home/ProcessSection'
import { CTASection } from '@/components/home/CTASection'

import { OnekoCat } from '@/components/home/OnekoCat'

export default function Page() {
  return (
    <>
      <LenisScroll />
      <main className="min-h-screen">
        <OnekoCat />
        <HeroSection />
        <SelectedWorksSection />
        <ClientsMarquee />
        <ServicesSection />
        <AboutPhilosophySection />
        <ProcessSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
