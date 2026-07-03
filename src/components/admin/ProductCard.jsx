import axios from "axios";
import { Link } from "react-router-dom";
function ProductCard({ product, fetchProducts }) {
    const API_URL = import.meta.env.VITE_API_URL;

    const deleteProduct = async () => {

        const confirmDelete = window.confirm(

            `Delete "${product.name}" ?`

        );

        if (!confirmDelete) return;

        try {

            await axios.delete(

                `${API_URL}/api/products/${product._id}`

            );

            alert("✅ Product Deleted Successfully");

            fetchProducts();

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Failed to delete product."

            );

        }

    };

    return (

        <div className="product-card">

            <img

                src={`${API_URL}/uploads/products/${product.image}`}

                alt={product.name}

            />

            <h2>

                {product.name}

            </h2>

            <h3>

                ₹{product.price}

            </h3>

            <span className="badge">

                ⭐ Bestseller

            </span>

            <p className="availability">

                {

                    product.available

                        ?

                        "✅ Available"

                        :

                        "❌ Out of Stock"

                }

            </p>

            <div className="product-buttons">

                <Link

                    to={`/admin/products/view/${product._id}`}

                    className="view"

                >

                    View

                </Link>

                <Link

                    to={`/admin/products/edit/${product._id}`}

                    className="edit"

                >

                    Edit

                </Link>

                <button

                    className="delete"

                    onClick={deleteProduct}

                >

                    Delete

                </button>

            </div>

        </div>

    );

}

export default ProductCard;