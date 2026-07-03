import axios from "axios";
import { useEffect, useState } from "react";
import "../../styles/RecentOrders.css";


function RecentOrders() {

    const [recentOrders, setRecentOrders] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {

        fetchRecentOrders();

    }, []);

    const fetchRecentOrders = async () => {

        try {

            const res = await axios.get(

                `${API_URL}/api/orders`

            );

            const latestOrders = res.data.orders

                .sort(

                    (a, b) =>

                        new Date(b.createdAt) -

                        new Date(a.createdAt)

                )

                .slice(0, 5);

            setRecentOrders(latestOrders);

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="recent-orders">

            <h2>

                Recent Orders

            </h2>

            <table className="dashboard-table">

                <thead>

                    <tr>

                        <th>Order ID</th>

                        <th>Customer</th>

                        <th>Items</th>

                        <th>Total</th>

                        <th>Status</th>

                        <th>Time</th>

                    </tr>

                </thead>

                <tbody>
                    {

                        recentOrders.map((order) => (

                            <tr key={order._id}>

                                <td>

                                    {order.orderId}

                                </td>

                                <td>

                                    {order.customerName}

                                </td>

                                <td>

                                    {

                                        order.items

                                            .map(item => item.name)

                                            .join(", ")

                                    }

                                </td>

                                <td>

                                    ₹{order.totalPrice}

                                </td>

                                <td>

                                    <span

                                        className={`status ${order.orderStatus

                                            .toLowerCase()

                                            .replace(/ /g, "-")}`}

                                    >

                                        {order.orderStatus}

                                    </span>

                                </td>

                                <td>

                                    {

                                        new Date(order.createdAt)

                                            .toLocaleTimeString([], {

                                                hour: "2-digit",

                                                minute: "2-digit"

                                            })

                                    }

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default RecentOrders;