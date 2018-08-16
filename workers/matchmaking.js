const { calcProbabilityOfWin } = require('./eloCalculations');

const matchmakeByElo = ( eloToMatch, users ) => {
  let sortedUserMatches = users.slice(0);
  sortedUserMatches.sort( ( a, b ) => {
    let oddsAWillWin = calcProbabilityOfWin( eloToMatch, a.elo );
    let oddsBWillWin = calcProbabilityOfWin( eloToMatch, b.elo );
    return oddsBWillWin - oddsAWillWin;
  });
  return sortedUserMatches;
};

module.exports = matchmakeByElo;
