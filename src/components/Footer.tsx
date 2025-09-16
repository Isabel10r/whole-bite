import { Layout, Row, Col, Typography, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faUtensils, 
  faEnvelope,
  faPhone
} from '@fortawesome/free-solid-svg-icons'
import { 
  faGithub, 
  faTwitter, 
  faLinkedin
} from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'

const { Footer: AntFooter } = Layout
const { Text, Title } = Typography

const Footer: React.FC = () => {
  return (
    <AntFooter className="text-gray-800 py-16 relative overflow-hidden" style={{ 
      background: 'linear-gradient(135deg, #F7F7F7 0%, #E8F4F8 50%, #F0F8FF 100%)',
      borderTop: '3px solid #ffbe4f'
    }}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 right-4 w-32 h-32 bg-[#ffbe4f] rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-[#0ea7b5] rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#e8702a] rounded-full blur-2xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} md={6}>
            <div className="flex items-center space-x-2 mb-4">
              <FontAwesomeIcon icon={faUtensils} className="text-2xl" style={{ color: '#ffbe4f' }} />
              <Title level={4} className="text-[#ffbe4f] mb-0 font-bold">Isabel Diez</Title>
            </div>
            <Text className="text-gray-600">
              Your trusted nutrition expert for maternal and family health. 
              Discover recipes, calculate nutrition, and make informed dietary choices for your family.
            </Text>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Title level={5} className="text-[#ffbe4f] mb-4 font-bold">Quick Links</Title>
            <Space direction="vertical" size="small">
              <Link to="/" className="text-gray-600 hover:text-[#ffbe4f] transition-colors">
                Home
              </Link>
              <Link to="/calculator" className="text-gray-600 hover:text-[#ffbe4f] transition-colors">
                Nutrition Calculator
              </Link>
              <Link to="/recipes" className="text-gray-600 hover:text-[#ffbe4f] transition-colors">
                Healthy Recipes
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-[#ffbe4f] transition-colors">
                About Me
              </Link>
            </Space>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Title level={5} className="text-[#0ea7b5] mb-4 font-bold">Resources</Title>
            <Space direction="vertical" size="small">
              <Text className="text-gray-600 hover:text-[#0ea7b5] transition-colors cursor-pointer">Nutrition Guide</Text>
              <Text className="text-gray-600 hover:text-[#0ea7b5] transition-colors cursor-pointer">Diet Plans</Text>
              <Text className="text-gray-600 hover:text-[#0ea7b5] transition-colors cursor-pointer">Health Tips</Text>
              <Text className="text-gray-600 hover:text-[#0ea7b5] transition-colors cursor-pointer">FAQ</Text>
            </Space>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Title level={5} className="text-[#e8702a] mb-4 font-bold">Contact</Title>
            <Space direction="vertical" size="small">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faEnvelope} style={{ color: '#e8702a' }} />
                <Text className="text-gray-600 hover:text-[#e8702a] transition-colors cursor-pointer">isabel@nutrition.com</Text>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faPhone} style={{ color: '#e8702a' }} />
                <Text className="text-gray-600 hover:text-[#e8702a] transition-colors cursor-pointer">+1 (555) 123-4567</Text>
              </div>
              <Space size="middle" className="mt-2">
                <FontAwesomeIcon icon={faGithub} className="text-2xl text-gray-600 hover:text-[#e8702a] cursor-pointer transition-colors" />
                <FontAwesomeIcon icon={faTwitter} className="text-2xl text-gray-600 hover:text-[#e8702a] cursor-pointer transition-colors" />
                <FontAwesomeIcon icon={faLinkedin} className="text-2xl text-gray-600 hover:text-[#e8702a] cursor-pointer transition-colors" />
              </Space>
            </Space>
          </Col>
        </Row>
        
        <div className="border-t border-[#ffbe4f]/30 mt-12 pt-8 text-center">
          <Text className="text-gray-500 text-sm">
            © 2024 Isabel Diez. All rights reserved. | 
            <span className="text-[#ffbe4f] hover:text-[#0ea7b5] transition-colors cursor-pointer mx-2">Privacy Policy</span> | 
            <span className="text-[#ffbe4f] hover:text-[#0ea7b5] transition-colors cursor-pointer mx-2">Terms of Service</span>
          </Text>
        </div>
      </div>
    </AntFooter>
  )
}

export default Footer
