type Player = "X" | "O";

type Squares = Square[];

type Square = Player | undefined | null;

type ScoreCount = {
  X: number;
  O: number;
};
