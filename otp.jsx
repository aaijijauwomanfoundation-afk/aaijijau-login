import React, { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function Otp() {
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");

  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!email) {
      window.location.href = "/"; // email नसेल तर login ला परत जा
    }
  }, []);

  const verifyOtp = async () => {
    setMsg("⏳ Verifying OTP...");
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });
    if (error) {
      setMsg("❌ OTP Verification Failed!");
      console.error(error);
      return;
    }

    if (data.session) {
      localStorage.setItem("supabaseSession", JSON.stringify(data.session));
      setMsg("✅ Login successful!");
      window.location.href = "/dashboard"; // Dashboard ला जा
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white p-4">
      <h2 className="text-2xl mb-6">Enter OTP</h2>
      <input
        type="text"
        placeholder="OTP"
        className="p-2 w-60 rounded text-black text-center"
        value={otp}
        onChange={(e) => setEmail(e.target.value)}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verifyOtp} className="mt-4 bg-green-600 px-6 py-2 rounded">
        Verify OTP
      </button>
      <p className="mt-5">{msg}</p>
    </div>
  );
}
