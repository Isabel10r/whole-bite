import React, { useState } from "react";
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
  Alert,
  Spin,
  message,
  Space,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faFire,
  faRunning,
  faUser,
  faRuler,
  faWeight,
  faCalendarAlt,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const { Text, Paragraph } = Typography;
const { Option } = Select;

interface BMRFormData {
  age: number;
  gender: "male" | "female";
  weight: number;
  height: number;
  activityLevel: string;
  weightUnit: "kg" | "lbs";
  heightUnit: "cm" | "ft";
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
  const [, setFormData] = useState<BMRFormData>({
    age: 0,
    gender: "female", // Keep this for TypeScript, but form won't show it selected
    weight: 0,
    height: 0,
    activityLevel: "",
    weightUnit: "kg",
    heightUnit: "cm",
  });

  const activityLevels = [
    {
      value: "1.2",
      label: "Sedentary (little/no exercise)",
      description: "Desk job, no regular exercise",
    },
    {
      value: "1.375",
      label: "Light activity (1-3 days/week)",
      description: "Light exercise/sports 1-3 days/week",
    },
    {
      value: "1.55",
      label: "Moderate activity (3-5 days/week)",
      description: "Moderate exercise/sports 3-5 days/week",
    },
    {
      value: "1.725",
      label: "Very active (6-7 days/week)",
      description: "Hard exercise/sports 6-7 days a week",
    },
    {
      value: "1.9",
      label: "Super active (2x/day)",
      description: "Very hard exercise/sports & physical job or 2x training",
    },
  ];

