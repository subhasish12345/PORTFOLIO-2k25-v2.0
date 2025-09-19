import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, ExternalLink, Calendar, CheckCircle, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

function CertificateModal({ open, onClose, imgSrc }: { open: boolean, onClose: () => void, imgSrc: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg p-4 relative max-w-lg w-full">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <img src={imgSrc} alt="Certificate" className="w-full h-auto rounded" />
      </div>
    </div>
  );
}

const certificates = [
  {
    title: 'AI Cloud & LangChain',
    issuer: 'Edunet',
    date: '2025',
    category: 'AI',
    description: 'Cloud-based AI solutions and LangChain framework implementation.',
    skills: ['IBM Watson', 'LangChain', 'Cloud AI', 'APIs'],
    verified: true,
    featured: true,
    color: 'from-gray-500 to-slate-500',
    image: '/CERTIFICATES/edunet.jpg',
  },
  {
    title: 'AI Cloud & LangChain',
    issuer: 'IBM',
    date: '2024',
    category: 'Cloud AI',
    description: 'Cloud-based AI solutions and LangChain framework implementation.',
    skills: ['IBM Watson', 'LangChain', 'Cloud AI', 'APIs'],
    verified: true,
    featured: true,
    color: 'from-gray-500 to-slate-500',
    image: '/CERTIFICATES/LANGCHAIN.jpg',
  },
  {
    title: 'Web Development Certification',
    issuer: 'Nextzon',
    date: '2024',
    category: 'Web Development',
    description: 'Comprehensive web development training covering frontend and backend technologies.',
    skills: ['HTML', 'CSS', 'JavaScript', ],
    verified: true,
    featured: false,
    color: 'from-blue-500 to-cyan-500',
    image: '/CERTIFICATES/NEXTZONE.jpg',
  },
  {
    title: 'AI/ML Certification',
    issuer: 'Extion',
    date: '2024',
    category: 'Artificial Intelligence',
    description: 'Machine learning and artificial intelligence fundamentals and practical applications.',
    skills: ['Python', , 'Machine Learning', ],
    verified: true,
    featured: false,
    color: 'from-purple-500 to-violet-500',
    image: '/CERTIFICATES/EXTION.jpg',
  },
  {
    title: 'Generative AI Certification',
    issuer: 'AWS Aspire for Her',
    date: '2024',
    category: 'AI/ML',
    description: 'Advanced generative AI technologies and their practical implementations.',
    skills: ['AWS', 'Generative AI',],
    verified: true,
    featured: true,
    color: 'from-orange-500 to-red-500',
    image: '/CERTIFICATES/AWS.jpg',
  },
  {
    title: 'Full Stack Development',
    issuer: 'Cognify',
    date: '2024',
    category: 'Full Stack',
    description: 'End-to-end web application development with modern technologies.',
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
    verified: true,
    featured: false,
    color: 'from-green-500 to-emerald-500',
    image: '/CERTIFICATES/COGNIFY.jpg',
  },
  {
    title: 'Prompt Engineering',
    issuer: 'Online Platform',
    date: '2025',
    category: 'AI/ML',
    description: 'Advanced techniques for effective AI prompt design and optimization.',
    skills: ['Prompt Design', 'ChatGPT', 'AI Models', 'Optimization'],
    verified: true,
    featured: false,
    color: 'from-pink-500 to-rose-500',
    image: '/CERTIFICATES/PROMT ENGINERRING.jpg',
  },
  {
    title: 'Android Development',
    issuer: 'Codetech IT Solutions',
    date: '2025',
    category: 'Mobile Development',
    description: 'Native Android application development with modern practices.',
    skills: ['Android Studio', 'Java', 'XML', 'Mobile UI'],
    verified: true,
    featured: true,
    color: 'from-indigo-500 to-purple-500',
    image: '/CERTIFICATES/CODTECH IT SOL.jpg',
  },
  {
    title: 'Frontend Development',
    issuer: 'Infosys',
    date: '2025',
    category: 'Frontend',
    description: 'Modern frontend development frameworks and best practices.',
    skills: ['React', 'JavaScript', 'CSS', 'Responsive Design'],
    verified: true,
    featured: false,
    color: 'from-teal-500 to-green-500',
    image: '/CERTIFICATES/INFOSYS.jpg',
  },

  {
    title: 'AI Fundamentals',
    issuer: 'IBM',
    date: '2024',
    category: 'AI/ML',
    description: 'Core concepts and principles of artificial intelligence.',
    skills: ['AI Basics', 'Machine Learning', , 'Data Analysis'],
    verified: true,
    featured: false,
    color: 'from-blue-600 to-purple-600',
    image: '/CERTIFICATES/IBM AI.jpg',
  },
  {
    title: 'Data Science',
    issuer: 'IBM',
    date: '2024',
    category: 'Data Science',
    description: 'Comprehensive data science methodologies and tools.',
    skills: ['Python', ],
    verified: true,
    featured: false,
    color: 'from-yellow-500 to-orange-500',
    image: '/CERTIFICATES/IBM CLOUD.jpg',
  },
  {
    title: 'College Ambassador',
    issuer: 'Gandhi Engineering College',
    date: '2024',
    category: 'Leadership',
    description: 'Leadership and communication skills development through ambassador program.',
    skills: [ 'Communication',  'Networking'],
    verified: true,
    featured: false,
    color: 'from-emerald-500 to-teal-500',
    image: '/CERTIFICATES/CAMPUS AMBACITOR.jpg',
  },
  {
    title: 'HacktoSkill Certificate',
    issuer: 'HacktoSkill',
    date: '2024',
    category: 'Hackathon',
    description: 'Recognition for participation and achievement in coding hackathons.',
    skills: ['Problem Solving', 'Team Collaboration', 'Innovation', 'Coding'],
    verified: true,
    featured: false,
    color: 'from-red-500 to-pink-500',
    image: '/CERTIFICATES/H2S.jpg',
  },
];

