import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/SignIn";
import Profile from "./pages/Profile";
import TransactionsByAccount from "./pages/TransactionsByAccount";
import TransactionRow from "./components/TransactionRow";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import "./assets/css/main.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Pages publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Page Profile avec la liste des comptes */}
        <Route path="/profile" element={<Profile />} />

        {/* Page TransactionsByAccount indépendante */}
        <Route path="/profile/transactions/:accountType" element={<TransactionsByAccount />} />

        {/* Détail d'une transaction */}
        <Route path="/profile/transactions/:accountType/details/:transactionId" element={<TransactionRow />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
