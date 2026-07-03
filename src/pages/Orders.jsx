import "../styles/Orders.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Orders() {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const [currentTime, setCurrentTime] = useState(Date.now());

    const token = localStorage.getItem("token");

    const role = localStorage.getItem("role");

    const userId = localStorage.getItem("userId");

    useEffect(() => {

        const timer = setInterval(() => {

            setCurrentTime(Date.now());

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    useEffect(() => {

        if (!token) {

            navigate("/login");

            return;

        }

        if (role !== "user") {

            navigate("/");

            return;

        }

        fetchOrders();

    }, []);

    const fetchOrders = async () => {

        try {

            const res = await axios.get(

                `http://localhost:5000/api/orders/my/${userId}`

            );

            setOrders(res.data.orders);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    const cancelOrder = async (id) => {

        try {

            const res = await axios.put(

                `http://localhost:5000/api/orders/cancel/${id}`

            );

            alert(res.data.message);

            fetchOrders();

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Unable to cancel order."

            );

        }

    };

    const getRemainingTime = (cancelUntil) => {

        if (!cancelUntil) return null;

        const remaining = Math.floor(

            (new Date(cancelUntil).getTime() - currentTime) / 1000

        );

        if (remaining <= 0) return null;

        const minutes = Math.floor(remaining / 60);

        const seconds = remaining % 60;

        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    };

    const getStatusColor = (status) => {

        switch (status) {

            case "Pending":

                return "#f59e0b";

            case "Preparing":

                return "#3b82f6";

            case "Out For Delivery":

                return "#8b5cf6";

            case "Delivered":

                return "#22c55e";

            case "Cancelled":

                return "#ef4444";

            default:

                return "#6b7280";

        }

    };

    if (loading) {

        return (

            <div className="orders-loading">

                <h1>Loading Orders...</h1>

            </div>

        );

    }
    return (

    <div className="orders-page">

        <div className="orders-header">

            <h1>

                📦 My Orders

            </h1>

            <p>

                View all your previous and current orders.

            </p>

        </div>

        {

            orders.length === 0 ?

            (

                <div className="no-orders">

                    <h2>

                        No Orders Yet 😔

                    </h2>

                    <p>

                        Start ordering your favourite food.

                    </p>

                    <button

                        className="browse-food-btn"

                        onClick={() => navigate("/menu")}

                    >

                        Browse Menu

                    </button>

                </div>

            )

            :

            (

                <div className="orders-container">

                    {

                        orders.map(order => (

                            <div

                                className="order-card"

                                key={order._id}

                            >

                                <div className="order-top">

                                    <div>

                                        <h2>

                                            {order.orderId}

                                        </h2>

                                        <p>

                                            {

                                                new Date(

                                                    order.createdAt

                                                ).toLocaleString()

                                            }

                                        </p>

                                    </div>

                                    <div

                                        className="status-badge"

                                        style={{

                                            background:

                                                getStatusColor(

                                                    order.orderStatus

                                                )

                                        }}

                                    >

                                        {order.orderStatus}

                                    </div>

                                </div>

                                {

                                    order.orderStatus === "Pending" &&

                                    getRemainingTime(order.cancelUntil) &&

                                    (

                                        <div className="cancel-section">

                                            <button

                                                className="cancel-order-btn"

                                                onClick={() =>

                                                    cancelOrder(order._id)

                                                }

                                            >

                                                ❌ Cancel Order

                                            </button>

                                            <p className="cancel-timer">

                                                Cancellation closes in

                                                <strong>

                                                    {" "}

                                                    {

                                                        getRemainingTime(

                                                            order.cancelUntil

                                                        )

                                                    }

                                                </strong>

                                            </p>

                                        </div>

                                    )

                                }

                                {

                                    order.orderStatus === "Pending" &&

                                    !getRemainingTime(order.cancelUntil) &&

                                    (

                                        <p className="cancel-expired">

                                            ⏰ Cancellation period has expired.

                                        </p>

                                    )

                                }

                                <hr />

                                <div className="order-items">

                                    {

                                        order.items.map(item => (

                                            <div

                                                className="order-item"

                                                key={item.productId}

                                            >

                                                <img

                                                    src={`http://localhost:5000/uploads/products/${item.image}`}

                                                    alt={item.name}

                                                />

                                                <div className="item-details">

                                                    <h3>

                                                        {item.name}

                                                    </h3>

                                                    <p>

                                                        ₹{item.price}

                                                        ×

                                                        {item.quantity}

                                                    </p>

                                                </div>

                                                <h4>

                                                    ₹{

                                                        item.price *

                                                        item.quantity

                                                    }

                                                </h4>

                                            </div>

                                        ))

                                    }

                                </div>
                                                                <hr />

                                <div className="order-bottom">

                                    <div>

                                        <strong>

                                            Payment Method

                                        </strong>

                                        <p>

                                            {order.paymentMethod}

                                        </p>

                                    </div>

                                    <div>

                                        <strong>

                                            Total Amount

                                        </strong>

                                        <p>

                                            ₹{Number(order.totalPrice).toFixed(2)}

                                        </p>

                                    </div>

                                </div>

                                <hr />

                                <div className="customer-details">

                                    <div>

                                        <strong>

                                            Customer

                                        </strong>

                                        <p>

                                            {order.customerName}

                                        </p>

                                    </div>

                                    <div>

                                        <strong>

                                            Phone

                                        </strong>

                                        <p>

                                            {order.phone}

                                        </p>

                                    </div>

                                </div>

                                <div className="customer-details">

                                    <div className="address-box-order">

                                        <strong>

                                            Delivery Address

                                        </strong>

                                        <p>

                                            {order.address}

                                        </p>

                                    </div>

                                </div>

                                <hr />

                                <div className="order-footer">

                                    <div>

                                        <strong>

                                            Total Items

                                        </strong>

                                        <p>

                                            {

                                                order.items.reduce(

                                                    (sum, item) =>

                                                        sum + item.quantity,

                                                    0

                                                )

                                            }

                                        </p>

                                    </div>

                                    <div>

                                        <strong>

                                            Estimated Delivery

                                        </strong>

                                        <p>

                                            {

                                                order.orderStatus === "Delivered"

                                                ?

                                                "Completed"

                                                :

                                                "30-45 Minutes"

                                            }

                                        </p>

                                    </div>

                                </div>

                                <button

                                    className="reorder-btn"

                                    onClick={() => navigate("/menu")}

                                >

                                    🍕 Order Again

                                </button>

                            </div>

                        ))

                    }

                </div>

            )

        }

    </div>

);

}

export default Orders;