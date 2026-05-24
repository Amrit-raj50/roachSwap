import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { COPY } from "../utils/roachCopy";
import { useAuth } from "../context/AuthContext";

const DEFAULT_MILESTONES = [
  {
    id: "ms1",
    title: "The First Ghosting",
    description: "Applied to an internship. Got ghosted so hard my antennas vibrated for two weeks. Swore revenge and shipped three custom React state widgets.",
    date: "2024-03-12",
    category: "Career",
    badge: "👻 Ghost Buster"
  },
  {
    id: "ms2",
    title: "Spite Project Launch",
    description: "Senior dev remarked that my CSS layouts looked like a wet cabbage leaf. Rebuilt the entire platform UI in neobrutalist grid systems over a single weekend.",
    date: "2024-11-05",
    category: "Development",
    badge: "🎨 Grid Warrior"
  },
  {
    id: "ms3",
    title: "Relative Taunt Deflected",
    description: "Uncle asked why I'm still doing software swaps instead of preparing for bank exams. Displayed +350 Colony Points on my dashboard and drank tea silently.",
    date: "2025-02-18",
    category: "Social",
    badge: "🛡️ Uncle Deflector"
  }
];

const BADGES = [
  {
    id: "badge1",
    name: "Pesticide Survivor",
    description: "Survived multiple rounds of corporate rejections without melting.",
    requirement: "Have 3+ spite milestones or 2+ projects shipped",
    check: (prof, miles) => miles.length >= 3 || (prof.projectsShipped || 0) >= 2,
    icon: "🛡️"
  },
  {
    id: "badge2",
    name: "Infinitely Employable",
    description: "A prestigious rank that makes standard worker ants green with envy.",
    requirement: "Amass 200+ Colony Points",
    check: (prof) => (prof.colonyPoints || 0) >= 200,
    icon: "👑"
  },
  {
    id: "badge3",
    name: "Rage Code Master",
    description: "Shipped multiple high-complexity platforms fueled purely by spite.",
    requirement: "Ship at least 1 project inside the Colony",
    check: (prof) => (prof.projectsShipped || 0) >= 1,
    icon: "⚡"
  },
  {
    id: "badge4",
    name: "Interview Necromancer",
    description: "Revived a dead/ghosted thread after months of static silence.",
    requirement: "Attend 1+ HiveMind mentor session",
    check: (prof) => (prof.hivemindSessionsAttended || 0) >= 1,
    icon: "🔮"
  },
  {
    id: "badge5",
    name: "Corporate Escape Artist",
    description: "Escaped the toxic LinkedIn feed loops with sanity intact.",
    requirement: "Complete 1+ skill swap or have 4+ milestones",
    check: (prof, miles) => (prof.swapsCompleted || 0) >= 1 || miles.length >= 4,
    icon: "🏃‍♂️"
  }
];

