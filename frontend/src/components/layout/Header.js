// src/components/layout/Header.js
import React from 'react';
import { Bell, User, Search } from 'lucide-react';

const Header = ({ activeTab, userData, sidebarOpen }) => {
  return (
    <header className="bg-white shadow-sm fixed top-0 right-0 left-0" style={{ marginLeft: sidebarOpen ? '16rem' : '5rem' }}>
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {activeTab === 'dashboard' && 'Financial Dashboard'}
            {activeTab === 'recommendations' && 'Personalized Recommendations'}
            {activeTab === 'transactions' && 'Transaction Analysis'}
            {activeTab === 'assistant' && 'AI Financial Assistant'}
          </h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input 
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-lg"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell size={20} />
          </button>
          
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <User size={20} />
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium">{userData.name}</p>
              <p className="text-xs text-gray-500">{userData.accountNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;