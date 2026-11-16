# Shopping Cart

Shopping cart project developed as part of the React course from [The Odin Project](https://www.theodinproject.com/paths/full-stack-javascript/courses/react), focused on routing, shared state, and component testing.

## Project Objective

The main goals were to practice:
- Client-side routing with nested views
- Managing shared cart state across pages
- Fetching product data from an external API
- Building reusable card and cart item components
- Writing component tests with Vitest and Testing Library

## What Is It?

A small storefront with Home, Products, and Cart pages. Products are loaded from the Fake Store API, and items can be added, updated, or removed from the cart. The cart shows totals and a simple checkout flow.

## How To Use

1. Go to the project folder:
   `cd React/top-shopping-cart`
2. Install dependencies:
   `npm install`
3. Run the development server:
   `npm run dev`
4. Run tests (optional):
   `npm run test`

## Features

- React Router navigation between Home, Products, and Cart
- Shared cart state and live cart counter in the header
- Product list built from Fake Store API data
- Cart with quantity controls and total calculation
- Simple checkout action that clears the cart
- Component tests for core UI and behaviors

## File Structure

- `src/App.jsx`: app layout, routing, and cart state
- `src/HomePage.jsx`: home hero section
- `src/ProductsPage.jsx`: products list and add-to-cart logic
- `src/CartPage.jsx`: cart summary and totals
- `src/ProductCard.jsx`: product card component
- `src/CartItem.jsx`: cart item component
- `src/*.module.css`: component styles
- `public/`: static images used on the home page
- `tests.test.jsx`: Vitest tests

## Technologies Used

- React
- React Router
- Vite
- JavaScript
- HTML and CSS
- Vitest and Testing Library

## Visualization

<img width="1900" height="1034" alt="localhost_5173_cart" src="https://github.com/user-attachments/assets/cfd3d91a-ef8a-4026-8348-716e08b362c1" />

---

Project built following: [The Odin Project - Shopping Cart](https://www.theodinproject.com/lessons/node-path-react-new-shopping-cart)

📍 **Main repository with all projects**: [ChristoferLv/TheOdinProject](https://github.com/ChristoferLv/TheOdinProject)
