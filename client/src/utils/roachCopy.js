export const COPY = {
  loading:          "Waking up the roaches...",
  loadingFeed:      "Checking what the colony is building...",
  loadingProjects:  "Digging through the anthills...",
  empty_projects:   "No anthills yet. Be the first roach to dig.",
  empty_skills:     "No swaps listed. Bas yaar. List yours first.",
  empty_feed:       "Quiet colony. That's suspicious. Go build something.",
  empty_leaderboard:"No roaches ranked yet. Unemployed but also unranked. Fix that.",
  join_success:     "You're in. The colony noticed. 🪳",
  project_posted:   "Anthill is live. Watch the roaches arrive.",
  project_shipped:  "SHIPPED. Your ExoResume just got heavier. 🪳",
  swap_proposed:    "Swap proposed. Ball's in their colony now.",
  swap_matched:     "Matched. You have each other's backs now.",
  session_booked:   "Session locked in. Don't ghost. We're unemployed — we notice.",
  frass_voted:      "Vote filed. Your frustration is officially on record.",
  frass_submitted:  "Proposal in queue. The colony will decide.",
  rank_up: (rank)  => `Rank up: you are now a ${rank}. The system still doesn't care. The colony does.`,
  welcome: (alias) => `Welcome to the colony, ${alias}. Main Bhi Cockroach. 🪳`,
  c4i_verified:     "C4I Verified. You were here before RoachSwap. Respect.",
  shield_on:        "Shell Shield active. You are Roach #XXXX. Build freely.",
  shield_off:       "Shell Shield off. The colony knows your name.",
  logout:           "Going offline. The colony remembers you.",
  error_generic:    "Something broke. We're broke too. Try again.",
  error_auth:       "Token expired. Hatch back in.",
  error_not_found:  "Nothing here. The tunnel might be empty.",
};

export const C4I_DEMANDS = {
  JobsThatExist:    { label: "Jobs that actually exist", emoji: "💼", color: "amber" },
  PublicEducation:  { label: "World-class public education", emoji: "🎓", color: "blue" },
  HealthForAll:     { label: "Free, accessible healthcare", emoji: "🏥", color: "green" },
  CleanBharat:      { label: "Clean air, water, liveable cities", emoji: "🌿", color: "teal" },
  DignityBuild:     { label: "Dignity for the unemployed", emoji: "🪳", color: "purple" },
};

export const STATUS_OPTIONS = [
  "Unemployed",
  "Student",
  "Underpaid",
  "Exam Warrior",
  "Corporate Cockroach",
  "Freelancer in Denial",
  "Other Tragedy",
];