export default function ExoResume() {
  const { userId } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Exporter & Sharing states
  const [exporting, setExporting] = useState(false);
  const [shareText, setShareText] = useState("Share ExoResume");

  // Spite Milestones state with localStorage backup
  const [milestones, setMilestones] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    title: "",
    description: "",
    date: "",
    category: "Career",
    badge: ""
  });

  // Expandable timeline card states
  const [expandedCard, setExpandedCard] = useState({});

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}/exoresume`)
      .then(res => {
        setProfile(res.data);
        
        // Sync local storage spite achievements for persistence
        const cached = localStorage.getItem(`exoresume_milestones_${res.data._id}`);
        if (cached) {
          setMilestones(JSON.parse(cached));
        } else {
          setMilestones(DEFAULT_MILESTONES);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [userId]);

  const handleDownload = () => {
    setExporting(true);
    
    const element = document.getElementById("exoresume-card-container");
    const opt = {
      margin: 10,
      filename: `ExoResume-${profile.alias || "Roach"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        backgroundColor: "#F1EFE8"
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    };

    const runExportPDF = () => {
      window.html2pdf()
        .from(element)
        .set(opt)
        .save()
        .then(() => {
          toast.success("ExoResume PDF downloaded successfully! 📄");
        })
        .catch((err) => {
          console.error("PDF export failed:", err);
          toast.error("Could not compile your PDF resume.");
        })
        .finally(() => {
          setExporting(false);
        });
    };

    if (window.html2pdf) {
      runExportPDF();
    } else {
      // Inject CDN on the fly
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      script.onload = runExportPDF;
      script.onerror = () => {
        toast.error("Failed to boot up export engine from CDN.");
        setExporting(false);
      };
      document.body.appendChild(script);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${profile.name}'s Chitinous ExoResume`,
        text: `Check out ${profile.alias}'s spite-driven development rank, points, and achievements on roachSwap!`,
        url: window.location.href
      })
      .then(() => toast.success("Shared successfully! 🚀"))
      .catch((err) => {
        if (err.name !== "AbortError") {
          toast.error("Failed to share.");
        }
      });
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          setShareText("Link Copied! 📋");
          toast.success("Link copied to clipboard!");
          setTimeout(() => setShareText("Share ExoResume"), 2500);
        })
        .catch(() => {
          toast.error("Failed to copy link.");
        });
    }
  };

  // Add a new spite milestone with client validation and save to localStorage
  const handleAddMilestone = (e) => {
    e.preventDefault();
    if (!newMilestone.title.trim() || !newMilestone.description.trim() || !newMilestone.date) {
      toast.error("Please fill in all required milestone fields.");
      return;
    }

    const updated = [
      ...milestones,
      {
        id: `ms-${Date.now()}`,
        ...newMilestone
      }
    ];

    setMilestones(updated);
    localStorage.setItem(`exoresume_milestones_${profile._id}`, JSON.stringify(updated));
    toast.success("Spite milestone recorded! Check your timeline below.");
    setShowAddModal(false);
    setNewMilestone({ title: "", description: "", date: "", category: "Career", badge: "" });
  };

  const toggleCard = (id) => {
    setExpandedCard(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (loading) return <div className="text-center py-20 font-mono">{COPY.loading}</div>;
  if (error || !profile) return <div className="text-center py-20 font-mono">{COPY.error_not_found}</div>;

  const isOwner = user && user._id === profile._id;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      
      {/* Neobrutalist Glow Effects Style Injection */}
      <style>{`
        .glow-neon-green {
          box-shadow: 0 0 15px rgba(74, 222, 128, 0.4);
        }
        .glow-neon-purple {
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.4);
        }
        .badge-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .badge-card:hover {
          transform: translateY(-3px);
        }
      `}</style>

      {/* ExoResume Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-roach-surface border-2 border-roach-ink p-4 shadow-[4px_4px_0_0_rgba(44,44,42,1)]">
        <div>
          <h2 className="font-bold text-lg uppercase font-mono">ExoResume Dashboard</h2>
          <p className="text-xs font-mono text-roach-muted">Export or broadcast your spite-development credentials.</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          {isOwner && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="btn-secondary text-xs font-bold font-mono px-4 py-2 flex items-center justify-center gap-2 border-roach-green text-roach-green-dark hover:bg-roach-green hover:text-white flex-1 sm:flex-initial"
            >
              <span>＋</span> Add Spite Milestone
            </button>
          )}
          <button 
            onClick={handleShare}
            className="btn-secondary text-xs font-bold font-mono px-4 py-2 flex items-center justify-center gap-2 border-roach-coral text-roach-coral hover:bg-roach-coral hover:text-white flex-1 sm:flex-initial"
          >
            <span>🔗</span> {shareText}
          </button>
          <button 
            onClick={handleDownload}
            disabled={exporting}
            className="btn-primary text-xs font-bold font-mono px-4 py-2 flex items-center justify-center gap-2 bg-roach-ink border-roach-ink hover:bg-roach-coral hover:border-roach-coral text-white flex-1 sm:flex-initial disabled:opacity-50"
          >
            {exporting ? (
              <>
                <span className="animate-spin">🌀</span> Exporting...
              </>
            ) : (
              <>
                <span>📥</span> Download PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Unified Chitinous Resume Card Snapshot Wrapper */}
      <div id="exoresume-card-container" className="bg-roach-surface border-4 border-roach-ink p-6 min-[320px]:p-8 shadow-[8px_8px_0_0_rgba(44,44,42,1)] space-y-8">
        
        {/* Profile Card Header Banner */}
        <div className="card bg-roach-ink text-roach-surface border-none relative overflow-hidden">
          {profile.isC4IVerified && (
            <div className="absolute top-4 right-4 text-4xl opacity-50 select-none" title="C4I Verified">🪳</div>
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

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card bg-white border-2 border-roach-ink shadow-[4px_4px_0_0_rgba(44,44,42,1)]">
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

          <div className="card bg-white border-2 border-roach-ink shadow-[4px_4px_0_0_rgba(44,44,42,1)]">
            <h2 className="text-xl font-bold mb-4 border-b-2 border-roach-ink pb-2">Bio</h2>
            <p className="font-mono whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
              {profile.bio || "This roach is too busy building to write a bio."}
            </p>
          </div>
        </div>

        {/* Satirical Achievement Badge System */}
        <div className="card bg-white border-2 border-roach-ink shadow-[4px_4px_0_0_rgba(44,44,42,1)]">
          <h2 className="text-xl font-bold mb-2 border-b-2 border-roach-ink pb-2 font-mono uppercase text-roach-ink">
            Satirical Achievements ({BADGES.filter(b => b.check(profile, milestones)).length} / {BADGES.length})
          </h2>
          <p className="text-[10px] font-mono text-roach-muted mb-6">
            Hover over locked medals to discover their unlock conditions. Earn +100 Colony points to rank up!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {BADGES.map(badge => {
              const isUnlocked = badge.check(profile, milestones);
              return (
                <div 
                  key={badge.id}
                  title={`Requirements: ${badge.requirement}`}
                  className={`badge-card card border-2 p-4 flex flex-col justify-between relative group ${
                    isUnlocked 
                      ? "border-roach-green bg-roach-green/5 glow-neon-green" 
                      : "border-gray-300 bg-gray-50 opacity-60 filter grayscale"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-2xl">{badge.icon}</span>
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 border rounded uppercase ${
                        isUnlocked ? "border-roach-green text-roach-green-dark bg-green-50" : "border-gray-400 text-gray-500"
                      }`}>
                        {isUnlocked ? "Unlocked" : "Locked"}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-roach-ink font-mono mb-1">{badge.name}</h3>
                    <p className="text-[10px] font-mono text-roach-muted leading-tight">{badge.description}</p>
                  </div>
                  
                  {/* Satirical requirements tooltip overlays */}
                  <div className="absolute inset-0 bg-roach-ink/95 text-white p-3 font-mono text-[9px] flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none rounded">
                    <p className="font-bold text-roach-green uppercase mb-1">🔑 Unlock Requirements</p>
                    <p className="text-[10px]">{badge.requirement}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Spite Milestone Timeline Section */}
        <div className="card bg-white border-2 border-roach-ink shadow-[4px_4px_0_0_rgba(44,44,42,1)] pt-6 pb-12">
          <div className="border-b-2 border-roach-ink pb-2 mb-8 flex justify-between items-center">
            <h2 className="text-xl font-bold font-mono uppercase text-roach-ink">
              Spite Milestone Timeline 📈
            </h2>
            <span className="text-xs font-mono bg-roach-surface border border-roach-ink px-2.5 py-1 rounded font-bold text-roach-muted">
              {milestones.length} Spites Logged
            </span>
          </div>

          {milestones.length === 0 ? (
            <div className="text-center py-10 font-mono text-roach-muted">
              You haven't logged any spite milestones yet. Life is peaceful? Impressive.
            </div>
          ) : (
            <div className="relative">
              {/* Vertical connector line */}
              <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-1 bg-roach-ink -translate-x-1/2 z-0" />

              <div className="space-y-12">
                {milestones.map((ms, idx) => {
                  const isExpanded = expandedCard[ms.id];
                  const isEven = idx % 2 === 0;

                  return (
                    <div 
                      key={ms.id} 
                      className={`relative flex flex-col md:flex-row items-start md:items-center w-full z-10 ${
                        isEven ? "md:justify-start" : "md:justify-end"
                      }`}
                    >
                      {/* Interactive glowing vertical connector node */}
                      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-6 h-6 bg-roach-green border-4 border-roach-ink rounded-full flex items-center justify-center shadow-[0_0_10px_#22c55e] z-20">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                      </div>

                      {/* Timeline Card */}
                      <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${
                        isEven ? "md:pr-8" : "md:pl-8"
                      }`}>
                        <div 
                          onClick={() => toggleCard(ms.id)}
                          className="card bg-white border-2 border-roach-ink shadow-[4px_4px_0_0_rgba(44,44,42,1)] hover:shadow-[6px_6px_0_0_rgba(44,44,42,1)] transition-all cursor-pointer p-4 group"
                        >
                          <div className="flex justify-between items-start mb-2 font-mono">
                            <span className="text-[10px] text-roach-muted font-bold">{ms.date}</span>
                            <span className="text-[9px] bg-roach-coral/10 border border-roach-coral/30 px-2 py-0.5 rounded text-roach-coral font-bold uppercase">
                              {ms.category}
                            </span>
                          </div>

                          <h3 className="font-bold text-md text-roach-ink font-mono mb-2 group-hover:text-roach-coral transition-colors flex items-center gap-1.5">
                            {ms.title}
                          </h3>

                          <p className={`font-mono text-xs leading-relaxed text-gray-700 ${
                            isExpanded ? "" : "line-clamp-2"
                          }`}>
                            {ms.description}
                          </p>

                          {ms.badge && (
                            <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono font-bold text-roach-green-dark border-t border-roach-ink/5 pt-2">
                              <span>Unlocked Badge:</span>
                              <span className="bg-roach-green/10 border border-roach-green/30 px-2 py-0.5 rounded uppercase">
                                {ms.badge}
                              </span>
                            </div>
                          )}

                          <div className="mt-2 text-right">
                            <span className="text-[9px] font-mono text-roach-muted font-bold underline">
                              {isExpanded ? "Collapse info" : "Read spite detail"}
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          )}
        </div>

      </div>

      {/* Owner Add Spite Milestone Pop-up Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-roach-surface border-4 border-roach-ink p-6 md:p-8 max-w-lg w-full shadow-[8px_8px_0_0_rgba(44,44,42,1)] relative transition-all">
            
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-2xl font-black font-mono border-2 border-roach-ink w-8 h-8 flex items-center justify-center hover:bg-roach-coral hover:text-white transition-colors"
            >
              ×
            </button>

            <h2 className="font-bold text-2xl mb-2 font-mono uppercase text-roach-ink border-b-2 border-roach-ink pb-2">
              Log Spite Milestone
            </h2>
            <p className="text-[10px] font-mono text-roach-muted mb-6 uppercase">
              Add a humorous, spite-fueled milestone that details your personal grit.
            </p>

            <form onSubmit={handleAddMilestone} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold font-mono uppercase text-roach-muted mb-1">Title:</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Ghosted by Startup" 
                    value={newMilestone.title}
                    onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                    className="w-full p-2 border-2 border-roach-ink rounded font-mono text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold font-mono uppercase text-roach-muted mb-1">Date:</label>
                  <input 
                    required
                    type="date" 
                    value={newMilestone.date}
                    onChange={(e) => setNewMilestone({ ...newMilestone, date: e.target.value })}
                    className="w-full p-2 border-2 border-roach-ink rounded font-mono text-sm bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold font-mono uppercase text-roach-muted mb-1">Category:</label>
                  <select 
                    value={newMilestone.category}
                    onChange={(e) => setNewMilestone({ ...newMilestone, category: e.target.value })}
                    className="w-full p-2 border-2 border-roach-ink rounded font-mono text-sm bg-white"
                  >
                    <option>Career</option>
                    <option>Development</option>
                    <option>Social</option>
                    <option>Survival</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold font-mono uppercase text-roach-muted mb-1">Reward Emblem Tag:</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 🏆 Ghost Buster" 
                    value={newMilestone.badge}
                    onChange={(e) => setNewMilestone({ ...newMilestone, badge: e.target.value })}
                    className="w-full p-2 border-2 border-roach-ink rounded font-mono text-sm bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold font-mono uppercase text-roach-muted mb-1">Spite Narrative Narrative:</label>
                <textarea 
                  required
                  rows={3}
                  maxLength={250}
                  placeholder="Uncle called me a parasite, so I sat in my room for 15 hours and built a high-speed parser in pure vanilla JS." 
                  value={newMilestone.description}
                  onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                  className="w-full p-2 border-2 border-roach-ink rounded font-mono text-sm bg-white resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary flex-1 py-2 font-mono font-bold text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary flex-1 py-2 font-mono font-bold text-sm bg-roach-ink text-white"
                >
                  Save Spite
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}