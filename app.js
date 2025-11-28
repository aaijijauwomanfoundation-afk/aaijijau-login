import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function login() {
    const mobile = document.getElementById("mobile").value;
    const otpStatus = document.getElementById("status");

    otpStatus.innerHTML = "OTP पाठवत आहे...";

    const { data, error } = await supabase.auth.signInWithOtp({
        phone: "+91"+mobile
    });

    if(error){
        otpStatus.innerHTML = "Error: "+ error.message;
    } else {
        otpStatus.innerHTML = "✅ OTP पाठवला. आता Verify करा.";
        localStorage.setItem("user_mobile", mobile);
    }
}

async function checkSession(){
    const { data: { session } } = await supabase.auth.getSession();
    if(session){
        document.getElementById("status").innerHTML = "🔄 Auto Login होत आहे...";
        setTimeout(()=>window.location.href="dashboard.html", 1500);
    }
}

document.getElementById("loginBtn").addEventListener("click", login);
window.onload = checkSession;
