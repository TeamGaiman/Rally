var toNextTier = (tier, currentElo) => {
  var nextTier = 1;
  if (tier === 1) {
    nextTier = (currentElo - 2000) / 1000;
  } else if (tier === 2) {
    nextTier = (currentElo - 2000) / 2000;
  } else if (tier === 3) {
    nextTier = (currentElo - 2000) / 3000;
  }
  return nextTier;
};