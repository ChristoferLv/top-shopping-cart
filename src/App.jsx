import { useEffect, useState } from 'react'
import './App.css'
import ProductCard from './ProductCard';
import { Outlet, useLocation, useNavigate } from 'react-router';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState({});

  useEffect(() => {
    if (location.pathname == '/') {
      navigate("/home", { replace: true })
    }
  })

  return (
    <>
      <header>
        <p>Glad to Shop</p>
        <div className="links">
          <button onClick={() => { navigate("/home") }}>Home</button>
          <button onClick={() => { navigate("/products") }}>Products</button>
        </div>
        <div onClick={() => { navigate("/cart") }} className="cart-btn">
          {`Cart [${Object.keys(cart).length}]`}
        </div>
      </header>
      <Outlet context={[cart, setCart]} />
    </>
  )
}

export default App
