const { readFile } = require("fs");
const FILE_PATH = './data.txt';

const playerWinScoringObject = {
  X: {
    condition: "lose",
    score: 0,
    difference: 2,
  },

  Y: {
    condition: "draw",
    score: 3,
    difference: 0,
  },

  Z: {
    condition: "win",
    score: 6,
    difference: 1
  }
}

const playerElementScoringObject = {
  X: {
      name: "rock",
      score: 1
  },

  Y: {
    name: "paper",
    score: 2
  },

  Z: {
    name: "scissors",
    score: 3
  }
}

const opponentScoringObject = {
  A: {
      name: "rock",
      score: 1
  },

  B: {
    name: "paper",
    score: 2
  },

  C: {
    name: "scissors",
    score: 3
  }
}

const getWinScore = (playerScore, opponentScore) => {
  const scoreDifference = playerScore - opponentScore;
  if (scoreDifference === 1 || scoreDifference === -2) return 6;
  if (scoreDifference === 0) return 3;

  return 0;
}

const parseData = (data) => {
  const lines = data.trim().split('\n');
  
  const rounds = lines.map((line) => {
    if (!line) return;
    const [opponent, player] = line.split(' ');
    return { opponent, player }
  })
  return rounds
}

const getScoreListElement = (roundsList, playerElementScoringObject, opponentScoringObject) => {
  const scores = roundsList.map(round => {
    // console.log(round.player)
    const playerElementScore = playerElementScoringObject[round.player].score
    const opponentElementScore = opponentScoringObject[round.opponent].score
    const winScore = getWinScore(playerElementScore, opponentElementScore);
    
    return playerElementScore + winScore;
  })
  
  return scores;
  
}

const getScoreListWin = (roundsList, playerWinScoringObject, opponentScoringObject) => {
  const scores = roundsList.map(round => {
    // console.log(round.player)
    const opponentElementScore = opponentScoringObject[round.opponent].score
    const playerElementScore = ((opponentElementScore + (playerWinScoringObject[round.player].difference)) % 3) || 3;
    console.log("Player Element score", playerElementScore);
    const winScore = getWinScore(playerElementScore, opponentElementScore);
    
    return playerElementScore + winScore;
  })
  
  return scores;
  
}

const getScore = (roundsList, playerElementScoringObject, opponentScoringObject, getScoreList) => {
  const scoreList = getScoreList(roundsList, playerElementScoringObject, opponentScoringObject);
  console.log(scoreList)
;  return scoreList.reduce((prev, next) => prev + next)
}


readFile(FILE_PATH, { encoding: 'utf8' }, (err, data) => {
  if (err) throw err;
  const roundsList = parseData(data);
  console.log(roundsList);
  const elementScore = getScore(roundsList, playerElementScoringObject, opponentScoringObject, getScoreListElement);
  console.log("Element Score", elementScore);
  const winScore = getScore(roundsList, playerWinScoringObject, opponentScoringObject, getScoreListWin);
  console.log("win score", winScore)
})

