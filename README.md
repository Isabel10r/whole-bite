# NutriGuide - Your Complete Nutrition Companion

A modern, responsive React application built with Vite, Ant Design, and comprehensive nutrition tracking features.

## 🌟 Features

### 🏠 Home Page
- Beautiful hero section with animated statistics
- Feature showcase with smooth animations
- User testimonials carousel
- Call-to-action sections

### 🧮 Nutrition Calculator
- Interactive food search and selection
- Real-time nutrition calculation
- Macronutrient tracking with visual charts
- Daily goal progress indicators
- Comprehensive food database

### 📚 Recipe Collection
- Curated healthy recipes with detailed nutrition info
- Advanced filtering by category and difficulty
- Recipe modal with ingredients and instructions
- Nutrition facts per serving
- Rating and review system

### ℹ️ About Page
- Company mission and values
- Team member profiles
- Company timeline and milestones
- Statistics and impact metrics

## 🛠️ Technology Stack

### Frontend
- **React 19** - Latest React with modern features
- **Vite** - Fast build tool and development server
- **Ant Design 5** - Modern UI component library
- **React Router DOM** - Client-side routing
- **Framer Motion** - Smooth animations and transitions

### Data Visualization
- **Recharts** - Interactive charts and graphs
- **Ant Design Charts** - Additional chart components

### SEO & Meta
- **React Helmet Async** - Dynamic meta tags and SEO optimization

### Icons & Graphics
- **Ant Design Icons** - Comprehensive icon library
- **Lucide React** - Additional modern icons

### Development Tools
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **Modern CSS** - Custom properties and responsive design

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nutrition-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🎨 Design System

### Color Palette
- **Primary Green**: #52c41a (Nutrition & Health)
- **Secondary Blue**: #1890ff (Trust & Reliability)
- **Success Green**: #52c41a (Positive Actions)
- **Warning Orange**: #faad14 (Attention)
- **Error Red**: #ff4d4f (Errors)

### Typography
- **Font Family**: System fonts (San Francisco, Segoe UI, etc.)
- **Headings**: 600 weight, optimized line heights
- **Body Text**: 400 weight, 1.6 line height

### Components
- **Cards**: Rounded corners, subtle shadows, hover effects
- **Buttons**: Gradient backgrounds, smooth transitions
- **Forms**: Focus states, validation feedback
- **Navigation**: Sticky header, mobile-responsive menu

## 🔧 Customization

### Theme Configuration
The app uses Ant Design's theme system. Modify colors in `src/main.jsx`:

```jsx
<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#52c41a',
      colorSuccess: '#52c41a',
      // ... other theme tokens
    },
  }}
>
```

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Update navigation in `src/components/Header.jsx`

### Styling
- Global styles: `src/index.css`
- Component styles: `src/App.css`
- Use CSS custom properties for consistent theming

## 📊 Performance Features

- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Images and components load on demand
- **Optimized Assets**: Vite handles asset optimization
- **Modern CSS**: Uses CSS Grid and Flexbox
- **Responsive Images**: Optimized for different screen sizes

## 🔍 SEO Features

- **Meta Tags**: Dynamic title, description, and Open Graph tags
- **Structured Data**: Ready for schema markup
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Accessibility**: ARIA labels and keyboard navigation

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📦 Build & Deployment

### Production Build
```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

### Deployment Options
- **Vercel**: Connect GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist/` folder
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **AWS S3**: Upload `dist/` contents to S3 bucket

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Ant Design** team for the amazing component library
- **Vite** team for the fast build tool
- **React** team for the excellent framework
- **Unsplash** for the beautiful food photography
- **Nutrition data** from USDA Food Database

## 📞 Support

For support, email support@nutriguide.com or create an issue in the repository.

---

**Made with ❤️ for healthy living**