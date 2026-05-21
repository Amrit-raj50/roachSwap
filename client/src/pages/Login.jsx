import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { COPY } from "../utils/roachCopy";
import toast from "react-hot-toast";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
      login(res.data, res.data.token);
      toast.success(COPY.welcome(res.data.alias));
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || COPY.error_generic);
    }
  };

  return (
    <div className="flex  items-center justify-center bg-roach-surface p-4">
      <div className="card w-full max-w-md">
        <h2 className="mb-6 text-2xl text-roach-ink">Hatch In 🪳</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-roach-ink">Email</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border-2 border-roach-ink p-2 font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-roach-ink">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border-2 border-roach-ink p-2 font-mono"
            />
          </div>
          <button type="submit" className="btn-primary w-full">Enter the Colony</button>
        </form>
        <p className="mt-4 text-center text-sm font-mono text-roach-muted">
          Not in the swarm yet? <Link to="/register" className="text-roach-green-dark underline">Register</Link>
        </p>
      </div>
    </div>
  );
}