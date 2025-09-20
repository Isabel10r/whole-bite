import { Timeline, Button } from 'antd'
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
      title: "Academic Excellence",
      description: "Earned my degree from a prestigious university program, gaining deep expertise in nutritional science and metabolism.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      icon: faGraduationCap,
      iconColor: "#10b981"
    },
    {
      title: "Root-Cause Focus",
      description: "I don't just treat symptoms—I investigate and address the underlying factors that impact your health and energy.",
      image: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      icon: faHeartbeat,
      iconColor: "#24604c"
    },
    {
      title: "Supportive Community",
      description: "My clients become part of a caring network where everyone feels heard, encouraged, and celebrated for their progress.",
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      icon: faUsers,
      iconColor: "#90cbb9"
    }
  ]


  const values = [
    {
      icon: <SafetyOutlined className="text-3xl" style={{ color: '#10b981' }} />,
      title: 'Personalized Commitment',
      description: 'Your plan is designed specifically for you—built around your lifestyle, preferences, and goals, with continuous support to guarantee success.'
    },
    {
      icon: <HeartOutlined className="text-3xl" style={{ color: '#24604c' }} />,
      title: 'Sustainable Balance',
      description: 'Forget extreme diets and restrictions. I help you develop a positive, flexible relationship with food that feels natural and enjoyable.'
    },
    {
      icon: <BulbOutlined className="text-3xl" style={{ color: '#90cbb9' }} />,
      title: 'Science-Driven Results',
      description: 'Every strategy is backed by current research and proven methods, giving you confidence that your efforts will lead to real, measurable outcomes.'
    },
    {
      icon: <GlobalOutlined className="text-3xl" style={{ color: '#10b981' }} />,
      title: 'Empathetic Support',
      description: 'Change isn\'t always easy. I provide understanding, encouragement, and practical solutions to help you navigate challenges with confidence.'
    }
  ]

  const milestones = [
    {
      year: '2018',
      title: 'Academic Foundation',
      description: 'Began intensive university studies in Nutrition and Dietetics, mastering the science of how food impacts our bodies at the cellular level.'
    },
    {
      year: '2020',
      title: 'Functional Medicine Specialization',
      description: 'Dove deep into functional approaches, learning to uncover why health issues occur and how targeted nutrition can restore optimal wellness.'
    },
    {
      year: '2022',
      title: 'Professional Practice Launch',
      description: 'Earned my certification and started my practice, immediately seeing incredible results as clients discovered the power of personalized nutrition plans.'
    },
    {
      year: '2023',
      title: 'Lifestyle Integration Mastery',
      description: 'Focused on making healthy habits stick by developing systems that work with busy schedules and real-world challenges.'
    },
    {
      year: '2024',
      title: 'Digital Innovation',
      description: 'Expanded my reach through technology, creating tools and resources that bring expert guidance directly to people wherever they are.'
    }
  ]


  return (
    <>
      <Helmet>
        <title>About Me - Isabel Diez</title>
        <meta name="description" content="Learn about Isabel Diez's mission as a certified nutritionist specializing in functional nutrition, balance, and creating lasting healthy habits." />
      </Helmet>

      <div className="min-h-screen bg-[#F7F7F7] font-sans">
        {/* Hero Section */}
        <section className="bg-white text-[#373837] relative overflow-hidden py-24">
          {/* Floating Bubbles with Light Green Fade */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-20 left-10 w-24 h-24 rounded-full opacity-30"
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
              className="absolute top-40 right-20 w-32 h-32 rounded-full opacity-30"
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
              className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full opacity-30"
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
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Text Content */}
                <div className="text-left">
                  <motion.h1 
                    className="text-5xl md:text-6xl font-bold mb-4 tracking-tight leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ color: '#2E2E2E' }}
                  >
                    Meet{' '}
                    <span className="text-[#10b981]">Isabel Diez</span>
                  </motion.h1>
                  <motion.p 
                    className="text-lg md:text-xl mb-6 leading-relaxed opacity-90 font-semibold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    style={{ color: '#24604c' }}
                  >
                    Certified Nutritionist | Functional & Lifestyle Nutrition
                  </motion.p>
                  <motion.p 
                    className="text-xl md:text-2xl mb-12 leading-relaxed opacity-95"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    style={{ color: '#2E2E2E' }}
                  >
                    Helping you achieve lasting results through balance, science, and real-life habits.
                  </motion.p>

                  {/* Key Features List */}
                  <motion.div 
                    className="mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                  >
                    <div className="bg-gradient-to-r from-[#24604c]/5 to-[#10b981]/5 rounded-2xl p-6 border-l-4 border-[#10b981]">
                      <ul className="space-y-3">
                        <motion.li 
                          className="flex items-center text-lg text-[#2E2E2E]"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.8 }}
                        >
                          <div className="w-2 h-2 bg-[#10b981] rounded-full mr-4 flex-shrink-0"></div>
                          <span><strong className="text-[#24604c]">Healthy Recipes & Meal Ideas</strong> that fit your lifestyle</span>
                        </motion.li>
                        <motion.li 
                          className="flex items-center text-lg text-[#2E2E2E]"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 1.0 }}
                        >
                          <div className="w-2 h-2 bg-[#10b981] rounded-full mr-4 flex-shrink-0"></div>
                          <span><strong className="text-[#24604c]">Results that last a lifetime</strong> through sustainable habits</span>
                        </motion.li>
                        <motion.li 
                          className="flex items-center text-lg text-[#2E2E2E]"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 1.2 }}
                        >
                          <div className="w-2 h-2 bg-[#10b981] rounded-full mr-4 flex-shrink-0"></div>
                          <span><strong className="text-[#24604c]">Ongoing Support that adapts to you</strong> every step of the way</span>
                        </motion.li>
                      </ul>
                    </div>
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        type="primary"
                        size="large"
                        className="bg-[#10b981] text-white font-semibold border-none px-10 py-4 rounded-full shadow-lg transition-all duration-300 text-lg hover:!bg-[#24604c] hover:!text-white"
                        onClick={() => window.open('https://calendly.com/isabel10ramirez06', '_blank')}
                      >
                        Book Consultation <ArrowRightOutlined />
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="large"
                        className="bg-transparent text-[#373837] border-2 border-[#373837] px-10 py-4 rounded-full transition-all duration-300 text-lg hover:!bg-[#24604c] hover:!border-[#24604c] hover:!text-white"
                        href="/calculator"
                      >
                        Free Calculator
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Right Column - Hero Image */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                >
                  <div className="relative">
                    <img 
                      src="/images/isabel-graduation.jpg" 
                      alt="Isabel Diez - Certified Nutritionist Graduation" 
                      className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
                      style={{ objectPosition: "center 5%" }}
                    />
                    
                    {/* Floating badge */}
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

                    {/* Floating badge 2 */}
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
              </div>
            </div>
          </div>
        </section>

        {/* Professional Highlights Section */}
        <section ref={missionRef} className="py-24 bg-white relative overflow-hidden">
          {/* Floating Bubbles */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-20 left-10 w-24 h-24 rounded-full opacity-30"
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
              className="absolute top-40 right-20 w-32 h-32 rounded-full opacity-30"
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
                My Professional Foundation
              </motion.h2>
              <motion.p 
                className="text-xl max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ color: '#2E2E2E' }}
              >
                Solid academic preparation combined with a personalized approach to create wellness strategies that truly work in your daily life.
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
                  <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#24604c]/10 via-[#24604c]/5 to-white border border-[#24604c]/20 shadow-lg shadow-black/8 hover:shadow-xl transition-all duration-300">
                    
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
                    <div className="p-6">
                      <h3 
                        className="text-2xl font-bold mb-4 text-center"
                        style={{ color: '#2E2E2E' }}
                      >
                        {highlight.title}
                      </h3>
                      
                      <p 
                        className="leading-relaxed text-lg text-center"
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

        {/* Values Section */}
        <section ref={valuesRef} className="py-24 bg-[#F7F7F7] relative overflow-hidden">
          {/* Floating Bubbles */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-20 left-10 w-24 h-24 rounded-full opacity-30"
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
              className="absolute bottom-20 right-20 w-32 h-32 rounded-full opacity-30"
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
                Core Values That Guide My Practice
              </motion.h2>
              <motion.p 
                className="text-xl max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ color: '#2E2E2E' }}
              >
                The core beliefs that drive my approach and ensure every client receives exceptional, personalized support throughout their journey.
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

        {/* Professional Journey Timeline Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          {/* Floating Bubbles */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-20 left-10 w-24 h-24 rounded-full opacity-30"
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
              className="absolute bottom-20 right-20 w-32 h-32 rounded-full opacity-30"
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
                My Professional Journey
              </motion.h2>
              <motion.p 
                className="text-xl max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ color: '#2E2E2E' }}
              >
                The milestones and experiences that have shaped my expertise in helping people achieve sustainable and lasting health changes.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <Timeline
                items={milestones.map((milestone, index) => ({
                  children: (
                    <div className="bg-gradient-to-br from-[#24604c]/5 to-white p-6 rounded-xl shadow-sm border border-[#24604c]/10">
                      <div className="flex items-center gap-3 mb-3">
                        <div 
                          className="px-3 py-1 rounded-full text-sm font-bold text-white"
                          style={{ backgroundColor: index % 2 === 0 ? '#10b981' : '#24604c' }}
                        >
                          {milestone.year}
                        </div>
                        <h4 className="text-xl font-bold" style={{ color: '#2E2E2E' }}>
                          {milestone.title}
                        </h4>
                      </div>
                      <p className="leading-relaxed" style={{ color: '#2E2E2E' }}>
                        {milestone.description}
                      </p>
                    </div>
                  ),
                  color: index % 2 === 0 ? '#10b981' : '#24604c'
                }))}
              />
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-[#10b981] via-[#90cbb9] to-[#24604c] text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full"></div>
          </div>
          
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <motion.h2 
                className="text-4xl md:text-6xl font-bold mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Ready to Start Your Transformation?
              </motion.h2>
              <motion.p 
                className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-95"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Skip the confusion and overwhelm. Together, we'll build simple, effective habits that work with your schedule and create the healthy life you want.
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