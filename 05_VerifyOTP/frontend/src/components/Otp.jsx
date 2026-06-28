import React, { useState } from "react";

function Otp() {
  const [formData, setFormData] = useState({
    number: "",
  });

  const handelOnchange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handelOnSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("number", formData.number);

    console.log(formData);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-200 rounded-3xl shadow-2xl p-8">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-4xl">
            📱
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Phone Verification
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Enter your mobile number to receive a One-Time Password (OTP).
        </p>

        {/* Form */}
        <form onSubmit={handelOnSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Mobile Number
            </label>

            <input
              type="tel"
              name="number"
              value={formData.number}
              onChange={handelOnchange}
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition duration-300 shadow-lg"
          >
            Send OTP
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          We'll send a verification code to your mobile number.
        </p>
      </div>
    </div>
  );
}

export default Otp;
