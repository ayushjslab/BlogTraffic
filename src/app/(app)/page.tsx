import Navbar from '@/components/app-components/home/navbar'
import HeroSection from '@/components/app-components/home/hero-section'
import StatsConsole from '@/components/app-components/home/stats-console'
import BentoFeatures from '@/components/app-components/home/bento-feature'
import AutomationFlow from '@/components/app-components/home/automation-flow'
import SEOIntelligence from '@/components/app-components/home/seo-intelliigence'
import SEODominance from '@/components/app-components/home/seo-dominance'
import VelocitySection from '@/components/app-components/home/velocity-section'
import FeedbackStats from '@/components/app-components/home/feedback-stats'
import LuxuryPricing from '@/components/app-components/home/luxury-pricing'
import FinalCTA from '@/components/app-components/home/final-cta'

const HomePage = () => {
  return (
    <main className="bg-white dark:bg-black antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Navbar />
      
      {/* 1. The Hook */}
      <HeroSection />
      
      {/* 2. Immediate Social Proof & Scale */}
      <StatsConsole />
      
      {/* 3. Feature Overview */}
      <BentoFeatures />
      
      {/* 4. The Process (How it works) */}
      <AutomationFlow />
      
      {/* 5. Deep Technical Authority */}
      <SEOIntelligence />
      <SEODominance />
      
      {/* 6. High Energy / Hype Transition */}
      <VelocitySection />
      
      {/* 7. Social Proof & Success Stories */}
      <FeedbackStats />
      
      {/* 8. Transactional Phase */}
      <LuxuryPricing />
      
      {/* 9. The Closing */}
      <FinalCTA />
    </main>
  )
}

export default HomePage