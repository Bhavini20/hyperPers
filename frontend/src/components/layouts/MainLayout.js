// src/components/layout/MainLayout.js
import React, { useState, useEffect } from 'react';
import { Box, Toolbar, CssBaseline } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import apiService from '../../services/api';

const MainLayout = ({ children, activeTab, onTabChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userData, setUserData] = useState({
    name: 'User',
    accountNumber: '*****',
    balance: 0,
    riskProfile: 'Moderate',
    financialHealth: 'Good',
    sentiment: 'Neutral'
  });

  const { getUserId } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = getUserId();
        const data = await apiService.getUserProfile(userId);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [getUserId]);

  // Determine which content to render based on activeTab
  // const renderContent = () => {
  //   switch (activeTab) {
  //     case 'dashboard':
  //       return children.dashboard;
  //     case 'recommendations':
  //       return children.recommendations;
  //     case 'transactions':
  //       return children.transactions;
  //     case 'assistant':
  //       return children.assistant;
  //     default:
  //       return children.dashboard;
  //   }
  // };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <Header activeTab={activeTab} userData={userData} />
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={onTabChange}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          backgroundColor: (theme) => theme.palette.grey[100]
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;