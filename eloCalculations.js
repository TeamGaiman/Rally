// The hard-coded value 400 represents the relevant point differential. For every 400 points of difference between the two scores the probablity of a win changes by a factor of 10.
// The value 400 can be adjusted but should not change on a case-by-case basis. This value must be consistent for the scores to be relevant. 400 is the elo standard for this value and 2000 is the standard starting elo score.

// Enter two elo ratings as arguments and return the probability that the player corresponding to elo 1 will win.
// To get the probablity that the player corresponding to elo2 will win, subtract the return value from 1.
const calcProbabilityOfWin = (elo1, elo2) => {
  let x = elo2 - elo1;
  let y = x / 400;
  let z = Math.pow(10, y) + 1;
  return 1 / z;
};

// Enter the elo ratings of the winner and loser and the k value that represents the elo rate of change
const calcNewElos = (winner, loser, k) => {
  let probabilityOfWin = calcProbabilityOfWin(winner, loser);
  let x = k * (1 - probabilityOfWin);
  let winnerElo = winner + x;

  let y = k * (0 - (1 - probabilityOfWin));
  let loserElo = loser + y;

  return [winnerElo, loserElo];
};

const eloCalculations = {
  calcProbabilityOfWin,
  calcNewElos
};

module.exports = eloCalculations;
