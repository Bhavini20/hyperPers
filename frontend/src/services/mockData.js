// src/services/mockData.js

// Mock user data
export const userData = {
  name: "John Doe",
  accountNumber: "**** 3456",
  balance: 24580.75,
  riskProfile: "Moderate",
  financialHealth: "Good",
  sentiment: "Positive"
};

// Mock transaction data for charts
export const transactionData = [
  { month: 'Jan', income: 5200, expenses: 4300 },
  { month: 'Feb', income: 5300, expenses: 4100 },
  { month: 'Mar', income: 5300, expenses: 4800 },
  { month: 'Apr', income: 5400, expenses: 4600 },
  { month: 'May', income: 5500, expenses: 4200 },
  { month: 'Jun', income: 5500, expenses: 4900 },
];

// Mock spending categories
export const spendingData = [
  { name: 'Housing', value: 35, color: '#1976d2' },
  { name: 'Food', value: 20, color: '#2e7d32' },
  { name: 'Transportation', value: 15, color: '#ff9800' },
  { name: 'Entertainment', value: 10, color: '#d32f2f' },
  { name: 'Other', value: 20, color: '#9c27b0' },
];

// Mock product recommendations
export const recommendations = [
  {
    id: 1,
    title: "Premium Savings Account",
    category: "Savings",
    score: 94,
    reason: "Based on your consistent monthly deposits and moderate risk profile, this high-yield savings account would help you achieve your emergency fund goal faster with 2.5% APY.",
    features: ["No minimum balance", "No monthly fees", "2.5% APY"]
  },
  {
    id: 2,
    title: "Growth Investment Fund",
    category: "Investments",
    score: 87,
    reason: "Your financial data shows you have surplus income that could be invested for long-term growth. This fund is aligned with your moderate risk tolerance.",
    features: ["Professionally managed", "Quarterly rebalancing", "12.3% average return"]
  },
  {
    id: 3,
    title: "Travel Rewards Credit Card",
    category: "Credit Cards",
    score: 82,
    reason: "Your transaction history shows frequent travel purchases. This card would earn you 3x points on travel and dining, maximizing rewards on your existing spending.",
    features: ["No foreign transaction fees", "50,000 bonus points", "Free travel insurance"]
  }
];

// Mock recent transactions
export const recentTransactions = [
  {
    id: 1,
    date: "Mar 24, 2025",
    description: "Whole Foods Market",
    category: "Groceries",
    amount: -137.42
  },
  {
    id: 2,
    date: "Mar 23, 2025",
    description: "Netflix Subscription",
    category: "Entertainment",
    amount: -15.99
  },
  {
    id: 3,
    date: "Mar 23, 2025",
    description: "Uber Ride",
    category: "Transportation",
    amount: -28.50
  },
  {
    id: 4,
    date: "Mar 22, 2025",
    description: "Starbucks",
    category: "Dining",
    amount: -7.85
  },
  {
    id: 5,
    date: "Mar 22, 2025",
    description: "Payroll Deposit",
    category: "Income",
    amount: 2750.00
  }
];

// Mock upcoming expenses
export const upcomingExpenses = [
  {
    id: 1,
    description: "Rent payment",
    amount: 1850.00,
    date: "Mar 31"
  },
  {
    id: 2,
    description: "Car insurance",
    amount: 128.75,
    date: "Apr 5"
  },
  {
    id: 3,
    description: "Student loan",
    amount: 350.00,
    date: "Apr 10"
  }
];

// Mock chat messages
export const chatMessages = [
  {
    id: 1,
    sender: "user",
    text: "How much am I spending on dining out each month?"
  },
  {
    id: 2,
    sender: "assistant",
    text: "In the last 3 months, you've spent an average of $428 per month on dining out. This represents about 12% of your total monthly expenses. This is 15% higher than the previous 3 months, when you averaged $372 per month on dining."
  },
  {
    id: 3,
    sender: "user",
    text: "What's the best way for me to save for a home down payment?"
  },
  {
    id: 4,
    sender: "assistant",
    text: "Based on your financial profile and goal to purchase a home in the next 3 years, I recommend:\n\n1. Increase your monthly savings by $300 by reducing entertainment expenses\n2. Open a high-yield savings account for your down payment fund (Premium Savings Account has a 2.5% APY)\n3. Set up automatic transfers of $850/month to this account\n\nThis approach will help you save approximately $32,400 in 3 years, plus interest, which would be sufficient for a 10% down payment on a $320,000 home."
  }
];