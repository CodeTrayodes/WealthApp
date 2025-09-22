/*
 * File: src/app/dashboard/page.js
 * Folder Structure:
 * src/app/
 * ├── dashboard/
 * │   └── page.js (this file)
 * ├── components/
 * │   ├── dashboard/
 * │   │   ├── DashboardOverview.js
 * │   │   ├── PortfolioSummary.js
 * │   │   ├── FamilyManagement.js
 * │   │   └── OnboardingPrompt.js
 * │   ├── layout/Header.js
 * │   └── ui/Button.js, Input.js
 * ├── lib/utils.js, constants.js
 * └── styles/globals.css
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CogIcon,
  UserGroupIcon,
  BellIcon,
  Squares2X2Icon,
  ChartBarIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';
import Header from '@/components/layout/Header';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import PortfolioSummary from '@/components/dashboard/PortfolioSummary';
import FamilyManagement from '@/components/dashboard/FamilyManagement';
import OnboardingPrompt from '@/components/dashboard/OnboardingPrompt';
import { formatCurrency } from '@/lib/utils';

const DashboardPage = () => {
  const [isOnboarded, setIsOnboarded] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showOnboardingToggle, setShowOnboardingToggle] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Mock user data
  const [userData, setUserData] = useState({
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    location: 'San Francisco, CA',
    memberSince: '2024',
    riskProfile: 'Moderate',
    totalPortfolioValue: 2845000,
    monthlyGrowth: 8.5,
    familyMembers: [
      {
        id: 1,
        name: 'Rajesh Sharma',
        relationship: 'Spouse',
        portfolioValue: 1250000,
        access: 'View & Invest'
      },
      {
        id: 2,
        name: 'Pranjal Sharma',
        relationship: 'Child',
        portfolioValue: 450000,
        access: 'View Only'
      }
    ]
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-black" />;
  }

  const tabItems = [
    { id: 'overview', label: 'Overview', icon: <Squares2X2Icon className="w-5 h-5" /> },
    { id: 'portfolio', label: 'Portfolio', icon: <ChartBarIcon className="w-5 h-5" /> },
    { id: 'family', label: 'Family', icon: <UserGroupIcon className="w-5 h-5" /> },
    { id: 'investments', label: 'Invest', icon: <BanknotesIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Developer Toggle - Remove in production */}
      {showOnboardingToggle && (
        <div className="fixed top-24 right-4 z-40 bg-yellow-500 text-black p-3 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2 text-sm">
            <span className="font-medium">Dev Mode:</span>
            <button
              onClick={() => setIsOnboarded(!isOnboarded)}
              className="flex items-center space-x-1 bg-black text-yellow-500 px-2 py-1 rounded"
            >
              {isOnboarded ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
              <span>{isOnboarded ? 'Onboarded' : 'Locked'}</span>
            </button>
            <button
              onClick={() => setShowOnboardingToggle(false)}
              className="text-black hover:text-gray-600 text-xs"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="pt-20">
        {/* Dashboard Header - White Section */}
        <section className="bg-white text-black rounded-b-[2rem] md:rounded-b-[3rem] relative z-10">
          <div className="container-main py-8">
            <div className="max-w-6xl mx-auto">
              {/* Welcome Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    Welcome back, <span className="text-yellow-500">{userData.name}</span>
                  </h1>
                  <p className="text-gray-600 text-lg">
                    {isOnboarded 
                      ? `Managing ${formatCurrency(userData.totalPortfolioValue)} across ${userData.familyMembers.length + 1} portfolios`
                      : 'Complete your onboarding to access all features'
                    }
                  </p>
                </div>

                <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                  {/* <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <BellIcon className="w-5 h-5 text-gray-600" />
                  </button> */}
                  <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <CogIcon className="w-5 h-5 text-gray-600" />
                  </button>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-lg">
                        {userData.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 overflow-x-auto pb-1">
                  {tabItems.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => isOnboarded && setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-1 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                        activeTab === tab.id && isOnboarded
                          ? 'border-yellow-500 text-yellow-500'
                          : isOnboarded
                          ? 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          : 'border-transparent text-gray-300 cursor-not-allowed'
                      }`}
                      disabled={!isOnboarded}
                    >
                      <span className={isOnboarded ? '' : 'opacity-50'}>{tab.icon}</span>
                      <span>{tab.label}</span>
                      {!isOnboarded && (
                        <ShieldCheckIcon className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Content - Black Section */}
        <section className="bg-black rounded-t-[2rem] md:rounded-t-[3rem] relative z-10 -mt-8 md:-mt-12">
          <div className="container-main py-12">
            <div className="max-w-6xl mx-auto">
              <AnimatePresence mode="wait">
                {!isOnboarded ? (
                  <motion.div
                    key="onboarding"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <OnboardingPrompt />
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === 'overview' && (
                      <DashboardOverview userData={userData} />
                    )}
                    {activeTab === 'portfolio' && (
                      <PortfolioSummary userData={userData} />
                    )}
                    {activeTab === 'family' && (
                      <FamilyManagement 
                        userData={userData} 
                        setUserData={setUserData} 
                      />
                    )}
                    {activeTab === 'investments' && (
                      <div className="text-center py-16">
                        <BanknotesIcon className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-4">Investment Center</h3>
                        <p className="text-gray-400 mb-8">Investment features coming soon</p>
                        <button className="bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors">
                          Explore Investment Options
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;