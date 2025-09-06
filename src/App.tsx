import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
// Removed Hackathons import
import LifeBeyondCode from './components/LifeBeyondCode';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NanitesButton from './components/NanitesButton';
import AnimatedBackground from './components/AnimatedBackground';
import { ThemeProvider } from './components/ThemeProvider';

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
        <AnimatedBackground />
        
        <div className="relative z-10">
          <Navbar />
          
          <main className="space-y-0">
            <section id="hero">
              <Hero />
            </section>
            
            <section id="about" className="py-20">
              <About />
            </section>
            
            <section id="skills" className="py-20">
              <Skills />
            </section>
            
            <section id="timeline" className="py-20">
              <Timeline />
            </section>
            
            <section id="projects" className="py-20">
              <Projects />
            </section>
            
            <section id="certificates" className="py-20">
              <Certificates />
            </section>
            
            {/* Removed Hackathons section */}
            
            <section id="life-beyond-code" className="py-20">
              <LifeBeyondCode />
            </section>
            
            <section id="contact" className="py-20">
              <Contact />
            </section>
          </main>
          
          <NanitesButton />
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}
