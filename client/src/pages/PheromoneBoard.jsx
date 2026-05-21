import { useState, useEffect } from "react";
import axios from "axios";
import { COPY } from "../utils/roachCopy";
import { useSocket } from "../context/SocketContext";

export default function PheromoneBoard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const socket = useSocket();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/feed`)
      .then(res => setEvents(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!socket) return;
    
    socket.on("new_feed_event", (event) => {
      setEvents(prev => [event, ...prev].slice(0, 50));
    });

    return () => socket.off("new_feed_event");
  }, [socket]);

  if (loading) return <div className="text-center py-20 font-mono">{COPY.loadingFeed}</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 ">
      <div className="flex items-center gap-4 mb-8 border-b-2 border-roach-ink pb-4">
        <h1 className="text-4xl font-bold">Pheromone Board</h1>
        <div className="flex items-center gap-2 font-mono text-xs text-roach-green-dark">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-roach-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-roach-green-dark"></span>
          </span>
          LIVE
        </div>
      </div>

      {events.length === 0 ? (
        <div className="card text-center py-12 font-mono">
          {COPY.empty_feed}
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event, idx) => (
            <div key={idx} className="bg-white p-4 border-2 border-roach-ink rounded-lg shadow-[4px_4px_0_0_rgba(44,44,42,1)] flex gap-4">
              <div className="text-2xl">
                {event.type === 'project_shipped' && '🚀'}
                {event.type === 'movement_build_posted' && '🪳'}
                {event.type === 'project_posted' && '🏗️'}
                {event.type === 'c4i_member_joined' && '👑'}
                {!['project_shipped', 'movement_build_posted', 'project_posted', 'c4i_member_joined'].includes(event.type) && '📡'}
              </div>
              <div>
                <p className="font-mono text-sm">
                  <span className="font-bold">{event.actorAlias || "A roach"}</span> {event.message}
                </p>
                <p className="text-xs text-roach-muted mt-1">{new Date(event.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}