function CartItem({ productData }) {
    console.log("CartItem", productData)
    return (<div className="cart-item">
        <div className="item-image">
            <img src={productData.image} alt="" />
        </div>
        <div className="item-info">
            <p>{productData.title}</p>
            <p>{productData.amount}</p>
            <p>${productData.price}</p>
            <p>Total: ${productData.amount * productData.price}</p>
        </div>
    </div>
    )
}

export default CartItem;