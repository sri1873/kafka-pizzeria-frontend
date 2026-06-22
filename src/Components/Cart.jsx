
const Cart = ({ cart, setCart }) => {


    const increment = (item) => {
        const updated = cart.map(c =>
            `${c.name}-${c.size}` === `${item.name}-${item.size}`
                ? { ...c, quantity: c.quantity + 1 } : c
        );
        setCart(updated);
        sessionStorage.setItem('cart', JSON.stringify(updated));
        globalThis.dispatchEvent(new Event('cartUpdated'));
    };

    const decrement = (item) => {
        const updated = item.quantity === 1
            ? cart.filter(c => `${c.name}-${c.size}` !== `${item.name}-${item.size}`)
            : cart.map(c =>
                `${c.name}-${c.size}` === `${item.name}-${item.size}`
                    ? { ...c, quantity: c.quantity - 1 } : c
            );
        setCart(updated);
        sessionStorage.setItem('cart', JSON.stringify(updated));
        globalThis.dispatchEvent(new Event('cartUpdated'));
    };

    return (
        <div className="cart h-screen">
            <div>
                <h2>Your Order</h2>
                <div className="order-list flex flex-col gap-3 mt-4">
                    {cart.map((item) => (
                        <div key={`${item.name}-${item.size}`}
                            className="order-item flex items-center gap-4 p-4 border-2 rounded-xl">

                            <img src={item.imageUrl} alt={item.name} className="h-20 w-20 rounded-lg object-cover shrink-0" />

                            <div className="flex flex-col gap-1 flex-1">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-gray-500 text-sm">{item.size}</p>
                            </div>

                            {/* Quantity controls */}
                            <div className="flex items-center gap-3 shrink-0">
                                <button
                                    onClick={() => decrement(item)}
                                    className="w-8 h-8 rounded-full border-2 border-[#CF2101] text-[#CF2101]
                       font-bold flex items-center justify-center hover:bg-[#CF2101]
                       hover:text-white transition-colors">
                                    −
                                </button>
                                <span className="w-4 text-center font-medium">{item.quantity}</span>
                                <button
                                    onClick={() => increment(item)}
                                    className="w-8 h-8 rounded-full border-2 border-[#CF2101] text-[#CF2101]
                                font-bold flex items-center justify-center hover:bg-[#CF2101]
                       hover:text-white transition-colors">
                                    +
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


export default Cart;