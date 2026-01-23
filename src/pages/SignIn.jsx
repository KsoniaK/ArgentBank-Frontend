import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn({ setIsLoggedIn, setUsername }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erreur lors de la connexion");
        return;
      }

      // Sauvegarde token et username
      localStorage.setItem("token", data.body.token);
      localStorage.setItem("username", data.body.userName);

      // Met à jour l'état parent
      setIsLoggedIn(true);
      setUsername(data.body.userName);

      navigate("/profile");
    } catch (err) {
      setError("Impossible de se connecter. Vérifiez le serveur.");
      console.error(err);
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button type="submit" className="sign-in-button">
            Sign In
          </button>

          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </form>
      </section>
    </main>
  );
}

export default SignIn;
