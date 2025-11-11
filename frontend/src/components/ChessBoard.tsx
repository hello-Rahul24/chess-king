import type { Color, PieceSymbol, Square } from "chess.js";
import { useState, type JSX } from "react";
import { MOVE } from "../pages/Game";
import Pawn from "./assests/Pawn";
import Wpawn from "./assests/Wpawn";
import Wrook from "./assests/Wrook";
import Rook from "./assests/Rook";
import Wknight from "./assests/Wknight";
import Knight from "./assests/Knight";
import Wbishop from "./assests/Wbishop";
import Bishop from "./assests/Bishop";
import Wqueen from "./assests/Wqueen";
import Queen from "./assests/Queen";
import Wking from "./assests/Wking";
import King from "./assests/King";

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const Chessboard = ({
  board,
  socket,
  chess,
  setBoard,
  onTurnChange
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
  chess: any;
  setBoard: any;
  onTurnChange: any;
}) => {
  const [from, setFrom] = useState<Square | null>(null);
  

  const getSquareName = (rowIndex: number, colIndex: number): Square => {
    const file = files[colIndex];
    const rank = 8 - rowIndex; // because top row is rank 8
    return `${file}${rank}` as Square;
  };
  const pieceComponents: Record<string, JSX.Element> = {
  wp: <Wpawn />,
  bp: <Pawn />,
  wr: <Wrook />,
  br: <Rook />,
  wn: <Wknight />,
  bn: <Knight />,
  wb: <Wbishop />,
  bb: <Bishop />,
  wq: <Wqueen />,
  bq: <Queen />,
  wk: <Wking />,
  bk: <King />,
};

  

  return (
    <div>
      <div className="grid grid-cols-8 grid-rows-8 w-140 h-140">
        {board.map((row, rowIndex) =>
          row.map((square, colIndex) => {
            const isBlack = (rowIndex + colIndex) % 2 === 1;
            const squareName = getSquareName(rowIndex, colIndex);

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => {
                  if (!from) {
                    setFrom(squareName);
                  } else {
                    const moveTo = squareName;

                    socket.send(
                      JSON.stringify({
                        type: MOVE,
                        payload: { 
                           move: {from,
                             to: moveTo }
                            },
                      })
                    );
                    
                    setFrom(null);
                    chess.move({
                        from,
                        to: moveTo
                    })
                    setBoard(chess.board());
                    onTurnChange(chess.turn() === "w" ? "white" : "black");
                  }
                }}
                className={`flex justify-center items-center text-2xl font-semibold
                  ${isBlack ? "bg-[#9d4edd] text-white" : "bg-[#e0aaff] text-black"}`}
              >
                {square ? pieceComponents[`${square.color}${square.type}`] : null}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
