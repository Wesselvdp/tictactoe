import { useState } from "react";

export const useScoreCount = (initialValue: ScoreCount): [ScoreCount, (winner: Player) => void] => {
  const [scoreCount, setScoreCount] = useState(initialValue);

  const giveWinner = (winner: Player) => {
    let newScore = scoreCount;
    newScore[winner] = newScore[winner] + 1;
    setScoreCount(newScore);
  };

  return [scoreCount, giveWinner];
};

export default useScoreCount;
