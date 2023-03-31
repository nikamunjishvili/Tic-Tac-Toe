import React from "react";

type Player = 'X' | '0' | "BOTH" | null;

interface SquareTypes {
    winner:Player;
    value:Player;
    onClick:() => void;
}
export default function Square({ value, onClick, winner }: SquareTypes) {
    if(!value){
        return <button className="square" onClick={onClick} disabled={Boolean(winner)} />
    }
  return <button className={`square square_${value.toLocaleLowerCase()}`} disabled>{value}</button>;
}
