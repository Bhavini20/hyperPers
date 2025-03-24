// src/components/transactions/AnomaliesCard.js
import React from 'react';
import { ArrowRight } from 'lucide-react';

const AnomaliesCard = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h4 className="font-semibold mb-4">Spending Anomalies</h4>
      <div>
        <p className="text-gray-700">We detected an unusual increase in Entertainment spending this month (+42% from average).</p>
        <button className="text-blue-600 font-medium flex items-center mt-2">
          <span>View details</span>
          <ArrowRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default AnomaliesCard;