'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Badge({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs
                     bg-cyan-500/15 text-cyan-300 border border-cyan-500/20">
      {label}
      {onRemove && (
        <button type="button" onClick={onRemove} className="hover:text-red-400 ml-0.5">×</button>
      )}
    </span>
  );
}

function Alert({ type, message }) {
  const colors = {
    success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    error: 'bg-red-500/10 border-red-500/30 text-red-400',
  };
  return (
    <div className={`px-4 py-3 rounded-xl border text-sm ${colors[type]}`}>
      {message}
    </div>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-space)' }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400
                       hover:text-white hover:bg-white/10 transition-all"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Experience Panel ─────────────────────────────────────────────────────────

function ExperiencePanel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [alert, setAlert] = useState(null);
  const [techInput, setTechInput] = useState('');

  const emptyForm = {
    title: '', company: '', location: '', period: '',
    type: 'Full-time', responsibilities: '',
  };
  const [form, setForm] = useState(emptyForm);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/experience');
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  function openNew() {
    setForm(emptyForm);
    setEditItem(null);
    setShowForm(true);
  }

  function openEdit(item) {
    setForm({
      title: item.title,
      company: item.company,
      location: item.location,
      period: item.period,
      type: item.type || 'Full-time',
      responsibilities: Array.isArray(item.responsibilities)
        ? item.responsibilities.join('\n')
        : item.responsibilities,
    });
    setEditItem(item);
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setAlert(null);
    const payload = {
      ...form,
      responsibilities: form.responsibilities.split('\n').map(r => r.trim()).filter(Boolean),
    };

    const url = editItem ? `/api/experience/${editItem.id}` : '/api/experience';
    const method = editItem ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setAlert({ type: 'success', message: editItem ? 'Updated!' : 'Added!' });
      setShowForm(false);
      fetchItems();
    } else {
      const err = await res.json();
      setAlert({ type: 'error', message: err.error || 'Failed' });
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this experience?')) return;
    const res = await fetch(`/api/experience/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setAlert({ type: 'success', message: 'Deleted successfully' });
      fetchItems();
    }
  }

  const typeColors = {
    'Full-time': 'bg-cyan-500/15 text-cyan-300',
    'Internship': 'bg-purple-500/15 text-purple-300',
    'Teaching': 'bg-amber-500/15 text-amber-300',
    'Training': 'bg-emerald-500/15 text-emerald-300',
    'Development': 'bg-blue-500/15 text-blue-300',
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-space)' }}>
          Experience
        </h2>
        <button
          onClick={openNew}
          id="add-experience-btn"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
                     bg-gradient-to-r from-cyan-500 to-purple-500 text-white
                     hover:from-cyan-400 hover:to-purple-400 transition-all hover:scale-105"
        >
          + Add Experience
        </button>
      </div>

      {alert && <Alert {...alert} />}

      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading…</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-slate-500">No experience entries yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="glass-card rounded-xl p-4 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[item.type] || 'bg-slate-500/20 text-slate-400'}`}>
                    {item.type}
                  </span>
                </div>
                <p className="text-cyan-400 text-xs mb-0.5">{item.company} · {item.location}</p>
                <p className="text-slate-500 text-xs">{item.period}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(item)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10
                             text-slate-300 hover:border-cyan-400/50 hover:text-cyan-400 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10
                             text-slate-400 hover:border-red-400/50 hover:text-red-400 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <Modal
          title={editItem ? 'Edit Experience' : 'Add Experience'}
          onClose={() => setShowForm(false)}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { id: 'exp-title', label: 'Job Title', key: 'title', placeholder: 'e.g. Data Scientist' },
              { id: 'exp-company', label: 'Company', key: 'company', placeholder: 'e.g. DataLab Nigeria' },
              { id: 'exp-location', label: 'Location', key: 'location', placeholder: 'e.g. Abuja, Nigeria' },
              { id: 'exp-period', label: 'Period', key: 'period', placeholder: 'e.g. Jan 2022 – Jun 2022' },
            ].map(({ id, label, key, placeholder }) => (
              <div key={key}>
                <label htmlFor={id} className="block text-xs font-medium text-slate-400 mb-1">{label}</label>
                <input
                  id={id}
                  type="text"
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  required
                  placeholder={placeholder}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-200
                             placeholder:text-slate-600 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all"
                />
              </div>
            ))}

            <div>
              <label htmlFor="exp-type" className="block text-xs font-medium text-slate-400 mb-1">Type</label>
              <select
                id="exp-type"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#0a1428] border border-white/10 text-sm text-slate-200
                           outline-none focus:border-cyan-400/50 transition-all"
              >
                {['Full-time', 'Internship', 'Teaching', 'Training', 'Development'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="exp-responsibilities" className="block text-xs font-medium text-slate-400 mb-1">
                Responsibilities <span className="text-slate-600">(one per line)</span>
              </label>
              <textarea
                id="exp-responsibilities"
                value={form.responsibilities}
                onChange={(e) => setForm({ ...form, responsibilities: e.target.value })}
                rows={5}
                placeholder="• Developed dashboards&#10;• Wrote SQL queries"
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-200
                           placeholder:text-slate-600 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all resize-y"
              />
            </div>

            {alert && <Alert {...alert} />}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold
                           bg-gradient-to-r from-cyan-500 to-purple-500 text-white
                           hover:from-cyan-400 hover:to-purple-400 transition-all"
              >
                {editItem ? 'Save Changes' : 'Add Experience'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-slate-400
                           hover:border-white/20 hover:text-white transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// ─── Projects Panel ───────────────────────────────────────────────────────────

function ProjectsPanel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [alert, setAlert] = useState(null);
  const [techInput, setTechInput] = useState('');

  const emptyForm = {
    title: '', description: '', tech: [], link: '', category: '',
  };
  const [form, setForm] = useState(emptyForm);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/projects');
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  function openNew() {
    setForm(emptyForm);
    setTechInput('');
    setEditItem(null);
    setShowForm(true);
  }

  function openEdit(item) {
    setForm({ ...item });
    setTechInput('');
    setEditItem(item);
    setShowForm(true);
  }

  function addTech() {
    const t = techInput.trim();
    if (t && !form.tech.includes(t)) {
      setForm({ ...form, tech: [...form.tech, t] });
    }
    setTechInput('');
  }

  function removeTech(t) {
    setForm({ ...form, tech: form.tech.filter((x) => x !== t) });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setAlert(null);
    const url = editItem ? `/api/projects/${editItem.id}` : '/api/projects';
    const method = editItem ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setAlert({ type: 'success', message: editItem ? 'Updated!' : 'Added!' });
      setShowForm(false);
      fetchItems();
    } else {
      const err = await res.json();
      setAlert({ type: 'error', message: err.error || 'Failed' });
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this project?')) return;
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setAlert({ type: 'success', message: 'Deleted successfully' });
      fetchItems();
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-space)' }}>
          Projects
        </h2>
        <button
          onClick={openNew}
          id="add-project-btn"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
                     bg-gradient-to-r from-purple-500 to-cyan-500 text-white
                     hover:from-purple-400 hover:to-cyan-400 transition-all hover:scale-105"
        >
          + Add Project
        </button>
      </div>

      {alert && <Alert {...alert} />}

      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading…</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-slate-500">No projects yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="glass-card rounded-xl p-4 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                  {item.category && (
                    <span className="px-2 py-0.5 rounded-full text-xs bg-purple-500/15 text-purple-300">
                      {item.category}
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-xs mb-2 line-clamp-2">{item.description}</p>
                <div className="flex flex-wrap gap-1">
                  {(item.tech || []).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(item)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10
                             text-slate-300 hover:border-purple-400/50 hover:text-purple-400 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10
                             text-slate-400 hover:border-red-400/50 hover:text-red-400 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <Modal
          title={editItem ? 'Edit Project' : 'Add Project'}
          onClose={() => setShowForm(false)}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { id: 'proj-title', label: 'Title', key: 'title', placeholder: 'Project name' },
              { id: 'proj-category', label: 'Category', key: 'category', placeholder: 'e.g. Machine Learning' },
              { id: 'proj-link', label: 'Link (GitHub/Live)', key: 'link', placeholder: 'https://github.com/...' },
            ].map(({ id, label, key, placeholder }) => (
              <div key={key}>
                <label htmlFor={id} className="block text-xs font-medium text-slate-400 mb-1">{label}</label>
                <input
                  id={id}
                  type="text"
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-200
                             placeholder:text-slate-600 outline-none focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/20 transition-all"
                />
              </div>
            ))}

            <div>
              <label htmlFor="proj-description" className="block text-xs font-medium text-slate-400 mb-1">Description</label>
              <textarea
                id="proj-description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                placeholder="Describe what this project does…"
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-200
                           placeholder:text-slate-600 outline-none focus:border-purple-400/50 transition-all resize-y"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Technologies</label>
              <div className="flex gap-2 mb-2">
                <input
                  id="proj-tech-input"
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }}
                  placeholder="Type a tech & press Enter"
                  className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-200
                             placeholder:text-slate-600 outline-none focus:border-purple-400/50 transition-all"
                />
                <button
                  type="button"
                  onClick={addTech}
                  className="px-3 py-2 rounded-lg text-sm bg-purple-500/20 text-purple-300 border border-purple-500/30
                             hover:bg-purple-500/30 transition-all"
                >
                  Add
                </button>
              </div>
              {form.tech.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {form.tech.map((t) => (
                    <Badge key={t} label={t} onRemove={() => removeTech(t)} />
                  ))}
                </div>
              )}
            </div>

            {alert && <Alert {...alert} />}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold
                           bg-gradient-to-r from-purple-500 to-cyan-500 text-white
                           hover:from-purple-400 hover:to-cyan-400 transition-all"
              >
                {editItem ? 'Save Changes' : 'Add Project'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-slate-400
                           hover:border-white/20 hover:text-white transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// ─── CV Panel ─────────────────────────────────────────────────────────────────

function CVPanel() {
  const [cvInfo, setCVInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [alert, setAlert] = useState(null);

  const fetchCVInfo = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/cv');
    const data = await res.json();
    setCVInfo(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchCVInfo(); }, [fetchCVInfo]);

  async function handleUpload(e) {
    e.preventDefault();
    setAlert(null);
    const file = e.target.cvFile.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('cv', file);

    try {
      const res = await fetch('/api/cv', { method: 'POST', body: formData });
      if (res.ok) {
        setAlert({ type: 'success', message: 'CV uploaded successfully!' });
        fetchCVInfo();
        e.target.reset();
      } else {
        const err = await res.json();
        setAlert({ type: 'error', message: err.error || 'Upload failed' });
      }
    } catch {
      setAlert({ type: 'error', message: 'Upload failed. Please try again.' });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-space)' }}>
        CV Management
      </h2>

      {/* Current CV */}
      <div className="glass-card rounded-xl p-5">
        <h3 className="text-sm font-medium text-slate-400 mb-3">Current CV</h3>
        {loading ? (
          <div className="text-slate-500 text-sm">Loading…</div>
        ) : cvInfo?.filename ? (
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-lg">
              📄
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{cvInfo.originalName}</p>
              <p className="text-xs text-slate-500">
                Uploaded {new Date(cvInfo.uploadedAt).toLocaleDateString('en-GB', {
                  day: 'numeric', month: 'short', year: 'numeric'
                })}
              </p>
            </div>
            <a
              href={`/uploads/${cvInfo.filename}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-cyan-400/30 text-cyan-400
                         hover:bg-cyan-400/10 transition-all"
            >
              Preview
            </a>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-slate-500 text-sm">
            <span className="text-2xl">📭</span>
            No CV uploaded yet. Use the form below to upload one.
          </div>
        )}
      </div>

      {/* Upload Form */}
      <div className="glass-card rounded-xl p-5">
        <h3 className="text-sm font-medium text-slate-400 mb-4">
          {cvInfo?.filename ? 'Replace CV' : 'Upload CV'}
        </h3>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label htmlFor="cvFile" className="block text-xs font-medium text-slate-400 mb-2">
              Select File <span className="text-slate-600">(PDF or Word document)</span>
            </label>
            <input
              id="cvFile"
              name="cvFile"
              type="file"
              accept=".pdf,.doc,.docx"
              required
              className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0 file:text-sm file:font-medium
                         file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30
                         file:cursor-pointer file:transition-all"
            />
          </div>

          {alert && <Alert {...alert} />}

          <button
            type="submit"
            id="upload-cv-btn"
            disabled={uploading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                       bg-gradient-to-r from-cyan-500 to-purple-500 text-white
                       hover:from-cyan-400 hover:to-purple-400 transition-all
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? '⏳ Uploading…' : '⬆ Upload CV'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('experience');
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/admin/login');
    router.refresh();
  }

  const tabs = [
    { id: 'experience', label: '💼 Experience', component: ExperiencePanel },
    { id: 'projects', label: '🚀 Projects', component: ProjectsPanel },
    { id: 'cv', label: '📄 CV', component: CVPanel },
  ];

  const ActiveComponent = tabs.find((t) => t.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-[#03060f] text-slate-200">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 glass-card border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold gradient-text" style={{ fontFamily: 'var(--font-space)' }}>
              Admin Dashboard
            </h1>
            <p className="text-xs text-slate-500">Manage your portfolio content</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 text-slate-400
                         hover:border-cyan-400/30 hover:text-cyan-400 transition-all"
            >
              View Site →
            </a>
            <button
              onClick={handleLogout}
              id="logout-btn"
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-red-400/20 text-red-400
                         hover:bg-red-400/10 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 glass-card rounded-xl p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Panel */}
        {ActiveComponent && <ActiveComponent />}
      </main>
    </div>
  );
}
