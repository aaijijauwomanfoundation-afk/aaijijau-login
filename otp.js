import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = window.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqdG1xdXRicW9kaWNqdXBnc3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNTk1NjYsImV4cCI6MjA3OTkzNTU2Nn0.NSm0ACU5YFc78e8Ck0PvCNLFaido3noRkJC_7vRMrrU;
const SUPABASE_ANON_KEY = window.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqdG1xdXRicW9kaWNqdXBnc3huIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDM1OTU2NiwiZXhwIjoyMDc5OTM1NTY2fQ.8RXY7u4gZyD3MIP7iN1bwwDkSqw15aD2jlQskfi5AS4;
const statusEl = document.getElementById("status");

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function verifyOTP() {
  const token = document.getElementById("otpInput")?.value;
  if (!statusEl) return;

  if (!token || token.length !== 6) {
    statusEl.innerText = "⚠ 6 अंकी OTP टाका!";
    return;
  }

  statusEl.innerText = "⏳ OTP verify…";

  try {
    const { data, error } = await supabase.auth.verifyOtp({
      phone: "+91" + (localStorage.getItem("mobile") || ""),
      token,
      type: "sms",
    });

    if (error) throw error;
    if (data.session) {
      statusEl.innerText = "✅ Login Success! Dashboard ला जात आहोत…";
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1200);
    } else {
      statusEl.innerText = "❌ OTP verify failed!";
    }
  } catch (err) {
    console.error(err);
    statusEl.innerText = "❌ चुकीचा OTP किंवा verify error!";
  }
}

document.getElementById("verifyBtn")?.addEventListener("click", verifyOTP);
window.verifyOTP = verifyOTP;
