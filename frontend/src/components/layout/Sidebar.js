// src/components/layout/Sidebar.js
import React from 'react';
import { TrendingUp, DollarSign, CreditCard, MessageSquare } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-blue-900 to-blue-700 text-white transition-all duration-300 ease-in-out h-screen fixed left-0`}>
      <div className="p-4 flex items-center justify-between">
        {sidebarOpen && <h1 className="text-xl font-bold">FinPersona AI</h1>}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-blue-800"
        >
          {sidebarOpen ? '←' : '→'}
        </button>
      </div>
      
      <nav className="mt-8">
        <button 
          className={`flex items-center w-full p-4 hover:bg-blue-800 ${activeTab === 'dashboard' ? 'bg-blue-800' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <TrendingUp size={20} />
          {sidebarOpen && <span className="ml-4">Dashboard</span>}
        </button>
        
        <button 
          className={`flex items-center w-full p-4 hover:bg-blue-800 ${activeTab === 'recommendations' ? 'bg-blue-800' : ''}`}
          onClick={() => setActiveTab('recommendations')}
        >
          <DollarSign size={20} />
          {sidebarOpen && <span className="ml-4">Recommendations</span>}
        </button>
        
        <button 
          className={`flex items-center w-full p-4 hover:bg-blue-800 ${activeTab === 'transactions' ? 'bg-blue-800' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          <CreditCard size={20} />
          {sidebarOpen && <span className="ml-4">Transactions</span>}
        </button>
        
        <button 
          className={`flex items-center w-full p-4 hover:bg-blue-800 ${activeTab === 'assistant' ? 'bg-blue-800' : ''}`}
          onClick={() => setActiveTab('assistant')}
        >
          <MessageSquare size={20} />
          {sidebarOpen && <span className="ml-4">AI Assistant</span>}
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;