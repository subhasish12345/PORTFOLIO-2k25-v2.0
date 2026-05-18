import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface TimelineItem {
  id: string;
  period: string;
  title: string;
  company: string;
  location: string;
  status: string;
  description: string;
  type: string;
  technologies: string;
  order?: number;
}

const empty = { period: '', title: '', company: '', location: '', status: 'Completed', description: '', type: 'Internship', technologies: '' };

export default function AdminTimeline() {
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const fetchItems = async () => {
    setFetching(true);
    const snap = await getDocs(collection(db, 'timeline'));
    const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as TimelineItem));
    
    // Sort by order ascending if available, else by period descending
    data.sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      return b.period.localeCompare(a.period);
    });
    
    setItems(data);
    setFetching(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newItems = [...items];
    const draggedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);
    
    setDraggedIndex(index);
    setItems(newItems);
  };

  const handleDragEnd = async () => {
    if (draggedIndex === null) return;
    setDraggedIndex(null);
    setLoading(true);
    try {
      const promises = items.map((item, idx) => {
        const itemDocRef = doc(db, 'timeline', item.id);
        return updateDoc(itemDocRef, { order: idx });
      });
      await Promise.all(promises);
    } catch (err) {
      console.error("Failed to update drag order", err);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await updateDoc(doc(db, 'timeline', editId), { ...form, updatedAt: serverTimestamp() });
      } else {
        await addDoc(collection(db, 'timeline'), { ...form, order: items.length, createdAt: serverTimestamp() });
      }
      setForm(empty);
      setEditId(null);
      await fetchItems();
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'timeline', id));
      await fetchItems();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  const typeColor: Record<string, string> = {
    'Internship': 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5',
    'Course': 'text-blue-400 border-blue-400/20 bg-blue-400/5',
    'Training': 'text-cyan-400 border-cyan-400/20 bg-cyan-400/5',
    'Education': 'text-purple-400 border-purple-400/20 bg-purple-400/5',
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Timeline</h1>
        <p className="text-[#a1a1aa] text-sm mt-1">Manage your progression timeline — milestones, projects, education.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-[#111] border border-[#27272a] rounded-lg p-6 space-y-4">
        <h2 className="text-sm font-mono text-[#a1a1aa] uppercase tracking-wider">{editId ? 'Edit Entry' : 'Add Timeline Entry'}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-[#a1a1aa] mb-1">Title *</label>
            <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="Data Analysis Trainee"
              className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-[#a1a1aa] mb-1">Company / Institution *</label>
            <input required value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
              placeholder="Qspiders"
              className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-[#a1a1aa] mb-1">Period *</label>
            <input required value={form.period} onChange={e => setForm(f => ({ ...f, period: e.target.value }))}
              placeholder="Dec 2025 - Present"
              className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-[#a1a1aa] mb-1">Location</label>
            <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
              placeholder="Onsite / Remote"
              className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-[#a1a1aa] mb-1">Type</label>
            <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
              className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors">
              <option value="Internship">Internship</option>
              <option value="Course">Course</option>
              <option value="Training">Training</option>
              <option value="Education">Education</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-[#a1a1aa] mb-1">Status</label>
            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
              className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors">
              <option value="Completed">Completed</option>
              <option value="Ongoing">Ongoing</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs text-[#a1a1aa] mb-1">Description</label>
          <textarea rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors resize-none" />
        </div>
        <div>
          <label className="block text-xs text-[#a1a1aa] mb-1">Technologies (comma-separated)</label>
          <input value={form.technologies} onChange={e => setForm(f => ({ ...f, technologies: e.target.value }))}
            placeholder="Python, Data Analysis"
            className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 ml-auto mt-2">
            {editId && (
              <button type="button" onClick={() => { setForm(empty); setEditId(null); }}
                className="text-sm text-[#a1a1aa] hover:text-white border border-[#27272a] px-3 py-1.5 rounded transition-colors">
                Cancel
              </button>
            )}
            <button type="submit" disabled={loading}
              className="px-5 py-2 bg-white text-black text-sm font-semibold rounded hover:bg-gray-100 transition-colors disabled:opacity-50 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {loading ? 'Saving...' : editId ? 'Update' : 'Add Entry'}
            </button>
          </div>
        </div>
      </form>

      {/* Timeline List */}
      {fetching ? (
        <p className="text-[#a1a1aa] text-sm">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-[#52525b] text-sm">No timeline entries yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div 
              key={item.id} 
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`border border-[#27272a] rounded-lg p-5 flex items-start justify-between gap-4 hover:border-[#52525b] transition-all bg-black cursor-grab active:cursor-grabbing ${
                draggedIndex === index ? 'opacity-45 border-dashed border-[#52525b] bg-[#111]' : ''
              }`}
            >
              <div className="flex items-center self-center text-[#52525b] hover:text-white cursor-grab mr-1">
                <GripVertical className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-white text-sm font-semibold">{item.period}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border capitalize ${typeColor[item.type] || 'text-white border-white/20'}`}>
                    {item.type}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border capitalize ${item.status === 'Ongoing' ? 'text-green-400 border-green-400/20' : 'text-[#a1a1aa] border-[#27272a]'}`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-white text-sm font-medium">{item.title} <span className="text-[#a1a1aa] font-normal">at {item.company}</span></p>
                {item.description && <p className="text-[#a1a1aa] text-xs mt-1">{item.description}</p>}
                {item.technologies && <p className="text-[#52525b] text-[10px] font-mono mt-2">Tech: {item.technologies}</p>}
              </div>
              <div className="flex gap-2 flex-shrink-0 self-center">
                <button onClick={() => { setEditId(item.id); setForm({ period: item.period, title: item.title, company: item.company, location: item.location, status: item.status, description: item.description, type: item.type, technologies: item.technologies || '' }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-xs px-3 py-1.5 border border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-white rounded transition-colors">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition-colors"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
