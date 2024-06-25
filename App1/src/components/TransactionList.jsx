import React from "react";

const TransactionList = ({ transactions }) => {
  return (
    <div className="mt-20">
      <h2 className="text-2xl font-bold text-center">Latest Transactions</h2>
      {transactions.length > 0 ? (
        <ul className="mt-10">
          {transactions.map((tx, index) => (
            <li key={index} className="border p-2 rounded mb-2">
              <p><strong>From:</strong> {tx.from}</p>
              <p><strong>To:</strong> {tx.to}</p>
              <p><strong>Amount:</strong> {tx.amount} ETH</p>
              <p><strong>Timestamp:</strong> {tx.timestamp}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No transactions yet.</p>
      )}
    </div>
  );
};

export default TransactionList;
