const eloCalculations = require('../eloCalculations');

// Input a user's elo and other users with an elo property and find those who elo is low enough to give the user at least a 33% chance of winning
// This only returns the user's name as-is and does not account for tiers
const getMatchesByElo = (eloToMatch, users) => {
  let validMatches = [];
  users.forEach(user => {
    eloCalculations.calcProbabilityOfWin(eloToMatch, user.elo) >= 0.33
      ? validMatches.push(user.name) : null;
  });
  return validMatches;
};
