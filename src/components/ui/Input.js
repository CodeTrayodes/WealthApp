'use client';

import { useState, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { cn } from '../../lib/utils';

const Input = forwardRef(({ 
  label,
  type = 'text',
  placeholder,
  error,
  helper,
  required = false,
  disabled = false,
  className = '',
  leftIcon,
  rightIcon,
  ...props 
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  const inputClasses = cn(
    'w-full input-primary',
    leftIcon && 'pl-12',
    (rightIcon || type === 'password') && 'pr-12',
    error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <motion.label 
          className={cn(
            'block text-sm font-medium mb-2 transition-colors duration-200',
            error ? 'text-red-400' : 'text-gray-300',
            isFocused && !error && 'text-yellow-500'
          )}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </motion.label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {leftIcon}
          </div>
        )}

        {/* Input Field */}
        <motion.input
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          whileFocus={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          {...props}
        />

        {/* Right Icon or Password Toggle */}
        {(rightIcon || type === 'password') && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {type === 'password' ? (
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-yellow-500 transition-colors duration-200 focus:outline-none"
                whileTap={{ scale: 0.95 }}
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </motion.button>
            ) : (
              rightIcon
            )}
          </div>
        )}

        {/* Focus Ring Animation */}
        {isFocused && (
          <motion.div
            className="absolute inset-0 border-2 border-yellow-500 rounded-none pointer-events-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </div>

      {/* Helper Text or Error */}
      {(helper || error) && (
        <motion.div
          className={cn(
            'mt-2 text-sm',
            error ? 'text-red-400' : 'text-gray-500'
          )}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error || helper}
        </motion.div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;