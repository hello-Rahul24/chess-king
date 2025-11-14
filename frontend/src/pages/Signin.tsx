import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

export const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-screen justify-center bg-[#302e2b] items-center">

      {/* Back Button (Top-Left Corner) */}
      <button
        onClick={() => navigate(-1)} // Go back to previous page
        className="absolute top-6 left-6 flex items-center gap-2 text-purple-300 hover:text-purple-400 transition-all duration-200"
      >
        <IoArrowBack size={24} />
        <span className="hidden sm:inline text-sm font-semibold">Back</span>
      </button>

      {/* Sign Up Card */}
      <div className="w-[380px] h-[500px] rounded-3xl bg-[#262522] flex flex-col items-center justify-center gap-y-6 p-6 border-2 border-purple-700 shadow-[0_0_20px_#4c2c5f]">
        <div className="text-4xl font-extrabold text-white">
          Chess King
        </div>

        <div className="flex flex-col w-full items-center gap-4">
          <input
            type="text"
            placeholder="Enter your email"
            className="w-4/5 px-4 py-2 rounded-xl text-purple-100 placeholder-purple-300 border-2 border-purple-500 focus:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition-all duration-300"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-4/5 px-4 py-2 rounded-xl text-purple-100 placeholder-purple-300 border-2 border-purple-500 focus:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition-all duration-300"
          />
        </div>

        <div>
          <button className="px-26 py-2 bg-[#9d4edd] text-white font-semibold rounded-xl border-b-[#4c2c5f] border-b-4 hover:bg-[#e0aaff] transition-all duration-300">
            Sign In
          </button>
        </div>
        <p
          onClick={() => navigate("/signup")}
          className="text-sm text-purple-300 mt-4 italic cursor-pointer hover:text-purple-400 transition-all duration-200"
        >
          Don't have an account?
        </p>
      </div>
    </div>
  );
};
