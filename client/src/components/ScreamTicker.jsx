import { useState, useEffect } from "react";
import axios from "axios";

export default function ScreamTicker() {
  const [rants, setRants] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/rants/ticker`)
      .then(res => setRants(res.data))
      .catch(console.error);
  }, []);

  const displayRants = rants.length > 0 ? rants : [
    { _id: 1, content: "ENTRY LEVEL ROLE: REQUIRES 10 YEARS EXPERIENCE AND A NOBEL PRIZE", author: { alias: "SYSTEM" } },
    { _id: 2, content: "THANK YOU FOR APPLYING. WE WILL NOW IGNORE YOU FOR 6 MONTHS.", author: { alias: "SYSTEM" } },
    { _id: 3, content: "MY DEGREE IS VERY EXPENSIVE TOILET PAPER.", author: { alias: "SYSTEM" } },
    { _id: 4, content: "WE SURVIVED 300 MILLION YEARS. WE WILL SURVIVE YOUR 6-ROUND INTERVIEW.", author: { alias: "SYSTEM" } },
    { _id: 5, content: "CURRENTLY UNEMPLOYED BUT EXTREMELY PASSIONATE ABOUT NOT STARVING.", author: { alias: "SYSTEM" } },
    { _id: 6, content: "PLEASE HOLD. YOUR FUTURE IS IN THE SPAM FOLDER.", author: { alias: "SYSTEM" } },
    { _id: 7, content: "OUR AI DETECTED THAT YOU MIGHT DEMAND A FAIR WAGE. REJECTED.", author: { alias: "SYSTEM" } },
    { _id: 8, content: "WE REGRET TO INFORM YOU THAT WE ONLY HIRE THE CEO'S NEPHEW.", author: { alias: "SYSTEM" } },
    { _id: 9, content: "डिग्री है। जॉब नहीं।", author: { alias: "SYSTEM" } },
    { _id: 10, content: "बस यार, बहुत हो गया।", author: { alias: "SYSTEM" } },
    { _id: 11, content: "एक्सपीरियंस कहाँ से लाऊं?", author: { alias: "SYSTEM" } }
  ];

  return (
    <div className="bg-roach-coral text-white overflow-hidden whitespace-nowrap py-2 border-y-2 border-roach-ink">
      <div className="inline-block animate-[ticker_40s_linear_infinite] font-mono text-xs font-bold uppercase tracking-widest">
        {displayRants.map((r, i) => (
          <span key={r._id}>
            &nbsp;•&nbsp; "{r.content}" — {r.author?.alias || "UNKNOWN"} &nbsp;•&nbsp;
          </span>
        ))}
        {/* Duplicate for seamless looping */}
        {displayRants.map((r, i) => (
          <span key={r._id + "-dup"}>
            &nbsp;•&nbsp; "{r.content}" — {r.author?.alias || "UNKNOWN"} &nbsp;•&nbsp;
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
