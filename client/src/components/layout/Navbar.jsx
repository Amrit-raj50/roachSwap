import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { COPY } from "../../utils/roachCopy";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    toast(COPY.logout, { icon: '🪳' });
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="border-b-2 border-roach-ink bg-white px-6 py-4 shadow-[0_4px_0_0_rgba(44,44,42,1)]">
      <div className="flex justify-between items-center">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-3 group">
          <img src="/roachswap_logo.png" alt="RoachSwap" className="h-10 w-10 border-2 border-roach-ink rounded-full group-hover:rotate-12 transition-transform" />
          <span className="text-2xl font-bold tracking-tighter text-roach-ink group-hover:text-roach-coral transition-colors">
            RoachSwap.
          </span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-roach-ink focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4 items-center font-mono font-bold text-sm">
          <Link to="/anthill" className="hover:underline">Anthill</Link>
          <Link to="/scrapyard" className="hover:underline">The Scrap Yard</Link>
          <Link to="/rejections" className="hover:underline text-roach-coral">Rejections</Link>
          <Link to="/moult" className="hover:underline">Moult Market</Link>
          <Link to="/leaderboard" className="hover:underline">Chitinboard</Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
              <div className="relative group">
                <button className="flex items-center gap-2 border-2 border-roach-ink px-3 py-1 bg-roach-surface rounded">
                  <span>{user.alias}</span>
                  {user.isC4IVerified && <span title="C4I Verified">🪳</span>}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-roach-ink shadow-[4px_4px_0_0_rgba(44,44,42,1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col">
                  {user.role === "admin" && (
                    <Link to="/admin" className="px-4 py-2 hover:bg-roach-surface border-b-2 border-roach-ink font-bold text-roach-coral">Mod Queue</Link>
                  )}
                  <Link to="/profile" className="px-4 py-2 hover:bg-roach-surface border-b-2 border-roach-ink">Profile</Link>
                  <Link to={`/exoresume/${user._id}`} className="px-4 py-2 hover:bg-roach-surface border-b-2 border-roach-ink">ExoResume</Link>
                  <button onClick={handleLogout} className="px-4 py-2 text-left hover:bg-roach-coral-light text-roach-coral font-bold">Logout</button>
                </div>
              </div>
            </>
          ) : (
            <Link to="/login" className="btn-primary ml-2">Join the Swarm</Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 font-mono font-bold text-sm border-t-2 border-roach-ink pt-4">
          <Link to="/anthill" onClick={closeMenu} className="block py-2 hover:bg-roach-surface">Anthill</Link>
          <Link to="/scrapyard" onClick={closeMenu} className="block py-2 hover:bg-roach-surface">The Scrap Yard</Link>
          <Link to="/rejections" onClick={closeMenu} className="block py-2 hover:bg-roach-surface text-roach-coral">Wall of Rejections</Link>
          <Link to="/moult" onClick={closeMenu} className="block py-2 hover:bg-roach-surface">Moult Market</Link>
          <Link to="/leaderboard" onClick={closeMenu} className="block py-2 hover:bg-roach-surface">Chitinboard</Link>
          
          {user ? (
            <>
              <Link to="/dashboard" onClick={closeMenu} className="block py-2 hover:bg-roach-surface">Dashboard</Link>
              {user.role === "admin" && (
                <Link to="/admin" onClick={closeMenu} className="block py-2 hover:bg-roach-surface text-roach-coral">Mod Queue</Link>
              )}
              <Link to="/profile" onClick={closeMenu} className="block py-2 hover:bg-roach-surface border-t border-roach-muted/20">Profile</Link>
              <Link to={`/exoresume/${user._id}`} onClick={closeMenu} className="block py-2 hover:bg-roach-surface">ExoResume</Link>
              <button onClick={handleLogout} className="block py-2 text-left text-roach-coral font-bold border-t border-roach-muted/20">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={closeMenu} className="btn-primary w-full text-center mt-2">Join the Swarm</Link>
          )}
        </div>
      )}
    </nav>
  );
}