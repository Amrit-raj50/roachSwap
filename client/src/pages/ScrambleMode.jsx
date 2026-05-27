import { useState, useEffect } from "react";

const INITIAL_SCRAMBLES = [
  { id: 1, title: "Clean out the grease trap in the CSS router", difficulty: "Hard", status: "Active" },
  { id: 2, title: "Patch the memory leak in the colony hive", difficulty: "Nightmare", status: "Critical" },
  { id: 3, title: "Emergency hotfix deployment initiated", difficulty: "Medium", status: "Active" },
  { id: 4, title: "Remove infinite loop from Pheromone Board", difficulty: "Easy", status: "Resolved" }
];

const TITLES = [
  { threshold: 0, name: "Larva Coder" },
  { threshold: 1, name: "Rage Hotfixer" },
  { threshold: 3, name: "CSS Exterminator" },
  { threshold: 5, name: "Kernel Roach" },
  { threshold: 10, name: "Swarm Overlord" }
];

function CountdownTimer() {
  // Start with 47 hours, 59 mins, 59 secs roughly for demo
  const [timeLeft, setTimeLeft] = useState(48 * 60 * 60 - 1);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const isUrgent = timeLeft < 3600; // Less than an hour

  return (
    <div className={`font-mono text-5xl md:text-7xl font-bold tracking-widest p-6 border-4 ${isUrgent ? 'border-red-500 text-red-500 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.8)]' : 'border-roach-coral text-roach-coral shadow-[0_0_15px_rgba(255,69,0,0.5)]'} bg-black rounded-xl inline-block transition-all duration-300`}>
      {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
}

export default function ScrambleMode() {
  const [scrambles] = useState(INITIAL_SCRAMBLES);
  const [hotfixLog, setHotfixLog] = useState([]);
  const [hotfixInput, setHotfixInput] = useState("");
  const [selectedScramble, setSelectedScramble] = useState(INITIAL_SCRAMBLES[0].id);

  const currentTitle = TITLES.slice().reverse().find(t => hotfixLog.length >= t.threshold)?.name || "Larva Coder";

  const handleHotfixSubmit = (e) => {
    e.preventDefault();
    if (!hotfixInput.trim()) return;

    const newLog = {
      id: Date.now(),
      text: hotfixInput,
      scrambleId: selectedScramble,
      timestamp: new Date().toLocaleTimeString()
    };

    setHotfixLog(prev => [newLog, ...prev]);
    setHotfixInput("");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black mb-6 text-roach-ink uppercase tracking-tighter drop-shadow-md">
          Scramble <span className="text-roach-coral">Arena</span>
        </h1>
        <p className="font-mono text-roach-muted text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          48-hour pressure cooker. Build it fast. Ship it broken. Fix it later.
        </p>
        <CountdownTimer />
        <div className="mt-4 font-mono text-roach-muted font-bold text-sm tracking-widest uppercase">
          Time Remaining Until Complete Swarm Failure
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Active Challenges */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold uppercase border-b-4 border-roach-ink pb-2 mb-6 flex items-center gap-3">
            <span>🔥</span> Active Scrambles
          </h2>
          <div className="space-y-4">
            {scrambles.map(scramble => (
              <div 
                key={scramble.id} 
                className={`p-5 border-4 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0_0_rgba(44,44,42,1)] ${scramble.status === 'Resolved' ? 'bg-roach-green/20 border-roach-green opacity-70' : 'bg-white border-roach-ink'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-bold font-mono px-2 py-1 rounded border-2 ${scramble.difficulty === 'Nightmare' ? 'bg-roach-coral text-white border-roach-coral' : scramble.difficulty === 'Hard' ? 'bg-roach-amber text-roach-ink border-roach-amber' : 'bg-white text-roach-ink border-roach-ink'}`}>
                    {scramble.difficulty}
                  </span>
                  <span className={`text-xs font-mono font-bold tracking-widest uppercase ${scramble.status === 'Critical' ? 'text-roach-coral animate-pulse' : 'text-roach-muted'}`}>
                    {scramble.status}
                  </span>
                </div>
                <h3 className={`text-xl font-bold ${scramble.status === 'Resolved' ? 'line-through' : ''}`}>
                  {scramble.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Hotfix Zone */}
        <div>
          <div className="bg-roach-ink text-white p-8 rounded-xl border-4 border-roach-amber-light shadow-[12px_12px_0_0_#ffbf00] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <span className="text-9xl font-black">🛠️</span>
            </div>
            
            <h2 className="text-3xl font-bold uppercase mb-2 text-roach-amber-light">Terminal Access</h2>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-sm text-roach-muted">Current Rank:</span>
              <span className="bg-roach-coral text-white font-mono font-bold px-3 py-1 border-2 border-roach-coral rounded rotate-2 shadow-sm inline-block transition-all duration-500 hover:rotate-0 hover:scale-110">
                {currentTitle}
              </span>
            </div>

            <form onSubmit={handleHotfixSubmit} className="space-y-4 relative z-10">
              <div>
                <label className="block font-mono text-sm mb-2 text-roach-amber-light">Target Scramble</label>
                <select 
                  value={selectedScramble} 
                  onChange={e => setSelectedScramble(Number(e.target.value))}
                  className="w-full bg-black border-2 border-roach-amber-light text-roach-green font-mono p-3 rounded focus:outline-none focus:ring-2 focus:ring-roach-coral"
                >
                  {scrambles.filter(s => s.status !== 'Resolved').map(s => (
                    <option key={s.id} value={s.id}>[{s.difficulty}] {s.title}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block font-mono text-sm mb-2 text-roach-amber-light">Deploy Hotfix Patch</label>
                <textarea 
                  value={hotfixInput}
                  onChange={e => setHotfixInput(e.target.value)}
                  placeholder="e.g., Duct taped the main loop, should hold for 5 mins..."
                  className="w-full bg-black border-2 border-roach-amber-light text-roach-green font-mono p-3 rounded h-24 resize-none focus:outline-none focus:ring-2 focus:ring-roach-coral"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-roach-amber-light text-roach-ink font-black font-mono text-lg uppercase tracking-widest py-4 border-4 border-roach-amber-light rounded hover:bg-roach-coral hover:text-white hover:border-roach-coral transition-all duration-300 transform hover:scale-[1.02]"
              >
                PUSH TO PROD
              </button>
            </form>

            {/* Worklog Feed */}
            <div className="mt-8 pt-6 border-t-2 border-roach-muted/30">
              <h3 className="font-mono text-sm text-roach-muted mb-4 uppercase tracking-widest">Active Worklog</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                {hotfixLog.length === 0 ? (
                  <div className="text-roach-muted/50 font-mono text-sm italic">No hotfixes deployed yet. System failing...</div>
                ) : (
                  hotfixLog.map(log => {
                    const scrambleRef = scrambles.find(s => s.id === log.scrambleId);
                    return (
                      <div key={log.id} className="bg-black/50 border border-roach-muted/30 p-3 rounded font-mono text-sm animate-in fade-in slide-in-from-top-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-roach-green text-xs font-bold">[{log.timestamp}]</span>
                          <span className="text-roach-coral text-xs truncate max-w-[150px]">{scrambleRef?.title}</span>
                        </div>
                        <p className="text-white/90 break-words">> {log.text}</p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}