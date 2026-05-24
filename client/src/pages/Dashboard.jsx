import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { COPY } from "../utils/roachCopy";

export default function Dashboard() {
  const { user } = useAuth();
  const [deals, setDeals] = useState([]);
  const [loadingDeals, setLoadingDeals] = useState(true);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/moult/deals`, { withCredentials: true });
      setDeals(res.data);
    } catch (err) {
      console.error("Failed to fetch barter deals:", err);
    } finally {
      setLoadingDeals(false);
    }
  };

  const handleAccept = async (dealId) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/moult/deals/${dealId}/accept`, {}, { withCredentials: true });
      toast.success("Barter swap proposal accepted!");
      fetchDeals();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to accept proposal.");
    }
  };

  const handleDecline = async (dealId) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/moult/deals/${dealId}/decline`, {}, { withCredentials: true });
      toast.success("Barter swap proposal declined.");
      fetchDeals();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to decline proposal.");
    }
  };

  const handleConfirm = async (dealId) => {
    try {
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/moult/deals/${dealId}/confirm`, {}, { withCredentials: true });
      
      if (res.data.status === "completed") {
        toast.success("💥 SWAP COMPLETED! +100 Colony Points Awarded!");
        // Reload page to sync the main user points strip in context
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.success("Barter completion confirmed! Waiting for partner... ⏳");
      }
      fetchDeals();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to confirm deal completion.");
    }
  };

  // Group deals cleanly
  const incomingProposals = deals.filter(d => d.recipient?._id === user?._id && d.status === "proposed");
  const outgoingProposals = deals.filter(d => d.sender?._id === user?._id && d.status === "proposed");
  const activeSwaps = deals.filter(d => d.status === "accepted");
  const completedHistory = deals.filter(d => ["completed", "declined", "cancelled"].includes(d.status));

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      
      {/* Dashboard Welcome Strip */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 border-b-2 border-roach-ink pb-4">
        <div>
          <h1 className="text-4xl font-bold mb-2 font-mono">Welcome to the Colony, {user?.alias}</h1>
          <p className="font-mono text-roach-muted">Rank: {user?.rank} | Points: {user?.colonyPoints}</p>
        </div>
        <Link to="/anthill" className="btn-primary w-full md:w-auto text-center">Post an Anthill</Link>
      </div>

      {/* Top Feature Grids */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="card bg-roach-green-light flex flex-col justify-between border-2 border-roach-ink">
          <h3 className="font-bold text-xl mb-4">The Anthill</h3>
          <p className="font-mono text-sm mb-6">Find a team and build a project together.</p>
          <Link to="/anthill" className="btn-secondary text-center block">Browse Projects</Link>
        </div>
        <div className="card bg-roach-purple-light flex flex-col justify-between border-2 border-roach-ink">
          <h3 className="font-bold text-xl mb-4">Moult Market</h3>
          <p className="font-mono text-sm mb-6">Swap your skills directly with other roaches.</p>
          <Link to="/moult" className="btn-secondary text-center block">Find Skills</Link>
        </div>
        <div className="card bg-roach-amber-light flex flex-col justify-between border-2 border-roach-ink">
          <h3 className="font-bold text-xl mb-4">Movement Builds</h3>
          <p className="font-mono text-sm mb-6">Projects aligned with Cockroach4India demands.</p>
          <Link to="/movement" className="btn-secondary text-center block">View Movement</Link>
        </div>
      </div>

      {/* Moult Swaps Hub */}
      <div className="border-t-4 border-roach-ink pt-8">
        <h2 className="text-3xl font-bold mb-2 font-mono uppercase text-roach-ink">
          Moult Swaps Hub 🤝
        </h2>
        <p className="font-mono text-xs text-roach-muted mb-8">
          Manage your skill trades, approve incoming barters, and mutually sign off to claim +100 Colony Points.
        </p>

        {loadingDeals ? (
          <div className="text-center py-10 font-mono text-roach-muted">
            Analyzing barter logs...
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* 1. Incoming Swaps */}
            <div>
              <h3 className="text-lg font-bold font-mono uppercase text-roach-coral mb-4 border-b border-roach-ink pb-1">
                📥 Incoming Swap Proposals ({incomingProposals.length})
              </h3>
              {incomingProposals.length === 0 ? (
                <div className="card bg-roach-surface text-center py-6 font-mono text-sm text-roach-muted border-2 border-roach-ink">
                  No incoming barters at the moment.
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {incomingProposals.map(deal => (
                    <div key={deal._id} className="card bg-white border-2 border-roach-ink shadow-[4px_4px_0_0_rgba(44,44,42,1)] p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-mono font-bold text-roach-green">From: @{deal.sender?.alias}</span>
                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 border border-amber-400 bg-amber-50 text-amber-700 font-bold rounded">Proposed</span>
                        </div>
                        <div className="space-y-2 mb-4">
                          <p className="text-sm font-mono"><strong className="text-roach-coral">They offer you:</strong> {deal.senderOfferedSkill}</p>
                          <p className="text-sm font-mono"><strong className="text-roach-green-dark">They request from you:</strong> {deal.recipientOfferedSkill}</p>
                          {deal.message && (
                            <p className="text-xs font-mono italic text-roach-muted bg-roach-surface p-2 border border-roach-ink/10 rounded mt-2">
                              "{deal.message}"
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 border-t border-roach-ink/10 pt-3 mt-2">
                        <button 
                          onClick={() => handleDecline(deal._id)}
                          className="btn-secondary py-1 text-xs font-mono flex-1 border-roach-coral text-roach-coral hover:bg-roach-coral hover:text-white"
                        >
                          Decline
                        </button>
                        <button 
                          onClick={() => handleAccept(deal._id)}
                          className="btn-primary py-1 text-xs font-mono flex-1 bg-roach-green border-roach-green text-white hover:bg-roach-green-dark"
                        >
                          Accept Trade
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Outgoing Swaps */}
            <div>
              <h3 className="text-lg font-bold font-mono uppercase text-roach-green mb-4 border-b border-roach-ink pb-1">
                📤 Sent Swap Proposals ({outgoingProposals.length})
              </h3>
              {outgoingProposals.length === 0 ? (
                <div className="card bg-roach-surface text-center py-6 font-mono text-sm text-roach-muted border-2 border-roach-ink">
                  You haven't proposed any barters yet. Go pitch to other roaches!
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {outgoingProposals.map(deal => (
                    <div key={deal._id} className="card bg-white border-2 border-roach-ink shadow-[4px_4px_0_0_rgba(44,44,42,1)] p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-mono font-bold text-roach-muted">To: @{deal.recipient?.alias}</span>
                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 border border-amber-400 bg-amber-50 text-amber-700 font-bold rounded animate-pulse">Pending Review</span>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-mono"><strong className="text-roach-green-dark">You offered:</strong> {deal.senderOfferedSkill}</p>
                          <p className="text-sm font-mono"><strong className="text-roach-coral">You requested:</strong> {deal.recipientOfferedSkill}</p>
                          {deal.message && (
                            <p className="text-xs font-mono italic text-roach-muted bg-roach-surface p-2 border border-roach-ink/10 rounded mt-2">
                              "{deal.message}"
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Active Trades */}
            <div>
              <h3 className="text-lg font-bold font-mono uppercase text-roach-ink mb-4 border-b border-roach-ink pb-1">
                🔥 Active Swaps in Progress ({activeSwaps.length})
              </h3>
              {activeSwaps.length === 0 ? (
                <div className="card bg-roach-surface text-center py-6 font-mono text-sm text-roach-muted border-2 border-roach-ink">
                  No active barters. Accept a proposal or wait for response to initiate!
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {activeSwaps.map(deal => {
                    const isSender = deal.sender?._id === user?._id;
                    const selfConfirmed = isSender ? deal.senderConfirmed : deal.recipientConfirmed;
                    const partnerConfirmed = isSender ? deal.recipientConfirmed : deal.senderConfirmed;
                    const partnerAlias = isSender ? deal.recipient?.alias : deal.sender?.alias;

                    return (
                      <div key={deal._id} className="card bg-white border-2 border-roach-ink shadow-[6px_6px_0_0_rgba(44,44,42,1)] p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-mono font-bold text-roach-ink">Trading partner: @{partnerAlias}</span>
                            <span className="text-[10px] uppercase font-mono px-2 py-0.5 border border-green-400 bg-green-50 text-green-700 font-bold rounded">Accepted</span>
                          </div>
                          <div className="space-y-2 mb-4">
                            <p className="text-sm font-mono"><strong className="text-roach-green-dark">Your task:</strong> {isSender ? deal.senderOfferedSkill : deal.recipientOfferedSkill}</p>
                            <p className="text-sm font-mono"><strong className="text-roach-coral">Their task:</strong> {isSender ? deal.recipientOfferedSkill : deal.senderOfferedSkill}</p>
                          </div>
                          
                          {/* Mutual Confirmation Flow */}
                          <div className="bg-roach-surface p-3 border-2 border-roach-ink rounded space-y-1 text-xs font-mono mb-4">
                            <p className="font-bold border-b border-roach-ink/10 pb-1 mb-1 text-roach-ink uppercase text-[10px]">Dual Sign-off Progress</p>
                            <div className="flex justify-between items-center">
                              <span>You signed off:</span>
                              <span className={selfConfirmed ? "text-roach-green font-bold" : "text-roach-muted"}>
                                {selfConfirmed ? "✓ Completed" : "⏳ Pending"}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>@{partnerAlias} signed off:</span>
                              <span className={partnerConfirmed ? "text-roach-green font-bold" : "text-roach-muted"}>
                                {partnerConfirmed ? "✓ Completed" : "⏳ Pending"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button 
                          onClick={() => handleConfirm(deal._id)}
                          disabled={selfConfirmed}
                          className="btn-primary w-full py-2 font-mono font-bold text-xs bg-roach-ink text-white disabled:opacity-50"
                        >
                          {selfConfirmed ? "Waiting for Partner Confirmation..." : "Confirm Moult"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 4. Swaps History */}
            <div>
              <h3 className="text-lg font-bold font-mono uppercase text-roach-muted mb-4 border-b border-roach-ink pb-1">
                🗄️ Swaps History & Records ({completedHistory.length})
              </h3>
              {completedHistory.length === 0 ? (
                <div className="card bg-roach-surface text-center py-6 font-mono text-sm text-roach-muted border-2 border-roach-ink">
                  History is empty. Get bartering to stock your registry.
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {completedHistory.map(deal => {
                    const isSender = deal.sender?._id === user?._id;
                    const partnerAlias = isSender ? deal.recipient?.alias : deal.sender?.alias;
                    
                    let statusLabel = deal.status;
                    let badgeClass = "border-roach-ink bg-roach-surface text-roach-ink";
                    
                    if (deal.status === "completed") {
                      statusLabel = "Completed Swapped";
                      badgeClass = "border-indigo-400 bg-indigo-50 text-indigo-700";
                    } else if (deal.status === "declined") {
                      statusLabel = "Declined";
                      badgeClass = "border-red-400 bg-red-50 text-red-700";
                    }

                    return (
                      <div key={deal._id} className="card bg-white border-2 border-roach-ink opacity-80 hover:opacity-100 transition-opacity p-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-mono font-bold text-roach-muted">Partner: @{partnerAlias}</span>
                          <span className={`text-[10px] uppercase font-mono px-2 py-0.5 border font-bold rounded ${badgeClass}`}>
                            {statusLabel}
                          </span>
                        </div>
                        <div className="space-y-1 font-mono text-xs text-roach-muted">
                          <p><strong>Offered:</strong> {deal.senderOfferedSkill}</p>
                          <p><strong>Requested:</strong> {deal.recipientOfferedSkill}</p>
                          {deal.status === "completed" && (
                            <p className="text-roach-green font-bold mt-2 text-[10px] uppercase">
                              ★ +100 Colony Points Swapped Successfully!
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        )}
      </div>

    </div>
  );
}