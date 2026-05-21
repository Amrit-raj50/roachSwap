import { useState, useEffect } from "react";
import axios from "axios";
import { COPY } from "../utils/roachCopy";
import toast from "react-hot-toast";

export default function MoultMarket() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ offering: "", wantingIn: "", availability: "Flexible" });

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
      toast.error(COPY.error_generic);
    }
  };

  if (loading) return <div className="text-center py-20 font-mono">{COPY.loading}</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 border-b-2 border-roach-ink pb-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Moult Market</h1>
          <p className="font-mono text-roach-muted">Swap skills directly. No money required.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary w-full md:w-auto">
          {showForm ? "Cancel" : "List a Swap"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card bg-roach-surface mb-8 space-y-4">
          <h2 className="font-bold text-xl mb-4">Post a Skill Swap</h2>
          <div>
            <label className="block text-sm font-bold">I can offer (My skills)</label>
            <input required value={formData.offering} onChange={e => setFormData({...formData, offering: e.target.value})} placeholder="e.g. React, UI Design" className="mt-1 w-full p-2 border-2 border-roach-ink rounded font-mono" />
          </div>
          <div>
            <label className="block text-sm font-bold">I want to learn (Seeking)</label>
            <input required value={formData.wantingIn} onChange={e => setFormData({...formData, wantingIn: e.target.value})} placeholder="e.g. Node.js, Python" className="mt-1 w-full p-2 border-2 border-roach-ink rounded font-mono" />
          </div>
          <div>
            <label className="block text-sm font-bold">Availability</label>
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
        <div className="card text-center py-12 font-mono">
          {COPY.empty_skills}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {skills.map(skill => (
            <div key={skill._id} className="card flex flex-col hover:shadow-[6px_6px_0_0_rgba(44,44,42,1)] transition-shadow">
              <div className="mb-4">
                <span className="text-xs font-bold font-mono text-roach-muted uppercase">Offering</span>
                <p className="font-bold text-lg text-roach-green-dark">{skill.offering}</p>
              </div>
              <div className="mb-6">
                <span className="text-xs font-bold font-mono text-roach-muted uppercase">Wanting</span>
                <p className="font-bold text-lg text-roach-coral">{skill.wantingIn}</p>
              </div>
              <div className="mt-auto flex justify-between items-center text-sm font-mono border-t-2 border-roach-ink pt-4">
                <span>By: {skill.offeredBy?.alias}</span>
                <button className="bg-roach-ink text-white px-3 py-1 rounded hover:bg-black transition-colors">Propose</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}