import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef(null);

  useEffect(() => {
    // Refresh ScrollTrigger after loading
    if (!isLoading) {
      ScrollTrigger.refresh();
    }
  }, [isLoading]);

  const handleLoadComplete = () => {
    setIsLoading(false);
    // Fade in main content
    gsap.fromTo(
      mainRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' }
    );
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Harsh Upadhyay | Full-Stack Developer Portfolio</title>
      <meta
        name="description"
        content="Portfolio of Harsh Upadhyay, a skilled Full-Stack Developer specializing in Node.js, Express.js, and modern web technologies. Explore my projects and get in touch."
      />

      {/* Preloader */}
      {isLoading && <Preloader onComplete={handleLoadComplete} />}

      {/* Main Content */}
      <main ref={mainRef} className="opacity-0">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default Index;
