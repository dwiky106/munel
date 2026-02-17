/* =========================
   CONFIG BACKEND URL
========================= */
const API_URL = "https://backend-login-production-2f4b.up.railway.app/login";

/* =========================
   POPUP FUNCTION
========================= */
function showPopup(icon, text, color, redirect = false) {
  const popup = document.getElementById("popup");
  const popupIcon = document.getElementById("popupIcon");
  const popupText = document.getElementById("popupText");

  popupIcon.src = icon;
  popupText.innerText = text;
  popupText.style.color = color;

  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
    popup.style.transform = "translate(-50%, -50%) scale(0)";

    if (redirect) {
      window.location.href = "dashboard.html";
    }
  }, 2000);
}

/* =========================
   LOGIN FUNCTION
========================= */
async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    showPopup("assets/jokobi.jpg", "Username / Password kosong", "red");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      throw new Error("Server error");
    }

    const result = await response.json();

    if (result.success) {
      localStorage.setItem("token", result.token);

      showPopup(
        "assets/praroro.jpg",
        "Login Berhasil!",
        "lightgreen",
        true
      );
    } else {
      showPopup(
        "assets/bahlil.jpg",
        "Username / Password Salah",
        "red"
      );
    }

  } catch (err) {
    console.error("LOGIN ERROR:", err);

    showPopup(
      "assets/jokobi.jpg",
      "Server tidak terhubung",
      "red"
    );
  }
}
