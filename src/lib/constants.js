// Application Constants
export const APP_CONFIG = {
  name: 'WealthBridge',
  tagline: 'Investment Platform for NRI Families',
  version: '1.0.0',
  support: {
    email: 'support@wealthbridge.com',
    phone: '+91-22-4567-8900'
  }
};

// API Endpoints and Services
export const API_ENDPOINTS = {
  // Market Data APIs (for future implementation)
  NSE_API: 'https://www.nseindia.com/api',
  BSE_API: 'https://api.bseindia.com',
  
  // KYC and Compliance APIs
  AADHAAR_API: 'https://api.uidai.gov.in', // Placeholder
  PAN_API: 'https://api.incometax.gov.in', // Placeholder
  
  // Banking APIs
  UPI_API: 'https://api.npci.org.in', // Placeholder
  
  // External Services
  NEWS_API: process.env.NEXT_PUBLIC_NEWS_API_KEY,
  EXCHANGE_RATES: 'https://api.exchangerate-api.com/v4/latest/USD'
};

// Investment Categories
export const INVESTMENT_CATEGORIES = {
  EQUITY: {
    id: 'equity',
    name: 'Equity',
    description: 'Stocks, ETFs, and equity mutual funds',
    icon: 'TrendingUp',
    color: 'text-green-500'
  },
  MUTUAL_FUNDS: {
    id: 'mutual_funds',
    name: 'Mutual Funds',
    description: 'Diversified investment schemes',
    icon: 'ChartBarIcon',
    color: 'text-blue-500'
  },
  BONDS: {
    id: 'bonds',
    name: 'Bonds & FDs',
    description: 'Fixed income securities',
    icon: 'BanknotesIcon',
    color: 'text-yellow-500'
  },
  REAL_ESTATE: {
    id: 'real_estate',
    name: 'Real Estate',
    description: 'Property investments and REITs',
    icon: 'BuildingOfficeIcon',
    color: 'text-purple-500'
  },
  GOLD: {
    id: 'gold',
    name: 'Gold & Commodities',
    description: 'Precious metals and commodities',
    icon: 'SparklesIcon',
    color: 'text-orange-500'
  },
  INTERNATIONAL: {
    id: 'international',
    name: 'International',
    description: 'Global markets and forex',
    icon: 'GlobeAltIcon',
    color: 'text-indigo-500'
  }
};

// KYC Document Types
export const KYC_DOCUMENTS = {
  IDENTITY_PROOF: {
    AADHAAR: 'aadhaar',
    PASSPORT: 'passport',
    VOTER_ID: 'voter_id',
    DRIVING_LICENSE: 'driving_license'
  },
  ADDRESS_PROOF: {
    AADHAAR: 'aadhaar',
    PASSPORT: 'passport',
    UTILITY_BILL: 'utility_bill',
    BANK_STATEMENT: 'bank_statement',
    RENT_AGREEMENT: 'rent_agreement'
  },
  INCOME_PROOF: {
    SALARY_SLIP: 'salary_slip',
    ITR: 'itr',
    BANK_STATEMENT: 'bank_statement',
    CA_CERTIFICATE: 'ca_certificate'
  },
  NRI_SPECIFIC: {
    OVERSEAS_ADDRESS: 'overseas_address',
    VISA_COPY: 'visa_copy',
    EMPLOYMENT_LETTER: 'employment_letter',
    TAX_RESIDENCY_CERTIFICATE: 'tax_residency_certificate'
  }
};

// Risk Profiles
export const RISK_PROFILES = {
  CONSERVATIVE: {
    id: 'conservative',
    name: 'Conservative',
    description: 'Low risk, stable returns',
    allocation: { equity: 20, debt: 70, gold: 10 },
    color: 'text-green-500'
  },
  MODERATE: {
    id: 'moderate',
    name: 'Moderate',
    description: 'Balanced risk and return',
    allocation: { equity: 50, debt: 40, gold: 10 },
    color: 'text-yellow-500'
  },
  AGGRESSIVE: {
    id: 'aggressive',
    name: 'Aggressive',
    description: 'High risk, high potential returns',
    allocation: { equity: 80, debt: 15, gold: 5 },
    color: 'text-red-500'
  }
};

