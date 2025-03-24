// src/components/dashboard/IncomeExpensesChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const IncomeExpensesChart = ({ transactionData }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
      <h3 className="text-lg font-semibold mb-4">Income vs Expenses (Last 6 Months)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={transactionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#0088FE" strokeWidth={2} />
            <Line type="monotone" dataKey="expenses" stroke="#FF8042" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeExpensesChart;