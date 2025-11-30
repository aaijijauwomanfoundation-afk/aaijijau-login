// Supabase Login function example
async function loginUser() {
  const mobile = document.getElementById("mobile").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: mobile + "@demo.com", 
    password: password
  });

  if (error) {
    alert("Login Failed!");
  } else {
    localStorage.setItem("userMobile", mobile); // ✅ mobile save
    window.location.href = "/dashboard.html";   // ✅ Redirect to dashboard
  }
}

document.getElementById("loginBtn").addEventListener("click", loginUser);
