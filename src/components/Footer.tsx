import { Layout, Row, Col, Typography, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faUtensils,
  faHome,
  faBookOpen,
  faUser,
  faCalculator,
  faDroplet
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const { Footer: AntFooter } = Layout
const { Text, Title } = Typography

const Footer: React.FC = () => {
  return (
    <AntFooter className="text-gray-800 py-16 relative overflow-hidden" style={{ 
      background: 'linear-gradient(135deg, #F7F7F7 0%, #E8F4F8 50%, #F0F8FF 100%)',
      borderTop: '3px solid #10b981'
    }}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 right-4 w-32 h-32 bg-[#10b981] rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-[#24604c] rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#90cbb9] rounded-full blur-2xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} md={6}>
            <div className="flex items-center space-x-2 mb-4">
              <FontAwesomeIcon icon={faUtensils} className="text-2xl" style={{ color: '#10b981' }} />
              <Title level={4} className="text-[#10b981] mb-0 font-bold">Isabel Diez</Title>
            </div>
            <Text className="text-gray-600">
              Transforming lives through personalized nutrition that works with your body, not against it.
            </Text>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Title level={5} className="text-[#10b981] mb-4 font-bold">Quick Links</Title>
            <Space direction="vertical" size="small">
              <Link to="/" className="text-gray-600 hover:text-[#10b981] transition-colors flex items-center">
                <FontAwesomeIcon icon={faHome} className="mr-2 text-sm" />
                Home
              </Link>
              <Link to="/recipes" className="text-gray-600 hover:text-[#10b981] transition-colors flex items-center">
                <FontAwesomeIcon icon={faBookOpen} className="mr-2 text-sm" />
                Healthy Recipes
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-[#10b981] transition-colors flex items-center">
                <FontAwesomeIcon icon={faUser} className="mr-2 text-sm" />
                About Me
              </Link>
            </Space>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Title level={5} className="text-[#24604c] mb-4 font-bold">Calculators</Title>
            <Space direction="vertical" size="small">
              <Link to="/calculator/bmr" className="text-gray-600 hover:text-[#24604c] transition-colors flex items-center">
                <FontAwesomeIcon icon={faCalculator} className="mr-2 text-sm" />
                BMR Calculator
              </Link>
              <Link to="/calculator/water" className="text-gray-600 hover:text-[#24604c] transition-colors flex items-center">
                <FontAwesomeIcon icon={faDroplet} className="mr-2 text-sm" />
                Water Calculator
              </Link>
            </Space>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Title level={5} className="text-[#90cbb9] mb-4 font-bold">Contact</Title>
            <Space direction="vertical" size="small">
              <a 
                href="https://wa.link/6bmfto" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#90cbb9] transition-colors"
              >
                Get in Touch
              </a>
            </Space>
          </Col>
        </Row>
        
        <div className="border-t border-[#10b981]/30 mt-12 pt-8 text-center">
          <Text className="text-gray-500 text-sm">
            © 2024 Isabel Diez. All rights reserved.
          </Text>
        </div>
      </div>
    </AntFooter>
  )
}

export default Footer
