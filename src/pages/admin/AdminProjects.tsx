import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Plus, Trash2, ExternalLink, Github, Star } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string;
  github: string;
  liveLink: string;
  featured: boolean;
  story: string;
  image: string;
  category: string;
  status: string;
}

const empty: Omit<Project, 'id'> = {
  title: '', description: '', techStack: '', github: '', liveLink: '', featured: false, story: '', image: '', category: 'Web Development', status: 'Completed'
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchProjects = async () => {
    setFetching(true);
    const snap = await getDocs(collection(db, 'projects'));
    setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() } as Project)));
    setFetching(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await updateDoc(doc(db, 'projects', editId), { ...form, updatedAt: serverTimestamp() });
      } else {
        await addDoc(collection(db, 'projects'), { ...form, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
      }
      setForm(empty);
      setEditId(null);
      await fetchProjects();
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'projects', id));
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  const handleEdit = (p: Project) => {
    setEditId(p.id);
    setForm({ title: p.title, description: p.description, techStack: p.techStack, github: p.github, liveLink: p.liveLink, featured: p.featured, story: p.story, image: p.image || '', category: p.category || 'Web Development', status: p.status || 'Completed' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-[#a1a1aa] text-sm mt-1">Manage your portfolio projects and their stories.</p>
        </div>
        {editId && (
          <button onClick={() => { setForm(empty); setEditId(null); }} className="text-sm text-[#a1a1aa] hover:text-white border border-[#27272a] px-3 py-1.5 rounded transition-colors">
            Cancel Edit
          </button>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-[#111] border border-[#27272a] rounded-lg p-6 space-y-4">
        <h2 className="text-sm font-mono text-[#a1a1aa] uppercase tracking-wider">{editId ? 'Edit Project' : 'Add New Project'}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-[#a1a1aa] mb-1">Title *</label>
            <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-[#a1a1aa] mb-1">Image URL</label>
            <input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
              placeholder="https://..."
              className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-[#a1a1aa] mb-1">Category</label>
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors">
              <option value="Web Development">Web Development</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Desktop Application">Desktop Application</option>
              <option value="Full Stack">Full Stack</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-[#a1a1aa] mb-1">Status</label>
            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
              className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors">
              <option value="Completed">Completed</option>
              <option value="In Development">In Development</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-[#a1a1aa] mb-1">Tech Stack (comma-separated)</label>
            <input value={form.techStack} onChange={e => setForm(f => ({ ...f, techStack: e.target.value }))}
              placeholder="React, Firebase, GSAP"
              className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-[#a1a1aa] mb-1">GitHub URL</label>
            <input type="url" value={form.github} onChange={e => setForm(f => ({ ...f, github: e.target.value }))}
              className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs text-[#a1a1aa] mb-1">Live Link</label>
            <input type="url" value={form.liveLink} onChange={e => setForm(f => ({ ...f, liveLink: e.target.value }))}
              className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors" />
          </div>
        </div>
        <div>
          <label className="block text-xs text-[#a1a1aa] mb-1">Description *</label>
          <textarea required rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors resize-none" />
        </div>
        <div>
          <label className="block text-xs text-[#a1a1aa] mb-1">Origin Story (Why you built it, what failed, what you learned)</label>
          <textarea rows={4} value={form.story} onChange={e => setForm(f => ({ ...f, story: e.target.value }))}
            placeholder="This project started when I noticed..."
            className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors resize-none" />
        </div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
              className="w-4 h-4 accent-white" />
            <span className="text-sm text-[#a1a1aa]">Featured project</span>
          </label>
          <button type="submit" disabled={loading}
            className="ml-auto px-5 py-2 bg-white text-black text-sm font-semibold rounded hover:bg-gray-100 transition-colors disabled:opacity-50 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {loading ? 'Saving...' : editId ? 'Update Project' : 'Add Project'}
          </button>
        </div>
      </form>

      {/* Project List */}
      {fetching ? (
        <p className="text-[#a1a1aa] text-sm">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-[#52525b] text-sm">No projects yet. Add your first one above.</p>
      ) : (
        <div className="space-y-3">
          {projects.map(p => (
            <div key={p.id} className="border border-[#27272a] rounded-lg p-5 flex items-start justify-between gap-4 hover:border-[#52525b] transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-semibold text-sm">{p.title}</h3>
                  {p.featured && <Star className="h-3 w-3 text-white fill-white" />}
                </div>
                <p className="text-[#a1a1aa] text-xs mt-1 line-clamp-2">{p.description}</p>
                {p.techStack && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {p.techStack.split(',').map(t => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 border border-[#27272a] text-[#a1a1aa] rounded-full">{t.trim()}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="p-1.5 text-[#a1a1aa] hover:text-white transition-colors"><Github className="h-4 w-4" /></a>}
                {p.liveLink && <a href={p.liveLink} target="_blank" rel="noopener noreferrer" className="p-1.5 text-[#a1a1aa] hover:text-white transition-colors"><ExternalLink className="h-4 w-4" /></a>}
                <button onClick={() => handleEdit(p)} className="text-xs px-3 py-1.5 border border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-white rounded transition-colors">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition-colors"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
