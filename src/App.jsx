import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import "./assets/css/main.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Vérifie le login après le montage
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");
      if (token) {
        setIsLoggedIn(true);
        setUsername(storedUsername || "");
      }
    };

    setTimeout(checkLogin, 0); // évite le warning React
  }, []);

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        username={username}
        setIsLoggedIn={setIsLoggedIn}
        setUsername={setUsername}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<SignIn setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />}
        />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
