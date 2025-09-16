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
  Alert,
  Spin,
  message
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
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

const { Title, Text } = Typography
const { Option } = Select

// Types and interfaces
interface FoodNutrient {
  nutrientName: string;
  value: number;
}

interface FoodPortion {
  portionDescription?: string;
  modifier?: string;
  measureUnit?: {
    name: string;
  };
  gramWeight?: number;
}

interface USDAFood {
  fdcId: number;
  description: string;
  dataType?: string;
  foodNutrients?: FoodNutrient[];
  foodPortions?: FoodPortion[];
}

interface SelectedFood {
  raw?: USDAFood;
  id: number;
  name: string;
  description?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
  unit?: string;
}

interface NutritionItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

interface TotalNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

const NutritionCalculator: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedFood, setSelectedFood] = useState<SelectedFood | null>(null)
  const [quantity, setQuantity] = useState<number>(100)
  const [unit, setUnit] = useState<string>('g')
  const [foodList, setFoodList] = useState<NutritionItem[]>([])
  const [totalNutrition, setTotalNutrition] = useState<TotalNutrition>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0
  })
  const [usdaResults, setUsdaResults] = useState<USDAFood[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchError, setSearchError] = useState<string>('')
  const [showResults, setShowResults] = useState<boolean>(true)

  // Effect for debounced search
  useEffect(() => {
    if (searchTerm.trim()) {
      setShowResults(true); // Mostrar resultados al buscar
      const timeoutId = setTimeout(() => {
        handleSearch(searchTerm);
      }, 400);

      return () => clearTimeout(timeoutId);
    } else {
      setUsdaResults([]);
      setSearchError('');
      setShowResults(false);
    }
  }, [searchTerm]);

  // Función para formatear números con máximo 1 decimal
  const formatNumber = (num: number): number => {
    return Math.round(num * 10) / 10;
  };

  // Función para limpiar búsqueda
  const clearSearch = () => {
    setSearchTerm('');
    setSelectedFood(null);
    setUsdaResults([]);
    setSearchError('');
    setShowResults(false);
  };

  // Función para seleccionar alimento (oculta resultados)
  const selectFood = (food: USDAFood) => {
    setSelectedFood({
      raw: food,
      id: food.fdcId,
      name: food.description
    });
    setShowResults(false); // Ocultar lista después de seleccionar
  };

  const addFood = () => {
    if (!selectedFood || quantity <= 0) return;

    // Si selectedFood tiene .raw (objecto USDA), úsalo; si no, pasa el objeto tal cual.
    const foodRaw = selectedFood.raw || selectedFood;

    // 1) parsear nutrientes base por 100g
    const baseNutrients = parseNutrients(foodRaw);
    // baseNutrients -> { calories, protein, carbs, fat, fiber, sugar }

    // 2) convertir quantity + unit a gramos reales
    const grams = convertToGrams(quantity, unit, foodRaw);

    // 3) multiplicador por 100g
    const multiplier = grams / 100;

    // 4) calcular valores finales y redondear con formato consistente
    const nutrition = {
      id: Date.now(),
      name: selectedFood.name || selectedFood.description || 'Food item',
      quantity: quantity,
      unit: unit,
      calories: Math.round((baseNutrients.calories || 0) * multiplier),
      protein: formatNumber((baseNutrients.protein || 0) * multiplier),
      carbs: formatNumber((baseNutrients.carbs || 0) * multiplier),
      fat: formatNumber((baseNutrients.fat || 0) * multiplier),
      fiber: formatNumber((baseNutrients.fiber || 0) * multiplier),
      sugar: formatNumber((baseNutrients.sugar || 0) * multiplier)
    }

    const newList = [...foodList, nutrition]
    setFoodList(newList)
    updateTotalNutrition(newList)
    
    // Mostrar mensaje de éxito
    message.success(`Added ${nutrition.name} to your list!`)
    
    // Reset para siguiente alimento
    setQuantity(100)
    setSelectedFood(null)
    setSearchTerm('')
    setShowResults(false)
  }

  const removeFood = (id: number) => {
    const updatedList = foodList.filter(food => food.id !== id)
    setFoodList(updatedList)
    updateTotalNutrition(updatedList)
  }

  const updateTotalNutrition = (list: NutritionItem[]) => {
    const totals = list.reduce((acc, food) => ({
      calories: acc.calories + food.calories,
      protein: acc.protein + food.protein,
      carbs: acc.carbs + food.carbs,
      fat: acc.fat + food.fat,
      fiber: acc.fiber + food.fiber,
      sugar: acc.sugar + food.sugar
    }), { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 })

    // Formatear totales con máximo 1 decimal
    const formattedTotals = {
      calories: Math.round(totals.calories),
      protein: formatNumber(totals.protein),
      carbs: formatNumber(totals.carbs),
      fat: formatNumber(totals.fat),
      fiber: formatNumber(totals.fiber),
      sugar: formatNumber(totals.sugar)
    }

    setTotalNutrition(formattedTotals)
  }

  // ----- Begin: USDA nutrient parsing & unit helpers -----

  /**
   * Busca un nutriente dentro del array foodNutrients (case-insensitive, incluye).
   * Devuelve 0 si no lo encuentra.
   */
  const findNutrientValue = (nutrients: FoodNutrient[] = [], match: string): number => {
    const item = nutrients.find(n =>
      n.nutrientName && n.nutrientName.toLowerCase().includes(match.toLowerCase())
    );
    return item ? item.value : 0;
  }

  /**
   * Extrae nutrients principales (cal, prot, carbs, fat, fiber, sugar)
   * Acepta:
   *  - un objeto `foodRaw` (el objeto tal cual de USDA con foodNutrients),
   *  - o un objeto ya mapeado con propiedades calories/protein/...
   */
  const parseNutrients = (food: any): TotalNutrition => {
    if (!food) return { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 };

    // Si el objeto ya tiene calories/protein (mapeado previamente), úsalos
    if (typeof food.calories === 'number' && typeof food.protein === 'number') {
      return {
        calories: food.calories || 0,
        protein: food.protein || 0,
        carbs: food.carbs || 0,
        fat: food.fat || 0,
        fiber: food.fiber || 0,
        sugar: food.sugar || 0
      };
    }

    // Si viene el raw USDA:
    const nutrients = food.foodNutrients || [];
    const calories = findNutrientValue(nutrients, 'energy') || findNutrientValue(nutrients, 'calories');
    const protein = findNutrientValue(nutrients, 'protein');
    const fat = findNutrientValue(nutrients, 'total lipid') || findNutrientValue(nutrients, 'fat');
    const carbs = findNutrientValue(nutrients, 'carbohydrate');
    const fiber = findNutrientValue(nutrients, 'fiber');
    const sugar = findNutrientValue(nutrients, 'sugar');

    return {
      calories: calories || 0,
      protein: protein || 0,
      carbs: carbs || 0,
      fat: fat || 0,
      fiber: fiber || 0,
      sugar: sugar || 0
    };
  }

  /**
   * Intenta obtener el peso en gramos de una "unidad" por porción desde food.foodPortions.
   * Busca texto como 'cup', 'tbsp', 'tsp', 'oz' en portionDescription / modifier / measureUnit.name.
   * Si encuentra una porción con gramWeight, devuelve ese valor (gramos por 1 unidad).
   * Si no encuentra, devuelve null.
   */
  const findPortionGramWeight = (foodRaw: USDAFood, unit: string): number | null => {
    if (!foodRaw || !foodRaw.foodPortions || !unit) return null;
    const unitLower = unit.toLowerCase();

    const portion = (foodRaw.foodPortions || []).find(p => {
      const desc = ((p.portionDescription || '') + ' ' + (p.modifier || '') + ' ' + (p.measureUnit?.name || '')).toLowerCase();
      return desc.includes(unitLower);
    });

    if (portion && portion.gramWeight) return portion.gramWeight;
    return null;
  }

  /**
   * Convierte quantity+unit a gramos.
   * - Si unit === 'g' devuelve quantity.
   * - Si foodRaw tiene foodPortions con la unidad, usa esa gramWeight.
   * - Sino usa conversiones por defecto (aproximadas) para oz, cup, tbsp, tsp.
   */
  const convertToGrams = (quantity: number, unit: string, foodRaw: any): number => {
    if (!quantity || quantity <= 0) return 0;
    const u = (unit || 'g').toLowerCase();

    if (u === 'g') return quantity;
    // intentamos usar la porción específica del alimento (más precisa)
    const portionGram = findPortionGramWeight(foodRaw, u);
    if (portionGram) {
      return quantity * portionGram;
    }

    // fallback aproximado
    const CONVERSIONS: Record<string, number> = {
      oz: 28.3495,   // 1 oz = 28.3495 g
      cup: 240,      // 1 cup ≈ 240 g (estándar aproximado, varía según alimento)
      tbsp: 15,      // 1 tbsp ≈ 15 g
      tsp: 5,        // 1 tsp ≈ 5 g
      ml: 1,         // 1 ml ≈ 1 g (para líquidos como agua)
      fl_oz: 29.5735,// 1 fl oz = 29.5735 ml ≈ 29.5735 g
      lb: 453.592,   // 1 lb = 453.592 g
      slice: 30,     // 1 slice ≈ 30 g (aproximado para pan, queso, etc.)
      piece: 50,     // 1 piece ≈ 50 g (aproximado genérico)
      medium: 150,   // 1 medium ≈ 150 g (para frutas como manzana)
      large: 200,    // 1 large ≈ 200 g
      small: 100     // 1 small ≈ 100 g
    }

    if (CONVERSIONS[u]) {
      return quantity * CONVERSIONS[u];
    }

    // si no conocemos la unidad, asumimos gramos (evita NaN)
    return quantity;
  }

  // ----- End: USDA nutrient parsing & unit helpers -----

