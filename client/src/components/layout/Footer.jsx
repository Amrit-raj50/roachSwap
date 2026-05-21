import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-roach-ink text-roach-surface py-12 px-6 mt-20 border-t-4 border-roach-green-dark">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">RoachSwap.</h2>
          <p className="font-mono text-sm text-roach-muted max-w-xs">
            Part of the Cockroach4India ecosystem.<br/>
            We don't just complain. We build.
          </p>
        </div>
        
        <div className="flex gap-12 font-mono text-sm">
          <div className="flex flex-col gap-2">
            <Link to="/anthill" className="hover:text-roach-green transition-colors">The Anthill</Link>
            <Link to="/moult" className="hover:text-roach-green transition-colors">Moult Market</Link>
            <Link to="/movement" className="hover:text-roach-green transition-colors">Movement Builds</Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link to="/collaborate" className="hover:text-roach-coral transition-colors">Collaborate</Link>
            <a href={import.meta.env.VITE_C4I_URL || "https://www.cockroach4india.com"} target="_blank" rel="noreferrer" className="hover:text-roach-amber transition-colors">C4I Manifesto</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto mt-12 pt-6 border-t border-roach-muted/30 font-mono text-xs text-roach-muted flex justify-between items-center">
        <p>Built by roaches, for roaches.</p>
        <p>We survived 300 million years. We will survive this system too. 🪳</p>
      </div>
    </footer>
  );
}