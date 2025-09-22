/*
 * File: src/app/components/kyc/KycProgress.js
 * Folder Structure:
 * src/app/
 * ├── components/
 * │   ├── kyc/
 * │   │   ├── KycProgress.js (this file)
 * │   │   ├── DocumentUpload.js
 * │   │   └── ScheduleCall.js
 * │   ├── layout/Header.js
 * │   └── ui/Button.js, Input.js
 * ├── kyc/page.js
 * ├── lib/utils.js, constants.js
 * └── styles/globals.css
 */

'use client';

import { motion } from 'framer-motion';
import { 
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  ShieldCheckIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';

const KycProgress = ({ steps, currentStep, uploadedCount, totalDocuments }) => {
  const getStepIcon = (step) => {
    switch (step.step) {
      case 1:
        return <DocumentTextIcon className="w-5 h-5" />;
      case 2:
        return <CloudArrowUpIcon className="w-5 h-5" />;
      case 3:
        return <CalendarDaysIcon className="w-5 h-5" />;
      case 4:
        return <ShieldCheckIcon className="w-5 h-5" />;
      default:
        return <ClockIcon className="w-5 h-5" />;
    }
  };

  const getStepStatus = (step) => {
    if (step.step < currentStep) return 'completed';
    if (step.step === currentStep) return 'active';
    return 'pending';
  };

  const getProgressPercentage = () => {
    const baseProgress = ((currentStep - 1) / (steps.length - 1)) * 100;
    
    // Add bonus progress for document uploads in step 2
    if (currentStep === 2 && totalDocuments > 0) {
      const documentProgress = (uploadedCount / totalDocuments) * (100 / steps.length);
      return Math.min(baseProgress + documentProgress, 100);
    }
    
    return Math.min(baseProgress, 100);
  };

  const progressPercentage = getProgressPercentage();

  return (
    <div className="space-y-8">
      {/* Overall Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 rounded-2xl p-6 border border-gray-800"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">KYC Progress</h2>
          <div className="text-sm text-gray-400">
            Step {currentStep} of {steps.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
            <motion.div
              className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-2 rounded-full relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">
              {Math.round(progressPercentage)}% Complete
            </span>
            {currentStep === 2 && (
              <span className="text-yellow-500 font-medium">
                Documents: {uploadedCount}/{totalDocuments}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Step Indicators */}
      <div className="relative">
        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-800 z-0">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </div>

            {steps.map((step, index) => {
              const status = getStepStatus(step);
              
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center relative z-10"
                >
                  {/* Step Circle */}
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      status === 'completed'
                        ? 'bg-green-500 border-green-500 text-white'
                        : status === 'active'
                        ? 'bg-yellow-500 border-yellow-500 text-black'
                        : 'bg-gray-900 border-gray-700 text-gray-500'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {status === 'completed' ? (
                      <CheckCircleIconSolid className="w-6 h-6" />
                    ) : (
                      getStepIcon(step)
                    )}
                  </motion.div>

                  {/* Step Info */}
                  <div className="mt-4 text-center max-w-32">
                    <h3 className={`font-semibold text-sm mb-1 ${
                      status === 'active' ? 'text-yellow-500' : 
                      status === 'completed' ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-tight">
                      {step.description}
                    </p>
                  </div>

                  {/* Active Step Indicator */}
                  {status === 'active' && (
                    <motion.div
                      className="absolute -bottom-2 w-2 h-2 bg-yellow-500 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.7, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {steps.map((step, index) => {
            const status = getStepStatus(step);
            
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center space-x-4 p-4 rounded-xl border transition-all duration-300 ${
                  status === 'active'
                    ? 'bg-yellow-500/10 border-yellow-500/30'
                    : status === 'completed'
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-gray-900 border-gray-800'
                }`}
              >
                {/* Step Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 flex-shrink-0 ${
                    status === 'completed'
                      ? 'bg-green-500 border-green-500 text-white'
                      : status === 'active'
                      ? 'bg-yellow-500 border-yellow-500 text-black'
                      : 'bg-gray-800 border-gray-700 text-gray-500'
                  }`}
                >
                  {status === 'completed' ? (
                    <CheckCircleIconSolid className="w-5 h-5" />
                  ) : (
                    getStepIcon(step)
                  )}
                </div>

                {/* Step Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className={`font-semibold text-sm ${
                      status === 'active' ? 'text-yellow-500' : 
                      status === 'completed' ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      Step {step.step}: {step.title}
                    </h3>
                    
                    {status === 'active' && (
                      <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-medium">
                        Current
                      </span>
                    )}
                    {status === 'completed' && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Done
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Current Step Details */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 rounded-2xl p-6 border border-gray-800"
      >
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center text-black flex-shrink-0">
            {getStepIcon(steps[currentStep - 1])}
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">
              {steps[currentStep - 1]?.title}
            </h3>
            <p className="text-gray-400 mb-4">
              {steps[currentStep - 1]?.description}
            </p>

            {/* Step-specific additional info */}
            {currentStep === 1 && (
              <div className="bg-gray-800 p-4 rounded-xl">
                <p className="text-gray-300 text-sm">
                  Review all required documents and their specifications before proceeding to upload.
                </p>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-gray-800 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm">Upload Progress</span>
                  <span className="text-yellow-500 font-medium text-sm">
                    {uploadedCount}/{totalDocuments} documents
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-yellow-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(uploadedCount / totalDocuments) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="bg-gray-800 p-4 rounded-xl">
                <p className="text-gray-300 text-sm">
                  Schedule a 30-minute consultation call with our wealth management expert.
                </p>
              </div>
            )}

            {currentStep === 4 && (
              <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
                <p className="text-green-400 text-sm">
                  Your KYC submission is complete and under review. You'll receive an update within 1-2 business days.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default KycProgress;