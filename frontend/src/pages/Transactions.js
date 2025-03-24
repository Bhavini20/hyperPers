// src/pages/Transactions.js
import React, { useState, useEffect } from 'react';
import SentimentCard from '../components/transactions/SentimentCard';
import AnomaliesCard from '../components/transactions/AnomaliesCard';
import TransactionList from '../components/transactions/TransactionList';
import PredictiveInsights from '../components/transactions/PredictiveInsights';
import apiService from '../services/api';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [sentiment, setSentiment] = useState('positive');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        setLoading(true);
        const transactionData = await apiService.getTransactionHistory('user123');
        const sentimentData = await apiService.getSentimentAnalysis('user123');
        
        setTransactions(transactionData);
        setSentiment(sentimentData.sentiment_analysis.overall_sentiment);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Transaction Analysis</h3>
        <p className="text-gray-600">AI-powered insights from your spending patterns</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <SentimentCard sentiment={sentiment} />
        <AnomaliesCard />
      </div>
      
      <TransactionList transactions={transactions} />
      
      <PredictiveInsights />
    </div>
  );
};

export default Transactions;