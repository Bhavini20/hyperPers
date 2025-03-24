// src/components/transactions/SentimentCard.js
import React from 'react';

const SentimentCard = ({ sentiment }) => {
  // Determine emoji based on sentiment
  const getEmoji = (sentiment) => {
    switch(sentiment.toLowerCase()) {
      case 'positive':
        return '😊';
      case 'negative':
        return '😟';
      case 'neutral':
        return '😐';
      default:
        return '😊';
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h4 className="font-semibold mb-4">Spending Sentiment</h4>
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-green-600 text-2xl">{getEmoji(sentiment)}</span>
        </div>
        <div>
          <p className="font-medium text-lg capitalize">{sentiment}</p>
          <p className="text-gray-600">Your spending is balanced and sustainable</p>
        </div>
      </div>
    </div>
  );
};

export default SentimentCard;