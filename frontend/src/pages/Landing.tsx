import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-[#302e2b] text-white">
      <header className="h-[10%] flex items-center justify-center">
        <h1 className="text-4xl font-bold text-[#9d4edd] tracking-wider">
          Chess King
        </h1>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 flex-grow">
        <div className="flex items-center justify-center p-6">
          <img
            src="/chessboard.jpeg"
            alt="Chess Board"
            className="rounded-2xl translate-x-6 max-w-full max-h-[80%] object-cover"
          />
        </div>
        <div className="flex -translate-x-20 flex-col items-center justify-center gap-8 px-6 text-center">
          <div className="space-y-3">
            <h2 className="text-5xl font-extrabold text-[#9d4edd]">
              Play Chess
            </h2>
            <p className="text-2xl font-bold">Improve your game</p>
            <p className="text-xl font-bold text-gray-300">Have fun and learn!</p>
          </div>

          <button
            onClick={() => navigate("/game")}
            className="bg-[#9d4edd] hover:bg-[#7b2cbf] transition-all duration-300 px-14 py-4 text-2xl font-bold rounded-2xl shadow-md hover:scale-110"
          >
            Get Started
          </button>
        </div>
      </main>
    </div>
  );
};
