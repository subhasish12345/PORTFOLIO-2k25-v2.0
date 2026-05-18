import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Plus, Trash2 } from 'lucide-react';

interface LogEntry {
  id: string;
  month: string;
  year: string;
  entries: string;
}

const empty = { month: '', year: new Date().getFullYear().toString(), entries: '' };

export default function AdminLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchLogs = async () => {
    setFetching(true);
    const snap = await getDocs(collection(db, 'buildLogs'));
    setLogs(snap.docs.map(d => ({ id: d.id, ...d.data() } as LogEntry)));
    setFetching(false);
  };

  useEffect(() => { fetchLogs(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await updateDoc(doc(db, 'buildLogs', editId), { ...form, updatedAt: serverTimestamp() });
      } else {
        await addDoc(collection(db, 'buildLogs'), { ...form, createdAt: serverTimestamp() });
      }
      setForm(empty);
      setEditId(null);
      await fetchLogs();
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'buildLogs', id));
      await fetchLogs();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Build Logs</h1>
        <p className="text-[#a1a1aa] text-sm mt-1">Add monthly engineering journal entries shown on your homepage.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-[#111] border border-[#27272a] rounded-lg p-6 space-y-4">
        <h2 className="text-sm font-mono text-[#a1a1aa] uppercase tracking-wider">{editId ? 'Edit Log Entry' : 'Add Log Entry'}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-[#a1a1aa] mb-1">Month *</label>
            <select required value={form.month} onChange={e => setForm(f => ({ ...f, month: e.target.value }))}
              className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors">
              <option value="">Select month</option>
              {months.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-[#a1a1aa] mb-1">Year *</label>
            <input required value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
              className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors" />
          </div>
        </div>
        <div>
          <label className="block text-xs text-[#a1a1aa] mb-1">Entries (one per line) *</label>
          <textarea required rows={5} value={form.entries} onChange={e => setForm(f => ({ ...f, entries: e.target.value }))}
            placeholder={"Redesigned portfolio with minimal B&W aesthetic\nAdded Firebase Auth + hidden admin panel\nDeployed to production"}
            className="w-full bg-black border border-[#27272a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors resize-none font-mono" />
          <p className="text-[10px] text-[#52525b] mt-1">Each line becomes a separate bullet point in the Build Logs section.</p>
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
            {loading ? 'Saving...' : editId ? 'Update Log' : 'Add Log'}
          </button>
        </div>
      </form>

      {/* Log List */}
      {fetching ? (
        <p className="text-[#a1a1aa] text-sm">Loading...</p>
      ) : logs.length === 0 ? (
        <p className="text-[#52525b] text-sm">No log entries yet.</p>
      ) : (
        <div className="space-y-3">
          {logs.map(log => (
            <div key={log.id} className="border border-[#27272a] rounded-lg p-5 hover:border-[#52525b] transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-mono text-white text-sm font-semibold">{log.month} {log.year}</p>
                  <ul className="mt-2 space-y-1">
                    {log.entries.split('\n').filter(Boolean).map((e, i) => (
                      <li key={i} className="text-[#a1a1aa] text-xs flex items-start gap-2">
                        <span className="text-[#27272a]">—</span>{e}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => { setEditId(log.id); setForm({ month: log.month, year: log.year, entries: log.entries }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-xs px-3 py-1.5 border border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-white rounded transition-colors">Edit</button>
                  <button onClick={() => handleDelete(log.id)} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition-colors"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
