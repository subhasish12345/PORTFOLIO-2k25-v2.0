import React, { useEffect, useRef } from "react";
import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { gsap } from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-line', {
        opacity: 0,
        y: 30,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.3,
      });

      gsap.fromTo('.hero-sub', {
        opacity: 0,
      }, {
        opacity: 1,
        duration: 0.8,
        delay: 0.9,
        ease: 'power2.out',
      });

      gsap.fromTo('.hero-actions', {
        opacity: 0,
        y: 10,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 1.2,
        ease: 'power2.out',
      });

      gsap.fromTo('.hero-image', {
        opacity: 0,
        scale: 0.95,
      }, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        delay: 0.5,
        ease: 'power3.out',
      });

      gsap.to('.scroll-arrow', {
        y: 8,
        duration: 1.4,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/SUBHASISH_NAYAK__India.pdf';
    link.download = 'Subhasish_Nayak_Resume.pdf';
    link.click();
  };

  return (
    <section ref={heroRef} className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden pt-20">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      <div className="max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Name + Headline */}
            <div className="space-y-1">
              <p className="hero-line text-[#a1a1aa] text-base font-light tracking-widest uppercase font-mono">
                Subhasish Nayak
              </p>
              <h1 className="hero-line text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight">
                Building<br />
                <span className="text-[#a1a1aa]">intelligent</span><br />
                systems.
              </h1>
            </div>

            {/* Tagline */}
            <p className="hero-sub text-[#a1a1aa] text-base leading-relaxed max-w-md">
              Full Stack Developer | React • Next.js • Firebase | AI-Powered Web Applications
              <br className="my-2" />
              I don't just write code — I document the journey, ship things that matter, and iterate relentlessly.
            </p>

            {/* CTA Buttons */}
            <div className="hero-actions flex flex-wrap gap-3">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-2.5 bg-white text-black text-sm font-semibold rounded hover:bg-gray-100 transition-colors"
              >
                View My Work
              </button>
              <button
                onClick={downloadResume}
                className="px-6 py-2.5 border border-[#27272a] text-white text-sm font-semibold rounded hover:border-white transition-colors flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Resume
              </button>
            </div>

            {/* Social Links */}
            <div className="hero-actions flex items-center gap-4 pt-2">
              {[
                { icon: Github, href: 'https://github.com/subhasish12345', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/subhasish-nayak-67a257280/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:subahsishnayak38@gmail.com', label: 'Email' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 text-[#a1a1aa] hover:text-white border border-[#27272a] hover:border-[#52525b] rounded transition-all duration-200"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Right — Profile Photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="hero-image relative w-72 h-72 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full border border-[#27272a]" />
              <div className="absolute inset-2 rounded-full overflow-hidden">
                <ImageWithFallback
                  src="/CERTIFICATES/profile.jpg"
                  alt="Subhasish Nayak"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <span className="text-[10px] font-mono text-[#52525b] tracking-widest uppercase">scroll</span>
          <ArrowDown className="scroll-arrow h-4 w-4 text-[#52525b]" />
        </div>
      </div>
    </section>
  );
}
