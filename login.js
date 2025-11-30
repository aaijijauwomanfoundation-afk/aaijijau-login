import { supabase } from "./supabase.js";

async function loginUser() {
  const mobile = document.getElementById("mobile").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: mobile + "@demo.com",  // mobile आधारित demo email बनवला आहे
    password: password
  });

  if (error) {
    alert("Login failed: " + error.message);
    return;
  }

  localStorage.setItem("userMobile", mobile);
  window.location.href = "https://aaijijau-login.onrender.com/dashboard.html "; 
}

document.getElementById("loginBtn").addEventListener("click", loginUser);
