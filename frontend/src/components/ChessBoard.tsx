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
  onTurnChange,
  color
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
  color: string
}) => {
  const [from, setFrom] = useState<Square | null>(null);
  const [highlighted, SetHighlighted] = useState<Square[]>([]);

  const getSquareName = (rowIndex: number, colIndex: number): Square => {
  const actualRow = color === "black" ? 7 - rowIndex : rowIndex;
  const actualCol = color === "black" ? 7 - colIndex : colIndex;
  const file = files[actualCol];
  const rank = 8 - actualRow;
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
        
        {(color === "black" ? [...board].reverse() : board).map((row, rowIndex) =>
    (color === "black" ? [...row].reverse() : row).map((square, colIndex) => {
            const isBlack = (rowIndex + colIndex) % 2 === 1;
            const squareName = getSquareName(rowIndex, colIndex);

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => {
                  //check if wrong player making move
                  if(chess.turn() === "w" && color !== "white" ||chess.turn() === "b" && color !== "black" ){
                    alert("not your bokachoda");
                    return;
                  }
                  //If no piece is selected yet
                  if (!from) {
                    if (!square) return; 
                    setFrom(squareName);
                    const moves = chess.moves({
                      square: squareName,
                      verbose: true,
                    });
                    //@ts-ignore
                    const targets = moves.map((m) => m.to);
                    SetHighlighted(targets);
                    return;
                  }

                  //If clicked the same square again 
                  if (from === squareName) {
                    setFrom(null);
                    SetHighlighted([]);
                    return;
                  }

                  //If clicked another piece of same color
                  const fromPiece = chess.get(from);
                  const clickedPiece = chess.get(squareName);
                  if (
                    clickedPiece &&
                    fromPiece &&
                    clickedPiece.color === fromPiece.color
                  ) {
                    setFrom(squareName);
                    const moves = chess.moves({
                      square: squareName,
                      verbose: true,
                    });
                    //@ts-ignore
                    const targets = moves.map((m) => m.to);
                    SetHighlighted(targets);
                    return;
                  }

                  //Otherwise attempt a move
                  const legalMoves = chess.moves({
                    square: from,
                    verbose: true,
                  });
                  
                  const isValidMove = legalMoves.some(
                    //@ts-ignore
                    (m) => m.to === squareName
                  );
                  if (!isValidMove) {
                    // invalid destination, ignore
                    return;
                  }

                  // Make the move
                  socket.send(
                    JSON.stringify({
                      type: MOVE,
                      payload: { move: { from, to: squareName } },
                    })
                  );

                  chess.move({ from, to: squareName });
                  setBoard(chess.board());
                  onTurnChange(chess.turn() === "w" ? "white" : "black");

                  //Reset selection
                  setFrom(null);
                  SetHighlighted([]);
                }}
                className={`flex justify-center items-center text-2xl font-semibold
                  ${
                    isBlack
                      ? "bg-[#9d4edd] text-white"
                      : "bg-[#e0aaff] text-black"
                  }`}
              >
                {highlighted.includes(squareName) && (
                  <div className="absolute w-4 h-4 bg-black rounded-full"></div>
                )}
                {square
                  ? pieceComponents[`${square.color}${square.type}`]
                  : null}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