// Market Exchanges
export const EXCHANGES = {
  NSE: {
    id: 'NSE',
    name: 'National Stock Exchange',
    code: 'NSE',
    country: 'India',
    timezone: 'Asia/Kolkata',
    tradingHours: {
      preOpen: '09:00',
      open: '09:15',
      close: '15:30',
      postClose: '16:00'
    }
  },
  BSE: {
    id: 'BSE',
    name: 'Bombay Stock Exchange',
    code: 'BSE',
    country: 'India',
    timezone: 'Asia/Kolkata',
    tradingHours: {
      preOpen: '09:00',
      open: '09:15',
      close: '15:30',
      postClose: '16:00'
    }
  }
};

// Currency Codes
export const CURRENCIES = {
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound' },
  AED: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' }
};

// Family Relationship Types
export const FAMILY_RELATIONSHIPS = {
  SPOUSE: 'spouse',
  CHILD: 'child',
  PARENT: 'parent',
  SIBLING: 'sibling',
  GUARDIAN: 'guardian',
  BENEFICIARY: 'beneficiary'
};

// User Roles and Permissions
export const USER_ROLES = {
  ADMIN: {
    id: 'admin',
    name: 'Administrator',
    permissions: ['all']
  },
  FAMILY_HEAD: {
    id: 'family_head',
    name: 'Family Head',
    permissions: ['view_all_family', 'manage_family', 'invest', 'withdraw']
  },
  FAMILY_MEMBER: {
    id: 'family_member',
    name: 'Family Member',
    permissions: ['view_own', 'view_shared', 'suggest']
  },
  ADVISOR: {
    id: 'advisor',
    name: 'Investment Advisor',
    permissions: ['view_client', 'recommend', 'report']
  }
};

// Investment Limits (in INR)
export const INVESTMENT_LIMITS = {
  MIN_INVESTMENT: 1000,
  MAX_SINGLE_INVESTMENT: 10000000, // 1 Crore
  DAILY_TRANSACTION_LIMIT: 25000000, // 2.5 Crore
  KYC_LIMITS: {
    BASIC: 50000,
    STANDARD: 2000000, // 20 Lakh
    ENHANCED: 10000000 // 1 Crore
  }
};

// Animation Configurations
export const ANIMATIONS = {
  HERO_TEXT_CYCLE: {
    words: ['INVEST', 'BUILD', 'SCALE', 'GROW', 'PROSPER'],
    duration: 3000, // 3 seconds per word
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20
    }
  },
  PAGE_TRANSITIONS: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  },
  CARD_HOVER: {
    whileHover: { scale: 1.02, y: -5 },
    transition: { type: 'spring', stiffness: 300 }
  },
  BUTTON_TAP: {
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 10 }
  }
};

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Storage Keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme_preference',
  LANGUAGE: 'language_preference',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  LAST_LOGIN: 'last_login'
};

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecialChar: true
  },
  MOBILE: {
    pattern: /^[6-9]\d{9}$/,
    length: 10
  },
  PAN: {
    pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    length: 10
  },
  AADHAAR: {
    pattern: /^\d{12}$/,
    length: 12
  }
};

// Feature Flags
export const FEATURE_FLAGS = {
  FAMILY_DASHBOARD: true,
  AI_ASSISTANT: true,
  INTERNATIONAL_INVESTMENTS: true,
  CRYPTO_INVESTMENTS: false, // Disabled for now
  AUTOMATED_PORTFOLIO: true,
  SOCIAL_TRADING: false // Future feature
};

// News Categories
export const NEWS_CATEGORIES = {
  MARKET_NEWS: 'market_news',
  ECONOMY: 'economy',
  POLICY_UPDATES: 'policy_updates',
  COMPANY_EARNINGS: 'company_earnings',
  GLOBAL_MARKETS: 'global_markets',
  REGULATORY: 'regulatory',
  TECHNOLOGY: 'technology',
  COMMODITIES: 'commodities'
};

// Dashboard Widget Types
export const WIDGET_TYPES = {
  PORTFOLIO_OVERVIEW: 'portfolio_overview',
  MARKET_SUMMARY: 'market_summary',
  NEWS_FEED: 'news_feed',
  PERFORMANCE_CHART: 'performance_chart',
  WATCHLIST: 'watchlist',
  FAMILY_SUMMARY: 'family_summary',
  GOALS_TRACKER: 'goals_tracker',
  AI_INSIGHTS: 'ai_insights'
};

// Export default config for easy access
export default {
  APP_CONFIG,
  INVESTMENT_CATEGORIES,
  RISK_PROFILES,
  CURRENCIES,
  ANIMATIONS,
  FEATURE_FLAGS
};