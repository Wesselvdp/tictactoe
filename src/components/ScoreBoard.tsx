import React, { FC } from "react";
import styled from "styled-components";

type T = {
  scoreCount: ScoreCount;
};

const ScoreBoard: FC<T> = ({ scoreCount }) => {
  return (
    <Container>
      <span>{scoreCount.X || 0}</span>
      <span className="seperator" />
      <span>{scoreCount.O || 0}</span>
    </Container>
  );
};

export default ScoreBoard;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
  font-size: 32px;
  color: ${(props) => props.theme.fontColor};

  .seperator {
    background-color: rgba(0, 0, 0, 0.2);
    width: 2px;
    margin: 0 1em;
  }
`;
