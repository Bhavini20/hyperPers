// src/components/dashboard/TopRecommendation.js
import React from 'react';
import { ArrowRight } from 'lucide-react';

const TopRecommendation = ({ recommendation, onViewAll }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Top Recommendation</h3>
        <button 
          className="text-blue-600 font-medium flex items-center"
          onClick={onViewAll}
        >
          <span>View all</span>
          <ArrowRight size={16} className="ml-1" />
        </button>
      </div>
      
      <div className="border rounded-lg p-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-semibold text-lg">{recommendation.title}</h4>
            <p className="text-sm text-gray-500">{recommendation.category}</p>
          </div>
          <div className="bg-blue-100 text-blue-800 font-medium rounded-full px-3 py-1">
            {recommendation.score}% Match
          </div>
        </div>
        
        <p className="my-3 text-gray-700">{recommendation.reason}</p>
        
        <div className="flex flex-wrap gap-2 mt-3 mb-4">
          {recommendation.features.map((feature, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              {feature}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-3 mt-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex-1">
            Learn More
          </button>
          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-medium">
            Not Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopRecommendation;