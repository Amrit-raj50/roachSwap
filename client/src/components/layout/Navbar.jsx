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
          <a href="https://discord.gg/BeFN78k5b" target="_blank" rel="noreferrer" title="Join Discord" className="hover:text-[#5865F2] transition-colors flex items-center mr-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
          </a>
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
          <a href="https://discord.gg/BeFN78k5b" target="_blank" rel="noreferrer" className="block py-2 hover:bg-roach-surface text-[#5865F2]">Join Discord Server</a>
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