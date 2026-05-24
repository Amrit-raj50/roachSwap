import { useState, useEffect } from "react";
import axios from "axios";
import { COPY } from "../utils/roachCopy";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function MoultMarket() {
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Create Skill List Form States
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ offering: "", wantingIn: "", availability: "Flexible" });

  // Barter Proposal Modal States
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [senderOfferedSkill, setSenderOfferedSkill] = useState("");
  const [recipientOfferedSkill, setRecipientOfferedSkill] = useState("");
  const [proposalMessage, setProposalMessage] = useState("");
  const [submittingProposal, setSubmittingProposal] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/skills`)
      .then(res => setSkills(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/skills`, formData);
      toast.success("Skill swap listed.");
      setShowForm(false);
      fetchSkills();
    } catch (err) {
      toast.error(err.response?.data?.message || COPY.error_generic);
    }
  };

  // Open proposal modal and prefill trading defaults dynamically
  const handleOpenProposal = (skill) => {
    if (!user) {
      toast.error("Please log in to propose a skill swap!");
      return;
    }
    if (user._id === skill.offeredBy?._id) {
      toast.error("You cannot trade skills with yourself, stubborn roach!");
      return;
    }
    
    setSelectedSkill(skill);
    // Prefill: offer them what they want, and request what they are offering!
    setSenderOfferedSkill(skill.wantingIn || "");
    setRecipientOfferedSkill(skill.offering || "");
    setProposalMessage("");
  };

  // Submit barter swap to the server
  const handleSendProposal = async (e) => {
    e.preventDefault();
    if (!senderOfferedSkill.trim() || !recipientOfferedSkill.trim()) {
      toast.error("Please fill in both offered and requested skills.");
      return;
    }

    setSubmittingProposal(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/moult/deals`, 
        {
          recipientId: selectedSkill.offeredBy._id,
          senderOfferedSkill,
          recipientOfferedSkill,
          message: proposalMessage
        },
        { withCredentials: true }
      );
      toast.success("Barter proposal sent! Check your Dashboard Swaps Hub.");
      setSelectedSkill(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit swap proposal.");
    } finally {
      setSubmittingProposal(false);
    }
  };

  if (loading) return <div className="text-center py-20 font-mono">{COPY.loading}</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 border-b-2 border-roach-ink pb-4">
        <div>
          <h1 className="text-4xl font-bold mb-2 font-mono">MOULT MARKET</h1>
          <p className="font-mono text-roach-muted">Barter your skills directly. No transaction fees. No capital required.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary w-full md:w-auto">
          {showForm ? "Cancel" : "List a Swap"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card bg-roach-surface mb-8 space-y-4 shadow-[4px_4px_0_0_rgba(44,44,42,1)] border-2 border-roach-ink">
          <h2 className="font-bold text-xl mb-4 font-mono">POST A SKILL SWAP</h2>
          <div>
            <label className="block text-sm font-bold font-mono">I can offer (My skills)</label>
            <input required value={formData.offering} onChange={e => setFormData({...formData, offering: e.target.value})} placeholder="e.g. React, CSS layout tuning" className="mt-1 w-full p-2 border-2 border-roach-ink rounded font-mono" />
          </div>
          <div>
            <label className="block text-sm font-bold font-mono">I want in return (Seeking)</label>
            <input required value={formData.wantingIn} onChange={e => setFormData({...formData, wantingIn: e.target.value})} placeholder="e.g. Node.js APIs, Docker configs" className="mt-1 w-full p-2 border-2 border-roach-ink rounded font-mono" />
          </div>
          <div>
            <label className="block text-sm font-bold font-mono">Availability</label>
            <select value={formData.availability} onChange={e => setFormData({...formData, availability: e.target.value})} className="mt-1 w-full p-2 border-2 border-roach-ink rounded font-mono bg-white">
              <option>Flexible</option>
              <option>Weekends only</option>
              <option>Evenings IST</option>
            </select>
          </div>
          <button type="submit" className="btn-primary w-full">List Swap</button>
        </form>
      )}

      {skills.length === 0 ? (
        <div className="card text-center py-12 font-mono border-2 border-roach-ink shadow-[4px_4px_0_0_rgba(44,44,42,1)]">
          {COPY.empty_skills}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {skills.map(skill => {
            const isOwnListing = user?._id === skill.offeredBy?._id;
            return (
              <div key={skill._id} className="card flex flex-col border-2 border-roach-ink hover:shadow-[6px_6px_0_0_rgba(44,44,42,1)] transition-shadow bg-white">
                <div className="mb-4">
                  <span className="text-xs font-bold font-mono text-roach-muted uppercase">Offering</span>
                  <p className="font-bold text-lg text-roach-green-dark">{skill.offering}</p>
                </div>
                <div className="mb-6">
                  <span className="text-xs font-bold font-mono text-roach-muted uppercase">Wanting</span>
                  <p className="font-bold text-lg text-roach-coral">{skill.wantingIn}</p>
                </div>
                <div className="mt-auto flex justify-between items-center text-sm font-mono border-t-2 border-roach-ink pt-4">
                  <span>By: {skill.offeredBy?.alias} {isOwnListing && <span className="text-xs text-roach-muted">(You)</span>}</span>
                  {isOwnListing ? (
                    <span className="text-xs bg-roach-muted/20 px-2.5 py-1 rounded text-roach-muted border border-roach-ink/20">Own Listing</span>
                  ) : (
                    <button 
                      onClick={() => handleOpenProposal(skill)}
                      className="bg-roach-ink text-white px-3 py-1 rounded hover:bg-roach-coral hover:text-white border-2 border-roach-ink font-bold transition-all text-xs"
                    >
                      Propose Swap
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Propose Moult Swap Glassmorphic Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-roach-surface border-4 border-roach-ink p-6 md:p-8 max-w-lg w-full shadow-[8px_8px_0_0_rgba(44,44,42,1)] relative transition-all">
            <button 
              onClick={() => setSelectedSkill(null)}
              className="absolute top-4 right-4 text-2xl font-black font-mono border-2 border-roach-ink w-8 h-8 flex items-center justify-center hover:bg-roach-coral hover:text-white transition-colors"
            >
              ×
            </button>
            <h2 className="font-bold text-2xl mb-2 font-mono uppercase text-roach-ink border-b-2 border-roach-ink pb-2">
              Propose Moult Swap
            </h2>
            <p className="text-xs font-mono text-roach-muted mb-6">
              Initiating a secure barter trade deal with <strong className="text-roach-coral">@{selectedSkill.offeredBy?.alias}</strong>.
            </p>

            <form onSubmit={handleSendProposal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold font-mono uppercase text-roach-muted mb-1">
                  Skill I am offering to them:
                </label>
                <input 
                  required
                  type="text"
                  value={senderOfferedSkill}
                  onChange={e => setSenderOfferedSkill(e.target.value)}
                  placeholder="e.g. React Form components"
                  className="w-full p-2 border-2 border-roach-ink rounded font-mono text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold font-mono uppercase text-roach-muted mb-1">
                  Skill I want in return from them:
                </label>
                <input 
                  required
                  type="text"
                  value={recipientOfferedSkill}
                  onChange={e => setRecipientOfferedSkill(e.target.value)}
                  placeholder="e.g. Graphic Logo Asset"
                  className="w-full p-2 border-2 border-roach-ink rounded font-mono text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold font-mono uppercase text-roach-muted mb-1">
                  Proposal Note / Pitch (Optional):
                </label>
                <textarea 
                  value={proposalMessage}
                  onChange={e => setProposalMessage(e.target.value)}
                  maxLength={300}
                  rows={3}
                  placeholder="I will build your React forms in exchange for your UI logo design."
                  className="w-full p-2 border-2 border-roach-ink rounded font-mono text-sm bg-white resize-none"
                />
                <span className="block text-right text-[10px] font-mono text-roach-muted mt-1">
                  {proposalMessage.length}/300 chars
                </span>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setSelectedSkill(null)}
                  className="btn-secondary flex-1 py-2 font-mono font-bold text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={submittingProposal}
                  className="btn-primary flex-1 py-2 font-mono font-bold text-sm bg-roach-ink text-white disabled:opacity-50"
                >
                  {submittingProposal ? "Submitting..." : "Send Proposal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}