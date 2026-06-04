const API_URL = "http://localhost:5000/api/auth";

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

if (registerForm) {

  registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      const data = await response.json();

      document.getElementById("message").innerText =
        data.message;

    } catch (error) {

      document.getElementById("message").innerText =
        "Registration Failed";

      console.error(error);
    }

  });

}

if (loginForm) {

  loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

      const email =
        document.getElementById("loginEmail").value;

      const password =
        document.getElementById("loginPassword").value;

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      const loginMessage =
        document.getElementById("loginMessage");

      loginMessage.innerText = data.message;

      if (data.token) {

        localStorage.setItem("token", data.token);

        loginMessage.style.color = "green";
        loginMessage.innerText =
          "✅ Login Successful";

        setTimeout(() => {
          window.location.href = "admin.html";
        }, 2000);

      }

    } catch (error) {

      document.getElementById("loginMessage").style.color = "red";

      document.getElementById("loginMessage").innerText =
        "❌ Login Failed";

      console.error(error);

    }

  });

}