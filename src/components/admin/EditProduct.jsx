import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/EditProduct.css";

function EditProduct() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState({

        name: "",

        price: "",

        description: "",

        category: "",

        available: true,

        image: null

    });

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

    const handleChange = (e) => {

        const { name, value, type, checked, files } = e.target;

        setProduct({

            ...product,

            [name]:

                type === "checkbox"

                    ? checked

                    : type === "file"

                    ? files[0]

                    : value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("name", product.name);

            formData.append("price", product.price);

            formData.append("description", product.description);

            formData.append("category", product.category);

            formData.append("available", product.available);

            if (product.image instanceof File) {

                formData.append("image", product.image);

            }

            await axios.put(

                `http://localhost:5000/api/products/${id}`,

                formData,

                {

                    headers: {

                        "Content-Type": "multipart/form-data"

                    }

                }

            );

            alert("✅ Product Updated Successfully");

            navigate("/admin/products");

        }

        catch (err) {

            alert(err.response?.data?.message);

        }

    };

    return (

        <div className="add-product-page">

            <div className="add-product-card">

                <h1>Edit Product ✏️</h1>

                <form onSubmit={handleSubmit}>

                    <input

                        type="text"

                        name="name"

                        value={product.name}

                        onChange={handleChange}

                        required

                    />

                    <input

                        type="number"

                        name="price"

                        value={product.price}

                        onChange={handleChange}

                        required

                    />

                    <textarea

                        name="description"

                        value={product.description}

                        onChange={handleChange}

                        required

                    />

                    <select

                        name="category"

                        value={product.category}

                        onChange={handleChange}

                    >

                        <option>Pizza</option>

                        <option>Burger</option>

                        <option>Sandwich</option>

                        <option>Drinks</option>

                        <option>Coffee</option>

                        <option>Ice Cream</option>

                        <option>Dessert</option>

                    </select>

                    <input

                        type="file"

                        name="image"

                        accept="image/*"

                        onChange={handleChange}

                    />

                    <label>

                        <input

                            type="checkbox"

                            name="available"

                            checked={product.available}

                            onChange={handleChange}

                        />

                        Available

                    </label>

                    <button type="submit">

                        Update Product

                    </button>

                </form>

            </div>

        </div>

    );

}

export default EditProduct;