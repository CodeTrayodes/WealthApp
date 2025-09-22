/*
 * File: src/app/components/LandingPage.js
 * Folder Structure:
 * src/app/
 * ├── components/
 * │   ├── LandingPage.js (this file)
 * │   ├── layout/Header.js, Layout.js
 * │   └── ui/Button.js, Input.js
 * ├── lib/utils.js, constants.js
 * └── styles/globals.css
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRightIcon, 
  SparklesIcon,
  ChartBarIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import { ANIMATIONS } from '../lib/constants';
import Header from './layout/Header';

const LandingPage = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const heroWords = ANIMATIONS.HERO_TEXT_CYCLE.words;

  // Cycle through hero words
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % heroWords.length);
    }, ANIMATIONS.HERO_TEXT_CYCLE.duration);

    return () => clearInterval(interval);
  }, [heroWords.length]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Enhanced Header Component */}
      <Header />

      {/* Hero Section - Black Background */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center bg-lines overflow-hidden">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0">
          {/* Multiple layered backgrounds for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-500/10"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-20 text-center max-w-7xl mx-auto px-4 w-full">
          {/* Animated Hero Text - Much Larger */}
          <div className="h-40 md:h-64 lg:h-80 xl:h-96 flex items-center justify-center mb-8">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentWordIndex}
                className="text-hero text-yellow-500 font-black tracking-tighter select-none"
                style={{
                  textShadow: "0 0 40px rgba(255, 229, 0, 0.4), 0 0 80px rgba(255, 229, 0, 0.2)",
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontWeight: 900,
                }}
                initial={{ 
                  opacity: 0, 
                  y: 100, 
                  scale: 0.8,
                  rotateX: -90 
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  rotateX: 0
                }}
                exit={{ 
                  opacity: 0, 
                  y: -100, 
                  scale: 0.8,
                  rotateX: 90
                }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 15,
                  duration: 0.8
                }}
              >
                {heroWords[currentWordIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Scroll Indicator - More Elegant */}
          <motion.div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <div className="flex flex-col items-center space-y-3">
              <span className="text-yellow-500 text-xs font-medium tracking-[0.2em] uppercase">PLEASE SCROLL</span>
              <motion.div
                className="w-px h-12 bg-gradient-to-b from-yellow-500 to-transparent"
                animate={{ 
                  scaleY: [1, 0.3, 1],
                  opacity: [1, 0.4, 1]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Enhanced Floating Elements */}
        <motion.div
          className="absolute top-32 right-16 w-3 h-3 bg-yellow-500 rounded-full opacity-60"
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div
          className="absolute bottom-48 left-16 w-2 h-2 bg-yellow-500 rounded-full opacity-40"
          animate={{ 
            y: [0, 40, 0],
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 0.8, 1]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1.5 
          }}
        />
        
        {/* Additional ambient elements */}
        <motion.div
          className="absolute top-1/2 right-8 w-1 h-1 bg-yellow-500 rounded-full opacity-30"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        />
      </section>

      {/* Introduction Section - White Background */}
      <section className="relative">
        <div className="bg-white text-black rounded-t-[3rem] md:rounded-t-[4rem] lg:rounded-t-[5rem] relative z-10 -mt-16 md:-mt-20 lg:-mt-24">
          <div className="container-main section-spacing">
            <motion.div
              className="max-w-6xl mx-auto text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-yellow-500 text-sm font-medium tracking-widest mb-6 uppercase">Welcome to the Future of NRI Wealth Management</h2>
              
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
                India's Most <span className="text-yellow-500">Intelligent</span> Investment Platform for HNI NRIs
              </h3>

              <p className="text-gray-600 text-lg md:text-xl mb-12 leading-relaxed max-w-4xl mx-auto">
                We're building the future of wealth management with AI-powered insights, 100+ years of Mumbai family office expertise, 
                and cutting-edge technology that makes investing in India effortless for high-net-worth NRI families worldwide.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <SparklesIcon className="w-8 h-8 text-black" />
                  </div>
                  <h4 className="text-xl font-bold text-black mb-2">AI-Powered Intelligence</h4>
                  <p className="text-gray-600">Advanced algorithms and machine learning drive personalized investment strategies</p>
                </motion.div>

                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BanknotesIcon className="w-8 h-8 text-black" />
                  </div>
                  <h4 className="text-xl font-bold text-black mb-2">Century of Expertise</h4>
                  <p className="text-gray-600">100+ years of Mumbai family office experience in Indian investment markets</p>
                </motion.div>

                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <UserGroupIcon className="w-8 h-8 text-black" />
                  </div>
                  <h4 className="text-xl font-bold text-black mb-2">Family-First Approach</h4>
                  <p className="text-gray-600">Unified dashboards and tracking for entire family wealth management</p>
                </motion.div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <motion.button
                  className="bg-black text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Early Access
                </motion.button>
                
                <motion.button
                  className="border-2 border-black text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-black hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Black Background */}
      <section className="relative">
        <div className="bg-black text-white rounded-t-[3rem] md:rounded-t-[4rem] lg:rounded-t-[5rem] relative z-10 -mt-16 md:-mt-20 lg:-mt-24">
          <div className="container-main section-spacing">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-yellow-500 text-sm font-medium tracking-widest mb-6 uppercase">Why Choose WealthBridge</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                The Perfect Blend of <span className="text-yellow-500">Tradition & Innovation</span>
              </h3>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                We combine century-old investment wisdom with cutting-edge AI technology to deliver superior returns and seamless user experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Features */}
              <div className="space-y-8">
                <motion.div
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ChartBarIcon className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Superior Returns</h4>
                    <p className="text-gray-400">Our AI-driven strategies have consistently outperformed market indices, delivering exceptional returns for our clients.</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ShieldCheckIcon className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Complete Transparency</h4>
                    <p className="text-gray-400">Real-time portfolio tracking, detailed reports, and full visibility into every investment decision and fee structure.</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <UserGroupIcon className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Family Wealth Tracking</h4>
                    <p className="text-gray-400">Unified dashboards for entire families, enabling collaborative wealth management and transparent sharing across generations.</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <GlobeAltIcon className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Global-Local Expertise</h4>
                    <p className="text-gray-400">Deep understanding of both international markets and Indian investment landscape, optimized for NRI needs.</p>
                  </div>
                </motion.div>
              </div>

              {/* Right side - Stats */}
              <motion.div
                className="bg-gray-900 rounded-3xl p-8 border border-gray-800"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h4 className="text-2xl font-bold text-white mb-8 text-center">Platform Highlights</h4>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-500 mb-2">100+</div>
                    <div className="text-gray-400 text-sm">Years of Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-500 mb-2">₹50Cr+</div>
                    <div className="text-gray-400 text-sm">Assets Under Management</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-500 mb-2">500+</div>
                    <div className="text-gray-400 text-sm">Happy Families</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-500 mb-2">15%</div>
                    <div className="text-gray-400 text-sm">Average Annual Returns</div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
                  <p className="text-yellow-500 text-sm text-center font-medium">
                    "The most intuitive and powerful wealth management platform I've ever used. Finally, a solution built specifically for NRI families."
                  </p>
                  <p className="text-gray-400 text-xs text-center mt-2">- Priya Sharma, Silicon Valley Executive</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Early Access CTA Section - White Background */}
      <section className="relative">
        <div className="bg-white text-black rounded-t-[3rem] md:rounded-t-[4rem] lg:rounded-t-[5rem] relative z-10 -mt-16 md:-mt-20 lg:-mt-24">
          <div className="container-main section-spacing">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-yellow-500 text-sm font-medium tracking-widest mb-6 uppercase">Join the Future of Wealth Management</h2>
              
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
                Get <span className="text-yellow-500">Early Access</span> to WealthBridge
              </h3>

              <p className="text-gray-600 text-lg md:text-xl mb-12 leading-relaxed">
                Be among the first to experience our revolutionary AI-powered investment platform. Limited spots available for our exclusive beta program.
              </p>

              <div className="bg-gray-50 rounded-3xl p-8 mb-8 max-w-2xl mx-auto">
                <h4 className="text-xl font-bold text-black mb-4">Early Access Benefits</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-700">Zero platform fees for first year</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-700">Priority customer support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-700">Exclusive investment opportunities</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-700">Direct access to our experts</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <motion.button
                  className="bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Request Early Access
                </motion.button>
                
                <motion.button
                  className="border-2 border-gray-400 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-black hover:text-black transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule Demo
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer - Black Background */}
      <footer className="bg-black text-white rounded-t-[3rem] md:rounded-t-[4rem] lg:rounded-t-[5rem] relative z-10 -mt-16 md:-mt-20 lg:-mt-24 border-t border-gray-900 py-12">
        <div className="container-main">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-none flex items-center justify-center">
                <span className="text-black font-bold text-lg">W</span>
              </div>
              <span className="text-yellow-500 font-bold text-xl tracking-tight">WEALTHBRIDGE</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="/privacy" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300 text-sm">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300 text-sm">
                Terms of Service
              </a>
              <a href="/contact" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300 text-sm">
                Contact
              </a>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-900 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 WealthBridge. Built with precision for HNI NRI families. Mumbai • New York • London • Singapore
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;