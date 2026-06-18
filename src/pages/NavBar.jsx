import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const NavBar = () => {
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        const syncCart = () => {
            const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
            let count = 0;
            cart.map(item => {
                count += item.quantity;
            });
            setCartCount(count);
        };

        syncCart();
        globalThis.addEventListener('cartUpdated', syncCart);
        return () => globalThis.removeEventListener('cartUpdated', syncCart);
    }, []);

    return (
        <div className="navbar sticky top-0 border-b-2 border-[#CF2101] items-center flex flex-wrap justify-between content-center w-full h-22.5 p-4 text-2xl font-bold bg-[#ffe6a7]  ">

            <img src="favicon.ico" alt="Favicon" className="h-20 w-20 mr-2" />
            <span className="text-2xl font-medium text-[#CF2101] leading-snug text-center">
                Pizza<br />Kafka
            </span>
            <button className="flex h-fit items-center gap-2 px-4 py-2 cursor-pointer
                        text-[#CF2101] text-sm font-medium"
            onClick={() => navigate('/cart')}
            >
                <i className="fa-solid fa-cart-shopping text-base" aria-hidden="true" />
                <span>Cart</span>   
                {cartCount > 0 && (
                    <span className="bg-white text-[#CF2101] text-xs font-medium
                         rounded-full px-2 py-0.5 min-w-5 text-center">
                        {cartCount}
                    </span>
                )}
            </button>
        </div>
    )

}
export default NavBar;