const categoryColors = {
  'Web Development': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  'Artificial Intelligence': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  'AI/ML': 'bg-violet-500/10 text-violet-600 border-violet-500/20',
  'Full Stack': 'bg-green-500/10 text-green-600 border-green-500/20',
  'Mobile Development': 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
  'Frontend': 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
  'Cloud AI': 'bg-gray-500/10 text-gray-600 border-gray-500/20',
  'Data Science': 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  'Leadership': 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  'Hackathon': 'bg-pink-500/10 text-pink-600 border-pink-500/20',
};

export default function Certificates() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string>("");

  const handleView = (img: string) => {
    setSelectedImg(img);
    setModalOpen(true);
  };

  const featuredCertificates = certificates.filter(cert => cert.featured);
  const otherCertificates = certificates.filter(cert => !cert.featured);

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
            Certificates & <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Achievements</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Professional certifications and recognition across web development, AI/ML, 
            cloud computing, and leadership development from industry leaders.
          </p>
        </motion.div>

        {/* Featured Certificates */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold mb-8 flex items-center"
          >
            <Star className="h-6 w-6 text-yellow-500 mr-2" />
            Featured Certifications
          </motion.h3>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredCertificates.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        className={`p-3 rounded-xl bg-gradient-to-r ${cert.color} text-white`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Award className="h-6 w-6" />
                      </motion.div>
                      {cert.verified && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-xs">Verified</span>
                        </div>
                      )}
                    </div>
                    
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-200">
                      {cert.title}
                    </CardTitle>
                    
                    <div className="space-y-2">
                      <p className="text-primary font-medium">{cert.issuer}</p>
                      <div className="flex items-center justify-between">
                        <Badge className={categoryColors[cert.category as keyof typeof categoryColors]}>
                          {cert.category}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {cert.date}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {cert.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: skillIndex * 0.05, duration: 0.3 }}
                        >
                          <Badge 
                            variant="outline"
                            className="bg-primary/5 hover:bg-primary/10 transition-colors duration-200 text-xs"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleView(cert.image)}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Certificate
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Other Certificates */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold mb-8 flex items-center"
          >
            <Award className="h-6 w-6 text-blue-500 mr-2" />
            All Certifications
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherCertificates.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="group bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${cert.color} text-white`}>
                        <Award className="h-4 w-4" />
                      </div>
                      {cert.verified && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    
                    <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200 leading-tight">
                      {cert.title}
                    </CardTitle>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-primary font-medium">{cert.issuer}</p>
                      <div className="flex items-center justify-between">
                        <Badge className={`${categoryColors[cert.category as keyof typeof categoryColors]} text-xs`}>
                          {cert.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{cert.date}</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cert.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.slice(0, 2).map((skill) => (
                        <Badge 
                          key={skill}
                          variant="outline"
                          className="bg-primary/5 text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {cert.skills.length > 2 && (
                        <Badge variant="outline" className="bg-primary/5 text-xs">
                          +{cert.skills.length - 2}
                        </Badge>
                      )}
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full text-xs"
                      onClick={() => handleView(cert.image)}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certification Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-primary/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    20+
                  </div>
                  <p className="text-muted-foreground">Total Certificates</p>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    11+
                  </div>
                  <p className="text-muted-foreground">Different Categories</p>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                    100%
                  </div>
                  <p className="text-muted-foreground">Verified</p>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                    2023,2024,2025
                  </div>
                  <p className="text-muted-foreground"> Year</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Modal for certificate images */}
      <CertificateModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        imgSrc={selectedImg}
      />
    </section>
  );
}
