import React, { useState } from 'react';
import { Menu, Button, Dropdown } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faChevronDown, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

// Header height constant for consistent spacing across components
export const HEADER_HEIGHT = 74;

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsScrolled(scrollTop > 50);
  };

  // Add scroll listener
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculatorItems = [
    // {
    //   key: '/calculator',
    //   label: 'Nutrition Calculator',
    // },
    {
      key: '/calculator/bmr',
      label: 'BMR Calculator',
    },
    {
      key: '/calculator/water',
      label: 'Water Intake Calculator',
    },
  ];

  // const recipesItems = [];

  const mainMenuItems = [
    {
      key: '/',
      label: 'Home',
    },
    {
      key: 'calculator',
      label: (
        <Dropdown
          menu={{ items: calculatorItems, onClick: (e) => navigate(e.key) }}
          placement="bottomLeft"
          trigger={['hover']}
        >
          <span className="flex items-center gap-1">
            Calculator <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
          </span>
        </Dropdown>
      ),
    },
    {
      key: '/recipes',
      label: 'Recipes',
    },
    {
      key: '/about',
      label: 'About Me',
    },
  ];

  const onClick = (e: any) => {
    if (e.key !== 'calculator') {
      navigate(e.key);
    }
  };

  const handleBookNow = () => {
    // Redirect to Calendly booking
    window.open('https://calendly.com/isabel10ramirez06', '_blank');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMobileNavigation = (path: string) => {
    navigate(path);
    closeMobileMenu();
  };

  return (
    <motion.header 
      className={`w-full sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white shadow-sm'
      }`}
      style={{ height: `${HEADER_HEIGHT}px` }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="flex items-center justify-between w-full">
          {/* Logo Area - Left */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <FontAwesomeIcon
                icon={faDumbbell}
                className="text-2xl"
                style={{ color: '#10b981' }}
              />
            </motion.div>
            <Link
              to="/"
              className="text-2xl font-bold hover:opacity-80 transition-opacity duration-200"
              style={{ 
                background: 'linear-gradient(45deg, #24604c, #10b981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Whole Bite
            </Link>
          </motion.div>

          {/* Navigation Menu - Center */}
          <div className="hidden md:flex flex-1 justify-center">
            <Menu
              onClick={onClick}
              selectedKeys={[location.pathname]}
              mode="horizontal"
              items={mainMenuItems}
              className="bg-transparent border-none flex-1 justify-center"
              style={{
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '1.5',
                display: 'flex',
                justifyContent: 'center'
              }}
              theme="light"
            />
          </div>

          {/* Book Now Button - Right */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type="primary"
              size="large"
              onClick={handleBookNow}
              className="font-semibold px-6 py-2 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:!bg-[#24604c] hover:!border-[#24604c] hover:!text-white"
              style={{
                backgroundColor: '#10b981',
                borderColor: '#10b981',
                fontSize: '16px',
                fontWeight: '600',
                height: 'auto',
                minWidth: '120px'
              }}
            >
              Book Now
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              type="text"
              size="large"
              className="text-[#24604c] hover:bg-gray-100 rounded-lg p-2"
              onClick={toggleMobileMenu}
            >
              <FontAwesomeIcon 
                icon={isMobileMenuOpen ? faTimes : faBars} 
                className="text-xl"
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Rendered as Portal */}
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={closeMobileMenu}
              />
              
              {/* Mobile Menu */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed top-0 right-0 h-screen w-80 max-w-[85vw] bg-white shadow-2xl z-50 md:hidden"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Menu Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-[#24604c]">Menu</h2>
                    <Button
                      type="text"
                      size="large"
                      className="text-[#24604c] hover:bg-gray-100 rounded-lg p-2"
                      onClick={closeMobileMenu}
                    >
                      <FontAwesomeIcon icon={faTimes} className="text-xl" />
                    </Button>
                  </div>

                  {/* Mobile Menu Items */}
                  <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-2">
                      {/* Home */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleMobileNavigation('/')}
                        className={`w-full text-left p-4 rounded-lg transition-colors duration-200 ${
                          location.pathname === '/' 
                            ? 'bg-[#10b981] text-white' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span className="text-lg font-medium">Home</span>
                      </motion.button>

                      {/* Calculator Section */}
                      <div className="space-y-2">
                        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide px-4 py-2">
                          Calculators
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleMobileNavigation('/calculator/bmr')}
                          className={`w-full text-left p-4 rounded-lg transition-colors duration-200 ${
                            location.pathname === '/calculator/bmr' 
                              ? 'bg-[#10b981] text-white' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <span className="text-lg font-medium">BMR Calculator</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleMobileNavigation('/calculator/water')}
                          className={`w-full text-left p-4 rounded-lg transition-colors duration-200 ${
                            location.pathname === '/calculator/water' 
                              ? 'bg-[#10b981] text-white' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <span className="text-lg font-medium">Water Intake Calculator</span>
                        </motion.button>
                      </div>

                      {/* Recipes */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleMobileNavigation('/recipes')}
                        className={`w-full text-left p-4 rounded-lg transition-colors duration-200 ${
                          location.pathname === '/recipes' 
                            ? 'bg-[#10b981] text-white' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span className="text-lg font-medium">Recipes</span>
                      </motion.button>

                      {/* About Me */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleMobileNavigation('/about')}
                        className={`w-full text-left p-4 rounded-lg transition-colors duration-200 ${
                          location.pathname === '/about' 
                            ? 'bg-[#10b981] text-white' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span className="text-lg font-medium">About Me</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Mobile Menu Footer */}
                  <div className="p-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        handleBookNow();
                        closeMobileMenu();
                      }}
                      className="w-full bg-[#10b981] hover:bg-[#24604c] text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 shadow-lg"
                    >
                      Book Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.header>
  );
};

export default Header;