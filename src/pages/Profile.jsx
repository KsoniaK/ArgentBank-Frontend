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

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setError("You must be logged in!");
        return;
      }

      try {
        const res = await fetch("http://localhost:3001/api/v1/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data.body);
          setFirstName(data.body.firstName || "");
          setLastName(data.body.lastName || "");

          dispatch(updateUserProfile({
            firstName: data.body.firstName || "",
            lastName: data.body.lastName || "",
          }));
          console.log("Store user:", store.getState().auth.user);
        } else {
          setError(data.message || "Error fetching profile");
        }
      } catch (err) {
        setError("Server error");
        console.error(err);
      }
    };

    fetchProfile();
  }, [token, dispatch]);


  const handleSave = async () => {
    if (!token) return;

    try {
      const res = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName }),
      });

      const data = await res.json();

      if (res.ok) {
        // On met à jour Redux pour le Header
        dispatch(updateUserProfile({
          firstName,
          lastName,
        }));

        // On reste sur les mêmes valeurs pour les inputs
        setError("");
      } else {
        setError(data.message || "Error updating profile");
      }
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
          {/* {firstName || lastName
            ? `${firstName} ${lastName}`
            : `${reduxUser.firstName || ""} ${reduxUser.lastName || ""}`}
          ! */}
        </h1>
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
            <button onClick={handleSave} style={{ marginLeft: "5px" }}>
              Save
            </button>
            <button onClick={handleCancel} style={{ marginLeft: "5px" }}>
              Cancel
            </button>
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
