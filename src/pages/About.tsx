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
      name: 'Maternal Nutrition',
      description: 'Specialized guidance for pregnancy, postpartum recovery, and breastfeeding nutrition.',
      icon: <HeartOutlined className="text-3xl" style={{ color: '#FF6B6B' }} />,
      details: ['Prenatal nutrition planning', 'Postpartum recovery support', 'Breastfeeding nutrition']
    },
    {
      name: 'Infant & Child Nutrition',
      description: 'Expert support for baby weaning, toddler nutrition, and healthy eating habits.',
      icon: <TeamOutlined className="text-3xl" style={{ color: '#4ECDC4' }} />,
      details: ['Baby-led weaning', 'Toddler meal planning', 'Picky eating solutions']
    },
    {
      name: 'Family Wellness',
      description: 'Holistic approach to family nutrition and healthy lifestyle habits.',
      icon: <SafetyOutlined className="text-3xl" style={{ color: '#FFE66D' }} />,
      details: ['Family meal planning', 'Healthy lifestyle coaching', 'Preventive nutrition']
    },
    {
      name: 'Evidence-Based Practice',
      description: 'All recommendations backed by the latest scientific research and clinical studies.',
      icon: <BulbOutlined className="text-3xl" style={{ color: '#4ECDC4' }} />,
      details: ['Research-based approach', 'Clinical experience', 'Continuous education']
    }
  ]

  const values = [
    {
      icon: <SafetyOutlined className="text-3xl" style={{ color: '#4ECDC4' }} />,
      title: 'Evidence-Based',
      description: 'All my recommendations are backed by scientific research and peer-reviewed studies.'
    },
    {
      icon: <HeartOutlined className="text-3xl" style={{ color: '#FF6B6B' }} />,
      title: 'Family-Centered',
      description: 'I prioritize the unique needs of mothers and families, making nutrition guidance accessible and practical.'
    },
    {
      icon: <GlobalOutlined className="text-3xl" style={{ color: '#FFE66D' }} />,
      title: 'Inclusive',
      description: 'I support diverse dietary needs and cultural food preferences from around the world.'
    },
    {
      icon: <BulbOutlined className="text-3xl" style={{ color: '#4ECDC4' }} />,
      title: 'Innovation',
      description: 'I continuously improve my approach with the latest research and personalized solutions.'
    }
  ]

  const milestones = [
    {
      year: '2018',
      title: 'Nutrition Certification',
      description: 'Completed comprehensive nutrition certification with focus on maternal and child health.'
    },
    {
      year: '2019',
      title: 'Clinical Practice Begins',
      description: 'Started working with families, specializing in pregnancy and postpartum nutrition.'
    },
    {
      year: '2021',
      title: 'Baby Weaning Specialist',
      description: 'Became certified in baby-led weaning and infant nutrition guidance.'
    },
    {
      year: '2022',
      title: 'Online Platform Launch',
      description: 'Launched digital nutrition services to reach more families worldwide.'
    },
    {
      year: '2024',
      title: '500+ Families Helped',
      description: 'Successfully guided over 500 families in their nutrition journey.'
    }
  ]

  const stats = [
    { title: 'Families Helped', value: '500+', icon: <TeamOutlined /> },
    { title: 'Years Experience', value: '6+', icon: <TrophyOutlined /> },
    { title: 'Countries Served', value: '15+', icon: <GlobalOutlined /> },
    { title: 'Success Rate', value: '95%', icon: <StarOutlined /> }
  ]

  return (
    <>
      <Helmet>
        <title>About Me - Isabel Diez</title>
        <meta name="description" content="Learn about Isabel Diez's mission to provide expert nutrition guidance for mothers and babies, helping families make informed dietary choices for a healthier lifestyle." />
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
              I'm a certified nutritionist dedicated to helping mothers and families achieve optimal health 
              through personalized, evidence-based nutrition guidance.
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
                    As a certified nutritionist, I specialize in maternal and infant nutrition, helping mothers 
                    navigate the unique nutritional needs during pregnancy, postpartum recovery, and baby weaning. 
                    My approach combines scientific evidence with practical, sustainable solutions.
                  </Paragraph>
                  <Paragraph className="text-lg mb-6" style={{ color: '#2E2E2E' }}>
                    Whether you're preparing for pregnancy, recovering postpartum, or introducing solid foods to your baby, 
                    I provide personalized guidance that fits your family's lifestyle and cultural preferences.
                  </Paragraph>
                  <Space size="large">
                    <div className="flex items-center">
                      <CheckCircleOutlined style={{ color: '#4ECDC4' }} className="mr-2" />
                      <Text strong style={{ color: '#2E2E2E' }}>Evidence-Based Approach</Text>
                    </div>
                    <div className="flex items-center">
                      <CheckCircleOutlined style={{ color: '#4ECDC4' }} className="mr-2" />
                      <Text strong style={{ color: '#2E2E2E' }}>Personalized Guidance</Text>
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
                These core values guide everything I do and shape my commitment to helping families thrive.
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
                With specialized training in maternal and infant nutrition, I bring a unique perspective 
                to helping families navigate their nutritional journey.
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
                From clinical practice to specialized maternal nutrition, here's how I've evolved to serve families better.
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
                Ready to Transform Your Family's Health?
              </Title>
              <Paragraph className="text-xl text-white mb-8 max-w-2xl mx-auto">
                Join hundreds of families who have already achieved their health goals with my guidance. 
                Start your personalized nutrition journey today.
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