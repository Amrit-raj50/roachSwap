import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-12 text-center relative overflow-hidden">
      
      {/* Background graphic */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none flex items-center justify-center">
        <img src="/roach_error_404.png" alt="404 Background" className="object-cover w-full h-full" />
      </div>

      <div className="relative z-10 max-w-2xl bg-white/90 p-8 md:p-16 border-4 border-roach-ink shadow-[12px_12px_0_0_rgba(44,44,42,1)] backdrop-blur-sm">
        <h1 className="text-8xl md:text-9xl font-bold font-['Anton'] text-roach-coral mb-2">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold font-['Playfair_Display'] italic text-roach-ink mb-2">
          This Page is Unemployed
        </h2>
        <p className="font-mono text-roach-coral font-bold mb-6">ये पेज भी सिस्टम का मारा हुआ है।</p>
        
        <p className="font-mono text-roach-muted text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
          It applied to be a real URL, but lacked 10 years of experience for an entry-level position. 
          The system rejected it. It doesn't exist anymore.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary">Return to the Colony</Link>
          <Link to="/anthill" className="btn-secondary">Go Build Something</Link>
        </div>
      </div>

    </div>
  );
}
