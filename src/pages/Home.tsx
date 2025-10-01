import { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined, HeartOutlined, TrophyOutlined, TeamOutlined } from '@ant-design/icons';
import { motion, useAnimation } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCrown, faCheckCircle, faStar, faDumbbell, faTimes } from '@fortawesome/free-solid-svg-icons';
import { HEADER_HEIGHT } from '../components/Header';
import SimpleEmailModal from '../components/SimpleEmailModal';
;



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
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [currentBenefitIndex, setCurrentBenefitIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const titleControls = useAnimation();
  const featuresSectionRef = useRef<HTMLElement>(null);
  const benefitsCarouselRef = useRef<HTMLElement>(null);

  // Handle email subscription success
  const handleEmailSuccess = (email: string) => {
    // Close the email modal
    setIsEmailModalOpen(false);
    
    // Redirect to Calendly with pre-filled information
    const calendlyUrl = `https://calendly.com/isabel10ramirez06/30min?name=${encodeURIComponent(email.split('@')[0])}&email=${encodeURIComponent(email)}`;
    window.open(calendlyUrl, '_blank');
  };

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
      quote: "Went from 3 cups of coffee daily to natural energy all day. Lost 15 pounds in 3 months!",
      author: "Sarah M., 24",
      icon: faStar,
      iconColor: "#10b981",
      category: "Energy & Weight"
    },
    {
      quote: "As a busy mom, I thought healthy eating was impossible. Isabel's meal prep strategies changed everything!",
      author: "María C., 26",
      icon: faDumbbell,
      iconColor: "#24604c",
      category: "Family Health"
    },
    {
      quote: "After my diabetes diagnosis, I was overwhelmed. Isabel made nutrition simple and sustainable - I feel amazing now!",
      author: "Roberto S., 28",
      icon: faHeart,
      iconColor: "#10b981",
      category: "Health Management"
    },
  ];

  const services = [
    {
      id: 1,
      title: "Transform",
      subtitle: "Complete 360° Transformation",
      description: "The ultimate nutrition coaching experience designed for deep, lasting change with comprehensive support.",
      icon: faCrown,
      iconColor: "#10b981",
      price: "USD 200 / month",
      features: [
        "60-min initial consultation & personalized plan",
        "Fully customized meal plan + shopping list",
        "Weekly 25-min virtual check-ins",
        "Monthly 30-min pantry makeover",
        "45-min guided grocery call",
        "Daily WhatsApp support (<24h response)",
        "Functional training plan",
        "30 premium recipes",
        "Exclusive community access",
        "Monthly challenges & weekly progress checklist"
      ]
    }
  ];

  const features = [
    {
      icon: <HeartOutlined className="text-4xl text-[#10b981]" />,
      title: "Science-Backed Methods",
      description: "Every strategy is grounded in the latest scientific research and proven clinical evidence.",
      image: "https://plus.unsplash.com/premium_photo-1723532517432-d04f548b212f?q=80&w=1586&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
      {
        icon: <TrophyOutlined className="text-4xl text-[#24604c]" />,
        title: "Transformative Outcomes",
        description: "Achieve lasting results that endure—sustainable transformation, not short-term fixes.",
        image: "https://images.unsplash.com/photo-1676131062088-1638d013cb61?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
    {
      icon: <TeamOutlined className="text-4xl text-[#90cbb9]" />,
      title: "Tailored Coaching",
      description: "Customized guidance that adapts to your unique goals and lifestyle.",
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
              Transform Your Health with{' '}
              <span className="text-[#10b981]">Expert Nutrition</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed opacity-95"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              Healthy never felt this good—let's make it your lifestyle. Discover personalized nutrition that transforms your energy, balances your hormones, and creates lasting habits backed by science.
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
                <div className="text-sm text-[#373837] mt-2 font-bold">Tailored Plans</div>
              </div>
              <div className="bg-[#24604c]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#24604c]/20">
                <AnimatedCounter end={50} suffix="+" />
                <div className="text-sm text-[#373837] mt-2 font-bold">Recipes & Meal Ideas</div>
              </div>
              <div className="bg-[#24604c]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#24604c]/20">
                <AnimatedCounter end={90} suffix="%" />
                <div className="text-sm text-[#373837] mt-2 font-bold">Report Improved Habits</div>
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
                  Start Your Journey <ArrowRightOutlined />
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
                  Learn More
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
              What Makes My Coaching Different?
            </motion.h2>
            <motion.p 
              className="text-xl max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ color: '#2E2E2E' }}
            >
              Unlike generic diet plans, my approach integrates advanced nutritional science with personalized strategies that work harmoniously with your body's natural processes.
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
      <section id="services" className="py-24 bg-gradient-to-br from-[#F7F7F7] via-white to-[#F0F9F6] relative overflow-hidden">

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
              My Service
            </motion.h2>
            <motion.p 
              className="text-xl max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ color: '#2E2E2E' }}
            >
              A comprehensive wellness program that transforms your relationship with food and creates lasting healthy habits.
            </motion.p>
          </div>
          
          <div className="max-w-5xl mx-auto">
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
                {/* Horizontal Service Card */}
                <motion.div 
                  className="relative rounded-2xl bg-gradient-to-r from-[#10b981]/5 via-white to-[#24604c]/5 shadow-xl shadow-[#10b981]/15 border-2 border-[#10b981]/20 overflow-hidden group"
                  whileHover={{ 
                    y: -6,
                    scale: 1.01,
                    boxShadow: "0 25px 50px -15px rgba(16, 185, 129, 0.3)"
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{
                    background: `linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(255,255,255,0.95) 30%, rgba(255,255,255,0.95) 70%, rgba(36, 96, 76, 0.05) 100%)`,
                    backdropFilter: 'blur(20px)'
                  }}
                >
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(circle at 20% 80%, ${service.iconColor} 0%, transparent 50%),
                                    radial-gradient(circle at 80% 20%, ${service.iconColor} 0%, transparent 50%),
                                    radial-gradient(circle at 40% 40%, ${service.iconColor} 0%, transparent 50%)`
                      }}
                    />
                  </div>
                  
                  <div className="flex flex-col lg:flex-row">
                    {/* Left Side - Visual & Title */}
                    <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                      {/* Premium Badge */}
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-[#10b981] to-[#24604c] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        PREMIUM
                      </div>

                      {/* Icon */}
                      <div className="mb-6">
                        <div 
                          className="relative p-6 rounded-2xl shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, ${service.iconColor}20, ${service.iconColor}10)`,
                            border: `2px solid ${service.iconColor}30`
                          }}
                        >
                          <FontAwesomeIcon 
                            icon={service.icon} 
                            className="text-5xl drop-shadow-lg"
                            style={{ color: service.iconColor }}
                          />
                        </div>
                      </div>
                      
                      {/* Title with gradient text */}
                      <h3 
                        className="text-3xl lg:text-4xl font-bold mb-3 relative z-10"
                        style={{ 
                          background: `linear-gradient(135deg, #2E2E2E, ${service.iconColor})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                      >
                        {service.title}
                      </h3>
                      
                      {/* Subtitle */}
                      <p className="text-lg font-semibold mb-4 relative z-10" style={{ color: '#2E2E2E' }}>
                        {service.subtitle}
                      </p>
                      
                      {/* Description */}
                      <p className="leading-relaxed mb-6 relative z-10 text-base max-w-sm" style={{ color: '#2E2E2E' }}>
                        {service.description}
                      </p>
                    </div>

                    {/* Right Side - Price & CTA */}
                    <div className="lg:w-1/2 p-6 lg:p-8 bg-gradient-to-br from-[#10b981]/10 to-[#24604c]/10 flex flex-col justify-center items-center">
                      {/* Price Section */}
                      <div className="text-center mb-6 relative z-10">
                        <div className="text-4xl lg:text-5xl font-bold mb-2" style={{ color: service.iconColor }}>
                          {service.price}
                        </div>
                        <div className="text-base text-gray-600 mb-3">Complete transformation package</div>
                        <div className="text-xs text-gray-500 max-w-xs">
                          Everything you need for lasting health transformation
                        </div>
                      </div>
                      
                      {/* Key Benefits Preview */}
                      <div className="mb-6 relative z-10">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faCheckCircle} className="text-[#10b981] text-sm" />
                            <span>Personalized Plans</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faCheckCircle} className="text-[#10b981] text-sm" />
                            <span>Daily Support</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faCheckCircle} className="text-[#10b981] text-sm" />
                            <span>Training Plan</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faCheckCircle} className="text-[#10b981] text-sm" />
                            <span>30+ Recipes</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Enhanced CTA Button */}
                      <div className="w-full max-w-xs relative z-10">
                        <motion.div
                          whileHover={{ 
                            scale: 1.05,
                            y: -2
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            type="primary"
                            size="large"
                            className="w-full hover:shadow-2xl transition-all duration-300 font-bold"
                            style={{
                              background: `linear-gradient(135deg, ${service.iconColor}, ${service.iconColor}dd)`,
                              borderColor: service.iconColor,
                              height: '48px',
                              fontSize: '16px',
                              fontWeight: '700',
                              borderRadius: '16px',
                              boxShadow: `0 8px 20px ${service.iconColor}40`,
                              border: 'none'
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedService(service.id);
                            }}
                          >
                            Learn more
                          </Button>
                        </motion.div>
                      </div>
                    </div>
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
              What You'll Achieve
            </motion.h2>
            <motion.p 
              className="text-xl max-w-3xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ color: '#2E2E2E' }}
            >
              These aren't just promises—they're the real transformations my clients experience when they commit to their wellness journey.
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
              What My Clients Say
            </motion.h2>
            <motion.p 
              className="text-xl max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ color: '#2E2E2E' }}
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
                  <span>100% Verified Reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-[#10b981]" />
                  <span>Real Client Stories</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-[#10b981]" />
                  <span>Privacy Protected</span>
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
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Transform Your Life?</h2>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-95">
              Be the next success story. Join others who've already transformed their energy, weight, and relationship with food. Your transformation starts with one decision.
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
                onClick={() => setIsEmailModalOpen(true)}
              >
                Get Started Today <ArrowRightOutlined />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="font-bold text-center">
                  <div className="text-3xl text-[#24604c] mb-2">
                    Free
                  </div>
                  <div className="text-sm text-white font-bold">Virtual Consultation</div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="font-bold text-center">
                  <div className="text-3xl text-[#24604c] mb-2">
                    4 weeks
                  </div>
                  <div className="text-sm text-white font-bold">Follow-up</div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="font-bold text-center">
                  <div className="text-3xl text-[#24604c] mb-2">
                    1:1
                  </div>
                  <div className="text-sm text-white font-bold">Personalized Guidance</div>
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
            className="bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden relative"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Corner Buttons */}
            <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10 sm:hidden">
              {/* CTA Button - Top Left */}
              <button
                onClick={() => setIsEmailModalOpen(true)}
                className="px-4 py-2 bg-[#10b981] text-white text-xs font-semibold rounded-xl border-none hover:!bg-[#24604c] hover:!border-[#24604c] hover:!text-white transition-all duration-300 flex items-center gap-1"
              >
                <FontAwesomeIcon icon={faCheckCircle} className="text-xs" />
                Start Now
              </button>
              
              {/* Close Button - Top Right */}
              <button
                onClick={() => setSelectedService(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} className="text-gray-600 text-sm" />
              </button>
            </div>
            {(() => {
              const service = services.find(s => s.id === selectedService);
              if (!service) return null;
              
              return (
                <div className="p-6 h-full flex flex-col pt-12 sm:pt-6">
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
                  </div>

                  {/* Features */}
                  <div className="flex-1 mb-6">
                    <h3 className="text-xl font-bold mb-4 text-black text-center">
                      What does this plan include?
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

                  {/* CTA Buttons - Desktop Only */}
                  <div className="hidden sm:flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      type="primary"
                      size="large"
                      className="px-6 py-3 h-auto text-base font-semibold hover:!bg-[#1a4a3c] hover:!border-[#1a4a3c] hover:!text-white"
                      style={{
                        backgroundColor: service.iconColor,
                        borderColor: service.iconColor
                      }}
                      onClick={() => setIsEmailModalOpen(true)}
                    >
                      Start Now!
                    </Button>
                    <Button
                      size="large"
                      className="px-6 py-3 h-auto text-base font-semibold hover:!bg-[#1a4a3c] hover:!border-[#1a4a3c] hover:!text-white"
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

      {/* Email Subscription Modal */}
      <SimpleEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onSuccess={handleEmailSuccess}
      />
    </div>
  );
};

export default HomePage;
