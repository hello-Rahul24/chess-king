import { useNavigate } from "react-router-dom";

export const Landing = () => {
    const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col h-screen">
        <div className="bg-yellow-400 h-[10%] flex items-center justify-center">
          top
        </div>
        <div className="grid grid-cols-2 flex-grow">
          <div className="bg-red-600">
            {" "}
            <img className="translate-y-18" src={"/chessboard.jpeg"} />
          </div>
          <div className="bg-blue-400 flex flex-col">
            <div className="bg-pink-500 h-[50%]">play chess have fun</div>
            <div className="bg-orange-500 h-[50%]">
              <button onClick={()=>{
                navigate("/game")
              }} className="p-5 bg-amber-500">
                Get Started
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
