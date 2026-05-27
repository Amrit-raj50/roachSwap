import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { COPY } from "../utils/roachCopy";
import { useSocket } from "../context/SocketContext";

const FILTERS = [
  { label: 'All Activity', value: 'all', icon: '📡' },
  { label: 'Projects Shipped', value: 'projects', icon: '🚀', types: ['project_shipped', 'project_posted'] },
  { label: 'Movement Builds', value: 'movement', icon: '🪳', types: ['movement_build_posted'] },
  { label: 'Member Joins', value: 'joins', icon: '👑', types: ['c4i_member_joined'] },
  { label: 'Skill Swaps', value: 'swaps', icon: '🔄', types: ['skill_swap'] },
  { label: 'Bug Squashes', value: 'bugs', icon: '🐛', types: ['bug_squashed'] },
  { label: 'Achievements', value: 'achievements', icon: '🏆', types: ['colony_achievement'] }
];

function SwarmRadar() {
  return (
    <div className="bg-roach-ink border-4 border-roach-green-dark rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden shadow-[8px_8px_0_0_rgba(44,44,42,1)] min-h-[300px] sm:min-h-[400px]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      {/* Radar rings */}
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-roach-green/30 flex items-center justify-center">
        <div className="absolute w-3/4 h-3/4 rounded-full border border-roach-green/40"></div>
        <div className="absolute w-1/2 h-1/2 rounded-full border border-roach-green/50"></div>
        <div className="absolute w-1/4 h-1/4 rounded-full border border-roach-green/70"></div>
        
        {/* Crosshairs */}
        <div className="absolute w-full h-px bg-roach-green/40"></div>
        <div className="absolute h-full w-px bg-roach-green/40"></div>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes radar-sweep {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-radar {
            animation: radar-sweep 4s linear infinite;
          }
          @keyframes pulse-blip {
            0% { transform: scale(0.5); opacity: 1; }
            100% { transform: scale(2.5); opacity: 0; }
          }
          .animate-blip {
            animation: pulse-blip 2s ease-out infinite;
          }
        `}} />
        
        <div 
          className="absolute inset-0 rounded-full animate-radar"
          style={{
            background: 'conic-gradient(from 0deg, rgba(0, 255, 0, 0) 70%, rgba(0, 255, 0, 0.1) 90%, rgba(0, 255, 0, 0.8) 100%)'
          }}
        ></div>

        {/* Simulated Blips */}
        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-roach-green rounded-full shadow-[0_0_10px_#00FF00]">
          <div className="absolute inset-0 bg-roach-green rounded-full animate-blip"></div>
        </div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-roach-amber rounded-full shadow-[0_0_8px_#ffbf00]" style={{ animationDelay: '1s'}}>
          <div className="absolute inset-0 bg-roach-amber rounded-full animate-blip" style={{ animationDelay: '1s'}}></div>
        </div>
        <div className="absolute top-1/2 left-2/3 w-2 h-2 bg-roach-coral rounded-full shadow-[0_0_8px_#ff4500]" style={{ animationDelay: '2.5s'}}>
          <div className="absolute inset-0 bg-roach-coral rounded-full animate-blip" style={{ animationDelay: '2.5s'}}></div>
        </div>
      </div>

      <div className="mt-8 font-mono text-roach-green font-bold tracking-widest uppercase flex flex-col items-center z-10">
        <span>Swarm Activity Radar</span>
        <span className="text-xs text-roach-green/60 mt-1">Tracking peak colony surge</span>
      </div>
    </div>
  );
}

export default function PheromoneBoard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const socket = useSocket();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/feed`)
      .then(res => setEvents(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!socket) return;
    
    socket.on("new_feed_event", (event) => {
      setEvents(prev => [event, ...prev].slice(0, 50));
    });

    return () => socket.off("new_feed_event");
  }, [socket]);

  const filteredEvents = useMemo(() => {
    if (activeFilter === 'all') return events;
    const filterConfig = FILTERS.find(f => f.value === activeFilter);
    if (!filterConfig || !filterConfig.types) return events;
    
    return events.filter(event => filterConfig.types.includes(event.type));
  }, [events, activeFilter]);

  if (loading) return <div className="text-center py-20 font-mono">{COPY.loadingFeed}</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 border-b-2 border-roach-ink pb-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">Pheromone Board</h1>
          <p className="font-mono text-roach-muted mt-2">Realtime Swarm Analytics & Activity Feed</p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-roach-green-dark bg-roach-green/10 px-4 py-2 rounded-full border border-roach-green">
          <span className="relative flex h-3 w-3 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-roach-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-roach-green"></span>
          </span>
          <span className="font-bold tracking-widest">LIVE CONNECTION</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Filters and Feed */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Neon Filter System */}
          <div className="flex flex-wrap gap-3">
            {FILTERS.map(filter => {
              const isActive = activeFilter === filter.value;
              return (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`
                    font-mono text-xs sm:text-sm font-bold px-4 py-2 rounded-full border-2 transition-all duration-300 flex items-center gap-2
                    ${isActive 
                      ? 'bg-roach-ink text-white border-roach-ink shadow-[4px_4px_0_0_rgba(44,44,42,1)] scale-105' 
                      : 'bg-white text-roach-ink border-roach-ink hover:bg-roach-amber-light hover:-translate-y-1'
                    }
                  `}
                >
                  <span>{filter.icon}</span>
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Activity Feed */}
          {filteredEvents.length === 0 ? (
            <div className="card text-center py-12 font-mono border-2 border-dashed border-roach-muted">
              {activeFilter === 'all' ? COPY.empty_feed : "No activity matches this filter yet."}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEvents.map((event, idx) => (
                <div 
                  key={`${event._id || idx}-${event.type}`} 
                  className="bg-white p-4 sm:p-5 border-2 border-roach-ink rounded-lg shadow-[4px_4px_0_0_rgba(44,44,42,1)] flex gap-4 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 hover:translate-x-2"
                >
                  <div className="text-3xl flex-shrink-0 flex items-center justify-center w-12 h-12 bg-roach-amber-light rounded-full border-2 border-roach-ink">
                    {event.type === 'project_shipped' && '🚀'}
                    {event.type === 'movement_build_posted' && '🪳'}
                    {event.type === 'project_posted' && '🏗️'}
                    {event.type === 'c4i_member_joined' && '👑'}
                    {event.type === 'skill_swap' && '🔄'}
                    {event.type === 'bug_squashed' && '🐛'}
                    {event.type === 'colony_achievement' && '🏆'}
                    {!['project_shipped', 'movement_build_posted', 'project_posted', 'c4i_member_joined', 'skill_swap', 'bug_squashed', 'colony_achievement'].includes(event.type) && '📡'}
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="font-mono text-sm sm:text-base text-roach-ink leading-relaxed">
                      <span className="font-bold text-roach-coral">{event.actorAlias || "A roach"}</span> {event.message}
                    </p>
                    <p className="text-xs font-bold text-roach-muted mt-2 tracking-wider">
                      {new Date(event.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Radar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <SwarmRadar />
          </div>
        </div>

      </div>
    </div>
  );
}