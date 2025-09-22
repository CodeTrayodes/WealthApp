'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ShareIcon,
  BookmarkIcon,
  ClockIcon,
  TrendingDownIcon,
  MinusIcon
} from '@heroicons/react/24/outline';
import { TrendingUp } from 'lucide-react';
import Header from '@/components/layout/Header';
import { mockNewsData, searchNews } from '@/lib/newsData';
import { formatDate } from '@/lib/utils';

const NewsPage = () => {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredNews, setFilteredNews] = useState(mockNewsData);
  const [showFilters, setShowFilters] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Categories for filtering
  const categories = [
    'All',
    'Monetary Policy',
    'Tax Policy', 
    'Regulatory Update',
    'Market Update',
    'Global Markets',
    'Alternative Investment',
    'Fixed Income',
    'Sustainable Investing'
  ];

  // Filter news based on search and category
  useEffect(() => {
    let filtered = mockNewsData;
    
    if (searchQuery) {
      filtered = searchNews(searchQuery);
    }
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(news => news.category === selectedCategory);
    }
    
    setFilteredNews(filtered);
    setCurrentIndex(0);
  }, [searchQuery, selectedCategory]);

  // Keyboard navigation
  useEffect(() => {
    if (!mounted) return;
    
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (event.key === 'ArrowRight' && currentIndex < filteredNews.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, filteredNews.length, mounted]);

  // Navigation functions
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < filteredNews.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Touch handling for mobile swipes
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < filteredNews.length - 1) {
      goToNext();
    }
    if (isRightSwipe && currentIndex > 0) {
      goToPrevious();
    }
  };

  // Get impact icon and color
  const getImpactIndicator = (impact) => {
    switch (impact) {
      case 'Positive':
        return { icon: <TrendingUp className="w-4 h-4" />, color: 'text-green-500', bg: 'bg-green-500/10' };
      case 'Negative':
        return { icon: <TrendingDownIcon className="w-4 h-4" />, color: 'text-red-500', bg: 'bg-red-500/10' };
      default:
        return { icon: <MinusIcon className="w-4 h-4" />, color: 'text-gray-500', bg: 'bg-gray-500/10' };
    }
  };

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return <div className="min-h-screen bg-black" />;
  }

  const currentNews = filteredNews[currentIndex];

  if (!currentNews) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Header />
        <div className="text-center pt-20">
          <h2 className="text-2xl font-bold mb-4">No news found</h2>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Main Content */}
      <div className="pt-20 pb-8">
        {/* Search and Filter Bar - White Section */}
        <section className="bg-white text-black rounded-b-[2rem] mb-8">
          <div className="container-main py-8">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
                Market <span className="text-yellow-500">Intelligence</span>
              </h1>
              
              {/* Search Bar */}
              <div className="relative mb-6">
                <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search news, policies, market updates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-100 border-2 border-gray-200 rounded-2xl text-black placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <FunnelIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">Filters</span>
                </button>
                
                <div className="text-sm text-gray-600">
                  {filteredNews.length} articles found
                </div>
              </div>

              {/* Filter Pills */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="flex flex-wrap gap-2 mb-4"
                  >
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                          selectedCategory === category
                            ? 'bg-yellow-500 text-black font-medium'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* News Card Container - Black Section */}
        <section className="container-main">
          <div className="max-w-6xl mx-auto">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-400">
                {currentIndex + 1} of {filteredNews.length}
              </div>
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-800 rounded-full h-1">
                  <div 
                    className="bg-yellow-500 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / filteredNews.length) * 100}%` }}
                  />
                </div>
              </div>
              <div className="text-sm text-gray-400">
                {Math.ceil((filteredNews.length - currentIndex - 1) * 2)} min left
              </div>
            </div>

            {/* Responsive News Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main News Card - Takes 2 columns on large screens */}
              <div className="lg:col-span-2">
                <div 
                  className="relative h-[600px] md:h-[700px] lg:h-[800px]"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentNews.id}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <div className="bg-white text-black rounded-3xl h-full overflow-hidden shadow-2xl">
                        {/* Card Header */}
                        <div className="p-6 pb-4 border-b border-gray-100">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3 flex-wrap">
                              <div className={`px-3 py-1 rounded-full text-xs font-medium ${getImpactIndicator(currentNews.impact).bg} ${getImpactIndicator(currentNews.impact).color}`}>
                                <div className="flex items-center space-x-1">
                                  {getImpactIndicator(currentNews.impact).icon}
                                  <span>{currentNews.impact}</span>
                                </div>
                              </div>
                              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                                {currentNews.category}
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <BookmarkIcon className="w-5 h-5 text-gray-600" />
                              </button>
                              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <ShareIcon className="w-5 h-5 text-gray-600" />
                              </button>
                            </div>
                          </div>

                          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black leading-tight mb-3">
                            {currentNews.title}
                          </h2>

                          <div className="flex items-center space-x-4 text-sm text-gray-500 flex-wrap">
                            <div className="flex items-center space-x-1">
                              <ClockIcon className="w-4 h-4" />
                              <span>{currentNews.readTime}</span>
                            </div>
                            <span>{formatDate(currentNews.publishedAt, 'relative')}</span>
                            <span>{currentNews.source}</span>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-6 overflow-y-auto" style={{ height: 'calc(100% - 200px)' }}>
                          <p className="text-lg text-gray-700 mb-6 leading-relaxed font-medium">
                            {currentNews.summary}
                          </p>

                          <div className="prose prose-lg max-w-none">
                            {currentNews.content.split('\n').map((paragraph, index) => (
                              paragraph.trim() && (
                                <p key={index} className="text-gray-600 leading-relaxed mb-4">
                                  {paragraph}
                                </p>
                              )
                            ))}
                          </div>

                          {/* Tags */}
                          <div className="mt-6 pt-4 border-t border-gray-100">
                            <div className="flex flex-wrap gap-2">
                              {currentNews.tags.map((tag) => (
                                <span 
                                  key={tag}
                                  className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-lg text-xs font-medium"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Sidebar - News List on Large Screens */}
              <div className="hidden lg:block lg:col-span-1">
                <div className="bg-gray-900 rounded-3xl p-6 h-[800px] overflow-y-auto">
                  <h3 className="text-xl font-bold text-white mb-6">Other Stories</h3>
                  <div className="space-y-4">
                    {filteredNews.map((news, index) => (
                      <motion.div
                        key={news.id}
                        onClick={() => setCurrentIndex(index)}
                        className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                          index === currentIndex
                            ? 'bg-yellow-500 text-black'
                            : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`flex items-center space-x-2 mb-2 ${
                          index === currentIndex ? 'text-black' : 'text-gray-400'
                        }`}>
                          <span className="text-xs">{formatDate(news.publishedAt, 'relative')}</span>
                          <span className="text-xs">•</span>
                          <span className="text-xs">{news.readTime}</span>
                        </div>
                        <h4 className="font-semibold text-sm leading-tight mb-2 line-clamp-3">
                          {news.title}
                        </h4>
                        <p className={`text-xs leading-relaxed line-clamp-2 ${
                          index === currentIndex ? 'text-black/70' : 'text-gray-400'
                        }`}>
                          {news.summary}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  currentIndex === 0
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-yellow-500 text-black hover:bg-yellow-400 hover:scale-105'
                }`}
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span className="font-medium hidden sm:inline">Previous</span>
              </button>

              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">Swipe or use arrows</p>
                <p className="text-yellow-500 text-xs">to navigate</p>
              </div>

              <button
                onClick={goToNext}
                disabled={currentIndex === filteredNews.length - 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  currentIndex === filteredNews.length - 1
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-yellow-500 text-black hover:bg-yellow-400 hover:scale-105'
                }`}
              >
                <span className="font-medium hidden sm:inline">Next</span>
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Navigation Dots */}
            <div className="flex justify-center mt-6 lg:hidden">
              <div className="flex space-x-2">
                {filteredNews.slice(0, 5).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-yellow-500' : 'bg-gray-600'
                    }`}
                  />
                ))}
                {filteredNews.length > 5 && (
                  <span className="text-gray-500 text-xs">...</span>
                )}
              </div>
            </div>

            {/* Keyboard shortcuts hint */}
            <div className="text-center mt-8 text-gray-500 text-sm">
              <p>Use ← → arrow keys or swipe to navigate</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewsPage;