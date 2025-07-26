import AllTeams from '../data/allTeams.json';

const handleRandomizationOfTeamScores = (
  totalScore: number,
  teamCount: number
) => {
  let randomPoints = [];
  for (let index = 0; index < teamCount - 1; index++) {
    const randomNumber = Math.round(Math.random() * totalScore);
    randomPoints.push(randomNumber);
  }

  randomPoints.sort((a, b) => a - b);
  randomPoints = [0, ...randomPoints, totalScore];

  const tempRandomNumbers = [];
  for (let index = 0; index < randomPoints.length - 1; index++) {
    let tempDifference = randomPoints[index + 1] - randomPoints[index];
    tempRandomNumbers.push(tempDifference);
  }

  const finalTeamScores = [];
  for (let index = 0; index < teamCount; index++) {
    const teamScore = {
      name: AllTeams.teams[index].name,
      currentScore: tempRandomNumbers[index],
    };

    finalTeamScores.push(teamScore);
  }

  return finalTeamScores;
};

export default handleRandomizationOfTeamScores;
