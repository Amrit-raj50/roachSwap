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

  // Search & Filtering states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedTags, setSelectedTags] = useState([]);

  const [formData, setFormData] = useState({
    repoName: "", repoUrl: "", description: "", techStack: "", difficulty: "Beginner Friendly"
  });

  useEffect(() => {
    fetchRepos();
  }, [filter]);

  // Reset filters when the high-level tab filter changes
  useEffect(() => {
    setSearchQuery("");
    setSelectedDifficulty("All");
    setSelectedTags([]);
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

  // Dynamically extract all unique tags from currently loaded repository list
  const allUniqueTags = Array.from(
    new Set(repos.flatMap(repo => repo.techStack || []))
  ).sort();

  // Combined Multi-Filter Logic
  const filteredRepos = repos.filter(repo => {
    // 1. Search Query Filter (checks name, description, and tech stack tags)
    const matchesSearch = searchQuery.trim() === "" || 
      repo.repoName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.techStack?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    // 2. Difficulty Filter
    const matchesDifficulty = selectedDifficulty === "All" || repo.difficulty === selectedDifficulty;

    // 3. Multi-tag tech stack filter (checks if ALL selected tags are in repo's techStack)
    const matchesTags = selectedTags.length === 0 ||
      selectedTags.every(tag => repo.techStack?.includes(tag));

    return matchesSearch && matchesDifficulty && matchesTags;
  });

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

      {/* Advanced Search & Filtering System */}
      <div className="bg-roach-surface border-2 border-roach-ink p-4 min-[320px]:p-6 mb-8 space-y-6 shadow-[4px_4px_0_0_rgba(44,44,42,1)]">
        
        {/* Real-time Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-roach-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text"
            placeholder="Search scraps by name, description, or tech stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 p-3 border-2 border-roach-ink rounded bg-white font-mono text-sm outline-none focus:border-roach-coral focus:ring-1 focus:ring-roach-coral transition-colors"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-roach-muted hover:text-roach-coral font-bold text-sm"
            >
              Clear
            </button>
          )}
        </div>

        {/* Interactive Filters Grid */}
        <div className="grid md:grid-cols-2 gap-6 pt-2 border-t border-roach-ink/10">
          
          {/* Difficulty Grade Filter */}
          <div>
            <span className="block text-xs font-bold font-mono uppercase text-roach-ink mb-2">Difficulty Grade</span>
            <div className="flex flex-wrap gap-2">
              {["All", "Beginner Friendly", "Intermediate", "Advanced"].map(diff => {
                const isActive = selectedDifficulty === diff;
                let activeStyle = "bg-roach-ink text-white";
                if (isActive) {
                  if (diff === "Beginner Friendly") activeStyle = "bg-roach-green text-white shadow-[2px_2px_0_0_rgba(44,44,42,1)]";
                  else if (diff === "Intermediate") activeStyle = "bg-amber-500 text-white shadow-[2px_2px_0_0_rgba(44,44,42,1)]";
                  else if (diff === "Advanced") activeStyle = "bg-roach-coral text-white shadow-[2px_2px_0_0_rgba(44,44,42,1)]";
                  else activeStyle = "bg-roach-ink text-white shadow-[2px_2px_0_0_rgba(44,44,42,1)]";
                }
                return (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-3 py-1.5 border-2 border-roach-ink font-mono text-xs font-bold rounded transition-all hover:bg-roach-coral-light ${
                      isActive 
                        ? activeStyle 
                        : "bg-white text-roach-ink"
                    }`}
                  >
                    {diff}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Technology Tag Cloud */}
          <div>
            <span className="block text-xs font-bold font-mono uppercase text-roach-ink mb-2">Filter by Tech Stack</span>
            {allUniqueTags.length === 0 ? (
              <p className="font-mono text-xs text-roach-muted italic">No tech stack tags found.</p>
            ) : (
              <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto pr-2">
                {allUniqueTags.map(tag => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedTags(selectedTags.filter(t => t !== tag));
                        } else {
                          setSelectedTags([...selectedTags, tag]);
                        }
                      }}
                      className={`px-2.5 py-1 text-xs font-mono font-bold rounded border transition-colors ${
                        isSelected 
                          ? "bg-roach-purple-light text-roach-ink border-2 border-roach-ink shadow-[1px_1px_0_0_rgba(44,44,42,1)]" 
                          : "bg-white text-roach-muted border-roach-ink/30 hover:border-roach-ink"
                      }`}
                    >
                      {tag} {isSelected ? "✓" : "+"}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Active Filters Summary & Reset */}
        {(searchQuery || selectedDifficulty !== "All" || selectedTags.length > 0) && (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-roach-ink/10">
            <span className="font-mono text-xs text-roach-muted">
              Showing <strong className="text-roach-ink">{filteredRepos.length}</strong> of <strong className="text-roach-ink">{repos.length}</strong> total scraps
            </span>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDifficulty("All");
                setSelectedTags([]);
              }}
              className="text-xs font-bold font-mono text-roach-coral uppercase tracking-widest hover:underline"
            >
              Clear All Filters ×
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center py-20 font-mono">Digging through scraps...</div>
      ) : filteredRepos.length === 0 ? (
        <div className="card text-center py-16 font-mono text-roach-muted border-2 border-dashed border-roach-ink">
          {repos.length === 0 ? (
            filter === "Mine" ? "You haven't tossed any repos yet." : "The yard is empty. Be the first to toss a repo."
          ) : (
            <div className="space-y-4">
              <div className="text-4xl">📡</div>
              <p className="font-bold text-roach-ink">No matching scraps found in the colony.</p>
              <p className="text-xs text-roach-muted max-w-md mx-auto">Your antenna matches nothing currently in the Scrap Yard. Try clearing filters or entering a different search term.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDifficulty("All");
                  setSelectedTags([]);
                }}
                className="btn-secondary px-4 py-2 mt-4 text-xs font-mono font-bold"
              >
                Reset Discover Filters
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredRepos.map(repo => (
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
                {repo.techStack.map(tech => {
                  const isSelected = selectedTags.includes(tech);
                  return (
                    <button
                      type="button"
                      key={tech}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedTags(selectedTags.filter(t => t !== tech));
                        } else {
                          setSelectedTags([...selectedTags, tech]);
                        }
                      }}
                      className={`px-2 py-1 text-xs font-mono rounded border transition-colors ${
                        isSelected
                          ? "bg-roach-purple-light text-roach-ink border-2 border-roach-ink shadow-[1px_1px_0_0_rgba(44,44,42,1)]"
                          : "bg-white text-roach-muted border-roach-ink/30 hover:border-roach-ink"
                      }`}
                    >
                      {tech}
                    </button>
                  );
                })}
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
