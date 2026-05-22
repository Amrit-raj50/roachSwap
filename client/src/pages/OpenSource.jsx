import { Link } from "react-router-dom";

export default function OpenSource() {
  const openLink = (url) => window.open(url, '_blank', 'noreferrer');

  return (
    <div className="bg-roach-surface text-roach-ink font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-[1fr_450px] gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 border-2 border-roach-ink rounded-full px-4 py-1.5 text-xs font-bold font-mono tracking-widest uppercase mb-8">
            <span className="w-2 h-2 bg-roach-coral rounded-full animate-pulse"></span>
            RoachSwap · Open Source
          </div>
          <h1 className="font-['Anton'] text-[3.5rem] md:text-[5.5rem] leading-[0.9] tracking-tight uppercase mb-4">
            So you want to<br/>
            contribute?<br/>
            <span className="font-['Playfair_Display'] italic font-black text-roach-green lowercase tracking-tighter text-[3.5rem] md:text-[6rem] block mt-2">
              Prove it.
            </span>
          </h1>
          <p className="font-mono text-roach-coral font-bold text-lg mb-6 max-w-xl">
            बस यार। Fork करो। PR डालो। वरना LinkedIn पर "Open to work" लगाते रहो।
          </p>
          <p className="font-['Playfair_Display'] text-roach-muted text-lg md:text-xl italic mb-8 max-w-lg leading-relaxed">
            The colony is open source. The codebase is public. The issues are real. The only thing standing between you and your first commit is the 47 tabs you have open on "how to use git."
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="https://github.com/Amrit-raj50/roachSwap" target="_blank" rel="noreferrer" className="btn-primary flex items-center gap-2">
              Fork the Repo →
            </a>
            <a href="https://github.com/Amrit-raj50/roachSwap/issues" target="_blank" rel="noreferrer" className="btn-secondary border-roach-coral text-roach-coral hover:bg-roach-coral hover:text-white">
              View Issues
            </a>
          </div>
        </div>

        {/* HERO POSTER */}
        <div className="bg-roach-ink text-roach-surface p-6 md:p-8 relative overflow-hidden shadow-[12px_12px_0_0_rgba(192,90,0,1)] border-4 border-roach-ink">
          <div className="absolute top-4 right-4 bg-roach-coral text-white text-[10px] font-black tracking-widest px-3 py-1 rotate-[5deg] uppercase">
            REQUIRED READING
          </div>
          <div className="text-[10px] tracking-widest text-roach-muted uppercase mb-4 font-mono">
            Propaganda Poster · No. 002
          </div>
          
          <img src="/assets/roach_rant.png" alt="Degree Hai Job Nahi" className="w-full h-auto mb-6 border-2 border-roach-surface" />
          
          <div className="font-['Anton'] text-2xl tracking-wide text-center uppercase leading-tight mb-4">
            "They called us cockroaches.<br/><span className="text-roach-coral">We decided to commit.</span>"
          </div>
          <div className="font-mono text-xs text-roach-muted italic text-center">
            "अरे PR तो डाल भाई। Worst case, reject हो जाएगा। तू पहले से unemployed है — और क्या जाएगा?"
          </div>
        </div>
      </section>

      <div className="h-1 bg-roach-ink w-full"></div>

      {/* 2. TICKER */}
      <div className="bg-roach-ink text-[#F1EFE8] py-3 overflow-hidden whitespace-nowrap border-b-4 border-roach-ink">
        <div className="inline-block animate-scroll text-[14px] tracking-widest font-mono font-bold uppercase">
          🪳 DEGREE HAI. JOB NAHI. · "We are reviewing your application" (they are not) · कब तक घर में बैठोगे? जा, कुछ build कर। · Your side project won't build itself · HR hasn't ghosted me yet (it's been 3 weeks) · 6 rounds for an intern role. 6. · मैं भी Cockroach। तू भी। हम सब Cockroach। · 🪳
        </div>
      </div>

      {/* 3. STEP BY STEP */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-[11px] font-bold font-mono tracking-[0.2em] uppercase text-roach-coral mb-6 text-center">Execution Manual</div>
        <h2 className="font-['Anton'] text-4xl md:text-6xl uppercase tracking-wide leading-[1.1] mb-16 text-center">
          How to actually<br/>
          <span className="font-['Playfair_Display'] italic font-black text-roach-green lowercase tracking-tighter">contribute.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Step 1 */}
          <div className="border-4 border-roach-ink bg-white p-8 relative shadow-[8px_8px_0_0_rgba(44,44,42,1)] hover:translate-y-[-4px] hover:translate-x-[-4px] hover:shadow-[12px_12px_0_0_rgba(44,44,42,1)] transition-all">
            <div className="font-['Anton'] text-6xl text-roach-coral/20 absolute top-4 right-6">01</div>
            <h3 className="font-bold text-2xl uppercase mb-3 pr-16">Fork the repo. Yes, right now.</h3>
            <p className="font-mono text-sm text-roach-muted mb-6 leading-relaxed">
              Stop reading Medium articles about "how to contribute to open source." There is nothing to read. Click Fork. That's it. You just became a contributor.
            </p>
            <div className="bg-roach-surface border-2 border-roach-ink p-4 font-mono text-xs font-bold text-roach-ink break-all">
              github.com/Amrit-raj50/roachSwap<br/>
              <span className="text-roach-green">→ Fork → Clone → cd roachSwap</span>
            </div>
            <div className="mt-4 text-xs font-bold text-roach-coral italic">
              क्या? अभी तक GitHub account नहीं बना? जा बना। हम यहीं हैं।
            </div>
          </div>

          {/* Step 2 */}
          <div className="border-4 border-roach-ink bg-white p-8 relative shadow-[8px_8px_0_0_rgba(44,44,42,1)] hover:translate-y-[-4px] hover:translate-x-[-4px] hover:shadow-[12px_12px_0_0_rgba(44,44,42,1)] transition-all">
            <div className="font-['Anton'] text-6xl text-roach-coral/20 absolute top-4 right-6">02</div>
            <h3 className="font-bold text-2xl uppercase mb-3 pr-16">Set up the colony locally.</h3>
            <p className="font-mono text-sm text-roach-muted mb-6 leading-relaxed">
              Frontend runs on Vite. Backend on Express. MongoDB Atlas is free. You have no excuse. Read ARCHITECTURE.md if you get lost — it was written for humans.
            </p>
            <div className="bg-roach-surface border-2 border-roach-ink p-4 font-mono text-xs font-bold text-roach-ink break-all">
              cd client && npm install && npm run dev<br/>
              <span className="text-roach-green">cd server && npm install && npm run dev</span>
            </div>
            <div className="mt-4 text-xs font-bold text-roach-coral italic">
              .env.example में देख। हर cheez wahan hai। README padh। पहले पूरा README padh।
            </div>
          </div>

          {/* Step 3 */}
          <div className="border-4 border-roach-ink bg-white p-8 relative shadow-[8px_8px_0_0_rgba(44,44,42,1)] hover:translate-y-[-4px] hover:translate-x-[-4px] hover:shadow-[12px_12px_0_0_rgba(44,44,42,1)] transition-all">
            <div className="font-['Anton'] text-6xl text-roach-coral/20 absolute top-4 right-6">03</div>
            <h3 className="font-bold text-2xl uppercase mb-3 pr-16">Find a "good first issue."</h3>
            <p className="font-mono text-sm text-roach-muted mb-6 leading-relaxed">
              Check the Issues tab. Filter by "good first issue." Pick something small. Fix a typo. Improve a loading message. Add a sarcastic phrase. Ship something.
            </p>
            <div className="bg-roach-surface border-2 border-roach-ink p-4 font-mono text-xs font-bold text-roach-ink break-all">
              github.com/Amrit-raj50/roachSwap/issues<br/>
              <span className="text-roach-green">→ Filter: good first issue → Comment "I'm taking this"</span>
            </div>
            <div className="mt-4 text-xs font-bold text-roach-coral italic">
              पहले comment करो कि "मैं ले रहा हूँ।" वरना 3 लोग एक ही issue पर PR डालेंगे।
            </div>
          </div>

          {/* Step 4 */}
          <div className="border-4 border-roach-ink bg-white p-8 relative shadow-[8px_8px_0_0_rgba(44,44,42,1)] hover:translate-y-[-4px] hover:translate-x-[-4px] hover:shadow-[12px_12px_0_0_rgba(44,44,42,1)] transition-all">
            <div className="font-['Anton'] text-6xl text-roach-coral/20 absolute top-4 right-6">04</div>
            <h3 className="font-bold text-2xl uppercase mb-3 pr-16">Write code. In roach voice.</h3>
            <p className="font-mono text-sm text-roach-muted mb-6 leading-relaxed">
              Every string the user sees must come from roachCopy.js. No generic error messages. No "Something went wrong." If it broke, say it like a roach.
            </p>
            <div className="bg-roach-surface border-2 border-roach-ink p-4 font-mono text-xs font-bold text-roach-ink break-all">
              // roachCopy.js<br/>
              <span className="text-roach-green">error_generic: "कुछ टूट गया। हम भी टूटे हैं।"</span>
            </div>
            <div className="mt-4 text-xs font-bold text-roach-coral italic">
              अगर तुमने "Something went wrong." लिखा तो PR reject होगा। हम serious हैं।
            </div>
          </div>

        </div>
      </section>

      <div className="h-1 bg-roach-ink w-full"></div>

      {/* 4. DOCUMENTS */}
      <section className="bg-roach-ink text-roach-surface py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-[11px] font-bold font-mono tracking-[0.2em] uppercase text-roach-green mb-6 text-center">Required Reading</div>
          <h2 className="font-['Anton'] text-4xl md:text-5xl uppercase tracking-wide leading-[1.1] mb-12 text-center">
            The Three Documents
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-2 border-roach-surface p-6 hover:bg-roach-surface hover:text-roach-ink transition-colors group cursor-pointer" onClick={() => openLink('https://github.com/Amrit-raj50/roachSwap/blob/main/README.md')}>
              <img src="/assets/roach_anthill.png" alt="README Poster" className="w-full h-40 object-cover border-2 border-roach-surface mb-4 grayscale-[0.8] group-hover:grayscale-0 group-hover:border-roach-ink transition-all" />
              <h3 className="font-bold text-xl uppercase mb-2">README.md</h3>
              <p className="font-mono text-xs opacity-80 mb-6 leading-relaxed">What RoachSwap is, why it exists, and how to run it locally. If you read only one doc — read this one.</p>
              <div className="text-roach-green group-hover:text-roach-coral font-bold font-mono text-xs uppercase tracking-widest">→ Read Now</div>
              <div className="mt-4 text-xs italic text-roach-coral">जो नहीं पढ़ता वो colony का नहीं होता।</div>
            </div>

            <div className="border-2 border-roach-surface p-6 hover:bg-roach-surface hover:text-roach-ink transition-colors group cursor-pointer" onClick={() => openLink('https://github.com/Amrit-raj50/roachSwap/blob/main/ARCHITECTURE.md')}>
              <img src="/assets/roach_scrapyard.png" alt="Architecture Poster" className="w-full h-40 object-cover border-2 border-roach-surface mb-4 grayscale-[0.8] group-hover:grayscale-0 group-hover:border-roach-ink transition-all" />
              <h3 className="font-bold text-xl uppercase mb-2">ARCHITECTURE.md</h3>
              <p className="font-mono text-xs opacity-80 mb-6 leading-relaxed">How the codebase is structured. Pages, components, backend routes — everything mapped and explained.</p>
              <div className="text-roach-green group-hover:text-roach-coral font-bold font-mono text-xs uppercase tracking-widest">→ Read Now</div>
              <div className="mt-4 text-xs italic text-roach-coral">पहले architecture समझो, फिर code छेड़ो।</div>
            </div>

            <div className="border-2 border-roach-surface p-6 hover:bg-roach-surface hover:text-roach-ink transition-colors group cursor-pointer" onClick={() => openLink('https://github.com/Amrit-raj50/roachSwap/blob/main/CONTRIBUTING.md')}>
              <img src="/assets/roach_moult.png" alt="Contributing Poster" className="w-full h-40 object-cover border-2 border-roach-surface mb-4 grayscale-[0.8] group-hover:grayscale-0 group-hover:border-roach-ink transition-all" />
              <h3 className="font-bold text-xl uppercase mb-2">CONTRIBUTING.md</h3>
              <p className="font-mono text-xs opacity-80 mb-6 leading-relaxed">The rules of the colony. PR process, code review expectations, and how to not make the maintainer cry.</p>
              <div className="text-roach-green group-hover:text-roach-coral font-bold font-mono text-xs uppercase tracking-widest">→ Read Now</div>
              <div className="mt-4 text-xs italic text-roach-coral">यह पढ़े बिना PR डाला तो... we'll still review it. We are desperate.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CODE OF CONDUCT */}
      <section className="bg-roach-coral text-white py-20 px-6 border-t-4 border-roach-ink">
        <div className="max-w-4xl mx-auto">
          <div className="text-[11px] font-bold font-mono tracking-[0.2em] uppercase text-roach-ink mb-6">Rules of Engagement</div>
          <h2 className="font-['Anton'] text-4xl md:text-5xl uppercase tracking-wide leading-[1.1] mb-10 text-roach-ink">
            The Colony's <br/>
            <span className="text-white">Code of Conduct.</span>
          </h2>
          
          <div className="space-y-4">
            <div className="bg-roach-ink p-6 border-4 border-roach-ink text-roach-surface hover:translate-x-2 transition-transform flex gap-4 items-start">
              <span className="text-2xl">🚫</span>
              <div>
                <strong className="font-bold uppercase text-lg block mb-1">Don't be corporate.</strong>
                <span className="font-mono text-sm opacity-80">No "per my last email" energy. No passive aggression in PR reviews. You were unemployed last week. Stay humble, roach.</span>
              </div>
            </div>
            
            <div className="bg-roach-ink p-6 border-4 border-roach-ink text-roach-surface hover:translate-x-2 transition-transform flex gap-4 items-start">
              <span className="text-2xl">🚫</span>
              <div>
                <strong className="font-bold uppercase text-lg block mb-1">Don't hardcode strings.</strong>
                <span className="font-mono text-sm opacity-80">Every user-facing message goes in <strong>roachCopy.js</strong>. This is non-negotiable. Don't dilute the brand with generic messages.</span>
              </div>
            </div>

            <div className="bg-roach-surface p-6 border-4 border-roach-ink text-roach-ink hover:translate-x-2 transition-transform flex gap-4 items-start shadow-[8px_8px_0_0_rgba(44,44,42,1)]">
              <span className="text-2xl">✅</span>
              <div>
                <strong className="font-bold uppercase text-lg block mb-1 text-roach-green">Do ask questions.</strong>
                <span className="font-mono text-sm font-bold opacity-80">Discord is open. Colony is friendly. There is no stupid question, only the question you didn't ask before spending 4 hours debugging.</span>
              </div>
            </div>

            <div className="bg-roach-surface p-6 border-4 border-roach-ink text-roach-ink hover:translate-x-2 transition-transform flex gap-4 items-start shadow-[8px_8px_0_0_rgba(44,44,42,1)]">
              <span className="text-2xl">✅</span>
              <div>
                <strong className="font-bold uppercase text-lg block mb-1 text-roach-green">Do bring the roach energy.</strong>
                <span className="font-mono text-sm font-bold opacity-80">Hindi phrases, sarcasm, honest frustration — this is the brand. If your contribution makes someone feel seen at 2am, you shipped something real.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. JOIN CTA */}
      <section className="bg-roach-surface py-24 px-6 text-center border-t-4 border-roach-ink relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-['Anton'] text-[15rem] text-roach-ink/5 pointer-events-none select-none">
          SWARM
        </div>
        
        <div className="relative z-10">
          <h2 className="font-['Anton'] text-4xl md:text-6xl uppercase tracking-wide mb-6">Stop reading.<br/>Start committing.</h2>
          <p className="font-mono text-roach-muted max-w-lg mx-auto mb-10 font-bold">Every great colony started with one roach who stopped waiting for permission.</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://github.com/Amrit-raj50/roachSwap" target="_blank" rel="noreferrer" className="bg-roach-ink text-white font-mono font-bold uppercase tracking-widest text-sm px-8 py-4 border-4 border-roach-ink hover:bg-transparent hover:text-roach-ink transition-colors shadow-[6px_6px_0_0_rgba(44,44,42,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]">
              Fork Repo
            </a>
            <a href="https://discord.gg/BeFN78k5b" target="_blank" rel="noreferrer" className="bg-roach-green text-white font-mono font-bold uppercase tracking-widest text-sm px-8 py-4 border-4 border-roach-green hover:bg-transparent hover:text-roach-green transition-colors shadow-[6px_6px_0_0_rgba(15,110,86,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]">
              Join Discord
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
