import "../styles/Checkout.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout({ cart, setCart }) {

    const navigate = useNavigate();

    const [phone, setPhone] = useState("");

    const [address, setAddress] = useState("");

    const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
    // Coupon States

    const [couponCode, setCouponCode] = useState("");

    const [availableCoupons, setAvailableCoupons] = useState([]);

    const [couponApplied, setCouponApplied] = useState(false);

    const [appliedCoupon, setAppliedCoupon] = useState(null);

    const [discountAmount, setDiscountAmount] = useState(0);

    const [couponMessage, setCouponMessage] = useState("");

    const [loadingCoupons, setLoadingCoupons] = useState(true);

    const [finalTotal, setFinalTotal] = useState(0);
const [placingOrder, setPlacingOrder] = useState(false);
    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const sgst = subtotal * 0.025;

    const cgst = subtotal * 0.025;

    const deliveryCharge =
        subtotal >= 499 ? 0 : 40;

    const total =
        subtotal +
        sgst +
        cgst +
        deliveryCharge;
    const categories = [

        ...new Set(

            cart.map(item => item.category)

        )

    ];
    useEffect(() => {

        fetchCoupons();

    }, []);
    const fetchCoupons = async () => {

        try {

            const res = await axios.get(

                "http://localhost:5000/api/coupons/available"

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
    const applyCoupon = async (selectedCoupon = couponCode) => {

        if (!selectedCoupon || selectedCoupon.trim() === "") {

            alert("Enter Coupon Code.");

            return;

        }

        try {

            const res = await axios.post(

                "http://localhost:5000/api/coupons/validate",

                {

                    code: selectedCoupon,

                    userId: localStorage.getItem("userId"),

                    cartTotal: total,

                    paymentMethod,

                    categories

                }

            );

            setAppliedCoupon(res.data.coupon);

            setCouponApplied(true);

            setCouponCode(res.data.coupon.code);

            setDiscountAmount(res.data.discount);

            setFinalTotal(res.data.newTotal);

            setCouponMessage("✅ Coupon Applied Successfully");

        }

        catch (err) {

            console.log(err);

            alert(

                err.response?.data?.message ||

                "Invalid Coupon"

            );

        }

    };
    const removeCoupon = () => {

        setAppliedCoupon(null);

        setCouponApplied(false);

        setCouponCode("");

        setDiscountAmount(0);

        setFinalTotal(0);

        setCouponMessage("");

    };
    const placeOrder = async () => {

    if (!localStorage.getItem("token")) {

        alert("Please login first.");

        navigate("/login");

        return;

    }

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    if (phone.trim() === "") {

        alert("Please enter phone number.");

        return;

    }

    if (address.trim() === "") {

        alert("Please enter delivery address.");

        return;

    }

    try {

        setPlacingOrder(true);

        const orderData = {

            user: localStorage.getItem("userId"),

            customerName: JSON.parse(localStorage.getItem("user")).fullName,

            phone,

            address,

            items: cart.map(item => ({

                productId: item.productId || item._id,

                name: item.name,

                image: item.image,

                price: item.price,

                quantity: item.quantity

            })),

            totalPrice: payableTotal,

            paymentMethod,

            couponCode: appliedCoupon?.code || "",

            discount: discountAmount

        };

        const res = await axios.post(

            "http://localhost:5000/api/orders",

            orderData

        );

        alert(res.data.message);

        setCart([]);

        localStorage.removeItem("cart");

        navigate("/orders");

    }

    catch (err) {

        console.log(err);

        alert(

            err.response?.data?.message ||

            "Unable to place order."

        );

    }

    finally {

        setPlacingOrder(false);

    }

};
    const payableTotal =

        couponApplied

            ? finalTotal

            : total;

    return (

        <div className="checkout-page">

            <h1>

                🍕 Checkout

            </h1>

            <div className="checkout-container">

                {/* LEFT */}

                <div className="checkout-left">

                    <div className="input-group">

                        <label>

                            📞 Phone Number

                        </label>

                        <input

                            type="text"

                            value={phone}

                            onChange={(e) =>
                                setPhone(e.target.value)
                            }

                            placeholder="Enter Phone Number"

                        />

                    </div>

                    <div className="input-group">

                        <label>

                            📍 Delivery Address

                        </label>

                        <textarea

                            value={address}

                            onChange={(e) =>
                                setAddress(e.target.value)
                            }

                            placeholder="Flat No, Area, Landmark..."

                        />

                    </div>

                    <div className="coupon-section">

                        <label className="coupon-heading">

                            🎟 Apply Coupon

                        </label>

                        <div className="coupon-input-row">

                            <input

                                className="coupon-input"

                                type="text"

                                placeholder="Enter Coupon Code"

                                value={couponCode}

                                onChange={(e) => setCouponCode(e.target.value)}

                            />

                            <button

                                className="coupon-apply-btn"

                                disabled={couponApplied}

                                onClick={() => applyCoupon()}

                            >

                                {

                                    couponApplied

                                        ?

                                        "Applied ✓"

                                        :

                                        "Apply"

                                }

                            </button>

                        </div>

                        {

                            appliedCoupon &&

                            <div className="applied-coupon">

                                <div>

                                    <strong>

                                        🎉 {appliedCoupon.code}

                                    </strong>

                                    <p>

                                        Coupon Applied Successfully

                                    </p>

                                </div>

                                <button

                                    className="remove-coupon-btn"

                                    onClick={removeCoupon}

                                >

                                    ✕

                                </button>

                            </div>

                        }

                        {

                            couponMessage &&

                            <div className="coupon-message">

                                {couponMessage}

                            </div>

                        }

                        <div className="available-coupons">

                            <h3>

                                Available Coupons

                            </h3>

                            {

                                loadingCoupons

                                    ?

                                    <p>

                                        Loading...

                                    </p>

                                    :

                                    availableCoupons.map(coupon => (

                                        <div

                                            className="coupon-card"

                                            key={coupon._id}

                                        >

                                            <div className="coupon-left">

                                                <h4>

                                                    {coupon.code}

                                                </h4>

                                                <p>

                                                    {

                                                        coupon.discountType === "Flat"

                                                            ?

                                                            `₹${coupon.discountValue} OFF`

                                                            :

                                                            `${coupon.discountValue}% OFF`

                                                    }

                                                </p>

                                                <small>

                                                    Minimum ₹{coupon.minimumOrder}

                                                </small>

                                            </div>

                                            <button

                                                className="coupon-card-btn"

                                                disabled={couponApplied}

                                                onClick={() => {

                                                    setCouponCode(coupon.code);

                                                    applyCoupon(coupon.code);

                                                }}

                                            >

                                                {

                                                    appliedCoupon?.code === coupon.code

                                                        ?

                                                        "Applied"

                                                        :

                                                        "Apply"

                                                }

                                            </button>

                                        </div>

                                    ))

                            }

                        </div>

                    </div>

                    <div className="input-group">

                        <label>

                            💳 Payment Method

                        </label>

                        <select

                            value={paymentMethod}

                            onChange={(e) =>

                                setPaymentMethod(e.target.value)

                            }

                        >

                            <option>

                                Cash On Delivery

                            </option>

                            <option>

                                UPI

                            </option>

                            <option>

                                Credit Card

                            </option>

                            <option>

                                Debit Card

                            </option>

                        </select>

                    </div>

                </div>

                {/* RIGHT */}

                <div className="checkout-right">

                    <h2>

                        Order Summary

                    </h2>

                    {

                        cart.map(item => (
                            

                            <div

                                className="summary-item"

                                key={item.productId || item._id}

                            >

                                <img

                                    src={`http://localhost:5000/uploads/products/${item.image}`}

                                    alt={item.name}

                                />

                                <div>

                                    <h4>

                                        {item.name}

                                    </h4>

                                    <p>

                                        Qty : {item.quantity}

                                    </p>

                                </div>

                                <span>

                                    ₹{item.price * item.quantity}

                                </span>

                            </div>

                        ))

                    }

                    <hr />

                    <div className="bill-row">

                        <span>

                            Subtotal

                        </span>

                        <span>

                            ₹{subtotal.toFixed(2)}

                        </span>

                    </div>

                    <div className="bill-row">

                        <span>

                            SGST

                        </span>

                        <span>

                            ₹{sgst.toFixed(2)}

                        </span>

                    </div>

                    <div className="bill-row">

                        <span>

                            CGST

                        </span>

                        <span>

                            ₹{cgst.toFixed(2)}

                        </span>

                    </div>

                    <div className="bill-row">

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
                    {

                        discountAmount > 0 &&

                        <div className="bill-row">

                            <span>

                                Coupon Discount

                            </span>

                            <span style={{ color: "#16a34a" }}>

                                -₹{discountAmount}

                            </span>

                        </div>

                    }

                    <hr />

                    <div className="bill-total">




                        ₹{

                            couponApplied

                                ?

                                finalTotal.toFixed(2)

                                :

                                total.toFixed(2)

                        }



                        <span>

                            ₹{total.toFixed(2)}

                        </span>

                    </div>
                    {

                        discountAmount > 0 &&

                        <p

                            className="saved-money"

                        >

                            🎉 You Saved ₹{discountAmount}

                        </p>

                    }

                   <button

    className="place-order-btn"

    onClick={placeOrder}

    disabled={placingOrder}

>

    {

        placingOrder

            ?

            "⏳ Placing Order..."

            :

            "🍕 Place Order"

    }

</button>

                    <button

                        className="back-btn"

                        onClick={() => navigate("/cart")}

                    >

                        ← Back to Cart

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Checkout;