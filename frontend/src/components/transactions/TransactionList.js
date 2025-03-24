// src/components/transactions/TransactionList.js
import React from 'react';
import { ArrowRight } from 'lucide-react';

const TransactionList = ({ transactions }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
      <h4 className="font-semibold mb-4">Recent Transactions</h4>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-3 pr-6">Date</th>
              <th className="pb-3 pr-6">Description</th>
              <th className="pb-3 pr-6">Category</th>
              <th className="pb-3 pr-6">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b">
                <td className="py-3 pr-6">{transaction.date}</td>
                <td className="py-3 pr-6">{transaction.description}</td>
                <td className="py-3 pr-6">{transaction.category}</td>
                <td className={`py-3 pr-6 ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="text-blue-600 font-medium flex items-center mt-4">
        <span>View all transactions</span>
        <ArrowRight size={16} className="ml-1" />
      </button>
    </div>
  );
};

export default TransactionList;