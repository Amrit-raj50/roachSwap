import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 border-b-2 border-roach-ink pb-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Welcome to the Colony, {user.alias}</h1>
          <p className="font-mono text-roach-muted">Rank: {user.rank} | Points: {user.colonyPoints}</p>
        </div>
        <Link to="/anthill" className="btn-primary w-full md:w-auto text-center">Post an Anthill</Link>
      </div>

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
    </div>
  );
}