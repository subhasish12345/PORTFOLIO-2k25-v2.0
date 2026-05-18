import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Plus, Trash2 } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  idea: string;
  challenge: string;
  lessons: string;
  futureplan: string;
  tags: string;
}

const empty = { title: '', idea: '', challenge: '', lessons: '', futureplan: '', tags: '' };

export default function AdminStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchStories = async () => {
    setFetching(true);
    const snap = await getDocs(collection(db, 'stories'));
    setStories(snap.docs.map(d => ({ id: d.id, ...d.data() } as Story)));
    setFetching(false);
  };

  useEffect(() => { fetchStories(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await updateDoc(doc(db, 'stories', editId), { ...form, updatedAt: serverTimestamp() });
      } else {
        await addDoc(collection(db, 'stories'), { ...form, createdAt: serverTimestamp() });
      }
      setForm(empty);
      setEditId(null);
      await fetchStories();
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'stories', id));
      await fetchStories();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  const Field = ({ label, name, rows = 3, placeholder = '' }: { label: string; name: keyof typeof empty; rows?: number; placeholder?: string }) => (
    <div>
      <label className="block text-xs text-[#a1a1aa] mb-1">{label}</label>
      <textarea rows={rows} value={form[name]} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
        placeholder={placeholder}
        className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors resize-none" />
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Project Stories</h1>
        <p className="text-[#a1a1aa] text-sm mt-1">Document the why, what broke, and what you learned behind each build.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-[#111] border border-[#27272a] rounded-lg p-6 space-y-4">
        <h2 className="text-sm font-mono text-[#a1a1aa] uppercase tracking-wider">{editId ? 'Edit Story' : 'Add Project Story'}</h2>

        <div>
          <label className="block text-xs text-[#a1a1aa] mb-1">Title *</label>
          <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            placeholder="Droppy — Real-time Kanban"
            className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors" />
        </div>

        <Field label="Idea Origin — Why did you build it?" name="idea" placeholder="I noticed most student collaboration tools feel corporate and boring..." />
        <Field label="Challenge — What was hard?" name="challenge" placeholder="A race condition in the socket room-join logic..." />
        <Field label="Lessons — What did you learn?" name="lessons" placeholder="Never trust async state without explicit reconciliation..." />
        <Field label="Future Plan" name="futureplan" rows={2} placeholder="Add AI-based task prioritization..." />

        <div>
          <label className="block text-xs text-[#a1a1aa] mb-1">Tags (comma-separated)</label>
          <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
            placeholder="React, Socket.IO, PostgreSQL"
            className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors" />
        </div>

        <div className="flex items-center justify-end gap-3">
          {editId && (
            <button type="button" onClick={() => { setForm(empty); setEditId(null); }}
              className="text-sm text-[#a1a1aa] hover:text-white border border-[#27272a] px-3 py-1.5 rounded transition-colors">
              Cancel
            </button>
          )}
          <button type="submit" disabled={loading}
            className="px-5 py-2 bg-white text-black text-sm font-semibold rounded hover:bg-gray-100 transition-colors disabled:opacity-50 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {loading ? 'Saving...' : editId ? 'Update Story' : 'Add Story'}
          </button>
        </div>
      </form>

      {/* Stories List */}
      {fetching ? (
        <p className="text-[#a1a1aa] text-sm">Loading...</p>
      ) : stories.length === 0 ? (
        <p className="text-[#52525b] text-sm">No stories yet. Document your first project story above.</p>
      ) : (
        <div className="space-y-3">
          {stories.map(s => (
            <div key={s.id} className="border border-[#27272a] rounded-lg overflow-hidden hover:border-[#52525b] transition-colors">
              <div className="flex items-center justify-between px-5 py-4 cursor-pointer" onClick={() => setExpanded(expanded === s.id ? null : s.id)}>
                <div>
                  <p className="text-white font-semibold text-sm">{s.title}</p>
                  {s.tags && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {s.tags.split(',').map(t => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 border border-[#27272a] text-[#a1a1aa] rounded-full">{t.trim()}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0 ml-4">
                  <button onClick={e => { e.stopPropagation(); setEditId(s.id); setForm({ title: s.title, idea: s.idea, challenge: s.challenge, lessons: s.lessons, futureplan: s.futureplan, tags: s.tags }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-xs px-3 py-1.5 border border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-white rounded transition-colors">Edit</button>
                  <button onClick={e => { e.stopPropagation(); handleDelete(s.id); }} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition-colors"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>

              {expanded === s.id && (
                <div className="border-t border-[#27272a] px-5 py-4 space-y-4">
                  {[
                    { label: 'Idea Origin', value: s.idea },
                    { label: 'Challenge', value: s.challenge },
                    { label: 'Lessons', value: s.lessons },
                    { label: 'Future Plan', value: s.futureplan },
                  ].filter(f => f.value).map(f => (
                    <div key={f.label}>
                      <p className="text-xs font-mono text-[#52525b] uppercase tracking-wider mb-1">{f.label}</p>
                      <p className="text-[#a1a1aa] text-sm leading-relaxed">{f.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
