#BTP610 - Assignemnt 2

_**This assessment contains materials that may be subject to copyright and other intellectual property rights.
Modification, distribution or reposting of this document is strictly prohibited. Learners found reposting this document or
its solution anywhere will be subject to the college’s Copyright and Academic Integrity policies.**_

## Assessed Concepts
The assessment evaluates your knowledge the introductory concepts in React Native discussed in Weeks 1-6, with emphasis on:
1. Designing a form and capturing user input
2. Creating a multi screen application (React Native Navigation)

When creating your solution, you must use the coding practices and conventions demonstrated in class. A solution that does not reflect what was taught in class will not be accepted (0 grade) and/or be subject to an academic integrity review.

## Submission Instructions
For your submission to be graded, you must provide a zip file of your project and demonstrate your project running on a mobile device.

### 1. Creating your project:
- Projects must be created using the Expo CLI.
- When creating your project, name the project: RESTAURANT-FIRSTNAME (replace firstname with your name)

### 2. Create a zip file and submit
- When finished, zip the entire project and name the zip file RESTAURANT-FIRSTNAME.zip (replace firstname with your name)
- Your finished zip file may be very large. Ensure you budget enough time to upload the zip file by the due date.
- Submit your zip file to the dropbox.
Academic Integrity
- This is an individual assessment.
- Permitted activities: Usage of Internet to search for syntax only; usage of course materials
- Not permitted:
- Following step-by-step tutorials
- Posting assessments to homework help websites, such as Chegg or CourseHero
- Discussion of solution or approaches with others; sharing/using a “reference” from someone
- Using generative AI tools, such as ChatGPT, Copilot, etc

## Academic Integrity

This is an individual assessment.
- Permitted activities: Usage of Internet to search for syntax only; usage of course materials
- Not permitted:
- Following step-by-step tutorials
- Posting assessments to homework help websites, such as Chegg or CourseHero
- Discussion of solution or approaches with others; sharing/using a “reference” from someone
- Using generative AI tools, such as ChatGPT, Copilot, etc

## Implementation Guidelines
1. Code must be written in Javascript (not Typescript or any other language)
2. Usage of 3rd party UI frameworks is NOT permitted (example: React Paper, Material UI, etc)
3. You must use function based components, not class based components
4. Variables must be declared using let and const. No var declarations permitted.
5. Functions should be declared using arrow function syntax, example: const abc = () => {}
6. Implementation must follow techniques demonstrated in class.
7. In addition to the required functionality, learners are expected to use the coding conventions demonstrated in class, meaningful variable naming, and clearly organized code. Comments are helpful but not required.

## Problem Description:
You have been hired by a restaurant to build a mobile app that lets customers place orders. Assume the restaurant only sells 1 item. You may decide what the item is, its pricing, etc. Be creative.

Using Expo + React Native, implement the application per the requirements below.

### Screen 1: Place an Order
- Display an ordering screen. The user uses this screen to enter details about their order.
- The ordering screen must display:
    1a. Item name
    1b. Item price   
    1c. Item photo
    1d. Form field to enter the quantity the user wants to purchase
    1e. <Switch> form fields to enable user to choose from 2 different add ons. For example:
        - Include utensils
        - Delivery
        
        1e.1 You may choose any 2 add-ons that make sense for your restaurant item. For example, if you are selling bubble tea, then “including utensils” would not make sense; but an “upsize to large size” would.

        1e.2 If the user selects an add-on, an extra charge is added to the pre-tax cost of the order. For example, suppose delivery costs an additional 10.00 per order. If the user selects “delivery’, the app should add $10.00 to the order subtotal.

        1e.3 You should display the price of each add-on. Ensure you use different amounts for each add on.

    1f. A button to submit the order
    1g. A button to clear the order (pressing this button resets all form fields to their default values)

#### Submitting an order
- When the user submits the order, send the order details and navigate the user to the Receipt Screen.
- You are responsible for deciding what data needs to be sent to the Receipt Screen.

### Screen 2: Receipt Screen
- This screen is responsible for calculating and displaying the total cost of the order to the user.
- The receipt must show:
    2a. The order details (name of the purchased item, price, quantity, add ons, etc)
    2b. A cost breakdown of the order (subtotal, tax, total). Assume 13% sales tax.
    2c. A randomly generated order confirmation code. The code must be a 6 digit number

### Navigation
- Screen 1 & Screen 2 must be connected with a Stack Navigator.

### User Interface and Styling
- Your app must be reasonably pretty, with pleasing colors, typography, and layout.
- Choose font sizes and colors that are easy to see and read
- Consider using colors that look nice together. For example: https://flatuicolors.com/