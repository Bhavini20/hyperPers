import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import RecommendationCard from '../components/recommendations/RecommendationCard';
import apiService from '../services/api';
// At the top of your file with other imports
import { adaptRecommendationData } from '../utils';

const Recommendations = () => {
  const { getUserId } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const userId = getUserId();
        console.log(`Fetching recommendations for user: ${userId}`);
        
        // Make sure we're calling the recommendations endpoint, not users
        const data = await apiService.getRecommendations(userId);
        console.log('Received recommendations data:', data);
        
        // Adapt the data to match the expected format
        const adaptedData = Array.isArray(data) 
          ? data.map(adaptRecommendationData)
          : [];
          
        console.log('Adapted recommendations data:', adaptedData);
        setRecommendations(adaptedData);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchRecommendations();
  }, [getUserId]);
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>Your Personalized Recommendations</Typography>
        <Typography variant="body2" color="text.secondary">
          Based on your financial profile, spending patterns, and goals
        </Typography>
      </Box>
      
      {recommendations.length > 0 ? (
        recommendations.map((recommendation, index) => (
          <RecommendationCard 
            key={recommendation.id || recommendation.recommendation_id || index} 
            recommendation={recommendation} 
          />
        ))
      ) : (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
          No recommendations available at this time.
        </Typography>
      )}
    </Box>
  );
};

export default Recommendations;