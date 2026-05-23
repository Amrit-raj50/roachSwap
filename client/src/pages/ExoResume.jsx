import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { COPY } from "../utils/roachCopy";

export default function ExoResume() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Exporter & Sharing states
  const [exporting, setExporting] = useState(false);
  const [shareText, setShareText] = useState("Share ExoResume");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}/exoresume`)
      .then(res => setProfile(res.data))
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
        backgroundColor: "#F1EFE8" // Keep app warm-white background
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
      // Use native device mobile share manager
      navigator.share({
        title: `${profile.name}'s Chitinous ExoResume`,
        text: `Check out ${profile.alias}'s spite-driven development rank, points, and peer achievements on roachSwap!`,
        url: window.location.href
      })
      .then(() => toast.success("Shared successfully! 🚀"))
      .catch((err) => {
        if (err.name !== "AbortError") {
          toast.error("Failed to share.");
        }
      });
    } else {
      // Fallback copy to clipboard for desktop browsers
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

  if (loading) return <div className="text-center py-20 font-mono">{COPY.loading}</div>;
  if (error || !profile) return <div className="text-center py-20 font-mono">{COPY.error_not_found}</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      
      {/* ExoResume Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-roach-surface border-2 border-roach-ink p-4 shadow-[4px_4px_0_0_rgba(44,44,42,1)]">
        <div>
          <h2 className="font-bold text-lg uppercase font-mono">ExoResume Dashboard</h2>
          <p className="text-xs font-mono text-roach-muted">Export or broadcast your spite-development credentials.</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
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
      <div id="exoresume-card-container" className="bg-roach-surface border-4 border-roach-ink p-6 min-[320px]:p-8 shadow-[8px_8px_0_0_rgba(44,44,42,1)]">
        
        {/* Profile Card Header Banner */}
        <div className="card bg-roach-ink text-roach-surface border-none mb-8 relative overflow-hidden">
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
          <div className="card bg-white border-2 border-roach-ink">
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

          <div className="card bg-white border-2 border-roach-ink">
            <h2 className="text-xl font-bold mb-4 border-b-2 border-roach-ink pb-2">Bio</h2>
            <p className="font-mono whitespace-pre-wrap">
              {profile.bio || "This roach is too busy building to write a bio."}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}