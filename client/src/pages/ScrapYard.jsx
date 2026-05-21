import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { COPY } from "../utils/roachCopy";

export default function ScrapYard() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All"); // "All" or "Mine"
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    repoName: "", repoUrl: "", description: "", techStack: "", difficulty: "Beginner Friendly"
  });

  useEffect(() => {
    fetchRepos();
  }, [filter]);

  const fetchRepos = () => {
    setLoading(true);
    const url = filter === "Mine" 
      ? `${import.meta.env.VITE_API_URL}/opensource?userFilter=${user._id}`
      : `${import.meta.env.VITE_API_URL}/opensource`;
      
    axios.get(url)
      .then(res => setRepos(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        techStack: formData.techStack.split(",").map(t => t.trim()).filter(Boolean)
      };
      await axios.post(`${import.meta.env.VITE_API_URL}/opensource`, payload);
      toast.success("Repo tossed into The Scrap Yard!");
      setShowForm(false);
      setFormData({ repoName: "", repoUrl: "", description: "", techStack: "", difficulty: "Beginner Friendly" });
      fetchRepos();
    } catch (err) {
      toast.error(err.response?.data?.message || COPY.error_generic);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 border-b-2 border-roach-ink pb-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">The Scrap Yard</h1>
          <p className="font-mono text-roach-muted">Find open-source repos to contribute to. Build your ExoResume.</p>
        </div>
        {user && (
          <button onClick={() => setShowForm(!showForm)} className="btn-primary w-full md:w-auto">
            {showForm ? "Cancel" : "Toss a Repo"}
          </button>
        )}
      </div>

      <div className="flex gap-4 mb-6 font-mono text-sm">
        <button onClick={() => setFilter("All")} className={`font-bold pb-1 ${filter === "All" ? "border-b-2 border-roach-ink text-roach-ink" : "text-roach-muted"}`}>All Scraps</button>
        {user && <button onClick={() => setFilter("Mine")} className={`font-bold pb-1 ${filter === "Mine" ? "border-b-2 border-roach-ink text-roach-ink" : "text-roach-muted"}`}>My Scraps</button>}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card bg-roach-surface mb-8 space-y-4 border-dashed border-4">
          <h2 className="font-bold text-xl mb-2">Toss a Repository</h2>
          <p className="font-mono text-xs text-roach-muted mb-4">+50 PTS for sharing an open-source project.</p>
          
          <div>
            <label className="block text-sm font-bold">Repo Name</label>
            <input required value={formData.repoName} onChange={e => setFormData({...formData, repoName: e.target.value})} placeholder="e.g. facebook/react" className="mt-1 w-full p-2 border-2 border-roach-ink rounded font-mono" />
          </div>
          <div>
            <label className="block text-sm font-bold">GitHub URL</label>
            <input required type="url" value={formData.repoUrl} onChange={e => setFormData({...formData, repoUrl: e.target.value})} placeholder="https://github.com/..." className="mt-1 w-full p-2 border-2 border-roach-ink rounded font-mono" />
          </div>
          <div>
            <label className="block text-sm font-bold">Why contribute?</label>
            <textarea required rows={2} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="mt-1 w-full p-2 border-2 border-roach-ink rounded font-mono" />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-bold">Tech Stack (comma separated)</label>
              <input value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} placeholder="React, Node, MongoDB" className="mt-1 w-full p-2 border-2 border-roach-ink rounded font-mono" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-bold">Difficulty</label>
              <select value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value})} className="mt-1 w-full p-2 border-2 border-roach-ink rounded font-mono bg-white">
                <option>Beginner Friendly</option><option>Intermediate</option><option>Advanced</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn-primary w-full mt-4">Toss it</button>
        </form>
      )}

      {loading ? (
        <div className="text-center py-20 font-mono">Digging through scraps...</div>
      ) : repos.length === 0 ? (
        <div className="card text-center py-12 font-mono text-roach-muted">
          {filter === "Mine" ? "You haven't tossed any repos yet." : "The yard is empty. Be the first to toss a repo."}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {repos.map(repo => (
            <div key={repo._id} className="card flex flex-col hover:bg-roach-surface relative">
              <div className="absolute top-4 right-4 bg-roach-green-light border-2 border-roach-ink px-2 py-1 text-xs font-bold font-mono rounded">
                {repo.difficulty}
              </div>
              <h3 className="font-bold text-xl mb-2 pr-24 flex items-center gap-2">
                {repo.repoName}
                {repo.approvalStatus === "Pending" && (
                  <span className="text-xs bg-roach-coral-light text-roach-coral px-2 py-1 rounded font-normal whitespace-nowrap">Pending Approval 🕒</span>
                )}
                {repo.approvalStatus === "Rejected" && (
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded font-normal whitespace-nowrap">Rejected ❌</span>
                )}
              </h3>
              <p className="text-roach-muted text-sm mb-4 line-clamp-2">{repo.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {repo.techStack.map(tech => (
                  <span key={tech} className="bg-roach-purple-light border border-roach-ink px-2 py-1 text-xs font-mono rounded">{tech}</span>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t-2 border-roach-ink flex justify-between items-center text-xs font-mono font-bold">
                <span>By: {repo.postedBy?.alias}</span>
                <a href={repo.repoUrl} target="_blank" rel="noreferrer" className="btn-secondary py-1 px-3">View on GitHub</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
