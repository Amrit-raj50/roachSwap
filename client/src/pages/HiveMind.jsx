import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { COPY } from "../utils/roachCopy";

export default function HiveMind() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Booking Modal States
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingNote, setBookingNote] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/hivemind/mentors`)
      .then(res => setMentors(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleBookClick = (mentor) => {
    if (!user) {
      return toast.error("Please log in to book a mentorship session.");
    }
    if (user._id === mentor._id) {
      return toast.error("You cannot book a mentorship session with yourself.");
    }
    setSelectedMentor(mentor);
    setBookingDate("");
    setBookingTime("");
    setBookingNote("");
    setSelectedTopics([]);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      return toast.error("Please log in to book a session.");
    }
    if (user._id === selectedMentor._id) {
      return toast.error("You cannot book a mentorship session with yourself.");
    }
    if (!bookingDate || !bookingTime) {
      return toast.error("Please select a valid date and time.");
    }
    if (!bookingNote.trim()) {
      return toast.error("Please provide a session note.");
    }

    const dateTimeStr = `${bookingDate}T${bookingTime}`;
    const scheduledDate = new Date(dateTimeStr);
    if (scheduledDate.getTime() <= Date.now()) {
      return toast.error("Sessions must be scheduled in the future!");
    }

    setBookingLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/hivemind/bookings`,
        {
          mentorId: selectedMentor._id,
          dateTime: scheduledDate.toISOString(),
          note: bookingNote,
          topics: selectedTopics
        },
        { withCredentials: true }
      );
      toast.success("Booking request sent! Watch your dashboard for approval.");
      setSelectedMentor(null);
      setBookingDate("");
      setBookingTime("");
      setBookingNote("");
      setSelectedTopics([]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create booking.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20 font-mono">{COPY.loading}</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 ">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">HiveMind Sessions</h1>
        <p className="font-mono text-roach-muted">Get peer mentorship from roaches who have shipped before.</p>
      </div>

      {mentors.length === 0 ? (
        <div className="card text-center py-12 font-mono">
          No mentors available right now. The colony is busy.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {mentors.map(mentor => (
            <div key={mentor._id} className="card flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-xl mb-2">{mentor.alias}</h3>
                <p className="text-sm font-mono text-roach-muted mb-4">Rank: {mentor.rank}</p>
                <div className="mb-4">
                  <span className="text-xs font-bold font-mono text-roach-muted uppercase block mb-1">Expertise</span>
                  <div className="flex flex-wrap gap-2">
                    {mentor.mentorExpertise?.map(exp => (
                      <span key={exp} className="bg-roach-surface border-2 border-roach-ink px-2 py-1 rounded text-xs font-bold font-mono">{exp}</span>
                    ))}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleBookClick(mentor)}
                className="btn-primary w-full mt-4"
              >
                Book Session
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Booking Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-roach-ink bg-opacity-80 p-4 backdrop-blur-sm">
          <div className="bg-roach-surface border-4 border-roach-ink shadow-[8px_8px_0px_0px_rgba(44,44,42,1)] max-w-lg w-full p-6 relative flex flex-col transform transition-transform duration-300 scale-100 max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedMentor(null)}
              className="absolute top-2 right-4 font-bold text-2xl hover:text-roach-coral transition-colors"
              aria-label="Close"
            >
              &times;
            </button>

            <div className="text-3xl mb-2">🪳</div>
            <h2 className="text-2xl font-black uppercase mb-1">Book a HiveMind Session</h2>
            <p className="font-mono text-sm text-roach-muted mb-4">Mentor: <strong className="text-roach-coral">{selectedMentor.alias}</strong></p>
            
            <div className="w-full h-1 bg-roach-coral mb-4"></div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              {/* Date & Time */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold font-mono uppercase text-roach-ink mb-1">Preferred Date</label>
                  <input 
                    required
                    type="date"
                    value={bookingDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full p-2 border-2 border-roach-ink font-mono text-sm outline-none focus:border-roach-coral bg-white"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold font-mono uppercase text-roach-ink mb-1">Preferred Time</label>
                  <input 
                    required
                    type="time"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full p-2 border-2 border-roach-ink font-mono text-sm outline-none focus:border-roach-coral bg-white"
                  />
                </div>
              </div>

              {/* Note / Grievance */}
              <div>
                <label className="block text-xs font-bold font-mono uppercase text-roach-ink mb-1">Discussion Note / Grievance (max 500 chars)</label>
                <textarea 
                  required
                  rows={3}
                  maxLength={500}
                  placeholder="Explain what has been troubling you (e.g. 'Can't pass intermediate automated test suites', 'Need feedback on my spite project')"
                  value={bookingNote}
                  onChange={(e) => setBookingNote(e.target.value)}
                  className="w-full p-2 border-2 border-roach-ink font-mono text-sm outline-none focus:border-roach-coral resize-none bg-white"
                />
              </div>

              {/* Topics / Tags selection */}
              {selectedMentor.mentorExpertise && selectedMentor.mentorExpertise.length > 0 && (
                <div>
                  <label className="block text-xs font-bold font-mono uppercase text-roach-ink mb-1">Select Topics</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedMentor.mentorExpertise.map(topic => {
                      const isSelected = selectedTopics.includes(topic);
                      return (
                        <button
                          type="button"
                          key={topic}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedTopics(selectedTopics.filter(t => t !== topic));
                            } else {
                              setSelectedTopics([...selectedTopics, topic]);
                            }
                          }}
                          className={`px-2 py-1 rounded text-xs font-bold font-mono border-2 border-roach-ink transition-colors ${
                            isSelected 
                              ? 'bg-roach-coral text-white' 
                              : 'bg-white text-roach-ink hover:bg-roach-coral-light'
                          }`}
                        >
                          {topic} {isSelected ? "✓" : "+"}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                disabled={bookingLoading}
                className="w-full py-3 bg-roach-ink text-white font-black uppercase border-2 border-roach-ink shadow-[4px_4px_0px_0px_rgba(232,80,66,1)] hover:bg-roach-coral hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(44,44,42,1)] disabled:opacity-50 transition-all text-center block mt-6"
              >
                {bookingLoading ? "Tuning HiveMind..." : "SEND BOOKING REQUEST ⚡"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}