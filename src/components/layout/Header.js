/*
 * File: src/app/components/layout/Header.js
 * Folder Structure:
 * src/app/
 * ├── components/
 * │   ├── layout/
 * │   │   ├── Header.js (this file)
 * │   │   └── Layout.js
 * │   ├── LandingPage.js
 * │   └── ui/Button.js, Input.js
 * ├── lib/utils.js, constants.js
 * └── styles/globals.css
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ChevronDownIcon, 
  Bars3Icon, 
  XMarkIcon,
  ArrowRightIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  UserGroupIcon,
  DocumentTextIcon,
  BuildingLibraryIcon
} from '@heroicons/react/24/outline';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsMenuOpen(false);
      setActiveDropdown(null);
    };
    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  const productItems = [
    {
      icon: <ChartBarIcon className="w-5 h-5" />,
      title: "Investments",
      description: "1000+ investment options for your future wealth",
      badge: null,
      href: "/investments"
    },
    {
      icon: <DocumentTextIcon className="w-5 h-5" />,
      title: "Taxation",
      description: "Get maximum refund out of your taxes",
      badge: null,
      href: "/taxation"
    },
    {
      icon: <CurrencyDollarIcon className="w-5 h-5" />,
      title: "Remittance",
      description: "Send money across the globe with minimum fees",
      badge: "Coming Soon",
      href: "/remittance"
    },
    {
      icon: <UserGroupIcon className="w-5 h-5" />,
      title: "Expert Consultation",
      description: "Connect with expert for tax planning & advice",
      badge: null,
      href: "/consultation"
    },
    {
      icon: <BanknotesIcon className="w-5 h-5" />,
      title: "Documentation",
      description: "Get new or update documentations like OCI, PAN & more",
      badge: null,
      href: "/documentation"
    },
    {
      icon: <BuildingLibraryIcon className="w-5 h-5" />,
      title: "NRE/NRO Banking",
      description: "Open bank account in leading Indian banks",
      badge: null,
      href: "/banking"
    }
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md border-b border-gray-800/50' 
          : 'bg-black/80 backdrop-blur-sm border-b border-gray-900/50'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container-main">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 cursor-pointer group">
            <motion.div 
              className="w-10 h-10 bg-yellow-500 rounded-none flex items-center justify-center group-hover:bg-yellow-400 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-black font-bold text-xl">W</span>
            </motion.div>
            <span className="text-yellow-500 font-bold text-2xl tracking-tight group-hover:text-yellow-400 transition-colors duration-300">
              WEALTHBRIDGE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Products Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center space-x-1 text-gray-300 hover:text-yellow-500 transition-colors duration-300 py-2"
                onMouseEnter={() => setActiveDropdown('products')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <span className="font-medium">Products</span>
                <ChevronDownIcon className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
              </button>

              {/* Products Dropdown Menu */}
              <AnimatePresence>
                {activeDropdown === 'products' && (
                  <motion.div
                    className="absolute top-full left-0 w-[640px] bg-gray-900 border border-gray-800 rounded-xl shadow-2xl mt-2"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setActiveDropdown('products')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4">
                        {productItems.map((item, index) => (
                          <motion.div
                            key={item.title}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              href={item.href}
                              className="flex items-start space-x-3 p-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer group border border-transparent hover:border-gray-700"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="text-yellow-500 mt-1 flex-shrink-0">{item.icon}</div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="text-white font-medium text-sm group-hover:text-yellow-500 transition-colors truncate">
                                    {item.title}
                                  </h4>
                                  {item.badge && (
                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              href="/marketplace"
              className="text-gray-300 hover:text-yellow-500 transition-colors duration-300 font-medium"
            >
              Marketplace
            </Link>
            <Link 
              href="/about"
              className="text-gray-300 hover:text-yellow-500 transition-colors duration-300 font-medium"
            >
              About Us
            </Link>
            <Link 
              href="/news"
              className="text-gray-300 hover:text-yellow-500 transition-colors duration-300 font-medium"
            >
              News
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/get-started">
              <motion.button
                className="bg-yellow-500 text-black px-6 py-2.5 rounded-full font-semibold hover:bg-yellow-400 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </Link>
            <Link href="/login">
              <motion.button
                className="border border-gray-600 text-white px-6 py-2.5 rounded-full font-semibold hover:border-yellow-500 hover:text-yellow-500 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="lg:hidden p-2 focus-ring"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <XMarkIcon className="w-6 h-6 text-yellow-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Bars3Icon className="w-6 h-6 text-yellow-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-800 rounded-b-2xl"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="container-main py-6">
                {/* Mobile Navigation Items */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link 
                      href="/"
                      className="flex items-center justify-between w-full text-yellow-500 text-lg font-medium py-3 border-b border-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>HOME</span>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link 
                      href="/about"
                      className="flex items-center justify-between w-full text-yellow-500 text-lg font-medium py-3 border-b border-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>ABOUT US</span>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link 
                      href="/marketplace"
                      className="flex items-center justify-between w-full text-yellow-500 text-lg font-medium py-3 border-b border-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>MARKETPLACE</span>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Link 
                      href="/news"
                      className="flex items-center justify-between w-full text-yellow-500 text-lg font-medium py-3 border-b border-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>NEWS</span>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    </Link>
                  </motion.div>
                </div>

                {/* Mobile CTA Buttons */}
                <motion.div 
                  className="mt-8 space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link href="/get-started" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full bg-yellow-500 text-black py-4 rounded-full font-semibold text-lg hover:bg-yellow-400 transition-colors duration-300">
                      Get Started
                    </button>
                  </Link>
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full border border-gray-600 text-white py-4 rounded-full font-semibold text-lg hover:border-yellow-500 hover:text-yellow-500 transition-colors duration-300">
                      Login
                    </button>
                  </Link>
                </motion.div>

                {/* Mobile Products Preview */}
                <motion.div
                  className="mt-8 pt-6 border-t border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="text-white font-semibold mb-4">Our Services</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {productItems.slice(0, 4).map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          className="bg-gray-900 p-3 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-colors duration-300 block"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="text-yellow-500 mb-2">{item.icon}</div>
                          <h4 className="text-white text-sm font-medium">{item.title}</h4>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Header;
