import { useEffect, useState } from "react";
import Cart from "../Components/Cart";
import Checkout from "../Components/Checkout";

const CartPage = () => {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const syncCart = () => {
            const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
            setCart(cart);
        };

        syncCart();
        globalThis.addEventListener('cartUpdated', syncCart);
        return () => globalThis.removeEventListener('cartUpdated', syncCart);
    }, []);
    return (
        cart.length === 0 ? (
            <div className="cart-page p-8 h-screen border-2">
                <p>Your cart is empty.</p>
            </div>
        ) : (
            <div className="cart-page p-12 h-screen border-2 flex flex-row gap-4 justify-around items-start">
                <Cart cart={cart} setCart={setCart} />
                <Checkout cart={cart} />
            </div>
        ));
}
export default CartPage;