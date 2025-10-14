import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { Helmet } from "react-helmet-async";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import StructuredData from "./components/StructuredData";
import Home from "./pages/Home";
// import NutritionCalculator from './pages/NutritionCalculator'
import BMRCalculator from "./pages/BMRCalculator";
import WaterCalculator from "./pages/WaterCalculator";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import About from "./pages/About";
import "./App.css";
import "./i18n";

const { Content } = Layout;

function App() {
  return (
    <>
      <Helmet>
        <title>
          Whole Bite - Expert Nutrition | Healthy Recipes & Nutrition Guidance
        </title>
        <meta
          name="description"
          content="Expert nutrition guidance for a healthier lifestyle. Personalized nutrition plans, healthy recipes, and sustainable habits. Book your consultation today."
        />
        <meta
          name="keywords"
          content="nutritionist, nutrition, healthy eating, meal plans, recipes, wellness, lifestyle, health, BMR calculator, water calculator, diet plans, healthy recipes"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Whole Bite - Expert Nutrition" />
        <meta
          property="og:description"
          content="Expert nutrition guidance for a healthier lifestyle. Personalized nutrition plans, healthy recipes, and sustainable habits."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.whole-bite.com" />
        <meta
          property="og:image"
          content="https://www.whole-bite.com/images/isabel-diez-portrait.jpg"
        />
        <meta property="og:site_name" content="Whole Bite" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Whole Bite - Expert Nutrition" />
        <meta
          name="twitter:description"
          content="Expert nutrition guidance for a healthier lifestyle. Personalized nutrition plans, healthy recipes, and sustainable habits."
        />
        <meta
          name="twitter:image"
          content="https://www.whole-bite.com/images/isabel-diez-portrait.jpg"
        />

        {/* Additional SEO */}
        <meta name="author" content="Isabel Diez" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.whole-bite.com" />
      </Helmet>

      {/* Structured Data for Website and Organization */}
      <StructuredData type="website" />
      <StructuredData type="organization" />

      <Layout className="min-h-screen">
        <ScrollToTop />
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
  );
}

export default App;
