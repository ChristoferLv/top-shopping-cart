import { useEffect, useState } from 'react'
import { useOutletContext } from "react-router";
import './App.css'
import ProductCard from './ProductCard';


function ProductsPage() {
  const [cart, setCart] = useOutletContext();
  const [cardsList, setCardsList] = useState([]);

  function addProductHandler(productId, amount) {
    if (amount == '') return;
    if (amount == 0) {
      if (productId in cart) {
        const { [productId]: removed, ...newCart } = cart;
        setCart(newCart);
      }
      return;
    }
    setCart({ ...cart, [productId]: { id: productId, amount: amount } });

  }

  useEffect(() => {

    async function buildCardList(cardsData) {
      const cardsArray = [];

      for (const data of cardsData) {
        const id = data.id;
        const title = data.title;
        const description = data.description;
        const price = data.price;
        // const image = await fetch(data.image);
        // const imageBlob = await image.blob();
        // const imageURL = URL.createObjectURL(imageBlob);
        cardsArray.push({ id, title, description, price, imageURL: data.image });
      }

      return cardsArray;
    }


    fetch("https://fakestoreapi.com/products")
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro ao buscar cartas.");
        }
        return response.json();
      }).then(data => buildCardList(data))
      .then(builtArray => setCardsList(builtArray))
      .catch(error => console.error('Fetch error:', error));
  }, [])

  return (
    <>
      <div className="products-list">
        {cardsList.map((product) => <ProductCard key={product.id}
          productData={(product.id in cart ? { ...product, amount: cart[product.id].amount } : { ...product, amount: '' })}
          addProductHandler={addProductHandler} />)}
      </div>
    </>
  )
}

export default ProductsPage
