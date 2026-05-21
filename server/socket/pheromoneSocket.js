export function initPheromoneSocket(io) {
  io.on("connection", (socket) => {
    socket.on("join_colony", () => {
      socket.join("colony_feed");
    });
    socket.on("disconnect", () => {});
  });
}

export function broadcastFeedEvent(io, event) {
  io.to("colony_feed").emit("new_feed_event", event);
}
