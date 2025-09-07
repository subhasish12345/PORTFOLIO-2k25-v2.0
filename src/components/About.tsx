import React, { useEffect, useRef } from 'react';
import { MapPin, Mail, Phone, GraduationCap, Calendar } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const personalInfo = [
  { icon: MapPin, label: 'Location', value: 'Bhubaneswar, Odisha, India' },
  { icon: Mail, label: 'Email', value: 'subahsishnayak38@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 7750096113' },
];

const education = [
  {
    degree: 'B.Tech Computer Science Engineering',
    institution: 'Gandhi Engineering College, Bhubaneswar',
    status: '7th Semester, 4th Year',
    year: '2022-2026',
  },
  {
    degree: '12th Standard (78%)',
    institution: 'Bidwan Residential College',
    year: '2022',
  },
  {
    degree: '10th Standard (69%)',
    institution: 'Saraswati Sishu Vidya Mandir',
    year: '2020',
  },
];

export default function About() {
  const aboutRef = useRef(null);
  const titleRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);
  const personalInfoRefs = useRef([]);
  const educationRefs = useRef([]);
  const quoteRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Left content animation
      gsap.fromTo(leftContentRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftContentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Personal info cards stagger animation
      gsap.fromTo(personalInfoRefs.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: personalInfoRefs.current[0],
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Quote animation
      gsap.fromTo(quoteRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Right content animation
      gsap.fromTo(rightContentRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rightContentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Education cards stagger animation
      gsap.fromTo(educationRefs.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: educationRefs.current[0],
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Stats animation
      gsap.fromTo(statsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={aboutRef} className="py-20">
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Final-year CSE student at Gandhi Engineering College. Exploring Web, AI/ML, and Mobile development
            through projects, internships, and hackathons. Blending creativity with technical depth to build
            innovative solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Personal Information */}
          <div ref={leftContentRef} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3" />
                Personal Information
              </h3>

              <div className="space-y-4">
                {personalInfo.map((info, index) => (
                  <div
                    key={info.label}
                    ref={el => personalInfoRefs.current[index] = el}
                  >
                    <Card className="bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <info.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{info.label}</p>
                            <p className="font-medium">{info.value}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote/Mission */}
            <div ref={quoteRef}>
              <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <blockquote className="text-lg italic text-center">
                    "Passionate about creating innovative solutions that bridge the gap between
                    technology and human needs. Every line of code is a step towards building
                    a better digital future."
                  </blockquote>
                  <p className="text-center mt-4 text-muted-foreground">- Subhasish Nayak</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Education */}
          <div ref={rightContentRef} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3" />
                Education
              </h3>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    ref={el => educationRefs.current[index] = el}
                  >
                    <Card className="bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="p-2 bg-primary/10 rounded-lg mt-1">
                            <GraduationCap className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-1">{edu.degree}</h4>
                            <p className="text-muted-foreground mb-2">{edu.institution}</p>
                            {edu.status && (
                              <p className="text-sm text-primary mb-1">{edu.status}</p>
                            )}
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4 mr-1" />
                              {edu.year}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div ref={statsRef}>
              <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        8+
                      </div>
                      <p className="text-sm text-muted-foreground">Major Projects </p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        19+
                      </div>
                      <p className="text-sm text-muted-foreground">Minor Projects</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                        8+
                      </div>
                      <p className="text-sm text-muted-foreground">Internships</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                        21+
                      </div>
                      <p className="text-sm text-muted-foreground">Certificates</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
