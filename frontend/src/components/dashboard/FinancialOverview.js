// src/components/dashboard/FinancialOverview.js
import React from 'react';

const FinancialOverview = ({ userData }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Financial Overview</h3>
      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-600">Current Balance</p>
        <p className="text-xl font-bold">${userData.balance.toLocaleString()}</p>
      </div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-600">Risk Profile</p>
        <p className="font-medium text-blue-600">{userData.riskProfile}</p>
      </div>
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Financial Health</p>
          <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
            {userData.financialHealth}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialOverview;