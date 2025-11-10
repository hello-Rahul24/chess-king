import type { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../pages/Game";

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const Chessboard = ({
  board,
  socket,
  chess,
  setBoard
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
  chess: any;
  setBoard: any;
}) => {
  const [from, setFrom] = useState<Square | null>(null);

  const getSquareName = (rowIndex: number, colIndex: number): Square => {
    const file = files[colIndex];
    const rank = 8 - rowIndex; // because top row is rank 8
    return `${file}${rank}` as Square;
  };

  return (
    <div>
      <div className="grid grid-cols-8 grid-rows-8 w-96 h-96">
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
                  }
                }}
                className={`flex justify-center items-center text-2xl font-semibold
                  ${isBlack ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}
              >
                {square ? square.type : ""}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
