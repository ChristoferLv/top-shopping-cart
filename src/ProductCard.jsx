import { useState } from "react";
import PropTypes from 'prop-types';
import styles from "./ProductCard.module.css"



function ProductCard({ productData, addProductHandler }) {
    const [amount, setAmount] = useState(productData.amount == 0 ? '' : productData.amount);
    return (<>
        <div className={styles.productCard}>
            <div className={styles.productImage}>
                <img src={productData.imageURL} alt="" />
            </div>
            <div className={styles.productData}>
                <p>{productData.id}</p>
                <p className={styles.productName}>{productData.title}</p>
                <p className={styles.productPrice}>Price: ${productData.price}</p>
                {/* <p>{productData.description}</p> */}
            </div>
            <div className={styles.productCardControls}>
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