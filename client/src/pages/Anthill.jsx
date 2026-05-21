import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { COPY, C4I_DEMANDS } from "../utils/roachCopy";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Anthill() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: "", description: "", problemStatement: "", category: "Web", status: "Looking for team", 
    movementDemand: "", isMovementBuild: false
  });

  useEffect(() => {
    fetchProjects();
  }, [filter]);

  const fetchProjects = () => {
    setLoading(true);
    const url = filter === "Mine" 
      ? `${import.meta.env.VITE_API_URL}/projects?userFilter=${user._id}`
      : `${import.meta.env.VITE_API_URL}/projects`;

    axios.get(url)
      .then(res => setProjects(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/projects`, {
        ...formData,
        isMovementBuild: !!formData.movementDemand
      });
      toast.success(COPY.project_posted);
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      toast.error(err.response?.data?.message || COPY.error_generic);
    }
  };

  if (loading) return <div className="text-center py-20 font-mono">{COPY.loadingProjects}</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 border-b-2 border-roach-ink pb-4">
        <h1 className="text-4xl font-bold">The Anthill</h1>
        {user && (
          <button onClick={() => setShowForm(!showForm)} className="btn-primary w-full md:w-auto">
            {showForm ? "Cancel" : "Dig New Anthill"}
          </button>
        )}
      </div>

      <div className="flex gap-4 mb-6 font-mono text-sm">
        <button onClick={() => setFilter("All")} className={`font-bold pb-1 ${filter === "All" ? "border-b-2 border-roach-ink text-roach-ink" : "text-roach-muted"}`}>All Projects</button>
        {user && <button onClick={() => setFilter("Mine")} className={`font-bold pb-1 ${filter === "Mine" ? "border-b-2 border-roach-ink text-roach-ink" : "text-roach-muted"}`}>My Projects</button>}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card bg-roach-surface mb-8 space-y-4">
          <h2 className="font-bold text-xl mb-4">Post a Project</h2>
          <div>
            <label className="block text-sm font-bold">Title</label>
            <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="mt-1 w-full p-2 border-2 border-roach-ink rounded font-mono" />
          </div>
          <div>
            <label className="block text-sm font-bold">Description</label>
            <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="mt-1 w-full p-2 border-2 border-roach-ink rounded font-mono" />
          </div>
          <div>
            <label className="block text-sm font-bold">Problem Statement</label>
            <textarea required rows={2} value={formData.problemStatement} onChange={e => setFormData({...formData, problemStatement: e.target.value})} className="mt-1 w-full p-2 border-2 border-roach-ink rounded font-mono" />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-bold">Category</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="mt-1 w-full p-2 border-2 border-roach-ink rounded font-mono bg-white">
                <option>Web</option><option>Mobile</option><option>AI/ML</option><option>DevOps</option><option>Other</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-bold flex items-center gap-2">
                Alignment (Optional) <span className="text-xs font-normal text-roach-muted">+100 PTS</span>
              </label>
              <select value={formData.movementDemand} onChange={e => setFormData({...formData, movementDemand: e.target.value})} className="mt-1 w-full p-2 border-2 border-roach-ink rounded font-mono bg-white">
                <option value="">None (Standard Project)</option>
                {Object.entries(C4I_DEMANDS).map(([key, val]) => (
                  <option key={key} value={key}>{val.emoji} {val.label}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn-primary w-full mt-4">Post to Colony</button>
        </form>
      )}

      {projects.length === 0 ? (
        <div className="card text-center py-12">
          <p className="font-mono">{COPY.empty_projects}</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map(project => (
            <Link to={`/anthill/${project._id}`} key={project._id} className="card flex flex-col hover:bg-roach-surface">
              {project.isMovementBuild && (
                <div className="mb-2 inline-block self-start px-2 py-1 bg-roach-amber-light border-2 border-roach-ink text-xs font-bold rounded">
                  {C4I_DEMANDS[project.movementDemand]?.emoji} {C4I_DEMANDS[project.movementDemand]?.label}
                </div>
              )}
              <h3 className="font-bold text-xl mb-2 flex flex-col items-start gap-1">
                {project.title}
                {project.approvalStatus === "Pending" && (
                  <span className="text-xs bg-roach-coral-light text-roach-coral px-2 py-1 rounded font-normal whitespace-nowrap border border-roach-coral">Pending Approval 🕒</span>
                )}
                {project.approvalStatus === "Rejected" && (
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded font-normal whitespace-nowrap">Rejected ❌</span>
                )}
              </h3>
              
              {project.bornFromGrievance && (
                <div className="mb-4 bg-roach-coral-light border border-roach-coral p-3 rounded-none">
                  <span className="text-xs font-bold font-mono text-roach-coral uppercase tracking-wide block mb-1">Born From Spite ⚡</span>
                  <p className="font-['Playfair_Display'] italic text-sm text-roach-ink">"{project.originalGrievance}"</p>
                </div>
              )}

              <p className="text-roach-muted text-sm mb-4 line-clamp-2">{project.description}</p>
              <div className="mt-auto flex justify-between items-center text-xs font-mono font-bold">
                <span>By: {project.owner?.alias}</span>
                <span className="bg-roach-ink text-white px-2 py-1 rounded">{project.category}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}