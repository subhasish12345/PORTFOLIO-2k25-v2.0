import React from 'react';
import { motion } from 'motion/react';
import { Code, Smartphone, Database, Settings, Palette, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const skillCategories = [
  {
    title: 'Web Development',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS'],
  },
  {
    title: 'Mobile Development',
    icon: Smartphone,
    color: 'from-green-500 to-emerald-500',
    skills: ['Android Studio', 'Java', 'Flutter', 'XML', ],
  },
  {
    title: 'Backend & Databases',
    icon: Database,
    color: 'from-purple-500 to-violet-500',
    skills: ['Firebase', 'Supabase', 'MongoDB','XAMPP',],
  },
  {
    title: 'Development Tools',
    icon: Settings,
    color: 'from-orange-500 to-red-500',
    skills: ['VS Code', 'Postman', 'GitHub', 'Windsurf', 'Cursor'],
  },
  {
    title: 'AI Tools',
    icon: Brain,
    color: 'from-pink-500 to-rose-500',
    skills: ['ChatGPT', 'Gemini Pro', 'Perplexity PRO', 'Copilot', 'Cursor AI','COPILOT',],
  },
  {
    title: 'Creative Tools',
    icon: Palette,
    color: 'from-indigo-500 to-purple-500',
    skills: ['RENDER','Canva', 'PixelCut', 'PhotoRoom', 'Figma'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Skills() {
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
            Skills & <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Technologies</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit spanning web development, mobile apps, AI integration, 
            and creative design to bring innovative ideas to life.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div key={category.title} variants={itemVariants}>
              <Card className="h-full bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <motion.div
                      className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <category.icon className="h-6 w-6" />
                    </motion.div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: index * 0.1 + skillIndex * 0.05,
                          duration: 0.3,
                        }}
                      >
                        <Badge 
                          variant="secondary"
                          className="bg-primary/10 hover:bg-primary/20 transition-colors duration-200 cursor-default"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Professional Development Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-primary/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">
                  Continuous Learning & Growth
                </h3>
                <p className="text-muted-foreground">
                  Always exploring new technologies and expanding my skill set through courses, 
                  certifications, and hands-on projects.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 rounded-xl bg-background/30 backdrop-blur-sm"
                >
                  <div className="text-3xl mb-3">🎓</div>
                  <h4 className="font-semibold mb-2">Formal Education</h4>
                  <p className="text-sm text-muted-foreground">
                    B.Tech CSE with strong fundamentals in computer science and engineering principles
                  </p>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 rounded-xl bg-background/30 backdrop-blur-sm"
                >
                  <div className="text-3xl mb-3">🚀</div>
                  <h4 className="font-semibold mb-2">Practical Experience</h4>
                  <p className="text-sm text-muted-foreground">
                    Multiple internships and real-world projects across different tech domains
                  </p>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 rounded-xl bg-background/30 backdrop-blur-sm"
                >
                  <div className="text-3xl mb-3">💡</div>
                  <h4 className="font-semibold mb-2">Innovation Focus</h4>
                  <p className="text-sm text-muted-foreground">
                    Competitive programming to stay at the cutting edge
                  </p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}