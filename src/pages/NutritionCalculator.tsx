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
  Alert,
  Spin,
  message,
  Modal,
  Form,
  InputNumber
} from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faSearch, 
  faPlus, 
  faTrash,
  faCalculator,
  faFire,
  faUtensils,
  faLeaf,
  faCheckCircle,
  faRulerCombined,
  faSeedling,
  faEdit,
  faSave,
  faChartPie
} from '@fortawesome/free-solid-svg-icons'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

const { Text } = Typography
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
  const [showUnitSuggestion, setShowUnitSuggestion] = useState<boolean>(false)
  const [showGoalModal, setShowGoalModal] = useState<boolean>(false)
  const [dailyGoals, setDailyGoals] = useState({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 67
  })

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

  // Función para manejar cambio de unidad con sugerencias lógicas
  const handleUnitChange = (newUnit: string) => {
    setUnit(newUnit);
    
    // Sugerencias lógicas de cantidad basadas en la unidad
    const unitSuggestions: Record<string, number> = {
      'piece': 1,
      'slice': 1,
      'medium': 1,
      'large': 1,
      'small': 1,
      'cup': 1,
      'tbsp': 1,
      'tsp': 1,
      'g': 100,
      'oz': 3.5,
      'lb': 0.25,
      'ml': 250,
      'fl_oz': 8
    };
    
    const suggestedQuantity = unitSuggestions[newUnit];
    if (suggestedQuantity !== undefined) {
      setQuantity(suggestedQuantity);
      setShowUnitSuggestion(true);
      
      // Ocultar sugerencia después de 3 segundos
      setTimeout(() => {
        setShowUnitSuggestion(false);
      }, 3000);
    }
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
   * Busca un nutriente dentro del array foodNutrients con nombres específicos del USDA.
   * Devuelve 0 si no lo encuentra.
   */
  const findNutrientValue = (nutrients: FoodNutrient[] = [], match: string): number => {
    // Nombres específicos de nutrientes en la API del USDA
    const nutrientNames: Record<string, string[]> = {
      'energy': ['Energy', 'Energy (Atwater General Factors)', 'Energy (Atwater Specific Factors)'],
      'calories': ['Energy', 'Energy (Atwater General Factors)', 'Energy (Atwater Specific Factors)'],
      'protein': ['Protein'],
      'fat': ['Total lipid (fat)', 'Fatty acids, total saturated', 'Fatty acids, total monounsaturated', 'Fatty acids, total polyunsaturated'],
      'carbs': ['Carbohydrate, by difference', 'Carbohydrate, by summation'],
      'fiber': ['Fiber, total dietary', 'Fiber, insoluble', 'Fiber, soluble'],
      'sugar': ['Sugars, total including NLEA', 'Sugars, total', 'Sugars, added']
    };

    const searchNames = nutrientNames[match.toLowerCase()] || [match];
    
    for (const searchName of searchNames) {
      const item = nutrients.find(n =>
        n.nutrientName && n.nutrientName.toLowerCase().includes(searchName.toLowerCase())
      );
      if (item && item.value > 0) {
        // Si es energía y el valor parece estar en kJ (muy alto), convertir a kcal
        if (match.toLowerCase() === 'energy' || match.toLowerCase() === 'calories') {
          // Si el valor es > 200, probablemente está en kJ, convertir a kcal
          if (item.value > 200) {
            return item.value / 4.184; // Convertir kJ a kcal
          }
        }
        return item.value;
      }
    }
    
    return 0;
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

// Función simple para filtrar y organizar resultados como USDA oficial
const filterAndSortResults = (foods: USDAFood[]) => {
  // Ordenar por tipo de datos - priorizar oficiales como USDA
  const sortedFoods = foods.sort((a, b) => {
    const aDataType = a.dataType || '';
    const bDataType = b.dataType || '';
    
    // Prioridad simple: SR Legacy > Foundation > Survey > Branded
    const priority: Record<string, number> = { 
      'SR Legacy': 4, 
      'Foundation': 3, 
      'Survey (FNDDS)': 2, 
      'Branded': 1
    };
    const aPriority = priority[aDataType] || 0;
    const bPriority = priority[bDataType] || 0;
    
    return bPriority - aPriority;
  });

  // Eliminar duplicados simples
  const uniqueFoods = [];
  const seenNames = new Set();
  
  for (const food of sortedFoods) {
    const mainName = food.description.split(',')[0].toLowerCase().trim();
    
    if (!seenNames.has(mainName)) {
      seenNames.add(mainName);
      uniqueFoods.push(food);
    }
  }
  
  return uniqueFoods.slice(0, 10); // Limitar a 10 resultados
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
    { name: 'Protein', value: Math.round(totalNutrition.protein * 4), color: '#3498db' },
    { name: 'Carbs', value: Math.round(totalNutrition.carbs * 4), color: '#27ae60' },
    { name: 'Fat', value: Math.round(totalNutrition.fat * 9), color: '#f39c12' }
  ]

  // Handle goal update
  const handleGoalUpdate = (values: any) => {
    setDailyGoals({
      calories: values.calories || 2000,
      protein: values.protein || 150,
      carbs: values.carbs || 250,
      fat: values.fat || 67
    })
    setShowGoalModal(false)
    message.success('Goals updated successfully!')
  }


  return (
    <>
      <Helmet>
        <title>Nutrition Calculator - NutriGuide</title>
        <meta name="description" content="Calculate calories, macronutrients, and micronutrients for any food or recipe. Track your daily nutrition intake." />
      </Helmet>

      <div className="min-h-screen bg-[#F7F7F7] font-sans relative overflow-hidden">
        {/* Floating Bubbles Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-24 h-24 rounded-full opacity-30"
          style={{
            background: `radial-gradient(circle, #b2d4c7 0%, #90cbb9 30%, transparent 70%)`
          }}
          animate={{
            y: [0, -15, 0],
            x: [0, 8, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-32 h-32 rounded-full opacity-30"
          style={{
            background: `radial-gradient(circle, #b2d4c7 0%, #10b981 40%, transparent 80%)`
          }}
          animate={{
            y: [0, 12, 0],
            x: [0, -6, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full opacity-30"
          style={{
            background: `radial-gradient(circle, #90cbb9 0%, #b2d4c7 50%, transparent 90%)`
          }}
          animate={{
            y: [0, -8, 0],
            x: [0, 5, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-16 h-16 rounded-full opacity-30"
          style={{
            background: `radial-gradient(circle, #b2d4c7 0%, transparent 60%)`
          }}
          animate={{
            y: [0, -10, 0],
            x: [0, 4, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 relative z-10 font-sans">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ color: '#2E2E2E' }}
            >
              <FontAwesomeIcon icon={faCalculator} className="mr-4 text-[#10b981]" />
              Nutrition Calculator
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              style={{ color: '#2E2E2E' }}
            >
              Track your daily nutrition intake and make informed dietary choices with precision and ease
            </motion.p>
          </div>

          <Row gutter={[24, 24]}>
            {/* Food Search and Add */}
            <Col xs={24} lg={8} className="order-2 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card 
                  title={null}
                  className="h-full shadow-lg border border-[#24604c]/20 rounded-2xl font-sans"
                  style={{
                    background: 'linear-gradient(135deg, #24604c/5 0%, white 50%, #10b981/5 100%)'
                  }}
                >
                  {/* Add Food Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#e74c3c]/10 flex items-center justify-center">
                      <FontAwesomeIcon icon={faUtensils} className="text-[#e74c3c] text-lg" />
                    </div>
                    <Text strong style={{ color: '#2E2E2E', fontSize: '24px', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                      Add Food
                    </Text>
                  </div>
                  
                  <Space direction="vertical" size="middle" className="w-full">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <Text strong style={{ color: '#2E2E2E', fontSize: '16px', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>Search Food:</Text>
                      </div>
                      {(searchTerm || selectedFood) && (
                        <Button 
                          type="text" 
                          size="small" 
                          onClick={clearSearch}
                          className="text-[#7c8784] hover:text-[#10b981] hover:bg-[#10b981]/10 rounded-full px-3"
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                    <Input
                      placeholder="Search for food items like 'chicken breast' or 'avocado'..."
                      prefix={<FontAwesomeIcon icon={faSearch} className="text-[#3498db]" />}
                      suffix={isLoading ? <Spin size="small" /> : null}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="mt-1 rounded-lg border-[#b2d4c7] focus:border-[#10b981] shadow-sm"
                      style={{
                        borderRadius: '12px',
                        padding: '8px 12px'
                      }}
                    />
                    {selectedFood && !showResults && (
                      <motion.div 
                        className="mt-3 p-4 bg-gradient-to-r from-[#10b981]/10 to-[#90cbb9]/10 border border-[#10b981]/30 rounded-2xl flex justify-between items-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faCheckCircle} className="text-[#27ae60] text-sm" />
                          <Text className="text-sm font-medium" style={{ color: '#24604c', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                            Selected: <strong>{selectedFood.name}</strong>
                          </Text>
                        </div>
                        {usdaResults.length > 1 && (
                          <Button 
                            type="text" 
                            size="small"
                            onClick={() => setShowResults(true)}
                            className="text-[#24604c] hover:text-[#10b981] hover:bg-white/50 rounded-full px-3"
                          >
                            Change
                          </Button>
                        )}
                      </motion.div>
                    )}
                  </div>

                  {searchTerm && showResults && (
                    <motion.div 
                      className="max-h-64 overflow-y-auto rounded-2xl border border-[#b2d4c7]/50"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      {isLoading && (
                        <div className="text-center py-6">
                          <Spin size="default" />
                          <div className="flex items-center justify-center gap-2 mt-2">
                            <FontAwesomeIcon icon={faSearch} className="text-[#3498db] text-sm" />
                            <Text type="secondary" style={{ color: '#7c8784', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                              Searching nutrition database...
                            </Text>
                          </div>
                        </div>
                      )}
                      
                      {searchError && (
                        <Alert
                          message={searchError}
                          type="warning"
                          showIcon
                          className="mb-2 rounded-xl"
                          style={{
                            backgroundColor: '#90cbb9/10',
                            borderColor: '#90cbb9'
                          }}
                        />
                      )}
                      
                      {!isLoading && !searchError && usdaResults.length === 0 && searchTerm.trim() && (
                        <div className="text-center py-6">
                          <div className="w-12 h-12 rounded-full bg-[#f39c12]/10 flex items-center justify-center mx-auto mb-3">
                            <FontAwesomeIcon icon={faSearch} className="text-[#f39c12] text-xl" />
                          </div>
                          <Text type="secondary" style={{ color: '#7c8784', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                            No results found. Try a different search term.
                          </Text>
                        </div>
                      )}
                      
                      {!isLoading && usdaResults.map((food: USDAFood) => {
                        // Usar la misma lógica de conversión que en findNutrientValue
                        const energyNutrient = food.foodNutrients?.find((n: FoodNutrient) => 
                          n.nutrientName && n.nutrientName.toLowerCase().includes('energy')
                        );
                        let calories = 0;
                        if (energyNutrient && energyNutrient.value > 0) {
                          // Si el valor es > 200, probablemente está en kJ, convertir a kcal
                          if (energyNutrient.value > 200) {
                            calories = energyNutrient.value / 4.184; // Convertir kJ a kcal
                          } else {
                            calories = energyNutrient.value;
                          }
                        }
                        const dataTypeBadge = () => {
                          const type = food.dataType || '';
                          const badgeStyle: Record<string, string> = {
                            'SR Legacy': 'bg-[#10b981]/20 text-[#24604c]', // Primary green palette
                            'Foundation': 'bg-[#90cbb9]/20 text-[#24604c]', // Secondary green palette
                            'Survey (FNDDS)': 'bg-[#b2d4c7]/20 text-[#24604c]', // Light green palette
                            'Branded': 'bg-gray-100 text-gray-600'
                          };
                          return badgeStyle[type] || 'bg-gray-100 text-gray-800';
                        };

                        return (
                          <motion.div
                            key={food.fdcId}
                            className={`p-4 cursor-pointer rounded-xl mb-3 transition-all duration-300 border ${
                              selectedFood?.id === food.fdcId 
                                ? 'bg-gradient-to-r from-[#10b981]/10 to-[#90cbb9]/10 border-[#10b981] shadow-md' 
                                : 'bg-white/80 border-[#b2d4c7]/50 hover:bg-gradient-to-r hover:from-[#10b981]/5 hover:to-[#90cbb9]/5 hover:border-[#10b981]/30 hover:shadow-sm'
                            }`}
                            onClick={() => selectFood(food)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <Text strong className="flex-1 mr-2" style={{ color: '#2E2E2E', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                                {food.description}
                              </Text>
                              {food.dataType && (
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${dataTypeBadge()}`}>
                                  {food.dataType === 'SR Legacy' ? 'Official' : 
                                   food.dataType === 'Foundation' ? 'Enhanced' :
                                   food.dataType === 'Survey (FNDDS)' ? 'Survey' : 'Brand'}
                                </span>
                              )}
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faFire} className="text-[#e67e22] text-sm" />
                                <Text type="secondary" className="text-sm font-medium" style={{ color: '#7c8784', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                                  {Math.round(calories)} cal per 100g
                                </Text>
                              </div>
                              {food.foodPortions && food.foodPortions.length > 0 && (
                                <div className="flex items-center gap-1">
                                  <FontAwesomeIcon icon={faUtensils} className="text-[#9b59b6] text-xs" />
                                  <Text type="secondary" className="text-xs" style={{ color: '#7c8784', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                                    Portions
                                  </Text>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}


                  {selectedFood && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <FontAwesomeIcon icon={faCalculator} className="text-[#2980b9] text-sm" />
                          <Text strong style={{ color: '#2E2E2E', fontSize: '16px', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                            Quantity:
                          </Text>
                        </div>
                        <div>
                          <Input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="mt-2 rounded-lg border-[#b2d4c7] focus:border-[#10b981] shadow-sm"
                            style={{
                              borderRadius: '12px',
                              padding: '8px 12px',
                              fontSize: '16px'
                            }}
                            min={0}
                            step={0.1}
                          />
                          {showUnitSuggestion && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="mt-2 p-2 bg-gradient-to-r from-[#10b981]/10 to-[#90cbb9]/10 border border-[#10b981]/30 rounded-lg"
                            >
                              <div className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faCheckCircle} className="text-[#10b981] text-sm" />
                                <Text className="text-sm" style={{ color: '#24604c', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                                  Suggested quantity: <strong>{quantity} {unit}</strong>
                                </Text>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <FontAwesomeIcon icon={faRulerCombined} className="text-[#8e44ad] text-sm" />
                          <Text strong style={{ color: '#2E2E2E', fontSize: '16px', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                            Unit:
                          </Text>
                        </div>
                        <Select
                          value={unit}
                          onChange={handleUnitChange}
                          className="w-full mt-2"
                          style={{
                            borderRadius: '12px'
                          }}
                          size="large"
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

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="primary"
                          icon={<FontAwesomeIcon icon={faPlus} />}
                          onClick={addFood}
                          className="w-full font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                          style={{
                            backgroundColor: '#10b981',
                            borderColor: '#10b981',
                            height: '48px',
                            fontSize: '16px'
                          }}
                          disabled={!selectedFood || quantity <= 0}
                        >
                          Add to My List
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                  </Space>
                </Card>
              </motion.div>
            </Col>

            {/* Nutrition Summary */}
            <Col xs={24} lg={16} className="order-1 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {/* Goals Header with Edit Button */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#3498db]/10 flex items-center justify-center">
                      <FontAwesomeIcon icon={faCalculator} className="text-[#3498db] text-lg" />
                    </div>
                    <Text strong style={{ color: '#2E2E2E', fontSize: '24px', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                      Your Daily Progress
                    </Text>
                  </div>
                  <Button
                    type="text"
                    icon={<FontAwesomeIcon icon={faEdit} />}
                    onClick={() => setShowGoalModal(true)}
                    className="text-[#3498db] hover:text-[#2980b9] hover:bg-[#3498db]/10 rounded-full px-4 py-2"
                    style={{ fontSize: '16px' }}
                  >
                    Edit Goals
                  </Button>
                </div>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} md={6}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <Card 
                        className="text-center shadow-lg border border-[#24604c]/20 rounded-2xl font-sans"
                        style={{
                          background: 'linear-gradient(135deg, #10b981/10 0%, white 50%, #10b981/5 100%)'
                        }}
                      >
                        <div className="mb-3">
                          <div className="w-12 h-12 rounded-full bg-[#e74c3c]/10 flex items-center justify-center mx-auto mb-2">
                            <FontAwesomeIcon icon={faFire} className="text-xl text-[#e74c3c]" />
                          </div>
                          <Text strong style={{ color: '#2E2E2E', fontSize: '16px', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                            Total Calories
                          </Text>
                        </div>
                        <div className="text-3xl font-bold mb-2" style={{ color: '#e74c3c' }}>
                          {totalNutrition.calories}
                        </div>
                        <Progress
                          percent={formatNumber(Math.min((totalNutrition.calories / dailyGoals.calories) * 100, 100))}
                          size="small"
                          className="mt-2"
                          strokeColor="#e74c3c"
                          trailColor="#b2d4c7"
                        />
                        <Text type="secondary" className="text-xs mt-1" style={{ color: '#7c8784', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                          Goal: {dailyGoals.calories} cal
                        </Text>
                      </Card>
                    </motion.div>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <Card 
                        className="text-center shadow-lg border border-[#24604c]/20 rounded-2xl font-sans"
                        style={{
                          background: 'linear-gradient(135deg, #24604c/10 0%, white 50%, #24604c/5 100%)'
                        }}
                      >
                        <div className="mb-3">
                          <div className="w-12 h-12 rounded-full bg-[#3498db]/10 flex items-center justify-center mx-auto mb-2">
                            <FontAwesomeIcon icon={faUtensils} className="text-xl text-[#3498db]" />
                          </div>
                          <Text strong style={{ color: '#2E2E2E', fontSize: '16px', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                            Protein (g)
                          </Text>
                        </div>
                        <div className="text-3xl font-bold mb-2" style={{ color: '#3498db' }}>
                          {totalNutrition.protein}
                        </div>
                        <Progress
                          percent={formatNumber(Math.min((totalNutrition.protein / dailyGoals.protein) * 100, 100))}
                          size="small"
                          className="mt-2"
                          strokeColor="#3498db"
                          trailColor="#b2d4c7"
                        />
                        <Text type="secondary" className="text-xs mt-1" style={{ color: '#7c8784', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                          Goal: {dailyGoals.protein}g
                        </Text>
                      </Card>
                    </motion.div>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <Card 
                        className="text-center shadow-lg border border-[#24604c]/20 rounded-2xl font-sans"
                        style={{
                          background: 'linear-gradient(135deg, #90cbb9/10 0%, white 50%, #90cbb9/5 100%)'
                        }}
                      >
                        <div className="mb-3">
                          <div className="w-12 h-12 rounded-full bg-[#27ae60]/10 flex items-center justify-center mx-auto mb-2">
                            <FontAwesomeIcon icon={faLeaf} className="text-xl text-[#27ae60]" />
                          </div>
                          <Text strong style={{ color: '#2E2E2E', fontSize: '16px', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                            Carbs (g)
                          </Text>
                        </div>
                        <div className="text-3xl font-bold mb-2" style={{ color: '#27ae60' }}>
                          {totalNutrition.carbs}
                        </div>
                        <Progress
                          percent={formatNumber(Math.min((totalNutrition.carbs / dailyGoals.carbs) * 100, 100))}
                          size="small"
                          className="mt-2"
                          strokeColor="#27ae60"
                          trailColor="#b2d4c7"
                        />
                        <Text type="secondary" className="text-xs mt-1" style={{ color: '#7c8784', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                          Goal: {dailyGoals.carbs}g
                        </Text>
                      </Card>
                    </motion.div>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      <Card 
                        className="text-center shadow-lg border border-[#24604c]/20 rounded-2xl font-sans"
                        style={{
                          background: 'linear-gradient(135deg, #b2d4c7/10 0%, white 50%, #b2d4c7/5 100%)'
                        }}
                      >
                        <div className="mb-3">
                          <div className="w-12 h-12 rounded-full bg-[#f39c12]/10 flex items-center justify-center mx-auto mb-2">
                            <FontAwesomeIcon icon={faSeedling} className="text-xl text-[#f39c12]" />
                          </div>
                          <Text strong style={{ color: '#2E2E2E', fontSize: '16px', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                            Fat (g)
                          </Text>
                        </div>
                        <div className="text-3xl font-bold mb-2" style={{ color: '#f39c12' }}>
                          {totalNutrition.fat}
                        </div>
                        <Progress
                          percent={formatNumber(Math.min((totalNutrition.fat / dailyGoals.fat) * 100, 100))}
                          size="small"
                          className="mt-2"
                          strokeColor="#f39c12"
                          trailColor="#e5e7eb"
                        />
                        <Text type="secondary" className="text-xs mt-1" style={{ color: '#7c8784', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                          Goal: {dailyGoals.fat}g
                        </Text>
                      </Card>
                    </motion.div>
                  </Col>
                </Row>

                {/* Macronutrient Chart - Separate Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-6"
                >
                  <Card 
                    title={
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#9b59b6]/10 flex items-center justify-center">
                          <FontAwesomeIcon icon={faChartPie} className="text-[#9b59b6] text-lg" />
                        </div>
                        <span style={{ color: '#2E2E2E', fontSize: '18px', fontWeight: 'bold', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                          Macronutrient Distribution
                        </span>
                      </div>
                    }
                    className="shadow-lg border border-[#24604c]/20 rounded-2xl font-sans"
                    style={{
                      background: 'linear-gradient(135deg, #24604c/5 0%, white 50%, #10b981/5 100%)'
                    }}
                  >
                    <Row gutter={[24, 24]}>
                      <Col xs={24} md={12}>
                        <div className="flex justify-center">
                          <ResponsiveContainer width="100%" height={240}>
                            <PieChart>
                              <Pie
                                data={macronutrientData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                dataKey="value"
                                stroke="#ffffff"
                                strokeWidth={3}
                              >
                                {macronutrientData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip 
                                formatter={(value: any) => [`${value} cal`, 'Calories']}
                                labelStyle={{ color: '#2E2E2E' }}
                                contentStyle={{
                                  backgroundColor: 'white',
                                  border: '1px solid #b2d4c7',
                                  borderRadius: '12px',
                                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </Col>
                      <Col xs={24} md={12}>
                        <div className="space-y-4 pt-4">
                          {macronutrientData.map((item, index) => (
                            <motion.div 
                              key={index} 
                              className="flex items-center justify-between p-3 rounded-xl bg-white/60 border border-gray-100"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              <div className="flex items-center gap-3">
                                <div 
                                  className="w-6 h-6 rounded-full shadow-sm" 
                                  style={{ backgroundColor: item.color }}
                                />
                                <Text strong style={{ color: '#2E2E2E', fontSize: '16px', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                                  {item.name}
                                </Text>
                              </div>
                              <div className="text-right">
                                <Text strong style={{ color: item.color, fontSize: '16px', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                                  {item.value} cal
                                </Text>
                                <Text type="secondary" className="block text-xs" style={{ color: '#7c8784', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                                  {((item.value / (macronutrientData.reduce((sum, m) => sum + m.value, 0))) * 100).toFixed(0)}%
                                </Text>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </motion.div>
              </motion.div>
            </Col>
          </Row>

          {/* Food List Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card 
              title={
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#16a085]/10 flex items-center justify-center">
                    <FontAwesomeIcon icon={faUtensils} className="text-[#16a085] text-lg" />
                  </div>
                  <span style={{ color: '#2E2E2E', fontSize: '18px', fontWeight: 'bold', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                    Your Food List
                  </span>
                </div>
              }
              className="mt-8 shadow-lg border border-[#24604c]/20 rounded-2xl font-sans"
              style={{
                background: 'linear-gradient(135deg, #24604c/5 0%, white 50%, #10b981/5 100%)'
              }}
            >
              {foodList.length > 0 ? (
                <Table
                  columns={columns}
                  dataSource={foodList}
                  rowKey="id"
                  pagination={false}
                  size="middle"
                  className="rounded-xl overflow-hidden"
                  style={{
                    backgroundColor: 'white/80'
                  }}
                />
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#95a5a6]/10 flex items-center justify-center mx-auto mb-4">
                    <FontAwesomeIcon icon={faUtensils} className="text-[#95a5a6] text-2xl" />
                  </div>
                  <Text style={{ color: '#7c8784', fontSize: '16px', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                    No foods added yet. Search and add foods to start tracking your nutrition!
                  </Text>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <FontAwesomeIcon icon={faSearch} className="text-[#3498db] text-sm" />
                    <Text style={{ color: '#24604c', fontSize: '14px', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                      Try searching for "chicken breast", "broccoli", or "brown rice"
                    </Text>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>

        </motion.div>

        {/* Goals Setting Modal */}
        <Modal
          title={
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#3498db]/10 flex items-center justify-center">
                <FontAwesomeIcon icon={faEdit} className="text-[#3498db] text-sm" />
              </div>
              <span style={{ color: '#2E2E2E', fontSize: '18px', fontWeight: 'bold', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>
                Set Your Daily Goals
              </span>
            </div>
          }
          open={showGoalModal}
          onCancel={() => setShowGoalModal(false)}
          footer={null}
          className="rounded-2xl"
          width={500}
        >
          <Form
            layout="vertical"
            initialValues={dailyGoals}
            onFinish={handleGoalUpdate}
            className="mt-4"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label={
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faFire} className="text-[#e74c3c] text-sm" />
                      <span style={{ color: '#2E2E2E', fontWeight: 'bold', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>Calories</span>
                    </div>
                  }
                  name="calories"
                  rules={[{ required: true, message: 'Please enter your calorie goal' }]}
                >
                  <InputNumber
                    min={500}
                    max={5000}
                    step={50}
                    className="w-full rounded-lg"
                    placeholder="e.g., 2000"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label={
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faUtensils} className="text-[#3498db] text-sm" />
                      <span style={{ color: '#2E2E2E', fontWeight: 'bold', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>Protein (g)</span>
                    </div>
                  }
                  name="protein"
                  rules={[{ required: true, message: 'Please enter your protein goal' }]}
                >
                  <InputNumber
                    min={10}
                    max={500}
                    step={5}
                    className="w-full rounded-lg"
                    placeholder="e.g., 150"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label={
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faLeaf} className="text-[#27ae60] text-sm" />
                      <span style={{ color: '#2E2E2E', fontWeight: 'bold', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>Carbs (g)</span>
                    </div>
                  }
                  name="carbs"
                  rules={[{ required: true, message: 'Please enter your carbs goal' }]}
                >
                  <InputNumber
                    min={20}
                    max={800}
                    step={10}
                    className="w-full rounded-lg"
                    placeholder="e.g., 250"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label={
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faSeedling} className="text-[#f39c12] text-sm" />
                      <span style={{ color: '#2E2E2E', fontWeight: 'bold', fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}>Fat (g)</span>
                    </div>
                  }
                  name="fat"
                  rules={[{ required: true, message: 'Please enter your fat goal' }]}
                >
                  <InputNumber
                    min={10}
                    max={200}
                    step={5}
                    className="w-full rounded-lg"
                    placeholder="e.g., 67"
                  />
                </Form.Item>
              </Col>
            </Row>
            
            <div className="mt-6 text-center">
              <Space size="middle">
                <Button
                  onClick={() => setShowGoalModal(false)}
                  className="rounded-full px-6"
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<FontAwesomeIcon icon={faSave} />}
                  className="bg-[#3498db] hover:bg-[#2980b9] border-[#3498db] hover:border-[#2980b9] rounded-full px-6"
                >
                  Save Goals
                </Button>
              </Space>
            </div>
          </Form>
        </Modal>
      </div>
      </div>
    </>
  )
}

export default NutritionCalculator
