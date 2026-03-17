import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../store/authSlice";
import TransactionsByCategory from "../components/TransactionsByCategory";
import {store} from "../store/store";

// Comptes fictifs
const fakeAccounts = [
  { id: 1, title: "Argent Bank Checking", number: "x8349", balance: 2082.79, type: "checking" },
  { id: 2, title: "Argent Bank Savings", number: "x6712", balance: 10928.42, type: "savings" },
  { id: 3, title: "Argent Bank Credit Card", number: "x8349", balance: 184.3, type: "credit" },
];

function Profile() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const reduxUser = useSelector((state) => state.auth.user);

  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  //  récupérer le profil utilisateur dès que la page Profile est chargée.
  useEffect(() => {
    // On définit une fonction asynchrone fetchProfile pour faire un appel réseau
    const fetchProfile = async () => {
      if (!token) {
        // Si aucun token, on affiche un message d’erreur et on interrompt la fonction.
        setError("You must be logged in!");
        return;
      }

      // Commence le bloc try/catch pour gérer les erreurs réseau ou autres exceptions
      try {
        const res = await fetch("http://localhost:3001/api/v1/user/profile", {
          // Appel GET à l’API /profile pour récupérer les infos utilisateur = on demande simplement des données, on ne modifie rien.
          method: "GET",
          headers: {
            // "Content-Type": "application/json" pour indiquer que l’on manipule du JSON.
            "Content-Type": "application/json",
            // Authorization: Bearer ${token} : on envoie le token JWT pour prouver que l’utilisateur est connecté.
            Authorization: `Bearer ${token}`,
          },
        });

        // On lit la réponse JSON renvoyée par le serveur.
        const data = await res.json();

        // Vérifie si le serveur a répondu avec un code HTTP 200 (succès)
        if (res.ok) {
          // Met à jour le state local React :
          setUser(data.body); // user contient toutes les données du profil.
          setFirstName(data.body.firstName || ""); // || "" protège contre les valeurs undefined
          setLastName(data.body.lastName || "");

          // Mise à jour de Redux avec les données reçues.
            // Tous les composants utilisant useSelector(state => state.auth.user) auront maintenant les bonnes infos.
          dispatch(updateUserProfile({
            firstName: data.body.firstName || "",
            lastName: data.body.lastName || "",
          }));
          // Affiche dans la console le state actuel de Redux, pour vérifier que le dispatch a bien fonctionné.
          console.log("Store user:", store.getState().auth.user);
        } else {
          setError(data.message || "Error fetching profile");
        }
        // Si une erreur réseau ou autre exception survient, on :
      } catch (err) {
        setError("Server error");
        console.error(err);
      }
    };

    // Appelle la fonction fetchProfile immédiatement après que le composant soit rendu.
    fetchProfile();
    // Les dépendances du useEffect :
      // - token : si le token change (ex: login/logout), on refait l’appel.
      // - dispatch : inclusion par convention pour éviter des warnings ESLint, même si dispatch ne change jamais.
  }, [token, dispatch]);


  const handleSave = async () => {
    // S’il n’y a pas de token, on arrête immédiatement la fonction.
    if (!token) return;

    // un bloc try/catch pour gérer les erreurs réseau ou serveur.
    try {
      // Elle est async parce qu’elle contient un appel API avec await
      const res = await fetch("http://localhost:3001/api/v1/user/profile", {
        // PUT sert à mettre à jour une ressource existante
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // Le body contient les nouvelles données à enregistrer. / JSON.stringify() transforme l’objet JavaScript en chaîne JSON.
        body: JSON.stringify({ firstName, lastName }),
      });

      const data = await res.json();

      if (res.ok) {
        // On met à jour Redux pour le Header
          // dispatch envoie l’action updateUserProfile
        dispatch(updateUserProfile({
          firstName,
          lastName,
        }));

        // On vide le message d’erreur s’il y en avait un avant. / Cela signifie que tout s’est bien passé
        setError("");
      } else {
        setError(data.message || "Error updating profile");
      }
      // Si une erreur technique survient, par exemple le serveur est inaccessible, on entre dans le catch
    } catch (err) {
      setError("Server error");
      console.error(err);
    }
  };

  const handleCancel = () => {
    // On remet l'input à la valeur actuelle dans Redux
    setFirstName(reduxUser.firstName || "");
    setLastName(reduxUser.lastName || "");
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back<br />
        </h1>
          <div style={{ marginTop: "10px" }}>
            <div>
              <input
                className="nameInput"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
              />
              <input
                className="nameInput"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
            </div>
            <div className="nameContainer">
              <button 
                onClick={handleSave}
                style={{ marginLeft: "5px" }}
                className="nameChangeButton"
                >
                Save
              </button>
              <button onClick={handleCancel} style={{ marginLeft: "5px" }} className="nameChangeButton">
                Cancel
              </button>
            </div>
          </div>
      </div>

      <h2 className="sr-only">Accounts</h2>
      {fakeAccounts.map((acc) => (
        <TransactionsByCategory key={acc.id} account={acc} />
      ))}
    </main>
  );
}

export default Profile;
