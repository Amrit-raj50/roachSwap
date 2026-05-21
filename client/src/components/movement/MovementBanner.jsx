export default function MovementBanner() {
  return (
    <div className="bg-roach-amber-light w-full py-2 px-4 text-center border-b-2 border-roach-ink">
      <span className="font-mono text-sm font-bold text-roach-ink">
        🪳 RoachSwap is built in solidarity with Cockroach4India.
        <a href={import.meta.env.VITE_C4I_URL || "https://www.cockroach4india.com"} target="_blank" rel="noreferrer" className="ml-2 underline hover:text-roach-coral">
          Read the Manifesto →
        </a>
      </span>
    </div>
  );
}