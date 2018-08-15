const eloCalculations = require('../eloCalculations');

const getMatchesByElo = (eloToMatch, users) => {
  let validMatches = [];
  users.forEach(user => {
    if (eloCalculations.calcProbabilityOfWin(eloToMatch, user.elo) >= 0.33) {
      validMatches.push(user.name);
    }
  });
  return validMatches;
};
