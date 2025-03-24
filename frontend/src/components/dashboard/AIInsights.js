// src/components/dashboard/AIInsights.js
import React from 'react';
import { ArrowRight } from 'lucide-react';

const AIInsights = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">AI Insights</h3>
      <div className="mb-4">
        <p className="text-gray-700">Based on your spending patterns, you could save $320 monthly by reducing restaurant expenses.</p>
      </div>
      <div className="mb-4 pt-4 border-t">
        <p className="text-gray-700">You're on track to reach your emergency fund goal by September 2024.</p>
      </div>
      <button className="text-blue-600 font-medium flex items-center mt-2">
        <span>View all insights</span>
        <ArrowRight size={16} className="ml-1" />
      </button>
    </div>
  );
};

export default AIInsights;