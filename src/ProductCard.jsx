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
                <p>{productData.title}</p>
                <p>{productData.price}</p>
                {/* <p>{productData.description}</p> */}
            </div>
            <div className="product-card-controls">
                <input type="number"
                    value={amount}
                    onChange={(e) => { setAmount(e.target.value) }} />
                <button onClick={() => (addProductHandler(productData.id, amount))}>Add</button>
            </div>
        </div>
    </>);
}


export default ProductCard;