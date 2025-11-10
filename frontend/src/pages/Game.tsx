import { useEffect, useState } from "react";
import { Chessboard } from "../components/ChessBoard"
import { useSocket } from "../hooks/useSocket"
import { Chess } from "chess.js";
export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = ()=>{

    const socket = useSocket();
    
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [started, setStarted] = useState(false);
    useEffect(()=>{
        if(!socket){
            return;
        }
        socket.onmessage = (event)=>{
            const message = JSON.parse(event.data);
            console.log("📨 Received from server:", message);

            switch(message.type){
                case INIT_GAME:
                    //initialize a game
                    setBoard(chess.board());
                    setStarted(true);
                    break;
                case MOVE :
                    //moving logic
                    const move = message.payload;
                    console.log(move)
                    chess.move(move);
                    setBoard(chess.board());
                    break;
                case GAME_OVER: 
                    //terminate game
                    break;
            }

        }
    },[socket])

    function send(){
        
        socket?.send(JSON.stringify({
            type: INIT_GAME
        }))
    
    }
    if(!socket)return <div>Connecting....</div>

    return (
        <div className="flex h-screen">
            <div className="w-2/3 bg-amber-600">
                <Chessboard chess={chess} socket={socket} setBoard={setBoard}  board={board}/>
            </div>
            <div className="w-1/3 bg-green-600">
                {!started &&<button onClick={send}>
                    Play
                </button>}
            </div>
        </div>
    )
} 