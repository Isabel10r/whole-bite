import React, { useState } from 'react';
import { Menu, Button, Dropdown } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

// Header height constant for consistent spacing across components
export const HEADER_HEIGHT = 74;

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

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
    {
      key: '/calculator',
      label: 'Nutrition Calculator',
    },
    {
      key: '/calculator/bmr',
      label: 'BMR Calculator',
    },
  ];

  const recipesItems = [
    {
      key: '/recipes',
      label: 'All Recipes',
    },
    {
      key: '/recipes/healthy',
      label: 'Healthy Meals',
    },
    {
      key: '/recipes/quick',
      label: 'Quick & Easy',
    },
    {
      key: '/recipes/special-diets',
      label: 'Special Diets',
    },
  ];

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
      key: 'recipes',
      label: (
        <Dropdown
          menu={{ items: recipesItems, onClick: (e) => navigate(e.key) }}
          placement="bottomLeft"
          trigger={['hover']}
        >
          <span className="flex items-center gap-1">
            Recipes <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
          </span>
        </Dropdown>
      ),
    },
    {
      key: '/about',
      label: 'About Me',
    },
  ];

  const onClick = (e: any) => {
    if (e.key !== 'calculator' && e.key !== 'recipes') {
      navigate(e.key);
    }
  };

  const handleBookNow = () => {
    // Redirect to Calendly booking
    window.open('https://calendly.com/isabel10ramirez06', '_blank');
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
                style={{ color: '#0ea7b5' }}
              />
            </motion.div>
            <Link
              to="/"
              className="text-2xl font-bold hover:opacity-80 transition-opacity duration-200"
              style={{ 
                background: 'linear-gradient(45deg, #0c457d, #0ea7b5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Isabel Diez
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
              className="font-semibold px-6 py-2 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
              style={{
                backgroundColor: '#e8702a',
                borderColor: '#e8702a',
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
              className="text-[#0c457d]"
              onClick={() => {
                // Mobile menu implementation would go here
                console.log('Mobile menu clicked');
              }}
            >
              ☰
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;