import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { COPY, C4I_DEMANDS } from "../utils/roachCopy";
import { useAuth } from "../context/AuthContext";

export default function ProjectDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/projects/${id}`)
      .then(res => setProject(res.data))
      .catch(() => toast.error(COPY.error_not_found))
      .finally(() => setLoading(false));
  }, [id]);

  const handleJoin = async () => {
    if (!user) {
      toast.error("You must be logged in to join.");
      return;
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/projects/${id}/join`);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || COPY.error_generic);
    }
  };

  if (loading) return <div className="text-center py-20 font-mono">{COPY.loadingProjects}</div>;
  if (!project) return <div className="text-center py-20 font-mono">Project not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 ">
      <div className="card mb-8">
        {project.isMovementBuild && (
          <div className="mb-4 inline-block px-3 py-1 bg-roach-amber-light border-2 border-roach-ink text-sm font-bold rounded">
            🪳 Movement Build: {C4I_DEMANDS[project.movementDemand].label}
          </div>
        )}
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <div className="flex gap-4 mb-6 text-sm font-mono text-roach-muted border-b-2 border-roach-ink pb-4">
          <span>By: {project.owner?.alias} {project.owner?.isC4IVerified && "🪳"}</span>
          <span>•</span>
          <span>Category: {project.category}</span>
          <span>•</span>
          <span>Status: {project.status}</span>
        </div>
        
        <h3 className="font-bold text-lg mb-2">Description</h3>
        <p className="mb-6 whitespace-pre-wrap">{project.description}</p>
        
        {project.problemStatement && (
          <>
            <h3 className="font-bold text-lg mb-2">The Problem</h3>
            <p className="mb-6 whitespace-pre-wrap italic bg-roach-surface p-4 rounded border-l-4 border-roach-ink">
              "{project.problemStatement}"
            </p>
          </>
        )}

        <div className="mt-8 flex justify-end">
          {user && user._id !== project.owner?._id && !(project.members || []).some(m => m._id === user._id) && (
            <button onClick={handleJoin} className="btn-primary">I'm In. Let's Build.</button>
          )}
          {user && (project.members || []).some(m => m._id === user._id) && (
            <span className="btn-secondary opacity-50 cursor-not-allowed">You're in this colony</span>
          )}
        </div>
      </div>
      
      <div className="card">
        <h3 className="font-bold text-xl mb-4">Colony Members ({(project.members || []).length})</h3>
        <div className="flex flex-wrap gap-2 font-mono">
          {(project.members || []).map(member => (
            <span key={member._id} className="bg-roach-surface border-2 border-roach-ink px-3 py-1 rounded-full text-sm">
              {member.alias}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}