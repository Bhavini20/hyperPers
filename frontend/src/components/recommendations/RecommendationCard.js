import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button, 
  Chip, 
  Divider,
  IconButton
} from '@mui/material';
import { 
  ThumbUp as ThumbUpIcon, 
  ThumbDown as ThumbDownIcon 
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import apiService from '../../services/api';

const RecommendationCard = ({ recommendation }) => {
  const { getUserId } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  
  // Safely access nested properties with fallbacks
  const id = recommendation?.id || recommendation?.recommendation_id || 'rec-id';
  const title = recommendation?.title || recommendation?.product_name || 'Recommendation';
  const category = recommendation?.category || recommendation?.product_category || 'Financial Product';
  const score = recommendation?.score || 85;
  const reason = recommendation?.reason || 'This product matches your financial profile.';
  const features = recommendation?.features || [];

  const handleFeedback = async (isHelpful) => {
    try {
      setIsSubmitting(true);
      await apiService.submitFeedback(id, isHelpful);
      setFeedbackSubmitted(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card elevation={2} sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="caption" color="text.secondary">{category}</Typography>
          </Box>
          <Chip 
            label={`${score}% Match`} 
            color="primary" 
            size="small"
            sx={{ fontWeight: 'medium' }}
          />
        </Box>
        
        <Box sx={{ my: 2 }}>
          <Typography variant="subtitle2" gutterBottom>Why we recommend this</Typography>
          <Typography variant="body2">{reason}</Typography>
        </Box>
        
        {features && features.length > 0 && (
          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Key Features</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {features.map((feature, index) => (
                <Chip 
                  key={index} 
                  label={feature} 
                  size="small" 
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" fullWidth>
            Learn More
          </Button>
          <Button variant="outlined" color="primary">
            Not Interested
          </Button>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {feedbackSubmitted 
              ? "Thanks for your feedback!" 
              : "Was this recommendation helpful?"}
          </Typography>
          {!feedbackSubmitted && (
            <Box>
              <IconButton 
                color="primary"
                onClick={() => handleFeedback(true)}
                disabled={isSubmitting}
              >
                <ThumbUpIcon />
              </IconButton>
              <IconButton 
                color="default"
                onClick={() => handleFeedback(false)}
                disabled={isSubmitting}
              >
                <ThumbDownIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;