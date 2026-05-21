import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function RejectionWall() {
  const [rants, setRants] = useState([]);
  const [content, setContent] = useState("");
  const [company, setCompany] = useState("");
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRejections();
  }, []);

  const fetchRejections = () => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_API_URL}/rants?type=Rejection`)
      .then(res => setRants(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) return toast.error("Provide the rejection text!");
    if (content.length > 300) return toast.error("Keep it under 300 characters.");

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/rants`, {
        content,
        company,
        type: "Rejection"
      });
      toast.success("Added to the Wall of Rejections. Wear it with pride.");
      setContent("");
      setCompany("");
      fetchRejections();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post");
    }
  };

  const handleUpvote = async (id) => {
    if (!user) return toast.error("Log in to upvote");
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/rants/${id}/upvote`);
      fetchRejections();
    } catch (error) {
      toast.error("Already upvoted or failed.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row gap-12 items-start mb-16">
        <div className="flex-1">
          <h1 className="text-5xl font-bold mb-4 font-['Anton'] uppercase tracking-wide">Wall of <span className="text-roach-coral italic font-['Playfair_Display'] capitalize">Rejections</span></h1>
          <p className="font-mono text-roach-muted text-lg mb-8 leading-relaxed">
            "Unfortunately, we have decided to proceed with other candidates."<br/>
            Turn their generic auto-replies into your badge of honor. Post your worst rejections here. The colony judges them.
          </p>

          {user ? (
            <form onSubmit={handleSubmit} className="bg-roach-surface border-2 border-roach-ink shadow-[4px_4px_0_0_rgba(44,44,42,1)] p-6">
              <h3 className="font-bold text-xl mb-4 uppercase">Post a Rejection</h3>
              <input 
                type="text" 
                placeholder="Company Name (e.g. Meta, StartupX)" 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-transparent border-b-2 border-roach-ink p-2 mb-4 font-mono outline-none focus:border-roach-coral"
              />
              <textarea 
                placeholder="Copy-paste the soul-crushing rejection email here (max 300 chars)..." 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={300}
                className="w-full bg-transparent border-2 border-roach-ink p-3 h-24 font-mono outline-none focus:border-roach-coral mb-4 resize-none"
              />
              <button type="submit" className="btn-primary bg-roach-coral text-white w-full">Pin to the Wall</button>
              <div className="text-center mt-3 font-mono text-xs text-roach-coral font-bold">थैंक्यू फॉर रिजेक्टिंग मी।</div>
            </form>
          ) : (
            <div className="p-4 border-2 border-dashed border-roach-muted text-center font-mono">
              Log in to post your rejections.
            </div>
          )}
        </div>
        <div className="hidden md:block w-[400px]">
          <img src="/roach_propaganda.png" alt="Roach Propaganda" className="w-full border-4 border-roach-ink shadow-[8px_8px_0_0_rgba(44,44,42,1)]" />
        </div>
      </div>

      <div className="text-center mb-8 font-mono text-roach-muted font-bold text-sm tracking-widest">
        रिजेक्शन कोई नई बात नहीं है।
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? <p className="font-mono">Loading misery...</p> : rants.map(r => (
          <div key={r._id} className="bg-white border-2 border-roach-ink p-6 relative flex flex-col hover:-translate-y-1 transition-transform">
            <div className="absolute top-4 right-4 text-3xl opacity-20">🪳</div>
            <div className="font-mono text-xs font-bold text-roach-coral mb-4 uppercase tracking-wider border-b border-roach-ink pb-2">
              REJECTED BY: {r.company || "UNKNOWN ENTITY"}
            </div>
            <p className="font-['Playfair_Display'] italic text-lg mb-6 flex-grow">
              "{r.content}"
            </p>
            <div className="flex justify-between items-end">
              <span className="font-mono text-xs text-roach-muted font-bold">BY {r.author?.alias}</span>
              <button onClick={() => handleUpvote(r._id)} className="flex items-center gap-1 font-mono font-bold hover:text-roach-coral">
                ⬆️ {r.upvotes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
