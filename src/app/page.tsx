import { FeatureSection } from "@/components/landing-page/feature-section";
import { FooterComponent } from "@/components/landing-page/footer";
import HeroSection from "@/components/landing-page/hero-section";
import { StepsSectionComponent } from "@/components/landing-page/steps-section";

export const runtime = "edge";
export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeatureSection />
      <StepsSectionComponent />
      <FooterComponent />
    </main>
  );
}
