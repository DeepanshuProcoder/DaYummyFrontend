import "../styles/Menu.css";

import CategoryCard from "../components/CategoryCard";
import FoodCard from "../components/FoodCard";

import categories from "../data/categories";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

import addsound from "../assets/sounds/add-to-cart.mp3";

function Menu({ cart, setCart }) {
const API_URL = import.meta.env.VITE_API_URL;
    const sound = useRef(new Audio(addsound));

    sound.current.volume = 0.5;

    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const res = await axios.get(
                    `${API_URL}/api/products`
                );

                console.log(res.data);

                setAllProducts(res.data.products);
                console.log("Total Products:", res.data.products.length);

            }

            catch (err) {

                console.log(err);

            }

        };

        fetchProducts();

    }, []);

    const addToCart = (product) => {

        console.log(product);

        const existing = cart.find(

            item => item._id === product._id

        );

        if (existing) {

            const updatedCart = cart.map(item =>

                item._id === product._id

                    ? {

                        ...item,

                        quantity: item.quantity + 1

                    }

                    : item

            );

            setCart(updatedCart);

        }

        else {

            setCart([

                ...cart,

                {

                    ...product,

                    quantity: 1

                }

            ]);

        }

        sound.current.currentTime = 0;

        sound.current.play();

    };
    console.log("Products in state:", allProducts.length);
    return (

        <div className="menu-container">

            <h1 className="menu-title">

                Our Menu 🍽️

            </h1>

            {/* Categories */}

            <div className="first-row">

                {

                    categories.slice(0, 8).map(category => (

                        <CategoryCard

                            key={category.id}

                            category={category}

                        />

                    ))

                }

            </div>

            <div className="second-row">

                {

                    categories.slice(8).map(category => (

                        <CategoryCard

                            key={category.id}

                            category={category}

                        />

                    ))

                }

            </div>

            {/* Today's Special */}

            <h2 className="today-special">

                Today's Special

            </h2>

            <div className="special-row">

                {

                    allProducts.slice(4, 8).map(product => (

                        <FoodCard

                            key={product._id}

                            product={product}

                            addToCart={addToCart}

                        />

                    ))
                }

            </div>

            {/* Recommended */}

            <h2 className="today-special1">

                Recommended For You

            </h2>

            <div className="special-row">

                {

                    allProducts.slice(4, 8).map(product => (

                        <FoodCard

                            key={product.id}

                            product={product}

                            addToCart={addToCart}

                        />

                    ))

                }

            </div>

            {/* All Products */}

            <h2 className="pizza">

                All Dishes

            </h2>

            <div className="special-row">

    {allProducts.map((product, index) => {

        console.log(index, product.name);

        return (

            <FoodCard
                key={product._id}
                product={product}
                addToCart={addToCart}
            />

        );

    })}

</div>

        </div>

    );

}

export default Menu;