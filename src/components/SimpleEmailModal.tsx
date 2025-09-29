import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheckCircle, faSpinner, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

interface SimpleEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
}

const SimpleEmailModal: React.FC<SimpleEmailModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      message.error('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      message.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Submit to Google Forms
      const formData = new FormData();
      formData.append('entry.1510167112', email); // Email field ID
      formData.append('entry.254318703', firstName || ''); // Name field ID
      
      // Submit to Google Forms
      await fetch('https://docs.google.com/forms/d/e/1FAIpQLSdDJuM7nPKD5sUPoMtigBLm8VVbS6GOUYk9DrDQS21-Sn6taA/formResponse', {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // This allows the request to work
      });
      
      // Show success message
      setIsSuccess(true);
      message.success('Thank you for subscribing!');
      
      // Call success callback after a short delay
      setTimeout(() => {
        onSuccess(email);
      }, 2000);
      
    } catch (error) {
      console.error('Error:', error);
      message.error('There was an error processing your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setFirstName('');
    setIsSuccess(false);
    setIsLoading(false);
    onClose();
  };

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 z-50"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        boxSizing: 'border-box'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}
    >
      <motion.div
        className="bg-white rounded-3xl max-w-md w-full p-8 relative"
        style={{
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxSizing: 'border-box'
        }}
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <FontAwesomeIcon icon={faTimes} className="text-gray-600" />
        </button>

        {!isSuccess ? (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                <FontAwesomeIcon 
                  icon={faCheckCircle} 
                  className="text-5xl"
                  style={{ color: '#10b981' }}
                />
              </div>
              <h2 className="text-3xl font-bold mb-2" style={{ color: '#10b981' }}>
                Start Your Transformation
              </h2>
              <p className="text-lg font-semibold text-black mb-1">
                Free 1-Hour Consultation
              </p>
              <p className="text-base text-black mb-3">
                Enter your email to schedule your personalized nutrition consultation
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  Name (optional)
                </label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Your name"
                  className="h-12 rounded-xl border-gray-300 focus:border-[#10b981] focus:ring-[#10b981]"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="h-12 rounded-xl border-gray-300 focus:border-[#10b981] focus:ring-[#10b981]"
                />
              </div>

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={isLoading}
                disabled={!email.trim() || isLoading}
                className="w-full h-12 rounded-xl font-semibold text-lg bg-[#10b981] border-none hover:!bg-[#24604c] hover:!border-[#24604c] hover:!text-white transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  'Continue'
                )}
              </Button>
            </form>

            {/* Trust indicators */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <FontAwesomeIcon icon={faShieldAlt} className="text-[#10b981]" />
                <span>Your information is secure. We don't share data.</span>
              </div>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <FontAwesomeIcon 
                icon={faCheckCircle} 
                className="text-5xl"
                style={{ color: '#10b981' }}
              />
            </div>
            
            <h3 className="text-3xl font-bold mb-2" style={{ color: '#10b981' }}>
              Perfect!
            </h3>
            
            <p className="text-lg font-semibold text-black mb-1">
              Thank you for signing up
            </p>
            <p className="text-base text-black mb-6">
              You will now be redirected to schedule your free consultation.
            </p>
            
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#10b981]"></div>
              <span className="ml-2 text-gray-600">Redirecting...</span>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SimpleEmailModal;
