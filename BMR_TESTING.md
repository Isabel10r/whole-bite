# BMR Calculator Testing Guide

## Test Cases for BMR Calculator

### Test Case 1: Female, Metric Units
- **Age**: 25 years
- **Gender**: Female
- **Weight**: 60 kg
- **Height**: 165 cm
- **Activity Level**: Sedentary (1.2)
- **Expected BMR**: ~1,380 calories
- **Expected TDEE**: ~1,656 calories

### Test Case 2: Male, Imperial Units
- **Age**: 30 years
- **Gender**: Male
- **Weight**: 180 lbs
- **Height**: 5.9 ft
- **Activity Level**: Moderate activity (1.55)
- **Expected BMR**: ~1,800 calories
- **Expected TDEE**: ~2,790 calories

### Test Case 3: Unit Conversion
1. Enter weight as 70 kg
2. Switch to lbs - should show ~154.3 lbs
3. Enter height as 170 cm
4. Switch to ft - should show ~5.58 ft

### Features to Test

#### ✅ Fixed Issues:
1. **Input Validation**: All numeric inputs now properly validated
2. **Unit Conversion**: Smooth conversion between kg/lbs and cm/ft
3. **Activity Level Dropdown**: Better spacing and no text overlap
4. **Error Handling**: Graceful fallback from API to local calculation
5. **Responsive Design**: Works on mobile and desktop

#### ✅ Improved Styling:
1. **Activity Level Options**: Proper padding and spacing
2. **Dropdown Width**: Expanded to prevent text overlap
3. **Form Validation**: Clear error messages
4. **Input Constraints**: Min/max values and step increments

### Manual Testing Steps:

1. **Navigate to Calculator**:
   - Click on "Calculator" in header
   - Select "BMR Calculator" from dropdown

2. **Test Form Validation**:
   - Try submitting empty form (should show validation errors)
   - Enter invalid values (negative numbers, extreme values)
   - Verify error messages are clear and helpful

3. **Test Unit Conversions**:
   - Enter values in one unit
   - Switch units and verify conversion is accurate
   - Switch back and forth multiple times

4. **Test Calculations**:
   - Enter valid data for different profiles
   - Verify BMR and TDEE calculations are reasonable
   - Check that goal calories are properly calculated

5. **Test Responsive Design**:
   - Resize browser window
   - Test on mobile viewport
   - Verify all elements remain accessible

### Calculation Verification:

**Mifflin-St Jeor Equation (used as fallback)**:
- Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
- Women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161

**TDEE**: BMR × Activity Level Factor

The calculator automatically falls back to local calculation if the RapidAPI is not available, ensuring it always works reliably.
