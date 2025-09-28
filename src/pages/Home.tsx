import { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined, HeartOutlined, TrophyOutlined, TeamOutlined } from '@ant-design/icons';
import { motion, useAnimation } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faHeart, faCrown, faCheckCircle, faStar, faDumbbell,  } from '@fortawesome/free-solid-svg-icons';
import { HEADER_HEIGHT } from '../components/Header';
import { useTranslation } from 'react-i18next';



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
      
      // Use a smoother easing function
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = easeOutCubic * end;
      
      // Always round to nearest integer for smooth progression
      const roundedValue = Math.round(currentValue);
      
      // Ensure we never exceed the end value and provide smooth increment
      setCount(Math.min(roundedValue, end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Guarantee final value is set
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span 
      id={`counter-${end}`} 
      className="text-3xl font-bold text-[#24604c]"
    >
      {count}{suffix}
    </span>
  );
};

const HomePage = () => {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [currentBenefitIndex, setCurrentBenefitIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const titleControls = useAnimation();
  const featuresSectionRef = useRef<HTMLElement>(null);
  const benefitsCarouselRef = useRef<HTMLElement>(null);

  // Benefits data
  const benefits = [
    {
      title: t('home.benefits.sustainedEnergy.title'),
      description: t('home.benefits.sustainedEnergy.description'),
      image: "https://images.unsplash.com/photo-1607914660217-754fdd90041d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: t('home.benefits.restorativeSleep.title'),
      description: t('home.benefits.restorativeSleep.description'),
      image: "https://images.unsplash.com/flagged/photo-1555697752-da25a4b1025b?q=80&w=1710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: t('home.benefits.weightBalance.title'),
      description: t('home.benefits.weightBalance.description'),
      image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: t('home.benefits.peakPerformance.title'),
      description: t('home.benefits.peakPerformance.description'),
      image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: t('home.benefits.foodFreedom.title'),
      description: t('home.benefits.foodFreedom.description'),
      image: "https://images.unsplash.com/photo-1556911073-a517e752729c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: t('home.benefits.lifelongVitality.title'),
      description: t('home.benefits.lifelongVitality.description'),
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
      quote: t('home.testimonials.sarah.quote'),
      author: t('home.testimonials.sarah.author'),
      icon: faStar,
      iconColor: "#10b981",
      category: t('home.testimonials.sarah.category')
    },
    {
      quote: t('home.testimonials.maria.quote'),
      author: t('home.testimonials.maria.author'),
      icon: faDumbbell,
      iconColor: "#24604c",
      category: t('home.testimonials.maria.category')
    },
    {
      quote: t('home.testimonials.roberto.quote'),
      author: t('home.testimonials.roberto.author'),
      icon: faHeart,
      iconColor: "#10b981",
      category: t('home.testimonials.roberto.category')
    },
  ];

  const services = [
    {
      id: 1,
      title: t('home.services.kickstart.title'),
      subtitle: t('home.services.kickstart.subtitle'),
      description: t('home.services.kickstart.description'),
      icon: faRocket,
      iconColor: "#10b981",
      price: t('home.services.kickstart.price'),
      priceUSD: t('home.services.kickstart.priceUSD'),
      features: [
        "Initial consultation (60 min) + complete diagnosis with personalized plan",
        "100% customized meal plan designed for your goals",
        "Shopping list tailored to your plan",
        "Plan adjustments every 2 weeks",
        "Mini recipe book (5 practical recipes)",
        "Exclusive access to private community (WhatsApp/Telegram)"
      ]
    },
    {
      id: 2,
      title: t('home.services.lifestyle.title'),
      subtitle: t('home.services.lifestyle.subtitle'),
      description: t('home.services.lifestyle.description'),
      icon: faHeart,
      iconColor: "#24604c",
      price: t('home.services.lifestyle.price'),
      priceUSD: t('home.services.lifestyle.priceUSD'),
      features: [
        "Everything from the Kickstart plan",
        "Individual weekly follow-up (25 min virtual)",
        "Monthly pantry makeover call (30 min virtual session)",
        "Weekly progress checklist",
        "Extended recipe book (15 recipes)",
        "Direct chat (response < 24h)"
      ]
    },
    {
      id: 3,
      title: t('home.services.transform.title'),
      subtitle: t('home.services.transform.subtitle'),
      description: t('home.services.transform.description'),
      icon: faCrown,
      iconColor: "#10b981",
      price: t('home.services.transform.price'),
      priceUSD: t('home.services.transform.priceUSD'),
      features: [
        "Everything from the Lifestyle plan",
        "Daily WhatsApp review of meals & habits",
        "Shop smart & healthy with ease: 45-min guided grocery call",
        "Functional training plan with certified trainer",
        "Premium recipe book (+30 recipes)",
        "Access to exclusive monthly challenges based on your nutritional goals"
      ]
    }
  ];

  const features = [
    {
      icon: <HeartOutlined className="text-4xl text-[#10b981]" />,
      title: t('home.features.scienceBacked.title'),
      description: t('home.features.scienceBacked.description'),
      image: "https://plus.unsplash.com/premium_photo-1723532517432-d04f548b212f?q=80&w=1586&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
      {
        icon: <TrophyOutlined className="text-4xl text-[#24604c]" />,
        title: t('home.features.transformativeOutcomes.title'),
        description: t('home.features.transformativeOutcomes.description'),
        image: "https://images.unsplash.com/photo-1676131062088-1638d013cb61?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
    {
      icon: <TeamOutlined className="text-4xl text-[#90cbb9]" />,
      title: t('home.features.tailoredCoaching.title'),
      description: t('home.features.tailoredCoaching.description'),
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F7] font-sans">
      {/* Hero Section */}
      <section className="bg-white text-[#373837] relative overflow-hidden" style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
        {/* Floating Bubbles with Light Green Fade */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-24 h-24 rounded-full opacity-20 blur-sm"
            style={{
              background: `radial-gradient(circle, #b2d4c7 0%, #90cbb9 30%, transparent 70%)`
            }}
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
            className="absolute top-40 right-20 w-32 h-32 rounded-full opacity-20 blur-sm"
            style={{
              background: `radial-gradient(circle, #b2d4c7 0%, #10b981 40%, transparent 80%)`
            }}
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
            className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full opacity-20 blur-sm"
            style={{
              background: `radial-gradient(circle, #90cbb9 0%, #b2d4c7 50%, transparent 90%)`
            }}
            animate={{
              y: [0, -8, 0],
              x: [0, 5, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/3 w-16 h-16 rounded-full opacity-20 blur-sm"
            style={{
              background: `radial-gradient(circle, #b2d4c7 0%, transparent 60%)`
            }}
            animate={{
              y: [0, -10, 0],
              x: [0, 4, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-10 w-28 h-28 rounded-full opacity-20 blur-sm"
            style={{
              background: `radial-gradient(circle, #10b981 0%, #90cbb9 30%, transparent 70%)`
            }}
            animate={{
              y: [0, 15, 0],
              x: [0, -7, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10 flex items-center justify-center" style={{ minHeight: `calc(100dvh - ${HEADER_HEIGHT}px)` }}>
          <div className="max-w-5xl mx-auto">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-8 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {t('home.hero.title')}{' '}
              <span className="text-[#10b981]">{t('home.hero.titleHighlight')}</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed opacity-95"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              {t('home.hero.subtitle')}
            </motion.p>
            
            {/* Stats Row */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
              <div className="bg-[#24604c]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#24604c]/20">
                <AnimatedCounter end={100} suffix="%" />
                <div className="text-sm text-[#373837] mt-2 font-bold">{t('home.hero.stats.tailoredPlans')}</div>
              </div>
              <div className="bg-[#24604c]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#24604c]/20">
                <AnimatedCounter end={50} suffix="+" />
                <div className="text-sm text-[#373837] mt-2 font-bold">{t('home.hero.stats.recipes')}</div>
              </div>
              <div className="bg-[#24604c]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#24604c]/20">
                <AnimatedCounter end={90} suffix="%" />
                <div className="text-sm text-[#373837] mt-2 font-bold">{t('home.hero.stats.improvedHabits')}</div>
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
                  className="bg-[#10b981] text-white font-semibold border-none px-10 py-4 rounded-full shadow-lg transition-all duration-300 text-lg hover:!bg-[#24604c] hover:!text-white"
                  href="#contact"
                >
                  {t('home.hero.cta.startJourney')} <ArrowRightOutlined />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="large"
                  className="bg-transparent text-[#373837] border-2 border-[#373837] px-10 py-4 rounded-full transition-all duration-300 text-lg hover:!bg-[#24604c] hover:!border-[#24604c] hover:!text-white"
                  href="#services"
                >
                  {t('home.hero.cta.learnMore')}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresSectionRef} className="py-24 bg-white relative overflow-hidden">
        {/* Floating Bubbles with Light Green Fade */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-24 h-24 rounded-full opacity-20 blur-sm"
            style={{
              background: `radial-gradient(circle, #b2d4c7 0%, #90cbb9 30%, transparent 70%)`
            }}
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
            className="absolute top-40 right-20 w-32 h-32 rounded-full opacity-20 blur-sm"
            style={{
              background: `radial-gradient(circle, #b2d4c7 0%, #10b981 40%, transparent 80%)`
            }}
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
            className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full opacity-20 blur-sm"
            style={{
              background: `radial-gradient(circle, #90cbb9 0%, #b2d4c7 50%, transparent 90%)`
            }}
            animate={{
              y: [0, -8, 0],
              x: [0, 5, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/3 w-16 h-16 rounded-full opacity-20 blur-sm"
            style={{
              background: `radial-gradient(circle, #b2d4c7 0%, transparent 60%)`
            }}
            animate={{
              y: [0, -10, 0],
              x: [0, 4, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-10 w-28 h-28 rounded-full opacity-20 blur-sm"
            style={{
              background: `radial-gradient(circle, #10b981 0%, #90cbb9 30%, transparent 70%)`
            }}
            animate={{
              y: [0, 15, 0],
              x: [0, -7, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ color: '#2E2E2E' }}
            >
              {t('home.features.title')}
            </motion.h2>
            <motion.p 
              className="text-xl max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ color: '#2E2E2E' }}
            >
              {t('home.features.subtitle')}
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Feature Card */}
                <div 
                  className={`
                    relative rounded-2xl overflow-hidden h-[377.75px] flex flex-col
                    ${index === 0 ? 'bg-gradient-to-br from-[#24604c]/10 via-[#24604c]/5 to-white border border-[#24604c]/20' : ''}
                    ${index === 1 ? 'bg-gradient-to-br from-[#24604c]/10 via-[#24604c]/5 to-white border border-[#24604c]/20' : ''}
                    ${index === 2 ? 'bg-gradient-to-br from-[#24604c]/10 via-[#24604c]/5 to-white border border-[#24604c]/20' : ''}
                    shadow-lg shadow-black/8 hover:shadow-xl transition-all duration-300
                  `}
                >
                  
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className={`w-full h-full object-cover ${
                        feature.title === "Transformative Outcomes" ? "object-center" : "object-center"
                      }`}
                      style={
                        feature.title === "Transformative Outcomes" ? { objectPosition: "center 45%" } : 
                        feature.title === "Tailored Coaching" ? { objectPosition: "center 30%" } : {}
                      }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    
                    {/* Icon Overlay */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                      {feature.icon}
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-1 justify-center">
                    {/* Title */}
                    <h3 
                      className="text-2xl font-bold mb-4 text-center"
                      style={{ color: '#2E2E2E' }}
                    >
                      {feature.title}
                    </h3>
                    
                    {/* Description */}
                    <p 
                      className="leading-relaxed text-lg text-center flex-1 flex items-center"
                      style={{ color: '#2E2E2E' }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-[#F7F7F7] relative overflow-hidden">
        {/* Floating Bubbles with Light Green Fade */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-24 h-24 rounded-full opacity-20 blur-sm"
            style={{
              background: `radial-gradient(circle, #b2d4c7 0%, #90cbb9 30%, transparent 70%)`
            }}
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
            className="absolute top-40 right-20 w-32 h-32 rounded-full opacity-20 blur-sm"
            style={{
              background: `radial-gradient(circle, #b2d4c7 0%, #10b981 40%, transparent 80%)`
            }}
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
            className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full opacity-20 blur-sm"
            style={{
              background: `radial-gradient(circle, #90cbb9 0%, #b2d4c7 50%, transparent 90%)`
            }}
            animate={{
              y: [0, -8, 0],
              x: [0, 5, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/3 w-16 h-16 rounded-full opacity-20 blur-sm"
            style={{
              background: `radial-gradient(circle, #b2d4c7 0%, transparent 60%)`
            }}
            animate={{
              y: [0, -10, 0],
              x: [0, 4, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-10 w-28 h-28 rounded-full opacity-20 blur-sm"
            style={{
              background: `radial-gradient(circle, #10b981 0%, #90cbb9 30%, transparent 70%)`
            }}
            animate={{
              y: [0, 15, 0],
              x: [0, -7, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ color: '#2E2E2E' }}
            >
              {t('home.services.title')}
            </motion.h2>
            <motion.p 
              className="text-xl max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ color: '#2E2E2E' }}
            >
              {t('home.services.subtitle')}
            </motion.p>
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
                  className="relative p-8 rounded-2xl bg-gradient-to-br from-[#24604c]/10 via-[#24604c]/5 to-white shadow-lg shadow-black/8 h-full flex flex-col border border-[#24604c]/20"
                  whileHover={{ 
                    y: -4,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {/* Background Glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-5"
                    style={{
                      background: `radial-gradient(circle, ${service.iconColor} 0%, transparent 70%)`
                    }}
                  />
                  
                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="relative">
                      <FontAwesomeIcon 
                        icon={service.icon} 
                        className="text-4xl"
                        style={{ color: service.iconColor }}
                      />
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 
                    className="text-2xl font-bold mb-2 text-center relative z-10"
                    style={{ color: '#2E2E2E' }}
                  >
                    {service.title}
                  </h3>
                  
                  {/* Subtitle */}
                  <p className="text-lg font-semibold text-center mb-4 relative z-10" style={{ color: '#2E2E2E' }}>
                    {service.subtitle}
                  </p>
                  
                  {/* Description */}
                  <p className="leading-relaxed text-center mb-6 relative z-10 flex-grow" style={{ color: '#2E2E2E' }}>
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
                  <div className="text-center relative z-10 mt-auto">
                    <Button
                      type="primary"
                      size="large"
                      className="w-full hover:shadow-lg hover:!bg-[#373837] hover:!border-[#373837] hover:!text-white"
                      style={{
                        backgroundColor: service.iconColor,
                        borderColor: service.iconColor,
                        height: '48px',
                        fontSize: '16px',
                        fontWeight: '600'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedService(service.id);
                      }}
                    >
                      {t('home.services.kickstart.learnMore')}
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

       {/* Benefits Carousel Section */}
       <section ref={benefitsCarouselRef} className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
         {/* Floating Bubbles with Light Green Fade */}
         <div className="absolute inset-0 overflow-hidden">
           <motion.div
             className="absolute top-20 left-10 w-24 h-24 rounded-full opacity-20 blur-sm"
             style={{
               background: `radial-gradient(circle, #b2d4c7 0%, #90cbb9 30%, transparent 70%)`
             }}
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
             className="absolute top-40 right-20 w-32 h-32 rounded-full opacity-20 blur-sm"
             style={{
               background: `radial-gradient(circle, #b2d4c7 0%, #10b981 40%, transparent 80%)`
             }}
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
             className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full opacity-20 blur-sm"
             style={{
               background: `radial-gradient(circle, #90cbb9 0%, #b2d4c7 50%, transparent 90%)`
             }}
             animate={{
               y: [0, -8, 0],
               x: [0, 5, 0],
               scale: [1, 1.2, 1]
             }}
             transition={{
               duration: 12,
               repeat: Infinity,
               ease: "easeInOut",
               delay: 2
             }}
           />
           <motion.div
             className="absolute top-1/3 right-1/3 w-16 h-16 rounded-full opacity-20 blur-sm"
             style={{
               background: `radial-gradient(circle, #b2d4c7 0%, transparent 60%)`
             }}
             animate={{
               y: [0, -10, 0],
               x: [0, 4, 0],
               scale: [1, 1.3, 1]
             }}
             transition={{
               duration: 9,
               repeat: Infinity,
               ease: "easeInOut",
               delay: 3
             }}
           />
           <motion.div
             className="absolute bottom-1/3 right-10 w-28 h-28 rounded-full opacity-20 blur-sm"
             style={{
               background: `radial-gradient(circle, #10b981 0%, #90cbb9 30%, transparent 70%)`
             }}
             animate={{
               y: [0, 15, 0],
               x: [0, -7, 0],
               scale: [1, 0.8, 1]
             }}
             transition={{
               duration: 11,
               repeat: Infinity,
               ease: "easeInOut",
               delay: 4
             }}
           />
         </div>

         <div className="container mx-auto px-6 relative z-10">
           <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ color: '#2E2E2E' }}
            >
              {t('home.benefits.title')}
            </motion.h2>
            <motion.p 
              className="text-xl max-w-3xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ color: '#2E2E2E' }}
            >
              {t('home.benefits.subtitle')}
            </motion.p>
           </div>

           {/* Modern Carousel Container */}
           <div className="max-w-7xl mx-auto">
             <div className="relative">
               {/* 3D Carousel */}
              <div className="relative overflow-hidden rounded-2xl shadow-lg max-w-4xl mx-auto">
                {/* Navigation Arrows */}
                <button
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#10b981]/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#10b981] transition-all duration-300 z-20"
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentBenefitIndex(prev => prev === 0 ? benefits.length - 1 : prev - 1);
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#10b981]/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#10b981] transition-all duration-300 z-20"
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentBenefitIndex(prev => prev === benefits.length - 1 ? 0 : prev + 1);
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                 <div 
                   className="flex transition-transform duration-700 ease-out"
                   style={{ transform: `translateX(-${currentBenefitIndex * 100}%)` }}
                 >
                   {benefits.map((benefit, index) => (
                     <div key={index} className="w-full flex-shrink-0">
                       <div className="relative min-h-[400px] overflow-hidden rounded-2xl">
                         {/* Background Image */}
                         <div className="absolute inset-0">
                           <img
                             src={benefit.image}
                             alt={benefit.title}
                             className="w-full h-full object-cover"
                             style={index === 0 ? { objectPosition: "center 70%" } : {}}
                           />
                           
                           {/* Dark Overlay for Text Readability */}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                         </div>

                         {/* Badge */}
                         <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg z-10">
                           <span className="text-xs font-bold text-[#10b981]">
                             {index + 1} / {benefits.length}
                           </span>
                         </div>

                         {/* Text Content */}
                         <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                           <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                             {benefit.title}
                           </h3>
                           
                           <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-xl">
                             {benefit.description}
                           </p>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>

               {/* Bottom Controls */}
               <div className="flex justify-center items-center mt-6 space-x-3">
                 {/* Play/Pause Button */}
                 <button
                   className="w-12 h-12 bg-[#10b981] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[#24604c] transition-all duration-300"
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
                 </button>

                 {/* Dots Navigation */}
                 <div className="flex space-x-2">
                   {benefits.map((_, index) => (
                     <button
                       key={index}
                       className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                         index === currentBenefitIndex 
                           ? 'bg-[#10b981] scale-125' 
                           : 'bg-gray-300 hover:bg-gray-400'
                       }`}
                       onClick={() => {
                         setIsAutoPlaying(false);
                         setCurrentBenefitIndex(index);
                       }}
                     />
                   ))}
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Floating Bubbles with Light Green Fade */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-24 h-24 rounded-full opacity-20 blur-sm"
            style={{
              background: `radial-gradient(circle, #b2d4c7 0%, #90cbb9 30%, transparent 70%)`
            }}
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
            className="absolute top-40 right-20 w-32 h-32 rounded-full opacity-20 blur-sm"
            style={{
              background: `radial-gradient(circle, #b2d4c7 0%, #10b981 40%, transparent 80%)`
            }}
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
            className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full opacity-20 blur-sm"
            style={{
              background: `radial-gradient(circle, #90cbb9 0%, #b2d4c7 50%, transparent 90%)`
            }}
            animate={{
              y: [0, -8, 0],
              x: [0, 5, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/3 w-16 h-16 rounded-full opacity-20 blur-sm"
            style={{
              background: `radial-gradient(circle, #b2d4c7 0%, transparent 60%)`
            }}
            animate={{
              y: [0, -10, 0],
              x: [0, 4, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-10 w-28 h-28 rounded-full opacity-20 blur-sm"
            style={{
              background: `radial-gradient(circle, #10b981 0%, #90cbb9 30%, transparent 70%)`
            }}
            animate={{
              y: [0, 15, 0],
              x: [0, -7, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ color: '#2E2E2E' }}
            >
              {t('home.testimonials.title')}
            </motion.h2>
            <motion.p 
              className="text-xl max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ color: '#2E2E2E' }}
            >
              {t('home.testimonials.subtitle')}
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
                    className="relative p-8 rounded-3xl bg-gradient-to-br from-[#24604c]/10 via-[#24604c]/5 to-white shadow-lg shadow-black/8 h-full flex flex-col border border-[#24604c]/20"
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
                      <p className="text-lg leading-relaxed italic" style={{ color: '#2E2E2E' }}>
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
                          <p className="font-semibold text-lg" style={{ color: '#2E2E2E' }}>{testimonial.author}</p>
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
                  <FontAwesomeIcon icon={faCheckCircle} className="text-[#10b981]" />
                  <span>{t('home.testimonials.verifiedReviews')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-[#10b981]" />
                  <span>{t('home.testimonials.realStories')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-[#10b981]" />
                  <span>{t('home.testimonials.privacyProtected')}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-24 bg-gradient-to-br from-[#10b981] via-[#90cbb9] to-[#24604c] text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20 blur-sm">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">{t('home.contact.title')}</h2>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-95">
              {t('home.contact.subtitle')}
            </p>
            
            <div className="flex justify-center items-center mb-12">
              <Button
                type="primary"
                size="large"
                className="bg-[#24604c] text-white font-semibold border-none px-12 py-4 rounded-full shadow-lg transition-all duration-300 text-lg hover:!bg-white hover:!border-white hover:!text-[#24604c] cursor-pointer"
                style={{
                  background: '#24604c',
                  borderColor: '#24604c'
                }}
                onClick={() => window.open('https://calendly.com/isabel10ramirez06', '_blank')}
              >
                {t('home.contact.getStarted')} <ArrowRightOutlined />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="font-bold text-center">
                  <div className="text-3xl text-[#24604c] mb-2">
                    {t('home.contact.freeConsultation')}
                  </div>
                  <div className="text-sm text-white font-bold">{t('home.contact.virtualConsultation')}</div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="font-bold text-center">
                  <div className="text-3xl text-[#24604c] mb-2">
                    {t('home.contact.followUp')}
                  </div>
                  <div className="text-sm text-white font-bold">{t('home.contact.followUpText')}</div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="font-bold text-center">
                  <div className="text-3xl text-[#24604c] mb-2">
                    {t('home.contact.personalizedGuidance')}
                  </div>
                  <div className="text-sm text-white font-bold">{t('home.contact.personalizedGuidanceText')}</div>
                </div>
              </div>
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
                    <p className="text-lg font-semibold text-black mb-1">
                      {service.subtitle}
                    </p>
                    <p className="text-base text-black mb-3">
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
                    <h3 className="text-xl font-bold mb-4 text-black text-center">
                      {t('home.serviceModal.whatIncludes')}
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                      {service.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-2 p-3 rounded-lg bg-gray-50 border"
                          style={{ borderColor: `${service.iconColor}40` }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <FontAwesomeIcon 
                            icon={faCheckCircle} 
                            className="text-sm mt-0.5 flex-shrink-0"
                            style={{ color: service.iconColor }}
                          />
                          <span className="text-sm text-black leading-relaxed">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      type="primary"
                      size="large"
                      className="px-6 py-3 h-auto text-base font-semibold hover:!bg-[#1a4a3c] hover:!border-[#1a4a3c] hover:!text-white"
                      style={{
                        backgroundColor: service.iconColor,
                        borderColor: service.iconColor
                      }}
                      onClick={() => window.open('https://calendly.com/isabel10ramirez06', '_blank')}
                    >
                      {t('home.serviceModal.startNow')}
                    </Button>
                    <Button
                      size="large"
                      className="px-6 py-3 h-auto text-base font-semibold hover:!bg-[#1a4a3c] hover:!border-[#1a4a3c] hover:!text-white"
                      onClick={() => setSelectedService(null)}
                    >
                      {t('home.serviceModal.close')}
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
