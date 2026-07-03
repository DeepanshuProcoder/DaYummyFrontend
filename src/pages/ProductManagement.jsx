import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/ProductManagement.css";
import ProductCard from "../components/admin/ProductCard";

function ProductManagement() {

    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");

    const fetchProducts = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/products"
            );

            setProducts(res.data.products);

        }

        catch (err) {

            console.log(err);

        }

    };

    const searchProducts = async (keyword) => {

        try {

            if (keyword.trim() === "") {

                fetchProducts();

                return;

            }

            const res = await axios.get(

                `http://localhost:5000/api/products/search?search=${keyword}`

            );

            setProducts(res.data.products);

        }

        catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        fetchProducts();

    }, []);

    useEffect(() => {

        const delay = setTimeout(() => {

            searchProducts(search);

        }, 300);

        return () => clearTimeout(delay);

    }, [search]);

    return (

        <div className="product-page">

            <div className="product-top">

                <h1>🍔 Product Management</h1>

                <Link
                    to="/admin/products/add"
                    className="add-btn"
                >
                    + Add Product
                </Link>

            </div>

            <input

                className="search-product"

                type="text"

                placeholder="🔍 Search Products..."

                value={search}

                onChange={(e) => setSearch(e.target.value)}

            />

            <div className="product-grid">

                {

                    products.length > 0 ?

                        (

                            products.map(product => (

                                <ProductCard

                                    key={product._id}

                                    product={product}

                                    fetchProducts={fetchProducts}

                                />
                            ))

                        )

                        :

                        (

                            <div className="no-product">

                                <h2>😔 No Products Found</h2>

                                <p>

                                    Try searching with another product name.

                                </p>

                            </div>

                        )

                }

            </div>

        </div>

    );

}

export default ProductManagement;