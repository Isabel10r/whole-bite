import { Helmet } from "react-helmet-async";

interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions: string[];
  category: string;
  difficulty: string;
  tags: string[];
}

interface StructuredDataProps {
  type: "website" | "recipe" | "organization";
  recipe?: Recipe;
}

export const StructuredData: React.FC<StructuredDataProps> = ({
  type,
  recipe,
}) => {
  const getStructuredData = () => {
    switch (type) {
      case "website":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Whole Bite - Expert Nutrition",
          url: "https://www.whole-bite.com",
          description:
            "Expert nutrition guidance for a healthier lifestyle. Personalized nutrition plans, healthy recipes, and sustainable habits.",
          potentialAction: {
            "@type": "SearchAction",
            target:
              "https://www.whole-bite.com/recipes?search={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        };

      case "organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Whole Bite",
          url: "https://www.whole-bite.com",
          logo: "https://www.whole-bite.com/images/isabel-diez-portrait.jpg",
          description: "Professional nutrition services and healthy recipes",
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "Customer Service",
            availableLanguage: ["English", "Spanish"],
          },
          sameAs: [
            "https://www.instagram.com/wholebite",
            "https://www.facebook.com/wholebite",
          ],
        };

      case "recipe":
        if (!recipe) return null;

        // Convert minutes to ISO 8601 duration format
        const prepTimeISO = `PT${recipe.prepTime}M`;
        const cookTimeISO = `PT${recipe.cookTime}M`;
        const totalTimeISO = `PT${recipe.prepTime + recipe.cookTime}M`;

        return {
          "@context": "https://schema.org",
          "@type": "Recipe",
          name: recipe.title,
          description: recipe.description,
          image: recipe.image.startsWith("http")
            ? recipe.image
            : `https://www.whole-bite.com${recipe.image}`,
          author: {
            "@type": "Person",
            name: "Isabel Diez",
          },
          datePublished: "2025-01-01",
          prepTime: prepTimeISO,
          cookTime: cookTimeISO,
          totalTime: totalTimeISO,
          recipeYield: `${recipe.servings} servings`,
          recipeCategory: recipe.category,
          recipeCuisine: recipe.tags.includes("italian")
            ? "Italian"
            : recipe.tags.includes("mexican")
            ? "Mexican"
            : recipe.tags.includes("greek")
            ? "Greek"
            : recipe.tags.includes("persian")
            ? "Persian"
            : recipe.tags.includes("asian")
            ? "Asian"
            : recipe.tags.includes("spanish")
            ? "Spanish"
            : "International",
          keywords: recipe.tags.join(", "),
          nutrition: {
            "@type": "NutritionInformation",
            calories: `${recipe.calories} calories`,
            proteinContent: `${recipe.protein}g`,
            carbohydrateContent: `${recipe.carbs}g`,
            fatContent: `${recipe.fat}g`,
            servingSize: `${recipe.servings} serving${
              recipe.servings > 1 ? "s" : ""
            }`,
          },
          recipeIngredient: recipe.ingredients,
          recipeInstructions: recipe.instructions.map((instruction, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            text: instruction,
          })),
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            reviewCount: "127",
          },
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
