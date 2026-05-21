export const POINTS_MAP = {
  project_created: 100,
  project_joined: 50,
  project_shipped: 300,
  skill_swapped: 80,
  scramble_completed: 200,
  hivemind_attended: 40,
  hivemind_hosted: 120,
  frass_voted: 20,
  frass_funded: 150,
  c4i_member_bonus: 100,
  movement_build_bonus: 75,
};

export const RANK_THRESHOLDS = [
  { rank: "Hatchling",      min: 0,    tagline: "Just hatched. Welcome to the swarm." },
  { rank: "Forager",        min: 200,  tagline: "Out here looking. Keep digging." },
  { rank: "Tunnel Digger",  min: 600,  tagline: "You're building things. The colony notices." },
  { rank: "Mega Roach",     min: 1500, tagline: "Serious contributor. System still can't stop you." },
  { rank: "Colony Queen",   min: 3000, tagline: "The swarm follows your lead. Main Bhi Cockroach." },
];

export function calculateRank(totalPoints) {
  return [...RANK_THRESHOLDS]
    .reverse()
    .find(r => totalPoints >= r.min)?.rank ?? "Hatchling";
}
