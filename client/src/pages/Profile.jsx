import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { COPY } from "../utils/roachCopy";

export default function Profile() {
  const { user, login } = useAuth();
  const [shieldActive, setShieldActive] = useState(user?.shellShieldActive || false);

  const toggleShield = async () => {
    try {
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/shell-shield`);
      setShieldActive(res.data.shellShieldActive);
      // Update local user state
      login({ ...user, shellShieldActive: res.data.shellShieldActive }, localStorage.getItem("roach_token"));
      toast.success(res.data.shellShieldActive ? COPY.shield_on : COPY.shield_off);
    } catch (err) {
      toast.error(COPY.error_generic);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 ">
      <h1 className="text-3xl font-bold mb-8">Colony Settings</h1>
      
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Identity</h2>
        <div className="space-y-2 font-mono mb-6">
          <p><span className="font-bold">Real Name:</span> {user.name}</p>
          <p><span className="font-bold">Alias:</span> {user.alias}</p>
          <p><span className="font-bold">Email:</span> {user.email}</p>
          <p><span className="font-bold">State:</span> {user.state}</p>
          <p><span className="font-bold">Status:</span> {user.currentStatus}</p>
        </div>

        <div className="bg-roach-surface p-4 rounded border-2 border-roach-ink">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">🛡️ Shell Shield</h3>
            <button 
              onClick={toggleShield}
              className={`px-4 py-1 rounded font-bold transition-colors ${shieldActive ? 'bg-roach-ink text-white' : 'bg-transparent border-2 border-roach-ink'}`}
            >
              {shieldActive ? "Active" : "Disabled"}
            </button>
          </div>
          <p className="text-sm font-mono text-roach-muted">
            When active, your real name and avatar are hidden from the colony. You will appear as your alias in all public feeds and projects.
          </p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          Cockroach4India Status {user.isC4IVerified && <span className="text-2xl">🪳</span>}
        </h2>
        {user.isC4IVerified ? (
          <p className="font-mono text-roach-green-dark font-bold bg-roach-green-light p-3 rounded">
            Verified Member. You were here before RoachSwap. Respect.
          </p>
        ) : (
          <div>
            <p className="font-mono text-sm mb-4">Not verified yet. Generate your Roach Card on C4I and paste the ID below.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input placeholder="C4I-2026-XXXXXX" className="flex-1 rounded border-2 border-roach-ink p-2 font-mono uppercase w-full" />
              <button className="btn-primary w-full sm:w-auto">Verify</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}