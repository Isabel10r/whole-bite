import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import { Helmet } from 'react-helmet-async'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
// import NutritionCalculator from './pages/NutritionCalculator'
import BMRCalculator from './pages/BMRCalculator'
import WaterCalculator from './pages/WaterCalculator'
import Recipes from './pages/Recipes'
import RecipeDetail from './pages/RecipeDetail'
import About from './pages/About'
import './App.css'

const { Content } = Layout

function App() {
  return (
    <>
      <Helmet>
        <title>Isabel Diez - Expert Nutritionist for Mothers & Babies</title>
        <meta name="description" content="Expert nutrition guidance for mothers and babies. Specialized in prenatal nutrition, postnatal recovery, and baby weaning. Book your consultation today." />
        <meta name="keywords" content="nutritionist, maternal nutrition, baby nutrition, prenatal nutrition, postnatal recovery, baby weaning, family nutrition" />
        <meta property="og:title" content="Isabel Diez - Expert Nutritionist for Mothers & Babies" />
        <meta property="og:description" content="Expert nutrition guidance for mothers and babies. Specialized in prenatal nutrition, postnatal recovery, and baby weaning." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Isabel Diez - Expert Nutritionist for Mothers & Babies" />
        <meta name="twitter:description" content="Expert nutrition guidance for mothers and babies. Specialized in prenatal nutrition, postnatal recovery, and baby weaning." />
      </Helmet>
      
      <Layout className="min-h-screen">
        <Header />
        <Content className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/calculator" element={<NutritionCalculator />} /> */}
            <Route path="/calculator/bmr" element={<BMRCalculator />} />
            <Route path="/calculator/water" element={<WaterCalculator />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Content>
        <Footer />
      </Layout>
    </>
  )
}

export default App