import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/hivemind/bookings`, { withCredentials: true });
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/hivemind/bookings/${bookingId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      toast.success(`Booking status updated to ${newStatus}!`);
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status.");
    }
  };

  // Filter bookings
  const asMentor = bookings.filter(b => b.mentor?._id === user._id);
  const asMentee = bookings.filter(b => b.bookedBy?._id === user._id);

  const getStatusBadge = (status) => {
    const base = "px-2 py-0.5 font-mono text-xs font-bold border rounded uppercase whitespace-nowrap";
    switch (status) {
      case "pending":
        return `${base} bg-amber-100 text-amber-800 border-amber-600`;
      case "accepted":
        return `${base} bg-green-100 text-green-800 border-green-600`;
      case "completed":
        return `${base} bg-indigo-100 text-indigo-800 border-indigo-600`;
      case "cancelled":
        return `${base} bg-roach-coral-light text-roach-coral border-roach-coral`;
      default:
        return base;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 ">
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 border-b-2 border-roach-ink pb-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Welcome to the Colony, {user.alias}</h1>
          <p className="font-mono text-roach-muted">Rank: {user.rank} | Points: {user.colonyPoints}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Link to="/hivemind" className="btn-secondary text-center block">Find a Mentor</Link>
          <Link to="/anthill" className="btn-primary text-center block">Post an Anthill</Link>
        </div>
      </div>

      {/* 2. Standard Colony Tools Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="card bg-roach-green-light flex flex-col justify-between">
          <h3 className="font-bold text-xl mb-4">The Anthill</h3>
          <p className="font-mono text-sm mb-6">Find a team and build a project together.</p>
          <Link to="/anthill" className="btn-secondary text-center block">Browse Projects</Link>
        </div>
        <div className="card bg-roach-purple-light flex flex-col justify-between">
          <h3 className="font-bold text-xl mb-4">Moult Market</h3>
          <p className="font-mono text-sm mb-6">Swap your skills directly with other roaches.</p>
          <Link to="/moult" className="btn-secondary text-center block">Find Skills</Link>
        </div>
        <div className="card bg-roach-amber-light flex flex-col justify-between">
          <h3 className="font-bold text-xl mb-4">Movement Builds</h3>
          <p className="font-mono text-sm mb-6">Projects aligned with Cockroach4India demands.</p>
          <Link to="/movement" className="btn-secondary text-center block">View Movement</Link>
        </div>
      </div>

      {/* 3. MENTORSHIP SECTIONS */}
      <div className="border-t-4 border-roach-ink pt-12 space-y-12">
        
        {/* A. Incoming Mentorship Requests (Only visible to active mentors) */}
        {user.isMentor && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">⚡</span>
              <h2 className="text-2xl font-bold uppercase">Incoming Mentorship Requests (As Mentor)</h2>
            </div>

            {loading ? (
              <div className="font-mono text-sm text-roach-muted">Tuning Hivemind antenna...</div>
            ) : asMentor.length === 0 ? (
              <div className="border-2 border-dashed border-roach-ink p-8 text-center font-mono text-sm text-roach-muted">
                No active booking requests in your antenna list.
              </div>
            ) : (
              <div className="grid gap-6">
                {asMentor.map(booking => (
                  <div key={booking._id} className="border-2 border-roach-ink p-6 bg-white shadow-[4px_4px_0_0_rgba(44,44,42,1)] relative flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={getStatusBadge(booking.status)}>{booking.status}</span>
                        <h4 className="font-bold text-lg">{booking.bookedBy?.alias}</h4>
                        <span className="text-xs font-mono text-roach-muted">({booking.bookedBy?.rank})</span>
                      </div>
                      
                      <div className="space-y-2 font-mono text-xs text-roach-muted mb-4">
                        <div><strong className="text-roach-ink">Date/Time:</strong> {new Date(booking.dateTime).toLocaleString()}</div>
                        <div><strong className="text-roach-ink">Location:</strong> {booking.bookedBy?.state || "Unknown State"}</div>
                        {booking.topics && booking.topics.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            <strong className="text-roach-ink mr-1">Topics:</strong>
                            {booking.topics.map(t => (
                              <span key={t} className="bg-roach-surface border border-roach-ink px-1.5 py-0.5 rounded text-[10px] font-bold">{t}</span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="border-t border-roach-ink/10 pt-3">
                        <span className="block text-xs font-mono font-bold text-roach-ink uppercase mb-1">Grievance Note:</span>
                        <p className="text-sm font-serif italic text-gray-700">"{booking.note}"</p>
                      </div>
                    </div>

                    <div className="flex md:flex-col justify-end gap-2 shrink-0 self-end md:self-center w-full md:w-auto">
                      {booking.status === "pending" && (
                        <>
                          <button 
                            onClick={() => handleUpdateStatus(booking._id, "accepted")}
                            className="btn-primary py-1.5 px-4 text-xs font-mono font-bold bg-roach-green border-roach-green hover:bg-green-700 text-white"
                          >
                            Accept Request
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(booking._id, "cancelled")}
                            className="btn-secondary py-1.5 px-4 text-xs font-mono font-bold border-roach-coral text-roach-coral hover:bg-roach-coral hover:text-white"
                          >
                            Decline
                          </button>
                        </>
                      )}
                      
                      {booking.status === "accepted" && (
                        <>
                          <button 
                            onClick={() => handleUpdateStatus(booking._id, "completed")}
                            className="btn-primary py-1.5 px-4 text-xs font-mono font-bold bg-indigo-600 border-indigo-600 hover:bg-indigo-700 text-white"
                          >
                            Mark Completed
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(booking._id, "cancelled")}
                            className="btn-secondary py-1.5 px-4 text-xs font-mono font-bold border-roach-coral text-roach-coral hover:bg-roach-coral hover:text-white"
                          >
                            Cancel Session
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* B. Booked Sessions (As Mentee) */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🧠</span>
            <h2 className="text-2xl font-bold uppercase">Your Booked Mentorship Sessions (As Mentee)</h2>
          </div>

          {loading ? (
            <div className="font-mono text-sm text-roach-muted">Tuning Hivemind antenna...</div>
          ) : asMentee.length === 0 ? (
            <div className="border-2 border-dashed border-roach-ink p-8 text-center font-mono text-sm text-roach-muted">
              You haven't requested any mentorship sessions yet. Have some grievances? <Link to="/hivemind" className="text-roach-coral font-bold hover:underline">Find a Mentor →</Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {asMentee.map(booking => (
                <div key={booking._id} className="border-2 border-roach-ink p-6 bg-white shadow-[4px_4px_0_0_rgba(44,44,42,1)] relative flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={getStatusBadge(booking.status)}>{booking.status}</span>
                      <h4 className="font-bold text-lg">Mentor: {booking.mentor?.alias || "Colony Leader"}</h4>
                      <span className="text-xs font-mono text-roach-muted">({booking.mentor?.rank})</span>
                    </div>

                    <div className="space-y-2 font-mono text-xs text-roach-muted mb-4">
                      <div><strong className="text-roach-ink">Date/Time:</strong> {new Date(booking.dateTime).toLocaleString()}</div>
                      {booking.topics && booking.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          <strong className="text-roach-ink mr-1">Topics:</strong>
                          {booking.topics.map(t => (
                            <span key={t} className="bg-roach-surface border border-roach-ink px-1.5 py-0.5 rounded text-[10px] font-bold">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="border-t border-roach-ink/10 pt-3">
                      <span className="block text-xs font-mono font-bold text-roach-ink uppercase mb-1">Your Note:</span>
                      <p className="text-sm font-serif italic text-gray-700">"{booking.note}"</p>
                    </div>
                  </div>

                  <div className="flex md:flex-col justify-end shrink-0 self-end md:self-center w-full md:w-auto">
                    {["pending", "accepted"].includes(booking.status) && (
                      <button 
                        onClick={() => handleUpdateStatus(booking._id, "cancelled")}
                        className="btn-secondary py-1.5 px-4 text-xs font-mono font-bold border-roach-coral text-roach-coral hover:bg-roach-coral hover:text-white w-full md:w-auto"
                      >
                        Cancel Session
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}