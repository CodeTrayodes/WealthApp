import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and tailwind-merge
 * @param {...any} inputs - Class names to combine
 * @returns {string} Combined class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency for Indian market
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: INR)
 * @returns {string} Formatted currency
 */
export function formatCurrency(amount, currency = 'INR') {
  if (typeof amount !== 'number') return '₹0';
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format large numbers with Indian numbering system
 * @param {number} num - Number to format
 * @returns {string} Formatted number (e.g., 1.5L, 2.3Cr)
 */
export function formatIndianNumber(num) {
  if (typeof num !== 'number') return '0';
  
  if (num >= 10000000) { // 1 Crore
    return `${(num / 10000000).toFixed(1)}Cr`;
  } else if (num >= 100000) { // 1 Lakh
    return `${(num / 100000).toFixed(1)}L`;
  } else if (num >= 1000) { // 1 Thousand
    return `${(num / 1000).toFixed(1)}K`;
  }
  
  return num.toString();
}

/**
 * Format percentage
 * @param {number} value - Value to format as percentage
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage
 */
export function formatPercentage(value, decimals = 2) {
  if (typeof value !== 'number') return '0%';
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format date for display
 * @param {Date|string} date - Date to format
 * @param {string} format - Format type ('short', 'long', 'relative')
 * @returns {string} Formatted date
 */
export function formatDate(date, format = 'short') {
  const d = new Date(date);
  
  if (isNaN(d.getTime())) return 'Invalid Date';
  
  switch (format) {
    case 'short':
      return d.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    case 'long':
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    case 'relative':
      return getRelativeTime(d);
    default:
      return d.toLocaleDateString('en-IN');
  }
}

/**
 * Get relative time (e.g., "2 hours ago")
 * @param {Date} date - Date to compare
 * @returns {string} Relative time string
 */
function getRelativeTime(date) {
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
}

/**
 * Validate Indian PAN number
 * @param {string} pan - PAN number to validate
 * @returns {boolean} Is valid PAN
 */
export function isValidPAN(pan) {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
}

/**
 * Validate Indian Aadhaar number
 * @param {string} aadhaar - Aadhaar number to validate
 * @returns {boolean} Is valid Aadhaar
 */
export function isValidAadhaar(aadhaar) {
  const cleanAadhaar = aadhaar.replace(/\s/g, '');
  const aadhaarRegex = /^[0-9]{12}$/;
  return aadhaarRegex.test(cleanAadhaar);
}

/**
 * Validate Indian mobile number
 * @param {string} mobile - Mobile number to validate
 * @returns {boolean} Is valid mobile number
 */
export function isValidIndianMobile(mobile) {
  const cleanMobile = mobile.replace(/[\s\-\(\)]/g, '');
  const mobileRegex = /^(\+91|91|0)?[6-9]\d{9}$/;
  return mobileRegex.test(cleanMobile);
}

/**
 * Format Indian mobile number
 * @param {string} mobile - Mobile number to format
 * @returns {string} Formatted mobile number
 */
export function formatIndianMobile(mobile) {
  const cleanMobile = mobile.replace(/[\s\-\(\)]/g, '');
  if (cleanMobile.length === 10) {
    return `+91 ${cleanMobile.slice(0, 5)} ${cleanMobile.slice(5)}`;
  }
  return mobile;
}

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Calculate portfolio performance
 * @param {Array} holdings - Array of holdings
 * @returns {Object} Performance metrics
 */
export function calculatePortfolioPerformance(holdings) {
  if (!Array.isArray(holdings) || holdings.length === 0) {
    return {
      totalValue: 0,
      totalCost: 0,
      totalGainLoss: 0,
      totalGainLossPercentage: 0,
      dayChange: 0,
      dayChangePercentage: 0
    };
  }
  
  const totalValue = holdings.reduce((sum, holding) => sum + (holding.currentValue || 0), 0);
  const totalCost = holdings.reduce((sum, holding) => sum + (holding.investedAmount || 0), 0);
  const totalGainLoss = totalValue - totalCost;
  const totalGainLossPercentage = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0;
  
  const dayChange = holdings.reduce((sum, holding) => sum + (holding.dayChange || 0), 0);
  const dayChangePercentage = totalValue > 0 ? (dayChange / (totalValue - dayChange)) * 100 : 0;
  
  return {
    totalValue,
    totalCost,
    totalGainLoss,
    totalGainLossPercentage,
    dayChange,
    dayChangePercentage
  };
}

/**
 * Get color based on value (green for positive, red for negative)
 * @param {number} value - Value to check
 * @returns {string} Tailwind color class
 */
export function getValueColor(value) {
  if (value > 0) return 'text-green-500';
  if (value < 0) return 'text-red-500';
  return 'text-gray-400';
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy text:', error);
    return false;
  }
}

/**
 * Sleep function for delays
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} Promise that resolves after delay
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Check if user is on mobile device
 * @returns {boolean} Is mobile device
 */
export function isMobile() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768;
}

/**
 * Scroll to element smoothly
 * @param {string} elementId - ID of element to scroll to
 */
export function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}