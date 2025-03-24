// src/App.js
import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Recommendations from './pages/Recommendations';
import Transactions from './pages/Transactions';
import Assistant from './pages/Assistant';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <Layout>
      {{
        dashboard: <Dashboard onNavigate={setActiveTab} />,
        recommendations: <Recommendations />,
        transactions: <Transactions />,
        assistant: <Assistant />
      }}
    </Layout>
  );
}

export default App;