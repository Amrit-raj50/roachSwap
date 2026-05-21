import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { COPY } from "../utils/roachCopy";

export default function ExoResume() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}/exoresume`)
      .then(res => setProfile(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div className="text-center py-20 font-mono">{COPY.loading}</div>;
  if (error || !profile) return <div className="text-center py-20 font-mono">{COPY.error_not_found}</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 ">
      <div className="card bg-roach-ink text-roach-surface border-none mb-8 relative overflow-hidden">
        {profile.isC4IVerified && (
          <div className="absolute top-4 right-4 text-4xl opacity-50" title="C4I Verified">🪳</div>
        )}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 relative z-10">
          <div>
            <h1 className="text-4xl font-bold mb-1">{profile.name}</h1>
            {profile.name !== profile.alias && (
              <p className="font-mono text-roach-muted mb-4">aka {profile.alias}</p>
            )}
            <p className="font-mono text-sm">Status: {profile.currentStatus}</p>
            <p className="font-mono text-sm">Location: {profile.state}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-roach-green">{profile.colonyPoints} PTS</div>
            <div className="font-mono">{profile.rank}</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4 border-b-2 border-roach-ink pb-2">Colony Stats</h2>
          <div className="space-y-4 font-mono">
            <div className="flex justify-between">
              <span>Projects Shipped:</span>
              <span className="font-bold">{profile.projectsShipped || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Skill Swaps:</span>
              <span className="font-bold">{profile.swapsCompleted || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Scrambles:</span>
              <span className="font-bold">{profile.scramblesCompleted || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>HiveMind Sessions:</span>
              <span className="font-bold">{profile.hivemindSessionsAttended || 0}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4 border-b-2 border-roach-ink pb-2">Bio</h2>
          <p className="font-mono whitespace-pre-wrap">
            {profile.bio || "This roach is too busy building to write a bio."}
          </p>
        </div>
      </div>
    </div>
  );
}