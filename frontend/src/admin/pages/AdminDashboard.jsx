import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const blankProject = {
  title: "",
  description: "",
  techStack: "",
  githubLink: "",
  liveLink: "",
  image: "",
  featured: false,
  type: "",
  category: "Full Stack",
};

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState(blankProject);
  const [editingId, setEditingId] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [certificate, setCertificate] = useState({ title: "", issuer: "", date: "", image: "", link: "" });

  const load = async () => {
    const [projectsRes, resumeRes] = await Promise.all([api.get("/projects"), api.get("/resume")]);
    setProjects(projectsRes.data);
    setResumeUrl(resumeRes.data?.fileUrl || "");
  };

  useEffect(() => { load(); }, []);

  const submitProject = async (e) => {
    e.preventDefault();
    const payload = { ...projectForm, techStack: projectForm.techStack.split(",").map((t) => t.trim()).filter(Boolean) };
    if (editingId) await api.put(`/projects/${editingId}`, payload);
    else await api.post("/projects", payload);
    setProjectForm(blankProject);
    setEditingId("");
    load();
  };

  return (
    <div className="min-h-screen bg-base p-6 text-white">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button className="btn-secondary" onClick={logout}>Logout</button>
        </div>

        <section className="card">
          <h2 className="mb-3 text-xl">Add / Edit Project</h2>
          <form onSubmit={submitProject} className="grid gap-2 md:grid-cols-2">
            <input className="input" placeholder="Title" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} required />
            <input className="input" placeholder="Type" value={projectForm.type} onChange={(e) => setProjectForm({ ...projectForm, type: e.target.value })} />
            <input className="input md:col-span-2" placeholder="Description" value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} required />
            <input className="input md:col-span-2" placeholder="Tech stack (comma separated)" value={projectForm.techStack} onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })} />
            <input className="input" placeholder="GitHub URL" value={projectForm.githubLink} onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })} />
            <input className="input" placeholder="Live URL" value={projectForm.liveLink} onChange={(e) => setProjectForm({ ...projectForm, liveLink: e.target.value })} />
            <input className="input" placeholder="Image URL (e.g. /project-logos/gurukul-logo.png)" value={projectForm.image} onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })} />
            <select
              className="input"
              value={projectForm.category}
              onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
            >
              <option value="Full Stack">Full Stack</option>
              <option value="UI/UX">UI/UX</option>
              <option value="Machine Learning">Machine Learning</option>
            </select>
            <label className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm">
              <input
                type="checkbox"
                checked={projectForm.featured}
                onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
              />
              Featured project
            </label>
            <button className="btn-primary md:col-span-2">{editingId ? "Update" : "Add"} Project</button>
          </form>
        </section>

        <section className="card">
          <h2 className="mb-3 text-xl">Manage Projects</h2>
          <div className="space-y-2">
            {projects.map((p) => (
              <div key={p._id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/10 p-3">
                <p>{p.title} <span className="text-xs text-cyan-300">({p.category || "Full Stack"}) {p.featured ? "• Featured" : ""}</span></p>
                <div className="flex gap-2">
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      setEditingId(p._id);
                      setProjectForm({
                        ...p,
                        techStack: (p.techStack || []).join(", "),
                        category: p.category || "Full Stack",
                        featured: Boolean(p.featured),
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button className="btn-secondary" onClick={async () => { await api.delete(`/projects/${p._id}`); load(); }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <h2 className="mb-3 text-xl">Resume URL</h2>
          <div className="flex gap-2">
            <input className="input flex-1" value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)} />
            <button className="btn-primary" onClick={async () => api.post("/resume", { fileUrl: resumeUrl })}>Save</button>
          </div>
        </section>

        <section className="card">
          <h2 className="mb-3 text-xl">Add Certificate</h2>
          <div className="grid gap-2 md:grid-cols-2">
            <input className="input" placeholder="Title" value={certificate.title} onChange={(e) => setCertificate({ ...certificate, title: e.target.value })} />
            <input className="input" placeholder="Issuer" value={certificate.issuer} onChange={(e) => setCertificate({ ...certificate, issuer: e.target.value })} />
            <input className="input" placeholder="Date" value={certificate.date} onChange={(e) => setCertificate({ ...certificate, date: e.target.value })} />
            <input className="input" placeholder="Image URL" value={certificate.image} onChange={(e) => setCertificate({ ...certificate, image: e.target.value })} />
            <input className="input md:col-span-2" placeholder="Certificate URL" value={certificate.link} onChange={(e) => setCertificate({ ...certificate, link: e.target.value })} />
            <button className="btn-primary md:col-span-2" onClick={async () => { await api.post("/certificates", certificate); setCertificate({ title: "", issuer: "", date: "", image: "", link: "" }); }}>Add Certificate</button>
          </div>
        </section>
      </div>
    </div>
  );
}
