function HomePage() {
    return (
        <div className="home">
            <p>***The BEST products for your house***</p>
            <p>BUY NOW</p>
            <div className="home-pics">
                <div className="product-picture">
                    <p>Clothes</p>
                    <img src="/clothes.avif" alt="" />
                </div>
                <div className="product-picture">
                    <p>Computers</p>
                    <img src="./computer.jpeg" alt="" />
                </div>
                <div className="product-picture">
                    <p>Jewelry</p>
                    <img src="./jewellery.avif" alt="" />
                </div>
            </div>
            <div className="sale">
                <p>Super</p>
                <p>Sale</p>
            </div>
        </div>
    )
}

export default HomePage;