  const calculateBMR = async (values: any) => {
    setLoading(true);

    try {
      // Validate input values
      const age = Number(values.age);
      const weight = Number(values.weight);
      const height = Number(values.height);
      const activityLevel = Number(values.activityLevel);

      if (
        isNaN(age) ||
        isNaN(weight) ||
        isNaN(height) ||
        isNaN(activityLevel)
      ) {
        throw new Error("Please enter valid numeric values for all fields");
      }

      if (age < 15 || age > 100) {
        throw new Error("Age must be between 15 and 100 years");
      }

      // Convert units if necessary
      let weightInKg = weight;
      let heightInCm = height;

      if (values.weightUnit === "lbs") {
        weightInKg = weight * 0.453592;
      }

      if (values.heightUnit === "ft") {
        // For feet input, assume decimal format (e.g., 5.5 = 5 feet 6 inches)
        const feet = Math.floor(height);
        const inches = (height - feet) * 12;
        heightInCm = (feet * 12 + inches) * 2.54;
      }

      // Additional validation after conversion
      if (weightInKg < 20 || weightInKg > 300) {
        throw new Error("Weight must be between 30 and 300 kg");
      }

      if (heightInCm < 100 || heightInCm > 250) {
        throw new Error("Height must be between 100 and 250 cm");
      }

      // Try to use RapidAPI first, fallback to local calculation
      let bmr: number;
      let tmr: number;

      try {
        // RapidAPI BMR calculation
        // To use the API:
        // 1. Get API key from https://rapidapi.com/tope96/api/bmr-and-tmr
        // 2. Create .env file with: VITE_RAPIDAPI_KEY=your_key_here
        const apiKey = (import.meta as any).env?.VITE_RAPIDAPI_KEY;

        if (apiKey) {
          const url = `https://bmr-and-tmr.p.rapidapi.com/bmr?age=${age}&gender=${
            values.gender
          }&weight=${Math.round(weightInKg)}&height=${Math.round(
            heightInCm
          )}&activitylevel=${activityLevel}`;

          const options = {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": apiKey,
              "X-RapidAPI-Host": "bmr-and-tmr.p.rapidapi.com",
            },
          };

          const response = await fetch(url, options);

          if (response.ok) {
            const data = await response.json();
            // Handle different possible response formats
            bmr = data.bmr || data.BMR || data.result?.bmr || data.result?.BMR;
            tmr =
              data.tmr ||
              data.TMR ||
              data.tdee ||
              data.TDEE ||
              data.result?.tmr ||
              data.result?.TMR;

            if (!bmr || !tmr) {
              console.log("API Response:", data);
              throw new Error("Invalid API response format");
            }

            console.log("API calculation successful:", { bmr, tmr });
          } else {
            const errorText = await response.text();
            console.error("API Error:", response.status, errorText);
            throw new Error(
              `API request failed with status: ${response.status}`
            );
          }
        } else {
          throw new Error("No API key available - using local calculation");
        }
      } catch (apiError) {
        console.log(
          "API calculation failed, using local calculation:",
          apiError
        );

        // Fallback: Local calculation using Mifflin-St Jeor equation
        if (values.gender === "male") {
          bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5;
        } else {
          bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;
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
        extremeWeightGain: Math.round(tmr + 750),
      };

      setResult({
        bmr: Math.round(bmr),
        tmr: Math.round(tmr),
        goals,
      });

      setFormData(values);
      message.success("BMR calculated successfully!");
    } catch (error) {
      console.error("Error calculating BMR:", error);
      message.error("Error calculating BMR. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = (values: any) => {
    calculateBMR(values);
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

  const convertHeight = (
    height: number,
    fromUnit: string,
    toUnit: string
  ): number => {
    if (!height || isNaN(height) || fromUnit === toUnit) return height;
    if (fromUnit === "cm" && toUnit === "ft") {
      // Convert cm to feet with decimal (e.g., 170cm = 5.58ft)
      return Math.round(height * 0.0328084 * 100) / 100;
    }
    if (fromUnit === "ft" && toUnit === "cm") {
      // Convert feet to cm (e.g., 5.5ft = 167.64cm)
      return Math.round(height * 30.48 * 10) / 10;
    }
    return height;
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

  const handleHeightUnitChange = (unit: "cm" | "ft") => {
    const currentHeight = form.getFieldValue("height");
    const currentUnit = form.getFieldValue("heightUnit");

    if (currentHeight && !isNaN(currentHeight) && currentUnit !== unit) {
      const convertedHeight = convertHeight(currentHeight, currentUnit, unit);
      form.setFieldsValue({
        height: convertedHeight,
        heightUnit: unit,
      });
    } else {
      form.setFieldsValue({ heightUnit: unit });
    }
  };

  return (
    <>
      <Helmet>
        <title>
          BMR Calculator - Calculate Your Basal Metabolic Rate | Whole Bite
        </title>
        <meta
          name="description"
          content="Calculate your Basal Metabolic Rate and daily calorie needs with our free BMR calculator. Get personalized nutrition recommendations."
        />
        <meta
          name="keywords"
          content="BMR calculator, basal metabolic rate, calorie calculator, metabolism, weight loss, weight gain, TDEE calculator, daily calorie needs"
        />

        {/* Open Graph / Facebook */}
        <meta
          property="og:title"
          content="BMR Calculator - Calculate Your Basal Metabolic Rate"
        />
        <meta
          property="og:description"
          content="Calculate your Basal Metabolic Rate and daily calorie needs with our free BMR calculator. Get personalized nutrition recommendations."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.whole-bite.com/calculator/bmr"
        />
        <meta
          property="og:image"
          content="https://www.whole-bite.com/images/isabel-diez-portrait.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="BMR Calculator - Calculate Your Basal Metabolic Rate"
        />
        <meta
          name="twitter:description"
          content="Free BMR calculator to determine your daily calorie needs and metabolism rate."
        />

        {/* Additional Meta Tags */}
        <meta name="author" content="Whole Bite Nutrition" />
        <link
          rel="canonical"
          href="https://www.whole-bite.com/calculator/bmr"
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
                  icon={faCalculator}
                  className="mr-4 text-[#10b981]"
                />
                BMR Calculator
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                style={{ color: "#2E2E2E" }}
              >
                Calculate your Basal Metabolic Rate and daily calorie needs
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
                        heightUnit: "cm",
                      }}
                      onFinish={onFinish}
                    >
                      <Row gutter={16}>
                        <Col xs={24} sm={12}>
                          <Form.Item
                            label={
                              <span>
                                <FontAwesomeIcon
                                  icon={faCalendarAlt}
                                  className="mr-2 text-[#e74c3c]"
                                />
                                Age
                              </span>
                            }
                            name="age"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your age",
                              },
                              {
                                validator: (_, value) => {
                                  const num = Number(value);
                                  if (!value || isNaN(num)) {
                                    return Promise.reject(
                                      new Error("Please enter a valid age")
                                    );
                                  }
                                  if (num < 15 || num > 100) {
                                    return Promise.reject(
                                      new Error(
                                        "Age must be between 15 and 100"
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
                              placeholder="Enter your age (15-100)"
                              suffix="years"
                              min="15"
                              max="100"
                              step="1"
                              className="rounded-lg border-[#b2d4c7] focus:border-[#10b981] shadow-sm"
                              style={{
                                borderRadius: "12px",
                                padding: "8px 12px",
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Form.Item
                            label={
                              <span>
                                <FontAwesomeIcon
                                  icon={faUser}
                                  className="mr-2 text-[#9b59b6]"
                                />
                                Gender
                              </span>
                            }
                            name="gender"
                            rules={[
                              {
                                required: true,
                                message: "Please select your gender",
                              },
                            ]}
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

                      <Row gutter={16}>
                        <Col xs={16}>
                          <Form.Item
                            label={
                              <span>
                                <FontAwesomeIcon
                                  icon={faRuler}
                                  className="mr-2 text-[#f39c12]"
                                />
                                Height
                              </span>
                            }
                            name="height"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your height",
                              },
                              {
                                validator: (_, value) => {
                                  const num = Number(value);
                                  const unit = form.getFieldValue("heightUnit");
                                  if (!value || isNaN(num)) {
                                    return Promise.reject(
                                      new Error("Please enter a valid height")
                                    );
                                  }
                                  if (unit === "cm") {
                                    if (num < 100 || num > 250) {
                                      return Promise.reject(
                                        new Error(
                                          "Height must be between 100-250 cm"
                                        )
                                      );
                                    }
                                  } else if (unit === "ft") {
                                    if (num < 3 || num > 8) {
                                      return Promise.reject(
                                        new Error(
                                          "Height must be between 3-8 feet"
                                        )
                                      );
                                    }
                                  }
                                  return Promise.resolve();
                                },
                              },
                            ]}
                          >
                            <Input
                              type="number"
                              placeholder="Enter your height"
                              min="50"
                              max="300"
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
                          <Form.Item label="Unit" name="heightUnit">
                            <Select
                              onChange={handleHeightUnitChange}
                              className="rounded-lg"
                              style={{
                                borderRadius: "12px",
                              }}
                            >
                              <Option value="cm">cm</Option>
                              <Option value="ft">ft</Option>
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
                          placeholder="Choose your daily activity level"
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
                          Calculate BMR
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
                          <Text>Calculating your BMR...</Text>
                        </div>
                      </div>
                    ) : result ? (
                      <Space
                        direction="vertical"
                        size="large"
                        className="w-full"
                      >
                        {/* BMR and TMR */}
                        <Row gutter={16}>
                          <Col xs={24} sm={12}>
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
                                      icon={faFire}
                                      className="text-xl text-[#e74c3c]"
                                    />
                                  </div>
                                  <Text
                                    strong
                                    style={{
                                      color: "#2E2E2E",
                                      fontSize: "16px",
                                    }}
                                  >
                                    Basal Metabolic Rate (BMR)
                                  </Text>
                                </div>
                                <div
                                  className="text-3xl font-bold mb-2"
                                  style={{ color: "#e74c3c" }}
                                >
                                  {result.bmr}
                                </div>
                                <Text
                                  type="secondary"
                                  className="text-sm"
                                  style={{ color: "#7c8784" }}
                                >
                                  Calories burned at rest
                                </Text>
                              </Card>
                            </motion.div>
                          </Col>
                          <Col xs={24} sm={12}>
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: 0.2 }}
                            >
                              <Card
                                className="text-center shadow-lg border border-[#24604c]/20 rounded-2xl"
                                style={{
                                  background:
                                    "linear-gradient(135deg, #24604c/10 0%, white 50%, #24604c/5 100%)",
                                }}
                              >
                                <div className="mb-3">
                                  <div className="w-12 h-12 rounded-full bg-[#27ae60]/10 flex items-center justify-center mx-auto mb-2">
                                    <FontAwesomeIcon
                                      icon={faRunning}
                                      className="text-xl text-[#27ae60]"
                                    />
                                  </div>
                                  <Text
                                    strong
                                    style={{
                                      color: "#2E2E2E",
                                      fontSize: "16px",
                                    }}
                                  >
                                    Total Daily Energy (TDEE)
                                  </Text>
                                </div>
                                <div
                                  className="text-3xl font-bold mb-2"
                                  style={{ color: "#27ae60" }}
                                >
                                  {result.tmr}
                                </div>
                                <Text
                                  type="secondary"
                                  className="text-sm"
                                  style={{ color: "#7c8784" }}
                                >
                                  Total calories needed daily
                                </Text>
                              </Card>
                            </motion.div>
                          </Col>
                        </Row>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                        >
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-[#f39c12]/10 flex items-center justify-center">
                              <FontAwesomeIcon
                                icon={faFire}
                                className="text-[#f39c12] text-lg"
                              />
                            </div>
                            <Text
                              strong
                              style={{ color: "#2E2E2E", fontSize: "18px" }}
                            >
                              Calorie Goals
                            </Text>
                          </div>
                        </motion.div>

                        {/* Weight Goals */}
                        <div className="space-y-3">
                          <motion.div
                            className="flex justify-between items-center p-4 bg-white/60 border border-gray-100 rounded-xl shadow-sm"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                          >
                            <Text strong style={{ color: "#2E2E2E" }}>
                              Maintain current weight
                            </Text>
                            <Text
                              className="text-lg font-semibold"
                              style={{ color: "#2E2E2E" }}
                            >
                              {result.goals.maintain} cal
                            </Text>
                          </motion.div>

                          <motion.div
                            className="flex justify-between items-center p-4 bg-gradient-to-r from-[#10b981]/10 to-[#90cbb9]/10 border border-[#10b981]/30 rounded-xl shadow-sm"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                          >
                            <Text strong style={{ color: "#10b981" }}>
                              Mild weight loss (0.5 lb/week)
                            </Text>
                            <Text
                              className="text-lg font-semibold"
                              style={{ color: "#10b981" }}
                            >
                              {result.goals.mildWeightLoss} cal
                            </Text>
                          </motion.div>

                          <motion.div
                            className="flex justify-between items-center p-4 bg-gradient-to-r from-[#24604c]/10 to-[#10b981]/10 border border-[#24604c]/30 rounded-xl shadow-sm"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.6 }}
                          >
                            <Text strong style={{ color: "#24604c" }}>
                              Weight loss (1 lb/week)
                            </Text>
                            <Text
                              className="text-lg font-semibold"
                              style={{ color: "#24604c" }}
                            >
                              {result.goals.weightLoss} cal
                            </Text>
                          </motion.div>

                          <motion.div
                            className="flex justify-between items-center p-4 bg-gradient-to-r from-[#90cbb9]/10 to-[#b2d4c7]/10 border border-[#90cbb9]/30 rounded-xl shadow-sm"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.7 }}
                          >
                            <Text strong style={{ color: "#90cbb9" }}>
                              Mild weight gain (0.5 lb/week)
                            </Text>
                            <Text
                              className="text-lg font-semibold"
                              style={{ color: "#90cbb9" }}
                            >
                              {result.goals.mildWeightGain} cal
                            </Text>
                          </motion.div>

                          <motion.div
                            className="flex justify-between items-center p-4 bg-gradient-to-r from-[#b2d4c7]/20 to-[#90cbb9]/20 border border-[#b2d4c7]/30 rounded-xl shadow-sm"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.8 }}
                          >
                            <Text strong style={{ color: "#24604c" }}>
                              Weight gain (1 lb/week)
                            </Text>
                            <Text
                              className="text-lg font-semibold"
                              style={{ color: "#24604c" }}
                            >
                              {result.goals.weightGain} cal
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
                          Fill out the form to calculate your BMR and daily
                          calorie needs
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
                          What is BMR?
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
                        Basal Metabolic Rate (BMR)
                      </Text>{" "}
                      is the number of calories your body needs to perform basic
                      life-sustaining functions like breathing, circulation,
                      cell production, nutrient processing, and protein
                      synthesis.
                    </Paragraph>
                    <Paragraph>
                      Your BMR represents the minimum amount of energy needed to
                      keep your body functioning while at rest. It typically
                      accounts for 60-75% of your total daily calorie
                      expenditure.
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
                          How to Use Your Results
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
                        TDEE (Total Daily Energy Expenditure)
                      </Text>{" "}
                      includes your BMR plus calories burned through physical
                      activity and exercise.
                    </Paragraph>
                    <Paragraph>Use your TDEE to set calorie goals:</Paragraph>
                    <ul
                      className="list-disc list-inside space-y-1"
                      style={{ color: "#7c8784" }}
                    >
                      <li>To maintain weight: eat your TDEE calories</li>
                      <li>To lose weight: eat 250-500 calories below TDEE</li>
                      <li>To gain weight: eat 250-500 calories above TDEE</li>
                    </ul>
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
                description="This calculator provides estimates based on the Mifflin-St Jeor equation. Individual metabolic rates can vary. For personalized nutrition advice, consider consulting with a registered dietitian or healthcare provider."
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

export default BMRCalculator;
