import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  Radio,
  Typography,
  Statistic,
  Alert,
  Spin,
  message,
  Space,
  Divider
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalculator,
  faFire,
  faRunning,
  faUser,
  faRuler,
  faWeight,
  faCalendarAlt,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

interface BMRFormData {
  age: number;
  gender: 'male' | 'female';
  weight: number;
  height: number;
  activityLevel: string;
  weightUnit: 'kg' | 'lbs';
  heightUnit: 'cm' | 'ft';
}

interface BMRResult {
  bmr: number;
  tmr: number;
  goals: {
    maintain: number;
    mildWeightLoss: number;
    weightLoss: number;
    extremeWeightLoss: number;
    mildWeightGain: number;
    weightGain: number;
    extremeWeightGain: number;
  };
}

const BMRCalculator: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BMRResult | null>(null);
  const [formData, setFormData] = useState<BMRFormData>({
    age: 0,
    gender: 'female', // Keep this for TypeScript, but form won't show it selected
    weight: 0,
    height: 0,
    activityLevel: '',
    weightUnit: 'kg',
    heightUnit: 'cm'
  });

  const activityLevels = [
    { value: '1.2', label: 'Sedentary (little/no exercise)', description: 'Desk job, no regular exercise' },
    { value: '1.375', label: 'Light activity (1-3 days/week)', description: 'Light exercise/sports 1-3 days/week' },
    { value: '1.55', label: 'Moderate activity (3-5 days/week)', description: 'Moderate exercise/sports 3-5 days/week' },
    { value: '1.725', label: 'Very active (6-7 days/week)', description: 'Hard exercise/sports 6-7 days a week' },
    { value: '1.9', label: 'Super active (2x/day)', description: 'Very hard exercise/sports & physical job or 2x training' }
  ];

  const calculateBMR = async (values: any) => {
    setLoading(true);
    
    try {
      // Validate input values
      const age = Number(values.age);
      const weight = Number(values.weight);
      const height = Number(values.height);
      const activityLevel = Number(values.activityLevel);
      
      if (isNaN(age) || isNaN(weight) || isNaN(height) || isNaN(activityLevel)) {
        throw new Error('Please enter valid numeric values for all fields');
      }
      
      if (age < 15 || age > 100) {
        throw new Error('Age must be between 15 and 100 years');
      }
      
      // Convert units if necessary
      let weightInKg = weight;
      let heightInCm = height;
      
      if (values.weightUnit === 'lbs') {
        weightInKg = weight * 0.453592;
      }
      
      if (values.heightUnit === 'ft') {
        // For feet input, assume decimal format (e.g., 5.5 = 5 feet 6 inches)
        const feet = Math.floor(height);
        const inches = (height - feet) * 12;
        heightInCm = (feet * 12 + inches) * 2.54;
      }
      
      // Additional validation after conversion
      if (weightInKg < 20 || weightInKg > 300) {
        throw new Error('Weight must be reasonable (20-300 kg equivalent)');
      }
      
      if (heightInCm < 100 || heightInCm > 250) {
        throw new Error('Height must be reasonable (100-250 cm equivalent)');
      }

      // Try to use RapidAPI first, fallback to local calculation
      let bmr: number;
      let tmr: number;
      
      try {
        // RapidAPI BMR calculation
        // To use the API: 
        // 1. Get API key from https://rapidapi.com/tope96/api/bmr-and-tmr
        // 2. Create .env file with: VITE_RAPIDAPI_KEY=your_key_here
        const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
        
        if (apiKey) {
          const url = `https://bmr-and-tmr.p.rapidapi.com/bmr?age=${age}&gender=${values.gender}&weight=${Math.round(weightInKg)}&height=${Math.round(heightInCm)}&activitylevel=${activityLevel}`;
          
          const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': apiKey,
              'X-RapidAPI-Host': 'bmr-and-tmr.p.rapidapi.com'
            }
          };

          const response = await fetch(url, options);
          
          if (response.ok) {
            const data = await response.json();
            // Handle different possible response formats
            bmr = data.bmr || data.BMR || data.result?.bmr || data.result?.BMR;
            tmr = data.tmr || data.TMR || data.tdee || data.TDEE || data.result?.tmr || data.result?.TMR;
            
            if (!bmr || !tmr) {
              console.log('API Response:', data);
              throw new Error('Invalid API response format');
            }
            
            console.log('API calculation successful:', { bmr, tmr });
          } else {
            const errorText = await response.text();
            console.error('API Error:', response.status, errorText);
            throw new Error(`API request failed with status: ${response.status}`);
          }
        } else {
          throw new Error('No API key available - using local calculation');
        }
      } catch (apiError) {
        console.log('API calculation failed, using local calculation:', apiError);
        
        // Fallback: Local calculation using Mifflin-St Jeor equation
        if (values.gender === 'male') {
          bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) + 5;
        } else {
          bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) - 161;
        }
        
        tmr = bmr * activityLevel;
      }

      const goals = {
        maintain: Math.round(tmr),
        mildWeightLoss: Math.round(tmr - 250),
        weightLoss: Math.round(tmr - 500),
        extremeWeightLoss: Math.round(tmr - 750),
        mildWeightGain: Math.round(tmr + 250),
        weightGain: Math.round(tmr + 500),
        extremeWeightGain: Math.round(tmr + 750)
      };

      setResult({
        bmr: Math.round(bmr),
        tmr: Math.round(tmr),
        goals
      });

      setFormData(values);
      message.success('BMR calculated successfully!');

    } catch (error) {
      console.error('Error calculating BMR:', error);
      message.error('Error calculating BMR. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = (values: any) => {
    calculateBMR(values);
  };

  const convertWeight = (weight: number, fromUnit: string, toUnit: string): number => {
    if (!weight || isNaN(weight) || fromUnit === toUnit) return weight;
    if (fromUnit === 'kg' && toUnit === 'lbs') return Math.round(weight * 2.20462 * 10) / 10;
    if (fromUnit === 'lbs' && toUnit === 'kg') return Math.round(weight * 0.453592 * 10) / 10;
    return weight;
  };

  const convertHeight = (height: number, fromUnit: string, toUnit: string): number => {
    if (!height || isNaN(height) || fromUnit === toUnit) return height;
    if (fromUnit === 'cm' && toUnit === 'ft') {
      // Convert cm to feet with decimal (e.g., 170cm = 5.58ft)
      return Math.round(height * 0.0328084 * 100) / 100;
    }
    if (fromUnit === 'ft' && toUnit === 'cm') {
      // Convert feet to cm (e.g., 5.5ft = 167.64cm)
      return Math.round(height * 30.48 * 10) / 10;
    }
    return height;
  };

  const handleWeightUnitChange = (unit: 'kg' | 'lbs') => {
    const currentWeight = form.getFieldValue('weight');
    const currentUnit = form.getFieldValue('weightUnit');
    
    if (currentWeight && !isNaN(currentWeight) && currentUnit !== unit) {
      const convertedWeight = convertWeight(currentWeight, currentUnit, unit);
      form.setFieldsValue({
        weight: convertedWeight,
        weightUnit: unit
      });
    } else {
      form.setFieldsValue({ weightUnit: unit });
    }
  };

  const handleHeightUnitChange = (unit: 'cm' | 'ft') => {
    const currentHeight = form.getFieldValue('height');
    const currentUnit = form.getFieldValue('heightUnit');
    
    if (currentHeight && !isNaN(currentHeight) && currentUnit !== unit) {
      const convertedHeight = convertHeight(currentHeight, currentUnit, unit);
      form.setFieldsValue({
        height: convertedHeight,
        heightUnit: unit
      });
    } else {
      form.setFieldsValue({ heightUnit: unit });
    }
  };

  return (
    <>
      <Helmet>
        <title>BMR Calculator - Calculate Your Basal Metabolic Rate</title>
        <meta name="description" content="Calculate your Basal Metabolic Rate (BMR) and daily calorie needs. Get personalized recommendations for weight loss, maintenance, and weight gain." />
        <meta name="keywords" content="BMR calculator, basal metabolic rate, calorie calculator, metabolism, weight loss, weight gain" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <Title level={1} className="text-4xl font-bold mb-4">
              <FontAwesomeIcon icon={faCalculator} className="mr-3 text-orange-500" />
              BMR Calculator
            </Title>
            <Text className="text-lg text-gray-600">
              Calculate your Basal Metabolic Rate and daily calorie needs
            </Text>
          </div>

          <Row gutter={[24, 24]}>
            {/* Input Form */}
            <Col xs={24} lg={12}>
              <Card title="Your Information" className="h-full">
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={{
                    weightUnit: 'kg',
                    heightUnit: 'cm'
                  }}
                  onFinish={onFinish}
                >
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label={
                          <span>
                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-blue-500" />
                            Age
                          </span>
                        }
                        name="age"
        rules={[
          { required: true, message: 'Please enter your age' },
          { 
            validator: (_, value) => {
              const num = Number(value);
              if (!value || isNaN(num)) {
                return Promise.reject(new Error('Please enter a valid age'));
              }
              if (num < 15 || num > 100) {
                return Promise.reject(new Error('Age must be between 15 and 100'));
              }
              return Promise.resolve();
            }
          }
        ]}
                      >
                        <Input 
                          type="number" 
                          placeholder="Enter your age (15-100)" 
                          suffix="years"
                          min="15"
                          max="100"
                          step="1"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label={
                          <span>
                            <FontAwesomeIcon icon={faUser} className="mr-2 text-pink-500" />
                            Gender
                          </span>
                        }
                        name="gender"
                        rules={[{ required: true, message: 'Please select your gender' }]}
                      >
                        <Radio.Group>
                          <Radio value="female">Female</Radio>
                          <Radio value="male">Male</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col xs={16}>
                      <Form.Item
                        label={
                          <span>
                            <FontAwesomeIcon icon={faWeight} className="mr-2 text-green-500" />
                            Weight
                          </span>
                        }
                        name="weight"
        rules={[
          { required: true, message: 'Please enter your weight' },
          { 
            validator: (_, value) => {
              const num = Number(value);
              if (!value || isNaN(num)) {
                return Promise.reject(new Error('Please enter a valid weight'));
              }
              if (num <= 0 || num > 500) {
                return Promise.reject(new Error('Please enter a valid weight (1-500)'));
              }
              return Promise.resolve();
            }
          }
        ]}
                      >
                        <Input 
                          type="number" 
                          placeholder="Enter your weight" 
                          min="20"
                          max="500"
                          step="0.1"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={8}>
                      <Form.Item label="Unit" name="weightUnit">
                        <Select onChange={handleWeightUnitChange}>
                          <Option value="kg">kg</Option>
                          <Option value="lbs">lbs</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col xs={16}>
                      <Form.Item
                        label={
                          <span>
                            <FontAwesomeIcon icon={faRuler} className="mr-2 text-purple-500" />
                            Height
                          </span>
                        }
                        name="height"
        rules={[
          { required: true, message: 'Please enter your height' },
          { 
            validator: (_, value) => {
              const num = Number(value);
              const unit = form.getFieldValue('heightUnit');
              if (!value || isNaN(num)) {
                return Promise.reject(new Error('Please enter a valid height'));
              }
              if (unit === 'cm') {
                if (num < 100 || num > 250) {
                  return Promise.reject(new Error('Height must be between 100-250 cm'));
                }
              } else if (unit === 'ft') {
                if (num < 3 || num > 8) {
                  return Promise.reject(new Error('Height must be between 3-8 feet'));
                }
              }
              return Promise.resolve();
            }
          }
        ]}
                      >
                        <Input 
                          type="number" 
                          placeholder="Enter your height" 
                          min="50"
                          max="300"
                          step="0.1"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={8}>
                      <Form.Item label="Unit" name="heightUnit">
                        <Select onChange={handleHeightUnitChange}>
                          <Option value="cm">cm</Option>
                          <Option value="ft">ft</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    label={
                      <span>
                        <FontAwesomeIcon icon={faRunning} className="mr-2 text-orange-500" />
                        Activity Level
                      </span>
                    }
                    name="activityLevel"
                    rules={[{ required: true, message: 'Please select your activity level' }]}
                  >
                    <Select 
                      placeholder="Choose your daily activity level"
                      optionLabelProp="label"
                      dropdownStyle={{ minWidth: '400px' }}
                    >
                      {activityLevels.map((level) => (
                        <Option 
                          key={level.value} 
                          value={level.value}
                          label={level.label}
                        >
                          <div className="py-2 px-1">
                            <div className="font-medium text-sm leading-tight mb-1">{level.label}</div>
                            <div className="text-xs text-gray-500 leading-relaxed">{level.description}</div>
                          </div>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600"
                    icon={<FontAwesomeIcon icon={faCalculator} />}
                  >
                    Calculate BMR
                  </Button>
                </Form>
              </Card>
            </Col>

            {/* Results */}
            <Col xs={24} lg={12}>
              <Card title="Your Results" className="h-full">
                {loading ? (
                  <div className="text-center py-8">
                    <Spin size="large" />
                    <div className="mt-4">
                      <Text>Calculating your BMR...</Text>
                    </div>
                  </div>
                ) : result ? (
                  <Space direction="vertical" size="large" className="w-full">
                    {/* BMR and TMR */}
                    <Row gutter={16}>
                      <Col xs={24} sm={12}>
                        <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100">
                          <Statistic
                            title="Basal Metabolic Rate (BMR)"
                            value={result.bmr}
                            suffix="cal/day"
                            prefix={<FontAwesomeIcon icon={faFire} />}
                            valueStyle={{ color: '#0ea7b5', fontSize: '24px' }}
                          />
                          <Text type="secondary" className="text-sm">
                            Calories burned at rest
                          </Text>
                        </Card>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Card className="text-center bg-gradient-to-br from-orange-50 to-orange-100">
                          <Statistic
                            title="Total Daily Energy (TDEE)"
                            value={result.tmr}
                            suffix="cal/day"
                            prefix={<FontAwesomeIcon icon={faRunning} />}
                            valueStyle={{ color: '#e8702a', fontSize: '24px' }}
                          />
                          <Text type="secondary" className="text-sm">
                            Total calories needed daily
                          </Text>
                        </Card>
                      </Col>
                    </Row>

                    <Divider>Calorie Goals</Divider>

                    {/* Weight Goals */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <Text strong>Maintain current weight</Text>
                        <Text className="text-lg font-semibold text-gray-700">{result.goals.maintain} cal</Text>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                        <Text strong className="text-green-700">Mild weight loss (0.5 lb/week)</Text>
                        <Text className="text-lg font-semibold text-green-700">{result.goals.mildWeightLoss} cal</Text>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-green-100 rounded">
                        <Text strong className="text-green-800">Weight loss (1 lb/week)</Text>
                        <Text className="text-lg font-semibold text-green-800">{result.goals.weightLoss} cal</Text>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                        <Text strong className="text-blue-700">Mild weight gain (0.5 lb/week)</Text>
                        <Text className="text-lg font-semibold text-blue-700">{result.goals.mildWeightGain} cal</Text>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-blue-100 rounded">
                        <Text strong className="text-blue-800">Weight gain (1 lb/week)</Text>
                        <Text className="text-lg font-semibold text-blue-800">{result.goals.weightGain} cal</Text>
                      </div>
                    </div>
                  </Space>
                ) : (
                  <div className="text-center py-8">
                    <FontAwesomeIcon icon={faInfoCircle} className="text-4xl text-gray-300 mb-4" />
                    <Text type="secondary">
                      Fill out the form to calculate your BMR and daily calorie needs
                    </Text>
                  </div>
                )}
              </Card>
            </Col>
          </Row>

          {/* Information Section */}
          <Row gutter={[24, 24]} className="mt-8">
            <Col xs={24} md={12}>
              <Card title="What is BMR?" className="h-full">
                <Paragraph>
                  <Text strong>Basal Metabolic Rate (BMR)</Text> is the number of calories your body needs to perform basic life-sustaining functions like breathing, circulation, cell production, nutrient processing, and protein synthesis.
                </Paragraph>
                <Paragraph>
                  Your BMR represents the minimum amount of energy needed to keep your body functioning while at rest. It typically accounts for 60-75% of your total daily calorie expenditure.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="How to Use Your Results" className="h-full">
                <Paragraph>
                  <Text strong>TDEE (Total Daily Energy Expenditure)</Text> includes your BMR plus calories burned through physical activity and exercise.
                </Paragraph>
                <Paragraph>
                  Use your TDEE to set calorie goals:
                </Paragraph>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>To maintain weight: eat your TDEE calories</li>
                  <li>To lose weight: eat 250-500 calories below TDEE</li>
                  <li>To gain weight: eat 250-500 calories above TDEE</li>
                </ul>
              </Card>
            </Col>
          </Row>

          {/* Disclaimer */}
          <Alert
            message="Important Note"
            description="This calculator provides estimates based on the Mifflin-St Jeor equation. Individual metabolic rates can vary. For personalized nutrition advice, consider consulting with a registered dietitian or healthcare provider."
            type="info"
            showIcon
            className="mt-6"
          />
        </motion.div>
      </div>
    </>
  );
};

export default BMRCalculator;
