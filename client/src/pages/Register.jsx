import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { COPY, STATUS_OPTIONS } from "../utils/roachCopy";
import toast from "react-hot-toast";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "", alias: "", email: "", password: "", state: "", currentStatus: "Unemployed", bio: "", c4iMemberId: ""
  });
  const [step, setStep] = useState(1);
  const [isC4I, setIsC4I] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, formData);
      login(res.data, res.data.token);
      toast.success(COPY.welcome(res.data.alias));
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || COPY.error_generic);
    }
  };

  return (
    <div className="flex  items-center justify-center bg-roach-surface p-4">
      <div className="card w-full max-w-lg">
        <h2 className="mb-2 text-2xl text-roach-ink">Join the Swarm 🪳</h2>
        <p className="mb-6 font-mono text-sm text-roach-muted">Step {step} of 4</p>
        
        <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); setStep(step + 1); }} className="space-y-4">
          {step === 1 && (
            <>
              <h3 className="font-bold">Who are you?</h3>
              <div>
                <label className="block text-sm font-bold">Real Name</label>
                <input required name="name" value={formData.name} onChange={handleChange} className="mt-1 w-full rounded-md border-2 border-roach-ink p-2 font-mono" />
              </div>
              <div>
                <label className="block text-sm font-bold">Alias (Optional)</label>
                <input name="alias" value={formData.alias} onChange={handleChange} placeholder="Roach#XXXX" className="mt-1 w-full rounded-md border-2 border-roach-ink p-2 font-mono" />
              </div>
              <div>
                <label className="block text-sm font-bold">Email</label>
                <input type="email" required name="email" value={formData.email} onChange={handleChange} className="mt-1 w-full rounded-md border-2 border-roach-ink p-2 font-mono" />
              </div>
              <div>
                <label className="block text-sm font-bold">Password</label>
                <input type="password" required name="password" value={formData.password} onChange={handleChange} className="mt-1 w-full rounded-md border-2 border-roach-ink p-2 font-mono" />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3 className="font-bold">Where are you?</h3>
              <div>
                <label className="block text-sm font-bold">State</label>
                <input required name="state" value={formData.state} onChange={handleChange} placeholder="e.g. Bihar, UP, Karnataka" className="mt-1 w-full rounded-md border-2 border-roach-ink p-2 font-mono" />
              </div>
              <div>
                <label className="block text-sm font-bold">Current Status</label>
                <select name="currentStatus" value={formData.currentStatus} onChange={handleChange} className="mt-1 w-full rounded-md border-2 border-roach-ink p-2 font-mono bg-white">
                  {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold">Bio (280 chars max)</label>
                <textarea maxLength={280} name="bio" value={formData.bio} onChange={handleChange} placeholder="Tweet-length. We don't have time for essays." className="mt-1 w-full rounded-md border-2 border-roach-ink p-2 font-mono" />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3 className="font-bold">What's your frustration?</h3>
              <p className="font-mono text-sm text-roach-muted mb-4">Optional. Just let it out.</p>
              <div>
                <textarea rows={4} placeholder="Degree hai. Job nahi..." className="w-full rounded-md border-2 border-roach-ink p-2 font-mono" />
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h3 className="font-bold mb-4">Are you a Cockroach4India member?</h3>
              <div className="flex space-x-4 mb-4">
                <button type="button" onClick={() => setIsC4I(true)} className={`flex-1 p-2 border-2 border-roach-ink rounded font-bold ${isC4I ? 'bg-roach-ink text-white' : ''}`}>Yes</button>
                <button type="button" onClick={() => setIsC4I(false)} className={`flex-1 p-2 border-2 border-roach-ink rounded font-bold ${!isC4I ? 'bg-roach-ink text-white' : ''}`}>Not yet</button>
              </div>
              {isC4I && (
                <div>
                  <label className="block text-sm font-bold">Roach Card ID</label>
                  <input name="c4iMemberId" value={formData.c4iMemberId} onChange={handleChange} placeholder="C4I-2026-XXXXXX" className="mt-1 w-full rounded-md border-2 border-roach-ink p-2 font-mono uppercase" />
                  <p className="text-xs text-roach-green-dark mt-1 font-bold">+100 Colony Points on verification</p>
                </div>
              )}
              {!isC4I && (
                <p className="font-mono text-sm text-roach-muted">You can join the movement later at <a href={import.meta.env.VITE_C4I_URL} target="_blank" rel="noreferrer" className="underline text-roach-coral">cockroach4india.com</a></p>
              )}
            </>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && <button type="button" onClick={() => setStep(step - 1)} className="btn-secondary">Back</button>}
            <button type="submit" className="btn-primary ml-auto">{step === 4 ? "Hatch In" : "Next"}</button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm font-mono text-roach-muted">
          Already hatched? <Link to="/login" className="text-roach-green-dark underline">Login</Link>
        </p>
      </div>
    </div>
  );
}