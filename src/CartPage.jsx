import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import CartItem from "./CartItem";
import styles from "./CartPage.module.css"


function CartPage() {
    const [cart, setCart] = useOutletContext();
    const [cartList, setCartList] = useState([]);

    function handleChangeItemAmount(id, amount) {
        if (amount == 0) {
            const { [id]: removed, ...newCart } = cart;
            setCart(newCart);
        } else {
            const newCart = { ...cart, [id]: { id: id, amount: amount } };
            setCart(newCart);
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Create a loop of promises
                const fetchPromises = Object.keys(cart).map(id =>
                    fetch(`https://fakestoreapi.com/products/${id}`).then(res => res.json())
                );

                // 2. Wait for all fetches to complete parallelly
                const results = await Promise.all(fetchPromises);
                const resultWithAmount = Object.keys(cart).map((item, index) => {
                    return { id: results[index].id, title: results[index].title, price: results[index].price, imageURL: results[index].image, amount: cart[item].amount }
                })

                setCartList(resultWithAmount);
            } catch (error) {
                console.error("Fetch failed", error);
            }
        };

        if (Object.keys(cart).length > 0)
            fetchData();
    }, [cart]);


    const total = cartList.reduce((acc, cur) => {
        return acc + (cur.amount * cur.price);
    }, 0).toFixed(2);

    return (
        (Object.keys(cart).length > 0 ? < div className={styles.cart} >
            <div className={styles.cartList}>
                <p>Your Products</p>
                {cartList.map((item) => { return <CartItem key={item.id} productData={item} changeAmount={handleChangeItemAmount} /> })}
            </div>
            <div className={styles.cartDetails}>
                <p>Purchase Summary:</p>
                <p>Total: ${total}</p>
                <hr />
                <button onClick={() => { setCart({}); alert("Payment Successfull.") }}>Checkout</button>
            </div>
        </div > : <div className={styles.emptyCart}>
            <p>Your cart is empty. Choose any item to continue.</p>
        </div>)

    )
}

export default CartPage;