// Función para filtrar y organizar resultados de USDA
const filterAndSortResults = (foods: USDAFood[]) => {
  // Filtrar por tipo de base de datos (priorizar SR Legacy y FNDDS sobre Branded)
  const prioritizedFoods = foods.sort((a, b) => {
    const aDataType = a.dataType || '';
    const bDataType = b.dataType || '';
    
    // Prioridad: SR Legacy > FNDDS > Survey > Branded
    const priority: Record<string, number> = { 'SR Legacy': 4, 'Foundation': 3, 'Survey (FNDDS)': 2, 'Branded': 1 };
    const aPriority = priority[aDataType] || 0;
    const bPriority = priority[bDataType] || 0;
    
    return bPriority - aPriority;
  });

  // Eliminar duplicados similares basándose en el nombre
  const uniqueFoods = [];
  const seenNames = new Set();
  
  for (const food of prioritizedFoods) {
    const normalizedName = food.description
      .toLowerCase()
      .replace(/[,\(\)]/g, '') // Remover puntuación
      .replace(/\s+/g, ' ') // Normalizar espacios
      .trim();
    
    // Extraer la parte principal del nombre (antes de comas o paréntesis)
    const mainName = normalizedName.split(',')[0].split('(')[0].trim();
    
    if (!seenNames.has(mainName)) {
      seenNames.add(mainName);
      uniqueFoods.push(food);
    }
  }
  
  return uniqueFoods.slice(0, 10); // Limitar a 10 resultados únicos
};

