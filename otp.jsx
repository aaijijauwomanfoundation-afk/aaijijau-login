import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// OTP Verify + Redirect
window.verifyOTP = async function () {
  const otp = document.getElementById("otpInput").value.trim();
  const phone = localStorage.getItem("userPhone");

  if (!otp || !phone) {
    document.getElementById("status").innerText = "Phone or OTP missing!";
    return;
  }

  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token: otp,
    type: "sms",
  });

  if (error) {
    document.getElementById("status").innerText = "Invalid OTP ❌";
    console.error(error);
    return;
  }

  document.getElementById("status").innerText = "Login Successful ✅";
  localStorage.removeItem("userPhone");
  window.location.href = "/dashboard.html"; // redirect to dashboard
};    <div className="flex flex-col items-center justify-center h-screen bg-black text-white p-4">
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
