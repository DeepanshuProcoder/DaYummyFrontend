function FoodCard({ product, addToCart }) {

    return (

        <div className="special-card">

           <img

    src={`${API_URL}/uploads/products/${product.image}`}

    className="sel-item"

    alt={product.name}

    onError={(e) => {

        console.log("Image not found:", product.image);

        e.target.src = "https://placehold.co/300x300?text=No+Image";

    }}

/>

            {

                product.name &&

                <h3 className="food-name">

                    {product.name}

                </h3>

            }

            {

                product.price &&

                <p className="price">

                    ₹{product.price}

                </p>

            }

            <button

                className="add-to-cart"

                onClick={() => addToCart(product)}

            >

                Add To Cart

            </button>

        </div>

    );

}

export default FoodCard;