import { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import { Outlet, useLocation, useNavigate } from 'react-router';
import styles from "./App.module.css"
import "./main.css"

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
      <header className={styles.mainHeader}>
        <p>Glad to Shop</p>
        <div className={styles.links}>
          <button onClick={() => { navigate("/home") }}>Home</button>
          <button onClick={() => { navigate("/products") }}>Products</button>
          <button onClick={() => { navigate("/cart") }}> {`Cart (${Object.keys(cart).length})`}</button>
        </div>
        {/* <div onClick={() => { navigate("/cart") }} className="cart-btn">
          {`Cart [${Object.keys(cart).length}]`}
        </div> */}
      </header>
      <Outlet context={[cart, setCart]} />
    </>
  )
}

export default App
