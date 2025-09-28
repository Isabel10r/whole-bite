import React, { useState } from 'react';
import { Button, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

interface LanguageOption {
  key: string;
  label: string;
}

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languageOptions: LanguageOption[] = [
    {
      key: 'en',
      label: 'English'
    },
    {
      key: 'es',
      label: 'Español'
    }
  ];

  const currentLanguage = languageOptions.find(lang => lang.key === i18n.language) || languageOptions[0];

  const handleLanguageChange = (languageKey: string) => {
    i18n.changeLanguage(languageKey);
    setIsOpen(false);
  };

  const menuItems = languageOptions.map(option => ({
    key: option.key,
    label: (
      <motion.div
        className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FontAwesomeIcon 
          icon={faGlobe} 
          className="text-[#10b981]"
        />
        <span className="font-medium text-gray-700">{option.label}</span>
        {option.key === i18n.language && (
          <FontAwesomeIcon 
            icon={faGlobe} 
            className="text-[#10b981] ml-auto"
          />
        )}
      </motion.div>
    ),
    onClick: () => handleLanguageChange(option.key),
  }));

  return (
    <Dropdown
      menu={{ items: menuItems }}
      placement="bottomRight"
      trigger={['click']}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          type="text"
          size="large"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <FontAwesomeIcon 
            icon={faGlobe} 
            className="text-lg text-[#10b981]"
          />
          <span className="text-sm font-medium text-gray-700">
            {currentLanguage.label}
          </span>
          <FontAwesomeIcon 
            icon={faChevronDown} 
            className="text-xs text-gray-500"
          />
        </Button>
      </motion.div>
    </Dropdown>
  );
};

export default LanguageSelector;
