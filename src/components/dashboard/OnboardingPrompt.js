/*
 * File: src/app/components/dashboard/OnboardingPrompt.js
 * Folder Structure:
 * src/app/
 * ├── components/
 * │   ├── dashboard/
 * │   │   ├── OnboardingPrompt.js (this file)
 * │   │   ├── DashboardOverview.js
 * │   │   ├── PortfolioSummary.js
 * │   │   └── FamilyManagement.js
 * │   ├── layout/Header.js
 * │   └── ui/Button.js, Input.js
 * ├── lib/utils.js, constants.js
 * └── styles/globals.css
 */

"use client";

import { motion } from "framer-motion";
import {
  LockClosedIcon,
  DocumentCheckIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  UserIcon,
  BanknotesIcon,
  ChartBarIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const OnboardingPrompt = () => {
  const onboardingSteps = [
    {
      step: 1,
      title: "Identity Verification",
      description:
        "Upload your passport, PAN card, and Aadhaar for identity verification",
      icon: <UserIcon className="w-6 h-6" />,
      status: "pending",
      timeEstimate: "5 min",
    },
    {
      step: 2,
      title: "KYC Documentation",
      description:
        "Provide address proof, income documents, and NRI status verification",
      icon: <DocumentCheckIcon className="w-6 h-6" />,
      status: "pending",
      timeEstimate: "10 min",
    },
    {
      step: 3,
      title: "Bank Account Linking",
      description: "Connect your NRE/NRO accounts for seamless money transfers",
      icon: <CreditCardIcon className="w-6 h-6" />,
      status: "pending",
      timeEstimate: "3 min",
    },
    {
      step: 4,
      title: "Risk Assessment",
      description:
        "Complete risk profiling to get personalized investment recommendations",
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      status: "pending",
      timeEstimate: "7 min",
    },
  ];

  const lockedFeatures = [
    {
      title: "Portfolio Management",
      description:
        "Track and manage your investments across multiple asset classes",
      icon: <ChartBarIcon className="w-8 h-8" />,
      highlight: true,
    },
    {
      title: "Family Wealth Tracking",
      description:
        "Monitor family member portfolios and set investment permissions",
      icon: <UserGroupIcon className="w-8 h-8" />,
      highlight: false,
    },
    {
      title: "Investment Opportunities",
      description:
        "Access curated investment options tailored for NRI investors",
      icon: <BanknotesIcon className="w-8 h-8" />,
      highlight: false,
    },
    {
      title: "AI-Powered Insights",
      description: "Get personalized recommendations based on market analysis",
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      highlight: true,
    },
  ];

  const benefits = [
    "Zero platform fees for first year",
    "24/7 dedicated NRI support",
    "Compliant with RBI guidelines",
    "DTAA tax optimization",
    "Multi-currency portfolio tracking",
  ];

  return (
    <div className="space-y-8">
      {/* Main Onboarding CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-8 rounded-3xl text-black text-center relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-black/10 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-12 -translate-x-12" />

        <div className="relative z-10">
          <LockClosedIcon className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Complete Your Onboarding
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Unlock access to India&apos;s most advanced NRI investment platform.
            Complete KYC verification to start building wealth with AI-powered
            insights and family portfolio management.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.button
              className="bg-black text-yellow-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-900 transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start KYC Process</span>
              <ArrowRightIcon className="w-5 h-5" />
            </motion.button>

            <button className="text-black font-semibold hover:underline">
              Book Consultation Call
            </button>
          </div>
        </div>
      </motion.div>

      {/* Onboarding Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-900 rounded-3xl p-6 border border-gray-800"
      >
        <h3 className="text-2xl font-bold text-white mb-6">
          Complete in 4 Simple Steps
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {onboardingSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-gray-800 p-4 rounded-2xl border border-gray-700 hover:border-yellow-500/30 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center text-yellow-500">
                  {step.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-white font-semibold">
                      Step {step.step}: {step.title}
                    </h4>
                    <div className="flex items-center space-x-1 text-xs text-gray-400">
                      <ClockIcon className="w-3 h-3" />
                      <span>{step.timeEstimate}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
          <div className="flex items-center space-x-2 text-yellow-500 mb-2">
            <ClockIcon className="w-4 h-4" />
            <span className="font-semibold text-sm">
              Total Time: ~25 minutes
            </span>
          </div>
          <p className="text-gray-300 text-sm">
            Complete all steps in one session or save your progress and continue
            later.
          </p>
        </div>
      </motion.div>

      {/* Locked Features Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-900 rounded-3xl p-6 border border-gray-800"
      >
        <h3 className="text-2xl font-bold text-white mb-6">
          What You&apos;ll Unlock
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lockedFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`relative p-6 rounded-2xl border transition-all duration-300 ${
                feature.highlight
                  ? "bg-yellow-500/10 border-yellow-500/30"
                  : "bg-gray-800 border-gray-700"
              }`}
            >
              {/* Lock overlay */}
              <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <LockClosedIcon className="w-8 h-8 text-gray-400" />
              </div>

              <div className="opacity-30">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    feature.highlight
                      ? "bg-yellow-500 text-black"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {feature.icon}
                </div>
                <h4 className="text-white font-bold mb-2">{feature.title}</h4>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gray-900 rounded-3xl p-6 border border-gray-800"
      >
        <h3 className="text-2xl font-bold text-white mb-6">
          Exclusive NRI Benefits
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-center space-x-3 p-3 bg-gray-800 rounded-xl"
            >
              <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-white text-sm font-medium">{benefit}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gray-900 rounded-3xl p-6 border border-gray-800 text-center"
      >
        <h3 className="text-xl font-bold text-white mb-4">
          Need Help Getting Started?
        </h3>
        <p className="text-gray-400 mb-6">
          Our NRI specialists are available 24/7 to guide you through the
          onboarding process.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button className="bg-gray-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors">
            WhatsApp Support
          </button>
          <button className="bg-gray-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors">
            Schedule Call
          </button>
          <button className="text-yellow-500 font-semibold hover:text-yellow-400">
            View FAQ
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingPrompt;
