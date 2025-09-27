import { Button } from 'antd'
import { 
  HeartOutlined, 
  BulbOutlined,
  GlobalOutlined,
  SafetyOutlined,
  ArrowRightOutlined
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Helmet } from 'react-helmet-async'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faHeartbeat, faUsers } from '@fortawesome/free-solid-svg-icons'

const About: React.FC = () => {
  const { ref: missionRef } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const { ref: valuesRef } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  // Professional highlights images from Unsplash
  const professionalHighlights = [
    {
      title: "Nutrition Science",
      description: "Evidence-based approach using proven nutrition principles to help you reach your health goals.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      icon: faGraduationCap,
      iconColor: "#10b981"
    },
    {
      title: "Practical Solutions",
      description: "Real-world strategies that work with your schedule, budget, and lifestyle preferences.",
      image: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      icon: faHeartbeat,
      iconColor: "#24604c"
    },
    {
      title: "Personalized Support",
      description: "Tailored guidance and ongoing encouragement to help you build lasting healthy habits.",
      image: "https://plus.unsplash.com/premium_photo-1661602402476-33da1a389921?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      icon: faUsers,
      iconColor: "#90cbb9"
    }
  ]


  const values = [
    {
      icon: <SafetyOutlined className="text-3xl" style={{ color: '#10b981' }} />,
      title: 'Personalized Plans',
      description: 'Custom nutrition strategies that fit your lifestyle, preferences, and goals.'
    },
    {
      icon: <HeartOutlined className="text-3xl" style={{ color: '#24604c' }} />,
      title: 'Sustainable Approach',
      description: 'No extreme diets. Just practical habits that feel natural and enjoyable.'
    },
    {
      icon: <BulbOutlined className="text-3xl" style={{ color: '#90cbb9' }} />,
      title: 'Evidence-Based',
      description: 'Strategies backed by research and proven methods for real results.'
    },
    {
      icon: <GlobalOutlined className="text-3xl" style={{ color: '#10b981' }} />,
      title: 'Ongoing Support',
      description: 'Guidance and encouragement to help you stay on track and succeed.'
    }
  ]



  return (
    <>
      <Helmet>
        <title>About Me - Whole Bite</title>
        <meta name="description" content="Learn about Isabel Diez's mission as a certified nutritionist specializing in functional nutrition, balance, and creating lasting healthy habits." />
      </Helmet>

      <div className="min-h-screen bg-white font-sans">
        {/* About Me Header */}
        <section className="bg-gradient-to-br from-[#F7F7F7] via-white to-[#F0FDF4] py-24 relative overflow-hidden">
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
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <motion.h1 
                className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ 
                  background: 'linear-gradient(135deg, #2E2E2E 0%, #10b981 50%, #24604c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                About Me
              </motion.h1>
              
              <motion.p 
                className="text-2xl md:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Meet the nutritionist and health coach behind{' '}
                <span className="text-[#10b981] font-semibold">Whole Bite</span>
              </motion.p>
              
              <motion.div
                className="flex flex-wrap justify-center gap-4 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="bg-white px-4 py-2 rounded-full shadow-md border border-[#10b981]/20 flex items-center gap-2">
                  <FontAwesomeIcon icon={faGraduationCap} className="text-[#10b981]" />
                  Certified Nutritionist
                </span>
                <span className="bg-white px-4 py-2 rounded-full shadow-md border border-[#10b981]/20 flex items-center gap-2">
                  <FontAwesomeIcon icon={faHeartbeat} className="text-[#24604c]" />
                  Health Coach
                </span>
                <span className="bg-white px-4 py-2 rounded-full shadow-md border border-[#10b981]/20 flex items-center gap-2">
                  <FontAwesomeIcon icon={faUsers} className="text-[#90cbb9]" />
                  Sustainable Living
                </span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Personal Introduction */}
        <section className="py-20 bg-white relative overflow-hidden">
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
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Image */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="relative">
                    <img 
                      src="https://plus.unsplash.com/premium_photo-1733342485605-42058eb2daf3?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                      alt="Isabel Diez - Professional Nutritionist" 
                      className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
                      style={{ objectPosition: "center center" }}
                    />
                    
                    {/* Floating badges */}
                    <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-[#24604c]/20">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#10b981] rounded-full flex items-center justify-center">
                          <FontAwesomeIcon icon={faGraduationCap} className="text-white text-xl" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[#2E2E2E]">Certified</div>
                          <div className="text-xs text-gray-600">Nutritionist Dietitian</div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-[#24604c]/20">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#24604c] rounded-full flex items-center justify-center">
                          <FontAwesomeIcon icon={faHeartbeat} className="text-white text-xl" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[#2E2E2E]">Functional</div>
                          <div className="text-xs text-gray-600">Nutrition Expert</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl font-bold mb-6" style={{ color: '#2E2E2E' }}>
                    Hi, I'm Isabel Diez
                  </h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    <strong className="text-[#24604c]">Nutritionist & Health Coach</strong>
                  </p>
                  <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                    At Whole Bite, we believe healthy eating shouldn't be complicated. Our mission is to make nutrition simple, sustainable, and realistic—so it fits into your life.
                  </p>
                  
                  {/* Key Features */}
                  <div className="bg-gradient-to-r from-[#24604c]/5 to-[#10b981]/5 rounded-2xl p-6 border-l-4 border-[#10b981] mb-8">
                    <ul className="space-y-3">
                      <li className="flex items-center text-lg text-[#2E2E2E]">
                        <div className="w-2 h-2 bg-[#10b981] rounded-full mr-4 flex-shrink-0"></div>
                        <span><strong className="text-[#24604c]">Healthy recipes</strong> for busy lifestyles</span>
                      </li>
                      <li className="flex items-center text-lg text-[#2E2E2E]">
                        <div className="w-2 h-2 bg-[#10b981] rounded-full mr-4 flex-shrink-0"></div>
                        <span><strong className="text-[#24604c]">Habits</strong> that truly last</span>
                      </li>
                      <li className="flex items-center text-lg text-[#2E2E2E]">
                        <div className="w-2 h-2 bg-[#10b981] rounded-full mr-4 flex-shrink-0"></div>
                        <span><strong className="text-[#24604c]">Personalized support</strong> every step of the way</span>
                      </li>
                    </ul>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="primary"
                      size="large"
                      className="bg-[#10b981] text-white font-semibold border-none px-8 py-4 rounded-full shadow-lg transition-all duration-300 text-lg hover:!bg-[#24604c] hover:!text-white"
                      onClick={() => window.open('https://calendly.com/isabel10ramirez06', '_blank')}
                    >
                      Book Consultation <ArrowRightOutlined />
                    </Button>
                    <Button
                      size="large"
                      className="bg-transparent text-[#373837] border-2 border-[#373837] px-8 py-4 rounded-full transition-all duration-300 text-lg hover:!bg-[#24604c] hover:!border-[#24604c] hover:!text-white"
                      href="/calculator"
                    >
                      Free Calculator
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* My Approach Section */}
        <section ref={missionRef} className="py-20 bg-[#F7F7F7] relative overflow-hidden">
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
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ color: '#2E2E2E' }}
              >
                My Approach
              </motion.h2>
              <motion.p 
                className="text-xl leading-relaxed text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                As a certified nutritionist and health coach, I believe in creating sustainable nutrition solutions that work with your real life, not against it.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {professionalHighlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Highlight Card */}
                  <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#24604c]/10 via-[#24604c]/5 to-white border border-[#24604c]/20 shadow-lg shadow-black/8 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={highlight.image} 
                        alt={highlight.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      
                      {/* Icon Overlay */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                        <FontAwesomeIcon 
                          icon={highlight.icon} 
                          className="text-2xl"
                          style={{ color: highlight.iconColor }}
                        />
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <h3 
                        className="text-2xl font-bold mb-4 text-center"
                        style={{ color: '#2E2E2E' }}
                      >
                        {highlight.title}
                      </h3>
                      
                      <p 
                        className="leading-relaxed text-lg text-center flex-1 flex items-center justify-center"
                        style={{ color: '#2E2E2E' }}
                      >
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* My Values Section */}
        <section ref={valuesRef} className="py-20 bg-white relative overflow-hidden">
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
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ color: '#2E2E2E' }}
              >
                My Values
              </motion.h2>
              <motion.p 
                className="text-xl leading-relaxed text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                These are the principles that guide how I work with my clients to create lasting change.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="h-full text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 p-8 rounded-2xl bg-gradient-to-br from-[#24604c]/10 via-[#24604c]/5 to-white border border-[#24604c]/20">
                    <div className="mb-6 flex justify-center">{value.icon}</div>
                    <h4 className="text-xl font-bold mb-4" style={{ color: '#2E2E2E' }}>{value.title}</h4>
                    <p className="leading-relaxed" style={{ color: '#2E2E2E' }}>
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* Contact CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#10b981] via-[#90cbb9] to-[#24604c] text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20 blur-sm">
            <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full"></div>
          </div>
          
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Let's Work Together
              </motion.h2>
              <motion.p 
                className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-95"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                I'm here to help you create sustainable nutrition habits that work with your lifestyle. Let's start your journey to better health.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="primary"
                    size="large"
                    className="bg-[#24604c] text-white font-semibold border-none px-12 py-4 rounded-full shadow-lg transition-all duration-300 text-lg hover:!bg-white hover:!border-white hover:!text-[#24604c]"
                    onClick={() => window.open('https://calendly.com/isabel10ramirez06', '_blank')}
                  >
                    Book Your Consultation <ArrowRightOutlined />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="large"
                    className="bg-transparent text-white border-2 border-white px-12 py-4 rounded-full transition-all duration-300 text-lg hover:!bg-white hover:!border-white hover:!text-[#24604c]"
                    href="/calculator"
                  >
                    Try Free Calculator
                  </Button>
                </motion.div>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="font-bold text-center">
                    <div className="text-3xl text-[#24604c] mb-2">
                      Free
                    </div>
                    <div className="text-sm text-white font-bold">Initial Consultation</div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="font-bold text-center">
                    <div className="text-3xl text-[#24604c] mb-2">
                      24/7
                    </div>
                    <div className="text-sm text-white font-bold">Support Access</div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="font-bold text-center">
                    <div className="text-3xl text-[#24604c] mb-2">
                      100%
                    </div>
                    <div className="text-sm text-white font-bold">Personalized Plans</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default About