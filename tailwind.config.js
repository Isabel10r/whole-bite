/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sport Urban Nutrition Color Palette from colorswall.com/palette/136698
        nutrition: {
          primary: '#10b981',     // Light medium aquamarine - primary accent
          secondary: '#90cbb9',   // Lighter aquamarine - secondary accent  
          dark: '#24604c',        // Dark teal - accent color
          neutral: '#7c8784',     // Grey shade
          light: '#b2d4c7',       // Light powder blue tint
          charcoal: '#373837',    // Dark charcoal
        },
        
        // Brand Colors (updated with nutrition palette)
        coral: '#10b981',       // Using primary nutrition color
        teal: '#24604c',        // Using dark nutrition color
        yellow: '#90cbb9',      // Using secondary nutrition color
        dark: '#373837',        // Using charcoal
        light: '#F7F7F7',       // Keep light background
        
        // Legacy colors for compatibility
        primary: {
          DEFAULT: '#10b981',   // Primary nutrition color
          hover: '#24604c',     // Dark nutrition color
        },
        secondary: '#90cbb9',   // Secondary nutrition color
        success: '#10b981',     // Primary nutrition color
        warning: '#7c8784',     // Neutral grey
        error: '#24604c',       // Dark nutrition color for emphasis
        text: {
          DEFAULT: '#373837',   // Dark charcoal
          secondary: '#7c8784', // Grey for secondary text
        },
        border: '#b2d4c7',      // Light nutrition color for borders
        background: {
          DEFAULT: '#ffffff',   // Keep white background
          light: '#F7F7F7',     // Light grey background
        },
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        light: '0 2px 8px rgba(0, 0, 0, 0.06)',
        medium: '0 4px 16px rgba(0, 0, 0, 0.12)',
        heavy: '0 8px 32px rgba(0, 0, 0, 0.16)',
      },
      borderRadius: {
        DEFAULT: '8px',
        large: '12px',
      },
      transitionTimingFunction: {
        'cubic-bezier': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
