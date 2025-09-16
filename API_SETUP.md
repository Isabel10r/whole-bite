# API Setup Instructions

## BMR Calculator API

The BMR Calculator uses the RapidAPI BMR and TMR service for accurate calculations.

### Setup Instructions:

1. **Get API Key:**
   - Visit: https://rapidapi.com/tope96/api/bmr-and-tmr
   - Subscribe to the API (free tier available)
   - Copy your API key

2. **Configure Environment Variables:**
   - Create a `.env` file in the project root
   - Add the following line:
   ```
   VITE_RAPIDAPI_KEY=your_rapidapi_key_here
   ```

3. **Restart Development Server:**
   ```bash
   npm run dev
   ```

### Fallback Behavior:

If no API key is provided, the calculator will automatically fall back to using the Mifflin-St Jeor equation for BMR calculation locally. This ensures the calculator works even without the API integration.

### API Endpoints Used:

- **BMR Calculation**: `GET /bmr`
  - Parameters: age, gender, weight (kg), height (cm), activitylevel
  - Returns: BMR and TMR values

### Note:

The current implementation includes both API integration and local calculation fallback to ensure reliability and user experience.
