import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { COPY, C4I_DEMANDS } from "../utils/roachCopy";

export default function MovementProjects() {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({ totalMovementProjects: 0, verifiedRoaches: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(`${import.meta.env.VITE_API_URL}/projects?movement=true`),
      axios.get(`${import.meta.env.VITE_API_URL}/movement/stats`)
    ])
      .then(([projRes, statRes]) => {
        setProjects(projRes.data);
        setStats(statRes.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20 font-mono">{COPY.loadingProjects}</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 ">
      <div className="bg-roach-amber-light border-2 border-roach-ink p-8 rounded-lg shadow-[8px_8px_0_0_rgba(44,44,42,1)] mb-12">
        <h1 className="text-4xl font-bold mb-4">Movement Builds 🪳</h1>
        <p className="font-mono text-lg mb-6 max-w-2xl">
          These projects are directly aligned with the Five Demands of Cockroach4India. 
          We are building the solutions to the grievances we organized.
        </p>
        <div className="flex gap-8 font-mono font-bold">
          <div>
            <div className="text-3xl text-roach-coral">{stats.totalMovementProjects}</div>
            <div className="text-sm">Active Builds</div>
          </div>
          <div>
            <div className="text-3xl text-roach-green">{stats.verifiedRoaches}</div>
            <div className="text-sm">Verified Roaches</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-2 text-center py-12 font-mono text-roach-muted card">
            No movement builds yet. Time to start digging.
          </div>
        ) : (
          projects.map(project => (
            <Link to={`/anthill/${project._id}`} key={project._id} className="card flex flex-col hover:bg-roach-surface">
              <div className="mb-4 inline-block self-start px-3 py-1 bg-roach-amber-light border-2 border-roach-ink text-sm font-bold rounded">
                {C4I_DEMANDS[project.movementDemand].emoji} {C4I_DEMANDS[project.movementDemand].label}
              </div>
              <h3 className="font-bold text-xl mb-2">{project.title}</h3>
              <p className="text-roach-muted text-sm mb-4 line-clamp-2">{project.description}</p>
              <div className="mt-auto flex justify-between items-center text-xs font-mono font-bold">
                <span>By: {project.owner?.alias}</span>
                <span className="bg-roach-ink text-white px-2 py-1 rounded">{project.status}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}