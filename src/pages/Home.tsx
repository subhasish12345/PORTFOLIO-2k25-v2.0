import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Timeline from '../components/Timeline';
import Projects from '../components/Projects';
import Certificates from '../components/Certificates';
import BuildLogs from '../components/BuildLogs';
import FailureStories from '../components/FailureStories';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden" style={{ fontFamily: "'Inter', 'Outfit', sans-serif" }}>
      <Navbar />

      <main>
        <section id="hero">
          <Hero />
        </section>

        <section id="about" className="py-20">
          <About />
        </section>

        <section id="skills" className="py-20">
          <Skills />
        </section>

        <section id="projects" className="py-20">
          <Projects />
        </section>

        <section id="timeline" className="py-20">
          <Timeline />
        </section>

        <section id="certificates" className="py-20">
          <Certificates />
        </section>

        <section id="build-logs">
          <BuildLogs />
        </section>

        <section id="failure-stories">
          <FailureStories />
        </section>

        <section id="contact" className="py-20">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  );
}

