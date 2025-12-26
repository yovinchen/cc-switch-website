import { SiteNavbar } from '@/components/ccswitch/SiteNavbar';
import { HeroSection } from '@/components/ccswitch/HeroSection';
import { FeaturesSection } from '@/components/ccswitch/FeaturesSection';
import { DemoSection } from '@/components/ccswitch/DemoSection';
import { TechSection } from '@/components/ccswitch/TechSection';
import { TestimonialsSection } from '@/components/ccswitch/TestimonialsSection';
import { FAQSection } from '@/components/ccswitch/FAQSection';
import { CTASection } from '@/components/ccswitch/CTASection';
import { SiteFooter } from '@/components/ccswitch/SiteFooter';

export default function CCSwitchHome() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <TechSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
