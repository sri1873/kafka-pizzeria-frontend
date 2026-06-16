import React from "react";

const pizzaData = [
    {
        imageUrl: "https://cdn.prd02apaie.solutions4delivery.com/images/Products/Original/Apache_Pepperoni-11535.webp",
        name: "Kafka's Pepperoni",
        size: "Large (14 inch) Regular",
        allergens: ["Wheat", "Dairy"],
        ingredients: "Mozzarella cheese / Our Signature Tomato Sauce / Pepperoni",
        price: 14.99
    },
    {
        imageUrl: "https://cdn.prd02apaie.solutions4delivery.com/images/Products/Original/_BBQ_Apache_Chicken___Bacon-11533.webp",
        name: "BBQ Kafka Chicken & Bacon",
        size: "Large (14 inch) Regular",
        allergens: ["Wheat", "Dairy", "Soy"],
        ingredients: "Mozzarella cheese / BBQ Sauce / Chicken / Bacon / Onion / Mushrooms",
        price: 14.99
    },

    {
        imageUrl: "https://cdn.prd02apaie.solutions4delivery.com/images/Products/Original/_Spice_Bag_Apache-11528.webp",
        name: "Spice Bag Kafka",
        size: "Large (14 inch) Regular",
        allergens: ["Wheat", "Celery", "Dairy"],
        ingredients: "McDonnell's Curry Sauce Base / McDonnell's Spice Bag Mix Seasoned Shredded Chicken / Mozzarella cheese / Bell Peppers / Red Onion",
        price: 14.99
    },
    {
        imageUrl: "https://cdn.prd02apaie.solutions4delivery.com/images/Products/Original/_The_Don_Kebab_Pizza-11263.webp",
        name: "The Don Kebab Pizza",
        size: "Large (14 inch) Regular",
        allergens: ["Wheat", "Dairy", "Soy"],
        ingredients: "Mozzarella Cheese / Hot Sauce / Kebab Meat / Red Onion / Lettuce / Hot Sauce Drizzle / Garlic & Herb Drizzle",
        price: 14.99
    },
    {
        imageUrl: "https://cdn.prd02apaie.solutions4delivery.com/images/Products/Original/Plain_Cheese_Pizza-11536.webp",
        name: "Plain Cheese Pizza",
        size: "Large (14 inch) Regular",
        allergens: ["Wheat", "Dairy"],
        ingredients: "Mozzarella cheese / Our Signature Tomato Sauce",
        price: 14.99
    },
    {
        imageUrl: "https://cdn.prd02apaie.solutions4delivery.com/images/Products/Original/The_Big_Chief-11537.webp",
        name: "The Big Chief",
        size: "Large (14 inch) Regular",
        allergens: ["Wheat", "Dairy"],
        ingredients: "Mozzarella cheese / Our Signature Tomato Sauce / Pepperoni / Beefballs / Sausage",
        price: 14.99
    },
    {
        imageUrl: "https://cdn.prd02apaie.solutions4delivery.com/images/Products/Original/_Hot_Honey_Pepperoni-11532.webp",
        name: "Hot Honey Pepperoni",
        size: "Large (14 inch) Regular",
        allergens: ["Wheat", "Dairy"],
        ingredients: "Mozzarella cheese / Our Signature Tomato Sauce / Pepperoni / Hot Honey",
        price: 14.99
    },
    {
        imageUrl: "https://cdn.prd02apaie.solutions4delivery.com/images/Products/Original/_Buffalo-11538.webp",
        name: "Buffalo Pizza",
        size: "Large (14 inch) Regular",
        allergens: ["Wheat", "Dairy"],
        ingredients: "Mozzarella cheese / Our Signature Tomato Sauce/ Pepperoni / Ham / Bacon / Chicken",
        price: 14.99
    },
    {
        imageUrl: "https://cdn.prd02apaie.solutions4delivery.com/images/Products/Original/Hot_Apache-11539.webp",
        name: "Hot Kafka",
        size: "Large (14 inch) Regular",
        allergens: ["Wheat", "Dairy"],
        ingredients: "Mozzarella cheese / Our Signature Tomato Sauce / Pepperoni, Jalapeno Peppers / Onion / Chilli Shake / Extra Mozzarella",
        price: 14.99
    },
    {
        imageUrl: "https://cdn.prd02apaie.solutions4delivery.com/images/Products/Original/Hawaiian-11541.webp",
        name: "Hawaiian",
        size: "Large (14 inch) Regular",
        allergens: ["Wheat", "Dairy"],
        ingredients: "Mozzarella cheese / Our Signature Tomato Sauce / Ham / Pineapple / Extra Mozzarella",
        price: 14.99
    },
];
export default function Card({ handleAddToCart }) {
  return <div className="cards pizza-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {pizzaData.map((pizza, index) => <div key={index} className="pizza-item shadow-xl cursor-pointer rounded-2xl bg-amber-100 drop-shadow-black p-4 mb-4 w-fit text-left">
                        <img src={pizza.imageUrl} alt={pizza.name} className=" h-64  mb-4" />
                        <h2 className="text-xl font-bold mb-2">{pizza.name}</h2>
                        <p className="text-gray-600 mb-2">{pizza.size}</p>
                        <div className="allergens flex gap-2 mb-2">
                            {pizza.allergens.map((allergen, allergenIndex) => <p key={allergenIndex} className="text-black-500 pl-4 pr-4 text-xs rounded-full bg-amber-500 p-2">{allergen}</p>)}
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{pizza.ingredients}</p>
                        <div className="price-cart flex justify-between">
                            <p className="text-lg font-bold">€{pizza.price.toFixed(2)}</p>
                            <button className="bg-[#CF2101] cursor-pointer text-white font-bold px-4 py-2 rounded-xl" onClick={() => handleAddToCart(pizza)}>
                                ADD
                                <i className="fa-solid fa-cart-arrow-down text-xl pl-2"></i>
                            </button>

                        </div>

                    </div>)}
            </div>;
}
  