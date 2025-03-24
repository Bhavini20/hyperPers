// src/components/recommendations/RecommendationCard.js
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import apiService from '../../services/api';

const RecommendationCard = ({ recommendation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFeedback = async (isHelpful) => {
    try {
      setIsSubmitting(true);
      await apiService.submitFeedback(recommendation.id, isHelpful);
      setFeedbackSubmitted(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-lg">{recommendation.title}</h4>
          <p className="text-sm text-gray-500">{recommendation.category}</p>
        </div>
        <div className="bg-blue-100 text-blue-800 font-medium rounded-full px-3 py-1">
          {recommendation.score}% Match
        </div>
      </div>
      
      <div className="my-4">
        <h5 className="font-medium text-gray-700 mb-2">Why we recommend this</h5>
        <p className="text-gray-700">{recommendation.reason}</p>
      </div>
      
      <div className="my-4">
        <h5 className="font-medium text-gray-700 mb-2">Key Features</h5>
        <div className="flex flex-wrap gap-2">
          {recommendation.features.map((feature, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              {feature}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex space-x-3 mt-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex-1">
          Learn More
        </button>
        <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-medium">
          Not Interested
        </button>
      </div>
      
      <div className="mt-4 pt-4 border-t flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {feedbackSubmitted 
            ? "Thanks for your feedback!" 
            : "Was this recommendation helpful?"}
        </p>
        {!feedbackSubmitted && (
          <div className="flex space-x-2">
            <button 
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => handleFeedback(true)}
              disabled={isSubmitting}
            >
              <ThumbsUp size={18} />
            </button>
            <button 
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => handleFeedback(false)}
              disabled={isSubmitting}
            >
              <ThumbsDown size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationCard;