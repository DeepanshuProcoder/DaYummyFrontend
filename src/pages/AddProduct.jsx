
import { useState } from "react";
import axios from "axios";
import "../styles/AddProduct.css";

function AddProduct() {
const API_URL = import.meta.env.VITE_API_URL;
    const [product, setProduct] = useState({

        name: "",

        price: "",

        description: "",

        category: "",

        image: "",

        available: true

    });

    const [message, setMessage] = useState("");
    const [preview, setPreview] = useState("");
    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setProduct({

            ...product,

            image: file

        });

        setPreview(URL.createObjectURL(file));

    };

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setProduct({

            ...product,

            [name]: type === "checkbox" ? checked : value

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

            formData.append("image", product.image);

            const res = await axios.post(

                `${API_URL}/api/products/add`,

                formData,

                {

                    headers: {

                        "Content-Type": "multipart/form-data"

                    }

                }

            );

            setMessage("✅ Product Added Successfully!");

        }

        catch (err) {

            setMessage(

                err.response?.data?.message ||

                "Something went wrong."

            );

        }

    };

    return (

        <div className="add-product-page">

            <div className="add-product-card">

                <h1>Add Product 🍕</h1>

                {message &&

                    <p className="product-message">

                        {message}

                    </p>

                }

                <form onSubmit={handleSubmit}>

                    <input

                        type="text"

                        name="name"

                        placeholder="Product Name"

                        value={product.name}

                        onChange={handleChange}

                        required

                    />

                    <input

                        type="number"

                        name="price"

                        placeholder="Price"

                        value={product.price}

                        onChange={handleChange}

                        required

                    />

                    <textarea

                        name="description"

                        placeholder="Description"

                        value={product.description}

                        onChange={handleChange}

                        required

                    />

                    <select

                        name="category"

                        value={product.category}

                        onChange={handleChange}

                        required

                    >

                        <option value="">Select Category</option>

                        <option>Pizza</option>

                        <option>Burger</option>

                        <option>Pasta</option>

                        <option>Drinks</option>

                        <option>Ice Cream</option>

                        <option>Dessert</option>

                    </select>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}

                    />
                    {
                        preview &&

                        <div className="image-preview">

                            <img

                                src={preview}

                                alt="Preview"

                            />

                        </div>

                    }
                    <label className="available-check">

                        <input

                            type="checkbox"

                            name="available"

                            checked={product.available}

                            onChange={handleChange}

                        />

                        Available

                    </label>

                    <button type="submit">

                        Add Product

                    </button>

                </form>

            </div>

        </div>

    );

}

export default AddProduct;