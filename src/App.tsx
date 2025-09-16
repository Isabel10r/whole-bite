import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import NutritionCalculator from './pages/NutritionCalculator'
import BMRCalculator from './pages/BMRCalculator'
import Recipes from './pages/Recipes'
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
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Home />
                </motion.div>
              } />
              <Route path="/calculator" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <NutritionCalculator />
                </motion.div>
              } />
              <Route path="/calculator/bmr" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <BMRCalculator />
                </motion.div>
              } />
              <Route path="/recipes" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Recipes />
                </motion.div>
              } />
              <Route path="/about" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <About />
                </motion.div>
              } />
            </Routes>
          </AnimatePresence>
        </Content>
        <Footer />
      </Layout>
    </>
  )
}

export default App