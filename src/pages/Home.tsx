import { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined, HeartOutlined, TrophyOutlined, TeamOutlined } from '@ant-design/icons';
import { motion, useAnimation } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faHeart, faCrown, faCheckCircle, faStar, faDumbbell, faLeaf } from '@fortawesome/free-solid-svg-icons';
import { HEADER_HEIGHT } from '../components/Header';


// Custom hook for scroll-based gradient animation
const useScrollGradient = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      
      setLastScrollY(currentScrollY);
      setIsScrolling(true);
      
      // Reset scrolling state after a delay
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [lastScrollY]);

  return { scrollDirection, isScrolling };
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`counter-${end}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [end, isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span 
      id={`counter-${end}`} 
      className="text-3xl font-bold text-[#ffbe4f] drop-shadow-lg"
      style={{
        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 190, 79, 0.4)',
        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
      }}
    >
      {count}{suffix}
    </span>
  );
};

const HomePage = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [currentBenefitIndex, setCurrentBenefitIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const titleControls = useAnimation();
  const { scrollDirection, isScrolling } = useScrollGradient();
  const featuresSectionRef = useRef<HTMLElement>(null);
  const benefitsCarouselRef = useRef<HTMLElement>(null);

  // Benefits data
  const benefits = [
    {
      title: "Sustained Energy All Day",
      description: "No more afternoon crashes or energy dips. Fuel your body strategically for consistent vitality from morning to night.",
      image: "https://images.unsplash.com/photo-1607914660217-754fdd90041d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Deep, Restorative Sleep",
      description: "Wake up refreshed and ready. Optimize your evening routine and nutrient timing for quality sleep and faster recovery.",
      image: "https://images.unsplash.com/flagged/photo-1555697752-da25a4b1025b?q=80&w=1710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Effortless Weight Balance",
      description: "Achieve your ideal weight without counting calories or feeling deprived. Build sustainable habits that work with your lifestyle.",
      image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Peak Performance Mode",
      description: "Unlock your athletic potential with targeted fueling strategies that enhance strength, endurance, and recovery.",
      image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Food Freedom & Joy",
      description: "Transform your relationship with food from stress to celebration. Enjoy meals without guilt or restriction.",
      image: "https://images.unsplash.com/photo-1556911073-a517e752729c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Lifelong Vitality",
      description: "Invest in your future self. Create lasting wellness habits that support your health, energy, and longevity for years to come.",
      image: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  // Trigger title animation on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      titleControls.start({
        scale: [1, 1.05, 1],
        transition: {
          duration: 0.8,
          ease: "easeInOut"
        }
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [titleControls]);

  // Auto-rotation for benefits carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentBenefitIndex((prevIndex) => 
        prevIndex === benefits.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, benefits.length]);

  const testimonials = [
    {
      quote: "I went from exhausted by 2 PM to having energy all day long. The meal timing strategies were game-changing!",
      author: "Jane D.",
      icon: faStar,
      iconColor: "#ffbe4f",
      category: "Energy Transformation"
    },
    {
      quote: "Finally reached my goal weight without feeling hungry or deprived. The sustainable approach actually works!",
      author: "Mark S.",
      icon: faDumbbell,
      iconColor: "#e8702a",
      category: "Weight Success"
    },
    {
      quote: "The ongoing support made all the difference. I never felt alone in my journey and always had guidance when I needed it.",
      author: "Emily R.",
      icon: faLeaf,
      iconColor: "#0ea7b5",
      category: "Lifestyle Change"
    },
  ];

  const services = [
    {
      id: 1,
      title: "Kickstart",
      subtitle: "The beginning of your change",
      description: "Perfect for those who want to start without feeling overwhelmed.",
      icon: faRocket,
      iconColor: "#0ea7b5",
      price: "COP 220,000 / month",
      priceUSD: "USD 55",
      features: [
        "Initial consultation (60 min) + complete diagnosis",
        "100% personalized meal plan (hormonal balance, recomposition or anti-inflammatory)",
        "Weekly shopping list organized by sections",
        "Plan adjustments every 2 weeks",
        "Access to private community (WhatsApp/Telegram)",
        "Mini recipe book (5 practical recipes)"
      ]
    },
    {
      id: 2,
      title: "Lifestyle",
      subtitle: "Your new healthy routine",
      description: "The most popular plan: balance between support and flexibility.",
      icon: faHeart,
      iconColor: "#e8702a",
      price: "COP 380,000 / month",
      priceUSD: "USD 95",
      features: [
        "Everything from the Kickstart plan",
        "Individual weekly follow-up (30 min virtual)",
        "Weekly plan adjustments",
        "Weekly form/checklist",
        "Access to exclusive video library",
        "Extended recipe book (15 recipes)",
        "Direct chat (response < 24h)"
      ]
    },
    {
      id: 3,
      title: "Transform",
      subtitle: "Complete 360° support",
      description: "Designed for deep change with constant support.",
      icon: faCrown,
      iconColor: "#ffbe4f",
      price: "COP 650,000 / month",
      priceUSD: "USD 160",
      features: [
        "Everything from the Lifestyle plan",
        "Daily WhatsApp review",
        "Shopping support (virtual)",
        "Functional training plan",
        "Monthly coaching (60 min)",
        "Premium recipe book (+30 recipes)",
        "Access to exclusive monthly challenges",
        "Bonus: online workshops (e.g., reading labels)"
      ]
    }
  ];

  const features = [
    {
      icon: <HeartOutlined className="text-4xl text-[#0ea7b5]" />,
      title: "Science-Backed Methods",
      description: "Every strategy is rooted in cutting-edge research and clinical evidence."
    },
      {
        icon: <TrophyOutlined className="text-4xl text-[#e8702a]" />,
        title: "Transformative Outcomes",
        description: "Real results that stick—no more yo-yo dieting or temporary fixes."
      },
    {
      icon: <TeamOutlined className="text-4xl text-[#ffbe4f]" />,
      title: "Tailored Coaching",
      description: "Customized guidance that adapts to your unique goals and lifestyle."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F7] font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0ea7b5] via-[#6bd2db] to-[#0c457d] text-white relative overflow-hidden" style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
        {/* Floating Bubbles */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full opacity-10"
            animate={{
              y: [0, -15, 0],
              x: [0, 8, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-24 h-24 bg-white rounded-full opacity-10"
            animate={{
              y: [0, 12, 0],
              x: [0, -6, 0],
              scale: [1, 0.95, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/4 w-16 h-16 bg-white rounded-full opacity-10"
            animate={{
              y: [0, -10, 0],
              x: [0, 5, 0],
              scale: [1, 1.08, 1]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute bottom-40 right-1/3 w-20 h-20 bg-white rounded-full opacity-10"
            animate={{
              y: [0, 14, 0],
              x: [0, -4, 0],
              scale: [1, 0.92, 1]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10 flex items-center justify-center" style={{ minHeight: `calc(100dvh - ${HEADER_HEIGHT}px)` }}>
          <div className="max-w-5xl mx-auto">
            <motion.h1 
              className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.span
                animate={titleControls}
                className="block"
              >
                Transform Your Health with
              </motion.span>
              <motion.span 
                className="block text-[#ffbe4f] drop-shadow-lg"
                animate={titleControls}
                transition={{ delay: 0.2 }}
                style={{
                  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 190, 79, 0.4)',
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
                }}
              >
                Expert Nutrition
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed opacity-95"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              Finally, a nutrition approach that works with your body, not against it. Get personalized coaching that transforms your energy, balances your hormones, and creates lasting habits—all backed by science.
            </motion.p>
            
            {/* Stats Row */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
              <div 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <AnimatedCounter end={100} suffix="%" />
                <div className="text-sm opacity-90 mt-2">Tailored Plans</div>
              </div>
              <div 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <AnimatedCounter end={50} suffix="+" />
                <div className="text-sm opacity-90 mt-2">Recipes & Meal Ideas</div>
              </div>
              <div 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <AnimatedCounter end={90} suffix="%" />
                <div className="text-sm opacity-90 mt-2">Report Improved Habits</div>
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="primary"
                  size="large"
                  className="bg-[#e8702a] text-white font-semibold border-none px-10 py-4 rounded-full shadow-lg transition-all duration-300 text-lg hover:shadow-xl"
                  style={{
                    background: '#e8702a',
                    borderColor: '#e8702a',
                    color: 'white'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#ffbe4f';
                    e.currentTarget.style.borderColor = '#ffbe4f';
                    e.currentTarget.style.color = '#0c457d';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#e8702a';
                    e.currentTarget.style.borderColor = '#e8702a';
                    e.currentTarget.style.color = 'white';
                  }}
                  onClick={(e) => {
                    e.currentTarget.style.background = '#ffbe4f';
                    e.currentTarget.style.borderColor = '#ffbe4f';
                    e.currentTarget.style.color = '#0c457d';
                  }}
                  href="#contact"
                >
                  Start Your Journey <ArrowRightOutlined />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="large"
                  className="bg-transparent text-white border-2 border-white px-10 py-4 rounded-full transition-all duration-300 text-lg hover:shadow-lg"
                  style={{
                    background: 'transparent',
                    borderColor: 'white',
                    color: 'white'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#ffbe4f';
                    e.currentTarget.style.borderColor = '#ffbe4f';
                    e.currentTarget.style.color = '#0c457d';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'white';
                    e.currentTarget.style.color = 'white';
                  }}
                  href="#services"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresSectionRef} className="py-24 bg-white relative overflow-hidden">
        {/* Background Organic Bubbles */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-24 h-24 rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #4ECDC4 0%, transparent 70%)' }}
            animate={{
              y: [0, -15, 0],
              x: [0, 8, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-32 h-32 rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #FF6B6B 0%, transparent 70%)' }}
            animate={{
              y: [0, 12, 0],
              x: [0, -6, 0],
              scale: [1, 0.9, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #FFE66D 0%, transparent 70%)' }}
            animate={{
              y: [0, -10, 0],
              x: [0, 5, 0],
              scale: [1, 1.08, 1]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute bottom-40 right-1/3 w-28 h-28 rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #4ECDC4 0%, transparent 70%)' }}
            animate={{
              y: [0, 14, 0],
              x: [0, -4, 0],
              scale: [1, 0.92, 1]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #FF6B6B 0%, transparent 70%)' }}
            animate={{
              y: [0, -25, 0],
              x: [0, 12, 0],
              scale: [1, 1.08, 1]
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
        </div>
        {/* Floating Bubbles - Similar to Header */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Bubbles positioned to avoid text overlap */}
          <motion.div
            className="absolute top-10 left-5 w-24 h-24 rounded-full opacity-20"
            style={{
              background: '#FFB3B3'
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, 8, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-32 right-5 w-20 h-20 rounded-full opacity-20"
            style={{
              background: '#FFB3B3'
            }}
            animate={{
              y: [0, 12, 0],
              x: [0, -6, 0],
              scale: [1, 0.9, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-32 left-8 w-16 h-16 rounded-full opacity-20"
            style={{
              background: '#FFB3B3'
            }}
            animate={{
              y: [0, -10, 0],
              x: [0, 5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute bottom-16 right-8 w-18 h-18 rounded-full opacity-20"
            style={{
              background: '#FFB3B3'
            }}
            animate={{
              y: [0, 14, 0],
              x: [0, -4, 0],
              scale: [1, 0.95, 1]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          <motion.div
            className="absolute top-1/2 left-2 w-14 h-14 rounded-full opacity-20"
            style={{
              background: '#FFB3B3'
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.08, 1]
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
          <motion.div
            className="absolute top-1/2 right-2 w-12 h-12 rounded-full opacity-20"
            style={{
              background: '#FFB3B3'
            }}
            animate={{
              y: [0, 16, 0],
              x: [0, -8, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.5
            }}
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-[#0c457d] px-4 py-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              animate={isScrolling ? {
                backgroundPosition: scrollDirection === 'down' 
                  ? ['0% 50%', '100% 50%']
                  : ['100% 50%', '0% 50%'],
                scale: [1, 1.02, 1]
              } : {
                backgroundPosition: '0% 50%',
                scale: 1
              }}
              transition={{
                opacity: { duration: 0.8 },
                y: { duration: 0.8 },
                backgroundPosition: {
                  duration: 2,
                  ease: "easeInOut"
                },
                scale: {
                  duration: 0.6,
                  ease: "easeInOut"
                }
              }}
              style={{
                background: 'linear-gradient(45deg, #0c457d, #0ea7b5, #6bd2db)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              What Makes My Coaching Different?
            </motion.h2>
            <p className="text-xl text-[#0c457d] max-w-3xl mx-auto leading-relaxed">
              Unlike generic diet plans, my approach combines cutting-edge research with personalized strategies that work with your body, not against it.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Modern Gradient Box */}
                <div 
                  className={`
                    relative p-8 rounded-3xl
                    ${index === 0 ? 'bg-gradient-to-br from-[#0ea7b5]/10 via-[#0ea7b5]/5 to-white border border-[#0ea7b5]/20' : ''}
                    ${index === 1 ? 'bg-gradient-to-br from-[#e8702a]/10 via-[#e8702a]/5 to-white border border-[#e8702a]/20' : ''}
                    ${index === 2 ? 'bg-gradient-to-br from-[#ffbe4f]/10 via-[#ffbe4f]/5 to-white border border-[#ffbe4f]/20' : ''}
                    shadow-lg shadow-black/5
                  `}
                >
                  {/* Background Glow - Static */}
                  <div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: index === 0 ? 'radial-gradient(circle, rgba(14, 167, 181, 0.1) 0%, transparent 70%)' :
                                   index === 1 ? 'radial-gradient(circle, rgba(232, 112, 42, 0.1) 0%, transparent 70%)' :
                                   'radial-gradient(circle, rgba(255, 190, 79, 0.1) 0%, transparent 70%)'
                    }}
                  />
                  
                  {/* Centered Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="relative">
                      {feature.icon}
                    </div>
                  </div>
                  
                  {/* Title with Static Highlight */}
                  <h3 
                    className={`
                      text-2xl font-bold mb-4 relative z-10 text-center
                      ${index === 0 ? 'bg-gradient-to-r from-[#0ea7b5] to-[#0c457d] bg-clip-text text-transparent' : ''}
                      ${index === 1 ? 'bg-gradient-to-r from-[#e8702a] to-[#0c457d] bg-clip-text text-transparent' : ''}
                      ${index === 2 ? 'bg-gradient-to-r from-[#ffbe4f] to-[#0c457d] bg-clip-text text-transparent' : ''}
                    `}
                  >
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p 
                    className="text-[#0c457d] leading-relaxed text-lg relative z-10 text-center"
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-[#F7F7F7] relative overflow-hidden">
        {/* Background Bubbles */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 rounded-full opacity-10"
            style={{ background: '#4ECDC4' }}
            animate={{
              y: [0, -15, 0],
              x: [0, 8, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-16 h-16 rounded-full opacity-10"
            style={{ background: '#4ECDC4' }}
            animate={{
              y: [0, 12, 0],
              x: [0, -6, 0],
              scale: [1, 0.9, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute top-1/2 left-5 w-12 h-12 rounded-full opacity-10"
            style={{ background: '#4ECDC4' }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.08, 1]
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
          <motion.div
            className="absolute top-1/2 right-5 w-14 h-14 rounded-full opacity-10"
            style={{ background: '#4ECDC4' }}
            animate={{
              y: [0, 16, 0],
              x: [0, -8, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.5
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-[#0c457d] px-4 py-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              animate={isScrolling ? {
                backgroundPosition: scrollDirection === 'down' 
                  ? ['0% 50%', '100% 50%']
                  : ['100% 50%', '0% 50%'],
                scale: [1, 1.02, 1]
              } : {
                backgroundPosition: '0% 50%',
                scale: 1
              }}
              transition={{
                opacity: { duration: 0.8 },
                y: { duration: 0.8 },
                backgroundPosition: {
                  duration: 2,
                  ease: "easeInOut"
                },
                scale: {
                  duration: 0.6,
                  ease: "easeInOut"
                }
              }}
              style={{
                background: 'linear-gradient(45deg, #0c457d, #0ea7b5, #6bd2db)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              My Services
            </motion.h2>
            <p className="text-xl text-[#0c457d] max-w-3xl mx-auto leading-relaxed">
              Choose the level of support that fits your journey—from getting started to complete transformation with ongoing guidance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                onClick={() => setSelectedService(service.id)}
              >
                {/* Service Card */}
                <motion.div 
                  className="relative p-8 rounded-3xl bg-white shadow-lg shadow-black/5 h-full flex flex-col"
                  whileHover={{ 
                    scale: 1.05,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {/* Animated Background Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle, ${service.iconColor}30 0%, transparent 70%)`
                    }}
                    whileHover={{
                      opacity: 1,
                      scale: 1.1
                    }}
                    initial={{ opacity: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                  
                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <motion.div
                      className="relative"
                      whileHover={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <FontAwesomeIcon 
                        icon={service.icon} 
                        className="text-4xl"
                        style={{ color: service.iconColor }}
                      />
                    </motion.div>
                  </div>
                  
                  {/* Title */}
                  <motion.h3 
                    className="text-2xl font-bold mb-2 text-center relative z-10"
                    style={{
                      background: `linear-gradient(45deg, ${service.iconColor}, #0c457d)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                    whileHover={{
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.title}
                  </motion.h3>
                  
                  {/* Subtitle */}
                  <p className="text-lg font-semibold text-center mb-4 text-[#0c457d] relative z-10">
                    {service.subtitle}
                  </p>
                  
                  {/* Description */}
                  <p className="text-[#0c457d] leading-relaxed text-center mb-6 relative z-10 flex-grow">
                    {service.description}
                  </p>
                  
                  {/* Price */}
                  <div className="text-center mb-6 relative z-10">
                    <div className="text-2xl font-bold" style={{ color: service.iconColor }}>
                      {service.price}
                    </div>
                    <div className="text-sm text-gray-600">
                      {service.priceUSD}
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <motion.div
                    className="text-center relative z-10 mt-auto"
                    whileHover={{
                      y: [0, -2, 0]
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      type="primary"
                      size="large"
                      className="w-full"
                      style={{
                        backgroundColor: service.iconColor,
                        borderColor: service.iconColor,
                        height: '48px',
                        fontSize: '16px',
                        fontWeight: '600'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open('https://calendly.com/isabel10ramirez06', '_blank');
                      }}
                    >
                      Start Now
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

       {/* Modern Benefits Carousel Section */}
       <section ref={benefitsCarouselRef} className="py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
         {/* Animated Background */}
         <div className="absolute inset-0">
           <div className="absolute inset-0 bg-gradient-to-r from-[#0ea7b5]/5 via-transparent to-[#e8702a]/5"></div>
           <motion.div
             className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
             style={{ background: 'radial-gradient(circle, #0ea7b5, transparent)' }}
             animate={{
               scale: [1, 1.2, 1],
               rotate: [0, 180, 360]
             }}
             transition={{
               duration: 20,
               repeat: Infinity,
               ease: "linear"
             }}
           />
           <motion.div
             className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20"
             style={{ background: 'radial-gradient(circle, #e8702a, transparent)' }}
             animate={{
               scale: [1.2, 1, 1.2],
               rotate: [360, 180, 0]
             }}
             transition={{
               duration: 25,
               repeat: Infinity,
               ease: "linear"
             }}
           />
         </div>

         <div className="container mx-auto px-6 relative z-10">
           <div className="text-center mb-12">
             <motion.h2 
               className="text-5xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#0c457d] via-[#0ea7b5] to-[#6bd2db]"
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
             >
               What You'll Achieve
             </motion.h2>
             <motion.p 
               className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
             >
               These aren't just promises—they're the real transformations my clients experience when they commit to their wellness journey.
             </motion.p>
           </div>

           {/* Modern Carousel Container */}
           <div className="max-w-7xl mx-auto">
             <div className="relative">
               {/* 3D Carousel */}
               <div className="relative overflow-hidden rounded-2xl shadow-xl max-w-4xl mx-auto">
                 {/* Navigation Arrows */}
                 <motion.button
                   className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-all duration-300 z-20"
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => {
                     setIsAutoPlaying(false);
                     setCurrentBenefitIndex(prev => prev === 0 ? benefits.length - 1 : prev - 1);
                   }}
                 >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                   </svg>
                 </motion.button>

                 <motion.button
                   className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-all duration-300 z-20"
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => {
                     setIsAutoPlaying(false);
                     setCurrentBenefitIndex(prev => prev === benefits.length - 1 ? 0 : prev + 1);
                   }}
                 >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                   </svg>
                 </motion.button>

                 <motion.div 
                   className="flex"
                   animate={{ x: `-${currentBenefitIndex * 100}%` }}
                   transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                 >
                   {benefits.map((benefit, index) => (
                     <div key={index} className="w-full flex-shrink-0">
                       <div className="relative min-h-[320px] overflow-hidden rounded-2xl">
                         {/* Background Image with 3D Effect */}
                         <motion.div
                           className="absolute inset-0"
                           initial={{ scale: 1.1, rotateY: 0 }}
                           animate={{ 
                             scale: currentBenefitIndex === index ? 1 : 1.1,
                             rotateY: currentBenefitIndex === index ? 0 : 5
                           }}
                           transition={{ duration: 0.7 }}
                         >
                           <motion.img
                             src={benefit.image}
                             alt={benefit.title}
                             className="w-full h-full object-cover"
                             initial={{ scale: 1 }}
                             animate={{ scale: currentBenefitIndex === index ? 1.05 : 1 }}
                             transition={{ duration: 0.7 }}
                           />
                           
                           {/* Dark Overlay for Text Readability */}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                         </motion.div>

                         {/* Floating Badge */}
                         <motion.div
                           className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg z-10"
                           initial={{ opacity: 0, y: -15 }}
                           animate={{ 
                             opacity: currentBenefitIndex === index ? 1 : 0.7,
                             y: currentBenefitIndex === index ? 0 : -8
                           }}
                           transition={{ duration: 0.6, delay: 0.2 }}
                         >
                           <span className="text-xs font-bold text-[#0ea7b5]">
                             {index + 1} / {benefits.length}
                           </span>
                         </motion.div>

                         {/* Overlay Text Content */}
                         <motion.div
                           className="absolute bottom-0 left-0 right-0 p-6 z-10"
                           initial={{ opacity: 0, y: 30 }}
                           animate={{ 
                             opacity: currentBenefitIndex === index ? 1 : 0.7,
                             y: currentBenefitIndex === index ? 0 : 20
                           }}
                           transition={{ duration: 0.6, delay: 0.3 }}
                         >
                           <motion.h3 
                             className="text-2xl md:text-3xl font-bold mb-2 text-white drop-shadow-lg"
                             animate={currentBenefitIndex === index ? {
                               textShadow: [
                                 '0 0 15px rgba(14, 167, 181, 0.4)',
                                 '0 0 25px rgba(14, 167, 181, 0.6)',
                                 '0 0 15px rgba(14, 167, 181, 0.4)'
                               ]
                             } : {}}
                             transition={{ duration: 2, repeat: Infinity }}
                           >
                             {benefit.title}
                           </motion.h3>
                           
                           <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-xl drop-shadow-md">
                             {benefit.description}
                           </p>
                         </motion.div>
                       </div>
                     </div>
                   ))}
                 </motion.div>
               </div>

               {/* Bottom Controls */}
               <div className="flex justify-center items-center mt-6 space-x-3">
                 {/* Play/Pause Button */}
                 <motion.button
                   className="w-12 h-12 bg-[#e8702a] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[#d65a1a] transition-all duration-300"
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                 >
                   {isAutoPlaying ? (
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                     </svg>
                   ) : (
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M8 5v14l11-7z"/>
                     </svg>
                   )}
                 </motion.button>

                 {/* Dots Navigation */}
                 <div className="flex space-x-2">
                   {benefits.map((_, index) => (
                     <motion.button
                       key={index}
                       className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                         index === currentBenefitIndex 
                           ? 'bg-[#0ea7b5] scale-125' 
                           : 'bg-gray-300 hover:bg-gray-400'
                       }`}
                       whileHover={{ scale: 1.2 }}
                       whileTap={{ scale: 0.9 }}
                       onClick={() => {
                         setIsAutoPlaying(false);
                         setCurrentBenefitIndex(index);
                       }}
                       animate={{
                         scale: index === currentBenefitIndex ? 1.25 : 1
                       }}
                       transition={{ duration: 0.3 }}
                     />
                   ))}
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>

      {/* Modern Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-white via-[#F7F7F7] to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #0ea7b5 0%, transparent 70%)' }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-24 h-24 rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #e8702a 0%, transparent 70%)' }}
            animate={{
              y: [0, 15, 0],
              x: [0, -8, 0],
              scale: [1, 0.9, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #ffbe4f 0%, transparent 70%)' }}
            animate={{
              y: [0, -12, 0],
              x: [0, 6, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#0c457d] via-[#0ea7b5] to-[#6bd2db] leading-tight py-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              What My Clients Say
            </motion.h2>
            <motion.p 
              className="text-xl text-[#0c457d] max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Don't just take my word for it. Here's what happens when you commit to a science-backed approach to wellness.
            </motion.p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {/* Modern Testimonial Card */}
                  <div 
                    className="relative p-8 rounded-3xl bg-white shadow-lg shadow-black/5 h-full flex flex-col border border-gray-100/50"
                  >
                    {/* Background Glow - Static */}
                    <div
                      className="absolute inset-0 rounded-3xl"
                      style={{
                        background: `radial-gradient(circle, ${testimonial.iconColor}10 0%, transparent 70%)`
                      }}
                    />
                    
                    {/* Icon and Category Badge */}
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: `${testimonial.iconColor}20` }}
                      >
                        <FontAwesomeIcon 
                          icon={testimonial.icon} 
                          className="text-2xl"
                          style={{ color: testimonial.iconColor }}
                        />
                      </div>
                      
                      <div
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ 
                          backgroundColor: `${testimonial.iconColor}20`,
                          color: testimonial.iconColor
                        }}
                      >
                        {testimonial.category}
                      </div>
                    </div>
                    
                    {/* Quote */}
                    <div className="flex-1 mb-6 relative z-10">
                      <div
                        className="text-4xl mb-4"
                        style={{ color: testimonial.iconColor }}
                      >
                        "
                      </div>
                      <p className="text-lg text-[#0c457d] leading-relaxed italic">
                        {testimonial.quote}
                      </p>
                    </div>
                    
                    {/* Author Info */}
                    <div className="border-t border-gray-100 pt-6 relative z-10">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                          style={{ backgroundColor: testimonial.iconColor }}
                        >
                          {testimonial.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-[#0c457d] text-lg">{testimonial.author}</p>
                          <p className="text-sm text-gray-500">Verified Client</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Trust Indicators */}
            <motion.div 
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-[#0ea7b5]" />
                  <span>100% Verified Reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-[#0ea7b5]" />
                  <span>Real Client Stories</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-[#0ea7b5]" />
                  <span>Privacy Protected</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-24 bg-gradient-to-br from-[#0ea7b5] via-[#6bd2db] to-[#0c457d] text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Transform Your Life?</h2>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-95">
              Be the next success story. Join others who've already transformed their energy, weight, and relationship with food. Your transformation starts with one decision.
            </p>
            
            <div className="flex justify-center items-center mb-12">
              <Button
                type="primary"
                size="large"
                className="bg-[#e8702a] text-white font-semibold border-none px-12 py-4 rounded-full shadow-lg transition-all duration-300 text-lg"
                style={{
                  background: '#e8702a',
                  borderColor: '#e8702a'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#ffbe4f';
                  e.currentTarget.style.borderColor = '#ffbe4f';
                  e.currentTarget.style.color = '#0c457d';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#e8702a';
                  e.currentTarget.style.borderColor = '#e8702a';
                  e.currentTarget.style.color = 'white';
                }}
                onClick={() => window.open('https://calendly.com/isabel10ramirez06', '_blank')}
              >
                Get Started Today <ArrowRightOutlined />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transition-all duration-300"
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.3)"
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="text-2xl font-bold text-center">
                  <div 
                    className="text-[#ffbe4f] drop-shadow-lg mb-2"
                    style={{
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 190, 79, 0.4)',
                      filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
                    }}
                  >
                    Free
                  </div>
                  <div className="text-white">Virtual Consultation</div>
                </div>
              </motion.div>
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transition-all duration-300"
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.3)"
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="text-2xl font-bold text-center">
                  <div 
                    className="text-[#ffbe4f] drop-shadow-lg mb-2"
                    style={{
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 190, 79, 0.4)',
                      filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
                    }}
                  >
                    4 weeks
                  </div>
                  <div className="text-white">Follow-up</div>
                </div>
              </motion.div>
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transition-all duration-300"
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.3)"
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="text-2xl font-bold text-center">
                  <div 
                    className="text-[#ffbe4f] drop-shadow-lg mb-2"
                    style={{
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 190, 79, 0.4)',
                      filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
                    }}
                  >
                    1:1
                  </div>
                  <div className="text-white">Personalized Guidance</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedService(null)}
        >
          <motion.div
            className="bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const service = services.find(s => s.id === selectedService);
              if (!service) return null;
              
              return (
                <div className="p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="flex justify-center mb-3">
                      <FontAwesomeIcon 
                        icon={service.icon} 
                        className="text-5xl"
                        style={{ color: service.iconColor }}
                      />
                    </div>
                    <h2 className="text-3xl font-bold mb-2" style={{ color: service.iconColor }}>
                      {service.title}
                    </h2>
                    <p className="text-lg font-semibold text-[#0c457d] mb-1">
                      {service.subtitle}
                    </p>
                    <p className="text-base text-[#0c457d] mb-3">
                      {service.description}
                    </p>
                    <div className="text-2xl font-bold mb-1" style={{ color: service.iconColor }}>
                      {service.price}
                    </div>
                    <div className="text-base text-gray-600">
                      {service.priceUSD}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex-1 mb-6">
                    <h3 className="text-xl font-bold mb-4 text-[#0c457d] text-center">
                      What does this plan include?
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                      {service.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-2 p-3 rounded-lg bg-gray-50"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <FontAwesomeIcon 
                            icon={faCheckCircle} 
                            className="text-sm mt-0.5 flex-shrink-0"
                            style={{ color: service.iconColor }}
                          />
                          <span className="text-sm text-[#0c457d] leading-relaxed">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      type="primary"
                      size="large"
                      className="px-6 py-3 h-auto text-base font-semibold"
                      style={{
                        backgroundColor: service.iconColor,
                        borderColor: service.iconColor
                      }}
                      onClick={() => window.open('https://calendly.com/isabel10ramirez06', '_blank')}
                    >
                      Start Now!
                    </Button>
                    <Button
                      size="large"
                      className="px-6 py-3 h-auto text-base font-semibold"
                      onClick={() => setSelectedService(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;
