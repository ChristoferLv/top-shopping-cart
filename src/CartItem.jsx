function CartItem({ productData }) {
    return (<div className="cart-item">
        <div className="item-image">
            <img src={productData.image} alt="" />
        </div>
        <div className="item-info">
            <p>{productData.title}</p>
            <p>Amount: {productData.amount}</p>
            <p>Price: ${productData.price}</p>
            <p>Total: ${productData.amount * productData.price}</p>
        </div>
    </div>
    )
}

export default CartItem;