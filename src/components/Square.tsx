import React, { FC, createContext } from "react";
import styled from "styled-components";

type T = {
  onClick: () => void;
  val: Square;
  winner: Square;
  player: Player;
};

const Square: FC<T> = ({ onClick, val, winner, player }) => {
  return (
    <StyledSquare
      title="make your move, choose wisely"
      className={`${!val ? "open" : "played"} ${player}`}
      onClick={() => onClick()}
    >
      <span className="inner">{winner || val}</span>
      <span className="hint">{player}</span>
    </StyledSquare>
  );
};

export default Square;

const StyledSquare = styled.button`
  background-color: rgba(0, 0, 0, 0.2);
  /* border: 2px solidrgb(22, 45, 68); */
  transition: all 0.3s ease;
  line-height: 2em;
  min-height: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  margin: 2px;
  color: ${(props) => props.theme.fontColor};
  font-size: 28px;

  &.open:hover .hint {
    opacity: 0.8;
    transform: translateY(0);
  }

  .hint {
    opacity: 0;
    transform: translateY(5px);
    transition: all 0.3s ease;
  }

  /* We dont want the fade out transition */
  &.played .hint {
    transition: none;
  }
  &::after {
    content: "";
    display: block;
    padding-top: 100%;
  }

  &.open {
    cursor: pointer;
    pointer-events: initial;

    &:hover {
      opacity: 0.7;
    }
  }
  .inner {
    position: absolute;
  }
`;
