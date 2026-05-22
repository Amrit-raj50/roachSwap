import { Link } from "react-router-dom";

export default function OpenSource() {
  const openLink = (url) => window.open(url, '_blank', 'noreferrer');

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-roach-ink">
      <h2 className="sr-only">RoachSwap open source contributor page — how to join the colony, contribute to the repo, and understand the architecture</h2>

      {/* Hero */}
      <div className="border-b-2 border-roach-ink pb-5 mb-7">
        <div className="text-[11px] tracking-[.18em] text-gray-500 uppercase mb-3 font-mono">🪳 roachswap · open source · main bhi cockroach</div>
        <div className="text-4xl font-medium leading-[1.15] mb-2.5">
          So you want to<br/>contribute? <span className="text-[#1D9E75]">Prove it.</span>
        </div>
        <div className="text-[15px] text-gray-500 leading-relaxed max-w-[560px] mb-4">
          The colony is open source. The codebase is public. The issues are real. The only thing standing between you and your first commit is the 47 tabs you have open on "how to use git."
        </div>
        <div className="text-[13px] text-[#633806] bg-[#FAEEDA] border-l-4 border-[#BA7517] px-3.5 py-2 rounded-r-md inline-block italic m-0">
          बस यार। Fork करो। PR डालो। वरना LinkedIn पर "Open to work" लगाते रहो। 😌
        </div>
      </div>

      {/* Ticker */}
      <div className="bg-[#2C2C2A] text-[#F1EFE8] py-2.5 overflow-hidden whitespace-nowrap mb-7 rounded-md">
        <div className="inline-block animate-scroll text-[13px] tracking-[.06em] font-mono">
          🪳 DEGREE HAI. JOB NAHI. · "We are reviewing your application" (they are not) · कब तक घर में बैठोगे? जा, कुछ build कर। · Your side project won't build itself · HR hasn't ghosted me yet (it's been 3 weeks) · 6 rounds for an intern role. 6. · मैं भी Cockroach। तू भी। हम सब Cockroach। · We survived 300 million years. We will survive this tech interview too. · बहुत हो गया अकेले suffer करना। आ, साथ में build करते हैं। 🪳
        </div>
      </div>

      {/* Poster Art */}
      <div className="w-full border-[0.5px] border-gray-300 rounded-lg bg-[#F1EFE8] flex items-center gap-5 p-5 mb-7">
        <div className="w-[180px] h-[180px] shrink-0 rounded-md overflow-hidden relative">
          <svg viewBox="0 0 180 180" width="180" height="180" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="180" height="180" fill="#2C2C2A"/>
            <rect x="8" y="8" width="164" height="164" fill="none" stroke="#F1EFE8" strokeWidth="1.5" strokeDasharray="5 3"/>
            <ellipse cx="90" cy="96" rx="28" ry="38" fill="#F1EFE8"/>
            <ellipse cx="90" cy="62" rx="14" ry="11" fill="#F1EFE8"/>
            <line x1="82" y1="54" x2="68" y2="40" stroke="#F1EFE8" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="66" cy="38" r="3" fill="#1D9E75"/>
            <line x1="98" y1="54" x2="112" y2="40" stroke="#F1EFE8" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="114" cy="38" r="3" fill="#1D9E75"/>
            <line x1="64" y1="80" x2="46" y2="74" stroke="#F1EFE8" strokeWidth="2" strokeLinecap="round"/>
            <line x1="63" y1="96" x2="44" y2="96" stroke="#F1EFE8" strokeWidth="2" strokeLinecap="round"/>
            <line x1="64" y1="112" x2="46" y2="118" stroke="#F1EFE8" strokeWidth="2" strokeLinecap="round"/>
            <line x1="116" y1="80" x2="134" y2="74" stroke="#F1EFE8" strokeWidth="2" strokeLinecap="round"/>
            <line x1="117" y1="96" x2="136" y2="96" stroke="#F1EFE8" strokeWidth="2" strokeLinecap="round"/>
            <line x1="116" y1="112" x2="134" y2="118" stroke="#F1EFE8" strokeWidth="2" strokeLinecap="round"/>
            <line x1="90" y1="72" x2="90" y2="132" stroke="#2C2C2A" strokeWidth="1.5"/>
            <text x="90" y="152" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="9" fill="#1D9E75" letterSpacing="3">MAIN BHI</text>
            <text x="90" y="163" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="9" fill="#1D9E75" letterSpacing="3">COCKROACH</text>
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-[11px] tracking-[.12em] text-gray-500 uppercase mb-2 font-mono">propaganda poster #001</div>
          <div className="text-[22px] font-medium leading-[1.2] mb-2.5">
            "They called us<br/>cockroaches.<br/>We decided to <span className="text-[#1D9E75]">commit.</span>"
          </div>
          <div className="text-[13px] text-gray-500 leading-[1.65] mb-3">
            RoachSwap is 100% spite-driven development. No VC money. No corporate permission. No 6-round contribution interview. Just a GitHub account, some free time, and the will to stop suffering alone in your room.
          </div>
          <div className="text-[12px] text-[#633806] italic">
            "अरे PR तो डाल भाई। Worst case, reject हो जाएगा। तू पहले से unemployed है — और क्या जाएगा?"
          </div>
        </div>
      </div>

      <div className="text-[11px] tracking-[.14em] text-gray-500 uppercase font-medium mb-3.5 font-mono">step by step — how to actually contribute</div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-7">
        
        {/* Step 1 */}
        <div className="bg-white border-[0.5px] border-gray-300 rounded-lg p-4 relative hover:border-roach-ink transition-colors">
          <div className="text-[11px] font-medium tracking-[.1em] text-gray-500 uppercase mb-2 flex items-center gap-1.5 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] shrink-0"></span>Step 01
          </div>
          <div className="text-sm font-medium mb-1.5">Fork the repo. Yes, right now.</div>
          <div className="text-xs text-gray-500 leading-[1.6] mb-2.5">
            Stop reading Medium articles about "how to contribute to open source." There is nothing to read. Click Fork. That's it. You just became a contributor.
          </div>
          <div className="font-mono text-[11px] bg-[#F1EFE8] border-[0.5px] border-gray-300 rounded-md p-2.5 text-roach-ink whitespace-pre-wrap break-all">
            github.com/Amrit-raj50/roachSwap<br/>→ Fork → Clone → cd roachSwap
          </div>
          <div className="text-[11px] text-[#633806] bg-[#FAEEDA] rounded-md px-2.5 py-1 mt-2 italic">
            क्या? अभी तक GitHub account नहीं बना? जा बना। हम यहीं हैं। 🪳
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white border-[0.5px] border-gray-300 rounded-lg p-4 relative hover:border-roach-ink transition-colors">
          <div className="text-[11px] font-medium tracking-[.1em] text-gray-500 uppercase mb-2 flex items-center gap-1.5 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] shrink-0"></span>Step 02
          </div>
          <div className="text-sm font-medium mb-1.5">Set up the colony locally.</div>
          <div className="text-xs text-gray-500 leading-[1.6] mb-2.5">
            Frontend runs on Vite. Backend on Express. MongoDB Atlas is free. You have no excuse. Read ARCHITECTURE.md if you get lost — it was written for humans, not engineers.
          </div>
          <div className="font-mono text-[11px] bg-[#F1EFE8] border-[0.5px] border-gray-300 rounded-md p-2.5 text-roach-ink whitespace-pre-wrap break-all">
            cd client && npm install && npm run dev<br/>cd server && npm install && npm run dev
          </div>
          <div className="text-[11px] text-[#633806] bg-[#FAEEDA] rounded-md px-2.5 py-1 mt-2 italic">
            .env.example में देख। हर cheez wahan hai। README padh। पहले पूरा README padh। 🙏
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white border-[0.5px] border-gray-300 rounded-lg p-4 relative hover:border-roach-ink transition-colors">
          <div className="text-[11px] font-medium tracking-[.1em] text-gray-500 uppercase mb-2 flex items-center gap-1.5 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] shrink-0"></span>Step 03
          </div>
          <div className="text-sm font-medium mb-1.5">Find a "good first issue." They exist.</div>
          <div className="text-xs text-gray-500 leading-[1.6] mb-2.5">
            Check the Issues tab on GitHub. Filter by "good first issue." Pick something small. Fix a typo. Improve a loading message. Add a sarcastic Hindi phrase to roachCopy.js. Ship something. Anything.
          </div>
          <div className="font-mono text-[11px] bg-[#F1EFE8] border-[0.5px] border-gray-300 rounded-md p-2.5 text-roach-ink whitespace-pre-wrap break-all">
            github.com/Amrit-raj50/roachSwap/issues<br/>→ Filter: good first issue → Pick one → Comment "I'm taking this"
          </div>
          <div className="text-[11px] text-[#633806] bg-[#FAEEDA] rounded-md px-2.5 py-1 mt-2 italic">
            पहले comment करो कि "मैं ले रहा हूँ।" वरना 3 लोग एक ही issue पर PR डालेंगे। Colony में chaos मत फैलाओ।
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-white border-[0.5px] border-gray-300 rounded-lg p-4 relative hover:border-roach-ink transition-colors">
          <div className="text-[11px] font-medium tracking-[.1em] text-gray-500 uppercase mb-2 flex items-center gap-1.5 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] shrink-0"></span>Step 04
          </div>
          <div className="text-sm font-medium mb-1.5">Write the code. In roach voice.</div>
          <div className="text-xs text-gray-500 leading-[1.6] mb-2.5">
            Every string the user sees must come from roachCopy.js. No generic error messages. No "Something went wrong." If it broke, say it broke like a roach would say it.
          </div>
          <div className="font-mono text-[11px] bg-[#F1EFE8] border-[0.5px] border-gray-300 rounded-md p-2.5 text-roach-ink whitespace-pre-wrap break-all">
            // roachCopy.js<br/>error_generic: "कुछ टूट गया। हम भी टूटे हैं। फिर try करो।"<br/>empty_state: "Bas yaar. Kuch toh daal."
          </div>
          <div className="text-[11px] text-[#633806] bg-[#FAEEDA] rounded-md px-2.5 py-1 mt-2 italic">
            अगर तुमने "Something went wrong." लिखा तो PR reject होगा। हम serious हैं।
          </div>
        </div>

        {/* Step 5 */}
        <div className="bg-white border-[0.5px] border-gray-300 rounded-lg p-4 relative hover:border-roach-ink transition-colors">
          <div className="text-[11px] font-medium tracking-[.1em] text-gray-500 uppercase mb-2 flex items-center gap-1.5 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] shrink-0"></span>Step 05
          </div>
          <div className="text-sm font-medium mb-1.5">Make a branch. Don't commit to main.</div>
          <div className="text-xs text-gray-500 leading-[1.6] mb-2.5">
            The one rule that separates developers from animals. Create a feature branch. Name it like a roach would name it — descriptive, lowercase, hyphens only.
          </div>
          <div className="font-mono text-[11px] bg-[#F1EFE8] border-[0.5px] border-gray-300 rounded-md p-2.5 text-roach-ink whitespace-pre-wrap break-all">
            git checkout -b fix/rejection-wall-empty-state<br/>git checkout -b feat/scrap-yard-upload<br/>git checkout -b chore/add-hindi-error-copy
          </div>
          <div className="text-[11px] text-[#633806] bg-[#FAEEDA] rounded-md px-2.5 py-1 mt-2 italic">
            main branch पर directly commit किया तो colony से निकाल देंगे। और हमारे पास निकालने के लिए कुछ नहीं है — फिर भी।
          </div>
        </div>

        {/* Step 6 */}
        <div className="bg-white border-[0.5px] border-gray-300 rounded-lg p-4 relative hover:border-roach-ink transition-colors">
          <div className="text-[11px] font-medium tracking-[.1em] text-gray-500 uppercase mb-2 flex items-center gap-1.5 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] shrink-0"></span>Step 06
          </div>
          <div className="text-sm font-medium mb-1.5">Open a PR. Fill the template.</div>
          <div className="text-xs text-gray-500 leading-[1.6] mb-2.5">
            Our PR template has 4 questions. Answer them honestly. "Did you test this locally?" is not a trick question. If yes, say yes. If no, please test it first and then say yes.
          </div>
          <div className="font-mono text-[11px] bg-[#F1EFE8] border-[0.5px] border-gray-300 rounded-md p-2.5 text-roach-ink whitespace-pre-wrap break-all">
            git push origin your-branch-name<br/>→ Open PR on GitHub<br/>→ Fill the template (karo, seriously)<br/>→ Tag a maintainer if urgent
          </div>
          <div className="text-[11px] text-[#633806] bg-[#FAEEDA] rounded-md px-2.5 py-1 mt-2 italic">
            "PR डाल दिया, बाकी देखना।" — यह approach नहीं चलेगी। Description likho। Screenshot attach करो। 🪳
          </div>
        </div>

      </div>

      <div className="h-[0.5px] bg-gray-300 my-6"></div>
      <div className="text-[11px] tracking-[.14em] text-gray-500 uppercase font-medium mb-3.5 font-mono">the three documents — read them all</div>

      {/* Docs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-7">
        <div className="border-[0.5px] border-gray-300 rounded-lg p-3.5 cursor-pointer transition-colors bg-white hover:border-roach-ink group" onClick={() => openLink('https://github.com/Amrit-raj50/roachSwap/blob/main/README.md')}>
          <div className="w-9 h-9 rounded-md flex items-center justify-center text-lg mb-2.5 bg-[#EEEDFE]">📜</div>
          <div className="text-[13px] font-medium mb-1 group-hover:text-roach-coral transition-colors">README.md</div>
          <div className="text-[11px] text-gray-500 leading-[1.55]">What RoachSwap is, why it exists, how to run it locally, and what we are building. If you read only one doc before contributing — read this one.</div>
          <a className="text-[11px] text-[#1D9E75] mt-2 flex items-center gap-1 no-underline font-bold" href="https://github.com/Amrit-raj50/roachSwap/blob/main/README.md" target="_blank" rel="noreferrer">Open on GitHub</a>
          <div className="text-[11px] text-[#3C3489] mt-1.5 italic">जो नहीं पढ़ता वो colony का नहीं होता।</div>
        </div>

        <div className="border-[0.5px] border-gray-300 rounded-lg p-3.5 cursor-pointer transition-colors bg-white hover:border-roach-ink group" onClick={() => openLink('https://github.com/Amrit-raj50/roachSwap/blob/main/ARCHITECTURE.md')}>
          <div className="w-9 h-9 rounded-md flex items-center justify-center text-lg mb-2.5 bg-[#E1F5EE]">🏗️</div>
          <div className="text-[13px] font-medium mb-1 group-hover:text-roach-coral transition-colors">ARCHITECTURE.md</div>
          <div className="text-[11px] text-gray-500 leading-[1.55]">How the codebase is structured. Pages, components, context, utils, backend routes, controllers — everything mapped and explained.</div>
          <a className="text-[11px] text-[#1D9E75] mt-2 flex items-center gap-1 no-underline font-bold" href="https://github.com/Amrit-raj50/roachSwap/blob/main/ARCHITECTURE.md" target="_blank" rel="noreferrer">Open on GitHub</a>
          <div className="text-[11px] text-[#085041] mt-1.5 italic">पहले architecture समझो, फिर code छेड़ो।</div>
        </div>

        <div className="border-[0.5px] border-gray-300 rounded-lg p-3.5 cursor-pointer transition-colors bg-white hover:border-roach-ink group" onClick={() => openLink('https://github.com/Amrit-raj50/roachSwap/blob/main/CONTRIBUTING.md')}>
          <div className="w-9 h-9 rounded-md flex items-center justify-center text-lg mb-2.5 bg-[#FAEEDA]">🤝</div>
          <div className="text-[13px] font-medium mb-1 group-hover:text-roach-coral transition-colors">CONTRIBUTING.md</div>
          <div className="text-[11px] text-gray-500 leading-[1.55]">The rules of the colony. Commit conventions, PR process, code review expectations, what "good first issue" actually means.</div>
          <a className="text-[11px] text-[#1D9E75] mt-2 flex items-center gap-1 no-underline font-bold" href="https://github.com/Amrit-raj50/roachSwap/blob/main/CONTRIBUTING.md" target="_blank" rel="noreferrer">Open on GitHub</a>
          <div className="text-[11px] text-[#633806] mt-1.5 italic">यह पढ़े बिना PR डाला तो... okay we'll still review it. We are desperate.</div>
        </div>
      </div>

      <div className="h-[0.5px] bg-gray-300 my-6"></div>
      <div className="text-[11px] tracking-[.14em] text-gray-500 uppercase font-medium mb-3.5 font-mono">the colony's one code of conduct</div>

      {/* Bad Quotes */}
      <div className="bg-[#F1EFE8] rounded-lg py-3.5 px-4 mb-7 border-[0.5px] border-roach-ink shadow-[2px_2px_0px_0px_rgba(44,44,42,1)]">
        <div className="flex gap-2.5 py-1.5 border-b border-gray-300 text-sm items-start">
          <div className="shrink-0 text-base w-6 text-center">🚫</div>
          <div className="text-gray-700 leading-relaxed"><strong className="text-roach-ink">Don't be corporate.</strong> No "per my last email" energy. No passive aggression in PR reviews. You were unemployed last week. Stay humble, roach.</div>
        </div>
        <div className="flex gap-2.5 py-1.5 border-b border-gray-300 text-sm items-start">
          <div className="shrink-0 text-base w-6 text-center">🚫</div>
          <div className="text-gray-700 leading-relaxed"><strong className="text-roach-ink">Don't hardcode strings.</strong> Every user-facing message goes in <strong className="text-roach-ink">roachCopy.js</strong>. This is non-negotiable. The colony has a voice. Don't dilute it with "Success: operation completed."</div>
        </div>
        <div className="flex gap-2.5 py-1.5 border-b border-gray-300 text-sm items-start">
          <div className="shrink-0 text-base w-6 text-center">🚫</div>
          <div className="text-gray-700 leading-relaxed"><strong className="text-roach-ink">Don't open a PR without testing locally.</strong> "Works on my machine" is a valid excuse if you actually tested it on your machine. सच में test किया? Acha, theek hai.</div>
        </div>
        <div className="flex gap-2.5 py-1.5 border-b border-gray-300 text-sm items-start">
          <div className="shrink-0 text-base w-6 text-center">🚫</div>
          <div className="text-gray-700 leading-relaxed"><strong className="text-roach-ink">Don't ghost an assigned issue.</strong> We are unemployed. We notice. If you took an issue and disappeared, drop a comment. Nobody will judge you. We've all been there.</div>
        </div>
        <div className="flex gap-2.5 py-1.5 border-b border-gray-300 text-sm items-start">
          <div className="shrink-0 text-base w-6 text-center">✅</div>
          <div className="text-gray-700 leading-relaxed"><strong className="text-roach-ink">Do ask questions.</strong> Discord is open. Colony is friendly. There is no stupid question, only the question you didn't ask because you were too embarrassed and then you spent 4 hours debugging something that was a missing semicolon.</div>
        </div>
        <div className="flex gap-2.5 py-1.5 text-sm items-start">
          <div className="shrink-0 text-base w-6 text-center">✅</div>
          <div className="text-gray-700 leading-relaxed"><strong className="text-roach-ink">Do bring the roach energy.</strong> Hindi phrases, sarcasm, honest frustration — this is the brand. If your contribution makes someone in Patna feel seen at 2am while refreshing their email for a callback — you shipped something real.</div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border-2 border-[#2C2C2A] rounded-lg p-5 flex flex-col md:flex-row gap-4 items-center mt-1 bg-white shadow-[4px_4px_0px_0px_rgba(44,44,42,1)]">
        <svg viewBox="0 0 80 80" width="80" height="80" className="shrink-0" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="80" rx="12" fill="#2C2C2A"/>
          <ellipse cx="40" cy="46" rx="16" ry="22" fill="#F1EFE8"/>
          <ellipse cx="40" cy="28" rx="9" ry="7" fill="#F1EFE8"/>
          <line x1="34" y1="23" x2="24" y2="14" stroke="#F1EFE8" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="23" cy="13" r="2.5" fill="#1D9E75"/>
          <line x1="46" y1="23" x2="56" y2="14" stroke="#F1EFE8" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="57" cy="13" r="2.5" fill="#1D9E75"/>
          <line x1="25" y1="38" x2="14" y2="34" stroke="#F1EFE8" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="25" y1="47" x2="13" y2="47" stroke="#F1EFE8" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="25" y1="56" x2="14" y2="60" stroke="#F1EFE8" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="55" y1="38" x2="66" y2="34" stroke="#F1EFE8" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="55" y1="47" x2="67" y2="47" stroke="#F1EFE8" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="55" y1="56" x2="66" y2="60" stroke="#F1EFE8" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="40" y1="34" x2="40" y2="66" stroke="#2C2C2A" strokeWidth="1"/>
        </svg>
        <div className="flex-1">
          <div className="text-[20px] font-bold leading-[1.2] mb-1.5">Stop reading.<br/>Start committing.</div>
          <div className="text-[13px] text-gray-600 leading-[1.6]">
            Every great colony started with one roach who stopped waiting for permission. The repo is open. The issues are labeled. The colony Discord is warmer than any corporate Slack you've been added to and then quietly removed from.<br/><br/>
            <em className="text-[#633806]">पहला commit सबसे hard होता है। उसके बाद? बस यार, रुकना मुश्किल हो जाता है।</em>
          </div>
          <div className="flex gap-2 mt-3.5 flex-wrap">
            <a className="text-xs py-2 px-4 rounded-md border-[0.5px] border-gray-300 cursor-pointer bg-[#2C2C2A] text-[#F1EFE8] font-bold hover:bg-[#444441] flex items-center gap-1.5 transition-colors" href="https://github.com/Amrit-raj50/roachSwap" target="_blank" rel="noreferrer">
              Fork the repo
            </a>
            <a className="text-xs py-2 px-4 rounded-md border border-[#0F6E56] cursor-pointer bg-[#1D9E75] text-[#E1F5EE] font-bold hover:bg-[#0F6E56] flex items-center gap-1.5 transition-colors" href="https://discord.gg/BeFN78k5b" target="_blank" rel="noreferrer">
              Join the Discord
            </a>
            <a className="text-xs py-2 px-4 rounded-md border-[0.5px] border-roach-ink cursor-pointer bg-white text-roach-ink font-bold hover:bg-[#F1EFE8] flex items-center gap-1.5 transition-colors" href="https://github.com/Amrit-raj50/roachSwap/issues" target="_blank" rel="noreferrer">
              See open issues
            </a>
          </div>
        </div>
      </div>

      <div className="text-center py-5 pb-1 text-[11px] text-gray-500 font-mono mt-4">
        Built in solidarity with <a href="https://cockroach4india.com" className="text-[#1D9E75] hover:underline" target="_blank" rel="noreferrer">cockroach4india.com</a> · 100% Spite-Driven Development · No sponsors · Only survival instinct 🪳
      </div>
    </div>
  );
}
