import { useState, useEffect } from 'react';

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already seen the welcome message
    const hasSeenWelcome = localStorage.getItem('roach_welcomed');
    if (!hasSeenWelcome) {
      // Small delay for dramatic effect
      const timer = setTimeout(() => setIsOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    localStorage.setItem('roach_welcomed', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-roach-ink bg-opacity-80 p-4 backdrop-blur-sm">
      <div className="bg-roach-surface border-4 border-roach-ink shadow-[8px_8px_0px_0px_rgba(44,44,42,1)] max-w-lg w-full p-6 relative flex flex-col items-center text-center transform transition-transform duration-300 scale-100">
        
        {/* Close Button */}
        <button 
          onClick={closePopup}
          className="absolute top-2 right-4 font-bold text-2xl hover:text-roach-coral transition-colors"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Roach Icon */}
        <div className="text-6xl mb-4 animate-bounce">🪳</div>

        <h2 className="text-3xl font-black uppercase mb-2">Welcome to the Colony</h2>
        
        <div className="w-full h-1 bg-roach-coral mb-4"></div>

        <p className="text-xl font-bold mb-4 leading-tight">
          अकेले कब तक घिसेगा भाई? <br/>
          <span className="text-roach-coral">6-round interview में रिजेक्ट होने से अच्छा है साथ मिलकर कुछ बड़ा बनाते हैं।</span>
        </p>
        
        <p className="font-mono text-sm mb-6 px-4 text-gray-600">
          (How long will you grind alone? Instead of getting ghosted by recruiters, let's build something massive together.)
        </p>

        <div className="flex flex-col w-full gap-3">
          <button 
            onClick={closePopup}
            className="w-full py-3 bg-roach-ink text-white font-black uppercase border-2 border-roach-ink shadow-[4px_4px_0px_0px_rgba(232,80,66,1)] hover:bg-roach-coral hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(44,44,42,1)] transition-all"
          >
            MAIN BHI COCKROACH ✊
          </button>
          
          <p className="text-xs font-mono text-gray-500 mt-2">
            100% Spite-Driven Development. No corporate gatekeeping.
          </p>
        </div>

      </div>
    </div>
  );
}
