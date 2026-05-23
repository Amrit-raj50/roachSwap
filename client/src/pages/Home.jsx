import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-roach-surface text-roach-ink font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 min-[320px]:px-6 py-12 min-[320px]:py-16 md:py-24 grid md:grid-cols-[1fr_400px] gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 border-2 border-roach-ink rounded-full px-3 py-1 min-[320px]:px-4 min-[320px]:py-1.5 text-[10px] min-[320px]:text-xs font-bold font-mono tracking-wider min-[320px]:tracking-widest uppercase mb-8">
            <span className="w-2 h-2 bg-roach-coral rounded-full animate-pulse"></span>
            Main Bhi Cockroach · Live Now
          </div>
          <h1 className="font-['Anton'] text-[2.2rem] min-[320px]:text-[3.5rem] md:text-[6rem] leading-[0.9] tracking-tight uppercase mb-4">
            Voice of the<br/>
            <span className="text-roach-coral">Lazy</span> &amp;<br/>
            <span className="font-['Playfair_Display'] italic font-black text-roach-green lowercase tracking-tighter text-[2rem] min-[320px]:text-[3rem] md:text-[5.5rem] block mt-2">
              unemployed.
            </span>
          </h1>
          <p className="font-mono text-roach-coral font-bold text-sm min-[320px]:text-base md:text-lg mb-6">
            मैं भी कॉकरोच — आलसी और बेरोज़गार की आवाज़
          </p>
          <p className="font-['Playfair_Display'] text-roach-muted text-base min-[320px]:text-lg md:text-xl italic mb-6 min-[320px]:mb-8 max-w-lg leading-relaxed">
            For everyone the system forgot, mocked, rejected, ghosted, overworked, underpaid, or called lazy. <br/>
            Five demands. Zero sponsors. One stubborn swarm.
          </p>
          <div className="flex flex-wrap items-center gap-3 min-[320px]:gap-4">
            <Link to="/register" className="btn-primary text-sm min-[320px]:text-base px-3 py-1.5 min-[320px]:px-4 min-[320px]:py-2">Join the Swarm →</Link>
            <a href="https://discord.gg/BeFN78k5b" target="_blank" rel="noreferrer" className="btn-secondary text-sm min-[320px]:text-base px-3 py-1.5 min-[320px]:px-4 min-[320px]:py-2 flex items-center gap-2 border-[#5865F2] text-[#5865F2] hover:bg-[#5865F2] hover:text-white">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
              Discord
            </a>
            <Link to="/rejections" className="btn-secondary text-sm min-[320px]:text-base px-3 py-1.5 min-[320px]:px-4 min-[320px]:py-2 border-roach-coral text-roach-coral hover:bg-roach-coral hover:text-white">Submit Your Rant</Link>
          </div>
        </div>

        {/* HERO POSTER */}
        <div className="bg-roach-ink text-roach-surface p-4 min-[320px]:p-6 md:p-8 relative overflow-hidden shadow-[6px_6px_0_0_rgba(192,90,0,1)] min-[320px]:shadow-[12px_12px_0_0_rgba(192,90,0,1)] border-4 border-roach-ink">
          <div className="absolute top-4 right-4 bg-roach-coral text-white text-[9px] min-[320px]:text-[10px] font-black tracking-widest px-2.5 py-0.5 min-[320px]:px-3 min-[320px]:py-1 rotate-[5deg] uppercase">
            APPROVED
          </div>
          <div className="text-[9px] min-[320px]:text-[10px] tracking-wider min-[320px]:tracking-widest text-roach-muted uppercase mb-4 font-mono">
            Official Poster · No. 001 · · ·
          </div>
          
          <img src="/roach_propaganda.png" alt="Roach Propaganda" className="w-full h-auto mb-6 border-2 border-roach-surface" />
          
          <div className="font-['Anton'] text-xl min-[320px]:text-2xl tracking-wide text-center uppercase leading-tight mb-6">
            Together, We <span className="text-roach-coral">Survive.</span><br/>Stronger Together.
          </div>
          
          <div className="border-t border-roach-surface/20 pt-4 text-center">
            <span className="font-['Anton'] text-4xl min-[320px]:text-5xl text-roach-coral block">∞</span>
            <div className="text-[9px] min-[320px]:text-[10px] tracking-wider min-[320px]:tracking-widest uppercase text-roach-muted font-mono mt-1">Grievances & counting*</div>
            <div className="text-[9px] text-roach-muted/60 mt-1 italic font-mono">*may include rage, duplicates, and tears</div>
            <div className="flex items-center justify-center gap-1.5 mt-2 text-[9px] min-[320px]:text-[10px] text-roach-green font-mono font-bold">
              <div className="w-1.5 h-1.5 bg-roach-green rounded-full animate-pulse"></div> Growing right now
            </div>
          </div>
        </div>
      </section>

      <div className="h-1 bg-roach-ink w-full"></div>

      {/* 2. STATS STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b-4 border-roach-ink bg-roach-surface">
        <div className="p-4 min-[320px]:p-6 md:p-8 border-r-2 border-b-2 md:border-b-0 border-roach-ink text-center">
          <span className="font-['Anton'] text-3xl min-[320px]:text-4xl md:text-5xl text-roach-coral block">∞</span>
          <span className="text-[9px] min-[320px]:text-[10px] font-mono font-bold tracking-wider min-[320px]:tracking-widest uppercase text-roach-muted mt-2 block">Lines of Code</span>
        </div>
        <div className="p-4 min-[320px]:p-6 md:p-8 border-b-2 md:border-b-0 md:border-r-2 border-roach-ink text-center">
          <span className="font-['Anton'] text-3xl min-[320px]:text-4xl md:text-5xl text-roach-coral block">300M</span>
          <span className="text-[9px] min-[320px]:text-[10px] font-mono font-bold tracking-wider min-[320px]:tracking-widest uppercase text-roach-muted mt-2 block">Years Survived</span>
        </div>
        <div className="p-4 min-[320px]:p-6 md:p-8 border-r-2 border-roach-ink text-center">
          <span className="font-['Anton'] text-3xl min-[320px]:text-4xl md:text-5xl text-roach-coral block">0</span>
          <span className="text-[9px] min-[320px]:text-[10px] font-mono font-bold tracking-wider min-[320px]:tracking-widest uppercase text-roach-muted mt-2 block">Sponsors</span>
        </div>
        <div className="p-4 min-[320px]:p-6 md:p-8 text-center">
          <span className="font-['Anton'] text-3xl min-[320px]:text-4xl md:text-5xl text-roach-coral block">100%</span>
          <span className="text-[9px] min-[320px]:text-[10px] font-mono font-bold tracking-wider min-[320px]:tracking-widest uppercase text-roach-muted mt-2 block">Spite-Driven</span>
        </div>
      </div>

      {/* 3. ORIGIN SECTION */}
      <section className="bg-roach-ink text-roach-surface py-12 min-[320px]:py-20 px-4 min-[320px]:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-[11px] font-bold font-mono tracking-[0.2em] uppercase text-[#c87060] mb-6">How It Started</div>
          <h2 className="font-['Anton'] text-3xl min-[320px]:text-4xl md:text-6xl uppercase tracking-wide leading-[1.1] mb-10">
            They called us<br/>
            <span className="font-['Playfair_Display'] italic font-black text-[#8fc99a] lowercase tracking-tighter">cockroaches.</span><br/>
            We decided to build.
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-start font-mono text-sm leading-relaxed text-[#9a917f]">
            <div>
              <p className="mb-4">One day, India's unemployed youth were compared to cockroaches.</p>
              <p className="mb-4"><strong className="text-roach-surface">Bad metaphor. Great organizing opportunity.</strong></p>
              <p className="mb-8">Cockroaches survive floods, fires, neglect, pesticides, and bad governance. So do we. This is not a platform funded by billionaires. This is a public complaint box with a built-in IDE.</p>
              <Link to="/register" className="btn-primary bg-roach-coral border-roach-coral text-white hover:bg-[#964500]">Main Bhi Cockroach →</Link>
            </div>
            <div className="border-l-4 border-roach-coral pl-4 min-[320px]:pl-6">
              <p className="mb-3">No billionaire backers.</p>
              <p className="mb-3">No corporate gatekeepers.</p>
              <p className="mb-3">No 6-round interviews.</p>
              <p className="mt-6 text-[#7a7060]">RoachSwap is a satirical people's movement for India's unemployed, underemployed, overqualified, underpaid, and permanently frustrated developers.</p>
              <p className="mt-3 text-[#7a7060]">Just resentment, Wi-Fi, and survival instinct.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-1 bg-roach-ink w-full"></div>

      {/* 4. THE MANIFESTO (FEATURES) */}
      <section className="bg-roach-surface py-12 min-[320px]:py-20 px-4 min-[320px]:px-6 border-b-4 border-roach-ink">
        <div className="max-w-5xl mx-auto">
          <div className="text-[11px] font-bold font-mono tracking-[0.2em] uppercase text-roach-coral mb-6">The Roach Manifesto</div>
          <h2 className="font-['Anton'] text-3xl min-[320px]:text-4xl md:text-6xl uppercase tracking-wide leading-none mb-4">
            We are not lazy.<br/>
            We are <span className="font-['Playfair_Display'] italic font-black text-roach-green lowercase tracking-tighter">tired.</span>
          </h2>
          <p className="font-mono text-roach-muted mb-12">Not portals. Not empty promises. Not "we'll get back to you." Real tools.</p>
          
          <div className="flex flex-col">
            {/* Feature 1 */}
            <div className="grid grid-cols-[50px_1fr] min-[320px]:grid-cols-[80px_1fr] md:grid-cols-[100px_1fr] border-t-2 border-roach-ink py-6 min-[320px]:py-8 gap-4 min-[320px]:gap-6 group hover:bg-roach-surface-dark transition-colors px-2 min-[320px]:px-4 -mx-2 min-[320px]:-mx-4 cursor-pointer">
              <div className="font-['Anton'] text-3xl min-[320px]:text-4xl md:text-5xl text-roach-coral/20 pt-1 group-hover:text-roach-coral transition-colors">01</div>
              <div>
                <h3 className="font-bold text-xl uppercase mb-2">The Anthill</h3>
                <p className="font-mono text-sm text-roach-muted italic mb-4">Stop building alone. Find your swarm. Ship open source projects that actually matter, driven by real spite.</p>
                <Link to="/anthill" className="text-xs font-bold font-mono tracking-widest text-roach-coral uppercase hover:underline">Enter the Anthill →</Link>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="grid grid-cols-[50px_1fr] min-[320px]:grid-cols-[80px_1fr] md:grid-cols-[100px_1fr] border-t-2 border-roach-ink py-6 min-[320px]:py-8 gap-4 min-[320px]:gap-6 group hover:bg-roach-surface-dark transition-colors px-2 min-[320px]:px-4 -mx-2 min-[320px]:-mx-4 cursor-pointer">
              <div className="font-['Anton'] text-3xl min-[320px]:text-4xl md:text-5xl text-roach-coral/20 pt-1 group-hover:text-roach-coral transition-colors">02</div>
              <div>
                <h3 className="font-bold text-xl uppercase mb-2">Moult Market</h3>
                <p className="font-mono text-sm text-roach-muted italic mb-4">Need a logo but only know React? Swap your skills directly. No currency, no middlemen, just raw barter.</p>
                <Link to="/moult" className="text-xs font-bold font-mono tracking-widest text-roach-coral uppercase hover:underline">Trade Skills →</Link>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid grid-cols-[50px_1fr] min-[320px]:grid-cols-[80px_1fr] md:grid-cols-[100px_1fr] border-t-2 border-roach-ink py-6 min-[320px]:py-8 gap-4 min-[320px]:gap-6 group hover:bg-roach-surface-dark transition-colors px-2 min-[320px]:px-4 -mx-2 min-[320px]:-mx-4 cursor-pointer">
              <div className="font-['Anton'] text-3xl min-[320px]:text-4xl md:text-5xl text-roach-coral/20 pt-1 group-hover:text-roach-coral transition-colors">03</div>
              <div>
                <h3 className="font-bold text-xl uppercase mb-2">The Scrap Yard</h3>
                <p className="font-mono text-sm text-roach-muted italic mb-4">Dump your abandoned repositories. Let other scavengers revive your dead code and turn it into something beautiful.</p>
                <Link to="/scrapyard" className="text-xs font-bold font-mono tracking-widest text-roach-coral uppercase hover:underline">Scavenge Now →</Link>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="grid grid-cols-[50px_1fr] min-[320px]:grid-cols-[80px_1fr] md:grid-cols-[100px_1fr] border-y-2 border-roach-ink py-6 min-[320px]:py-8 gap-4 min-[320px]:gap-6 group hover:bg-roach-surface-dark transition-colors px-2 min-[320px]:px-4 -mx-2 min-[320px]:-mx-4 cursor-pointer">
              <div className="font-['Anton'] text-3xl min-[320px]:text-4xl md:text-5xl text-roach-coral/20 pt-1 group-hover:text-roach-coral transition-colors">04</div>
              <div>
                <h3 className="font-bold text-xl uppercase mb-2">Wall of Rejections</h3>
                <p className="font-mono text-sm text-roach-muted italic mb-4">Turn their automated "unfortunately" emails into a badge of honor. We judge them together.</p>
                <Link to="/rejections" className="text-xs font-bold font-mono tracking-widest text-roach-coral uppercase hover:underline">View the Wall →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ELIGIBILITY */}
      <section className="py-12 min-[320px]:py-20 px-4 min-[320px]:px-6 max-w-4xl mx-auto">
        <div className="text-[11px] font-bold font-mono tracking-[0.2em] uppercase text-roach-coral mb-6 text-center">Membership | क्या आप सिस्टम से परेशान हैं?</div>
        <h2 className="font-['Anton'] text-3xl min-[320px]:text-4xl md:text-5xl uppercase tracking-wide leading-[1.1] mb-6 text-center">
          Are you eligible<br/>to <span className="font-['Playfair_Display'] italic font-black text-roach-green lowercase tracking-tighter">join?</span>
        </h2>
        <p className="font-mono text-roach-muted text-center max-w-2xl mx-auto mb-4 leading-relaxed text-sm min-[320px]:text-base">
          We do not check degrees, leetcode scores, or productivity levels.<br/>
          The only requirement is that you have, at some point, looked at the system and said: <strong>"Bas yaar."</strong>
        </p>
        <p className="font-mono text-xs text-roach-muted text-center italic mb-12">We do, however, have three (3) emotional requirements.</p>

        <div className="flex flex-col gap-4">
          <div className="border-2 border-roach-ink p-4 min-[320px]:p-6 flex flex-col min-[320px]:flex-row items-start min-[320px]:items-center gap-4 min-[320px]:gap-6 hover:bg-roach-coral-light transition-colors">
            <div className="font-mono text-xs font-bold text-roach-coral uppercase tracking-widest w-24 flex-shrink-0">REQ / 01</div>
            <div className="flex-grow">
              <h3 className="font-bold text-base min-[320px]:text-lg uppercase mb-1">Unemployed or Emotionally Employed</h3>
              <p className="font-mono text-xs text-roach-muted italic">Students, job seekers, freelancers, and corporate survivors—all welcome.</p>
            </div>
            <div className="hidden md:flex w-10 h-10 border-2 border-roach-ink rounded-full items-center justify-center text-roach-green text-xl font-black">✓</div>
          </div>
          
          <div className="border-2 border-roach-ink p-4 min-[320px]:p-6 flex flex-col min-[320px]:flex-row items-start min-[320px]:items-center gap-4 min-[320px]:gap-6 hover:bg-roach-coral-light transition-colors">
            <div className="font-mono text-xs font-bold text-roach-coral uppercase tracking-widest w-24 flex-shrink-0">REQ / 02</div>
            <div className="flex-grow">
              <h3 className="font-bold text-base min-[320px]:text-lg uppercase mb-1">Lazy, According to Relatives</h3>
              <p className="font-mono text-xs text-roach-muted italic">Especially if your relatives believe getting a job in 2026 is as easy as walking into an office.</p>
            </div>
            <div className="hidden md:flex w-10 h-10 border-2 border-roach-ink rounded-full items-center justify-center text-roach-green text-xl font-black">✓</div>
          </div>

          <div className="border-2 border-roach-ink p-4 min-[320px]:p-6 flex flex-col min-[320px]:flex-row items-start min-[320px]:items-center gap-4 min-[320px]:gap-6 hover:bg-roach-coral-light transition-colors">
            <div className="font-mono text-xs font-bold text-roach-coral uppercase tracking-widest w-24 flex-shrink-0">REQ / 03</div>
            <div className="flex-grow">
              <h3 className="font-bold text-base min-[320px]:text-lg uppercase mb-1">Ready to Build</h3>
              <p className="font-mono text-xs text-roach-muted italic">We are tired of complaining. Now we code.</p>
            </div>
            <div className="hidden md:flex w-10 h-10 border-2 border-roach-ink rounded-full items-center justify-center text-roach-green text-xl font-black">✓</div>
          </div>
        </div>
      </section>

      {/* 6. JOIN CTA */}
      <section className="bg-roach-coral text-white py-16 min-[320px]:py-24 px-4 min-[320px]:px-6 text-center border-t-4 border-roach-ink">
        <h2 className="font-['Anton'] text-3xl min-[320px]:text-4xl md:text-6xl uppercase tracking-wide mb-4">One Nation.<br/>One Swarm.<br/>Indestructible.</h2>
        <p className="font-mono text-white/80 max-w-lg mx-auto mb-8 min-[320px]:mb-10 text-sm min-[320px]:text-base">Stop waiting for permission to build. Join the colony and start shipping today.</p>
        <Link to="/register" className="inline-block bg-roach-ink text-white font-mono font-bold uppercase tracking-widest text-xs min-[320px]:text-sm px-6 py-3 min-[320px]:px-8 min-[320px]:py-4 border-2 border-roach-ink hover:bg-transparent hover:text-roach-ink transition-colors shadow-[6px_6px_0_0_rgba(44,44,42,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]">
          Join the Swarm
        </Link>
      </section>

    </div>
  );
}