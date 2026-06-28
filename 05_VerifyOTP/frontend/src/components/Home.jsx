import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="bg-gray-200 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10 w-full max-w-md text-center">
        
        <div className="w-20 h-20 mx-auto rounded-full bg-gray-400 flex items-center justify-center shadow-lg mb-6">
          <span className="text-4xl">📧</span>
        </div>

        <h1 className="text-3xl font-bold text-black mb-3">
          Email Verification
        </h1>

        <p className="text-gray-600 mb-8">
          Verify your email securely using a One-Time Password (OTP). Click the
          button below to continue.
        </p>

        <Link
          to="/otp"
          className="block w-full bg-gray-400 text-white font-semibold py-3 rounded-xl hover:bg-indigo-300 transition duration-300 shadow-lg"
        >
          Verify Email
        </Link>

        <p className="text-sm text-gray-500 mt-6">
          Fast • Secure • Reliable
        </p>
      </div>
    </div>
  );
}

export default Home;