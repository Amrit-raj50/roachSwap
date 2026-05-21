import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Collaborate() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/movement/collaborate`, formData);
      setSubmitted(true);
      toast.success("Message sent to the swarm.");
    } catch (error) {
      toast.error("Failed to send message. Try again later.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 ">
      <div className="card bg-roach-surface mb-8">
        <h1 className="text-4xl font-bold mb-6">Hey Cockroach4India team. 🪳</h1>
        
        <div className="space-y-4 font-mono text-roach-ink mb-8 text-lg">
          <p>We built RoachSwap because of you.</p>
          <p>You organized the grievance. We're building the action layer.</p>
          <p>You gave unemployed India an identity. We want to give them a portfolio.</p>
          <p>RoachSwap is open source. We want to collaborate.</p>
          <p>Every roach who files a complaint on C4I deserves a place to build something.</p>
          <p>Every demand you make deserves a project behind it.</p>
          <p className="font-bold">We don't want anything from you except the chance to be useful to the swarm.</p>
          <p>If this resonates — reach out.</p>
        </div>
      </div>

      {submitted ? (
        <div className="card bg-roach-green-light text-center py-12 font-mono font-bold">
          Message delivered. The colony is waiting.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card space-y-4">
          <h2 className="font-bold text-xl mb-4">Contact the Builder</h2>
          <div>
            <label className="block text-sm font-bold">Name / Organization</label>
            <input 
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="mt-1 w-full p-2 border-2 border-roach-ink rounded" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold">Email</label>
            <input 
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="mt-1 w-full p-2 border-2 border-roach-ink rounded" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold">Message</label>
            <textarea 
              required
              rows={4}
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
              className="mt-1 w-full p-2 border-2 border-roach-ink rounded font-mono" 
            />
          </div>
          <button type="submit" className="btn-primary w-full">Send Message</button>
        </form>
      )}
      
      <div className="text-center mt-12 font-mono text-sm text-roach-muted">
        "We survived 300 million years. We will survive this system too."
      </div>
    </div>
  );
}