import React, { useState } from "react";
import { supabase } from "./supabase";

export default function App() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const sendOtp = async () => {
    setMsg("⏳ Sending OTP...");
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMsg("❌ Error sending OTP!");
      console.error(error);
      return;
    }
    setMsg("✅ OTP Sent! Check your email.");
    localStorage.setItem("userEmail", email);
    window.location.href = "/otp"; // OTP page ला जा
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white p-4">
      <h2 className="text-2xl mb-6">NGO Login</h2>
      <input
        type="email"
        placeholder="Enter Email"
        className="p-2 w-80 rounded text-black"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendOtp} className="mt-4 bg-green-600 px-6 py-2 rounded">
        Send OTP
      </button>
      <p className="mt-5">{msg}</p>
    </div>
  );
}
