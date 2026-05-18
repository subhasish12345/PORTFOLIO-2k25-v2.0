import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Twitter, Send, CheckCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

const contactLinks = [
  { icon: Github, label: 'GitHub', value: '@subhasish12345', href: 'https://github.com/subhasish12345', color: 'text-white' },
  { icon: Linkedin, label: 'LinkedIn', value: 'Subhasish Nayak', href: 'https://www.linkedin.com/in/subhasish-nayak-67a257280/', color: 'text-white' },
  { icon: Twitter, label: 'X (Twitter)', value: '@Subhunew1Nayak', href: 'https://x.com/Subhunew1Nayak?t=etWteaHNxNcUim6I600csQ&s=09', color: 'text-white' },
  { icon: Instagram, label: 'Instagram', value: '@subhasish_nayak_', href: 'https://www.instagram.com/subhasish_nayak_?igsh=OXF2ODZscGc1dzRw', color: 'text-white' },
];

const infoItems = [
  { icon: Mail, label: 'Email', value: 'subahsishnayak38@gmail.com', href: 'mailto:subahsishnayak38@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 7750096113' },
  { icon: MapPin, label: 'Location', value: 'Bhubaneswar, Odisha, India' },
];

export default function Contact() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    setError('');
    try {
      await addDoc(collection(db, 'visitorSuggestions'), {
        name: name.trim() || 'Anonymous',
        message: message.trim(),
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setSent(true);
      setName('');
      setMessage('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <section className="py-24 bg-[#111] border-t border-[#27272a]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="font-mono text-xs text-[#a1a1aa] tracking-widest uppercase">Contact</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Let's build something.
          </h2>
          <p className="text-[#a1a1aa] mt-2 text-sm max-w-md">
            Open to internships, freelance projects, and collaboration.
            Reach out directly or leave a suggestion below.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Direct Contact */}
            <div className="space-y-3">
              {infoItems.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="p-2 border border-[#27272a] rounded">
                    <item.icon className="h-4 w-4 text-[#a1a1aa]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#52525b] font-mono uppercase tracking-wider">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-white hover:text-[#a1a1aa] transition-colors">{item.value}</a>
                    ) : (
                      <p className="text-sm text-white">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs font-mono text-[#52525b] uppercase tracking-wider mb-4">Find Me Online</p>
              <div className="grid grid-cols-2 gap-3">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 border border-[#27272a] rounded hover:border-[#52525b] transition-colors group"
                  >
                    <link.icon className="h-4 w-4 text-[#a1a1aa] group-hover:text-white transition-colors" />
                    <div>
                      <p className="text-xs text-white font-medium">{link.label}</p>
                      <p className="text-[10px] text-[#52525b]">{link.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="border border-[#27272a] rounded-lg p-5 space-y-3">
              <p className="text-xs font-mono text-[#52525b] uppercase tracking-wider">Availability</p>
              {[
                { label: 'Freelance / Contracts', status: 'Open', on: true },
                { label: 'Collaboration', status: 'Open', on: true },
                { label: 'Full-time (post graduation)', status: 'Interested', on: true },
                { label: 'Internship', status: 'Not available', on: false },
              ].map(a => (
                <div key={a.label} className="flex items-center justify-between">
                  <span className="text-sm text-[#a1a1aa]">{a.label}</span>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${a.on ? 'text-white border-white/20 bg-white/5' : 'text-[#52525b] border-[#27272a]'}`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Suggestion Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="border border-[#27272a] rounded-lg p-6">
              <p className="text-xs font-mono text-[#a1a1aa] uppercase tracking-wider mb-1">Leave a Suggestion</p>
              <p className="text-[#52525b] text-xs mb-6">
                Have feedback, ideas, or want to say something? I read every message.
                Your message goes to a moderated queue before appearing publicly.
              </p>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 gap-4"
                >
                  <CheckCircle className="h-10 w-10 text-white" />
                  <div className="text-center">
                    <p className="text-white font-semibold">Message received.</p>
                    <p className="text-[#a1a1aa] text-sm mt-1">I'll review it soon. Thank you.</p>
                  </div>
                  <button
                    onClick={() => setSent(false)}
                    className="text-xs text-[#52525b] hover:text-white transition-colors mt-2"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded">
                      {error}
                    </div>
                  )}
                  <div>
                    <label className="block text-xs text-[#a1a1aa] mb-1.5">Your Name (optional)</label>
                    <input
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Anonymous"
                      className="w-full bg-black border border-[#27272a] rounded px-4 py-2.5 text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#a1a1aa] mb-1.5">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="I noticed your portfolio is missing..."
                      className="w-full bg-black border border-[#27272a] rounded px-4 py-2.5 text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-white transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white text-black text-sm font-semibold py-2.5 rounded hover:bg-gray-100 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}