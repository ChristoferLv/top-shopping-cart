import PropTypes from "prop-types";

function CartItem({ productData, changeAmount }) {
    return (<div className="cart-item">
        <div className="item-image">
            <img src={productData.imageURL} alt="" />
        </div>
        <div className="cart-item-body">
            <div className="item-info">
                <p>{productData.title}</p>
                <p>Amount: {productData.amount}</p>
                <p>Price: ${productData.price}</p>
                <p>Total: ${(productData.amount * productData.price).toFixed(2)}</p>
            </div>
            <div className="cart-items-btns">
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