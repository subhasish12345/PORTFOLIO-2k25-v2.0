import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface FailureStory {
  id: string;
  title: string;
  when: string;
  what: string;
  lessons: string[];
  recovered: string;
}

export const failureStoriesData: FailureStory[] = [
  {
    id: 'pdf-parser',
    title: 'PDF Parser That Ate 12,000 Questions Incorrectly',
    when: 'April 2026',
    what:
      'Built an automated PDF parsing pipeline for the CDS Daily Practice App to extract 12,000+ questions. The regex logic misidentified answer boundaries, corrupted the entire question bank, and produced hundreds of malformed entries.',
    lessons: [
      'Never trust raw regex for complex document parsing without validation layers',
      'Implement a test set of known-good data before running bulk operations',
      'Build logging into every stage of a pipeline, not just the end result',
    ],
    recovered:
      'Switched to a hybrid approach — automated extraction with a manual admin dashboard for correction and bulk JSON uploads.',
  },
  {
    id: 'socket-sync',
    title: 'Socket.IO Sync Bug That Silently Broke Collaboration',
    when: 'April 2026',
    what:
      'In Droppy (real-time Kanban), a race condition in the room-join logic caused users to receive stale board state on reconnect. The bug was silent — no errors, just wrong data. Took two days to find.',
    lessons: [
      'Race conditions in async code are almost always silent failures',
      'Always emit current state snapshot on socket reconnect, not just diffs',
      'Write integration tests for real-time flows, not just unit tests for functions',
    ],
    recovered:
      'Added explicit state reconciliation on every reconnect event, with a server-side snapshot endpoint as the source of truth.',
  },
  {
    id: 'deploy-failure',
    title: 'The Render Deploy That Served Old Builds for 48 Hours',
    when: 'March 2026',
    what:
      'After deploying updates to the portfolio on Render, the old cached version kept being served. Spent 48 hours debugging locally before realizing the issue was Render caching the old dist folder.',
    lessons: [
      'Always verify the deployed environment, not just local builds',
      'Cache-busting is not optional for static deployments',
      'A working local build ≠ a working production deploy',
    ],
    recovered:
      'Added cache-control headers, forced a clean build, and set up a deployment checklist for future pushes.',
  },
];

export default function FailureStories() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [stories, setStories] = useState<FailureStory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const snap = await getDocs(collection(db, 'stories'));
        const data = snap.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          when: doc.data().idea ? doc.data().idea.replace('Happened in ', '').replace('.', '') : 'Unknown',
          what: doc.data().challenge,
          lessons: doc.data().lessons ? doc.data().lessons.split('\n').filter(Boolean) : [],
          recovered: doc.data().futureplan
        })) as FailureStory[];
        
        setStories(data);
      } catch (err) {
        console.error('Failed to fetch stories', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-black border-t border-[#27272a] flex justify-center items-center min-h-[30vh]">
        <p className="text-[#a1a1aa] animate-pulse">Loading stories...</p>
      </section>
    );
  }

  return (
    <section className="py-24 bg-black border-t border-[#27272a]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-mono text-xs text-[#a1a1aa] tracking-widest uppercase">Failure Stories</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Things That <span className="text-[#a1a1aa]">Broke</span>
          </h2>
          <p className="text-[#a1a1aa] mt-2 text-sm max-w-lg">
            Not every build goes right. These are the failures that taught me the most.
            Real engineering means learning from what broke.
          </p>
        </motion.div>

        {/* Stories */}
        <div className="space-y-3">
          {stories.map((story, idx) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="border border-[#27272a] rounded-lg overflow-hidden"
            >
              {/* Accordion Header */}
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#111] transition-colors"
                onClick={() => setExpanded(expanded === story.id ? null : story.id)}
              >
                <div>
                  <p className="text-white font-semibold text-sm">{story.title}</p>
                  <p className="text-[#52525b] text-xs font-mono mt-0.5">{story.when}</p>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-[#a1a1aa] flex-shrink-0 ml-4 transition-transform duration-300 ${
                    expanded === story.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Accordion Content */}
              <AnimatePresence initial={false}>
                {expanded === story.id && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-5 border-t border-[#27272a] pt-5">
                      {/* What happened */}
                      <div>
                        <p className="text-xs font-mono text-[#52525b] uppercase tracking-wider mb-2">What Happened</p>
                        <p className="text-[#a1a1aa] text-sm leading-relaxed">{story.what}</p>
                      </div>

                      {/* Lessons */}
                      <div>
                        <p className="text-xs font-mono text-[#52525b] uppercase tracking-wider mb-2">Lessons</p>
                        <ul className="space-y-2">
                          {story.lessons.map((lesson, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#27272a] text-xs mt-[3px]">—</span>
                              <span className="text-[#a1a1aa] text-sm">{lesson}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Recovery */}
                      <div>
                        <p className="text-xs font-mono text-[#52525b] uppercase tracking-wider mb-2">How I Recovered</p>
                        <p className="text-white text-sm leading-relaxed">{story.recovered}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
