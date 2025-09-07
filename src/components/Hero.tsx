import React, { useEffect, useRef } from "react";
import { ArrowDown, Download, ExternalLink, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { gsap } from 'gsap';

export default function Hero() {
  const heroRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);
  const profileImageRef = useRef(null);
  const floatingIcon1Ref = useRef(null);
  const floatingIcon2Ref = useRef(null);
  const socialLinksRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section entrance animation
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );

      // Left content animations
      const leftTl = gsap.timeline({ delay: 0.3 });
      leftTl.fromTo(leftContentRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      );

      // Text elements stagger
      leftTl.fromTo(".hero-text",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        "-=0.4"
      );

      // Buttons animation
      leftTl.fromTo(".hero-buttons",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.2"
      );

      // Right content animations
      gsap.fromTo(rightContentRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.5 }
      );

      // Profile image entrance
      gsap.fromTo(profileImageRef.current,
        { opacity: 0, scale: 0.8, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.7)", delay: 0.7 }
      );

      // Floating icons continuous animation
      gsap.to(floatingIcon1Ref.current, {
        y: "random(-20, 20)",
        rotation: "random(-10, 10)",
        duration: "random(3, 5)",
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });

      gsap.to(floatingIcon2Ref.current, {
        y: "random(-15, 15)",
        rotation: "random(-15, 15)",
        duration: "random(4, 6)",
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });

      // Social links stagger animation
      gsap.fromTo(".social-link",
        { opacity: 0, y: 20, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 1
        }
      );

      // Scroll indicator animation
      gsap.fromTo(scrollIndicatorRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 1.2 }
      );

      // Continuous scroll indicator bounce
      gsap.to(".scroll-arrow", {
        y: 10,
        duration: 1.5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadResume = () => {
    // Link to actual resume in public folder
    const link = document.createElement('a');
    link.href = '/Subhasish_PRIME1 08-09-25.pdf'; // Actual resume file path in public folder
    link.download = 'Subhasish_Nayak_Resume.pdf';
    link.click();
  };

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div ref={leftContentRef} className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm">
                <span className="text-sm bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  🚀 Available for Opportunities
                </span>
              </div>

              <h1 className="hero-text text-5xl md:text-7xl font-bold leading-tight">
               <span className="block bg-gradient-to-r from-red-600 via-white to-green-600 bg-clip-text text-transparent font-bold">
  JAI HIND
</span>


                <span className="block"> I'm</span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Subhasish
                </span>
                <span className="block">Nayak</span>
              </h1>
            </div>

            <div className="space-y-6">
              <p className="hero-text text-xl text-muted-foreground leading-relaxed">
                🚀 Building the Future with Code | 🤖 Exploring Android Development |
                🌐 Passionate About AI/ML, Prompt Engineering, Web Development &
                🛠️ Innovative Solutions | 🎓 B.Tech CSE Student Eager to Make a Difference
              </p>

              <div className="hero-buttons flex flex-wrap gap-4">
                <Button
                  onClick={scrollToProjects}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full"
                >
                  Explore My Work
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>

                <Button
                  onClick={downloadResume}
                  variant="outline"
                  size="lg"
                  className="border-2 border-primary/20 hover:border-primary/40 backdrop-blur-sm px-8 py-3 rounded-full"
                >
                  Download Resume
                  <Download className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Social Links */}
            <div ref={socialLinksRef} className="flex space-x-4">
              {[
                { icon: Github, href: 'https://github.com/subhasish12345', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/subhasish-nayak-67a257280/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:subahsishnayak38@gmail.com', label: 'Email' },
              ].map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link p-3 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300"
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Content - 3D Profile Image */}
          <div ref={rightContentRef} className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glowing Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-2xl opacity-30 animate-pulse" />

              {/* Profile Image Container */}
              <div ref={profileImageRef} className="relative w-80 h-80 md:w-96 md:h-96">
                <div className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/20" />
                <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-white/30 backdrop-blur-sm">
                  <ImageWithFallback
                    src="/CERTIFICATES/profile.jpg"
                    alt="Subhasish Nayak"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Elements */}
                <div ref={floatingIcon1Ref} className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl">
                  🚀
                </div>

                <div ref={floatingIcon2Ref} className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                  💻
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div
            className="cursor-pointer"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ArrowDown className="scroll-arrow h-6 w-6 text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
}
