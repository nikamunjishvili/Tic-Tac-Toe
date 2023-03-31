import Square from "@/components/square";
import React, { useEffect, useState } from "react";
type Player = 'X' | '0' | "BOTH" | null;


function claculateWinner(squares: Player[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]
      }
    }
    return null;
  }

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "0">(
    Math.round(Math.random() * 1) === 1 ? "X" : "0"
  );

  function reset() {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "0");
  }

  function setsquaryValue(index: number) {
    const newDate = squares.map((val, i) => {
      if (i === index) {
        return currentPlayer;
      }
      return val;
    });
    setSquares(newDate);
    setCurrentPlayer(currentPlayer === "X" ? "0" : "X");
  }

  useEffect(() => {
    const w = claculateWinner(squares);
    if(w){
        setWinner(w)
    }

    if(!w && !squares.filter((square) => !square).length){
        setWinner("BOTH");
    }
  }, [squares])

  const [winner, setWinner] = useState<Player>(null);
  return (
    <div>
      <p>Hey {currentPlayer} , it is your turn</p>
      {winner && winner !== "BOTH" && <p>congratulation {winner} </p> }
      {winner && winner === "BOTH" &&(
        <p>congratulation you are both </p>
      )}

      <div className="grid">
        {Array(9)
          .fill(null)
          .map((_, i) => {
            return (
              <Square
                winner={winner}
                key={i}
                onClick={() => setsquaryValue(i)}
                value={squares[i]}
              />
            );
          })}
      </div>
      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
}
