import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Eye, Code, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

const projects = [
  {
    title: 'AI Powered Resume & JD Checker',
    description: 'Intelligent resume analysis and job description matching system using advanced NLP algorithms to help job seekers optimize their applications.',
    image: 'https://images.unsplash.com/photo-1738003667850-a2fb736e31b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2UlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NjM1NTg5Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    technologies: ['Next', 'React', 'Typescript', 'Genkit', 'TailwindCSS', 'Firebase'],
    category: 'AI/ML',
    featured: true,
    links: {
      demo: '#',
      github: 'https://github.com/subhasish12345/resumesacnner.git',
    },
    status: 'Completed',
    color: 'from-blue-500 to-purple-500',
  },
  {
    title: 'Interactive Art Gallery',
    description: 'Immersive 3D art gallery experience with WebGL rendering, interactive exhibits, and virtual reality support for art enthusiasts.',
    image: 'https://images.unsplash.com/photo-1605905898247-bb1fe36b587e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwbW9kZXJufGVufDF8fHx8MTc1NjQ1MzQ1NHww&ixlib=rb-4.1.0&q=80&w=1080',
    technologies: ['Next', 'React', 'Typescript', 'Genkit', 'TailwindCSS', 'Firebase'],
    category: 'Web Development',
    featured: true,
    links: {
      demo: '#',
      github: 'https://github.com/subhasish12345/ARTGALLERY.git',
    },
    status: 'Completed',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'TechFest Website',
    description: 'Dynamic event management platform for college technical festivals with registration, event scheduling, and real-time updates.',
    image: 'https://images.unsplash.com/photo-1546900703-cf06143d1239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NTYzNjY1Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    technologies: ['Next', 'React', 'Typescript', 'Genkit', 'TailwindCSS', 'Firebase'],
    category: 'Web Development',
    featured: false,
    links: {
      demo: 'https://techfest-by-nanites.onrender.com/',
      github: 'https://github.com/subhasish12345/Techfest-BY-NANITES.git',
    },
    status: 'Completed',
    color: 'from-green-500 to-blue-500',
  },
  {
    title: 'Gaming Website',
    description: 'Real-time multiplayer gaming platform with live chat, game lobbies, and competitive leaderboards using Socket.io.',
    image: 'https://images.unsplash.com/photo-1631155989170-5b1d86e13cef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjB0ZWNobm9sb2d5JTIwbmVvbnxlbnwxfHx8fDE3NTY0Mzg4MjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
    category: 'Full Stack',
    featured: false,
    links: {
      demo: '#',
      github: '#',
    },
    status: 'Completed',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'College Management + Attendance',
    description: 'Comprehensive college management system with automated attendance tracking, grade management, and student portal.',
    image: 'https://images.unsplash.com/photo-1741958193874-6ef299f6b053?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5hZ2VtZW50JTIwc3lzdGVtJTIwZGF0YWJhc2V8ZW58MXx8fHwxNzU2NDUzNDYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    technologies: ['Next', 'React', 'Typescript', 'Genkit', 'TailwindCSS', 'Firebase'],
    category: 'Desktop Application',
    featured: false,
    links: {
      demo: '#',
      github: 'https://github.com/subhasish12345/studenthubff.git',
    },
    status: 'Completed',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'Interactive Career Guide',
    description: 'AI-powered career guidance platform providing personalized career recommendations based on skills, interests, and market trends.',
    image: 'https://images.unsplash.com/photo-1738750908048-14200459c3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJlZXIlMjBndWlkYW5jZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTY0NTM0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    technologies: ['React', 'Python', 'TensorFlow', 'OpenAI API', 'FastAPI'],
    category: 'AI/ML',
    featured: true,
    links: {
      demo: 'https://carrier-compass-ai.onrender.com/',
      github: 'https://github.com/subhasish12345/CARRIERAIBYSUBHU.git',
    },
   status: 'Completed',
    color: 'from-indigo-500 to-purple-500',
  },
];

const categoryColors = {
  'AI/ML': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  'Web Development': 'bg-green-500/10 text-green-600 border-green-500/20',
  'Full Stack': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  'Desktop Application': 'bg-orange-500/10 text-orange-600 border-orange-500/20',
};

export default function Projects() {
const reorderedFeaturedTitles = [
  'TechFest Website',
  'Interactive Career Guide',
  'Interactive Art Gallery',
];

const updatedFeaturedProjects = reorderedFeaturedTitles.map(title =>
  projects.find(project => project.title === title)
).filter(Boolean) as typeof projects;

const aiProject = projects.find(project => project.title === 'AI Powered Resume & JD Checker');

const updatedOtherProjects = projects.filter(project => !reorderedFeaturedTitles.includes(project.title) && project.title !== 'AI Powered Resume & JD Checker');

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
          Featured <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          A showcase of innovative projects spanning AI/ML, web development, and full-stack applications. 
          Each project demonstrates technical expertise and creative problem-solving.
        </p>
      </motion.div>

      {/* Featured Projects */}
      <div className="mb-20">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold mb-8 flex items-center"
        >
          <Zap className="h-6 w-6 text-yellow-500 mr-2" />
          Featured Work
        </motion.h3>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {updatedFeaturedProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 overflow-hidden h-full">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Badge 
                      variant="secondary"
                      className={project.status === 'In Development' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' : 'bg-green-500/10 text-green-600 border-green-500/20'}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className={categoryColors[project.category as keyof typeof categoryColors]}>
                      {project.category}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </CardTitle>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: techIndex * 0.05, duration: 0.3 }}
                      >
                        <Badge 
                          variant="outline"
                          className="bg-primary/5 hover:bg-primary/10 transition-colors duration-200 text-xs"
                        >
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button size="sm" asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                        <Eye className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

        {/* Other Projects */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold mb-8 flex items-center"
          >
            <Code className="h-6 w-6 text-blue-500 mr-2" />
            More Projects
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {updatedOtherProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 overflow-hidden h-full">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3">
                      <Badge
  className={`${categoryColors[project.category as keyof typeof categoryColors]} text-xs`}
>
  {project.category}
</Badge>

                    </div>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">
                      {project.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge 
                          key={tech}
                          variant="outline"
                          className="bg-primary/5 text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="bg-primary/5 text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" asChild className="text-xs">
                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Demo
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" asChild className="text-xs">
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-3 w-3 mr-1" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Project Stats */}
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
                    8+
                  </div>
                  <p className="text-muted-foreground">Major Projects</p>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    20+
                  </div>
                  <p className="text-muted-foreground">Minor Projects</p>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                    6
                  </div>
                  <p className="text-muted-foreground">Featured Projects On GITHUB</p>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                    100%
                  </div>
                  <p className="text-muted-foreground">Open Source</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}