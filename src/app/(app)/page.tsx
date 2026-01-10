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
import FAQSection from '@/components/app-components/home/faq'
import InternalLinking from '@/components/app-components/home/interlinking'
import Benefits from '@/components/app-components/home/benefits'

const HomePage = () => {
  return (
    <main className="bg-white dark:bg-black antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Navbar />

      {/* 1. Primary SEO Hook */}
      <HeroSection />

      {/* 2. Core Value Proposition */}
      <Benefits />

      {/* 3. Immediate Authority */}
      <StatsConsole />

      {/* 4. Feature-Based Keyword Coverage */}
      <BentoFeatures />

      {/* 5. How It Works */}
      <AutomationFlow />

      {/* 6. Technical SEO Authority */}
      <SEOIntelligence />
      <SEODominance />

      {/* 7. Engagement Boost */}
      <VelocitySection />

      {/* 8. Trust & Social Proof */}
      <FeedbackStats />

      {/* 9. Conversion */}
      <LuxuryPricing />

      {/* 10. Crawl & Indexing Support */}
      <InternalLinking />

      {/* 11. Featured Snippet Target */}
      <FAQSection />

      {/* 12. Final Conversion */}
      <FinalCTA />
    </main>
  )
}


export default HomePage