/*
 * File: src/app/components/dashboard/PortfolioSummary.js
 * Folder Structure:
 * src/app/
 * ├── components/
 * │   ├── dashboard/
 * │   │   ├── PortfolioSummary.js (this file)
 * │   │   ├── DashboardOverview.js
 * │   │   ├── FamilyManagement.js
 * │   │   └── OnboardingPrompt.js
 * │   ├── layout/Header.js
 * │   └── ui/Button.js, Input.js
 * ├── lib/utils.js, constants.js
 * └── styles/globals.css
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartPieIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
  SparklesIcon,
  GlobeAltIcon,
  EyeIcon,
  AdjustmentsHorizontalIcon,
  CalendarDaysIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';

import { TrendingUp, Download } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../../lib/utils';

const PortfolioSummary = ({ userData }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');
  const [selectedView, setSelectedView] = useState('allocation');

  // Mock portfolio data
  const portfolioData = {
    totalValue: userData.totalPortfolioValue,
    allocation: [
      {
        category: 'Equity',
        value: 1423750,
        percentage: 50.1,
        change: 12.5,
        color: 'bg-blue-500',
        icon: <TrendingUp className="w-5 h-5" />
      },
      {
        category: 'Mutual Funds',
        value: 853500,
        percentage: 30.0,
        change: 8.3,
        color: 'bg-green-500',
        icon: <ChartPieIcon className="w-5 h-5" />
      },
      {
        category: 'Fixed Deposits',
        value: 341400,
        percentage: 12.0,
        change: 6.5,
        color: 'bg-yellow-500',
        icon: <BanknotesIcon className="w-5 h-5" />
      },
      {
        category: 'Gold',
        value: 170700,
        percentage: 6.0,
        change: -2.1,
        color: 'bg-orange-500',
        icon: <SparklesIcon className="w-5 h-5" />
      },
      {
        category: 'International',
        value: 56950,
        percentage: 2.0,
        change: 15.2,
        color: 'bg-purple-500',
        icon: <GlobeAltIcon className="w-5 h-5" />
      }
    ],
    topHoldings: [
      {
        name: 'HDFC Top 100 Fund',
        type: 'Mutual Fund',
        value: 285000,
        units: 1425.5,
        change: 8.5,
        nav: 156.78
      },
      {
        name: 'TCS Limited',
        type: 'Equity',
        value: 187500,
        units: 125,
        change: 12.3,
        price: 3875.40
      },
      {
        name: 'SBI Fixed Deposit',
        type: 'FD',
        value: 200000,
        maturityDate: '2025-12-15',
        interestRate: 7.2,
        change: 0.0
      },
      {
        name: 'Digital Gold',
        type: 'Gold',
        value: 150000,
        units: 28.5,
        change: -1.8,
        price: 5263.16
      },
      {
        name: 'US Tech ETF',
        type: 'International',
        value: 45000,
        units: 225,
        change: 18.2,
        price: 200.0
      }
    ],
    performance: {
      '1M': { value: 2845000, change: 3.2 },
      '3M': { value: 2721000, change: 4.6 },
      '6M': { value: 2598000, change: 9.5 },
      '1Y': { value: 2458000, change: 15.7 },
      '3Y': { value: 2105000, change: 35.2 }
    },
    dividends: [
      {
        company: 'TCS Limited',
        amount: 12500,
        date: '2025-01-15',
        status: 'received'
      },
      {
        company: 'Infosys Limited',
        amount: 8750,
        date: '2025-01-10',
        status: 'received'
      },
      {
        company: 'HDFC Bank',
        amount: 15600,
        date: '2024-12-28',
        status: 'received'
      }
    ]
  };

  const timeframes = ['1M', '3M', '6M', '1Y', '3Y'];
  const viewOptions = [
    { id: 'allocation', label: 'Allocation', icon: <ChartPieIcon className="w-4 h-4" /> },
    { id: 'holdings', label: 'Holdings', icon: <BuildingLibraryIcon className="w-4 h-4" /> },
    { id: 'performance', label: 'Performance', icon: <TrendingUp className="w-4 h-4" /> }
  ];

  const getPerformanceData = () => {
    const current = portfolioData.performance[selectedTimeframe];
    return current;
  };

  return (
    <div className="space-y-8">
      {/* Portfolio Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-2xl text-black"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-4 lg:mb-0">
            <h2 className="text-3xl font-bold mb-2">Portfolio Summary</h2>
            <p className="text-lg opacity-90">
              Total Value: {formatCurrency(portfolioData.totalValue)}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <ArrowUpIcon className="w-4 h-4" />
              <span className="text-sm font-medium">
                +{formatPercentage(getPerformanceData().change)} since last {selectedTimeframe.toLowerCase()}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="bg-black/10 p-3 rounded-full hover:bg-black/20 transition-colors">
              <Download className="w-5 h-5" />
            </button>
            <button className="bg-black/10 p-3 rounded-full hover:bg-black/20 transition-colors">
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
            </button>
            <button className="bg-black text-yellow-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-900 transition-colors">
              Rebalance Portfolio
            </button>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        {/* View Selection */}
        <div className="flex items-center space-x-2 bg-gray-900 p-2 rounded-xl border border-gray-800">
          {viewOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedView(option.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedView === option.id
                  ? 'bg-yellow-500 text-black font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {option.icon}
              <span className="text-sm">{option.label}</span>
            </button>
          ))}
        </div>

        {/* Timeframe Selection */}
        <div className="flex items-center space-x-2 bg-gray-900 p-2 rounded-xl border border-gray-800">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedTimeframe === timeframe
                  ? 'bg-yellow-500 text-black'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      {/* Content based on selected view */}
      {selectedView === 'allocation' && (
        <motion.div
          key="allocation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Asset Allocation */}
          <div className="lg:col-span-2 bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-6">Asset Allocation</h3>
            
            <div className="space-y-4">
              {portfolioData.allocation.map((asset, index) => (
                <motion.div
                  key={asset.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 ${asset.color} rounded-xl flex items-center justify-center text-white`}>
                      {asset.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{asset.category}</h4>
                      <p className="text-gray-400 text-sm">{asset.percentage}% of portfolio</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-white font-semibold">{formatCurrency(asset.value)}</p>
                    <div className={`flex items-center space-x-1 text-sm ${
                      asset.change >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {asset.change >= 0 ? (
                        <ArrowUpIcon className="w-3 h-3" />
                      ) : (
                        <ArrowDownIcon className="w-3 h-3" />
                      )}
                      <span>{formatPercentage(Math.abs(asset.change))}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Portfolio Insights */}
          <div className="space-y-6">
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
              <h3 className="text-lg font-bold text-white mb-4">Risk Analysis</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Risk Level</span>
                  <span className="text-yellow-500 font-semibold">Moderate</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Volatility</span>
                  <span className="text-white font-semibold">12.5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Sharpe Ratio</span>
                  <span className="text-green-400 font-semibold">1.34</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                <p className="text-yellow-500 text-xs font-medium">
                  Your portfolio is well-diversified with balanced risk exposure.
                </p>
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
              <h3 className="text-lg font-bold text-white mb-4">Recent Dividends</h3>
              
              <div className="space-y-3">
                {portfolioData.dividends.slice(0, 3).map((dividend, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-xl">
                    <div>
                      <p className="text-white text-sm font-medium">{dividend.company}</p>
                      <p className="text-gray-400 text-xs">{dividend.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-semibold text-sm">
                        +{formatCurrency(dividend.amount)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {selectedView === 'holdings' && (
        <motion.div
          key="holdings"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-800">
            <h3 className="text-xl font-bold text-white">Top Holdings</h3>
          </div>
          
          <div className="divide-y divide-gray-800">
            {portfolioData.topHoldings.map((holding, index) => (
              <motion.div
                key={holding.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-white font-semibold">{holding.name}</h4>
                      <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                        {holding.type}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Value</p>
                        <p className="text-white font-medium">{formatCurrency(holding.value)}</p>
                      </div>
                      
                      {holding.units && (
                        <div>
                          <p className="text-gray-400">Units</p>
                          <p className="text-white font-medium">{holding.units}</p>
                        </div>
                      )}
                      
                      {holding.price && (
                        <div>
                          <p className="text-gray-400">Price</p>
                          <p className="text-white font-medium">₹{holding.price}</p>
                        </div>
                      )}
                      
                      {holding.interestRate && (
                        <div>
                          <p className="text-gray-400">Interest Rate</p>
                          <p className="text-white font-medium">{holding.interestRate}%</p>
                        </div>
                      )}
                      
                      <div>
                        <p className="text-gray-400">Change</p>
                        <div className={`flex items-center space-x-1 font-medium ${
                          holding.change >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {holding.change >= 0 ? (
                            <ArrowUpIcon className="w-3 h-3" />
                          ) : holding.change < 0 ? (
                            <ArrowDownIcon className="w-3 h-3" />
                          ) : null}
                          <span>{formatPercentage(Math.abs(holding.change))}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {selectedView === 'performance' && (
        <motion.div
          key="performance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-6">Performance Metrics</h3>
            
            <div className="space-y-6">
              {Object.entries(portfolioData.performance).map(([period, data]) => (
                <div key={period} className="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
                  <div>
                    <p className="text-white font-semibold">{period}</p>
                    <p className="text-gray-400 text-sm">Portfolio Value</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">{formatCurrency(data.value)}</p>
                    <div className="flex items-center space-x-1 text-green-400 text-sm">
                      <ArrowUpIcon className="w-3 h-3" />
                      <span>+{formatPercentage(data.change)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-6">Portfolio Recommendations</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <h4 className="text-green-400 font-semibold mb-2">Strong Performance</h4>
                <p className="text-gray-300 text-sm">
                  Your equity holdings are outperforming the market. Consider booking some profits.
                </p>
              </div>
              
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                <h4 className="text-yellow-500 font-semibold mb-2">Rebalancing Opportunity</h4>
                <p className="text-gray-300 text-sm">
                  Your portfolio is slightly overweight in equity. Consider adding to fixed income.
                </p>
              </div>
              
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <h4 className="text-blue-400 font-semibold mb-2">Tax Optimization</h4>
                <p className="text-gray-300 text-sm">
                  Consider investing in ELSS funds before Q4 ends for tax savings under 80C.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PortfolioSummary;