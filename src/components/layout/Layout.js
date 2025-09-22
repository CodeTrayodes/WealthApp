
'use client';

import { motion } from 'framer-motion';
import { ANIMATIONS } from '../../lib/constants';

const Layout = ({ children, showNavigation = true, className = '' }) => {
  return (
    <div className={`min-h-screen bg-black text-white ${className}`}>
      {/* Page Transition Wrapper */}
      <motion.div
        initial={ANIMATIONS.PAGE_TRANSITIONS.initial}
        animate={ANIMATIONS.PAGE_TRANSITIONS.animate}
        exit={ANIMATIONS.PAGE_TRANSITIONS.exit}
        transition={ANIMATIONS.PAGE_TRANSITIONS.transition}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Layout;