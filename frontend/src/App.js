import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Recommendations from './pages/Recommendations';
import Transactions from './pages/Transactions';
import Assistant from './pages/Assistant';

// Create a theme.
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTab} />;
      case 'recommendations':
        return <Recommendations />;
      case 'transactions':
        return <Transactions />;
      case 'assistant':
        return <Assistant />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <MainLayout activeTab={activeTab} onTabChange={setActiveTab}>
          {renderContent()}
        </MainLayout>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;