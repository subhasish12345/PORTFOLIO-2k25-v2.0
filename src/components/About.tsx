import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Mail, Phone, GraduationCap, Calendar } from 'lucide-react';
import { Card, CardContent } from './ui/card';

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
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Final-year CSE student at Gandhi Engineering College. Exploring Web, AI/ML, and Mobile development 
            through projects, internships, and hackathons. Blending creativity with technical depth to build 
            innovative solutions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3" />
                Personal Information
              </h3>
              
              <div className="space-y-4">
                {personalInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
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
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quote/Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
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
            </motion.div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3" />
                Education
              </h3>
              
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
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
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-6">
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
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}