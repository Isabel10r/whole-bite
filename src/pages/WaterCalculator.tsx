import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  Typography,
  Alert,
  Spin,
  message,
  Space,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTint,
  faWeight,
  faRunning,
  faUser,
  faInfoCircle,
  faGlassWater,
  faCalculator,
  faCalendarAlt,
  faRuler,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const { Text, Paragraph } = Typography;
const { Option } = Select;

interface WaterFormData {
  weight: number;
  activityLevel: string;
  weightUnit: "kg" | "lbs";
  gender: "male" | "female";
  climate: string;
}

interface WaterResult {
  baseIntake: number;
  activityAdjustment: number;
  climateAdjustment: number;
  totalIntake: number;
  recommendations: {
    morning: number;
    afternoon: number;
    evening: number;
  };
}

const WaterCalculator: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WaterResult | null>(null);

  const activityLevels = [
    {
      value: "sedentary",
      label: "Sedentary (little to no exercise)",
      description: "Sedentary (little to no exercise)",
      multiplier: 0.03,
    },
    {
      value: "light",
      label: "Light (exercise 1-3 days/week)",
      description: "Light (exercise 1-3 days/week)",
      multiplier: 0.035,
    },
    {
      value: "moderate",
      label: "Moderate (exercise 3-5 days/week)",
      description: "Moderate (exercise 3-5 days/week)",
      multiplier: 0.04,
    },
    {
      value: "high",
      label: "High (exercise 6-7 days/week)",
      description: "High (exercise 6-7 days/week)",
      multiplier: 0.045,
    },
    {
      value: "very_high",
      label: "Very High (intense daily exercise)",
      description: "Very High (intense daily exercise)",
      multiplier: 0.05,
    },
  ];

  const climateConditions = [
    {
      value: "temperate",
      label: "Temperate (15-25°C / 59-77°F)",
      description: "Temperate (15-25°C / 59-77°F)",
      adjustment: 0,
    },
    { value: "warm", label: "Warm (25-32°C / 77-90°F)", description: "Warm (25-32°C / 77-90°F)", adjustment: 0.5 },
    { value: "hot", label: "Hot (32°C+ / 90°F+)", description: "Hot (32°C+ / 90°F+)", adjustment: 1.0 },
    { value: "humid", label: "Humid (high humidity)", description: "Humid (high humidity)", adjustment: 0.3 },
  ];

  const calculateWaterIntake = async (values: any) => {
    setLoading(true);

    try {
      // Validate input values
      const weight = Number(values.weight);
      const activityLevel = values.activityLevel;
      const climate = values.climate;

      if (isNaN(weight) || weight <= 0) {
        throw new Error("Please enter a valid weight");
      }

      if (weight < 20 || weight > 300) {
        throw new Error("Weight must be between 20-300 kg (or equivalent)");
      }

      // Convert weight to kg if necessary
      let weightInKg = weight;
      if (values.weightUnit === "lbs") {
        weightInKg = weight * 0.453592;
      }

      // Find activity level multiplier
      const activityData = activityLevels.find(
        (level) => level.value === activityLevel
      );
      if (!activityData) {
        throw new Error("Please select a valid activity level");
      }

      // Find climate adjustment
      const climateData = climateConditions.find(
        (condition) => condition.value === climate
      );
      if (!climateData) {
        throw new Error("Please select a valid climate condition");
      }

      // Calculate base water intake based on scientific formula
      // Based on EFSA and National Academies recommendations: 30-50ml per kg body weight
      const baseIntake = weightInKg * activityData.multiplier * 1000; // Convert to ml

      // Apply climate adjustment (in liters)
      const climateAdjustment = climateData.adjustment;

      // Calculate total intake
      const totalIntake = baseIntake + climateAdjustment * 1000; // Convert climate adjustment to ml

      // Calculate recommendations for different times of day
      const morning = Math.round(totalIntake * 0.3); // 30% in the morning
      const afternoon = Math.round(totalIntake * 0.4); // 40% in the afternoon
      const evening = Math.round(totalIntake * 0.3); // 30% in the evening

      setResult({
        baseIntake: Math.round(baseIntake),
        activityAdjustment: Math.round(baseIntake - weightInKg * 0.03 * 1000), // Difference from sedentary
        climateAdjustment: Math.round(climateAdjustment * 1000),
        totalIntake: Math.round(totalIntake),
        recommendations: {
          morning,
          afternoon,
          evening,
        },
      });

      message.success("Water intake calculated successfully!");
    } catch (error) {
      console.error("Error calculating water intake:", error);
      message.error("Error calculating water intake. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = (values: any) => {
    calculateWaterIntake(values);
  };

  const convertWeight = (
    weight: number,
    fromUnit: string,
    toUnit: string
  ): number => {
    if (!weight || isNaN(weight) || fromUnit === toUnit) return weight;
    if (fromUnit === "kg" && toUnit === "lbs")
      return Math.round(weight * 2.20462 * 10) / 10;
    if (fromUnit === "lbs" && toUnit === "kg")
      return Math.round(weight * 0.453592 * 10) / 10;
    return weight;
  };

  const handleWeightUnitChange = (unit: "kg" | "lbs") => {
    const currentWeight = form.getFieldValue("weight");
    const currentUnit = form.getFieldValue("weightUnit");

    if (currentWeight && !isNaN(currentWeight) && currentUnit !== unit) {
      const convertedWeight = convertWeight(currentWeight, currentUnit, unit);
      form.setFieldsValue({
        weight: convertedWeight,
        weightUnit: unit,
      });
    } else {
      form.setFieldsValue({ weightUnit: unit });
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Water Intake Calculator - Calculate Daily Hydration Needs | Whole Bite
        </title>
        <meta
          name="description"
          content="Calculate your daily water intake needs based on your weight, activity level, and lifestyle. Stay hydrated with personalized recommendations."
        />
        <meta
          name="keywords"
          content="water calculator, hydration calculator, daily water intake, fluid needs, hydration recommendations, water consumption"
        />

        {/* Open Graph / Facebook */}
        <meta
          property="og:title"
          content="Water Intake Calculator - Calculate Daily Hydration Needs"
        />
        <meta
          property="og:description"
          content="Calculate your daily water intake needs based on your weight, activity level, and lifestyle."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.whole-bite.com/calculator/water"
        />
        <meta
          property="og:image"
          content="https://www.whole-bite.com/images/isabel-diez-portrait.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Water Intake Calculator" />
        <meta
          name="twitter:description"
          content="Free calculator to determine your daily water needs for optimal hydration."
        />

        {/* Additional Meta Tags */}
        <meta name="author" content="Whole Bite Nutrition" />
        <link
          rel="canonical"
          href="https://www.whole-bite.com/calculator/water"
        />
      </Helmet>

      <div className="min-h-screen bg-[#F7F7F7] relative overflow-hidden">
        {/* Floating Bubbles Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-24 h-24 rounded-full opacity-30"
            style={{
              background: `radial-gradient(circle, #b2d4c7 0%, #90cbb9 30%, transparent 70%)`,
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, 8, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-32 h-32 rounded-full opacity-30"
            style={{
              background: `radial-gradient(circle, #b2d4c7 0%, #10b981 40%, transparent 80%)`,
            }}
            animate={{
              y: [0, 12, 0],
              x: [0, -6, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full opacity-30"
            style={{
              background: `radial-gradient(circle, #90cbb9 0%, #b2d4c7 50%, transparent 90%)`,
            }}
            animate={{
              y: [0, -8, 0],
              x: [0, 5, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/3 w-16 h-16 rounded-full opacity-30"
            style={{
              background: `radial-gradient(circle, #b2d4c7 0%, transparent 60%)`,
            }}
            animate={{
              y: [0, -10, 0],
              x: [0, 4, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-16">
              <motion.h1
                className="text-5xl md:text-6xl font-bold mb-6 tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ color: "#2E2E2E" }}
              >
                <FontAwesomeIcon
                  icon={faTint}
                  className="mr-4 text-[#10b981]"
                />
                Water Intake Calculator
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                style={{ color: "#2E2E2E" }}
              >
                Calculate your daily hydration needs based on scientific
                evidence from EFSA and National Academies of Sciences
              </motion.p>
            </div>

            <Row gutter={[24, 24]}>
              {/* Input Form */}
              <Col xs={24} lg={12}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card
                    title={
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#10b981]/10 flex items-center justify-center">
                          <FontAwesomeIcon
                            icon={faUser}
                            className="text-[#10b981] text-lg"
                          />
                        </div>
                        <span
                          style={{
                            color: "#2E2E2E",
                            fontSize: "18px",
                            fontWeight: "bold",
                          }}
                        >
                          Your Information
                        </span>
                      </div>
                    }
                    className="h-full shadow-lg border border-[#24604c]/20 rounded-2xl"
                    style={{
                      background:
                        "linear-gradient(135deg, #24604c/5 0%, white 50%, #10b981/5 100%)",
                    }}
                  >
                    <Form
                      form={form}
                      layout="vertical"
                      initialValues={{
                        weightUnit: "kg",
                        gender: "female",
                      }}
                      onFinish={onFinish}
                    >
                      <Row gutter={16}>
                        <Col xs={16}>
                          <Form.Item
                            label={
                              <span>
                                <FontAwesomeIcon
                                  icon={faWeight}
                                  className="mr-2 text-[#3498db]"
                                />
                                Weight
                              </span>
                            }
                            name="weight"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your weight",
                              },
                              {
                                validator: (_, value) => {
                                  const num = Number(value);
                                  if (!value || isNaN(num)) {
                                    return Promise.reject(
                                      new Error("Please enter a valid weight")
                                    );
                                  }
                                  if (num <= 0 || num > 500) {
                                    return Promise.reject(
                                      new Error(
                                        "Please enter a valid weight (1-500)"
                                      )
                                    );
                                  }
                                  return Promise.resolve();
                                },
                              },
                            ]}
                          >
                            <Input
                              type="number"
                              placeholder="Enter your weight"
                              min="20"
                              max="500"
                              step="0.1"
                              className="rounded-lg border-[#b2d4c7] focus:border-[#10b981] shadow-sm"
                              style={{
                                borderRadius: "12px",
                                padding: "8px 12px",
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={8}>
                          <Form.Item label="Unit" name="weightUnit">
                            <Select
                              onChange={handleWeightUnitChange}
                              className="rounded-lg"
                              style={{
                                borderRadius: "12px",
                              }}
                            >
                              <Option value="kg">kg</Option>
                              <Option value="lbs">lbs</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item
                        label={
                          <span>
                            <FontAwesomeIcon
                              icon={faRunning}
                              className="mr-2 text-[#27ae60]"
                            />
                            Activity Level
                          </span>
                        }
                        name="activityLevel"
                        rules={[
                          {
                            required: true,
                            message: "Please select your activity level",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Choose your activity level"
                          optionLabelProp="label"
                          dropdownStyle={{ 
                            minWidth: "280px",
                            maxWidth: "min(400px, calc(100vw - 32px))"
                          }}
                          className="rounded-lg"
                          style={{
                            borderRadius: "12px",
                          }}
                        >
                          {activityLevels.map((level) => (
                            <Option
                              key={level.value}
                              value={level.value}
                              label={level.label}
                            >
                              <div className="py-2 px-1">
                                <div className="font-medium text-sm leading-tight mb-1">
                                  {level.label}
                                </div>
                                <div className="text-xs text-gray-500 leading-relaxed">
                                  {level.description}
                                </div>
                              </div>
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <Form.Item
                        label={
                          <span>
                            <FontAwesomeIcon
                              icon={faInfoCircle}
                              className="mr-2 text-[#f39c12]"
                            />
                            Climate Conditions
                          </span>
                        }
                        name="climate"
                        rules={[
                          {
                            required: true,
                            message: "Please select your climate condition",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Choose your climate condition"
                          optionLabelProp="label"
                          dropdownStyle={{ 
                            minWidth: "280px",
                            maxWidth: "min(400px, calc(100vw - 32px))"
                          }}
                          className="rounded-lg"
                          style={{
                            borderRadius: "12px",
                          }}
                        >
                          {climateConditions.map((condition) => (
                            <Option
                              key={condition.value}
                              value={condition.value}
                              label={condition.label}
                            >
                              <div className="py-2 px-1">
                                <div className="font-medium text-sm leading-tight mb-1">
                                  {condition.label}
                                </div>
                                <div className="text-xs text-gray-500 leading-relaxed">
                                  {condition.description}
                                </div>
                              </div>
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="primary"
                          htmlType="submit"
                          size="large"
                          loading={loading}
                          className="w-full font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                          style={{
                            backgroundColor: "#10b981",
                            borderColor: "#10b981",
                            height: "48px",
                            fontSize: "16px",
                          }}
                          icon={<FontAwesomeIcon icon={faCalculator} />}
                        >
                          Calculate Water Intake
                        </Button>
                      </motion.div>
                    </Form>
                  </Card>
                </motion.div>
              </Col>

              {/* Results */}
              <Col xs={24} lg={12}>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Card
                    title={
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#16a085]/10 flex items-center justify-center">
                          <FontAwesomeIcon
                            icon={faCalculator}
                            className="text-[#16a085] text-lg"
                          />
                        </div>
                        <span
                          style={{
                            color: "#2E2E2E",
                            fontSize: "18px",
                            fontWeight: "bold",
                          }}
                        >
                          Your Results
                        </span>
                      </div>
                    }
                    className="h-full shadow-lg border border-[#24604c]/20 rounded-2xl"
                    style={{
                      background:
                        "linear-gradient(135deg, #24604c/5 0%, white 50%, #10b981/5 100%)",
                    }}
                  >
                    {loading ? (
                      <div className="text-center py-8">
                        <Spin size="large" />
                        <div className="mt-4">
                          <Text>Calculating your water intake...</Text>
                        </div>
                      </div>
                    ) : result ? (
                      <Space
                        direction="vertical"
                        size="large"
                        className="w-full"
                      >
                        {/* Total Water Intake */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                        >
                          <Card
                            className="text-center shadow-lg border border-[#24604c]/20 rounded-2xl"
                            style={{
                              background:
                                "linear-gradient(135deg, #10b981/10 0%, white 50%, #10b981/5 100%)",
                            }}
                          >
                            <div className="mb-3">
                              <div className="w-12 h-12 rounded-full bg-[#e74c3c]/10 flex items-center justify-center mx-auto mb-2">
                                <FontAwesomeIcon
                                  icon={faTint}
                                  className="text-xl text-[#e74c3c]"
                                />
                              </div>
                              <Text
                                strong
                                style={{ color: "#2E2E2E", fontSize: "16px" }}
                              >
                                Daily Water Intake
                              </Text>
                            </div>
                            <div
                              className="text-3xl font-bold mb-2"
                              style={{ color: "#e74c3c" }}
                            >
                              {(result.totalIntake / 1000).toFixed(1)} L
                            </div>
                            <Text
                              type="secondary"
                              className="text-sm"
                              style={{ color: "#7c8784" }}
                            >
                              {result.totalIntake} ml per day
                            </Text>
                          </Card>
                        </motion.div>

                        {/* Hourly Distribution */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                        >
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-[#f39c12]/10 flex items-center justify-center">
                              <FontAwesomeIcon
                                icon={faTint}
                                className="text-[#f39c12] text-lg"
                              />
                            </div>
                            <Text
                              strong
                              style={{ color: "#2E2E2E", fontSize: "18px" }}
                            >
                              Daily Distribution
                            </Text>
                          </div>
                        </motion.div>

                        {/* Distribution Schedule */}
                        <div className="space-y-3">
                          <motion.div
                            className="flex justify-between items-center p-4 bg-white/60 border border-gray-100 rounded-xl shadow-sm"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                          >
                            <Text strong style={{ color: "#2E2E2E" }}>
                              Morning (6 AM - 12 PM)
                            </Text>
                            <Text
                              className="text-lg font-semibold"
                              style={{ color: "#2E2E2E" }}
                            >
                              {result.recommendations.morning} ml
                            </Text>
                          </motion.div>

                          <motion.div
                            className="flex justify-between items-center p-4 bg-gradient-to-r from-[#10b981]/10 to-[#90cbb9]/10 border border-[#10b981]/30 rounded-xl shadow-sm"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                          >
                            <Text strong style={{ color: "#10b981" }}>
                              Afternoon (12 PM - 6 PM)
                            </Text>
                            <Text
                              className="text-lg font-semibold"
                              style={{ color: "#10b981" }}
                            >
                              {result.recommendations.afternoon} ml
                            </Text>
                          </motion.div>

                          <motion.div
                            className="flex justify-between items-center p-4 bg-gradient-to-r from-[#24604c]/10 to-[#10b981]/10 border border-[#24604c]/30 rounded-xl shadow-sm"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.6 }}
                          >
                            <Text strong style={{ color: "#24604c" }}>
                              Evening (6 PM - 10 PM)
                            </Text>
                            <Text
                              className="text-lg font-semibold"
                              style={{ color: "#24604c" }}
                            >
                              {result.recommendations.evening} ml
                            </Text>
                          </motion.div>
                        </div>
                      </Space>
                    ) : (
                      <div className="text-center py-8">
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          className="text-4xl text-gray-300 mb-4"
                        />
                        <Text type="secondary">
                          Fill out the form to calculate your daily water intake
                          needs
                        </Text>
                      </div>
                    )}
                  </Card>
                </motion.div>
              </Col>
            </Row>

            {/* Information Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Row gutter={[24, 24]} className="mt-8">
                <Col xs={24} md={12}>
                  <Card
                    title={
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#3498db]/10 flex items-center justify-center">
                          <FontAwesomeIcon
                            icon={faInfoCircle}
                            className="text-[#3498db] text-lg"
                          />
                        </div>
                        <span
                          style={{
                            color: "#2E2E2E",
                            fontSize: "18px",
                            fontWeight: "bold",
                          }}
                        >
                          Why Hydration Matters
                        </span>
                      </div>
                    }
                    className="h-full shadow-lg border border-[#24604c]/20 rounded-2xl"
                    style={{
                      background:
                        "linear-gradient(135deg, #24604c/5 0%, white 50%, #10b981/5 100%)",
                    }}
                  >
                    <Paragraph>
                      <Text strong style={{ color: "#2E2E2E" }}>
                        Proper hydration
                      </Text>{" "}
                      is essential for maintaining optimal health and bodily
                      functions. Water plays a crucial role in temperature
                      regulation, nutrient transport, joint lubrication, and
                      waste removal.
                    </Paragraph>
                    <Paragraph>
                      The human body is approximately 60% water, and even mild
                      dehydration can affect cognitive function, physical
                      performance, and overall well-being.
                    </Paragraph>
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card
                    title={
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#9b59b6]/10 flex items-center justify-center">
                          <FontAwesomeIcon
                            icon={faCalculator}
                            className="text-[#9b59b6] text-lg"
                          />
                        </div>
                        <span
                          style={{
                            color: "#2E2E2E",
                            fontSize: "18px",
                            fontWeight: "bold",
                          }}
                        >
                          Scientific Formula
                        </span>
                      </div>
                    }
                    className="h-full shadow-lg border border-[#24604c]/20 rounded-2xl"
                    style={{
                      background:
                        "linear-gradient(135deg, #24604c/5 0%, white 50%, #10b981/5 100%)",
                    }}
                  >
                    <Paragraph>
                      <Text strong style={{ color: "#2E2E2E" }}>
                        Our calculation
                      </Text>{" "}
                      is based on scientific evidence from the European Food
                      Safety Authority (EFSA) and National Academies of
                      Sciences, Engineering, and Medicine.
                    </Paragraph>
                    <Paragraph>
                      The formula considers: weight (30-50ml per kg), activity
                      level, and climate conditions to provide personalized
                      hydration recommendations.
                    </Paragraph>
                  </Card>
                </Col>
              </Row>
            </motion.div>

            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mt-6"
            >
              <Alert
                message="Important Note"
                description="This calculator provides estimates based on scientific recommendations. Individual hydration needs may vary based on health conditions, medications, and other factors. For personalized advice, consult with a healthcare provider."
                type="info"
                showIcon
                className="rounded-xl"
                style={{
                  backgroundColor: "#90cbb9/10",
                  borderColor: "#90cbb9",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default WaterCalculator;
