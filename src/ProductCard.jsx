function ProductCard({ productData, addProductHandler }) {
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
                <input type="text" />
                <button onClick={()=>(addProductHandler(productData.id, 1))}>Add</button>
            </div>
        </div>
    </>);
}


export default ProductCard;