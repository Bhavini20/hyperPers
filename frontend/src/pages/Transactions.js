import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import SentimentCard from '../components/transactions/SentimentCard';
import AnomaliesCard from '../components/transactions/AnomaliesCard';
import TransactionList from '../components/transactions/TransactionList';
import PredictiveInsights from '../components/transactions/PredictiveInsights';
import apiService from '../services/api';
import { recentTransactions } from '../services/mockData';

const Transactions = () => {
  const { getUserId } = useAuth();
  const [transactions, setTransactions] = useState(recentTransactions); // Default to mock data
  const [analytics, setAnalytics] = useState(null);
  const [sentiment, setSentiment] = useState('neutral'); // Default value
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        setLoading(true);
        const userId = getUserId();
        
        // Fetch transaction history
        try {
          const transactionData = await apiService.getTransactionHistory(userId);
          if (transactionData && transactionData.length > 0) {
            setTransactions(transactionData);
          }
        } catch (error) {
          console.error('Error fetching transaction history:', error);
          // Already using mock data as default
        }
        
        // Fetch analytics
        try {
          const analyticsData = await apiService.getTransactionAnalytics(userId);
          setAnalytics(analyticsData);
        } catch (error) {
          console.error('Error fetching transaction analytics:', error);
        }
        
        // Fetch sentiment
        try {
          const sentimentData = await apiService.getSentimentAnalysis(userId);
          if (sentimentData && sentimentData.sentiment_analysis) {
            // Safely extract sentiment value with fallback
            setSentiment(sentimentData.sentiment_analysis.overall_sentiment || 'neutral');
          }
        } catch (error) {
          console.error('Error fetching sentiment analysis:', error);
          // Using default 'neutral' sentiment
        }
      } catch (error) {
        console.error('Error in fetchTransactionData:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTransactionData();
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
        <Typography variant="h5" gutterBottom>Transaction Analysis</Typography>
        <Typography variant="body2" color="text.secondary">
          AI-powered insights from your spending patterns
        </Typography>
      </Box>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <SentimentCard sentiment={sentiment} />
        </Grid>
        <Grid item xs={12} md={6}>
          <AnomaliesCard />
        </Grid>
      </Grid>
      
      <TransactionList transactions={transactions} />
      
      <PredictiveInsights />
    </Box>
  );
};

export default Transactions;