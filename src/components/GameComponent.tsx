import axios from "axios";
import Square from "./Square";
import ScoreBoard from "./ScoreBoard";
import React, { FC, useState } from "react";

import styled from "styled-components";
import { usePlayer, useSquares, useScoreCount } from "../hooks";

import calculateWinner from "../utils/calculateWinner";

type GameState = "playing" | "won" | "tie";

type T = {};

const GameComponent: FC<T> = () => {
  const [player, togglePlayer] = usePlayer("O");
  const [gameState, setGameState] = useState<GameState>("playing");
  const [winner, setWinner] = useState<Square>(null);
  const [scoreCount, giveWinner] = useScoreCount({ X: 0, O: 0 });
  const [squares, playerMove, reset] = useSquares([...Array(9)]);
  const [winGif, setWinGif] = useState<string>("");

  const handleResetGame = () => {
    reset();
    setGameState("playing");
    setWinner(null);
  };

  const handleWin = async (winner: Player) => {
    if (gameState === "won") return handleResetGame();
    giveWinner(winner);
    setWinner(winner);
    setGameState("won");
    const data = await axios.get(
      "https://api.giphy.com/v1/gifs/random?api_key=z7pwr3TN6sg7LlUUnq4IDrsSt9hffX53&tag=champion&rating=g"
    );
    setWinGif(data.data.data.image_url);
  };

  const handleTie = () => {
    setGameState("tie");
    reset();
  };

  const handleClick = (n: number) => {
    // if game is already finished, reset
    if (gameState === ("won" || "tie")) return handleResetGame();

    // Check for tie or winner
    const newSquares = playerMove(player, n);
    const winner = calculateWinner(newSquares);
    if (winner) return handleWin(winner);
    if (!newSquares.includes(undefined)) handleTie();

    togglePlayer();
  };

  return (
    <Container>
      <ScoreBoard scoreCount={scoreCount} />
      <Grid>
        {squares.map((el, i) => (
          <Square
            winner={winner}
            key={i}
            val={el}
            player={player}
            onClick={() => handleClick(i)}
          />
        ))}
      </Grid>

      {/* Winner screen */}
      {gameState === "won" && (
        <div onClick={() => handleResetGame()} className="gifContainer">
          <h1>Congrats {winner}</h1>
          <img className="gif" src={winGif} alt="winning gif" />
          <button onClick={() => reset()}>Play again</button>
        </div>
      )}
    </Container>
  );
};

export default GameComponent;

const Container = styled.div`
  /* display: flex; */
  justify-content: center;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.primary};

  .gifContainer {
    top: 0;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.primary};
    transition: all 0.3s ease;
    cursor: pointer;
    display: flex;
    flex-flow: column;
    color: #fff;

    .gif {
      margin-bottom: 2em;
    }
  }
`;

const Grid = styled.div`
  max-width: 600px;
  display: grid;
  grid-template-columns: auto auto auto;
  width: 100%;
  margin-bottom: 2em;
`;
