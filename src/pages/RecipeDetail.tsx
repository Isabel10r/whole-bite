import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  Row, 
  Col, 
  Card, 
  Button, 
  Tag, 
  Typography, 
  Space,
  List,
  Breadcrumb
} from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faClock, 
  faUser,
  faFire,
  faArrowLeft,
  faHome,
  faUtensils,
  faLeaf,
  faChartBar,
  faTag,
  faDumbbell,
  faBoltLightning,
  faDroplet
} from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

const { Title, Text, Paragraph } = Typography

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [recipe, setRecipe] = useState<any>(null)

  // Recipe data (same as in Recipes.tsx - could be moved to a shared service)
  const recipes = [
    {
      id: 2,
      title: 'Green Smoothie Bowl',
      image: 'https://i.pinimg.com/736x/c9/ac/f9/c9acf981fb159fe27c8b5c147540aed0.jpg?v=' + Date.now(),
      category: 'breakfast',
      difficulty: 'easy',
      prepTime: 10,
      cookTime: 0,
      servings: 1,
      calories: 353,
      protein: 6,
      carbs: 53,
      fat: 16,
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
      image: 'https://i.pinimg.com/1200x/c8/57/13/c8571321ccc66ead5af35e23dee9e0dc.jpg?v=' + Date.now(), 
      category: 'dinner',
      difficulty: 'medium',
      prepTime: 15,
      cookTime: 25,
      servings: 4,
      calories: 375,
      protein: 38,
      carbs: 5,
      fat: 21,
      description: 'Tender baked salmon fillets with fresh herbs and lemon, served with roasted asparagus.',
      ingredients: [
        '4 salmon fillets (6 oz each)',
        '2 tbsp olive oil',
        '2 tbsp fresh dill, chopped',
        '2 tbsp fresh parsley, chopped',
        '3 cloves garlic, finely chopped',
        '1 lemon, juiced and zested',
        '1 lb asparagus',
        'Salt and pepper to taste'
      ],
      instructions: [
        'Preheat oven to 425°F',
        'Season salmon with salt, pepper, herbs, and finely chopped garlic',
        'Place salmon on baking sheet with asparagus',
        'Drizzle with olive oil and lemon juice',
        'Bake for 20-25 minutes until salmon flakes easily'
      ],
      tags: ['high-protein', 'low-carb', 'omega-3']
    },
    {
      id: 4,
      title: 'Mediterranean Chickpea Salad',
      image: 'https://i.pinimg.com/1200x/73/59/b5/7359b56f0e0449ab9136968c7e12b736.jpg?v=' + Date.now(),
      category: 'lunch',
      difficulty: 'easy',
      prepTime: 20,
      cookTime: 0,
      servings: 4,
      calories: 318,
      protein: 11,
      carbs: 30,
      fat: 18,
      description: 'A fresh and flavorful salad with chickpeas, tomatoes, cucumbers, and Mediterranean herbs.',
      ingredients: [
        '2 cups cooked chickpeas',
        '1 cup cherry tomatoes, halved',
        '1 cucumber, diced',
        '1/2 red onion, thinly sliced',
        '1/2 cup kalamata olives',
        '1/2 cup feta cheese, crumbled',
        '1/4 cup fresh parsley',
        '3 tbsp olive oil',
        '2 tbsp red wine vinegar',
        '1 tsp oregano'
      ],
      instructions: [
        'Combine chickpeas, tomatoes, cucumber, and red onion in a large bowl',
        'Add olives, feta cheese, and parsley',
        'Whisk together olive oil, vinegar, and oregano for dressing',
        'Pour dressing over salad and toss to combine',
        'Let marinate for 15 minutes before serving'
      ],
      tags: ['vegan', 'gluten-free', 'high-fiber']
    },
    {
      id: 5,
      title: 'Overnight Oats with Berries',
      image: 'https://i.pinimg.com/1200x/0b/d2/42/0bd242a783c9b9f346f100602a9b20d1.jpg?v=' + Date.now(),
      category: 'breakfast',
      difficulty: 'easy',
      prepTime: 10,
      cookTime: 0,
      servings: 1,
      calories: 500,
      protein: 21,
      carbs: 66,
      fat: 18,
      description: 'Creamy overnight oats with fresh berries and a touch of honey, perfect for busy mornings.',
      ingredients: [
        '1/2 cup rolled oats',
        '1/2 cup almond milk',
        '1/2 cup Greek yogurt',
        '1 tbsp chia seeds',
        '1 tbsp honey',
        '1/2 cup mixed berries',
        '1 tbsp almond butter',
        '1 tsp vanilla extract',
        'Splash of milk of choice',
        'Pinch of cinnamon'
      ],
      instructions: [
        'Mix oats, almond milk, Greek yogurt, chia seeds, and vanilla in a jar',
        'Add honey, splash of milk, and pinch of cinnamon, then stir well',
        'Refrigerate overnight or for at least 4 hours',
        'Top with berries and almond butter before serving'
      ],
      tags: ['vegan', 'gluten-free', 'meal-prep']
    },
    {
      id: 6,
      title: 'Grilled Chicken with Sweet Potato',
      image: 'https://i.pinimg.com/1200x/72/6c/79/726c79f2615b597dc3d807831026cfc0.jpg?v=' + Date.now(),
      category: 'dinner',
      difficulty: 'medium',
      prepTime: 20,
      cookTime: 30,
      servings: 4,
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
        '1 tsp onion powder',
        '1 tsp dried oregano',
        '1/2 tsp cumin',
        '1/2 tsp smoked paprika',
        '1/4 tsp cayenne pepper',
        '1 tsp dried thyme',
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
    },
    {
      id: 7,
      title: 'Curry de Pollo',
      image: 'https://media.canva.com/v2/image-resize/format:PNG/height:550/quality:100/uri:ifs%3A%2F%2FM%2F45c371ae-46a9-4c66-83a2-71dbe211272d/watermark:F/width:550?csig=AAAAAAAAAAAAAAAAAAAAABluGMKFsjzKQYERILb77hb3VZcCcSWzxuoEYqwDKSwE&exp=1758255847&osig=AAAAAAAAAAAAAAAAAAAAAKSTlY0oCTYye-AhDbhM7IqTDXTgDLW5mFZIk3WSnDNt&signer=media-rpc&x-canva-quality=thumbnail_large',
      category: 'dinner',
      difficulty: 'medium',
      prepTime: 15,
      cookTime: 25,
      servings: 4,
      calories: 520,
      protein: 35,
      carbs: 18,
      fat: 32,
      description: 'Un curry cremoso y aromático de pollo con leche de coco y especias exóticas, perfecto para una cena reconfortante.',
      ingredients: [
        '570 g de pechuga de pollo en cubos',
        '1 cebolla, finamente picada',
        '2 dientes de ajo, triturados',
        '1 cucharadita de jengibre fresco rallado',
        '2 cucharadas de curry en polvo',
        '½ cucharadita de comino molido',
        '½ cucharadita de cúrcuma',
        '½ cucharadita de paprika',
        '⅓ cucharadita de chile',
        '1 cucharada de pasta de tomate',
        '1 taza de leche de coco',
        '½ taza de caldo de pollo o agua',
        '2 cucharadas de aceite de oliva',
        'Sal y pimienta al gusto',
        'Cilantro o perejil fresco para decorar'
      ],
      instructions: [
        'Sofríe la cebolla en aceite hasta dorar. Añade ajo y jengibre, cocina 1 minuto.',
        'Agrega especias, cocina 1-2 minutos.',
        'Incorpora pollo, salpimienta y cocina hasta dorar.',
        'Añade pasta de tomate, leche de coco y caldo. Cocina tapado a fuego bajo 20 min hasta espesar.',
        'Sirve con arroz blanco o pan pita, decora con cilantro.'
      ],
      tags: ['high-protein', 'creamy', 'aromatic', 'spicy']
    },
    {
      id: 8,
      title: 'Ensalada de Pasta Italiana',
      image: 'https://media.canva.com/v2/image-resize/format:PNG/height:550/quality:100/uri:ifs%3A%2F%2FM%2Fddd5cb37-1dc0-43d6-8740-74b854088fe5/watermark:F/width:427?csig=AAAAAAAAAAAAAAAAAAAAAF7NjUMKcPtzHuud66oC9yf3ED0dSrNGFDGOpE-mmATS&exp=1758256217&osig=AAAAAAAAAAAAAAAAAAAAAIZcG1RblB5WY3i0KgX4G7aDpz33TJZ-g6bD1IzUEbyx&signer=media-rpc&x-canva-quality=thumbnail_large',
      category: 'lunch',
      difficulty: 'easy',
      prepTime: 25,
      cookTime: 15,
      servings: 4,
      calories: 385,
      protein: 18,
      carbs: 42,
      fat: 16,
      description: 'Una fresca ensalada de pasta con ingredientes mediterráneos, perfecta para comidas ligeras y refrescantes.',
      ingredients: [
        '115 g de pasta',
        '½ taza de tomates cherry',
        '¼ taza de aceitunas negras en rodajas',
        '⅓ taza de mozzarella en bolitas',
        '¼ taza de salami en cubos',
        '¼ pimentón rojo y ¼ verde en cubos',
        '2 cdas de cebolla morada picada',
        '½ cda de perejil fresco picado',
        'Queso parmesano rallado al gusto',
        '2 cdas de aceite de oliva extra virgen',
        '1 cda de vinagre balsámico',
        '¼ cdta de mostaza Dijon',
        '¼ diente de ajo triturado',
        '¼ cdta de orégano seco',
        'Sal y pimienta al gusto'
      ],
      instructions: [
        'Cocina pasta al dente, enjuaga y reserva.',
        'Mezcla ingredientes de la vinagreta.',
        'Combina pasta, tomates, aceitunas, quesos, salami, pimientos, cebolla y perejil.',
        'Vierte vinagreta, mezcla bien, reposa 20 min en nevera.',
        'Sirve fría con parmesano y perejil fresco.'
      ],
      tags: ['mediterranean', 'cold-salad', 'refreshing', 'meal-prep']
    },
    {
      id: 9,
      title: 'Persian Kebab with Rice',
      image: 'https://media.canva.com/v2/image-resize/format:PNG/height:550/quality:100/uri:ifs%3A%2F%2FM%2Ff63a221d-dad0-4f27-8001-733f17febf19/watermark:F/width:404?csig=AAAAAAAAAAAAAAAAAAAAAOJv3GQ48MzZ-u2N88KhVD4USzJKmU-jlk3WHp8fscBM&exp=1758254380&osig=AAAAAAAAAAAAAAAAAAAAAEbv1vxwSJ9Vv7o5lX0tDoNjLtzMRuh15WNRsaesCZNm&signer=media-rpc&x-canva-quality=thumbnail_large',
      category: 'dinner',
      difficulty: 'medium',
      prepTime: 20,
      cookTime: 15,
      servings: 4,
      calories: 485,
      protein: 32,
      carbs: 38,
      fat: 22,
      description: 'Aromatic Persian-style beef kebabs seasoned with traditional spices, served with fluffy basmati rice.',
      ingredients: [
        '570g ground beef',
        '½ onion, grated',
        '1 tbsp fresh parsley, chopped',
        '½ tsp turmeric',
        '½ tsp cumin',
        '½ tsp black pepper',
        '½ tsp salt',
        '1 small egg',
        '1 cup basmati rice',
        '2 tbsp butter',
        'Salt to taste'
      ],
      instructions: [
        'Mix ground beef with grated onion, egg, spices, and parsley. Knead well.',
        'Form elongated kebabs on skewers or shape directly.',
        'Grill in grill pan or on barbecue until golden (10-12 minutes).',
        'Cook basmati rice with salt and butter until fluffy.',
        'Serve kebabs with rice and fresh salad.'
      ],
      tags: ['high-protein', 'persian', 'grilled', 'aromatic']
    },
    {
      id: 10,
      title: 'Beef Fajitas',
      image: 'https://media.canva.com/v2/image-resize/format:PNG/height:550/quality:100/uri:ifs%3A%2F%2FM%2F1c43df2e-b72e-457b-b79e-9bd7e7743b27/watermark:F/width:366?csig=AAAAAAAAAAAAAAAAAAAAAG3Ti6HL9CDQnvTkGQuYOay2DLxZGFCIIXHzOkxfaxOY&exp=1758255147&osig=AAAAAAAAAAAAAAAAAAAAAAOn1v3kfR8SVqZO2hJ6pD2LmFZKNOyF1W4RMLURhsVB&signer=media-rpc&x-canva-quality=thumbnail_large',
      category: 'dinner',
      difficulty: 'easy',
      prepTime: 25,
      cookTime: 10,
      servings: 4,
      calories: 420,
      protein: 28,
      carbs: 32,
      fat: 18,
      description: 'Sizzling beef fajitas with colorful peppers and onions, perfect for a quick and flavorful dinner.',
      ingredients: [
        '570g beef strips',
        '½ onion, julienned',
        '½ red bell pepper and ½ green bell pepper, sliced',
        '2 tbsp olive oil',
        '1 tbsp lime juice',
        '1 tsp paprika',
        '½ tsp cumin',
        '½ tsp garlic powder',
        'Salt and pepper to taste',
        '4 wheat or corn tortillas'
      ],
      instructions: [
        'Marinate beef with oil, lime juice, and spices for 20 minutes.',
        'Sauté beef in a hot pan over high heat.',
        'Add onion and bell peppers, cook for 5 minutes.',
        'Serve in warm tortillas with guacamole, sour cream, or pico de gallo.'
      ],
      tags: ['mexican', 'quick-meal', 'high-protein', 'spicy']
    },
    {
      id: 12,
      title: 'Deluxe Overnight Oats',
      image: 'https://media.canva.com/v2/image-resize/format:PNG/height:550/quality:100/uri:ifs%3A%2F%2FM%2Fa5043e45-6b3c-4f4a-a2e6-ee18f395e66a/watermark:F/width:447?csig=AAAAAAAAAAAAAAAAAAAAANC-mMHbzw1RZWk0mz66HPIXeTmsiSmq7D6KCvCnpI9p&exp=1758257720&osig=AAAAAAAAAAAAAAAAAAAAAKuAyXg8I1kPk2DlNM59PnD8-UDCK3S4Qs6gC9QZDf26&signer=media-rpc&x-canva-quality=thumbnail_large',
      category: 'breakfast',
      difficulty: 'easy',
      prepTime: 15,
      cookTime: 0,
      servings: 4,
      calories: 380,
      protein: 22,
      carbs: 48,
      fat: 14,
      description: 'Creamy overnight oats with Greek yogurt, chia seeds and fresh fruits. A nutritious and delicious option to start the day.',
      ingredients: [
        '2 cups rolled oats',
        '3 cups plain Greek yogurt',
        '1 cup almond milk',
        '4 tablespoons chia seeds',
        '2 ripe bananas, sliced',
        '4 tablespoons chopped walnuts',
        '4 tablespoons honey',
        '8 hard-boiled eggs (optional for extra protein)',
        '1 teaspoon vanilla extract',
        '1/2 teaspoon ground cinnamon',
        'Mixed berries for topping'
      ],
      instructions: [
        'In 4 jars or containers, mix 1/2 cup oats, 3/4 cup Greek yogurt, and 1/4 cup milk in each one.',
        'Add 1 tablespoon chia seeds, a few drops of vanilla, and a pinch of cinnamon to each jar.',
        'Stir in 1 tablespoon honey into each container and mix well.',
        'Refrigerate overnight or for at least 4 hours.',
        'When serving, top with banana slices, walnuts, berries, and 2 hard-boiled eggs if desired for extra protein.',
        'You can add an extra drizzle of honey to taste before serving.'
      ],
      tags: ['high-protein', 'meal-prep', 'gluten-free', 'healthy']
    },
    {
      id: 13,
      title: 'Gourmet French Toast',
      image: 'https://media.canva.com/v2/image-resize/format:PNG/height:550/quality:100/uri:ifs%3A%2F%2FM%2F33d082f7-ef02-48c5-aaa0-0d522772610d/watermark:F/width:309?csig=AAAAAAAAAAAAAAAAAAAAAIntbMIK4FESBQgXGf38tvV7yu0Gsx16H3AAtF9_U5W5&exp=1758259655&osig=AAAAAAAAAAAAAAAAAAAAANs6hriNXFhTtpDpHlOami1WDTeG9_Bo5qL2zaPUTyJ9&signer=media-rpc&x-canva-quality=thumbnail_large',
      category: 'breakfast',
      difficulty: 'easy',
      prepTime: 15,
      cookTime: 12,
      servings: 4,
      calories: 320,
      protein: 16,
      carbs: 38,
      fat: 12,
      description: 'Golden and fluffy French toast with a touch of vanilla and cinnamon, served with fresh fruits and creamy Greek yogurt.',
      ingredients: [
        '8 slices thick brioche or whole grain bread',
        '8 large eggs',
        '3/4 cup almond milk',
        '2 teaspoons vanilla extract',
        '1 teaspoon ground cinnamon',
        '4 tablespoons honey',
        '4 tablespoons butter',
        '1 cup plain Greek yogurt',
        '2 cups mixed fresh fruits (strawberries, blueberries, banana)',
        '4 tablespoons chopped walnuts',
        '1/4 teaspoon salt',
        'Powdered sugar for dusting (optional)'
      ],
      instructions: [
        'In a large bowl, whisk eggs with almond milk, vanilla, cinnamon, 2 tablespoons honey, and salt.',
        'Soak each bread slice in the mixture for 30 seconds on each side.',
        'Heat 1 tablespoon butter in a large skillet over medium heat.',
        'Cook 2-3 bread slices for 2-3 minutes on each side until golden brown.',
        'Repeat the process with remaining bread, adding butter as needed.',
        'Serve hot topped with Greek yogurt, fresh fruits, walnuts, and a drizzle of honey.',
        'Dust with powdered sugar if desired for an extra special touch.'
      ],
      tags: ['comfort-food', 'high-protein', 'weekend-breakfast', 'family-friendly']
    },
    {
      id: 14,
      title: 'Supreme Avocado Toast',
      image: 'https://media.canva.com/v2/image-resize/format:PNG/height:550/quality:100/uri:ifs%3A%2F%2FM%2F666545be-839f-456c-b7e7-9d44b86d1649/watermark:F/width:369?csig=AAAAAAAAAAAAAAAAAAAAABBkgKjkg5Ao96S6FxqgTBqiMVfadGSm5jihmSNUzcyB&exp=1758255449&osig=AAAAAAAAAAAAAAAAAAAAALwcJ4iFtd8qPWQraqdJZwn6fMIk3cHVC_OFv9jl5Dwd&signer=media-rpc&x-canva-quality=thumbnail_large',
      category: 'breakfast',
      difficulty: 'easy',
      prepTime: 15,
      cookTime: 8,
      servings: 4,
      calories: 420,
      protein: 24,
      carbs: 28,
      fat: 26,
      description: 'Elevated avocado toast with perfect eggs, cherry tomatoes and a touch of lemon. Rich in healthy fats and protein.',
      ingredients: [
        '8 slices artisanal whole grain bread',
        '2 large ripe avocados',
        '12 fresh eggs',
        '1 cup cherry tomatoes, halved',
        '4 tablespoons extra virgin olive oil',
        '2 lemons (juice)',
        '1 teaspoon sea salt',
        '1/2 teaspoon freshly ground black pepper',
        '1/2 teaspoon paprika',
        '4 tablespoons pumpkin seeds',
        'Arugula leaves for garnish',
        'Crumbled feta cheese (optional)'
      ],
      instructions: [
        'Toast the bread slices until golden and crispy.',
        'In a bowl, mash the avocados with lemon juice, salt, pepper and paprika.',
        'Heat olive oil in a large pan and fry the eggs until whites are firm.',
        'Generously spread the seasoned avocado over each toast.',
        'Place 3 eggs over each portion of 2 toasts.',
        'Garnish with cherry tomatoes, pumpkin seeds and arugula.',
        'Add feta cheese if desired and serve immediately.'
      ],
      tags: ['healthy-fats', 'high-protein', 'fresh', 'omega-3']
    },
    {
      id: 15,
      title: 'Fluffy Oat Pancakes',
      image: 'https://media.canva.com/v2/image-resize/format:PNG/height:550/quality:100/uri:ifs%3A%2F%2FM%2Fa96a0f8a-2823-4841-ba31-ac9c26dced62/watermark:F/width:496?csig=AAAAAAAAAAAAAAAAAAAAACK743DielYmoghvbyNJ49gaPSEIVXdbrtU5OLeqR0yF&exp=1758256292&osig=AAAAAAAAAAAAAAAAAAAAADslgiO4YjteUdjbbkm-zKAca67p2IX7-jSQAO2TXR75&signer=media-rpc&x-canva-quality=thumbnail_large',
      category: 'breakfast',
      difficulty: 'easy',
      prepTime: 15,
      cookTime: 20,
      servings: 4,
      calories: 340,
      protein: 18,
      carbs: 42,
      fat: 12,
      description: 'Nutritious and fluffy pancakes made with oats, banana and spices. A healthy and delicious option for the whole family.',
      ingredients: [
        '2 cups rolled oats',
        '4 ripe bananas, mashed',
        '8 large eggs',
        '1 cup almond milk',
        '2 teaspoons baking powder',
        '2 teaspoons vanilla extract',
        '1 teaspoon ground cinnamon',
        '1/2 teaspoon nutmeg',
        '1/4 teaspoon salt',
        '4 tablespoons honey',
        'Mixed fresh fruits for topping',
        '4 tablespoons chopped walnuts',
        'Coconut oil for the pan'
      ],
      instructions: [
        'In a large bowl, mix oats, baking powder, cinnamon, nutmeg and salt.',
        'In another bowl, beat eggs with mashed bananas, milk, vanilla and honey.',
        'Combine wet and dry ingredients until you get a smooth mixture.',
        'Let the mixture rest for 5 minutes so the oats can hydrate.',
        'Heat a non-stick pan with a little coconut oil.',
        'Pour 1/4 cup of mixture per pancake and cook 3-4 minutes per side until golden.',
        'Serve hot topped with fresh fruits, walnuts and a drizzle of honey.'
      ],
      tags: ['gluten-free', 'high-fiber', 'natural-sweetener', 'family-friendly']
    },
    {
      id: 11,
      title: 'Zucchini Lasagna',
      image: 'https://media.canva.com/v2/image-resize/format:PNG/height:550/quality:100/uri:ifs%3A%2F%2FM%2Fbd916d4c-8cf6-4fa3-9d45-4f0ea2065d11/watermark:F/width:366?csig=AAAAAAAAAAAAAAAAAAAAABdfR-00GTSl1xaIwo8IbVggGDe-qiM4_pgKJdjHWB0Y&exp=1758254331&osig=AAAAAAAAAAAAAAAAAAAAACphPLtz9jy9rK_qaK5QiF63DrVDNnC0TckizxRVkaxk&signer=media-rpc&x-canva-quality=thumbnail_large',
      category: 'dinner',
      difficulty: 'medium',
      prepTime: 30,
      cookTime: 30,
      servings: 4,
      calories: 320,
      protein: 24,
      carbs: 12,
      fat: 20,
      description: 'A healthy twist on classic lasagna using zucchini slices instead of pasta, layered with meat sauce and cheese.',
      ingredients: [
        '2 large zucchinis, sliced thin',
        '285g ground beef or chicken',
        '½ onion, chopped',
        '1 garlic clove, minced',
        '1 cup natural tomato sauce',
        '1 cup ricotta or cottage cheese',
        '½ cup shredded mozzarella cheese',
        '2 tbsp grated parmesan cheese',
        '1 tbsp olive oil',
        'Salt, pepper, and oregano to taste'
      ],
      instructions: [
        'Sauté onion and garlic with oil, add meat, season and add tomato sauce. Cook for 15 minutes.',
        'Grill zucchini slices in pan or on grill.',
        'In a baking dish, layer zucchini, meat sauce, ricotta, and cheeses.',
        'Top with mozzarella and parmesan.',
        'Bake at 180°C (356°F) for 25 minutes.',
        'Let rest for 5 minutes before serving.'
      ],
      tags: ['low-carb', 'keto-friendly', 'high-protein', 'gluten-free']
    },
    {
      id: 16,
      title: 'Peanut Butter & Jelly Toast',
      image: 'https://media.canva.com/v2/image-resize/format:PNG/height:550/quality:100/uri:ifs%3A%2F%2FM%2Fb3302b5f-fb05-4d90-9fc9-f0d4f7f373d2/watermark:F/width:550?csig=AAAAAAAAAAAAAAAAAAAAAHXhQ6YJ3rt91dChhxlFiouZ0GIvW8dwgjUva05inuCC&exp=1758263271&osig=AAAAAAAAAAAAAAAAAAAAAEUFpBNt89NLOUaeYeN0ewVs3PK46elFFpCN20_T_EVa&signer=media-rpc&x-canva-quality=thumbnail_large',
      category: 'breakfast',
      difficulty: 'easy',
      prepTime: 5,
      cookTime: 3,
      servings: 4,
      calories: 285,
      protein: 12,
      carbs: 32,
      fat: 14,
      description: 'Classic peanut butter and jelly toast made with whole grain bread and sugar-free jam for a healthier twist on the childhood favorite.',
      ingredients: [
        '8 slices whole grain bread',
        '4 tbsp natural peanut butter',
        '4 tbsp sugar-free jam'
      ],
      instructions: [
        'Toast the bread slices until golden brown.',
        'Spread 1 tbsp of peanut butter on one slice of bread.',
        'Add 1 tbsp of sugar-free jam on top of the peanut butter.',
        'Top with another slice of bread.',
        'Cut in halves and serve immediately.'
      ],
      tags: ['quick-breakfast', 'kid-friendly', 'sugar-free', 'whole-grain']
    },
    {
      id: 17,
      title: 'Healthy Snickers Bites',
      image: 'https://media.canva.com/v2/image-resize/format:PNG/height:550/quality:100/uri:ifs%3A%2F%2FM%2Fb9dfde52-e39a-4ce4-9c3e-4d4d83d2e3ad/watermark:F/width:366?csig=AAAAAAAAAAAAAAAAAAAAAEC8QIiR_hT1E0QyuJ_LSO8dhGHUawE6IAvAmfaJJF-J&exp=1758262652&osig=AAAAAAAAAAAAAAAAAAAAALyGUivdkzaQPUomXP_zpAcNbM6K8rfPKe6gb2nAVrBM&signer=media-rpc&x-canva-quality=thumbnail_large',
      category: 'snacks',
      difficulty: 'easy',
      prepTime: 15,
      cookTime: 0,
      servings: 4,
      calories: 180,
      protein: 4,
      carbs: 28,
      fat: 8,
      description: 'Naturally sweet date bites filled with peanut butter and drizzled with dark chocolate - a healthier take on the classic candy bar.',
      ingredients: [
        '20 Medjool dates, pitted',
        '4 tbsp peanut butter',
        '4 tbsp dark chocolate (70%), melted'
      ],
      instructions: [
        'Slice each date open lengthwise, being careful not to cut all the way through.',
        'Fill each date with 1 tsp peanut butter.',
        'Melt the dark chocolate in a microwave or double boiler.',
        'Dip or drizzle each stuffed date with melted dark chocolate.',
        'Place on a lined tray and refrigerate for 10 minutes until chocolate hardens.',
        'Serve chilled for best texture.'
      ],
      tags: ['natural-sweetener', 'no-bake', 'antioxidants', 'energy-boost']
    },
    {
      id: 18,
      title: 'Tropical Smoothie Bowl',
      image: 'https://media.canva.com/v2/image-resize/format:PNG/height:550/quality:100/uri:ifs%3A%2F%2FM%2Fe8c79369-0684-4ed3-9923-b40217d068a1/watermark:F/width:412?csig=AAAAAAAAAAAAAAAAAAAAAAfdGpD1Fe0nwNQcyp3cNPsJoFwxiHXNa_pWjGdAWOv-&exp=1758263393&osig=AAAAAAAAAAAAAAAAAAAAAFYpff-QDDZUw6tR4pyRD2Ta2g5omn8agOW71je8iRy9&signer=media-rpc&x-canva-quality=thumbnail_large',
      category: 'breakfast',
      difficulty: 'easy',
      prepTime: 10,
      cookTime: 0,
      servings: 4,
      calories: 353,
      protein: 6,
      carbs: 53,
      fat: 16,
      description: 'A refreshing tropical smoothie bowl bursting with frozen fruits, creamy Greek yogurt, and topped with fresh fruits and granola.',
      ingredients: [
        '2 cups frozen banana',
        '1 cup mango chunks',
        '1 cup strawberries',
        '1 cup Greek yogurt',
        '4 tsp honey (optional)',
        'Fresh fruit and granola for topping'
      ],
      instructions: [
        'Add frozen banana, mango chunks, strawberries, and Greek yogurt to a blender.',
        'Add honey if desired for extra sweetness.',
        'Blend until smooth and thick, adding minimal liquid if needed.',
        'Divide the smoothie mixture into 4 bowls.',
        'Top each bowl with fresh fruit slices and granola.',
        'Serve immediately for best texture.'
      ],
      tags: ['vitamin-c', 'probiotics', 'antioxidants', 'refreshing']
    },
    {
      id: 19,
      title: 'Nutty Granola Bars',
      image: 'https://media.canva.com/v2/image-resize/format:PNG/height:550/quality:100/uri:ifs%3A%2F%2FM%2F94ada965-bec2-4db7-ab75-7f5ed44b85c6/watermark:F/width:366?csig=AAAAAAAAAAAAAAAAAAAAAGTLqfM8RYtCPZ7VJ-zjCNwDA9Pz5nso08k9EkpyMKE1&exp=1758262017&osig=AAAAAAAAAAAAAAAAAAAAAAHPloq3s6CCgsriwzdkF83gLL35rnwCCCHzf5epP2JH&signer=media-rpc&x-canva-quality=thumbnail_large',
      category: 'snacks',
      difficulty: 'easy',
      prepTime: 15,
      cookTime: 0,
      servings: 4,
      calories: 265,
      protein: 8,
      carbs: 28,
      fat: 14,
      description: 'No-bake granola bars packed with oats, nuts, and a touch of dark chocolate - perfect for on-the-go energy or afternoon snacks.',
      ingredients: [
        '1 cup rolled oats',
        '4 tbsp honey',
        '4 tbsp chopped almonds',
        '2 tbsp dark chocolate chips',
        '4 tbsp nut butter (almond, peanut, or cashew)',
        '4 tbsp pecans, chopped'
      ],
      instructions: [
        'In a large bowl, mix rolled oats, chopped almonds, pecans, and dark chocolate chips.',
        'In a separate bowl, warm the honey slightly and mix with nut butter until smooth.',
        'Pour the honey-nut butter mixture over the dry ingredients.',
        'Mix everything together until well combined and sticky.',
        'Press the mixture firmly into a lined 8x8 inch pan.',
        'Refrigerate for at least 20 minutes until firm.',
        'Cut into 8 small bars (2 per serving) and store in refrigerator.'
      ],
      tags: ['no-bake', 'portable', 'energy-boost', 'fiber-rich']
    },
    {
      id: 20,
      title: 'Cheesy Quesadillas',
      image: 'https://media.canva.com/v2/image-resize/format:PNG/height:550/quality:100/uri:ifs%3A%2F%2FM%2Fa2edae50-f0ff-451c-9174-78c6f1ebc29c/watermark:F/width:440?csig=AAAAAAAAAAAAAAAAAAAAAOTdxkhxZR18Af4wn-tIykXtF1y9tgftJmmeamfJCtLA&exp=1758263015&osig=AAAAAAAAAAAAAAAAAAAAALxbB6PxxS7mdCCUOiEF_9jqIcjCczLQOAl4-_IlWERN&signer=media-rpc&x-canva-quality=thumbnail_large',
      category: 'snacks',
      difficulty: 'easy',
      prepTime: 10,
      cookTime: 8,
      servings: 4,
      calories: 320,
      protein: 16,
      carbs: 28,
      fat: 18,
      description: 'Crispy whole wheat quesadillas filled with melted cheese and served with guacamole or pico de gallo.',
      ingredients: [
        '4 whole wheat tortillas',
        '120 g shredded cheese (mozzarella or cheddar)',
        '1 tsp olive oil',
        'Fresh parsley or cilantro for garnish',
        'Guacamole or pico de gallo for serving'
      ],
      instructions: [
        'Heat a tortilla in a skillet with a light brush of olive oil.',
        'Sprinkle 30 g of cheese on half of the tortilla, fold in half.',
        'Cook until golden on both sides and cheese is melted.',
        'Slice into wedges and garnish with fresh herbs.',
        'Serve with guacamole or pico de gallo.'
      ],
      tags: ['quick-snack', 'cheese-lover', 'kid-friendly', 'mexican']
    },
    {
      id: 21,
      title: 'Mini Pizza Toasts',
      image: 'https://media.canva.com/v2/image-resize/format:PNG/height:550/quality:100/uri:ifs%3A%2F%2FM%2F89175a5e-f78f-48f7-9c07-5ee0c70362b8/watermark:F/width:343?csig=AAAAAAAAAAAAAAAAAAAAAB8l87X2lV9ojCvcN5rw72JLY7R1WMRGAcepY0ven_eq&exp=1758262021&osig=AAAAAAAAAAAAAAAAAAAAAOVsUV-51oKP0uSY51pNZofiAodzGt26mk1kxXe9NI0Y&signer=media-rpc&x-canva-quality=thumbnail_large',
      category: 'snacks',
      difficulty: 'easy',
      prepTime: 10,
      cookTime: 8,
      servings: 4,
      calories: 280,
      protein: 14,
      carbs: 32,
      fat: 12,
      description: 'Delicious mini pizza toasts on whole grain bread with tomato sauce, mozzarella, and fresh toppings.',
      ingredients: [
        '4 slices whole grain bread',
        '4 tbsp tomato sauce or napolitan sauce',
        '120 g shredded mozzarella cheese',
        'Pepperoni or ham',
        '20 cherry tomato slices',
        '1 tsp dried oregano or italian blend'
      ],
      instructions: [
        'Toast bread slices slightly.',
        'Spread 1 tbsp tomato sauce on each slice.',
        'Top with 30 g mozzarella and 5 tomato slices.',
        'Add pepperoni or ham if desired.',
        'Sprinkle oregano and bake until cheese melts.'
      ],
      tags: ['kid-friendly', 'italian', 'quick-meal', 'customizable']
    },
    {
      id: 22,
      title: 'Yogurt Custard Toast',
      image: 'https://media.canva.com/v2/image-resize/format:PNG/height:550/quality:100/uri:ifs%3A%2F%2FM%2F314be65f-fe57-4145-9aca-8aca41a90402/watermark:F/width:314?csig=AAAAAAAAAAAAAAAAAAAAAP6bamHVccluRcTUefv7gmwalbZPSbDhFHKkJkWO10VY&exp=1758262760&osig=AAAAAAAAAAAAAAAAAAAAAGBaWPZZQI2QW8Vj5J66ddC3LnLtlyb1Ew0atcRJjt2I&signer=media-rpc&x-canva-quality=thumbnail_large',
      category: 'breakfast',
      difficulty: 'easy',
      prepTime: 8,
      cookTime: 5,
      servings: 4,
      calories: 240,
      protein: 18,
      carbs: 28,
      fat: 8,
      description: 'Creamy yogurt custard toast topped with fresh blueberries, baked to perfection for a healthy breakfast treat.',
      ingredients: [
        '4 slices whole grain bread',
        '8 tbsp Greek yogurt',
        '4 tsp honey',
        '4 eggs, lightly beaten',
        '40 fresh blueberries'
      ],
      instructions: [
        'Mix yogurt, honey, and eggs until smooth.',
        'Spread mixture evenly over each slice of bread.',
        'Add 10 blueberries per slice.',
        'Air-fry or bake at 180°C (350°F) for 5 minutes.',
        'Serve warm for best texture.'
      ],
      tags: ['protein-rich', 'healthy-breakfast', 'berries', 'air-fryer']
    },
    {
      id: 23,
      title: 'Healthy Baked Nachos',
      image: 'https://media.canva.com/v2/image-resize/format:PNG/height:550/quality:100/uri:ifs%3A%2F%2FM%2Fc40ebab9-6ede-46ba-8c7d-b9665c99d6f2/watermark:F/width:440?csig=AAAAAAAAAAAAAAAAAAAAAAjF966TTlLXfYiUn1sbogjsKnrs3sFhr6PClBXjiRvA&exp=1758262780&osig=AAAAAAAAAAAAAAAAAAAAACMaaj0QsTt0mV1L5Tj3yHw-gh1NHhTjxiRjYU0noIoQ&signer=media-rpc&x-canva-quality=thumbnail_large',
      category: 'snacks',
      difficulty: 'easy',
      prepTime: 15,
      cookTime: 10,
      servings: 4,
      calories: 290,
      protein: 8,
      carbs: 35,
      fat: 14,
      description: 'Crispy baked tortilla chips served with fresh homemade guacamole for a healthy twist on nachos.',
      ingredients: [
        '4 whole wheat tortillas',
        '4 tsp olive oil',
        '2 ripe avocados',
        '2 tsp lime juice',
        '1 small tomato, diced',
        'Salt to taste'
      ],
      instructions: [
        'Cut tortillas into triangles, brush with olive oil, and bake until crispy.',
        'Mash avocados with lime juice, tomato, and salt to make guacamole.',
        'Serve nacho chips with guacamole on the side.',
        'Enjoy immediately for best crispiness.'
      ],
      tags: ['healthy-fats', 'baked-not-fried', 'avocado', 'mexican']
    },
    {
      id: 24,
      title: 'Cucumber Tuna Boats',
      image: 'https://media.canva.com/v2/image-resize/format:PNG/height:550/quality:100/uri:ifs%3A%2F%2FM%2Face4f621-608c-4779-8858-7ab6cdf043e7/watermark:F/width:345?csig=AAAAAAAAAAAAAAAAAAAAAFtx7eY4ONcauMZQGApSicq_lDXyvf6eF0HQylPZGH4H&exp=1758261082&osig=AAAAAAAAAAAAAAAAAAAAAEn1xySorkjO7gOFNtbsm16WLiVOUhchPTpfxbEsCC44&signer=media-rpc&x-canva-quality=thumbnail_large',
      category: 'lunch',
      difficulty: 'easy',
      prepTime: 15,
      cookTime: 0,
      servings: 4,
      calories: 180,
      protein: 22,
      carbs: 8,
      fat: 8,
      description: 'Fresh cucumber boats filled with a creamy tuna salad mixture, topped with sesame seeds for crunch.',
      ingredients: [
        '2 medium cucumbers',
        '200 g canned tuna (drained)',
        '4 tbsp cream cheese',
        '4 tbsp avocado, mashed',
        '2 tsp sesame seeds',
        'Soy sauce to taste',
        'Green onions for garnish'
      ],
      instructions: [
        'Slice cucumbers lengthwise and scoop out centers.',
        'Mix tuna, cream cheese, and avocado.',
        'Fill cucumber boats with mixture.',
        'Sprinkle sesame seeds on top.',
        'Garnish with green onions and serve with soy sauce.'
      ],
      tags: ['low-carb', 'high-protein', 'no-cook', 'fresh']
    },
    {
      id: 25,
      title: 'Sheet Pan Chicken Fajitas',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800',
      category: 'dinner',
      difficulty: 'easy',
      prepTime: 15,
      cookTime: 25,
      servings: 4,
      calories: 470,
      protein: 33,
      carbs: 33,
      fat: 22,
      description: 'Easy one-pan chicken fajitas with bell peppers and onions, served with homemade guacamole and warm corn tortillas.',
      ingredients: [
        '3 bell peppers, sliced',
        '1 medium onion, sliced',
        '580 g (1.3 lb) chicken breast, sliced',
        '2 Tbsp olive oil',
        '2 cloves garlic, minced',
        '2 tsp chili powder',
        '1 tsp cumin',
        '1 tsp paprika',
        '1 tsp garlic powder',
        '1 tsp onion powder',
        '1 tsp dried oregano',
        '1 tsp salt',
        '½ tsp black pepper',
        'Juice of 1 lime (2 Tbsp)',
        '3 Tbsp cilantro, chopped',
        '8 corn tortillas (about 25 g each)',
        '2 medium avocados (~300 g pulp)',
        '1 small tomato, finely chopped',
        '¼ medium onion, finely chopped',
        'Juice of 1 lime',
        '2 Tbsp cilantro, chopped',
        'Salt to taste'
      ],
      instructions: [
        'Preheat oven to 425°F (220°C).',
        'In a large bowl, combine chicken, bell peppers, and onion.',
        'In a small bowl, whisk together olive oil, garlic, chili powder, cumin, paprika, garlic powder, onion powder, oregano, salt, and black pepper.',
        'Pour the spice mixture over the chicken and vegetables, tossing to coat evenly.',
        'Spread everything on a large baking sheet in a single layer.',
        'Bake for 20-25 minutes, stirring halfway through, until chicken is cooked through and vegetables are tender.',
        'While fajitas cook, make guacamole: mash avocados with lime juice, then mix in tomato, onion, cilantro, and salt.',
        'Remove fajitas from oven and sprinkle with cilantro and lime juice.',
        'Warm tortillas and serve fajitas with guacamole.'
      ],
      tags: ['one-pan', 'mexican', 'high-protein', 'gluten-free']
    },
    {
      id: 26,
      title: 'BBQ Chicken',
      image: 'https://i.pinimg.com/736x/a4/86/ab/a486ab1190d96d1c5a6ebfe9d6652e40.jpg',
      category: 'dinner',
      difficulty: 'easy',
      prepTime: 10,
      cookTime: 15,
      servings: 4,
      calories: 260,
      protein: 42,
      carbs: 8,
      fat: 6,
      description: 'Grilled chicken breasts with BBQ sauce, perfect for a flavorful and high-protein dinner.',
      ingredients: [
        '4 boneless, skinless chicken breasts (~800 g total)',
        'Sea salt to taste',
        'Black pepper to taste',
        'Olive oil (1 tbsp, for cooking)',
        '⅓ cup BBQ sauce'
      ],
      instructions: [
        'Preheat grill to medium-high heat.',
        'Season chicken breasts with salt and pepper.',
        'Cook on grill for 5-6 minutes per side until fully cooked.',
        'In the last 2 minutes, brush with BBQ sauce.',
        'Serve hot with additional BBQ sauce on the side.'
      ],
      tags: ['high-protein', 'grilled', 'bbq', 'low-carb']
    },
    {
      id: 27,
      title: 'Buddha Bowl',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
      category: 'lunch',
      difficulty: 'medium',
      prepTime: 20,
      cookTime: 25,
      servings: 4,
      calories: 540,
      protein: 17,
      carbs: 58,
      fat: 27,
      description: 'A nutritious and colorful bowl with quinoa, roasted vegetables, chickpeas, and tahini dressing.',
      ingredients: [
        '¾ cup raw quinoa (~130 g)',
        '1 ½ cups vegetable broth (or water with salt)',
        '1 large sweet potato (~250 g), cubed',
        '2 cups baby spinach',
        '1 medium cucumber, cubed',
        '2 cups shredded purple cabbage (~140 g)',
        '1 can chickpeas (~400 g), rinsed and drained',
        '3 tablespoons toasted sunflower seeds (~30 g)',
        '1 large avocado (~200 g), sliced (optional)',
        '3 tablespoons tahini (~45 g)',
        '2 tablespoons lemon juice',
        '1 tablespoon apple cider vinegar',
        '1 tablespoon nutritional yeast (optional)',
        '2 tablespoons low-sodium soy sauce',
        '1 garlic clove, minced',
        '3–4 tablespoons water (adjust texture)',
        '2 tablespoons olive oil (~20 g)',
        '1 tsp paprika',
        '1 tsp ground cumin',
        'Salt and pepper'
      ],
      instructions: [
        'Cook quinoa according to package instructions with vegetable broth.',
        'Preheat oven to 400°F (200°C).',
        'Toss sweet potato and chickpeas with olive oil, paprika, cumin, salt and pepper.',
        'Roast in the oven for 20-25 minutes until golden.',
        'Prepare dressing by mixing tahini, lemon juice, vinegar, nutritional yeast, soy sauce, garlic and water.',
        'Assemble bowl with quinoa, roasted vegetables, spinach, cucumber, cabbage and chickpeas.',
        'Add avocado and sunflower seeds.',
        'Serve with tahini dressing.'
      ],
      tags: ['vegan', 'high-fiber', 'nutritious', 'colorful']
    },
    {
      id: 28,
      title: 'Healthy Kung Pao Chicken',
      image: 'https://fitfoodiefinds.com/wp-content/uploads/2021/02/Kung-Pao-Chicken-17.jpg',
      category: 'dinner',
      difficulty: 'medium',
      prepTime: 15,
      cookTime: 20,
      servings: 4,
      calories: 355,
      protein: 45,
      carbs: 17,
      fat: 11,
      description: 'A healthier version of the classic Kung Pao chicken with green beans, featuring a spicy and flavorful sauce.',
      ingredients: [
        '1 Tbsp garlic, minced',
        '¼ cup soy sauce (or tamari)',
        '1 tsp sesame oil',
        '1 Tbsp sriracha',
        '1 Tbsp chili garlic paste',
        '2 Tbsp honey (or more, to taste)',
        '900 g (2 lb) chicken breast, boneless, skinless',
        'Salt & pepper to taste',
        '2 Tbsp olive oil (divided)',
        '900 g (2 lb) green beans, trimmed',
        '2 tsp cornstarch + 1 Tbsp warm water',
        'Sesame seeds (optional)',
        'Roasted peanuts (optional)'
      ],
      instructions: [
        'Make the sauce: Mix garlic, soy sauce, sesame oil, sriracha, chili garlic paste, and honey. Set aside.',
        'Prepare cornstarch slurry by mixing cornstarch with warm water.',
        'Cut chicken into bite-size pieces and season with salt and pepper.',
        'Heat 1 Tbsp olive oil in a large skillet over medium-high heat.',
        'Add chicken and cook for 3-4 minutes until golden. Remove and set aside.',
        'Add remaining 1 Tbsp olive oil to the same skillet.',
        'Sauté green beans for 3-4 minutes until tender-crisp.',
        'Return chicken to skillet with green beans.',
        'Cover and steam for 2-3 minutes (add 1-2 Tbsp water if needed).',
        'Push chicken and beans to one side, pour sauce into the skillet.',
        'Bring sauce to a simmer, then stir in cornstarch slurry until thickened.',
        'Mix everything together until well coated.',
        'Garnish with sesame seeds or roasted peanuts if desired.'
      ],
      tags: ['high-protein', 'spicy', 'asian', 'gluten-free-option']
    },
    {
      id: 29,
      title: 'Oven-Baked Potato Wedges',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800',
      category: 'snacks',
      difficulty: 'easy',
      prepTime: 10,
      cookTime: 30,
      servings: 4,
      calories: 225,
      protein: 4,
      carbs: 40,
      fat: 7,
      description: 'Crispy and flavorful potato wedges baked to perfection with aromatic herbs and spices.',
      ingredients: [
        '700 g (1.5 lb) russet potatoes',
        '2 Tbsp olive oil',
        '2 ½ Tbsp paprika-pepper-oregano seasoning mix',
        '1 ½ Tbsp dried thyme',
        '1 Tbsp dried rosemary',
        'Salt to taste'
      ],
      instructions: [
        'Preheat oven to 200°C (400°F).',
        'Cut potatoes into wedges approximately 2-3 cm thick.',
        'Toss potato wedges with olive oil until evenly coated.',
        'Add paprika-pepper-oregano seasoning, thyme, rosemary, and salt.',
        'Toss again to distribute seasonings evenly.',
        'Arrange wedges on 2 baking sheets without crowding.',
        'Bake for 30 minutes, flipping every 10 minutes.',
        'Cook until golden and crispy on the outside.',
        'Serve immediately while hot.'
      ],
      tags: ['baked', 'comfort-food', 'herbs', 'crispy']
    },
    {
      id: 30,
      title: 'Spanish Zucchini & Tomato Casserole',
      image: 'https://naileditrecipes.co/wp-content/uploads/2025/08/Cheesy20Zucchini20Tomato20Bake_feat_b64.jpeg',
      category: 'dinner',
      difficulty: 'easy',
      prepTime: 15,
      cookTime: 25,
      servings: 4,
      calories: 210,
      protein: 12,
      carbs: 9,
      fat: 14,
      description: 'A delicious Spanish-style casserole with layers of zucchini, tomatoes, serrano ham, and cheese, baked to perfection.',
      ingredients: [
        '2 zucchini',
        '4 tomatoes',
        '1 onion',
        '100 g serrano ham, sliced',
        '100 g shredded cheese',
        '2 eggs',
        '200 ml light cooking cream',
        'Salt & black pepper to taste',
        'Extra virgin olive oil'
      ],
      instructions: [
        'Preheat oven to 200°C (400°F). Grease a baking dish with olive oil.',
        'Slice zucchini and tomatoes thinly; slice onion into rings.',
        'Beat eggs with cream, salt, and pepper.',
        'Layer zucchini → tomato → onion → half the cheese → half the ham. Repeat.',
        'Pour egg-cream mixture over the top.',
        'Bake 25 minutes until set and golden. Serve warm.'
      ],
      tags: ['spanish', 'layered', 'cheesy', 'vegetables']
    },
    {
      id: 31,
      title: 'Italian Marinated Chicken',
      image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800',
      category: 'dinner',
      difficulty: 'easy',
      prepTime: 10,
      cookTime: 25,
      servings: 4,
      calories: 230,
      protein: 30,
      carbs: 2,
      fat: 11,
      description: 'Tender chicken breast marinated in Italian herbs and spices, then baked to perfection.',
      ingredients: [
        '1 lb (450 g) boneless, skinless chicken breast',
        '¼ cup olive oil',
        '1 Tbsp lemon juice',
        '1 Tbsp apple cider vinegar',
        '1 Tbsp water',
        '1 tsp Italian seasoning',
        '1 tsp red pepper flakes',
        '1 garlic clove, minced',
        '2 Tbsp fresh parsley, chopped',
        '1 Tbsp fresh basil, chopped'
      ],
      instructions: [
        'Mix marinade ingredients in a bowl.',
        'Add chicken and marinate for 30 minutes to 4 hours.',
        'Preheat oven to 375°F (190°C).',
        'Transfer chicken and marinade to a baking dish.',
        'Bake for 20-25 minutes until internal temperature reaches 160-165°F.',
        'Rest for 10 minutes before serving.'
      ],
      tags: ['italian', 'marinated', 'high-protein', 'herbs']
    },
    {
      id: 32,
      title: 'Potato Purée au Gratin',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800',
      category: 'dinner',
      difficulty: 'easy',
      prepTime: 15,
      cookTime: 35,
      servings: 4,
      calories: 210,
      protein: 5,
      carbs: 28,
      fat: 9,
      description: 'Creamy mashed potatoes topped with cheese and baked until golden and bubbly.',
      ingredients: [
        '800 g potatoes (about 5 medium)',
        '50 g butter',
        '100 ml milk (or cream)',
        '50 g shredded cheese',
        'Salt & pepper to taste'
      ],
      instructions: [
        'Boil potatoes until tender, about 15-20 minutes.',
        'Drain and mash potatoes with butter, milk, salt, and pepper.',
        'Transfer mashed potatoes to a baking dish.',
        'Sprinkle shredded cheese on top.',
        'Bake at 200°C (400°F) for 15-20 minutes until golden.',
        'Serve hot.'
      ],
      tags: ['comfort-food', 'cheesy', 'creamy', 'baked']
    },
    {
      id: 33,
      title: 'Potatoes with Beef Tenderloin, Chimichurri & Fresh Salad',
      image: 'https://i.pinimg.com/736x/2c/90/ee/2c90ee4e75331b83f2146678597b7122.jpg',
      category: 'dinner',
      difficulty: 'medium',
      prepTime: 20,
      cookTime: 25,
      servings: 4,
      calories: 523,
      protein: 27,
      carbs: 35,
      fat: 30,
      description: 'A complete and flavorful meal featuring sautéed baby potatoes, tender beef strips, fresh chimichurri sauce, and a crisp salad.',
      ingredients: [
        '640 g baby potatoes (papas criollas)',
        '¾ tbsp fresh rosemary, chopped',
        '1½ lemons (juice + zest)',
        '1½ tbsp olive oil',
        'Salt & pepper to taste',
        '480 g beef tenderloin, cut into strips',
        '2 garlic cloves',
        '¾ tbsp soy sauce',
        '¾ cup fresh parsley',
        '2 garlic cloves',
        '⅓ cup olive oil',
        '1½ tbsp red wine vinegar',
        '¾ tsp dried oregano',
        '¼ tsp chili flakes (optional)',
        '2 medium tomatoes, diced',
        '¾ cucumber, sliced',
        '¾ head lettuce (romaine or curly)',
        'Juice of ¾ lemon',
        'Olive oil & salt to taste'
      ],
      instructions: [
        'For potatoes: Boil potatoes in salted water until tender, about 15-20 minutes.',
        'Drain potatoes and sauté with olive oil, rosemary, and lemon zest until golden.',
        'For beef: Season beef strips with salt and pepper.',
        'Sear beef strips with garlic and soy sauce in a hot pan until browned but juicy, about 3-4 minutes per side.',
        'For chimichurri: Blend or finely chop parsley, garlic, olive oil, vinegar, oregano, and chili flakes.',
        'Season chimichurri with salt to taste.',
        'For salad: Mix tomatoes, cucumber, and lettuce with lemon juice, olive oil, and salt just before serving.',
        'Plate the potatoes, salad, and beef. Top the meat with chimichurri sauce.',
        'Serve immediately while hot.'
      ],
      tags: ['high-protein', 'complete-meal', 'chimichurri', 'fresh']
    },
    {
      id: 34,
      title: 'Costillas BBQ Carnudas en Instant Pot',
      image: 'https://i.pinimg.com/1200x/e7/05/76/e70576d6255a966151423b476066a5b2.jpg',
      category: 'dinner',
      difficulty: 'medium',
      prepTime: 20,
      cookTime: 45,
      servings: 8,
      calories: 420,
      protein: 35,
      carbs: 15,
      fat: 25,
      description: 'Tender and juicy BBQ ribs cooked in the Instant Pot, then finished in the oven for that perfect caramelized glaze.',
      ingredients: [
        '2.5-3 kg pork ribs (baby back or loin ribs)',
        'Salt and pepper to taste',
        '2 tbsp garlic powder',
        '1 tbsp paprika (sweet or spicy)',
        '½ tbsp cumin',
        '1 cup beef broth or water',
        '1 tbsp apple cider vinegar (optional)',
        '2 cups BBQ sauce (store-bought or homemade)',
        'Cooking oil for searing'
      ],
      instructions: [
        'Remove the membrane from the back of the ribs. Cut ribs into sections of 3-4 bones.',
        'Mix salt, pepper, garlic powder, paprika, and cumin. Rub the spice mixture all over the ribs.',
        'Optional: Use "Sauté" mode to lightly brown the ribs on both sides with a little oil for enhanced flavor.',
        'Add beef broth and vinegar to the Instant Pot.',
        'Place ribs in a fan shape or stacked on the metal rack.',
        'Close the lid with valve in "Sealing" position.',
        'Cook on "Pressure Cook" or "Manual" for 25 minutes at high pressure.',
        'Allow natural pressure release for 10 minutes, then release remaining pressure.',
        'Optional but recommended: Place ribs on a baking sheet, brush with BBQ sauce, and bake at 200°C for 10-15 minutes until caramelized.',
        'Alternative: Use air fryer at 200°C for 5-7 minutes.',
        'Serve hot with additional BBQ sauce on the side.'
      ],
      tags: ['bbq', 'instant-pot', 'high-protein', 'comfort-food']
    },
    {
      id: 35,
      title: 'Tropical Cabbage Salad',
      image: 'https://3ingredientsorless.com/wp-content/uploads/2025/07/pakoblog_No-Mayo_Hawaiian_Pineapple_Coleslaw_Recipe_front_angle_f6256d45-be20-4b97-ab29-41294877d2a5.webp',
      category: 'lunch',
      difficulty: 'easy',
      prepTime: 15,
      cookTime: 0,
      servings: 4,
      calories: 207,
      protein: 3,
      carbs: 18,
      fat: 15,
      description: 'A vibrant and refreshing tropical salad with purple cabbage, pineapple, avocado, and arugula - perfect for a healthy lunch.',
      ingredients: [
        '4 cups purple cabbage, finely shredded (~280 g)',
        '4 cups arugula or spinach (~120 g)',
        '2 cups pineapple, cubed (~330 g)',
        '2 medium avocados, cubed (~300 g flesh)',
        '1 medium red onion, thinly sliced (~120 g)',
        'Juice of 1 lime or lemon (optional, for freshness)',
        'Pinch of salt'
      ],
      instructions: [
        'Place the shredded cabbage in a large bowl.',
        'Add arugula (or spinach), pineapple cubes, avocado, and onion.',
        'Gently toss everything together.',
        'Season with lime juice and a pinch of salt before serving.',
        'Serve immediately for best freshness.'
      ],
      tags: ['tropical', 'fresh', 'colorful', 'no-cook']
    },
    {
      id: 36,
      title: 'Smashed Garlic-Parmesan Potatoes',
      image: 'https://recipebysally.com/cdn-cgi/image/fit=contain,width=1024,format=auto/assets/images/1754233682584-v7ymglhs.jpg',
      category: 'dinner',
      difficulty: 'easy',
      prepTime: 15,
      cookTime: 30,
      servings: 4,
      calories: 440,
      protein: 8,
      carbs: 32,
      fat: 32,
      description: 'Crispy smashed baby potatoes with garlic, Parmesan cheese, and a creamy sour cream dipping sauce.',
      ingredients: [
        '1.5 lbs baby potatoes',
        '2 tbsp avocado or neutral oil',
        '3 tbsp butter, softened',
        '1 tsp garlic salt',
        '3 garlic cloves, pressed',
        '1/3 cup Parmesan cheese, freshly grated',
        'Freshly chopped parsley for garnish',
        'Freshly grated Parmesan cheese for garnish',
        '3/4 cup sour cream',
        '1/4 cup heavy cream',
        '1-2 tbsp pickle juice (or lemon juice)',
        '1 scallion, chopped',
        '1 tbsp fresh parsley, chopped',
        '1 tbsp fresh dill, chopped (or 1 tsp dry dill)',
        '1/2 tsp salt',
        '1/4 tsp black pepper'
      ],
      instructions: [
        'Preheat oven to 425°F (220°C).',
        'Boil baby potatoes in salted water until tender, about 15-20 minutes.',
        'Drain potatoes and let cool slightly.',
        'Place potatoes on a baking sheet and gently smash each one with the bottom of a glass or fork.',
        'Drizzle with oil and season with garlic salt.',
        'Bake for 20-25 minutes until crispy and golden.',
        'While potatoes bake, make the dipping sauce: mix sour cream, heavy cream, pickle juice, scallion, parsley, dill, salt, and pepper.',
        'Remove potatoes from oven and brush with softened butter mixed with pressed garlic.',
        'Sprinkle with Parmesan cheese and return to oven for 2-3 minutes until cheese melts.',
        'Garnish with fresh parsley and additional Parmesan cheese.',
        'Serve hot with sour cream dipping sauce.'
      ],
      tags: ['comfort-food', 'cheesy', 'garlic', 'crispy']
    },
    {
      id: 37,
      title: 'Spicy Chicken Curry with Jasmine Rice & Naan',
      image: 'https://gridrecipes.com/wp-content/uploads/2025/06/0_2-2025-06-13T030606.152.png',
      category: 'dinner',
      difficulty: 'medium',
      prepTime: 20,
      cookTime: 45,
      servings: 4,
      calories: 781,
      protein: 49,
      carbs: 45,
      fat: 21,
      description: 'Aromatic and spicy chicken curry with fragrant jasmine rice and homemade naan bread - a complete Indian feast.',
      ingredients: [
        '800 g (1.75 lb) chicken breast or thighs, skinless, cubed',
        '1 large onion, chopped',
        '2 cloves garlic, minced',
        '1 tbsp fresh ginger, grated',
        '2 tbsp curry powder',
        '½ tbsp extra cumin',
        '½ tsp cinnamon (optional)',
        'Pinch of ground cloves or nutmeg (optional)',
        '1 tbsp turmeric',
        '½ tbsp red chili flakes or cayenne (adjust to taste)',
        '400 ml (1 can) coconut milk',
        '2 medium tomatoes, grated (or ½ cup tomato purée)',
        '1 tbsp coconut or olive oil',
        'Salt to taste',
        'Fresh cilantro for garnish',
        'Juice of ½ lemon (optional)',
        '⅓ cup jasmine rice (about 60 g, uncooked)',
        '1 cup plain unsweetened yogurt',
        '1 cup wheat flour (about 125 g)',
        '½ tsp salt',
        '½ tsp baking powder',
        'Garlic and cilantro for brushing (optional)',
        'Melted ghee or butter for brushing'
      ],
      instructions: [
        'For the curry: In a large pot, heat the oil and sauté the onion until golden.',
        'Add garlic, ginger, and all the spices. Cook for 1 minute until fragrant.',
        'Add the chicken in batches if needed and sear on all sides.',
        'Stir in tomatoes and cook for 10 minutes.',
        'Pour in the coconut milk, season with salt, and simmer 30 minutes on medium heat until thickened.',
        'Garnish with fresh cilantro and lemon juice before serving.',
        'For the rice: Rinse the rice well.',
        'Cook with water and a pinch of salt. Cover and simmer gently for 15 minutes.',
        'Turn off heat and let it rest, covered, for 5 minutes.',
        'For the naan: Mix yogurt, flour, salt, and baking powder until a soft dough forms.',
        'Divide into 4 balls, roll out each one, and cook in a hot skillet for 2–3 minutes per side.',
        'Brush with ghee and, if desired, garlic and cilantro.',
        'Serve the curry over jasmine rice with warm naan bread.'
      ],
      tags: ['spicy', 'indian', 'curry', 'aromatic', 'complete-meal']
    },
    {
      id: 38,
      title: 'Chicken Gyro with Homemade Naan, Cucumber-Tomato-Mint Salad & Tzatziki',
      image: 'https://evarecipe.com/wp-content/uploads/2025/04/0425175136.webp',
      category: 'dinner',
      difficulty: 'medium',
      prepTime: 30,
      cookTime: 20,
      servings: 4,
      calories: 543,
      protein: 56,
      carbs: 34,
      fat: 16,
      description: 'Authentic Greek-style chicken gyro with homemade naan bread, fresh cucumber-tomato-mint salad, and creamy tzatziki sauce.',
      ingredients: [
        '480 g (1 lb) chicken breast, cut into thick strips',
        '¼ cup plain Greek yogurt',
        '1 tbsp olive oil',
        '½ tbsp garlic powder',
        '½ tsp cumin',
        '½ tsp smoked paprika',
        '¼ tsp cayenne (optional, adjust to taste)',
        'Juice of ½ large lemon',
        'Salt & pepper to taste',
        '120 g (about 1 cup) wheat flour',
        '⅓ cup plain Greek yogurt',
        '¼ tsp baking powder',
        '⅛ tsp salt',
        '2 tsp olive oil',
        '1 cucumber, diced',
        '1½ tomatoes, diced',
        '¼ red onion, thinly sliced',
        '¼ cup fresh mint, chopped',
        '1 tbsp olive oil',
        '2 tsp lemon juice',
        '¾ cup plain Greek yogurt',
        '½ large cucumber, grated and drained',
        '¾ clove garlic, minced',
        '2 tsp lemon juice',
        '½ tbsp olive oil',
        '½ tbsp dill (optional)',
        '¼ tsp salt'
      ],
      instructions: [
        'For the chicken gyro marinade: Mix all ingredients in a large bowl.',
        'Marinate chicken in the fridge for at least 2 hours (best 4–6 hours).',
        'Cook chicken in a hot skillet or grill pan with a little oil over medium-high heat until golden and fully cooked.',
        'For the naan: Mix all ingredients and knead until smooth.',
        'Divide into 4 balls, roll out each, and cook on a hot skillet (no oil) 1–2 minutes per side until bubbly and golden.',
        'Optional: brush with garlic + olive oil + parsley.',
        'For the salad: Mix all ingredients in a bowl. Chill 15–20 minutes before serving.',
        'For the tzatziki: Drain cucumber well. Mix with the rest of the ingredients and refrigerate 30–60 minutes before serving.',
        'Assemble gyros by placing chicken on naan, topping with salad and tzatziki sauce.',
        'Serve immediately while warm.'
      ],
      tags: ['greek', 'mediterranean', 'fresh', 'homemade', 'complete-meal']
    }
  ]

  useEffect(() => {
    if (id) {
      const foundRecipe = recipes.find(r => r.id === parseInt(id))
      setRecipe(foundRecipe)
    }
  }, [id])

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

  if (!recipe) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="text-center">
          <Title level={2}>Recipe not found</Title>
          <Link to="/recipes">
            <Button type="primary" icon={<FontAwesomeIcon icon={faArrowLeft} />}>
              Back to Recipes
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{recipe.title} - Isabel Diez Nutrition</title>
        <meta name="description" content={recipe.description} />
        <meta property="og:title" content={`${recipe.title} - Isabel Diez Nutrition`} />
        <meta property="og:description" content={recipe.description} />
        <meta property="og:image" content={recipe.image} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94],
            staggerChildren: 0.1
          }}
        >
          {/* Breadcrumb Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Breadcrumb className="mb-6 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-emerald-100/50">
            <Breadcrumb.Item>
              <Link to="/">
                <FontAwesomeIcon icon={faHome} className="mr-1" />
                Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/recipes">
                <FontAwesomeIcon icon={faUtensils} className="mr-1" />
                Recipes
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{recipe.title}</Breadcrumb.Item>
          </Breadcrumb>
          </motion.div>

          {/* Back Button */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/recipes">
              <Button 
                type="default" 
                icon={<FontAwesomeIcon icon={faArrowLeft} />}
                className="rounded-full bg-white/70 backdrop-blur-sm border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-md"
                size="large"
              >
                Back to All Recipes
              </Button>
            </Link>
          </motion.div>

          {/* Recipe Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Card className="mb-8 border-0 shadow-2xl rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm">
            <Row gutter={[32, 32]}>
              <Col xs={24} lg={12}>
                <div className="relative overflow-hidden rounded-2xl group">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-80 object-cover object-[center_60%] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="flex gap-2">
                      <Tag className="rounded-full font-semibold px-3 py-1 text-sm backdrop-blur-sm bg-white/90" style={{ color: getCategoryColor(recipe.category), border: `1px solid ${getCategoryColor(recipe.category)}20` }}>
                        {recipe.category}
                      </Tag>
                      <Tag className="rounded-full font-semibold px-3 py-1 text-sm backdrop-blur-sm bg-white/90" style={{ color: getDifficultyColor(recipe.difficulty), border: `1px solid ${getDifficultyColor(recipe.difficulty)}20` }}>
                        {recipe.difficulty}
                      </Tag>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={24} lg={12}>
                <div className="h-full flex flex-col justify-center p-4">
                  
                  <Title level={1} className="mb-4 text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
                    {recipe.title}
                  </Title>
                  
                  <Paragraph className="text-lg text-gray-700 leading-relaxed mb-6 font-medium">
                    {recipe.description}
                  </Paragraph>

                  {/* Recipe Stats */}
                  <Row gutter={[12, 12]}>
                    <Col span={8}>
                      <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl border border-emerald-200/50 hover:shadow-lg transition-all duration-300">
                        <div className="w-12 h-12 mx-auto mb-2 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                          <FontAwesomeIcon icon={faClock} className="text-white text-lg" />
                        </div>
                        <Text strong className="text-lg block" style={{ color: '#065f46' }}>{recipe.prepTime + recipe.cookTime} min</Text>
                        <Text className="text-emerald-600 text-sm font-medium">Total Time</Text>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200/50 hover:shadow-lg transition-all duration-300">
                        <div className="w-12 h-12 mx-auto mb-2 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                          <FontAwesomeIcon icon={faUser} className="text-white text-lg" />
                        </div>
                        <Text strong className="text-lg block" style={{ color: '#1e40af' }}>{recipe.servings}</Text>
                        <Text className="text-blue-600 text-sm font-medium">Servings</Text>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200/50 hover:shadow-lg transition-all duration-300">
                        <div className="w-12 h-12 mx-auto mb-2 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                          <FontAwesomeIcon icon={faFire} className="text-white text-lg" />
                        </div>
                        <Text strong className="text-lg block" style={{ color: '#c2410c' }}>{recipe.calories}</Text>
                        <Text className="text-orange-600 text-sm font-medium">Calories</Text>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Card>
          </motion.div>

          {/* Recipe Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Row gutter={[24, 24]}>
            {/* Ingredients */}
            <Col xs={24} lg={12}>
              <Card className="h-full shadow-xl rounded-2xl border-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 backdrop-blur-sm">
                <Title level={3} className="mb-6 text-2xl font-bold flex items-center" style={{ color: '#065f46' }}>
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                    <FontAwesomeIcon icon={faLeaf} className="text-white text-sm" />
                  </div>
                  Ingredients
                </Title>
                <List
                  dataSource={recipe.ingredients}
                  renderItem={(item: string, index: number) => (
                    <List.Item className="border-0 px-0 py-3 hover:bg-white/50 rounded-lg transition-all duration-200">
                      <div className="flex items-start w-full px-2">
                        <div 
                          className="w-7 h-7 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0 mt-1 shadow-md" 
                          style={{ backgroundColor: '#10b981' }}
                        >
                          {index + 1}
                        </div>
                        <Text className="text-gray-700 font-medium leading-relaxed">{item}</Text>
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>

            {/* Instructions */}
            <Col xs={24} lg={12}>
              <Card className="h-full shadow-xl rounded-2xl border-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 backdrop-blur-sm">
                <Title level={3} className="mb-6 text-2xl font-bold flex items-center" style={{ color: '#1e40af' }}>
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                    <FontAwesomeIcon icon={faUtensils} className="text-white text-sm" />
                  </div>
                  Instructions
                </Title>
                <List
                  dataSource={recipe.instructions}
                  renderItem={(item: string, index: number) => (
                    <List.Item className="border-0 px-0 py-4 hover:bg-white/50 rounded-lg transition-all duration-200">
                      <div className="flex items-start w-full px-2">
                        <div 
                          className="w-8 h-8 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0 mt-1 shadow-md" 
                          style={{ backgroundColor: '#3B82F6' }}
                        >
                          {index + 1}
                        </div>
                        <Text className="text-gray-700 leading-relaxed font-medium">{item}</Text>
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
          </motion.div>

          {/* Nutrition Facts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Card className="mt-8 shadow-xl rounded-2xl border-0 bg-gradient-to-br from-orange-50/50 to-amber-50/50 backdrop-blur-sm">
            <Title level={3} className="mb-6 text-2xl font-bold flex items-center" style={{ color: '#c2410c' }}>
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                <FontAwesomeIcon icon={faChartBar} className="text-white text-sm" />
              </div>
              Nutrition Facts (per serving)
            </Title>
            <Row gutter={[16, 16]}>
              <Col xs={12} sm={6}>
                <div className="text-center p-5 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 border border-red-200/50 hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 mx-auto mb-2 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <FontAwesomeIcon icon={faFire} className="text-white text-sm" />
                  </div>
                  <Text strong className="text-xl block" style={{ color: '#dc2626' }}>{recipe.calories}</Text>
                  <Text className="text-red-600 text-sm font-medium">Calories</Text>
                </div>
              </Col>
              <Col xs={12} sm={6}>
                <div className="text-center p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200/50 hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 mx-auto mb-2 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <FontAwesomeIcon icon={faDumbbell} className="text-white text-sm" />
                  </div>
                  <Text strong className="text-xl block" style={{ color: '#7c3aed' }}>{recipe.protein}g</Text>
                  <Text className="text-purple-600 text-sm font-medium">Protein</Text>
                </div>
              </Col>
              <Col xs={12} sm={6}>
                <div className="text-center p-5 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200/50 hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#d97706' }}>
                    <FontAwesomeIcon icon={faBoltLightning} className="text-white text-lg" style={{ color: '#ffffff' }} />
                  </div>
                  <Text strong className="text-xl block" style={{ color: '#d97706' }}>{recipe.carbs}g</Text>
                  <Text className="text-yellow-600 text-sm font-medium">Carbs</Text>
                </div>
              </Col>
              <Col xs={12} sm={6}>
                <div className="text-center p-5 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200/50 hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 mx-auto mb-2 bg-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <FontAwesomeIcon icon={faDroplet} className="text-white text-sm" />
                  </div>
                  <Text strong className="text-xl block" style={{ color: '#ec4899' }}>{recipe.fat}g</Text>
                  <Text className="text-pink-600 text-sm font-medium">Fat</Text>
                </div>
              </Col>
            </Row>
          </Card>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Card className="mt-8 shadow-xl rounded-2xl border-0 bg-gradient-to-br from-emerald-50/50 to-green-50/50 backdrop-blur-sm">
            <Title level={4} className="mb-6 text-xl font-bold flex items-center" style={{ color: '#065f46' }}>
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                <FontAwesomeIcon icon={faTag} className="text-white text-sm" />
              </div>
              Recipe Tags
            </Title>
            <Space wrap size={[12, 12]}>
              {recipe.tags.map((tag: string) => (
                <Tag 
                  key={tag} 
                  className="rounded-full px-6 py-2 text-sm font-semibold border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105" 
                  style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}
                >
                  {tag}
                </Tag>
              ))}
            </Space>
          </Card>
          </motion.div>
        </motion.div>
        </div>
      </div>
    </>
  )
}

export default RecipeDetail
