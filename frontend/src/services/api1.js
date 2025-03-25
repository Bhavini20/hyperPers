// src/services/api.js
import axios from 'axios';
import { userData, recommendations, transactionData, recentTransactions, chatMessages } from './mockData';
import { useAuth } from '../context/AuthContext';

// API base URL
const API_BASE_URL = 'http://localhost:8000';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    ...getAuthHeader(),
    'Content-Type': 'application/json'
  },
});


// API service functions
const apiService =(function() {
  
  // User datalet auth = null;

  // Function to initialize auth
  const initAuth = (authInstance) => {
    auth = authInstance;
  };
  const userId = auth?.getUserId();
  // API methods
  return {
    initAuth,
  
  getUserProfile: async () => {
    try {
      // When backend is ready:
      // const response = await api.get('/users/current');
      // return response.data;
      
      // Using mock data for now
      return userData;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return userData; // Fallback to mock data
    }
  },
  // frontend/src/services/api.js
getDashboardData: async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/${userId}`, {
      headers: getAuthHeader()
    });
    
    if (!response.ok) throw new Error('Failed to fetch dashboard data');
    return await response.json();
  } catch (error) {
    console.error('Dashboard data error:', error);
    throw error;
  }
},
  
  // Recommendations
  getRecommendations: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/recommendations/${userId}`, {
        headers: getAuthHeader()
      });
      
      if (!response.ok) throw new Error('Failed to fetch recommendations');
      return await response.json();
    } catch (error) {
      console.error('Recommendations error:', error);
      throw error;
    }
  },
  
  submitFeedback: async (recommendationId, isHelpful) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/recommendations/${recommendationId}/feedback?is_helpful=${isHelpful}`,
        {
          method: 'POST',
          headers: getAuthHeader()
        }
      );
      
      if (!response.ok) throw new Error('Failed to submit feedback');
      return await response.json();
    } catch (error) {
      console.error('Feedback error:', error);
      throw error;
    }
  },
  
  // Transaction data
  getTransactionHistory: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/${userId}`, {
        headers: getAuthHeader()
      });
      
      if (!response.ok) throw new Error('Failed to fetch transactions');
      return await response.json();
    } catch (error) {
      console.error('Transaction history error:', error);
      throw error;
    }
  },
  
  getTransactionAnalytics: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/${userId}/analytics`, {
        headers: getAuthHeader()
      });
      
      if (!response.ok) throw new Error('Failed to fetch analytics');
      return await response.json();
    } catch (error) {
      console.error('Transaction analytics error:', error);
      throw error;
    }
  },
  
  getSentimentAnalysis: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/${userId}/sentiment`, {
        headers: getAuthHeader()
      });
      
      if (!response.ok) throw new Error('Failed to fetch sentiment');
      return await response.json();
    } catch (error) {
      console.error('Sentiment analysis error:', error);
      throw error;
    }
  },
  
  // AI Assistant
  getChatHistory: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/${userId}/history`, {
        headers: getAuthHeader()
      });
      
      if (!response.ok) throw new Error('Failed to fetch chat history');
      
      const data = await response.json();
      return data.map(msg => ({
        id: msg.message_id,
        sender: msg.sender,
        text: msg.text
      }));
    } catch (error) {
      console.error('Chat history error:', error);
      return [];
    }
  },
  
  sendMessage: async (userId, message) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/${userId}/message`, {
        method: 'POST',
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });
      
      if (!response.ok) throw new Error('Failed to send message');
      return await response.json();
    } catch (error) {
      console.error('Send message error:', error);
      throw error;
    }
  }
};
})();

export default apiService;