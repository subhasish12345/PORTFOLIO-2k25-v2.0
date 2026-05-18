import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Trash2 } from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: string;
  description: string;
  skills: string;
  verified: boolean;
  featured: boolean;
  image: string;
}

const empty: Omit<Certificate, 'id'> = {
  title: '', issuer: '', date: '', category: 'Web Development', description: '', skills: '', verified: true, featured: false, image: ''
};

export default function AdminCertificates() {
  const [items, setItems] = useState<Certificate[]>([]);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState<Omit<Certificate, 'id'>>(empty);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setFetching(true);
    const snap = await getDocs(collection(db, 'certificates'));
    const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as Certificate));
    setItems(data);
    setFetching(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await updateDoc(doc(db, 'certificates', editId), { ...form, updatedAt: serverTimestamp() });
    } else {
      await addDoc(collection(db, 'certificates'), { ...form, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    }
    setForm(empty);
    setEditId(null);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'certificates', id));
      fetchItems();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  const handleEdit = (p: Certificate) => {
    setEditId(p.id);
    setForm({ 
      title: p.title, issuer: p.issuer, date: p.date, category: p.category, 
      description: p.description, skills: p.skills, verified: p.verified, 
      featured: p.featured, image: p.image 
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Manage Certificates</h1>
        <p className="text-[#a1a1aa] text-sm">Add or edit your certifications and achievements.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#111] border border-[#27272a] rounded-lg p-6 space-y-4">
        <h2 className="text-sm font-mono text-[#a1a1aa] uppercase tracking-wider">{editId ? 'Edit Certificate' : 'New Certificate'}</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-[#a1a1aa] mb-1">Title *</label>
            <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-[#a1a1aa] mb-1">Issuer *</label>
            <input required value={form.issuer} onChange={e => setForm(f => ({ ...f, issuer: e.target.value }))}
              className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-[#a1a1aa] mb-1">Date / Year</label>
            <input value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              placeholder="2025"
              className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-[#a1a1aa] mb-1">Category</label>
            <input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              placeholder="AI/ML"
              className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-[#a1a1aa] mb-1">Skills (comma-separated)</label>
            <input value={form.skills} onChange={e => setForm(f => ({ ...f, skills: e.target.value }))}
              placeholder="Python, LangChain"
              className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-[#a1a1aa] mb-1">Image URL</label>
            <input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
              placeholder="/CERTIFICATES/aws.jpg or https://..."
              className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors" />
          </div>
        </div>

        <div>
          <label className="block text-xs text-[#a1a1aa] mb-1">Description</label>
          <textarea rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors resize-none" />
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.verified} onChange={e => setForm(f => ({ ...f, verified: e.target.checked }))} className="accent-white" />
            <span className="text-sm text-white">Verified</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="accent-white" />
            <span className="text-sm text-white">Featured Star</span>
          </label>
        </div>

        <div className="flex items-center gap-4 pt-2">
          {editId && (
            <button type="button" onClick={() => { setForm(empty); setEditId(null); }}
              className="text-sm text-[#a1a1aa] hover:text-white border border-[#27272a] px-3 py-1.5 rounded transition-colors">
              Cancel
            </button>
          )}
          <button type="submit" className="bg-white text-black text-sm font-medium px-4 py-1.5 rounded hover:bg-gray-200 transition-colors ml-auto">
            {editId ? 'Save Changes' : 'Add Certificate'}
          </button>
        </div>
      </form>

      {fetching ? (
        <p className="text-[#a1a1aa] text-sm animate-pulse">Loading certificates...</p>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="border border-[#27272a] rounded-lg p-5 flex items-start justify-between gap-4 hover:border-[#52525b] transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white text-sm font-semibold">{item.title}</span>
                  {item.featured && <span className="text-[10px] bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-2 py-0.5 rounded-full">Featured</span>}
                  {item.verified && <span className="text-[10px] bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-0.5 rounded-full">Verified</span>}
                </div>
                <p className="text-[#a1a1aa] text-xs mb-2">{item.issuer} &bull; {item.date} &bull; {item.category}</p>
                {item.skills && <p className="text-[#52525b] text-[10px] font-mono">Skills: {item.skills}</p>}
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => handleEdit(item)} className="text-xs px-3 py-1.5 border border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-white rounded transition-colors">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition-colors"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-[#52525b] text-sm">No certificates yet.</p>}
        </div>
      )}
    </div>
  );
}
