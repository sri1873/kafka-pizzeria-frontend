import Card from './Card';
import { useState } from "react";

const HomePage = () => {

    const [cart, setCart] = useState([]);
    const [toast, setToast] = useState();

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 4000);
    };


    const handleAddToCart = (pizza) => {
        setCart(prev => [...prev, pizza]);
        showToast(`${pizza.name} added to cart!`);
    };

    return (
        <div className="homepage p-8">
            <div className="fixed left-5 bottom-5 flex flex-col gap-2 z-50 w-2xl">
                {toast && (
                    <div

                        className="toast-enter flex items-center gap-3 px-4 py-3 rounded-xl
                     bg-green-50 border border-green-200 text-green-800
                     text-l font-medium shadow-sm"
                    >
                        <i className="fa-solid fa-check"></i>
                        {toast}
                        <button
                            onClick={() => setToast(null)}
                            className="ml-auto opacity-50 hover:opacity-100 transition-opacity"
                        >✕</button>
                    </div>
                )}
            </div>
            <Card handleAddToCart={handleAddToCart} />
        </div>
    );
}

export default HomePage;