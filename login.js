import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = window.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqdG1xdXRicW9kaWNqdXBnc3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNTk1NjYsImV4cCI6MjA3OTkzNTU2Nn0.NSm0ACU5YFc78e8Ck0PvCNLFaido3noRkJC_7vRMrrU;
const SUPABASE_ANON_KEY = window.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqdG1xdXRicW9kaWNqdXBnc3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNTk1NjYsImV4cCI6MjA3OTkzNTU2Nn0.NSm0ACU5YFc78e8Ck0PvCNLFaido3noRkJC_7vRMrrU;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("❌ Supabase ENV Keys Missing!");
  document.getElementById("status").innerText = "❌ Server ENV Keys सेट नाहीत!";
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkSession() {
  try {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      document.getElementById("status").innerText = "✅ आधीच लॉगिन आहे!";
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("status").innerText = "❌ लॉगिन नाही, OTP मागवा!";
    }
  } catch (err) {
    document.getElementById("status").innerText = "❌ Session check error!";
    console.error(err);
  }
}
window.checkSession = checkSession;

async function sendOTP() {
  const mobile = document.getElementById("mobile").value;
  if (!mobile || mobile.length !== 10) {
    document.getElementById("status").innerText = "⚠ कृपया 10 अंकी Mobile टाका!";
    return;
  }

  const { error } = await supabase.auth.signInWithOtp({
    phone: "+91" + mobile,
  });

  if (error) {
    document.getElementById("status").innerText = "❌ OTP Error: " + error.message;
  } else {
    document.getElementById("status").innerText = "📩 OTP पाठवला आहे! SMS तपासा.";
    window.location.href = "otp.html";
  }
}

document.getElementById("loginBtn")?.addEventListener("click", sendOTP);

checkSession();
