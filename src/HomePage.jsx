import styles from "./HomePage.module.css"

function HomePage() {
    return (
        <div className={styles.home}>
            <p>***The BEST products for your house***</p>
            <p>BUY NOW</p>
            <div className={styles.homePics}>
                <div className={styles.productPicture}>
                    <p>Clothes</p>
                    <img src="/clothes.avif" alt="Clothes" />
                </div>
                <div className={styles.productPicture}>
                    <p>Computers</p>
                    <img src="./computer.jpeg" alt="Computer" />
                </div>
                <div className={styles.productPicture}>
                    <p>Jewelry</p>
                    <img src="./jewellery.avif" alt="Jewellery" />
                </div>
            </div>
            <div className={styles.sale}>
                <p>Super</p>
                <p>Sale</p>
            </div>
        </div>
    )
}

export default HomePage;