// Función para buscar en el API de USDA con loading state y error handling
const handleSearch = async (query: string) => {
  if (!query.trim()) {
    setUsdaResults([]);
    setSearchError('');
    return;
  }

  setIsLoading(true);
  setSearchError('');

  try {
    const apiKey = "L9z60YVaA2tpfCdJQVvovEcMCvQWrwjhEnSJ8NWZ" // API Key de USDA
    const res = await fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&pageSize=50&dataType=SR%20Legacy,Foundation,Survey%20(FNDDS)&api_key=${apiKey}`
    );
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    
    if (data.foods && data.foods.length > 0) {
      const filteredResults = filterAndSortResults(data.foods);
      setUsdaResults(filteredResults);
      setSearchError('');
    } else {
      setUsdaResults([]);
      setSearchError('No results found. Try a different search term.');
    }
  } catch (error) {
    console.error("Error fetching USDA data:", error);
    setUsdaResults([]);
    setSearchError('Connection error. Please check your internet connection and try again.');
  } finally {
    setIsLoading(false);
  }
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
      render: (quantity: number, record: NutritionItem) => `${quantity}${record.unit}`,
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
      render: (_: any, record: NutritionItem) => (
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
    { name: 'Protein', value: Math.round(totalNutrition.protein * 4), color: '#0ea7b5' },
    { name: 'Carbs', value: Math.round(totalNutrition.carbs * 4), color: '#ffbe4f' },
    { name: 'Fat', value: Math.round(totalNutrition.fat * 9), color: '#e8702a' }
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
                    <div className="flex justify-between items-center mb-2">
                      <Text strong>Search Food:</Text>
                      {(searchTerm || selectedFood) && (
                        <Button 
                          type="text" 
                          size="small" 
                          onClick={clearSearch}
                          className="text-gray-500 hover:text-orange-500"
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                    <Input
                      placeholder="Search for food items..."
                      prefix={<FontAwesomeIcon icon={faSearch} />}
                      suffix={isLoading ? <Spin size="small" /> : null}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="mt-1"
                    />
                    {selectedFood && !showResults && (
                      <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded flex justify-between items-center">
                        <Text className="text-sm text-yellow-800">
                          ✓ Selected: <strong>{selectedFood.name}</strong>
                        </Text>
                        {usdaResults.length > 1 && (
                          <Button 
                            type="text" 
                            size="small"
                            onClick={() => setShowResults(true)}
                            className="text-yellow-700 hover:text-yellow-900"
                          >
                            Change
                          </Button>
                        )}
                      </div>
                    )}
                  </div>

                  {searchTerm && showResults && (
                    <div className="max-h-48 overflow-y-auto">
                      {isLoading && (
                        <div className="text-center py-4">
                          <Text type="secondary">Searching...</Text>
                        </div>
                      )}
                      
                      {searchError && (
                        <Alert
                          message={searchError}
                          type="warning"
                          showIcon
                          className="mb-2"
                        />
                      )}
                      
                      {!isLoading && !searchError && usdaResults.length === 0 && searchTerm.trim() && (
                        <div className="text-center py-4">
                          <Text type="secondary">No results found. Try a different search term.</Text>
                        </div>
                      )}
                      
                      {!isLoading && usdaResults.map((food: USDAFood) => {
                        const calories = food.foodNutrients?.find((n: FoodNutrient) => n.nutrientName === "Energy")?.value || 0;
                        const dataTypeBadge = () => {
                          const type = food.dataType || '';
                          const badgeStyle: Record<string, string> = {
                            'SR Legacy': 'bg-yellow-100 text-yellow-800', // #ffbe4f palette
                            'Foundation': 'bg-orange-100 text-orange-700', // #e8702a palette
                            'Survey (FNDDS)': 'bg-cyan-100 text-cyan-800', // #0ea7b5 palette
                            'Branded': 'bg-gray-100 text-gray-600'
                          };
                          return badgeStyle[type] || 'bg-gray-100 text-gray-800';
                        };

                        return (
                          <div
                            key={food.fdcId}
                            className={`p-3 cursor-pointer hover:bg-orange-50 rounded border mb-2 transition-colors ${
                              selectedFood?.id === food.fdcId ? 'bg-yellow-50 border-yellow-300' : 'border-gray-200'
                            }`}
                            onClick={() => selectFood(food)}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <Text strong className="flex-1 mr-2">{food.description}</Text>
                              {food.dataType && (
                                <span className={`px-2 py-1 rounded text-xs font-medium ${dataTypeBadge()}`}>
                                  {food.dataType === 'SR Legacy' ? 'Official' : 
                                   food.dataType === 'Foundation' ? 'Enhanced' :
                                   food.dataType === 'Survey (FNDDS)' ? 'Survey' : 'Brand'}
                                </span>
                              )}
                            </div>
                            <div className="flex justify-between items-center">
                              <Text type="secondary" className="text-sm">
                                {Math.round(calories)} cal per 100g
                              </Text>
                              {food.foodPortions && food.foodPortions.length > 0 && (
                                <Text type="secondary" className="text-xs">
                                  📏 Portion data
                                </Text>
                              )}
                            </div>
                          </div>
                        );
                      })}
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
                          <Option value="lb">Pounds (lb)</Option>
                          <Option value="cup">Cup</Option>
                          <Option value="tbsp">Tablespoon</Option>
                          <Option value="tsp">Teaspoon</Option>
                          <Option value="ml">Milliliters (ml)</Option>
                          <Option value="fl_oz">Fluid Ounces (fl oz)</Option>
                          <Option value="slice">Slice</Option>
                          <Option value="piece">Piece</Option>
                          <Option value="small">Small</Option>
                          <Option value="medium">Medium</Option>
                          <Option value="large">Large</Option>
                        </Select>
                      </div>

                      <Button
                        type="primary"
                        icon={<FontAwesomeIcon icon={faPlus} />}
                        onClick={addFood}
                        className="w-full bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600"
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
                      valueStyle={{ color: '#e8702a' }}
                    />
                    <Progress
                      percent={formatNumber(Math.min((totalNutrition.calories / dailyGoals.calories) * 100, 100))}
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
                      valueStyle={{ color: '#0ea7b5' }}
                    />
                    <Progress
                      percent={formatNumber(Math.min((totalNutrition.protein / dailyGoals.protein) * 100, 100))}
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
                      valueStyle={{ color: '#ffbe4f' }}
                    />
                    <Progress
                      percent={formatNumber(Math.min((totalNutrition.carbs / dailyGoals.carbs) * 100, 100))}
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
                      valueStyle={{ color: '#e8702a' }}
                    />
                    <Progress
                      percent={formatNumber(Math.min((totalNutrition.fat / dailyGoals.fat) * 100, 100))}
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
