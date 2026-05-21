import { useState, useEffect } from "react";
import axios from "axios";
import { COPY } from "../utils/roachCopy";

export default function HiveMind() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/hivemind/mentors`)
      .then(res => setMentors(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20 font-mono">{COPY.loading}</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 ">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">HiveMind Sessions</h1>
        <p className="font-mono text-roach-muted">Get peer mentorship from roaches who have shipped before.</p>
      </div>

      {mentors.length === 0 ? (
        <div className="card text-center py-12 font-mono">
          No mentors available right now. The colony is busy.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {mentors.map(mentor => (
            <div key={mentor._id} className="card">
              <h3 className="font-bold text-xl mb-2">{mentor.alias}</h3>
              <p className="text-sm font-mono text-roach-muted mb-4">Rank: {mentor.rank}</p>
              <div className="mb-4">
                <span className="text-xs font-bold font-mono text-roach-muted uppercase block mb-1">Expertise</span>
                <div className="flex flex-wrap gap-2">
                  {mentor.mentorExpertise?.map(exp => (
                    <span key={exp} className="bg-roach-surface border-2 border-roach-ink px-2 py-1 rounded text-xs font-bold font-mono">{exp}</span>
                  ))}
                </div>
              </div>
              <button className="btn-primary w-full mt-4">Book Session</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}