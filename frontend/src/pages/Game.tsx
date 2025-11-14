import { useEffect, useState } from "react";
import { Chessboard } from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";
export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () => {
  const socket = useSocket();

  const [chess, _setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false);
  const [color, setColor] = useState("");
  const [loader, setLoader] = useState(false);
  const [currentTurn, setCurrentTurn] = useState("white");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
 

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const colour = message.payload.color;

      switch (message.type) {
        case INIT_GAME:
          //initialize a game
          setBoard(chess.board());
          setStarted(true);
          setColor(colour);
          break;
        case MOVE:
          //moving logic
          //here is not working the board is changing in ChessBoard.tsx file itself
          const move = message.payload;
          console.log(move);
          chess.move(move);
          setBoard(chess.board());
          setCurrentTurn(chess.turn() === "w" ? "white" : "black");
          break;
        case GAME_OVER:
          //terminate game
          const winnerColor = message.payload.winner;
          setGameOver(true);
          setWinner(winnerColor);
          break;
      }
    };
  }, [socket]);

  function send() {
    socket?.send(
      JSON.stringify({
        type: INIT_GAME,
      })
    );
    setLoader(true);
  }
  if (!socket)
    return (
      <div className="bg-[#302e2b] w-full h-screen flex justify-center items-center">
        Connecting....
      </div>
    );

  return (
    <div className="flex h-screen">
      <div className="w-2/3 bg-[#302e2b] flex flex-col justify-between items-center py-8">
        <div className="text-white font-bold text-xl pb-4">Player 2</div>

        <div className="flex justify-center items-center flex-grow">
          <Chessboard
            chess={chess}
            socket={socket}
            setBoard={setBoard}
            board={board}
            onTurnChange={setCurrentTurn}
            color={color}
          />
        </div>

        <div className="text-white font-bold text-xl pt-4">Player 1</div>
      </div>

      <div className="w-1/3 bg-[#262522] flex justify-center items-center">
        {!started && (
          <button
            onClick={send}
            className="px-18 py-3 pt-1.5 bg-[#9d4edd] hover:bg-[#7b2cbf] text-4xl text-white font-extrabold rounded-xl shadow-md transition-all duration-200 transform hover:scale-105"
          >
            {loader ? "loading..." : "play"}
          </button>
        )}
        {started && (
          <div className="flex flex-col gap-7">
            <div className="text-white font-extrabold text-3xl ">
              {color === "white" ? "You are player 1" : "You are player 2"}
            </div>
            <div className="text-white font-extrabold text-3xl ">
              {currentTurn === "white" ? "Player 1 turn" : "Player 2 turn"}
            </div>
          </div>
        )}
      </div>
      {gameOver && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/50 backdrop-blur-md z-50 transition-all">
          <div className="bg-[#1f1d1b]/90 p-10 rounded-2xl shadow-2xl text-center border border-white/10 animate-fadeIn">

            <h2 className="text-5xl text-white font-extrabold mb-4 drop-shadow-lg">
              {winner === color ? "🏆 You Win!" : "😢 You Lose!"}
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              {winner?.toUpperCase()} wins the match
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-gradient-to-r from-[#9d4edd] to-[#7b2cbf] hover:opacity-90 text-white text-xl font-semibold rounded-xl shadow-md transition-transform transform hover:scale-105"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
