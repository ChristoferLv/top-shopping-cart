import { useEffect, useState } from 'react'
import './App.css'
import ProductCard from './ProductCard';

let didInit = false;

function ProductsPage({ cart, setCart }) {
  const [cardsList, setCardsList] = useState([]);

  function addProductHandler(productId, amount) {
    let existingProduct = -1;
    for (let prod = 0; prod < cart.length; prod++) {
      if (cart[prod].id == productId) {
        existingProduct = prod;
      }
    }

    if (existingProduct != -1) {
      const newCart = cart.slice();
      newCart[existingProduct] = { id: productId, amount: amount };
      setCart(newCart);
      return;
    }

    setCart([...cart, { id: productId, amount: amount }]);
  }

  console.log(cardsList);

  useEffect(() => {
    console.log("cart", cart);

  }, [cart])

  useEffect(() => {
    if (!didInit) {

      async function buildCardList(cardsData) {
        const cardsArray = [];

        for (const data of cardsData) {
          const id = data.id;
          const title = data.title;
          const description = data.description;
          const price = data.price;
          const image = await fetch(data.image);
          const imageBlob = await image.blob();
          const imageURL = URL.createObjectURL(imageBlob);
          cardsArray.push({ id, title, description, price, imageURL });
        }

        return cardsArray;
      }

      didInit = true;

      fetch("https://fakestoreapi.com/products")
        .then(response => {
          if (!response.ok) {
            throw new Error("Erro ao buscar cartas.");
          }
          return response.json();
        }).then(data => buildCardList(data))
        .then(builtArray => setCardsList(builtArray))
        .catch(error => console.error('Fetch error:', error));
    }
  }, [])

  return (
    <>
      <header>
        <p>Glad to Shop</p>
        <div className="cart-btn">
          C
        </div>
      </header>
      <div className="products-list">
        {cardsList.map((product) => <ProductCard key={product.id} productData={product} addProductHandler={addProductHandler} />)}
      </div>
    </>
  )
}

export default ProductsPage
