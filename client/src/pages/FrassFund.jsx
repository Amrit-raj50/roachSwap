import { useState, useEffect } from "react";
import axios from "axios";
import { COPY } from "../utils/roachCopy";
import toast from "react-hot-toast";

export default function FrassFund() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amountRequested: "",
    purpose: ""
  });
  const [submitting, setSubmitting] = useState(false);

  // Retrieve auth token from localStorage for protected actions
  const token = localStorage.getItem("token") || localStorage.getItem("roachToken");

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/frass`)
      .then(res => setProposals(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleVote = async (id) => {
    if (!token) return toast.error("You must be logged in to vote");
    
    // Optimistic Update
    setProposals(prev => prev.map(p => {
      if (p._id === id) {
        return { ...p, voteCount: p.voteCount + 1, hasVoted: true };
      }
      return p;
    }));

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/frass/${id}/vote`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Vote cast successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to vote");
      // Revert optimistic update on failure
      fetchProposals();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("You must be logged in to submit a proposal");
    
    setSubmitting(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/frass`, {
        ...formData,
        amountRequested: Number(formData.amountRequested)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success("Proposal submitted successfully!");
      // Prepend to list without full refetch
      setProposals(prev => [res.data, ...prev]);
      setIsModalOpen(false);
      setFormData({ title: "", description: "", amountRequested: "", purpose: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit proposal");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-20 font-mono">{COPY.loading}</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 relative">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter text-roach-ink">Frass Fund</h1>
        <p className="font-mono text-roach-muted max-w-xl mx-auto text-lg mb-10">
          Community micro-grants for server costs, domains, or coffee. Funded by the swarm, distributed by votes.
        </p>
        <button 
          onClick={() => {
            if(!token) {
              toast.error("Please login to submit a proposal");
              return;
            }
            setIsModalOpen(true);
          }}
          className="bg-roach-green text-roach-ink font-black font-mono px-8 py-4 uppercase tracking-widest text-lg border-4 border-roach-ink shadow-[8px_8px_0_0_rgba(44,44,42,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          Submit Proposal
        </button>
      </div>

      {proposals.length === 0 ? (
        <div className="card text-center py-12 font-mono border-4 border-dashed border-roach-muted">
          No proposals in voting right now. Be the first to request funds!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {proposals.map(proposal => (
            <div key={proposal._id} className="bg-white border-4 border-roach-ink rounded-xl p-6 shadow-[8px_8px_0_0_rgba(44,44,42,1)] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2">
              <div>
                <div className="flex justify-between items-start mb-4 gap-4">
                  <h3 className="font-black text-2xl uppercase tracking-tight text-roach-ink line-clamp-2">{proposal.title || proposal.purpose}</h3>
                  <div className="text-2xl font-black text-roach-green bg-roach-green/10 px-3 py-1 rounded border-2 border-roach-green flex-shrink-0">₹{proposal.amountRequested}</div>
                </div>
                {proposal.description && <p className="text-roach-ink/80 mb-4 font-mono text-sm line-clamp-3">{proposal.description}</p>}
                
                <div className="flex items-center gap-2 mb-6">
                  <span className="bg-roach-amber-light px-2 py-1 border-2 border-roach-ink font-mono text-xs font-bold uppercase">{proposal.purpose}</span>
                  <span className="text-xs font-mono font-bold text-roach-muted uppercase tracking-wider">By <span className="text-roach-coral">{proposal.proposedBy?.alias || 'Unknown'}</span></span>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t-4 border-roach-ink pt-6 mt-auto">
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-black text-roach-ink">{proposal.voteCount}</span>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-roach-muted leading-tight">Votes<br/>Cast</span>
                </div>
                <button 
                  onClick={() => handleVote(proposal._id)}
                  disabled={proposal.hasVoted}
                  className={`font-mono font-bold uppercase tracking-widest px-8 py-3 border-4 transition-all ${proposal.hasVoted ? 'bg-roach-green text-white border-roach-green shadow-[0_0_20px_rgba(0,255,0,0.4)] cursor-not-allowed scale-105' : 'bg-roach-ink text-white border-roach-ink hover:bg-roach-coral hover:border-roach-coral shadow-[4px_4px_0_0_rgba(44,44,42,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1'}`}
                >
                  {proposal.hasVoted ? 'Voted' : 'Vote'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submission Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-roach-ink/80 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
          <div className="bg-white border-4 border-roach-ink rounded-xl w-full max-w-2xl shadow-[12px_12px_0_0_rgba(44,44,42,1)] overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="bg-roach-amber-light border-b-4 border-roach-ink p-6 flex justify-between items-center sticky top-0 z-10">
              <h2 className="text-3xl font-black uppercase tracking-tight text-roach-ink">Submit Proposal</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-3xl font-black hover:text-roach-coral transition-colors w-8 h-8 flex items-center justify-center border-2 border-transparent hover:border-roach-coral rounded">X</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block font-mono font-bold text-sm mb-2 uppercase tracking-widest">Proposal Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full border-4 border-roach-ink rounded p-3 font-mono focus:outline-none focus:ring-4 focus:ring-roach-green/50 transition-shadow"
                  placeholder="e.g., Domain renewal for next year"
                />
              </div>
              
              <div>
                <label className="block font-mono font-bold text-sm mb-2 uppercase tracking-widest">Short Description</label>
                <textarea 
                  required
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full border-4 border-roach-ink rounded p-3 font-mono h-24 resize-none focus:outline-none focus:ring-4 focus:ring-roach-green/50 transition-shadow"
                  placeholder="Why does the colony need this?"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono font-bold text-sm mb-2 uppercase tracking-widest">Amount (₹)</label>
                  <input 
                    type="number" 
                    required
                    min="1"
                    value={formData.amountRequested}
                    onChange={e => setFormData({...formData, amountRequested: e.target.value})}
                    className="w-full border-4 border-roach-ink rounded p-3 font-mono focus:outline-none focus:ring-4 focus:ring-roach-green/50 transition-shadow"
                    placeholder="500"
                  />
                </div>
                <div>
                  <label className="block font-mono font-bold text-sm mb-2 uppercase tracking-widest">Category / Tag</label>
                  <input 
                    type="text" 
                    required
                    value={formData.purpose}
                    onChange={e => setFormData({...formData, purpose: e.target.value})}
                    className="w-full border-4 border-roach-ink rounded p-3 font-mono focus:outline-none focus:ring-4 focus:ring-roach-green/50 transition-shadow"
                    placeholder="Infrastructure, Marketing, etc."
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="font-mono font-bold uppercase px-6 py-3 border-4 border-roach-ink hover:bg-roach-muted/20 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={submitting}
                  className="font-mono font-bold uppercase px-8 py-3 border-4 border-roach-ink bg-roach-green text-roach-ink shadow-[4px_4px_0_0_rgba(44,44,42,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit to Swarm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}