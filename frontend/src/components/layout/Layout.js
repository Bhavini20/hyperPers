// src/components/layout/Layout.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import apiService from '../../services/api';

const Layout = ({ children }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userData, setUserData] = useState({
    name: '',
    accountNumber: '',
    balance: 0,
    riskProfile: '',
    financialHealth: '',
    sentiment: ''
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await apiService.getUserProfile();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Determine which content to render based on activeTab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <div className="p-6">{children.dashboard}</div>;
      case 'recommendations':
        return <div className="p-6">{children.recommendations}</div>;
      case 'transactions':
        return <div className="p-6">{children.transactions}</div>;
      case 'assistant':
        return <div className="p-6 h-full flex flex-col">{children.assistant}</div>;
      default:
        return <div className="p-6">{children.dashboard}</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="flex-1 overflow-auto" style={{ marginLeft: sidebarOpen ? '16rem' : '5rem' }}>
        <Header 
          activeTab={activeTab}
          userData={userData}
          sidebarOpen={sidebarOpen}
        />
        
        <main className="mt-16 h-full">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Layout;