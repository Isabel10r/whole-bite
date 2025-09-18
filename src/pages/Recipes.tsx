import { useState } from 'react'
import { 
  Row, 
  Col, 
  Card, 
  Input, 
  Select, 
  Button, 
  Tag, 
  Typography, 
  Space, 
  Rate,
  Modal,
  List,
  Divider
} from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faSearch, 
  faFilter, 
  faClock, 
  faUser,
  faFire,
  faBook,
  faStar
} from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

const { Title, Text, Paragraph } = Typography
const { Option } = Select
const { Meta } = Card

const Recipes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snacks', label: 'Snacks' },
    { value: 'desserts', label: 'Desserts' },
    { value: 'smoothies', label: 'Smoothies' }
  ]

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ]

  const recipes = [
    {
      id: 1,
      title: 'Quinoa Buddha Bowl',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
      category: 'lunch',
      difficulty: 'easy',
      prepTime: 15,
      cookTime: 20,
      servings: 2,
      rating: 4.8,
      calories: 420,
      protein: 18,
      carbs: 52,
      fat: 12,
      description: 'A nutritious and colorful bowl packed with quinoa, roasted vegetables, and tahini dressing.',
      ingredients: [
        '1 cup quinoa',
        '2 cups mixed vegetables (sweet potato, broccoli, bell peppers)',
        '1 avocado, sliced',
        '2 tbsp tahini',
        '1 tbsp lemon juice',
        '1 tbsp olive oil',
        'Salt and pepper to taste'
      ],
      instructions: [
        'Cook quinoa according to package instructions',
        'Preheat oven to 400°F and roast vegetables for 20 minutes',
        'Make tahini dressing by mixing tahini, lemon juice, and olive oil',
        'Assemble bowl with quinoa, roasted vegetables, and avocado',
        'Drizzle with tahini dressing and season with salt and pepper'
      ],
      tags: ['vegan', 'gluten-free', 'high-protein']
    },
    {
      id: 2,
      title: 'Green Smoothie Bowl',
      image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400',
      category: 'breakfast',
      difficulty: 'easy',
      prepTime: 10,
      cookTime: 0,
      servings: 1,
      rating: 4.6,
      calories: 280,
      protein: 12,
      carbs: 45,
      fat: 8,
      description: 'A refreshing and energizing smoothie bowl perfect for breakfast or a healthy snack.',
      ingredients: [
        '1 frozen banana',
        '1 cup spinach',
        '1/2 avocado',
        '1/2 cup almond milk',
        '1 tbsp chia seeds',
        '1 tbsp honey',
        'Toppings: granola, berries, coconut flakes'
      ],
      instructions: [
        'Blend frozen banana, spinach, avocado, and almond milk until smooth',
        'Add chia seeds and honey, blend briefly',
        'Pour into a bowl',
        'Top with granola, berries, and coconut flakes'
      ],
      tags: ['vegan', 'gluten-free', 'low-calorie']
    },
    {
      id: 3,
      title: 'Baked Salmon with Herbs',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
      category: 'dinner',
      difficulty: 'medium',
      prepTime: 15,
      cookTime: 25,
      servings: 4,
      rating: 4.9,
      calories: 320,
      protein: 35,
      carbs: 8,
      fat: 16,
      description: 'Tender baked salmon fillets with fresh herbs and lemon, served with roasted asparagus.',
      ingredients: [
        '4 salmon fillets (6 oz each)',
        '2 tbsp olive oil',
        '2 tbsp fresh dill, chopped',
        '2 tbsp fresh parsley, chopped',
        '1 lemon, juiced and zested',
        '1 lb asparagus',
        'Salt and pepper to taste'
      ],
      instructions: [
        'Preheat oven to 425°F',
        'Season salmon with salt, pepper, and herbs',
        'Place salmon on baking sheet with asparagus',
        'Drizzle with olive oil and lemon juice',
        'Bake for 20-25 minutes until salmon flakes easily'
      ],
      tags: ['high-protein', 'low-carb', 'omega-3']
    },
    {
      id: 4,
      title: 'Mediterranean Chickpea Salad',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
      category: 'lunch',
      difficulty: 'easy',
      prepTime: 20,
      cookTime: 0,
      servings: 4,
      rating: 4.7,
      calories: 250,
      protein: 12,
      carbs: 35,
      fat: 8,
      description: 'A fresh and flavorful salad with chickpeas, tomatoes, cucumbers, and Mediterranean herbs.',
      ingredients: [
        '2 cups cooked chickpeas',
        '1 cup cherry tomatoes, halved',
        '1 cucumber, diced',
        '1/2 red onion, thinly sliced',
        '1/2 cup kalamata olives',
        '1/4 cup fresh parsley',
        '3 tbsp olive oil',
        '2 tbsp red wine vinegar',
        '1 tsp oregano'
      ],
      instructions: [
        'Combine chickpeas, tomatoes, cucumber, and red onion in a large bowl',
        'Add olives and parsley',
        'Whisk together olive oil, vinegar, and oregano for dressing',
        'Pour dressing over salad and toss to combine',
        'Let marinate for 15 minutes before serving'
      ],
      tags: ['vegan', 'gluten-free', 'high-fiber']
    },
    {
      id: 5,
      title: 'Overnight Oats with Berries',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
      category: 'breakfast',
      difficulty: 'easy',
      prepTime: 10,
      cookTime: 0,
      servings: 1,
      rating: 4.5,
      calories: 320,
      protein: 15,
      carbs: 45,
      fat: 8,
      description: 'Creamy overnight oats with fresh berries and a touch of honey, perfect for busy mornings.',
      ingredients: [
        '1/2 cup rolled oats',
        '1/2 cup almond milk',
        '1 tbsp chia seeds',
        '1 tbsp honey',
        '1/2 cup mixed berries',
        '1 tbsp almond butter',
        '1 tsp vanilla extract'
      ],
      instructions: [
        'Mix oats, almond milk, chia seeds, and vanilla in a jar',
        'Add honey and stir well',
        'Refrigerate overnight or for at least 4 hours',
        'Top with berries and almond butter before serving'
      ],
      tags: ['vegan', 'gluten-free', 'meal-prep']
    },
    {
      id: 6,
      title: 'Grilled Chicken with Sweet Potato',
      image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400',
      category: 'dinner',
      difficulty: 'medium',
      prepTime: 20,
      cookTime: 30,
      servings: 4,
      rating: 4.8,
      calories: 380,
      protein: 40,
      carbs: 25,
      fat: 12,
      description: 'Juicy grilled chicken breast with roasted sweet potato and steamed broccoli.',
      ingredients: [
        '4 chicken breasts',
        '2 large sweet potatoes',
        '2 cups broccoli florets',
        '2 tbsp olive oil',
        '1 tsp paprika',
        '1 tsp garlic powder',
        'Salt and pepper to taste'
      ],
      instructions: [
        'Season chicken with paprika, garlic powder, salt, and pepper',
        'Cut sweet potatoes into wedges and toss with olive oil',
        'Grill chicken for 6-7 minutes per side',
        'Roast sweet potatoes at 400°F for 25-30 minutes',
        'Steam broccoli for 5-7 minutes until tender'
      ],
      tags: ['high-protein', 'gluten-free', 'balanced']
    }
  ]

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty
    
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#10b981'
      case 'medium': return '#90cbb9'
      case 'hard': return '#24604c'
      default: return '#10b981'
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      breakfast: '#90cbb9',
      lunch: '#10b981',
      dinner: '#24604c',
      snacks: '#10b981',
      desserts: '#90cbb9',
      smoothies: '#10b981'
    }
    return colors[category] || '#10b981'
  }

  const showRecipeModal = (recipe: any) => {
    setSelectedRecipe(recipe)
    setModalVisible(true)
  }

  return (
    <>
      <Helmet>
        <title>Healthy Recipes - Isabel Diez</title>
        <meta name="description" content="Discover delicious and nutritious recipes for every meal. From breakfast to dinner, find healthy options that fit your family's lifestyle." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <Title level={1} className="text-4xl font-bold mb-4" style={{ color: '#2E2E2E' }}>
              <FontAwesomeIcon icon={faBook} className="mr-3" style={{ color: '#10b981' }} />
              Healthy Recipes
            </Title>
            <Text className="text-lg" style={{ color: '#2E2E2E' }}>
              Discover delicious and nutritious recipes for every meal
            </Text>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={12} md={8}>
                <Input
                  placeholder="Search recipes..."
                  prefix={<FontAwesomeIcon icon={faSearch} />}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  size="large"
                />
              </Col>
              <Col xs={12} sm={6} md={4}>
                <Select
                  placeholder="Category"
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  size="large"
                  className="w-full"
                >
                  {categories.map(cat => (
                    <Option key={cat.value} value={cat.value}>
                      {cat.label}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col xs={12} sm={6} md={4}>
                <Select
                  placeholder="Difficulty"
                  value={selectedDifficulty}
                  onChange={setSelectedDifficulty}
                  size="large"
                  className="w-full"
                >
                  {difficulties.map(diff => (
                    <Option key={diff.value} value={diff.value}>
                      {diff.label}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Space>
                  <Button 
                    icon={<FontAwesomeIcon icon={faFilter} />} 
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCategory('all')
                      setSelectedDifficulty('all')
                    }}
                  >
                    Clear Filters
                  </Button>
                </Space>
              </Col>
            </Row>
          </Card>

          {/* Recipe Grid */}
          <Row gutter={[24, 24]}>
            {filteredRecipes.map((recipe, index) => (
              <Col xs={24} sm={12} lg={8} key={recipe.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    hoverable
                    cover={
                      <div className="relative">
                        <img
                          alt={recipe.title}
                          src={recipe.image}
                          className="h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Tag style={{ backgroundColor: getCategoryColor(recipe.category), color: 'white', border: 'none' }}>
                            {recipe.category}
                          </Tag>
                        </div>
                        <div className="absolute top-2 left-2">
                          <Tag style={{ backgroundColor: getDifficultyColor(recipe.difficulty), color: 'white', border: 'none' }}>
                            {recipe.difficulty}
                          </Tag>
                        </div>
                      </div>
                    }
                    actions={[
                      <Button 
                        type="primary" 
                        onClick={() => showRecipeModal(recipe)}
                        icon={<FontAwesomeIcon icon={faBook} />}
                        style={{ backgroundColor: '#10b981', borderColor: '#10b981' }}
                      >
                        View Recipe
                      </Button>
                    ]}
                  >
                    <Meta
                      title={recipe.title}
                      description={
                        <div>
                          <Paragraph ellipsis={{ rows: 2 }}>
                            {recipe.description}
                          </Paragraph>
                          <div className="flex justify-between items-center mt-2">
                            <Space>
                              <Text type="secondary">
                                <FontAwesomeIcon icon={faClock} /> {recipe.prepTime + recipe.cookTime} min
                              </Text>
                              <Text type="secondary">
                                <FontAwesomeIcon icon={faUser} /> {recipe.servings} servings
                              </Text>
                            </Space>
                            <Rate disabled defaultValue={recipe.rating} />
                          </div>
                          <div className="mt-2">
                            <Space>
                              <Text type="secondary">
                                <FontAwesomeIcon icon={faFire} /> {recipe.calories} cal
                              </Text>
                              <Text type="secondary">
                                Protein: {recipe.protein}g
                              </Text>
                            </Space>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          {filteredRecipes.length === 0 && (
            <div className="text-center py-12">
              <Text className="text-lg" style={{ color: '#2E2E2E' }}>
                No recipes found matching your criteria. Try adjusting your search or filters.
              </Text>
            </div>
          )}

          {/* Recipe Modal */}
          <Modal
            title={selectedRecipe?.title}
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={null}
            width={800}
            className="recipe-modal"
          >
            {selectedRecipe && (
              <div>
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.title}
                  className="w-full h-64 object-cover rounded mb-4"
                />
                
                <Row gutter={[16, 16]} className="mb-4">
                  <Col span={6}>
                    <div className="text-center">
                      <FontAwesomeIcon icon={faClock} className="text-2xl mb-1" style={{ color: '#10b981' }} />
                      <div>
                        <Text strong style={{ color: '#2E2E2E' }}>{selectedRecipe.prepTime + selectedRecipe.cookTime} min</Text>
                        <br />
                        <Text style={{ color: '#2E2E2E' }}>Total Time</Text>
                      </div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div className="text-center">
                      <FontAwesomeIcon icon={faUser} className="text-2xl mb-1" style={{ color: '#24604c' }} />
                      <div>
                        <Text strong style={{ color: '#2E2E2E' }}>{selectedRecipe.servings}</Text>
                        <br />
                        <Text style={{ color: '#2E2E2E' }}>Servings</Text>
                      </div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div className="text-center">
                      <FontAwesomeIcon icon={faFire} className="text-2xl mb-1" style={{ color: '#90cbb9' }} />
                      <div>
                        <Text strong style={{ color: '#2E2E2E' }}>{selectedRecipe.calories}</Text>
                        <br />
                        <Text style={{ color: '#2E2E2E' }}>Calories</Text>
                      </div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div className="text-center">
                      <FontAwesomeIcon icon={faStar} className="text-2xl mb-1" style={{ color: '#b2d4c7' }} />
                      <div>
                        <Text strong style={{ color: '#2E2E2E' }}>{selectedRecipe.rating}</Text>
                        <br />
                        <Text style={{ color: '#2E2E2E' }}>Rating</Text>
                      </div>
                    </div>
                  </Col>
                </Row>

                <Paragraph style={{ color: '#2E2E2E' }}>{selectedRecipe.description}</Paragraph>

                <Row gutter={[24, 24]}>
                  <Col xs={24} md={12}>
                    <Title level={4} style={{ color: '#2E2E2E' }}>Ingredients</Title>
                    <List
                      dataSource={selectedRecipe.ingredients}
                      renderItem={(item) => (
                        <List.Item>
                          <Text>{item as string}</Text>
                        </List.Item>
                      )}
                    />
                  </Col>
                  <Col xs={24} md={12}>
                    <Title level={4} style={{ color: '#2E2E2E' }}>Instructions</Title>
                    <List
                      dataSource={selectedRecipe.instructions}
                      renderItem={(item, index) => (
                        <List.Item>
                          <div className="flex">
                            <div className="w-6 h-6 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0" style={{ backgroundColor: '#10b981' }}>
                              {index + 1}
                            </div>
                            <Text style={{ color: '#2E2E2E' }}>{item as string}</Text>
                          </div>
                        </List.Item>
                      )}
                    />
                  </Col>
                </Row>

                <Divider />

                <div>
                  <Title level={4} style={{ color: '#2E2E2E' }}>Nutrition Facts (per serving)</Title>
                  <Row gutter={[16, 16]}>
                    <Col span={6}>
                      <div className="text-center p-3 rounded" style={{ backgroundColor: '#F7F7F7' }}>
                        <Text strong className="text-lg" style={{ color: '#2E2E2E' }}>{selectedRecipe.calories}</Text>
                        <br />
                        <Text style={{ color: '#2E2E2E' }}>Calories</Text>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="text-center p-3 rounded" style={{ backgroundColor: '#F7F7F7' }}>
                        <Text strong className="text-lg" style={{ color: '#2E2E2E' }}>{selectedRecipe.protein}g</Text>
                        <br />
                        <Text style={{ color: '#2E2E2E' }}>Protein</Text>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="text-center p-3 rounded" style={{ backgroundColor: '#F7F7F7' }}>
                        <Text strong className="text-lg" style={{ color: '#2E2E2E' }}>{selectedRecipe.carbs}g</Text>
                        <br />
                        <Text style={{ color: '#2E2E2E' }}>Carbs</Text>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="text-center p-3 rounded" style={{ backgroundColor: '#F7F7F7' }}>
                        <Text strong className="text-lg" style={{ color: '#2E2E2E' }}>{selectedRecipe.fat}g</Text>
                        <br />
                        <Text style={{ color: '#2E2E2E' }}>Fat</Text>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="mt-4">
                  <Space wrap>
                    {selectedRecipe.tags.map((tag: string) => (
                      <Tag key={tag} style={{ backgroundColor: '#10b981', color: 'white', border: 'none' }}>{tag}</Tag>
                    ))}
                  </Space>
                </div>
              </div>
            )}
          </Modal>
        </motion.div>
      </div>
    </>
  )
}

export default Recipes
