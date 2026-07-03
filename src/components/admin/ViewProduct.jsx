import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../../styles/ViewProduct.css";

function ViewProduct() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {

        fetchProduct();

    }, []);

    const fetchProduct = async () => {

        try {

            const res = await axios.get(

                `http://localhost:5000/api/products/${id}`

            );

            setProduct(res.data.product);

        }

        catch (err) {

            console.log(err);

        }

    };

    if (!product) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="view-product-page">

            <div className="view-card">

                <img

                    src={`http://localhost:5000/uploads/products/${product.image}`}

                    alt={product.name}

                />

                <div className="view-details">

                    <h1>{product.name}</h1>

                    <h2>₹ {product.price}</h2>

                    <p>

                        <b>Category:</b>

                        {product.category}

                    </p>

                    <p>

                        <b>Description:</b>

                        {product.description}

                    </p>

                    <p>

                        <b>Status:</b>

                        {

                            product.available

                            ?

                            " Available"

                            :

                            " Out Of Stock"

                        }

                    </p>

                    <div className="view-buttons">

                        <Link

                            to={`/admin/products/edit/${product._id}`}

                            className="edit-btn"

                        >

                            Edit Product

                        </Link>

                        <Link

                            to="/admin/products"

                            className="back-btn"

                        >

                            Back

                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ViewProduct;