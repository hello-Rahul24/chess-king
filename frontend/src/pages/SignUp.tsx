import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

export const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-screen justify-center bg-[#302e2b] items-center">

      {/* Back Button (Top-Left Corner) */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-purple-300 hover:text-purple-400 transition-all duration-200"
      >
        <IoArrowBack size={24} />
        <span className="hidden sm:inline text-sm font-semibold">Back</span>
      </button>

      {/* Sign Up Card */}
      <div className="w-[380px] h-[540px] rounded-3xl bg-[#262522] flex flex-col items-center justify-center gap-y-5 p-6 border-2 border-purple-700 shadow-[0_0_20px_#4c2c5f]">
        <div className="text-4xl font-extrabold text-white">
          Chess King
        </div>

        {/* Input Fields */}
        <div className="flex flex-col w-full items-center gap-3">
          <input
            type="text"
            placeholder="First Name"
            className="w-4/5 px-4 py-2 rounded-xl text-purple-100 placeholder-purple-300 border-2 border-purple-500 focus:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-4/5 px-4 py-2 rounded-xl text-purple-100 placeholder-purple-300 border-2 border-purple-500 focus:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition-all duration-300"
          />
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

        {/* Sign-Up Button */}
        <div>
          <button className="px-26 py-2 bg-[#9d4edd] text-white font-semibold rounded-xl border-b-[#4c2c5f] border-b-4 hover:bg-[#e0aaff] transition-all duration-300">
            Sign Up
          </button>
        </div>

        {/* Social Buttons */}
        <div className="flex flex-col items-center gap-2 mt-2">
          <button className="px-14 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 hover:bg-gray-800 hover:scale-105 transition-all duration-300">
            Sign up with GitHub
          </button>
          <button className="px-14 py-2 bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-100 hover:scale-105 transition-all duration-300">
            Sign up with Google
          </button>
        </div>

        {/* Sign-in Redirect */}
        <p
          onClick={() => navigate("/signin")}
          className="text-sm text-purple-300 mt-2 italic cursor-pointer hover:text-purple-400 transition-all duration-200"
        >
          Already have an account?
        </p>
      </div>
    </div>
  );
};
