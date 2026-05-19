import { StrictMode, useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ProductsPage from './ProductsPage.jsx';
import CartPage from './CartPage.jsx';
import HomePage from './HomePage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "home", element: <HomePage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "cart", element: <CartPage /> }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
