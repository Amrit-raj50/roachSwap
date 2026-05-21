import ColonyPoints from "../models/ColonyPoints.js";
import User from "../models/User.js";
import { POINTS_MAP, calculateRank, RANK_THRESHOLDS } from "./rankCalculator.js";

export const awardPoints = async (userId, action, reference = null) => {
  const pts = POINTS_MAP[action];
  if (!pts) return;

  await ColonyPoints.create({ user: userId, action, points: pts, reference });

  const user = await User.findById(userId);
  const oldRank = user.rank;
  user.colonyPoints += pts;
  user.rank = calculateRank(user.colonyPoints);
  await user.save();

  const rankChanged = oldRank !== user.rank;
  return {
    newTotal: user.colonyPoints,
    newRank: user.rank,
    rankChanged,
    rankTagline: RANK_THRESHOLDS.find(r => r.rank === user.rank)?.tagline
  };
};
