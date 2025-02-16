# Week 1, Session 2: README

## `App_Basic.js`

- Consider adding more structured layout using nested <View> containers to group related elements
- Add meaningful styles to Text components for better visual hierarchy
- Consider using resizeMode property on the Image component for better scaling control
- Could use gap or justifyContent spacing properties to control spacing between elements
- Consider using SafeAreaView as the root container for iOS compatibility


## `App.js`

### Key improvements made following Native Mobile methodology:
#### 1. Structural Improvements:
- Added `SafeAreaView` as root container for iOS compatibility
- Created nested `View` containers for logical grouping
- Implemented proper component hierarchy
#### 2. Layout Enhancements:
- Used `gap` property for consistent spacing
- Added padding for better content spacing
- Implemented proper flex container structure
#### 3. Image Handling:
- Added dedicated image container
- Implemented `resizeMode="contain"`
- Used percentage-based dimensions for responsiveness
- Added visual container styling (backgroundColor, borderRadius)
#### 4. Text Styling:
- Created distinct text styles (header, body, list items)
- Added proper typography hierarchy
- Implemented consistent color scheme
#### 5. Style Organization:
- Grouped related styles together
- Used meaningful style names
- Implemented reusable style properties
#### 6. Visual Improvements:
- Added border radius for modern look
- Implemented consistent spacing
- Added background colors for visual separation

These improvements follow Native Mobile's emphasis on structured layouts, component reusability, and proper styling organization while maintaining clean and maintainable code. 