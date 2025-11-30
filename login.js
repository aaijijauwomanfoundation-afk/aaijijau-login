window.sendOTP = async function () {
  const phone = document.getElementById("phoneInput").value.trim();

  const { error } = await supabase.auth.signInWithOtp({ phone });

  if (error) {
    status.innerText = "Failed to send OTP ❌";
    return;
  }

  localStorage.setItem("userPhone", phone); // ✅ फोन store करा
  status.innerText = "OTP Sent ✅";
  window.location.href = "/otp.html"; // ✅ OTP page ला जा
};
