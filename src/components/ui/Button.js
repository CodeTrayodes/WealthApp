'use client';

import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ANIMATIONS } from '../../lib/constants';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus-ring rounded-none';
  
  const variants = {
    primary: 'bg-yellow-500 text-black hover:bg-yellow-400 active:bg-yellow-600',
    secondary: 'bg-transparent border border-white text-white hover:bg-white hover:text-black',
    ghost: 'bg-transparent text-white hover:bg-gray-900',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const buttonClasses = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    disabled && 'opacity-50 cursor-not-allowed',
    loading && 'cursor-wait',
    className
  );

  return (
    <motion.button
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      {...ANIMATIONS.BUTTON_TAP}
      {...props}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;