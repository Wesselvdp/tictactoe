import { useState } from "react";

type TPlayerMove = (player: Player, i: number) => Squares;

export const useSquares = (
  initialValue: Squares
): [value: Squares, playerMove: TPlayerMove, reset: () => void] => {
  const [value, setValue] = useState(initialValue);

  const playerMove = (player: Player, i: number): Squares => {
    let newArr = [...value];
    newArr[i] = player;
    setValue(newArr);
    return newArr;
  };

  const reset = () => setValue([...Array(9)]);
  console.log("useSquares");

  return [value, playerMove, reset];
};

export default useSquares;
