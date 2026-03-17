import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // fonction asynchrone = handleSubmit sera appelée lorsque l’utilisateur valide le formulaire.
  const handleSubmit = async (e) => {
    // Empêcher le rechargement de la page lors de l'envoi du formulaire (comportement par défaut du HTML)
    e.preventDefault();
    // On réinitialise l’état error pour effacer les messages d’erreur précédents
    setError("");

    // On commence un bloc try/catch pour gérer les erreurs éventuelles lors de l’appel réseau (capturer les erreurs côté front)
    try {
      // Appel réseau au backend pour se connecter
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        // method: "POST" : on envoie des données pour créer une session
        method: "POST",
        // headers : on indique que le contenu envoyé est en JSON.
        headers: { "Content-Type": "application/json" },
        // on convertit l’objet {email, password} en JSON pour l’envoyer au serveur.
        body: JSON.stringify({ email, password }),
      });

      // await : on attend la réponse avant de continuer
      const data = await response.json();

      if (!response.ok) {
        // On met à jour le state error pour afficher un message à l’utilisateur.
        setError(data.message || "Erreur lors de la connexion");
        // return : on sort de la fonction pour ne pas exécuter le reste du code.
        return;
      }

      // On sauvegarde le token JWT côté navigateur.
      localStorage.setItem("token", data.body.token);

      // dispatch() est utilisé pour envoyer une action à Redux. / Cela permet à tous les composants connectés à Redux (ex : le header) d’avoir les infos utilisateur à jour.
      dispatch(
        // loginSuccess est une action de la slice authSlice qui :
          // - Stocke le token dans le store,
          // - Met à jour les infos utilisateur (firstName, lastName),
          // - Passe isLoggedIn à true
        loginSuccess({
          token: data.body.token,
          user: {
            firstName: data.body.firstName || "",
            lastName: data.body.lastName || "",
          },
        })
      );

      navigate("/profile");
      // Gestion des erreurs pendant le fetch : si la réponse n’est pas ok, on met à jour error
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
