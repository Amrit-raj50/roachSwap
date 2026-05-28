import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { COPY } from "../utils/roachCopy";

// Comparison Modal Component
function SwarmComparisonConsole({ roach1, roach2, onClose }) {
  if (!roach1 || !roach2) return null;

  const stats = [
    { label: "Colony Points", key: "colonyPoints" },
    { label: "Projects Shipped", key: "projectsShipped" },
    { label: "Swaps Completed", key: "swapsCompleted" },
    { label: "Sessions Attended", key: "hivemindSessionsAttended" },
    { label: "Scrambles Completed", key: "scramblesCompleted" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white border-4 border-roach-ink rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[12px_12px_0_0_rgba(44,44,42,1)] relative animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center border-2 border-roach-ink rounded-full bg-roach-coral text-white font-bold hover:bg-white hover:text-roach-ink transition-colors z-10"
        >
          X
        </button>
        
        <div className="p-6 md:p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-roach-ink mb-2">Swarm Comparison</h2>
            <p className="font-mono text-roach-muted">Analyzing builder metrics...</p>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8 border-b-2 border-roach-ink pb-8">
            <div className="text-center">
              <div className="text-4xl mb-2">🪳</div>
              <h3 className="text-2xl font-bold">{roach1.alias}</h3>
              <p className="font-mono text-roach-muted text-sm">{roach1.rank}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🪳</div>
              <h3 className="text-2xl font-bold">{roach2.alias}</h3>
              <p className="font-mono text-roach-muted text-sm">{roach2.rank}</p>
            </div>
          </div>

          <div className="space-y-6">
            {stats.map(stat => {
              const val1 = roach1[stat.key] || 0;
              const val2 = roach2[stat.key] || 0;
              const maxVal = Math.max(val1, val2, 1); // prevent division by zero
              const pct1 = (val1 / maxVal) * 100;
              const pct2 = (val2 / maxVal) * 100;

              return (
                <div key={stat.key} className="relative">
                  <div className="text-center font-mono font-bold text-sm mb-2">{stat.label}</div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-1/2 flex justify-end items-center gap-3">
                      <span className="font-bold">{val1}</span>
                      <div className="h-4 bg-roach-amber-light border-2 border-roach-ink rounded w-full max-w-[200px] flex justify-end overflow-hidden">
                        <div 
                          className="h-full bg-roach-coral transition-all duration-1000 ease-out"
                          style={{ width: `${pct1}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-px h-6 bg-roach-ink flex-shrink-0"></div>
                    <div className="w-1/2 flex justify-start items-center gap-3">
                      <div className="h-4 bg-roach-amber-light border-2 border-roach-ink rounded w-full max-w-[200px] overflow-hidden">
                        <div 
                          className="h-full bg-roach-green transition-all duration-1000 ease-out"
                          style={{ width: `${pct2}%` }}
                        />
                      </div>
                      <span className="font-bold">{val2}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Chitinboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedRank, setSelectedRank] = useState("");

  // Comparison
  const [comparisonCandidates, setComparisonCandidates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/users/leaderboard`)
      .then(res => setLeaders(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const uniqueStates = useMemo(() => {
    const states = new Set(leaders.map(l => l.state).filter(Boolean));
    return Array.from(states).sort();
  }, [leaders]);

  const uniqueRanks = useMemo(() => {
    const ranks = new Set(leaders.map(l => l.rank).filter(Boolean));
    return Array.from(ranks).sort();
  }, [leaders]);

  const filteredLeaders = useMemo(() => {
    return leaders.filter(roach => {
      const matchSearch = roach.alias?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchState = selectedState ? roach.state === selectedState : true;
      const matchRank = selectedRank ? roach.rank === selectedRank : true;
      return matchSearch && matchState && matchRank;
    });
  }, [leaders, searchTerm, selectedState, selectedRank]);

  const toggleCompare = (e, roach) => {
    e.preventDefault(); // Prevent navigating to profile link
    setComparisonCandidates(prev => {
      const exists = prev.find(p => p._id === roach._id);
      if (exists) {
        return prev.filter(p => p._id !== roach._id);
      }
      if (prev.length >= 2) {
        return [prev[1], roach];
      }
      return [...prev, roach];
    });
  };

  if (loading) return <div className="text-center py-20 font-mono">{COPY.loading}</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 uppercase tracking-tight">Chitinboard</h1>
        <p className="font-mono text-roach-muted">The colony's top builders. Ranked by Colony Points.</p>
      </div>

      {/* Discovery Controls */}
      <div className="bg-white border-2 border-roach-ink rounded-lg p-6 mb-8 shadow-[4px_4px_0_0_rgba(44,44,42,1)]">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block font-mono text-sm font-bold mb-2">Search Alias</label>
            <input 
              type="text" 
              placeholder="Search builders..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full border-2 border-roach-ink rounded p-2 focus:outline-none focus:ring-2 focus:ring-roach-green"
            />
          </div>
          <div className="w-full md:w-48">
            <label className="block font-mono text-sm font-bold mb-2">Region/State</label>
            <select 
              value={selectedState} 
              onChange={e => setSelectedState(e.target.value)}
              className="w-full border-2 border-roach-ink rounded p-2 focus:outline-none focus:ring-2 focus:ring-roach-green"
            >
              <option value="">All Regions</option>
              {uniqueStates.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-48">
            <label className="block font-mono text-sm font-bold mb-2">Colony Rank</label>
            <select 
              value={selectedRank} 
              onChange={e => setSelectedRank(e.target.value)}
              className="w-full border-2 border-roach-ink rounded p-2 focus:outline-none focus:ring-2 focus:ring-roach-green"
            >
              <option value="">All Ranks</option>
              {uniqueRanks.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Comparison Bar (shows when 1 or 2 selected) */}
        {comparisonCandidates.length > 0 && (
          <div className="mt-6 p-4 bg-roach-amber-light border-2 border-roach-ink rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4">
            <div className="font-mono text-sm">
              <span className="font-bold">Swarm Comparison:</span> {comparisonCandidates.length}/2 selected
              <div className="flex gap-2 mt-2">
                {comparisonCandidates.map(c => (
                  <span key={c._id} className="bg-white border border-roach-ink px-2 py-1 rounded text-xs flex items-center gap-1 shadow-sm">
                    {c.alias}
                    <button onClick={(e) => toggleCompare(e, c)} className="text-roach-coral font-bold hover:text-red-700 ml-1">x</button>
                  </span>
                ))}
              </div>
            </div>
            {comparisonCandidates.length === 2 && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-roach-ink text-white font-mono px-4 py-2 font-bold uppercase tracking-wider rounded hover:bg-roach-coral transition-colors shadow-[4px_4px_0_0_rgba(44,44,42,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
              >
                Launch Console
              </button>
            )}
          </div>
        )}
      </div>

      {leaders.length === 0 ? (
        <div className="card text-center py-12 font-mono">
          {COPY.empty_leaderboard}
        </div>
      ) : filteredLeaders.length === 0 ? (
        <div className="text-center py-12 font-mono text-roach-muted border-2 border-dashed border-roach-muted rounded-lg">
          No builders found matching your criteria.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLeaders.map((roach, idx) => {
            const isComparing = comparisonCandidates.some(c => c._id === roach._id);
            // We find the original index to display correct rank even when filtered
            const originalRank = leaders.findIndex(l => l._id === roach._id) + 1;
            
            return (
              <Link 
                to={`/exoresume/${roach._id}`} 
                key={roach._id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 border-2 border-roach-ink rounded-lg transition-transform hover:-translate-y-1 ${originalRank === 1 && !searchTerm && !selectedState && !selectedRank ? 'bg-roach-amber-light shadow-[4px_4px_0_0_rgba(44,44,42,1)]' : 'bg-white hover:shadow-[4px_4px_0_0_rgba(44,44,42,1)]'}`}
              >
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <div className="font-bold text-xl w-8 text-roach-muted text-center">#{originalRank}</div>
                  <div>
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      {roach.alias} 
                      {roach.isC4IVerified && <span title="C4I Verified" className="text-sm">🪳</span>}
                      {roach.shellShieldActive && <span title="Shell Shield Active" className="text-sm">🛡️</span>}
                    </h3>
                    <p className="text-sm font-mono text-roach-muted">
                      {roach.rank} • {roach.state || 'Unknown Location'} • {roach.currentStatus}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-6">
                  <div className="text-right">
                    <div className="font-bold text-xl text-roach-green">{roach.colonyPoints}</div>
                    <div className="text-xs font-mono font-bold">PTS</div>
                  </div>
                  <button 
                    onClick={(e) => toggleCompare(e, roach)}
                    className={`px-3 py-1 border-2 border-roach-ink font-mono text-xs font-bold transition-colors rounded ${isComparing ? 'bg-roach-ink text-white' : 'bg-white text-roach-ink hover:bg-roach-amber-light'}`}
                  >
                    {isComparing ? 'Selected' : 'Compare'}
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {isModalOpen && comparisonCandidates.length === 2 && (
        <SwarmComparisonConsole 
          roach1={comparisonCandidates[0]} 
          roach2={comparisonCandidates[1]} 
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}