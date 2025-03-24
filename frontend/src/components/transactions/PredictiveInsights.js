// src/components/transactions/PredictiveInsights.js
import React from 'react';
import { upcomingExpenses } from '../../services/mockData';

const PredictiveInsights = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h4 className="font-semibold mb-4">Predictive Insights</h4>
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <p className="font-medium">Based on your pattern, we predict these upcoming expenses:</p>
          <ul className="mt-2 space-y-2">
            {upcomingExpenses.map((expense) => (
              <li key={expense.id} className="flex justify-between">
                <span>{expense.description}</span>
                <span className="font-medium">${expense.amount.toFixed(2)} on {expense.date}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-4 border rounded-lg bg-blue-50">
          <p className="font-medium text-blue-700">Opportunity: We notice you spend $245/month on subscriptions that you rarely use. Would you like to review them?</p>
          <button className="mt-2 text-blue-700 font-medium">Review now</button>
        </div>
      </div>
    </div>
  );
};

export default PredictiveInsights;