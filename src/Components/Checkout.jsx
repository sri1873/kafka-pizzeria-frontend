import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

const Checkout = ({ cart }) => { 

    const navigate = useNavigate();
    const placeOrder = (cart) => {
        const orderDetails = {
            userId: localStorage.getItem("userId"),
            desitination: "",
            deliveryAddress: "",
            items: cart.map(item => ({
                item: item.name,
                quantity: item.quantity
            }))
        };
        axios.post('http://localhost:8080/order', orderDetails).then(response => {
            console.log("Order placed successfully:", response.data);
            sessionStorage.removeItem('cart');
            window.dispatchEvent(new Event('cartUpdated'));
            navigate('/order-status');
        }).catch(error => {
            console.error("Error placing order:", error);
        }
        );};

    return (
        <div className="checkout p-8 border-2 rounded-2xl h-1/2 ">
            <h2>Checkout</h2>
            <div className="checkout-summary mt-6">
                <p className="text-lg font-medium">
                    Total: €{cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                </p>
                <button className="mt-4 px-4 py-2 cursor-pointer bg-[#CF2101] text-white rounded-lg hover:bg-[#a71c01] transition-colors"
                    onClick={(e) => placeOrder(cart)}>
                Place Order
            </button>
            </div>
        </div>

    );
}

export default Checkout;