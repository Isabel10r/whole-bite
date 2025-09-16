/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Summertime 3 Color Palette
        golden: '#ffbe4f',      // Warm golden yellow
        lightTeal: '#6bd2db',   // Light turquoise
        mediumTeal: '#0ea7b5',  // Medium teal
        navy: '#0c457d',        // Deep navy blue
        orange: '#e8702a',      // Vibrant orange
        
        // Brand Colors (updated with new palette)
        coral: '#e8702a',       // Using vibrant orange
        teal: '#0ea7b5',        // Using medium teal
        yellow: '#ffbe4f',      // Using golden yellow
        dark: '#0c457d',        // Using navy blue
        light: '#F7F7F7',
        
        // Legacy colors for compatibility
        primary: {
          DEFAULT: '#0ea7b5',   // Medium teal
          hover: '#0c457d',     // Navy blue
        },
        secondary: '#e8702a',   // Vibrant orange
        success: '#0ea7b5',     // Medium teal
        warning: '#ffbe4f',     // Golden yellow
        error: '#e8702a',       // Vibrant orange
        text: {
          DEFAULT: '#0c457d',   // Navy blue
          secondary: '#8c8c8c',
        },
        border: '#d9d9d9',
        background: {
          DEFAULT: '#ffffff',
          light: '#F7F7F7',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
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
