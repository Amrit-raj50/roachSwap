import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

export default function AdminPanel() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("Projects"); // "Projects" or "Scraps"
  const [projects, setProjects] = useState([]);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === "admin") {
      fetchData();
    }
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "Projects") {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/projects/pending`);
        setProjects(res.data);
      } else {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/opensource/pending`);
        setRepos(res.data);
      }
    } catch (error) {
      toast.error("Failed to fetch pending items");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (type, id, action) => {
    try {
      const endpoint = type === "project" ? "projects" : "opensource";
      await axios.put(`${import.meta.env.VITE_API_URL}/${endpoint}/${id}/${action}`);
      toast.success(`${type} ${action}d successfully`);
      fetchData(); // refresh list
    } catch (error) {
      toast.error(`Failed to ${action} ${type}`);
    }
  };

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8 border-b-2 border-roach-ink pb-4">
        <h1 className="text-4xl font-bold mb-2">Moderation Queue</h1>
        <p className="font-mono text-roach-muted">Approve or reject submissions to maintain colony quality.</p>
      </div>

      <div className="flex gap-4 mb-6 font-mono text-sm">
        <button onClick={() => setActiveTab("Projects")} className={`font-bold pb-1 ${activeTab === "Projects" ? "border-b-2 border-roach-ink text-roach-ink" : "text-roach-muted"}`}>Pending Projects</button>
        <button onClick={() => setActiveTab("Scraps")} className={`font-bold pb-1 ${activeTab === "Scraps" ? "border-b-2 border-roach-ink text-roach-ink" : "text-roach-muted"}`}>Pending Repos</button>
      </div>

      {loading ? (
        <div className="text-center py-20 font-mono">Loading pending items...</div>
      ) : activeTab === "Projects" ? (
        projects.length === 0 ? <p className="font-mono text-roach-muted">No pending projects.</p> :
        <div className="space-y-4">
          {projects.map(p => (
            <div key={p._id} className="card flex flex-col md:flex-row justify-between items-start md:items-center p-4">
              <div>
                <h3 className="font-bold text-xl">{p.title} <span className="text-xs bg-roach-purple-light px-2 rounded ml-2">{p.category}</span></h3>
                <p className="text-sm font-mono text-roach-muted mb-2">By: {p.owner?.alias}</p>
                <p className="text-sm line-clamp-2 max-w-2xl">{p.description}</p>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <button onClick={() => handleAction("project", p._id, "approve")} className="btn-primary bg-roach-green hover:bg-green-700">Approve</button>
                <button onClick={() => handleAction("project", p._id, "reject")} className="btn-secondary text-roach-coral border-roach-coral hover:bg-roach-coral hover:text-white">Reject</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        repos.length === 0 ? <p className="font-mono text-roach-muted">No pending repositories.</p> :
        <div className="space-y-4">
          {repos.map(r => (
            <div key={r._id} className="card flex flex-col md:flex-row justify-between items-start md:items-center p-4">
              <div>
                <h3 className="font-bold text-xl">{r.repoName} <a href={r.repoUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-500 underline ml-2">Link</a></h3>
                <p className="text-sm font-mono text-roach-muted mb-2">By: {r.postedBy?.alias}</p>
                <p className="text-sm line-clamp-2 max-w-2xl">{r.description}</p>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <button onClick={() => handleAction("repo", r._id, "approve")} className="btn-primary bg-roach-green hover:bg-green-700">Approve</button>
                <button onClick={() => handleAction("repo", r._id, "reject")} className="btn-secondary text-roach-coral border-roach-coral hover:bg-roach-coral hover:text-white">Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
