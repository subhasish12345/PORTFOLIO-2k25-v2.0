import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface LogEntry {
  month: string;
  year: string;
  entries: string[];
}

export const buildLogsData: LogEntry[] = [
  {
    month: 'May',
    year: '2026',
    entries: [
      'Redesigned portfolio with minimal black & white aesthetic',
      'Added Firebase Auth + hidden admin panel (Ctrl+Shift+A)',
      'Replaced AnimatedBackground with cinematic grid overlay',
      'Restructured routing with React Router',
      'Added Currently Building, Build Logs, and Failure Stories sections',
    ],
  },
  {
    month: 'March',
    year: '2026',
    entries: [
      'Migrated portfolio to Vite + React + TypeScript',
      'Integrated GSAP for hero entrance animations',
      'Deployed to Render with custom domain setup',
      'Added PDF resume download functionality',
    ],
  },
  {
    month: 'January',
    year: '2026',
    entries: [
      'Built Droppy — real-time collaborative Kanban board',
      'Implemented Socket.IO for live multi-user sync',
      'Deployed backend on Render, frontend on Vercel',
    ],
  },
  {
    month: 'November',
    year: '2025',
    entries: [
      'Completed FakeShield AI — news credibility detection system',
      'Implemented NLP pipeline with Python + Streamlit',
      'Wrote full academic report with automated docx generation',
    ],
  },
];

export default function BuildLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const snap = await getDocs(collection(db, 'buildLogs'));
        const data = snap.docs.map(doc => ({
          month: doc.data().month,
          year: doc.data().year,
          entries: doc.data().entries ? doc.data().entries.split('\n') : []
        })) as LogEntry[];
        
        // Sorting roughly by year desc
        data.sort((a, b) => Number(b.year) - Number(a.year));
        
        setLogs(data);
      } catch (err) {
        console.error('Failed to fetch build logs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-[#111] border-t border-[#27272a] flex justify-center items-center min-h-[30vh]">
        <p className="text-[#a1a1aa] animate-pulse">Loading build logs...</p>
      </section>
    );
  }

  return (
    <section className="py-24 bg-[#111] border-t border-[#27272a]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-mono text-xs text-[#a1a1aa] tracking-widest uppercase">Build Logs</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Engineering Timeline
          </h2>
          <p className="text-[#a1a1aa] mt-2 text-sm">
            A living record of what I shipped, learned, and iterated on.
          </p>
        </motion.div>

        {/* Log Entries */}
        <div className="space-y-10 relative">
          {/* Vertical line */}
          <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-[#27272a] hidden md:block" />

          {logs.map((log, idx) => (
            <motion.div
              key={`${log.month}-${log.year}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="grid md:grid-cols-[7rem_1fr] gap-4 md:gap-8"
            >
              {/* Date */}
              <div className="flex md:flex-col items-center md:items-end gap-2 md:gap-0 md:pt-1">
                <span className="font-mono text-xs text-white font-semibold">{log.month}</span>
                <span className="font-mono text-xs text-[#52525b]">{log.year}</span>
                {/* Dot on timeline */}
                <div className="hidden md:flex absolute left-[5.2rem] w-[7px] h-[7px] rounded-full bg-white mt-1" />
              </div>

              {/* Entries */}
              <div className="space-y-2 pl-0 md:pl-4">
                {log.entries.map((entry, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[#27272a] mt-[5px] text-xs">—</span>
                    <span className="text-[#a1a1aa] text-sm leading-relaxed">{entry}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
