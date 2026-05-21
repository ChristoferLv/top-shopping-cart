import { useState } from "react";
import PropTypes from 'prop-types';


function ProductCard({ productData, addProductHandler }) {
    const [amount, setAmount] = useState(productData.amount == 0 ? '' : productData.amount);
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

ProductCard.propTypes = {
    productData: PropTypes.exact({
        id: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        imageURL: PropTypes.string,
        amount: PropTypes.number,
    }),
    addProductHandler: PropTypes.func.isRequired
}


export default ProductCard;