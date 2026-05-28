export default function ScrambleMode() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12  text-center">
      <h1 className="text-5xl font-bold mb-4 text-roach-coral">Scramble Mode 🔥</h1>
      <p className="font-mono text-roach-ink text-xl mb-12">48-hour pressure cooker. Build it fast. Ship it broken. Fix it later.</p>
      
      <div className="card bg-roach-surface border-4 border-roach-coral shadow-[8px_8px_0_0_#D85A30] py-16">
        <h2 className="text-3xl font-bold mb-4">No Scrambles Active</h2>
        <p className="font-mono text-roach-muted">The colony is resting. Check back when the swarm needs an urgent fix.</p>
      </div>
    </div>
  );
}