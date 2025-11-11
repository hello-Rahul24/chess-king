import { useEffect, useState } from "react";
import { Chessboard } from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";
export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () => {
  const socket = useSocket();

  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false);
  const [color, setColor] = useState("");
  const [loader, setLoader] = useState(false);
  const [currentTurn, setCurrentTurn] = useState("white");
  
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("📨 Received from server:", message);
      const color = message.payload.color;
      setColor(color);

      switch (message.type) {
        case INIT_GAME:
          //initialize a game
          setBoard(chess.board());
          setStarted(true);
          break;
        case MOVE:
          //moving logic
          //here is not working the board is changing in ChessBoard.tsx file itself
          const move = message.payload;
          console.log(move);
          chess.move(move);
          setBoard(chess.board());
          
          break;
        case GAME_OVER:
          //terminate game
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
            <div className="text-white font-extrabold text-3xl ">
                {color === "white" ? "You are player 1" : "You are player 2"}
            </div>
           
         
        )}
      </div>
    </div>
  );
};
