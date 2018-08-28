const { calcProbabilityOfWin } = require('./eloCalculations');

const matchmakeByElo = ( eloToMatch, users ) => {
  let sortedUserMatches = users.slice(0);
  sortedUserMatches.sort( ( a, b ) => {
    let oddsAWillWin = calcProbabilityOfWin( eloToMatch, a.elo );
    let oddsBWillWin = calcProbabilityOfWin( eloToMatch, b.elo );
    return oddsBWillWin - oddsAWillWin;
  });

  //slice first(hardest), last(easiest), then concat both with a filter
  //to get players within 25 elo points of yourself
  return sortedUserMatches.slice(0, 1).concat(
    sortedUserMatches.slice(sortedUserMatches.length - 1),
    sortedUserMatches.filter( ( person ) => {
      return person.elo > eloToMatch - 25 && person.elo < eloToMatch + 25;
    })
  );

};

module.exports = matchmakeByElo;
