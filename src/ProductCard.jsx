function ProductCard({ productData }) {
    return (<>
        <div className="product-card">
            <div className="product-image">
                <img src={productData.imageURL} alt="" />
            </div>
            <div className="product-data">
                {/* <p>{productData.id}</p> */}
                <p>{productData.title}</p>
                <p>{productData.price}</p>
                <p>{productData.description}</p>
            </div>
        </div>
    </>);
}


export default ProductCard;