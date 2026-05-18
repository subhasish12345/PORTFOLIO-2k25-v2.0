import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Circle } from 'lucide-react';

const currentProject = {
  name: 'Portfolio Personal OS',
  tagline: 'Transforming a static portfolio into a living, admin-controlled engineering journal.',
  progress: 75,
  tasks: [
    { label: 'Minimal black & white redesign', done: true },
    { label: 'Hidden admin panel (Firebase Auth)', done: true },
    { label: 'Firestore-backed content system', done: false },
    { label: 'Build Logs & Story sections', done: false },
    { label: 'Visitor suggestion system', done: false },
  ],
  stack: ['React', 'Firebase', 'Firestore', 'GSAP', 'Framer Motion'],
};

export default function CurrentlyBuilding() {
  return (
    <section className="py-24 bg-black border-t border-[#27272a]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="font-mono text-xs text-[#a1a1aa] tracking-widest uppercase">Currently Building</span>
          <ArrowRight className="h-3 w-3 text-[#52525b]" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — Project Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                {currentProject.name}
              </h2>
              <p className="mt-3 text-[#a1a1aa] leading-relaxed">
                {currentProject.tagline}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-[#52525b] uppercase tracking-wider">Progress</span>
                <span className="text-xs font-mono text-white">{currentProject.progress}%</span>
              </div>
              <div className="h-px bg-[#27272a] w-full">
                <motion.div
                  className="h-px bg-white"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${currentProject.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                />
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {currentProject.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-3 py-1 border border-[#27272a] text-[#a1a1aa] rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — Task List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-3"
          >
            <p className="text-xs font-mono text-[#52525b] tracking-widest uppercase mb-4">Working On</p>
            {currentProject.tasks.map((task, i) => (
              <motion.div
                key={task.label}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-3"
              >
                <Circle
                  className={`h-2 w-2 flex-shrink-0 ${task.done ? 'fill-white text-white' : 'text-[#27272a]'}`}
                />
                <span className={`text-sm ${task.done ? 'text-[#52525b] line-through' : 'text-[#a1a1aa]'}`}>
                  {task.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
