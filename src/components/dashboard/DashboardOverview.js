/*
 * File: src/app/components/dashboard/DashboardOverview.js
 * Folder Structure:
 * src/app/
 * ├── components/
 * │   ├── dashboard/
 * │   │   ├── DashboardOverview.js (this file)
 * │   │   ├── PortfolioSummary.js
 * │   │   ├── FamilyManagement.js
 * │   │   └── OnboardingPrompt.js
 * │   ├── layout/Header.js
 * │   └── ui/Button.js, Input.js
 * ├── lib/utils.js, constants.js
 * └── styles/globals.css
 */

'use client';

import { motion } from 'framer-motion';
import { 
  EyeIcon,
  BanknotesIcon,
  ChartBarIcon,
  UserGroupIcon,
  ArrowUpIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { TrendingUp } from 'lucide-react';

import { formatCurrency, formatPercentage } from '../../lib/utils';

const DashboardOverview = ({ userData }) => {
  // Mock portfolio data
  const portfolioStats = {
    totalValue: userData.totalPortfolioValue,
    monthlyChange: 125000,
    monthlyChangePercent: userData.monthlyGrowth,
    yearlyGains: 340000,
    yearlyGainsPercent: 13.2,
    topPerformer: 'Equity Mutual Funds',
    topPerformerGain: 18.5,
    recentTransactions: [
      {
        id: 1,
        type: 'investment',
        description: 'SIP - HDFC Top 100 Fund',
        amount: 50000,
        date: '2025-01-15',
        status: 'completed'
      },
      {
        id: 2,
        type: 'dividend',
        description: 'Dividend - TCS Shares',
        amount: 15000,
        date: '2025-01-12',
        status: 'completed'
      },
      {
        id: 3,
        type: 'investment',
        description: 'Fixed Deposit - SBI',
        amount: 200000,
        date: '2025-01-10',
        status: 'pending'
      }
    ]
  };

  const quickActions = [
    {
      title: 'Start SIP',
      description: 'Set up systematic investment',
      icon: <BanknotesIcon className="w-6 h-6" />,
      color: 'bg-green-500',
      action: () => console.log('Start SIP')
    },
    {
      title: 'Add Funds',
      description: 'Transfer money to invest',
      icon: <ArrowUpIcon className="w-6 h-6" />,
      color: 'bg-blue-500',
      action: () => console.log('Add Funds')
    },
    {
      title: 'View Reports',
      description: 'Download statements',
      icon: <ChartBarIcon className="w-6 h-6" />,
      color: 'bg-purple-500',
      action: () => console.log('View Reports')
    },
    {
      title: 'Family Access',
      description: 'Manage family permissions',
      icon: <UserGroupIcon className="w-6 h-6" />,
      color: 'bg-yellow-500',
      action: () => console.log('Family Access')
    }
  ];

  return (
    <div className="space-y-8">
      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Portfolio Value */}
        <motion.div
          className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-2xl text-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <BanknotesIcon className="w-8 h-8" />
            <EyeIcon className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-medium opacity-80 mb-1">Total Portfolio</h3>
          <p className="text-2xl md:text-3xl font-bold mb-2">
            {formatCurrency(portfolioStats.totalValue)}
          </p>
          <div className="flex items-center space-x-1">
            <ArrowUpIcon className="w-4 h-4 text-green-800" />
            <span className="text-sm font-medium">
              {formatPercentage(portfolioStats.monthlyChangePercent)} this month
            </span>
          </div>
        </motion.div>

        {/* Monthly Change */}
        <motion.div
          className="bg-gray-900 p-6 rounded-2xl border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <TrendingUp  className="w-8 h-8 text-green-500" />
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
              +{formatPercentage(portfolioStats.monthlyChangePercent)}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-400 mb-1">Monthly Gains</h3>
          <p className="text-2xl md:text-3xl font-bold text-white mb-2">
            {formatCurrency(portfolioStats.monthlyChange)}
          </p>
          <p className="text-sm text-gray-500">vs last month</p>
        </motion.div>

        {/* Yearly Performance */}
        <motion.div
          className="bg-gray-900 p-6 rounded-2xl border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <ChartBarIcon className="w-8 h-8 text-blue-500" />
            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
              +{formatPercentage(portfolioStats.yearlyGainsPercent)}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-400 mb-1">Yearly Returns</h3>
          <p className="text-2xl md:text-3xl font-bold text-white mb-2">
            {formatCurrency(portfolioStats.yearlyGains)}
          </p>
          <p className="text-sm text-gray-500">2024 performance</p>
        </motion.div>

        {/* Top Performer */}
        <motion.div
          className="bg-gray-900 p-6 rounded-2xl border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <TrendingUp  className="w-8 h-8 text-purple-500" />
            <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
              TOP
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-400 mb-1">Best Performer</h3>
          <p className="text-lg font-bold text-white mb-2">
            {portfolioStats.topPerformer}
          </p>
          <p className="text-sm text-purple-400">
            +{formatPercentage(portfolioStats.topPerformerGain)} returns
          </p>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-900 rounded-2xl p-6 border border-gray-800"
      >
        <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.title}
              onClick={action.action}
              className="bg-gray-800 p-4 rounded-xl hover:bg-gray-700 transition-all duration-300 text-left group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <div className={`w-10 h-10 ${action.color} rounded-xl flex items-center justify-center mb-3 text-white group-hover:scale-110 transition-transform duration-300`}>
                {action.icon}
              </div>
              <h3 className="text-white font-semibold mb-1">{action.title}</h3>
              <p className="text-gray-400 text-sm">{action.description}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gray-900 rounded-2xl p-6 border border-gray-800"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
            <button className="text-yellow-500 text-sm font-medium hover:text-yellow-400 transition-colors">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {portfolioStats.recentTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    transaction.type === 'investment' 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-green-500/20 text-green-400'
                  }`}>
                    {transaction.type === 'investment' ? (
                      <ArrowUpIcon className="w-5 h-5" />
                    ) : (
                      <BanknotesIcon className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{transaction.description}</p>
                    <p className="text-gray-400 text-xs">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'dividend' ? 'text-green-400' : 'text-white'
                  }`}>
                    {transaction.type === 'dividend' ? '+' : ''}{formatCurrency(transaction.amount)}
                  </p>
                  <p className={`text-xs ${
                    transaction.status === 'completed' ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {transaction.status}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Market Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-900 rounded-2xl p-6 border border-gray-800"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Market Insights</h2>
            <ClockIcon className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="text-yellow-500 font-semibold text-sm mb-1">
                    RBI Policy Update
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Repo rate maintained at 6.5%. This stability may benefit your NRE fixed deposits.
                  </p>
                  <p className="text-gray-500 text-xs mt-2">2 hours ago</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="text-green-500 font-semibold text-sm mb-1">
                    Portfolio Rebalancing
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Your equity allocation is performing well. Consider booking profits in top performers.
                  </p>
                  <p className="text-gray-500 text-xs mt-2">1 day ago</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="text-blue-500 font-semibold text-sm mb-1">
                    Tax Planning Reminder
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Q4 ending soon. Review your 80C investments and tax-saving options.
                  </p>
                  <p className="text-gray-500 text-xs mt-2">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardOverview;