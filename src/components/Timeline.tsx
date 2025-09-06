import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const timelineEvents = [
  {
  title: 'IBM SkillsBuild AI & LangChain Course',
  company: 'IBM',
  period: '2025',
  location: 'Online',
  type: 'Course',
  status: 'Completed',
  description: 'Advanced AI and LangChain technologies for building intelligent applications and chatbots.',
  technologies: ['IBM ', 'LangChain', 'AI', 'Cloud'],
  color: 'from-gray-500 to-slate-500',
},

  {
  title: 'Android App Development Intern',
  company: 'CODETECH IT SOLUTIONS',
  period: 'January 2025 - March 2025',
  location: 'Remote',
  type: 'Internship',
  status: 'Completed',
  description: 'Developing native Android applications using Java and Android Studio. Focus on UI/UX design, API integration, and performance optimization.',
  technologies: ['Android Studio', 'Java', 'XML', ],
  color: 'from-green-500 to-emerald-500',
},
{
  title: 'Frontend Development Course',
  company: 'INFOSYS',
  period: 'February 2025',
  location: 'Online',
  type: 'Course',
  status: 'Completed',
  description: 'Comprehensive frontend development training covering modern web technologies and best practices.',
  technologies: ['React', 'JavaScript', 'CSS', 'HTML'],
  color: 'from-blue-500 to-cyan-500',
},

{
  title: 'Prompt Engineering Course',
  company: 'Online Platform',
  period: 'January 2025',
  location: 'Online',
  type: 'Course',
  status: 'Completed',
  description: 'Advanced techniques for effective AI prompt engineering and optimization for various AI models.',
  technologies: ['ChatGPT','GEMINI','PERPLEXITY','GROK', 'Prompt Design', 'AI Models'],
  color: 'from-purple-500 to-violet-500',
},
{
  title: 'Full Stack Development Intern',
  company: 'COGNIFY',
  period: 'November 2024 - December 2024',
  location: 'Remote',
  type: 'Internship',
  status: 'Completed',
  description: 'End-to-end web application development using modern full-stack technologies. Database design and API development.',
  technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
  color: 'from-orange-500 to-red-500',
},
{
  title: 'Generative AI Revolution Course',
  company: 'ASPIRE FOR HER (AWS)',
  period: 'November 2024 - December 2024',
  location: 'Online',
  type: 'Course',
  status: 'Completed',
  description: 'Comprehensive course on generative AI technologies and their applications in modern development.',
  technologies: ['AWS', 'Machine Learning', 'AI/ML',],
  color: 'from-pink-500 to-rose-500',
},
{
  title: 'AI/ML Intern',
  company: 'EXTION',
  period: 'October 2024 - December 2024',
  location: 'Remote',
  type: 'Internship',
  status: 'Completed',
  description: 'Machine learning model development and data analysis. Worked on AI-powered solutions and predictive analytics.',
  technologies: ['Python', ],
  color: 'from-indigo-500 to-purple-500',
},
{
  title: 'Web Development Intern',
  company: 'NEXTZON',
  period: 'August 2024 - October 2024',
  location: 'Remote',
  type: 'Internship',
  status: 'Completed',
  description: 'Frontend and backend web development. Built responsive websites and web applications using modern frameworks.',
  technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
  color: 'from-teal-500 to-green-500',
},

]
export default function Timeline() {
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
            Professional <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A chronological journey through my professional development, internships, 
            courses, and continuous learning experiences.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform md:-translate-x-1/2" />

          <div className="space-y-12">
;
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:flex-row`}
              >
                {/* Timeline Dot */}
                <motion.div
                  className={`absolute left-4 md:left-1/2 w-4 h-4 bg-gradient-to-r ${event.color} rounded-full transform md:-translate-x-1/2 z-10 border-4 border-background`}
                  whileHover={{ scale: 1.5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />

                {/* Content Card */}
                <div className={`ml-12 md:ml-0 w-full md:w-5/12 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}>
                  <Card className="bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-1">{event.title}</CardTitle>
                          <p className="text-primary font-medium">{event.company}</p>
                        </div>
                        <Badge 
                          variant={event.status === 'Current' || event.status === 'Ongoing' ? 'default' : 'secondary'}
                          className={event.status === 'Current' || event.status === 'Ongoing' ? 'bg-green-500/10 text-green-600 border-green-500/20' : ''}
                        >
                          {event.status}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {event.period}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {event.location}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{event.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {event.technologies.map((tech, techIndex) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: techIndex * 0.05, duration: 0.3 }}
                          >
                            <Badge 
                              variant="secondary"
                              className="bg-primary/10 hover:bg-primary/20 transition-colors duration-200 text-xs"
                            >
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16"
        >
          
        </motion.div>
      </div>
    </section>
  );
}