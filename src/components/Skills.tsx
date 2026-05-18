import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const skillCategoriesData = [
  {
    title: 'Web Development',
    icon: Icons.Code,
    color: 'from-blue-500 to-cyan-500',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS'],
  },
  {
    title: 'Mobile Development',
    icon: Icons.Smartphone,
    color: 'from-green-500 to-emerald-500',
    skills: ['Android Studio', 'Java', 'Flutter', 'XML',],
  },
  {
    title: 'Backend & Databases',
    icon: Icons.Database,
    color: 'from-purple-500 to-violet-500',
    skills: ['Firebase', 'Supabase', 'MongoDB', 'XAMPP', 'Python', 'Data Analysis'],
  },
  {
    title: 'Development Tools',
    icon: Icons.Settings,
    color: 'from-orange-500 to-red-500',
    skills: ['VS Code', 'Postman', 'GitHub', 'Windsurf', 'Cursor'],
  },
  {
    title: 'AI Tools',
    icon: Icons.Brain,
    color: 'from-pink-500 to-rose-500',
    skills: ['ChatGPT', 'Gemini Pro', 'Perplexity PRO', 'Copilot', 'Cursor AI', 'COPILOT',],
  },
  {
    title: 'Creative Tools',
    icon: Icons.Palette,
    color: 'from-indigo-500 to-purple-500',
    skills: ['RENDER', 'Canva', 'PixelCut', 'PhotoRoom', 'Figma'],
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
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const snap = await getDocs(collection(db, 'skills'));
        const data = snap.docs
          .filter(doc => doc.data().title !== 'AI Tools')
          .map((doc, index) => {
          const rawIcon = doc.data().icon || 'Code';
          // Find matching icon from lucide-react, fallback to Code
          const IconComponent = (Icons as any)[rawIcon] || Icons.Code;
          
          const colors = [
            'from-blue-500 to-cyan-500',
            'from-green-500 to-emerald-500',
            'from-purple-500 to-violet-500',
            'from-orange-500 to-red-500',
            'from-pink-500 to-rose-500',
            'from-indigo-500 to-purple-500'
          ];
          
          return {
            id: doc.id,
            title: doc.data().title,
            icon: IconComponent,
            color: colors[index % colors.length], // Cycle through colors
            skills: doc.data().skills ? doc.data().skills.split(',').map((s: string) => s.trim()) : []
          };
        });
        
        setSkills(data);
      } catch (err) {
        console.error('Failed to fetch skills', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) {
    return (
      <section className="py-20 flex justify-center items-center min-h-[50vh]">
        <p className="text-[#a1a1aa] animate-pulse">Loading skills...</p>
      </section>
    );
  }

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
          {skills.map((category, index) => (
            <motion.div key={category.id || category.title} variants={itemVariants}>
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

      </div>
    </section>
  );
}