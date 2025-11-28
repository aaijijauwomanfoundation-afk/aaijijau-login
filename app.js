import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Render ENV मधून key वापरली आहे
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Session already आहे का ते तपासा
async function checkSession() {
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    document.getElementById("status").innerText = "✅ आधीच लॉगिन आहे!";
    window.location.href = "dashboard.html"; // लॉगिन असेल तर डॅशबोर्ड वर जा
  } else {
    document.getElementById("status").innerText = "❌ लॉगिन नाही, OTP मागवा!";
  }
}
window.checkSession = checkSession;

// OTP (Passwordless login) request
async function sendOTP() {
  const mobile = document.getElementById("mobile").value;
  if (!mobile || mobile.length < 10) {
    document.getElementById("status").innerText = "⚠ कृपया 10 अंकी Mobile टाका!";
    return;
  }

  const { error } = await supabase.auth.signInWithOtp({
    phone: "+91" + mobile // India phone format
  });

  if (error) {
    document.getElementById("status").innerText = "❌ OTP error: " + error.message;
  } else {
    document.getElementById("status").innerText = "📩 OTP पाठवला आहे! SMS तपासा.";
  }
}
document.getElementById("loginBtn").addEventListener("click", sendOTP);

// पेज load वर session check auto call
checkSession();
