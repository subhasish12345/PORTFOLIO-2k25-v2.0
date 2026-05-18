import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Trash2 } from 'lucide-react';

interface SkillCategory {
  id: string;
  title: string;
  icon: string; // Storing the name of the icon or just keeping it simple
  skills: string; // Comma separated
}

const empty: Omit<SkillCategory, 'id'> = {
  title: '', icon: 'Code', skills: ''
};

export default function AdminSkills() {
  const [items, setItems] = useState<SkillCategory[]>([]);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState<Omit<SkillCategory, 'id'>>(empty);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setFetching(true);
    const snap = await getDocs(collection(db, 'skills'));
    const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as SkillCategory));
    setItems(data);
    setFetching(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await updateDoc(doc(db, 'skills', editId), { ...form, updatedAt: serverTimestamp() });
    } else {
      await addDoc(collection(db, 'skills'), { ...form, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    }
    setForm(empty);
    setEditId(null);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'skills', id));
      fetchItems();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  const handleEdit = (p: SkillCategory) => {
    setEditId(p.id);
    setForm({ title: p.title, icon: p.icon || 'Code', skills: p.skills });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Manage Skills</h1>
        <p className="text-[#a1a1aa] text-sm">Add or edit your skill categories.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#111] border border-[#27272a] rounded-lg p-6 space-y-4">
        <h2 className="text-sm font-mono text-[#a1a1aa] uppercase tracking-wider">{editId ? 'Edit Skill Category' : 'New Skill Category'}</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-[#a1a1aa] mb-1">Category Title *</label>
            <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="Web Development"
              className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-[#a1a1aa] mb-1">Icon Name</label>
            <input value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}
              placeholder="Code, Smartphone, Database..."
              className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors" />
          </div>
        </div>

        <div>
          <label className="block text-xs text-[#a1a1aa] mb-1">Skills (comma-separated)</label>
          <textarea rows={3} value={form.skills} onChange={e => setForm(f => ({ ...f, skills: e.target.value }))}
            placeholder="HTML, CSS, React, TypeScript..."
            className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors resize-none" />
        </div>

        <div className="flex items-center gap-4 pt-2">
          {editId && (
            <button type="button" onClick={() => { setForm(empty); setEditId(null); }}
              className="text-sm text-[#a1a1aa] hover:text-white border border-[#27272a] px-3 py-1.5 rounded transition-colors">
              Cancel
            </button>
          )}
          <button type="submit" className="bg-white text-black text-sm font-medium px-4 py-1.5 rounded hover:bg-gray-200 transition-colors ml-auto">
            {editId ? 'Save Changes' : 'Add Category'}
          </button>
        </div>
      </form>

      {fetching ? (
        <p className="text-[#a1a1aa] text-sm animate-pulse">Loading skills...</p>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="border border-[#27272a] rounded-lg p-5 flex items-start justify-between gap-4 hover:border-[#52525b] transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white text-sm font-semibold">{item.title}</span>
                  <span className="text-[10px] bg-white/5 text-[#a1a1aa] border border-white/10 px-2 py-0.5 rounded-full font-mono">{item.icon}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {item.skills.split(',').map(s => s.trim()).filter(Boolean).map((skill, i) => (
                    <span key={i} className="text-[10px] bg-black text-[#a1a1aa] border border-[#27272a] px-2 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => handleEdit(item)} className="text-xs px-3 py-1.5 border border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-white rounded transition-colors">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition-colors"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-[#52525b] text-sm">No skill categories yet.</p>}
        </div>
      )}
    </div>
  );
}
