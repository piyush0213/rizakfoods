import { Hero } from '@/components/home/Hero';
import { FeaturedGhee } from '@/components/home/FeaturedGhee';
import { FreshRange } from '@/components/home/FreshRange';
import { AboutSection } from '@/components/home/AboutSection';
import { Testimonials } from '@/components/home/Testimonials';
import { TrustBadges } from '@/components/home/TrustBadges';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <FeaturedGhee />
      <FreshRange />
      <AboutSection />
      <Testimonials />
    </>
  );
}
