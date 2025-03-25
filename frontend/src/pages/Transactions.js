// src/pages/Transactions.js
import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, CircularProgress } from '@mui/material';
import SentimentCard from '../components/transactions/SentimentCard';
import AnomaliesCard from '../components/transactions/AnomaliesCard';
import TransactionList from '../components/transactions/TransactionList';
import PredictiveInsights from '../components/transactions/PredictiveInsights';
import apiService from '../services/api';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        setLoading(true);
        const userId = getUserId();
        
        // Fetch in parallel
        const [transactionData, analyticsData, sentimentData] = await Promise.all([
          apiService.getTransactionHistory(userId),
          apiService.getTransactionAnalytics(userId),
          apiService.getSentimentAnalysis(userId)
        ]);
        
        setTransactions(transactionData);
        setAnalytics(analyticsData);
        setSentiment(sentimentData.sentiment_analysis);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTransactionData();
  }, []);
  
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