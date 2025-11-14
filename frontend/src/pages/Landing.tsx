import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-[#302e2b] text-white">
      {/* Header */}
      <header className="h-[10%] flex items-center justify-between px-12">
        <h1 className="text-2xl font-bold text-[#fefefe] tracking-wider">
          Chess King
        </h1>
        <div className="flex gap-10">
          <button onClick={() => navigate("/signup")} className=" px-10 py-1 text-1xl hover:text-[#daacff] font-semibold rounded-xl shadow-sm hover:scale-105 border-0 hover:border-1 cursor-pointer">
            Sign Up
          </button>
          <button onClick={() => navigate("/signin")} className="px-10 py-1 text-1xl hover:text-[#daacff] font-semibold border-0 hover:border-1 rounded-xl shadow-sm hover:scale-105 cursor-pointer">
            Log in
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="grid grid-cols-1 md:grid-cols-2 flex-grow">
        {/* Left Side - Image */}
        <div className="flex items-center justify-center p-6">
          <img
            src="/chessboard.jpeg"
            alt="Chess Board"
            className="rounded-2xl max-w-full max-h-[80%] object-cover"
          />
        </div>

        {/* Right Side - Text & Button */}
        <div className="flex flex-col items-center justify-center gap-8 px-6 text-center">
          <div className="space-y-3">
            <h2 className="text-5xl font-extrabold text-[#9d4edd]">
              Play Chess
            </h2>
            <p className="text-2xl font-bold">Improve your game</p>
            <p className="text-xl font-bold text-gray-300">
              Have fun and learn!
            </p>
          </div>

          <button
            onClick={() => navigate("/game")}
            className="bg-[#9d4edd] hover:bg-[#7b2cbf] transition-all duration-300 px-14 py-4 text-2xl font-bold rounded-2xl shadow-md hover:scale-110 cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </main>
    </div>
  );
};
