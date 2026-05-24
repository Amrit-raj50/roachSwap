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

  // File Upload & Preview States
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [detectedClichés, setDetectedClichés] = useState([]);
  const [mockScore, setMockScore] = useState(2);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchRejections();
  }, []);

  const fetchRejections = () => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_API_URL}/rejections`)
      .then(res => setRants(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  // Perform a simulated OCR scanning animation and buzzword calculation
  const handleFileChange = (selectedFile) => {
    if (!selectedFile) return;

    // Client-side validations
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Please upload only PNG, JPEG, JPG, or PDF files.");
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB upload limit.");
      return;
    }

    setFile(selectedFile);

    if (selectedFile.type !== "application/pdf") {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);

      // Trigger the cyberpunk roach scanning effect!
      setScanning(true);
      setDetectedClichés([]);
      
      // Simulate gradual discovery of corporate clichés
      setTimeout(() => {
        setDetectedClichés(prev => [...prev, "unfortunately"]);
      }, 800);
      setTimeout(() => {
        setDetectedClichés(prev => [...prev, "future endeavors", "moving forward"]);
        setMockScore(6);
      }, 1600);
      setTimeout(() => {
        setDetectedClichés(prev => [...prev, "impressed by your background"]);
        setMockScore(9);
        setScanning(false);
        toast.success("AI Roach Scanner analysis complete! Buzzwords tagged.");
      }, 2500);
    } else {
      setPreviewUrl("");
      setScanning(false);
      setMockScore(4); // Default hypocrisy bump for PDFs
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) return toast.error("Provide the rejection text!");
    if (content.length > 300) return toast.error("Keep it under 300 characters.");

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("company", company);
      if (file) {
        formData.append("file", file);
      }

      await axios.post(`${import.meta.env.VITE_API_URL}/rejections`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });

      toast.success("Added to the Wall of Rejections. Wear it with pride! 🪳🏆");
      setContent("");
      setCompany("");
      setFile(null);
      setPreviewUrl("");
      setDetectedClichés([]);
      setMockScore(2);
      fetchRejections();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpvote = async (id) => {
    if (!user) return toast.error("Log in to upvote");
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/rejections/${id}/upvote`, {}, { withCredentials: true });
      fetchRejections();
    } catch (error) {
      toast.error("Already upvoted or failed.");
    }
  };

  // Helper label text matching calculated scores
  const getHypocrisyLabel = (score) => {
    if (score <= 3) return { text: "Mildly Fake", color: "bg-green-500", border: "border-green-600" };
    if (score <= 6) return { text: "Standard HR Cliché", color: "bg-amber-500", border: "border-amber-600" };
    if (score <= 8) return { text: "HR Sorcery", color: "bg-roach-coral", border: "border-roach-ink" };
    return { text: "Weaponized Positivity 💥", color: "bg-red-600 animate-pulse", border: "border-red-800" };
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 relative">
      
      {/* Laser Scanning Keyframe Style Injection */}
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(220%); }
        }
        .animate-scanline {
          animation: scanline 2.5s linear infinite;
        }
        @keyframes scanGrid {
          0% { background-position: 0 0; }
          100% { background-position: 0 40px; }
        }
        .bg-grid-scanner {
          background-size: 20px 20px;
          background-image: 
            linear-gradient(to right, rgba(34, 197, 94, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(34, 197, 94, 0.15) 1px, transparent 1px);
          animation: scanGrid 10s linear infinite;
        }
      `}</style>

      {/* Hero Welcome Banner */}
      <div className="flex flex-col md:flex-row gap-12 items-start mb-16">
        <div className="flex-1">
          <h1 className="text-5xl font-bold mb-4 font-mono uppercase tracking-wide">
            Wall of <span className="text-roach-coral italic capitalize">Rejections</span> 🪳🏆
          </h1>
          <p className="font-mono text-roach-muted text-sm mb-8 leading-relaxed">
            "Unfortunately, we have decided to proceed with other candidates whose profiles more closely align..."<br/>
            Turn their generic corporate clichés into your ultimate badge of honor. Upload screenshots or PDFs. Let the colony scan their hypocrisy!
          </p>

          {user ? (
            <form onSubmit={handleSubmit} className="bg-roach-surface border-4 border-roach-ink shadow-[6px_6px_0_0_rgba(44,44,42,1)] p-6 space-y-4">
              <h3 className="font-bold text-xl uppercase font-mono border-b-2 border-roach-ink pb-2">
                Post a Rejection
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold font-mono uppercase text-roach-muted mb-1">Company:</label>
                  <input 
                    type="text" 
                    placeholder="Company Name (e.g. Meta, StartupX)" 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full p-2 border-2 border-roach-ink rounded font-mono text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold font-mono uppercase text-roach-muted mb-1">Misery Content (Max 300 chars):</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Brief summary: e.g. Kept on file for next 300 years" 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={300}
                    className="w-full p-2 border-2 border-roach-ink rounded font-mono text-sm bg-white"
                  />
                </div>
              </div>

              {/* Drag and Drop Upload Zone */}
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-4 border-dashed rounded p-6 text-center transition-all cursor-pointer ${
                  isDragging ? "border-roach-green bg-roach-green/5" : "border-roach-ink bg-white"
                }`}
                onClick={() => document.getElementById("fileInput").click()}
              >
                <input 
                  id="fileInput" 
                  type="file" 
                  accept="image/png, image/jpeg, image/jpg, application/pdf" 
                  onChange={(e) => handleFileChange(e.target.files[0])}
                  className="hidden"
                />
                
                {file ? (
                  <div className="space-y-2">
                    <p className="font-mono text-xs font-bold text-roach-green-dark">
                      ✓ FILE READY: {file.name} ({(file.size / 1024).toFixed(1)} KB)
                    </p>
                    <p className="text-[10px] font-mono text-roach-muted">Click or drag another file to replace</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <span className="text-3xl block">📁</span>
                    <p className="font-mono text-xs font-bold text-roach-ink uppercase">
                      Drag & Drop Screenshot / PDF
                    </p>
                    <p className="text-[10px] font-mono text-roach-muted">
                      Supports PNG, JPEG, JPG, and PDF up to 5MB
                    </p>
                  </div>
                )}
              </div>

              {/* Satirical Scanner Screen for Uploaded Screenshots */}
              {previewUrl && (
                <div className="relative border-4 border-roach-ink bg-black overflow-hidden aspect-[4/3] max-h-80 mx-auto rounded shadow-inner">
                  {/* Cybernetic grid scrolling pattern */}
                  <div className="absolute inset-0 bg-grid-scanner z-10 opacity-70" />
                  
                  {/* Uploaded screenshot image */}
                  <img src={previewUrl} alt="Scan preview" className="w-full h-full object-contain relative z-0" />
                  
                  {/* Neon laser sweeps */}
                  {scanning && (
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/20 to-transparent w-full h-1/2 z-20 pointer-events-none animate-scanline border-b-2 border-green-400" />
                  )}

                  {/* Terminal overlays status log */}
                  <div className="absolute bottom-2 left-2 z-20 bg-black/80 p-2 font-mono text-[9px] text-green-400 border border-green-500/20 rounded">
                    <div>[SYSTEM: ROACHSCAN v8.1]</div>
                    {scanning ? (
                      <div className="animate-pulse">[OCR SCANNING IN PROGRESS...]</div>
                    ) : (
                      <>
                        <div>[SCAN COMPLETED SUCCESSFULLY]</div>
                        <div>[CORPORATE HYPOCRISY INDEX: {mockScore}/10]</div>
                      </>
                    )}
                  </div>

                  {/* Highlighting tags scrolling dynamically */}
                  {detectedClichés.map((word, idx) => (
                    <div 
                      key={idx}
                      style={{
                        left: `${15 + idx * 25}%`,
                        top: `${30 + idx * 15}%`
                      }}
                      className="absolute z-20 border border-green-500 bg-green-500/20 shadow-[0_0_10px_#22c55e] px-2 py-0.5 font-mono text-[8px] text-green-300 font-bold uppercase rounded animate-bounce"
                    >
                      ★ {word}
                    </div>
                  ))}
                </div>
              )}

              {/* Simulated Hypocrisy Meter */}
              {file && (
                <div className="bg-white border-2 border-roach-ink p-3 rounded font-mono text-xs space-y-2">
                  <div className="flex justify-between items-center font-bold">
                    <span>HR Hypocrisy Meter:</span>
                    <span className="text-roach-coral">{getHypocrisyLabel(mockScore).text} ({mockScore}/10)</span>
                  </div>
                  <div className="w-full bg-roach-surface border-2 border-roach-ink h-4 rounded overflow-hidden relative">
                    <div 
                      className={`h-full border-r-2 border-roach-ink transition-all duration-500 ${getHypocrisyLabel(mockScore).color}`} 
                      style={{ width: `${mockScore * 10}%` }}
                    />
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                disabled={submitting}
                className="btn-primary bg-roach-coral text-white w-full font-bold uppercase font-mono disabled:opacity-50"
              >
                {submitting ? "Analyzing & Pinning..." : "Pin to the Wall of Rejections"}
              </button>
            </form>
          ) : (
            <div className="p-8 border-4 border-dashed border-roach-ink bg-white text-center font-mono rounded shadow-[4px_4px_0_0_rgba(44,44,42,1)]">
              🔒 Log in to pin your auto-rejection messages.
            </div>
          )}
        </div>
        <div className="hidden md:block w-[380px] shrink-0">
          <img src="/roach_propaganda.png" alt="Roach Propaganda" className="w-full border-4 border-roach-ink shadow-[8px_8px_0_0_rgba(44,44,42,1)]" />
        </div>
      </div>

      <div className="text-center mb-8 font-mono text-roach-muted font-bold text-sm tracking-widest uppercase border-b-2 border-roach-ink/10 pb-4">
        रिजेक्शन कोई नई बात नहीं है। Wear it proud!
      </div>

      {/* Rejections Feed List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="font-mono text-roach-muted text-center py-10 col-span-full">
            Tuning antennas... loading auto-replies...
          </p>
        ) : rants.length === 0 ? (
          <div className="text-center py-10 font-mono text-roach-muted col-span-full border-2 border-dashed border-roach-ink rounded">
            The Wall of Rejections is currently clean. Have you been getting interviews? Suspicious.
          </div>
        ) : (
          rants.map(r => {
            const hL = getHypocrisyLabel(r.hypocrisyScore || 5);
            return (
              <div 
                key={r._id} 
                className="bg-white border-2 border-roach-ink p-6 relative flex flex-col hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(44,44,42,1)] transition-all bg-white"
              >
                <div className="absolute top-3 right-3 text-2xl opacity-15">🪳</div>
                
                {/* Company Name Header */}
                <div className="font-mono text-xs font-bold text-roach-coral mb-3 uppercase tracking-wider border-b border-roach-ink pb-2">
                  REJECTED BY: {r.company || "UNKNOWN ENTITY"}
                </div>

                {/* Hypocrisy Index Score */}
                <div className="mb-4 font-mono text-[10px] space-y-1">
                  <div className="flex justify-between items-center font-bold text-roach-ink">
                    <span>Hypocrisy level:</span>
                    <span className="text-roach-coral font-bold">{hL.text}</span>
                  </div>
                  <div className="w-full bg-roach-surface border border-roach-ink h-2.5 rounded overflow-hidden">
                    <div 
                      className={`h-full ${hL.color}`} 
                      style={{ width: `${(r.hypocrisyScore || 5) * 10}%` }}
                    />
                  </div>
                </div>

                {/* Simulated Highlighted Bounding Boxes over image */}
                {r.attachmentUrl && r.attachmentType === "image" && (
                  <div className="relative border-2 border-roach-ink mb-4 overflow-hidden group aspect-[4/3] bg-black rounded">
                    {/* Laser grids scrolling */}
                    <div className="absolute inset-0 bg-grid-scanner z-10 opacity-40 pointer-events-none" />
                    
                    <img 
                      src={`${import.meta.env.VITE_API_URL}${r.attachmentUrl}`} 
                      alt="Rejection proof" 
                      className="w-full h-full object-contain relative z-0" 
                    />
                    
                    {/* Render matching glow coordinates overlay */}
                    {r.scannerHighlights?.map((hl, idx) => (
                      <div 
                        key={idx}
                        style={{
                          left: `${hl.x}%`,
                          top: `${hl.y}%`,
                          width: `${hl.w}%`,
                          height: `${hl.h}%`
                        }}
                        className="absolute z-20 border border-green-500 bg-green-500/10 shadow-[0_0_10px_#22c55e] flex items-start p-0.5 text-[7px] font-mono text-green-300 font-bold overflow-hidden"
                      >
                        <span className="bg-black/95 scale-75 origin-top-left whitespace-nowrap leading-none shrink-0 px-1 py-0.5 rounded border border-green-500/20">
                          {hl.text}
                        </span>
                      </div>
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent w-full h-1/2 pointer-events-none animate-scanline z-10" />
                  </div>
                )}

                {/* PDF download badge block */}
                {r.attachmentUrl && r.attachmentType === "pdf" && (
                  <a 
                    href={`${import.meta.env.VITE_API_URL}${r.attachmentUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 bg-roach-surface border-2 border-roach-ink p-3 rounded mb-4 hover:bg-roach-coral-light hover:shadow-[2px_2px_0_0_rgba(44,44,42,1)] transition-all font-mono text-xs text-roach-ink font-bold"
                  >
                    <span className="text-2xl">📄</span>
                    <div className="flex-1 overflow-hidden">
                      <span className="block truncate">Rejection_Proof.pdf</span>
                      <span className="block text-[10px] text-roach-muted uppercase font-bold">Download / View PDF Attachment</span>
                    </div>
                  </a>
                )}

                {/* Content description */}
                <p className="font-mono text-sm mb-6 flex-grow leading-relaxed italic text-gray-800 border-l-2 border-roach-coral pl-3">
                  "{r.content}"
                </p>

                {/* Upvotes & Author footer */}
                <div className="flex justify-between items-end border-t border-roach-ink/10 pt-3 font-mono text-xs font-bold text-roach-muted">
                  <span>BY @{r.author?.alias}</span>
                  <button 
                    onClick={() => handleUpvote(r._id)} 
                    className="flex items-center gap-1 hover:text-roach-coral transition-colors font-bold uppercase"
                  >
                    ⬆️ {r.upvotes} UPVOTES
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
