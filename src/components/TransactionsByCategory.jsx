import React from "react";
import { Link } from "react-router-dom";

function TransactionsByCategory({ account }) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">
          {account.title} ({account.number})
        </h3>
        <p className="account-amount">
          ${account.balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className="account-amount-description">Available Balance</p>
      </div>

      <div className="account-content-wrapper cta">
        <Link to={`/profile/transactions/${account.type}`}>
          <button className="transaction-button">View Transactions</button>
        </Link>
      </div>
    </section>
  );
}

export default TransactionsByCategory;
