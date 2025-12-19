import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MustVisitPlaces from './components/MustVisitPlaces';
import WildlifeSlider from './components/WildlifeSlider';
import PackageSection from './components/PackageSection';
import WhyChooseUs from './components/WhyChooseUs';
import DifferenceSection from './components/DifferenceSection';
import AIPlanner from './components/AIPlanner';
import Visualizer from './components/Visualizer';
import FeaturedTours from './components/FeaturedTours';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* High-conversion flow for Paid Ads */}
        <Hero />
        {/* Concrete destinations to drive immediate interest */}
        <MustVisitPlaces />
        {/* Wildlife showcase with slides as requested */}
        <WildlifeSlider />
        {/* Core offerings based on duration in the 'Roar of the Wild' style */}
        <PackageSection />
        {/* Highlighting the operational reasons for booking */}
        <WhyChooseUs />
        {/* Highlighting the unique approach to Sundarbans */}
        <DifferenceSection />
        {/* Specific deals and direct booking options */}
        <FeaturedTours />
        {/* AI Planner as a unique selling point / lead magnet */}
        <AIPlanner />
        {/* Social Proof to reinforce the guarantee before the final visuals */}
        <Testimonials />
        {/* Visualizer for engagement and "wow" factor */}
        <Visualizer />
      </main>
      <Footer />
    </div>
  );
};

export default App;