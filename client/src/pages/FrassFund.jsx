import { useState, useEffect } from "react";
import axios from "axios";
import { COPY } from "../utils/roachCopy";

export default function FrassFund() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/frass`)
      .then(res => setProposals(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20 font-mono">{COPY.loading}</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 ">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Frass Fund</h1>
        <p className="font-mono text-roach-muted max-w-xl mx-auto">
          Community micro-grants for server costs, domain names, or coffee. Funded by the swarm, distributed by votes.
        </p>
      </div>

      {proposals.length === 0 ? (
        <div className="card text-center py-12 font-mono">
          No proposals in voting right now.
        </div>
      ) : (
        <div className="space-y-6">
          {proposals.map(proposal => (
            <div key={proposal._id} className="card flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-2">Fund: {proposal.purpose}</h3>
                <p className="text-sm font-mono text-roach-muted mb-2">Requested by: {proposal.proposedBy?.alias}</p>
                <div className="text-2xl font-bold text-roach-green">₹{proposal.amountRequested}</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="text-xl font-bold">{proposal.voteCount} Votes</div>
                <button className="btn-secondary">Vote</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}