// src/pages/Recommendations.js
import React, { useState, useEffect } from 'react';
import RecommendationCard from '../components/recommendations/RecommendationCard';
import apiService from '../services/api';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const data = await apiService.getRecommendations('user123');
        setRecommendations(data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Your Personalized Recommendations</h3>
        <p className="text-gray-600">Based on your financial profile, spending patterns, and goals</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {recommendations.map((recommendation) => (
          <RecommendationCard 
            key={recommendation.id} 
            recommendation={recommendation} 
          />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;