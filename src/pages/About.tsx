import { Row, Col, Card, Typography, Space, Timeline, Statistic } from 'antd'
import { 
  TeamOutlined, 
  TrophyOutlined, 
  HeartOutlined, 
  BulbOutlined,
  CheckCircleOutlined,
  StarOutlined,
  GlobalOutlined,
  SafetyOutlined
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Helmet } from 'react-helmet-async'

const { Title, Paragraph, Text } = Typography

const About: React.FC = () => {
  const { ref: missionRef, inView: missionInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const { ref: teamRef, inView: teamInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const { ref: valuesRef, inView: valuesInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const expertise = [
    {
      name: 'Functional Nutrition',
      description: 'Customized plans to improve health from the root, supporting digestive, hormonal, and metabolic processes.',
      icon: <HeartOutlined className="text-3xl" style={{ color: '#FF6B6B' }} />,
      details: ['Digestive Health', 'Hormonal Balance', 'Metabolic Optimization']
    },
    {
      name: 'Habit Transformation',
      description: 'Practical strategies to achieve lasting lifestyle changes without extreme restrictions.',
      icon: <TrophyOutlined className="text-3xl" style={{ color: '#4ECDC4' }} />,
      details: ['Sustainable Changes', 'Nutritional Education', 'Long-term Adherence']
    },
    {
      name: 'Fitness Lifestyle',
      description: 'Support in body recomposition processes, muscle gain, or fat loss journeys.',
      icon: <StarOutlined className="text-3xl" style={{ color: '#FFE66D' }} />,
      details: ['Body Recomposition', 'Muscle Gain', 'Fat Loss']
    },
    {
      name: 'Nutritional Education',
      description: 'Guides, menus, digital resources, and follow-up to ensure understanding and adherence.',
      icon: <BulbOutlined className="text-3xl" style={{ color: '#4ECDC4' }} />,
      details: ['Educational Resources', 'Personalized Follow-up', 'Digital Tools']
    }
  ]

  const values = [
    {
      icon: <SafetyOutlined className="text-3xl" style={{ color: '#4ECDC4' }} />,
      title: 'Commitment',
      description: 'Each plan is personalized and adapted to my patients\' real life, with continuous follow-up.'
    },
    {
      icon: <HeartOutlined className="text-3xl" style={{ color: '#FF6B6B' }} />,
      title: 'Balance',
      description: 'I promote flexible, enjoyable, and practical nutrition without extreme diets or unnecessary restrictions.'
    },
    {
      icon: <BulbOutlined className="text-3xl" style={{ color: '#FFE66D' }} />,
      title: 'Science & Education',
      description: 'I back every strategy with scientific evidence and strive to teach rather than impose.'
    },
    {
      icon: <GlobalOutlined className="text-3xl" style={{ color: '#4ECDC4' }} />,
      title: 'Empathy & Closeness',
      description: 'I understand the emotions surrounding food and accompany each process with humanity.'
    }
  ]

  const milestones = [
    {
      year: '2018',
      title: 'University Education',
      description: 'Began my comprehensive five-year university education in Nutrition and Dietetics.'
    },
    {
      year: '2020',
      title: 'Functional Nutrition Specialization',
      description: 'Specialized in functional nutrition and metabolism, deepening my understanding of root-cause health.'
    },
    {
      year: '2022',
      title: 'Professional Certification',
      description: 'Obtained my certified Nutritionist Dietitian degree and began my professional practice.'
    },
    {
      year: '2023',
      title: 'Fitness & Habits Focus',
      description: 'Developed my specialty in fitness lifestyle and healthy habit transformation.'
    },
    {
      year: '2024',
      title: 'Digital Platform',
      description: 'Launched my digital platform to provide nutritional education and interactive tools.'
    }
  ]

  const stats = [
    { title: 'Patients Transformed', value: '300+', icon: <TeamOutlined /> },
    { title: 'Years of Training', value: '5+', icon: <TrophyOutlined /> },
    { title: 'Personalized Plans', value: '500+', icon: <GlobalOutlined /> },
    { title: 'Success Rate', value: '95%', icon: <StarOutlined /> }
  ]

  return (
    <>
      <Helmet>
        <title>About Me - Isabel Diez</title>
        <meta name="description" content="Learn about Isabel Diez's mission as a certified nutritionist dietitian specializing in functional nutrition, fitness lifestyle, and healthy habit transformation." />
      </Helmet>

      <div className="min-h-screen bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Title level={1} className="text-5xl font-bold mb-6" style={{ color: '#2E2E2E' }}>
              About Isabel Diez
            </Title>
            <Paragraph className="text-xl max-w-3xl mx-auto" style={{ color: '#2E2E2E' }}>
              I'm Isabel Diez, a certified nutritionist dietitian with a deep passion for functional nutrition, 
              fitness lifestyle, and healthy habit transformation.
            </Paragraph>
          </motion.div>

          {/* Mission Section */}
          <section ref={missionRef} className="mb-20">
            <Row gutter={[48, 48]} align="middle">
              <Col xs={24} lg={12}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={missionInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8 }}
                >
                  <Title level={2} className="mb-6" style={{ color: '#2E2E2E' }}>My Mission</Title>
                  <Paragraph className="text-lg mb-6" style={{ color: '#2E2E2E' }}>
                    With over five years of university training, my approach focuses on helping people build a sustainable 
                    path to wellness, without extreme diets or unnecessary restrictions, but through balance, portion control, 
                    and nutritional education.
                  </Paragraph>
                  <Paragraph className="text-lg mb-6" style={{ color: '#2E2E2E' }}>
                    My mission is to empower each patient to understand that good nutrition is not about prohibitions, 
                    but about learning to enjoy food with awareness and balance. I firmly believe that nutrition is a 
                    powerful tool to improve health, prevent diseases, and extend longevity.
                  </Paragraph>
                  <Space size="large">
                    <div className="flex items-center">
                      <CheckCircleOutlined style={{ color: '#4ECDC4' }} className="mr-2" />
                      <Text strong style={{ color: '#2E2E2E' }}>Scientific Approach</Text>
                    </div>
                    <div className="flex items-center">
                      <CheckCircleOutlined style={{ color: '#4ECDC4' }} className="mr-2" />
                      <Text strong style={{ color: '#2E2E2E' }}>Sustainable Transformation</Text>
                    </div>
                  </Space>
                </motion.div>
              </Col>
              <Col xs={24} lg={12}>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={missionInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="bg-gradient-to-br from-[#4ECDC4]/10 to-[#FF6B6B]/10 p-8 rounded-2xl">
                    <Title level={3} className="text-center mb-6" style={{ color: '#2E2E2E' }}>My Impact</Title>
                    <Row gutter={[16, 16]}>
                      {stats.map((stat, index) => (
                        <Col span={12} key={index}>
                          <Card className="text-center border-0 shadow-sm">
                            <div className="text-2xl mb-2" style={{ color: '#4ECDC4' }}>
                              {stat.icon}
                            </div>
                            <Statistic
                              title={stat.title}
                              value={stat.value}
                              valueStyle={{ color: '#FF6B6B', fontSize: '24px' }}
                            />
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </motion.div>
              </Col>
            </Row>
          </section>

          {/* Values Section */}
          <section ref={valuesRef} className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <Title level={2} className="mb-4" style={{ color: '#2E2E2E' }}>My Values</Title>
              <Paragraph className="text-lg max-w-2xl mx-auto" style={{ color: '#2E2E2E' }}>
                These core values guide everything I do and shape my commitment to helping people 
                achieve their wellness in a sustainable way.
              </Paragraph>
            </motion.div>

            <Row gutter={[32, 32]}>
              {values.map((value, index) => (
                <Col xs={24} sm={12} lg={6} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="mb-4">{value.icon}</div>
                      <Title level={4} className="mb-3" style={{ color: '#2E2E2E' }}>{value.title}</Title>
                      <Paragraph style={{ color: '#2E2E2E' }}>
                        {value.description}
                      </Paragraph>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </section>

          {/* Expertise Section */}
          <section ref={teamRef} className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <Title level={2} className="mb-4" style={{ color: '#2E2E2E' }}>My Expertise</Title>
              <Paragraph className="text-lg max-w-2xl mx-auto" style={{ color: '#2E2E2E' }}>
                Throughout my practice, I've had the privilege of seeing how my patients not only reach their goals, 
                but also transform their relationship with food, adopting habits that last over time.
              </Paragraph>
            </motion.div>

            <Row gutter={[32, 32]}>
              {expertise.map((area, index) => (
                <Col xs={24} sm={12} lg={6} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={teamInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full text-center border-0 shadow-lg">
                      <div className="mb-4">{area.icon}</div>
                      <Title level={4} className="mb-2" style={{ color: '#2E2E2E' }}>{area.name}</Title>
                      <Paragraph className="text-sm mb-4" style={{ color: '#2E2E2E' }}>
                        {area.description}
                      </Paragraph>
                      <div>
                        {area.details.map((detail, detailIndex) => (
                          <span
                            key={detailIndex}
                            className="inline-block px-2 py-1 rounded-full mr-1 mb-1 text-xs"
                            style={{ backgroundColor: '#4ECDC4', color: 'white' }}
                          >
                            {detail}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </section>

          {/* Timeline Section */}
          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Title level={2} className="mb-4" style={{ color: '#2E2E2E' }}>My Journey</Title>
              <Paragraph className="text-lg max-w-2xl mx-auto" style={{ color: '#2E2E2E' }}>
                From my university education to my specialization in functional nutrition and fitness lifestyle, 
                this has been my path to providing the best service to my patients.
              </Paragraph>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Timeline
                items={milestones.map((milestone, index) => ({
                  children: (
                    <div>
                      <Title level={4} className="mb-2" style={{ color: '#2E2E2E' }}>
                        {milestone.year} - {milestone.title}
                      </Title>
                      <Paragraph style={{ color: '#2E2E2E' }}>
                        {milestone.description}
                      </Paragraph>
                    </div>
                  ),
                  color: index % 2 === 0 ? '#4ECDC4' : '#FF6B6B'
                }))}
              />
            </motion.div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-16 bg-gradient-to-r from-[#4ECDC4] to-[#FF6B6B] rounded-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Title level={2} className="text-white mb-6">
                Ready to Transform Your Health?
              </Title>
              <Paragraph className="text-xl text-white mb-8 max-w-2xl mx-auto">
                Each success story from my patients is the driving force that motivates me to keep growing as a professional. 
                My goal is for you to find a safe, realistic, and motivating space to achieve lasting results.
              </Paragraph>
              <Space size="large">
                <a href="/calculator">
                  <button className="bg-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors" style={{ color: '#4ECDC4' }}>
                    Try My Calculator
                  </button>
                </a>
                <a href="/recipes">
                  <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#FF6B6B] transition-colors">
                    Browse Recipes
                  </button>
                </a>
              </Space>
            </motion.div>
          </section>
        </div>
      </div>
    </>
  )
}

export default About