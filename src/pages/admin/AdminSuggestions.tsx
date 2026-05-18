import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Plus, Trash2 } from 'lucide-react';

interface Suggestion {
  id: string;
  name: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: any;
}

export default function AdminSuggestions() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [fetching, setFetching] = useState(true);

  const fetchSuggestions = async () => {
    setFetching(true);
    const snap = await getDocs(collection(db, 'visitorSuggestions'));
    setSuggestions(snap.docs.map(d => ({ id: d.id, ...d.data() } as Suggestion)));
    setFetching(false);
  };

  useEffect(() => { fetchSuggestions(); }, []);

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    await updateDoc(doc(db, 'visitorSuggestions', id), { status });
    await fetchSuggestions();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this suggestion?')) return;
    await deleteDoc(doc(db, 'visitorSuggestions', id));
    await fetchSuggestions();
  };

  const filtered = filter === 'all' ? suggestions : suggestions.filter(s => s.status === filter);

  const counts = {
    all: suggestions.length,
    pending: suggestions.filter(s => s.status === 'pending').length,
    approved: suggestions.filter(s => s.status === 'approved').length,
    rejected: suggestions.filter(s => s.status === 'rejected').length,
  };

  const statusColor = (status: string) => {
    if (status === 'approved') return 'text-green-400 border-green-400/30 bg-green-400/10';
    if (status === 'rejected') return 'text-red-400 border-red-400/30 bg-red-400/10';
    return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Visitor Suggestions</h1>
        <p className="text-[#a1a1aa] text-sm mt-1">Moderate messages from your site visitors before they go public.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {(['all', 'pending', 'approved', 'rejected'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`p-4 border rounded-lg text-left transition-colors ${filter === f ? 'border-white' : 'border-[#27272a] hover:border-[#52525b]'}`}>
            <p className="text-2xl font-bold text-white">{counts[f]}</p>
            <p className="text-xs text-[#a1a1aa] capitalize mt-1">{f}</p>
          </button>
        ))}
      </div>

      {/* Suggestion List */}
      {fetching ? (
        <p className="text-[#a1a1aa] text-sm">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-[#52525b] text-sm">No {filter === 'all' ? '' : filter} suggestions yet.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map(s => (
            <div key={s.id} className="border border-[#27272a] rounded-lg p-5 hover:border-[#52525b] transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-semibold text-white text-sm">{s.name || 'Anonymous'}</p>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border capitalize ${statusColor(s.status)}`}>
                      {s.status}
                    </span>
                  </div>
                  <p className="text-[#a1a1aa] text-sm leading-relaxed">{s.message}</p>
                  {s.createdAt?.toDate && (
                    <p className="text-[10px] text-[#52525b] font-mono mt-2">{s.createdAt.toDate().toLocaleDateString()}</p>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0 mt-1">
                  {s.status !== 'approved' && (
                    <button onClick={() => updateStatus(s.id, 'approved')}
                      className="text-xs px-3 py-1.5 border border-green-500/30 text-green-400 hover:bg-green-500/10 rounded transition-colors">
                      Approve
                    </button>
                  )}
                  {s.status !== 'rejected' && (
                    <button onClick={() => updateStatus(s.id, 'rejected')}
                      className="text-xs px-3 py-1.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded transition-colors">
                      Reject
                    </button>
                  )}
                  <button onClick={() => handleDelete(s.id)} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
