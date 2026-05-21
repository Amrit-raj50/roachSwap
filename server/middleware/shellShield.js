export const applyShellShield = (user) => {
  if (!user.shellShieldActive) return user;
  return {
    _id: user._id,
    name: user.alias ?? "Anonymous Cockroach",
    alias: user.alias,
    state: "Hidden",
    avatar: null,
    rank: user.rank,
    colonyPoints: user.colonyPoints,
    isC4IVerified: user.isC4IVerified,
    shellShieldActive: true,
    currentStatus: user.currentStatus,
  };
};
