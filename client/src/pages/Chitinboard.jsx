import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { COPY } from "../utils/roachCopy";

export default function Chitinboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/users/leaderboard`)
      .then(res => setLeaders(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20 font-mono">{COPY.loading}</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 ">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Chitinboard</h1>
        <p className="font-mono text-roach-muted">The colony's top builders. Ranked by Colony Points.</p>
      </div>

      {leaders.length === 0 ? (
        <div className="card text-center py-12 font-mono">
          {COPY.empty_leaderboard}
        </div>
      ) : (
        <div className="space-y-4">
          {leaders.map((roach, idx) => (
            <Link 
              to={`/exoresume/${roach._id}`} 
              key={roach._id}
              className={`flex items-center justify-between p-4 border-2 border-roach-ink rounded-lg transition-transform hover:-translate-y-1 ${idx === 0 ? 'bg-roach-amber-light shadow-[4px_4px_0_0_rgba(44,44,42,1)]' : 'bg-white'}`}
            >
              <div className="flex items-center gap-4">
                <div className="font-bold text-xl w-8 text-roach-muted">#{idx + 1}</div>
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    {roach.alias} 
                    {roach.isC4IVerified && <span title="C4I Verified" className="text-sm">🪳</span>}
                    {roach.shellShieldActive && <span title="Shell Shield Active" className="text-sm">🛡️</span>}
                  </h3>
                  <p className="text-sm font-mono text-roach-muted">{roach.rank} • {roach.currentStatus}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-xl text-roach-green">{roach.colonyPoints}</div>
                <div className="text-xs font-mono font-bold">PTS</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}