import "../styles/Cart.css";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import paysound from "../assets/sounds/proceed.mp3";

function Cart({ cart, setCart }) {

    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    const audio = useRef(new Audio(paysound));

    audio.current.volume = 0.5;

    const token = localStorage.getItem("token");

    const role = localStorage.getItem("role");

    const userId = localStorage.getItem("userId");

    const userName = localStorage.getItem("userName");

    const [showCheckout, setShowCheckout] = useState(false);

    const [phone, setPhone] = useState("");

    const [address, setAddress] = useState("");


    const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
    const [couponCode, setCouponCode] = useState("");

    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponApplied, setCouponApplied] = useState(false);

    const [discountAmount, setDiscountAmount] = useState(0);

    const [finalTotal, setFinalTotal] = useState(0);
    const [availableCoupons, setAvailableCoupons] = useState([]);

    const [couponMessage, setCouponMessage] = useState("");

    const [loadingCoupons, setLoadingCoupons] = useState(true);
    const fetchCoupons = async () => {

        try {

            const res = await axios.get(

                `${API_URL}/api/coupons/available`

            );

            setAvailableCoupons(

                res.data.coupons

            );

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoadingCoupons(false);

        }

    };
    useEffect(() => {

        fetchCoupons();

    }, []);
    useEffect(() => {

        setAppliedCoupon(null);

        setCouponCode("");

        setDiscountAmount(0);

        setFinalTotal(0);
        setCouponApplied(false);

    }, [

        cart

    ]);

    const increaseQuantity = (productId) => {

        const updatedCart = cart.map(item =>

            item.productId === productId

                ? {

                    ...item,

                    quantity: item.quantity + 1

                }

                : item

        );

        setCart(updatedCart);

    };

    const decreaseQuantity = (productId) => {

        const updatedCart = cart

            .map(item =>

                item.productId === productId

                    ? {

                        ...item,

                        quantity: item.quantity - 1

                    }

                    : item

            )

            .filter(item => item.quantity > 0);

        setCart(updatedCart);

    };

    const removeItem = (id) => {

        setCart(

            cart.filter(item => item.productId !== id)

        );

    };

    const subtotal = cart.reduce(

        (sum, item) =>

            sum + item.price * item.quantity,

        0

    );

    const sgst = subtotal * 0.025;

    const cgst = subtotal * 0.025;

    const deliveryCharge =

        subtotal >= 499

            ? 0

            : 40;



    const calculatedTotal =

        subtotal +

        sgst +

        cgst +

        deliveryCharge;
    const applyCoupon = async (

        selectedCoupon = couponCode

    ) => {

        if (

            !selectedCoupon ||

            selectedCoupon.trim() === ""

        ) {

            alert("Enter Coupon Code.");

            return;

        }

        try {

            const res = await axios.post(

                `${API_URL}/api/coupons/validate`,

                {

                    code: selectedCoupon,

                    userId,

                    cartTotal: calculatedTotal,

                    paymentMethod,

                    categories: cart.map(

                        item => item.category

                    )

                }

            );

            setAppliedCoupon(

                res.data.coupon

            );
            setCouponCode(res.data.coupon.code);

            setCouponMessage("✅ Coupon Applied Successfully");
            setCouponApplied(true);

            setDiscountAmount(

                res.data.discount

            );

            setFinalTotal(

                res.data.newTotal

            );

            alert(

                res.data.message

            );

        }

        catch (err) {

            console.log(err);

            alert(

                err.response?.data?.message ||

                "Invalid Coupon"

            );

        }

    };

    const placeOrder = async () => {

        if (!token) {

            alert("Please login first.");

            navigate("/login");

            return;

        }

        if (role !== "user") {

            alert("Only customers can place orders.");

            return;

        }

        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;

        }

        if (phone.trim() === "") {

            alert("Enter phone number.");

            return;

        }

        if (address.trim() === "") {

            alert("Enter delivery address.");

            return;

        }

        try {

            const orderData = {

                user: userId,

                customerName:

                    JSON.parse(

                        localStorage.getItem("user")

                    ).fullName,

                phone,

                address,

                items: cart.map(item => ({

                    productId:

                        item.productId ||

                        item._id,

                    name: item.name,

                    image: item.image,

                    price: item.price,

                    quantity: item.quantity

                })),

                totalPrice:

                    discountAmount > 0

                        ?

                        finalTotal

                        :

                        calculatedTotal,

                paymentMethod,

                coupon:

                    appliedCoupon?._id,

                couponCode:

                    appliedCoupon?.code,

                discount:

                    discountAmount

            };

            const res = await axios.post(

                `${API_URL}/api/orders`,

                orderData

            );

            setCouponMessage(

                "✅ Coupon Applied Successfully"

            );

            setCart([]);
            setAppliedCoupon(null);

            setCouponCode("");

            setDiscountAmount(0);

            setFinalTotal(0);

            localStorage.removeItem("cart");

            setShowCheckout(false);

            navigate("/orders");

        }

        catch (err) {

            console.log(err);

            alert("Unable to place order.");

        }

    };
    return (

        <div className="cart-container">

            {/* LEFT SIDE */}

            <div className="cart-items">

                <h1 className="cart-title">

                    🛒 Your Cart

                </h1>

                {

                    cart.length === 0 ?

                        (

                            <div className="empty-cart">

                                <h2>

                                    Your cart is empty 🛒

                                </h2>

                                <p>

                                    Add some delicious food to get started!

                                </p>

                            </div>

                        )

                        :

                        (

                            cart.map(item => (

                                <div

                                    className="cart-card"

                                    key={item.productId}

                                >
                                    <img
                                        src={`${API_URL}/uploads/products/${item.image}`}
                                        className="cart-image"
                                        alt={item.name}
                                    />

                                    <div className="cart-info">

                                        <h2>

                                            {item.name}

                                        </h2>

                                        <p className="cart-price">

                                            ₹{item.price}

                                        </p>

                                        <div className="quantity">

                                            <button

                                                onClick={() => decreaseQuantity(item.productId)}

                                            >

                                                −

                                            </button>

                                            <span>

                                                {item.quantity}

                                            </span>

                                            <button

                                                onClick={() => increaseQuantity(item.productId)}

                                            >

                                                +

                                            </button>

                                        </div>

                                        <button

                                            className="remove-item"

                                            onClick={() => removeItem(item.productId)}

                                        >

                                            Remove

                                        </button>

                                    </div>

                                    <div className="item-total">

                                        ₹{item.price * item.quantity}

                                    </div>

                                </div>

                            ))

                        )

                }

            </div>

            {/* RIGHT SIDE */}

            <div className="cart-summary">

                <h2>

                    Bill Summary

                </h2>

                <hr />

                {

                    cart.map(item => (

                        <div

                            className="bill-item"

                            key={item.productId}

                        >

                            <span>

                                {item.name} × {item.quantity}

                            </span>

                            <span>

                                ₹{item.price * item.quantity}

                            </span>

                        </div>

                    ))

                }

                <hr />

                <div className="bill-item">

                    <span>

                        Subtotal

                    </span>

                    <span>

                        ₹{subtotal}

                    </span>

                </div>

                <div className="bill-item">

                    <span>

                        SGST (2.5%)

                    </span>

                    <span>

                        ₹{sgst.toFixed(2)}

                    </span>

                </div>

                <div className="bill-item">

                    <span>

                        CGST (2.5%)

                    </span>

                    <span>

                        ₹{cgst.toFixed(2)}

                    </span>

                </div>

                <div className="bill-item">

                    <span>

                        Delivery

                    </span>

                    <span>

                        {

                            deliveryCharge === 0

                                ?

                                "FREE"

                                :

                                `₹${deliveryCharge}`

                        }

                    </span>

                </div>

                <div className="bill-item">

                    <span>

                        Discount

                    </span>

                    <span>

                        -₹{discountAmount}

                    </span>

                </div>

                <hr />

                <div className="bill-total">

                    <span>

                        Total

                    </span>

                    <span>

                        ₹{

                            discountAmount > 0

                                ?

                                finalTotal.toFixed(2)

                                :

                                calculatedTotal.toFixed(2)

                        }

                    </span>

                </div>



                <div>    <button

                    className="checkout"

                    onClick={() => navigate("/checkout")}

                >

                    Proceed to Checkout

                </button>


                </div>





            </div>

        </div>

    );

}

export default Cart;