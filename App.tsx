
import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandVideoSection } from './components/BrandVideoSection';
import { LiveTicker } from './components/LiveTicker';
import { CategoryGrid } from './components/CategoryGrid';
import { GameCategories } from './components/GameCategories';
import { GameGrid } from './components/GameGrid';
import { VipSection } from './components/VipSection';
import { AppDownload } from './components/AppDownload';
import { Footer } from './components/Footer';
import { LandingIntro } from './components/LandingIntro';
import { PromoSection } from './components/PromoSection';
import { FAQSection } from './components/FAQSection';
import { GameProviders } from './components/GameProviders';
import { SimulatorCTA } from './components/SimulatorCTA';
import { DailyNews } from './components/DailyNews';
import { AuthProvider } from './components/AuthContext';
import { AuthModals } from './components/AuthModals';

function App() {
  return (
    <AuthProvider>
        <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-gold selection:text-black">
        <LandingIntro />
        <AuthModals />
        <Header />
        
        <main>
            <Hero />
            <BrandVideoSection />
            <LiveTicker />
            <DailyNews />
            <GameCategories />
            <PromoSection />
            <CategoryGrid />
            <GameGrid />
            <VipSection />
            
            <FAQSection />
            <AppDownload />
            <GameProviders />
            <SimulatorCTA />
        </main>

        <Footer />
        </div>
    </AuthProvider>
  );
}

export default App;
