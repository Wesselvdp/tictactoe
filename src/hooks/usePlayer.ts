import { useState } from "react";

export const usePlayer = (initialValue: Player): [Player, () => void] => {
  const [value, setValue] = useState(initialValue);
  const togglePlayer = () => setValue(value === "X" ? "O" : "X");
  return [value, togglePlayer];
};

export default usePlayer;
