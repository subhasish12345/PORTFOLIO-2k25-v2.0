import React, { useState } from 'react';
import { Routes, Route, NavLink, Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { FolderKanban, ScrollText, BookOpen, Clock, MessageSquare, LayoutDashboard, LogOut, DatabaseBackup } from 'lucide-react';
import AdminProjects from './admin/AdminProjects';
import AdminLogs from './admin/AdminLogs';
import AdminStories from './admin/AdminStories';
import AdminTimeline from './admin/AdminTimeline';
import AdminSuggestions from './admin/AdminSuggestions';
import AdminCertificates from './admin/AdminCertificates';
import AdminSkills from './admin/AdminSkills';

import { projectsData } from '../components/Projects';
import { timelineEventsData } from '../components/Timeline';
import { buildLogsData } from '../components/BuildLogs';
import { failureStoriesData } from '../components/FailureStories';
import { certificatesData } from '../components/Certificates';
import { skillCategoriesData } from '../components/Skills';

const navItems = [
  { to: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/skills', label: 'Skills', icon: LayoutDashboard }, // You can use a different icon if preferred
  { to: '/admin/certificates', label: 'Certificates', icon: BookOpen },
  { to: '/admin/logs', label: 'Build Logs', icon: ScrollText },
  { to: '/admin/stories', label: 'Stories', icon: BookOpen },
  { to: '/admin/timeline', label: 'Timeline', icon: Clock },
  { to: '/admin/suggestions', label: 'Suggestions', icon: MessageSquare },
];

function Overview() {
  const [migrating, setMigrating] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [migrationError, setMigrationError] = useState('');

  const handleMigrate = async () => {
    setMigrating(true);
    setMigrationStatus('idle');
    setMigrationError('');
    try {
      // Migrate Projects
      for (const p of projectsData) {
        await addDoc(collection(db, 'projects'), {
          title: p.title,
          description: p.description,
          image: p.image || '',
          category: p.category || 'Web Development',
          status: p.status || 'Completed',
          techStack: p.technologies.join(', '),
          github: p.links?.github || '',
          liveLink: p.links?.demo || '',
          featured: p.featured || false,
          story: '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      
      // Migrate Timeline
      for (const t of timelineEventsData) {
        await addDoc(collection(db, 'timeline'), {
          period: t.period,
          title: t.title,
          company: t.company,
          location: t.location,
          status: t.status,
          description: t.description,
          type: t.type,
          technologies: t.technologies?.join(', ') || '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }

      // Migrate Build Logs
      for (const l of buildLogsData) {
        await addDoc(collection(db, 'buildLogs'), {
          month: l.month,
          year: l.year,
          entries: l.entries.join('\n'),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }

      // Migrate Stories
      for (const s of failureStoriesData) {
        await addDoc(collection(db, 'stories'), {
          title: s.title,
          idea: `Happened in ${s.when}.`,
          challenge: s.what,
          lessons: s.lessons.join('\n'),
          futureplan: s.recovered,
          tags: 'Failure, Lesson',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }

      // Migrate Certificates
      for (const c of certificatesData) {
        await addDoc(collection(db, 'certificates'), {
          title: c.title,
          issuer: c.issuer,
          date: c.date,
          category: c.category,
          description: c.description || '',
          skills: c.skills.join(', '),
          verified: c.verified,
          featured: c.featured,
          image: c.image || '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }

      // Migrate Skills
      for (const sk of skillCategoriesData) {
        await addDoc(collection(db, 'skills'), {
          title: sk.title,
          icon: sk.icon?.render?.name || 'Code', // Just a fallback string since we can't store React components
          skills: sk.skills.join(', '),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      
      setMigrationStatus('success');
    } catch (err: any) {
      console.error(err);
      setMigrationStatus('error');
      setMigrationError(err.message || 'Unknown error occurred.');
    }
    setMigrating(false);
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-[#a1a1aa] text-sm">Welcome back. Use the sidebar to manage your Personal OS content.</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button 
            onClick={handleMigrate}
            disabled={migrating || migrationStatus === 'success'}
            className="flex items-center gap-2 px-4 py-2 bg-[#27272a] hover:bg-[#3f3f46] text-white text-sm rounded transition-colors disabled:opacity-50"
          >
            <DatabaseBackup className="h-4 w-4" />
            {migrating ? 'Migrating...' : migrationStatus === 'success' ? 'Data Seeded!' : 'Seed Data to Firebase'}
          </button>
          {migrationStatus === 'success' && (
            <p className="text-green-400 text-xs">Migration complete! Check the panels.</p>
          )}
          {migrationStatus === 'error' && (
            <p className="text-red-400 text-xs max-w-xs text-right">Error: {migrationError}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {navItems.slice(1).map(item => (
          <Link to={item.to} key={item.to} className="block border border-[#27272a] rounded-lg p-5 hover:border-[#52525b] transition-colors bg-[#0a0a0a] hover:bg-[#111]">
            <div className="flex items-center gap-3 mb-2">
              <item.icon className="h-4 w-4 text-[#a1a1aa]" />
              <h3 className="text-white font-semibold text-sm">{item.label}</h3>
            </div>
            <p className="text-[#52525b] text-xs">
              {item.label === 'Projects' && 'Add, edit and feature your portfolio projects with origin stories.'}
              {item.label === 'Skills' && 'Add or edit your skill categories and tools.'}
              {item.label === 'Certificates' && 'Add or edit your certifications and achievements.'}
              {item.label === 'Build Logs' && 'Log monthly engineering updates shown on the homepage timeline.'}
              {item.label === 'Stories' && 'Document the why, challenges, and lessons behind each build.'}
              {item.label === 'Timeline' && 'Manage your progression milestones from 2023 to now.'}
              {item.label === 'Suggestions' && 'Moderate visitor messages before they go public.'}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-10 p-5 bg-[#111] border border-[#27272a] rounded-lg">
        <p className="text-xs font-mono text-[#52525b] uppercase tracking-wider mb-1">Tip</p>
        <p className="text-[#a1a1aa] text-sm">
          Press <kbd className="bg-black border border-[#27272a] px-2 py-0.5 rounded text-white text-xs font-mono">Ctrl+Shift+A</kbd> anywhere on the public site to open this panel instantly.
        </p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black text-white flex" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar */}
      <div className="w-60 border-r border-[#27272a] flex flex-col flex-shrink-0">
        {/* Brand */}
        <div className="px-6 py-5 border-b border-[#27272a]">
          <p className="font-mono text-white font-bold tracking-widest text-sm">SN<span className="text-[#a1a1aa]">.dev</span></p>
          <p className="text-[10px] text-[#52525b] mt-0.5 font-mono">Personal OS</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'
                }`
              }
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-[#27272a]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded text-sm text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded text-sm text-[#52525b] hover:text-white transition-colors mt-0.5"
          >
            ← Back to site
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/dashboard" element={<Overview />} />
            <Route path="/projects" element={<AdminProjects />} />
            <Route path="/skills" element={<AdminSkills />} />
            <Route path="/certificates" element={<AdminCertificates />} />
            <Route path="/logs" element={<AdminLogs />} />
            <Route path="/stories" element={<AdminStories />} />
            <Route path="/timeline" element={<AdminTimeline />} />
            <Route path="/suggestions" element={<AdminSuggestions />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
