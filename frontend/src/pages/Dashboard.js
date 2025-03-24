// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import FinancialOverview from '../components/dashboard/FinancialOverview';
import AIInsights from '../components/dashboard/AIInsights';
import SpendingBreakdown from '../components/dashboard/SpendingBreakdown';
import IncomeExpensesChart from '../components/dashboard/IncomeExpensesChart';
import TopRecommendation from '../components/dashboard/TopRecommendation';
import apiService from '../services/api';
import { spendingData, transactionData } from '../services/mockData';

const Dashboard = ({ onNavigate }) => {
  const [userData, setUserData] = useState({
    name: '',
    accountNumber: '',
    balance: 0,
    riskProfile: '',
    financialHealth: '',
    sentiment: ''
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userProfileData = await apiService.getUserProfile();
        const recommendationsData = await apiService.getRecommendations('user123');
        
        setUserData(userProfileData);
        setRecommendations(recommendationsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewAllRecommendations = () => {
    onNavigate('recommendations');
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <FinancialOverview userData={userData} />
        <AIInsights />
        <SpendingBreakdown spendingData={spendingData} />
      </div>
      
      <IncomeExpensesChart transactionData={transactionData} />
      
      {recommendations.length > 0 && (
        <TopRecommendation 
          recommendation={recommendations[0]} 
          onViewAll={handleViewAllRecommendations}
        />
      )}
    </div>
  );
};

export default Dashboard;