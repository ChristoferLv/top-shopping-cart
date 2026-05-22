import PropTypes from "prop-types";
import styles from "./CartItem.module.css"


function CartItem({ productData, changeAmount }) {
    return (<div className={styles.cartItem}>
        <div className={styles.itemImage}>
            <img src={productData.imageURL} alt="" />
        </div>
        <div className="cart-item-body">
            <div className={styles.itemInfo}>
                <p>{productData.title}</p>
                <p>Amount: {productData.amount}</p>
                <p>Price: ${productData.price}</p>
                <p>Total: ${(productData.amount * productData.price).toFixed(2)}</p>
            </div>
            <div className={styles.cartItemsBtns}>
                <button onClick={() => changeAmount(productData.id, +productData.amount + 1)}>+</button>
                <button onClick={() => changeAmount(productData.id, +productData.amount - 1)}>-</button>
            </div>
        </div>
    </div>
    )
}


CartItem.propTypes = {
    productData: PropTypes.exact({
        id: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        amount: PropTypes.number,
        imageURL: PropTypes.string,
    }),
    changeAmount:PropTypes.func.isRequired
}

export default CartItem;