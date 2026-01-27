import React from "react";
import { useParams, Link } from "react-router-dom";
import TransactionRow from "../components/TransactionRow";

const accounts = [
  {
    type: "checking",
    title: "Argent Bank Checking",
    number: "x8349",
    balance: 2082.79,
    transactions: [
      { id: 1, date: "Jan 20, 2026", description: "Golden Sun Bakery", amount: "$5.00", balance: "$2082.79", category: "Food", notes: "", type: "Electronic" },
      { id: 2, date: "Jan 21, 2026", description: "Starbucks", amount: "$3.50", balance: "$2079.29", category: "Food", notes: "", type: "Electronic" },
      { id: 3, date: "Jan 22, 2026", description: "Amazon", amount: "$50.00", balance: "$2029.29", category: "Shopping", notes: "", type: "Electronic" },
    ],
  },
  {
    type: "savings",
    title: "Argent Bank Savings",
    number: "x6712",
    balance: 10928.42,
    transactions: [
      { id: 4, date: "Jan 15, 2026", description: "Paycheck", amount: "$1500.00", balance: "$10928.42", category: "Income", notes: "", type: "Credit" },
      { id: 5, date: "Jan 18, 2026", description: "Transfer to Checking", amount: "-$200.00", balance: "$10728.42", category: "Transfer", notes: "", type: "Debit" },
    ],
  },
  {
    type: "credit",
    title: "Argent Bank Credit Card",
    number: "x8349",
    balance: 184.30,
    transactions: [
      { id: 6, date: "Jan 19, 2026", description: "Netflix", amount: "$15.99", balance: "$184.30", category: "Entertainment", notes: "", type: "Debit" },
      { id: 7, date: "Jan 20, 2026", description: "Uber", amount: "$12.50", balance: "$171.80", category: "Transport", notes: "", type: "Debit" },
    ],
  },
];

function TransactionsByAccount() {
  const { accountType } = useParams();
  const account = accounts.find(acc => acc.type === accountType);

  if (!account) return <p>Account not found</p>;

  return (
    <main className="main bg-dark transaction-page-main">
    <section className="account transaction-page-section">
      <div className="account-content-wrapper">
        <h3 className="account-title">
          {account.title} ({account.number})
        </h3>
        <p className="account-amount">
          ${account.balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className="account-amount-description">Available Balance</p>
      </div>
    </section>
    <Link to="/profile">
      <button className="back-home-button" style={{ marginTop: "10px" }}>Back to Profile</button>
    </Link>

      <section className="transactions">
        <h2 className="sr-only">Transactions</h2>
        <table className="transaction-table">
          <thead>
            <tr>
              <th></th>
              <th>DATE</th>
              <th>DESCRIPTION</th>
              <th>AMOUNT</th>
              <th>BALANCE</th>
            </tr>
          </thead>
          <tbody>
            {account.transactions.map(tx => (
              <TransactionRow key={tx.id} transaction={tx} />
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default TransactionsByAccount;
