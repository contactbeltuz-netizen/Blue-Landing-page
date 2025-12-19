import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import USPSection from './components/USPSection';
import WildlifeSlider from './components/WildlifeSlider';
import MustVisitPlaces from './components/MustVisitPlaces';
import PackageSection from './components/PackageSection';
import AIPlanner from './components/AIPlanner';
import DifferenceSection from './components/DifferenceSection';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-[#ff6c00] selection:text-white">
      <Navbar />
      <main>
        {/* 1. THE HOOK: Immediate visual impact and credibility */}
        <Hero />
        
        {/* 2. IMMEDIATE VALUE: What do we actually do? */}
        <USPSection />
        
        {/* 3. EMOTIONAL HOOK: Visual beauty of the wildlife */}
        <WildlifeSlider />
        
        {/* 4. GEOGRAPHIC CONTEXT: Where are we going? */}
        <MustVisitPlaces />
        
        {/* 5. PRODUCT OFFERINGS: Specific packages to book */}
        <PackageSection />
        
        {/* 6. MODERN UTILITY: Let AI do the planning */}
        <AIPlanner />
        
        {/* 7. THE DISTINCTION: Why us specifically? */}
        <DifferenceSection />
        
        {/* 8. TRUST SIGNALS: Safety and hospitality */}
        <WhyChooseUs />
        
        {/* 9. SOCIAL PROOF: Real guest stories */}
        <Testimonials />
      </main>
      
      {/* Persistent Interaction Elements */}
      <StickyCTA />
      <ContactForm />
      
      <Footer />
    </div>
  );
};

export default App;