import { useState, useEffect } from 'react'
import { 
  Row, 
  Col, 
  Card, 
  Input, 
  Button, 
  Select, 
  Table, 
  Typography, 
  Space, 
  Progress, 
  Statistic,
  Divider,
  Alert
} from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faSearch, 
  faPlus, 
  faTrash,
  faCalculator,
  faFire,
  faUtensils,
  faLeaf
} from '@fortawesome/free-solid-svg-icons'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

const { Title, Text } = Typography
const { Option } = Select

const NutritionCalculator: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFood, setSelectedFood] = useState(null)
  const [quantity, setQuantity] = useState(100)
  const [unit, setUnit] = useState('g')
  const [foodList, setFoodList] = useState([])
  const [totalNutrition, setTotalNutrition] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0
  })

  // Sample food database
  const foodDatabase = [
    { id: 1, name: 'Apple', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, sugar: 10.4, unit: 'g' },
    { id: 2, name: 'Banana', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, sugar: 12.2, unit: 'g' },
    { id: 3, name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, sugar: 0, unit: 'g' },
    { id: 4, name: 'Brown Rice', calories: 111, protein: 2.6, carbs: 23, fat: 0.9, fiber: 1.8, sugar: 0.4, unit: 'g' },
    { id: 5, name: 'Broccoli', calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6, sugar: 1.5, unit: 'g' },
    { id: 6, name: 'Salmon', calories: 208, protein: 25, carbs: 0, fat: 12, fiber: 0, sugar: 0, unit: 'g' },
    { id: 7, name: 'Avocado', calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7, sugar: 0.7, unit: 'g' },
    { id: 8, name: 'Greek Yogurt', calories: 59, protein: 10, carbs: 3.6, fat: 0.4, fiber: 0, sugar: 3.6, unit: 'g' },
    { id: 9, name: 'Almonds', calories: 579, protein: 21, carbs: 22, fat: 50, fiber: 12, sugar: 4.4, unit: 'g' },
    { id: 10, name: 'Sweet Potato', calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3, sugar: 4.2, unit: 'g' }
  ]

  const filteredFoods = foodDatabase.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addFood = () => {
    if (selectedFood && quantity > 0) {
      const multiplier = quantity / 100 // Convert to per 100g basis
      const nutrition = {
        id: Date.now(),
        name: selectedFood.name,
        quantity: quantity,
        unit: unit,
        calories: Math.round(selectedFood.calories * multiplier),
        protein: Math.round(selectedFood.protein * multiplier * 10) / 10,
        carbs: Math.round(selectedFood.carbs * multiplier * 10) / 10,
        fat: Math.round(selectedFood.fat * multiplier * 10) / 10,
        fiber: Math.round(selectedFood.fiber * multiplier * 10) / 10,
        sugar: Math.round(selectedFood.sugar * multiplier * 10) / 10
      }

      setFoodList([...foodList, nutrition])
      updateTotalNutrition([...foodList, nutrition])
    }
  }

  const removeFood = (id) => {
    const updatedList = foodList.filter(food => food.id !== id)
    setFoodList(updatedList)
    updateTotalNutrition(updatedList)
  }

  const updateTotalNutrition = (list) => {
    const totals = list.reduce((acc, food) => ({
      calories: acc.calories + food.calories,
      protein: acc.protein + food.protein,
      carbs: acc.carbs + food.carbs,
      fat: acc.fat + food.fat,
      fiber: acc.fiber + food.fiber,
      sugar: acc.sugar + food.sugar
    }), { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 })

    setTotalNutrition(totals)
  }

  const columns = [
    {
      title: 'Food',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) => `${quantity}${record.unit}`,
    },
    {
      title: 'Calories',
      dataIndex: 'calories',
      key: 'calories',
    },
    {
      title: 'Protein (g)',
      dataIndex: 'protein',
      key: 'protein',
    },
    {
      title: 'Carbs (g)',
      dataIndex: 'carbs',
      key: 'carbs',
    },
    {
      title: 'Fat (g)',
      dataIndex: 'fat',
      key: 'fat',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="text" 
          danger 
          icon={<FontAwesomeIcon icon={faTrash} />} 
          onClick={() => removeFood(record.id)}
        />
      ),
    },
  ]

  const macronutrientData = [
    { name: 'Protein', value: totalNutrition.protein * 4, color: '#52c41a' },
    { name: 'Carbs', value: totalNutrition.carbs * 4, color: '#1890ff' },
    { name: 'Fat', value: totalNutrition.fat * 9, color: '#faad14' }
  ]

  const dailyGoals = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 67
  }

  return (
    <>
      <Helmet>
        <title>Nutrition Calculator - NutriGuide</title>
        <meta name="description" content="Calculate calories, macronutrients, and micronutrients for any food or recipe. Track your daily nutrition intake." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <Title level={1} className="text-4xl font-bold mb-4">
              <FontAwesomeIcon icon={faCalculator} className="mr-3 text-green-500" />
              Nutrition Calculator
            </Title>
            <Text className="text-lg text-gray-600">
              Track your daily nutrition intake and make informed dietary choices
            </Text>
          </div>

          <Row gutter={[24, 24]}>
            {/* Food Search and Add */}
            <Col xs={24} lg={8}>
              <Card title="Add Food" className="h-full">
                <Space direction="vertical" size="middle" className="w-full">
                  <div>
                    <Text strong>Search Food:</Text>
                    <Input
                      placeholder="Search for food items..."
                      prefix={<FontAwesomeIcon icon={faSearch} />}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  {searchTerm && (
                    <div className="max-h-48 overflow-y-auto">
                      {filteredFoods.map(food => (
                        <div
                          key={food.id}
                          className={`p-2 cursor-pointer hover:bg-gray-50 rounded ${
                            selectedFood?.id === food.id ? 'bg-green-50 border border-green-200' : ''
                          }`}
                          onClick={() => setSelectedFood(food)}
                        >
                          <Text strong>{food.name}</Text>
                          <br />
                          <Text type="secondary">
                            {food.calories} cal per 100g
                          </Text>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedFood && (
                    <>
                      <div>
                        <Text strong>Quantity:</Text>
                        <Input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(Number(e.target.value))}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Text strong>Unit:</Text>
                        <Select
                          value={unit}
                          onChange={setUnit}
                          className="w-full mt-2"
                        >
                          <Option value="g">Grams (g)</Option>
                          <Option value="oz">Ounces (oz)</Option>
                          <Option value="cup">Cup</Option>
                          <Option value="tbsp">Tablespoon</Option>
                          <Option value="tsp">Teaspoon</Option>
                        </Select>
                      </div>

                      <Button
                        type="primary"
                        icon={<FontAwesomeIcon icon={faPlus} />}
                        onClick={addFood}
                        className="w-full"
                        disabled={!selectedFood || quantity <= 0}
                      >
                        Add to List
                      </Button>
                    </>
                  )}
                </Space>
              </Card>
            </Col>

            {/* Nutrition Summary */}
            <Col xs={24} lg={16}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                  <Card className="text-center">
                    <Statistic
                      title="Total Calories"
                      value={totalNutrition.calories}
                      prefix={<FontAwesomeIcon icon={faFire} />}
                      valueStyle={{ color: '#faad14' }}
                    />
                    <Progress
                      percent={Math.min((totalNutrition.calories / dailyGoals.calories) * 100, 100)}
                      size="small"
                      className="mt-2"
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Card className="text-center">
                    <Statistic
                      title="Protein (g)"
                      value={totalNutrition.protein}
                      prefix={<FontAwesomeIcon icon={faUtensils} />}
                      valueStyle={{ color: '#52c41a' }}
                    />
                    <Progress
                      percent={Math.min((totalNutrition.protein / dailyGoals.protein) * 100, 100)}
                      size="small"
                      className="mt-2"
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Card className="text-center">
                    <Statistic
                      title="Carbs (g)"
                      value={totalNutrition.carbs}
                      prefix={<FontAwesomeIcon icon={faLeaf} />}
                      valueStyle={{ color: '#1890ff' }}
                    />
                    <Progress
                      percent={Math.min((totalNutrition.carbs / dailyGoals.carbs) * 100, 100)}
                      size="small"
                      className="mt-2"
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Card className="text-center">
                    <Statistic
                      title="Fat (g)"
                      value={totalNutrition.fat}
                      valueStyle={{ color: '#722ed1' }}
                    />
                    <Progress
                      percent={Math.min((totalNutrition.fat / dailyGoals.fat) * 100, 100)}
                      size="small"
                      className="mt-2"
                    />
                  </Card>
                </Col>
              </Row>

              {/* Macronutrient Chart */}
              <Card title="Macronutrient Distribution" className="mt-4">
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={macronutrientData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          dataKey="value"
                        >
                          {macronutrientData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="space-y-2">
                      {macronutrientData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div 
                              className="w-4 h-4 rounded mr-2" 
                              style={{ backgroundColor: item.color }}
                            />
                            <Text>{item.name}</Text>
                          </div>
                          <Text strong>{item.value} cal</Text>
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          {/* Food List Table */}
          <Card title="Your Food List" className="mt-6">
            {foodList.length > 0 ? (
              <Table
                columns={columns}
                dataSource={foodList}
                rowKey="id"
                pagination={false}
                size="small"
              />
            ) : (
              <div className="text-center py-8">
                <Text type="secondary">No foods added yet. Search and add foods to start tracking your nutrition!</Text>
              </div>
            )}
          </Card>

          {/* Tips */}
          <Alert
            message="Nutrition Tips"
            description="Remember to drink plenty of water throughout the day. Aim for at least 8 glasses (64 oz) of water daily to support your metabolism and overall health."
            type="info"
            showIcon
            className="mt-6"
          />
        </motion.div>
      </div>
    </>
  )
}

export default NutritionCalculator
