import { useState } from "react";


function ProductCard({ productData, addProductHandler }) {
    const [amount, setAmount] = useState(productData.amount);
    return (<>
        <div className="product-card">
            <div className="product-image">
                <img src={productData.imageURL} alt="" />
            </div>
            <div className="product-data">
                <p>{productData.id}</p>
                <p className="product-name">{productData.title}</p>
                <p className="product-price">Price: ${productData.price}</p>
                {/* <p>{productData.description}</p> */}
            </div>
            <div className="product-card-controls">
                <input type="number"
                min={0}
                    value={amount}
                    onChange={(e) => { setAmount(e.target.value) }} />
                <button onClick={() => (addProductHandler(productData.id, amount))}>Add</button>
            </div>
        </div>
    </>);
}


export default ProductCard;