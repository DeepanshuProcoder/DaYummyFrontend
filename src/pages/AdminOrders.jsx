import "../styles/AdminOrders.css";
import { useState, useEffect } from "react";
import axios from "axios";

function AdminOrders() {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchOrders();

    }, []);

    const fetchOrders = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/orders"
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

    const updateStatus = async (id, status) => {

        try {

            await axios.put(

                `http://localhost:5000/api/orders/${id}`,

                {

                    orderStatus: status

                }

            );

            fetchOrders();

        }

        catch (err) {

            console.log(err);

        }

    };
    const deleteOrder = async (id) => {

        const ok = window.confirm(

            "Delete this cancelled order permanently?"

        );

        if (!ok) return;

        try {

            const res = await axios.delete(

                `http://localhost:5000/api/orders/${id}`

            );

            alert(res.data.message);

            fetchOrders();

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Unable to delete order."

            );

        }

    }
    return (

        <div className="admin-orders-container">

            <h1 className="orders-heading">

                🍕 Customer Orders

            </h1>

            {

                loading ?

                    (

                        <h2>

                            Loading Orders...

                        </h2>

                    )

                    :

                    orders.length === 0 ?

                        (

                            <h2>

                                No Orders Found

                            </h2>

                        )

                        :

                        (

                            orders.map(order => (

                                <div

                                    className="order-card"

                                    key={order._id}

                                >

                                    <div className="order-header">

                                        <div>

                                            <h2>

                                                {order.orderId}

                                            </h2>

                                            <p>

                                                Customer :

                                                {

                                                    order.user?.fullName ||

                                                    "Unknown User"

                                                }

                                            </p>

                                            <p>

                                                Email :

                                                {

                                                    order.user?.email ||

                                                    "-"

                                                }

                                            </p>

                                            <p>

                                                Phone :

                                                {

                                                    order.phone ||

                                                    "-"

                                                }

                                            </p>

                                        </div>

                                        <div>

                                            <h3>

                                                ₹{order.totalPrice}

                                            </h3>

                                            <p>

                                                {order.paymentMethod}

                                            </p>

                                            <p>

                                                {

                                                    new Date(

                                                        order.createdAt

                                                    ).toLocaleString()

                                                }

                                            </p>

                                        </div>

                                    </div>

                                    <div className="address-box">

                                        <strong>

                                            Delivery Address

                                        </strong>

                                        <p>

                                            {order.address || "No Address"}

                                        </p>

                                    </div>

                                    <div className="ordered-items">

                                        {

                                            order.items.map(item => (

                                                <div

                                                    className="ordered-item"

                                                    key={item.productId}

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

                                                            Qty :

                                                            {item.quantity}

                                                        </p>

                                                        <p>

                                                            ₹{item.price}

                                                        </p>

                                                    </div>

                                                </div>

                                            ))

                                        }

                                    </div>
                                    <div className="status-section">

                                        <label>

                                            Order Status

                                        </label>

                                        <select

                                            value={order.orderStatus}

                                            onChange={(e) =>

                                                updateStatus(

                                                    order._id,

                                                    e.target.value

                                                )

                                            }

                                        >

                                            <option value="Pending">

                                                Pending

                                            </option>

                                            <option value="Preparing">

                                                Preparing

                                            </option>

                                            <option value="Out For Delivery">

                                                Out For Delivery

                                            </option>

                                            <option value="Delivered">

                                                Delivered

                                            </option>

                                            <option value="Cancelled">

                                                Cancelled

                                            </option>

                                        </select>

                                    </div>
                                    {
                                        order.orderStatus === "Cancelled" && (

                                            <button
                                                className="delete-order-btn"
                                                onClick={() => deleteOrder(order._id)}
                                            >
                                                🗑 Delete Order
                                            </button>

                                        )
                                    }

                                </div>

                            ))

                        )

            }

        </div>

    );

}

export default AdminOrders;