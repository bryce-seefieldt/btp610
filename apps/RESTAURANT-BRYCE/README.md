# BTP610; Assignment 2
**Cross-Platform App for Ordering and Receipt Management**  
_A React Native project for ordering novelty celebration cakes with optional add-ons_

##  `RESTAURANT-BRYCE` App Overview
This application provides a streamlined ordering system for a specialty cake business, featuring:
- Interactive order form with quantity selection
- Optional add-ons (surprise pop-out performer, delivery service)
- Real-time price calculations  
- Detailed digital receipts
- Multi-screen navigation

## Build and Run
```bash
# Install dependencies
npm install

# Start the Expo development server
npx expo start --tunnel
```

## Dependencies
- `@react-navigation/native` - Navigation framework
- `react-native-screens` - Screen management
- `react-native-safe-area-context` - Safe area handling
- `@react-navigation/stack` - Stack navigation
- `react-native-gesture-handler` - Touch and gesture handling
- `@react-navigation/bottom-tabs` - Tab navigation support

## Application Structure

### Screens

#### 1. Order Screen (`OrderScreen.js`)
Main ordering interface featuring:
- Product image display (changes based on selections)
- Quantity input field
- Toggle switches for add-on services:
  - Surprise performer option (+$300.00)
  - Delivery service option (+$100.00)
- Real-time subtotal calculation
- Form validation
- Submit and Clear form buttons

#### 2. Receipt Screen (`ReceiptScreen.js`)
Order confirmation page displaying:
- Unique order number
- Order date
- Item details and quantity
- Selected add-ons
- Subtotal calculation
- Tax calculation (13%)
- Final total
- Thank you message and preparation instructions

### Navigation
- Stack navigation pattern
- Forward navigation from Order to Receipt screen

### User Interactions

#### Order Screen:
1. Enter quantity (must be > 0)
2. Toggle optional services:
   - Surprise in cake
   - Delivery service
3. View real-time subtotal updates
4. Submit order or clear form

#### Receipt Screen:
1. View complete order details
2. Review costs breakdown
3. Navigate back to order form

### Price Structure
- Base cake price: $1,499.99
- Surprise performer: +$300.00
- Delivery service: +$100.00
- Tax rate: 13%

### Data Flow
1. User inputs captured in OrderScreen
2. Form validation performed
3. Order details passed to ReceiptScreen via navigation parameters
4. Receipt generated with unique order number and timestamp

### Styling Features
- Consistent color scheme throughout
    - Inspired by [FlatUI | Russian Palette](https://flatuicolors.com/palette/ru)
- Responsive layout
- Clear visual hierarchy
- Intuitive user interface elements

## Error Handling
- Quantity validation
- Invalid input alerts




