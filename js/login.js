async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const statusBox = document.getElementById("statusBox");
  const statusIcon = document.getElementById("statusIcon");
  const errorText = document.getElementById("error");

  statusBox.style.display = "block";

  try {
    const response = await fetch("https://backend-login-production-2f4b.up.railway.app/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (result.success) {
      statusIcon.src = "assets/success.png";
      errorText.innerText = "Login Berhasil!";
      errorText.style.color = "lightgreen";

      localStorage.setItem("token", result.token);

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1200);

    } else {
      statusIcon.src = "assets/failed.png";
      errorText.innerText = "Username / Password Salah";
      errorText.style.color = "red";
    }

  } catch (err) {
    statusIcon.src = "assets/failed.png";
    errorText.innerText = "Server tidak terhubung";
    errorText.style.color = "red";
  }
}

function showPopup(icon, text, color, redirect=false) {
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

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (result.success) {
      localStorage.setItem("token", result.token);
      showPopup("assets/praroro.jpg", "Login Berhasil!", "lightgreen", true);
    } else {
      showPopup("assets/bahlil.jpg", "Username / Password Salah Cuy", "red");
    }

  } catch (err) {
    showPopup("assets/jokobi.jpg", "Server Tidak Terhubung", "red");
  }
}

