import { useState } from "react";
import pen from "../assets/img/pen.png";
import arrowDown from "../assets/img/down-arrow.png";
import arrowUp from "../assets/img/arrow-up.png";

// Toutes les catégories possibles
const categoryOptions = [
  "Food",
  "Shopping",
  "Transport",
  "Entertainment",
  "Income",
  "Transfer",
  "Credit",
  "Debit",
];

function TransactionRow({ transaction }) {
  const [open, setOpen] = useState(false);

  const [category, setCategory] = useState(transaction.category);
  const [notes, setNotes] = useState(transaction.notes);

  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  // const arrowDownImg = `<img src=${arrowDown} alt="more"/>`
  // const arrowUpImg = `<img src=${arrowUp} alt="edit"/>`

  const saveNotes = () => {
    setIsEditingNotes(false);
    // Ici tu peux envoyer la mise à jour au backend si besoin
  };

  return (
    <>
      {/* Ligne principale */}
      <tr onClick={() => setOpen(!open)}>
        <td>
          {
            open ?
            <img src={arrowUp} alt="edit"/>
            :
            <img src={arrowDown} alt="edit"/>
          }
        </td>
        {/* <td>{open ? arrowUp : arrowDown}</td> */}
        {/* <td>{open ? "▲" : "▼"}</td> */}
        <td>{transaction.date}</td>
        <td>{transaction.description}</td>
        <td>{transaction.amount}</td>
        <td>{transaction.balance}</td>
      </tr>

      {/* Détails */}
      {open && (
        <tr className="transaction-details">
          <td colSpan="5">
            {/* Transaction type */}
            <p>Transaction Type: {transaction.type}</p>

            {/* Category editable via select dropdown */}
            <div className="transaction-field">
              <span>Category: </span>
              {isEditingCategory ? (
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  onBlur={() => setIsEditingCategory(false)}
                  autoFocus
                >
                  {categoryOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <span>{category}</span>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // éviter que le tr se toggle
                  setIsEditingCategory(!isEditingCategory);
                }}
                style={{ marginLeft: "8px" }}
              >
              <img
                src={pen}
                alt="edit"
              />
              </button>
            </div>

            {/* Notes editable */}
            <div className="transaction-field">
              <span>Notes: </span>
              {isEditingNotes ? (
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  onBlur={saveNotes}
                  autoFocus
                />
              ) : (
                <span>{notes || ""}</span>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditingNotes(!isEditingNotes);
                }}
                style={{ marginLeft: "8px" }}
              >
              <img
                src={pen}
                alt="plus"
              />
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default TransactionRow;
