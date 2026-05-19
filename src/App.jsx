import { useEffect, useState } from 'react'
import './App.css'
import ProductCard from './ProductCard';

let didInit = false;

function App() {
  const [cardsList, setCardsList] = useState([]);

  console.log(cardsList);

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
      <div className="products-list">
        {cardsList.map((product) => <ProductCard key={product.id} productData={product} />)}
      </div>
    </>
  )
}

export default App
