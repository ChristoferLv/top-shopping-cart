import { useEffect, useState } from 'react'
import './App.css'
import ProductCard from './ProductCard';
import { Outlet, useLocation, useNavigate } from 'react-router';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if(location.pathname == '/'){
      navigate("/home", {replace:true})
    }
  })

  return (
    <>
      <Outlet context={[count, setCount]}/>
    </>
  )
}

export default App
