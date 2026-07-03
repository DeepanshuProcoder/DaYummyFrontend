import "../../styles/AdminCoupons.css";

import { useState, useEffect } from "react";

import axios from "axios";

function AdminCoupons() {

    const [coupons, setCoupons] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [showForm, setShowForm] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;

    const [editingCoupon, setEditingCoupon] = useState(null);

    const [formData, setFormData] = useState({

        code: "",

        discountType: "Flat",

        discountValue: "",

        maximumDiscount: "",

        minimumOrder: "",

        active: true,

        firstOrderOnly: false,

        firstThreeOrders: false,

        maximumUsesPerUser: 1,

        totalUsageLimit: "",

        category: "All",

        paymentMethod: "All",

        expiryDate: "",

        startTime: "",

        endTime: "",

        weekendOnly: false,

        description: ""

    });

    useEffect(() => {

        fetchCoupons();

    }, []);

    const fetchCoupons = async () => {

        try {

            const res = await axios.get(

                `${API_URL}/api/coupons`

            );

            setCoupons(

                res.data.coupons

            );

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };
    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData({

            ...formData,

            [name]:

                type === "checkbox"

                    ? checked

                    : value

        });

    };

    const filteredCoupons = coupons.filter(coupon =>

        coupon.code

            .toLowerCase()

            .includes(search.toLowerCase())

    );

    return (

        <div className="admin-coupons">

            <div className="coupon-header">

                <h1>

                    🎟 Coupon Management

                </h1>

                <div className="header-right">

                    <input

                        type="text"

                        placeholder="Search Coupon..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                        className="coupon-search"

                    />

                    <button

                        className="add-coupon-btn"

                        onClick={() => {

                            setEditingCoupon(null);

                            setShowForm(true);

                        }}

                    >

                        + Add Coupon

                    </button>

                </div>

            </div>

            {

                loading

                    ?

                    <h2>

                        Loading Coupons...

                    </h2>

                    :

                    <table className="coupon-table">

                        <thead>

                            <tr>

                                <th>Code</th>

                                <th>Type</th>

                                <th>Discount</th>

                                <th>Minimum Order</th>

                                <th>Status</th>

                                <th>Used</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredCoupons.map(coupon => (

                                    <tr

                                        key={coupon._id}

                                    >

                                        <td>

                                            {coupon.code}

                                        </td>

                                        <td>

                                            {

                                                coupon.discountType

                                            }

                                        </td>

                                        <td>

                                            {

                                                coupon.discountType === "Flat"

                                                    ?

                                                    `₹${coupon.discountValue}`

                                                    :

                                                    `${coupon.discountValue}%`

                                            }

                                        </td>

                                        <td>

                                            ₹{coupon.minimumOrder}

                                        </td>

                                        <td>

                                            {

                                                coupon.active

                                                    ?

                                                    <span className="active">

                                                        Active

                                                    </span>

                                                    :

                                                    <span className="inactive">

                                                        Disabled

                                                    </span>

                                            }

                                        </td>

                                        <td>

                                            {

                                                coupon.usedCount

                                            }

                                        </td>

                                        <td>
                                            <button

                                                className="edit-btn"

                                                onClick={() => {

                                                    setEditingCoupon(coupon);

                                                    setFormData({

                                                        ...coupon,

                                                        expiryDate:

                                                            coupon.expiryDate

                                                                ?

                                                                coupon.expiryDate.substring(0, 10)

                                                                :

                                                                ""

                                                    });

                                                    setShowForm(true);

                                                }}

                                            >

                                                ✏ Edit

                                            </button>

                                            <button

                                                className="toggle-btn"

                                                onClick={async () => {

                                                    try {

                                                        await axios.put(

                                                            `${API_URL}/api/coupons/toggle/${coupon._id}`

                                                        );

                                                        fetchCoupons();

                                                    }

                                                    catch (err) {

                                                        console.log(err);

                                                    }

                                                }}

                                            >

                                                {

                                                    coupon.active

                                                        ?

                                                        "Disable"

                                                        :

                                                        "Enable"

                                                }

                                            </button>

                                            <button

                                                className="delete-btn"

                                                onClick={async () => {

                                                    if (

                                                        !window.confirm(

                                                            "Delete this coupon?"

                                                        )

                                                    ) return;

                                                    try {

                                                        await axios.delete(

                                                            `${API_URL}/api/coupons/${coupon._id}`

                                                        );

                                                        fetchCoupons();

                                                    }

                                                    catch (err) {

                                                        console.log(err);

                                                    }

                                                }}

                                            >

                                                🗑 Delete

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

            }

            {

                showForm && (

                    <div className="coupon-modal">

                        <div className="coupon-form">

                            <h2>

                                {

                                    editingCoupon

                                        ?

                                        "Edit Coupon"

                                        :

                                        "Add Coupon"

                                }

                            </h2>
                            <div className="form-grid">

                                <input

                                    name="code"

                                    placeholder="Coupon Code"

                                    value={formData.code}

                                    onChange={handleChange}

                                />

                                <select

                                    name="discountType"

                                    value={formData.discountType}

                                    onChange={handleChange}

                                >

                                    <option>

                                        Flat

                                    </option>

                                    <option>

                                        Percentage

                                    </option>

                                </select>

                                <input

                                    type="number"

                                    name="discountValue"

                                    placeholder="Discount"

                                    value={formData.discountValue}

                                    onChange={handleChange}

                                />

                                <input

                                    type="number"

                                    name="maximumDiscount"

                                    placeholder="Maximum Discount"

                                    value={formData.maximumDiscount}

                                    onChange={handleChange}

                                />

                                <input

                                    type="number"

                                    name="minimumOrder"

                                    placeholder="Minimum Order"

                                    value={formData.minimumOrder}

                                    onChange={handleChange}

                                />

                                <input

                                    type="number"

                                    name="maximumUsesPerUser"

                                    placeholder="Maximum Uses Per User"

                                    value={formData.maximumUsesPerUser}

                                    onChange={handleChange}

                                />

                                <input

                                    type="number"

                                    name="totalUsageLimit"

                                    placeholder="Total Usage Limit"

                                    value={formData.totalUsageLimit}

                                    onChange={handleChange}

                                />

                                <input

                                    type="date"

                                    name="expiryDate"

                                    value={formData.expiryDate}

                                    onChange={handleChange}

                                />

                                <input

                                    type="time"

                                    name="startTime"

                                    value={formData.startTime}

                                    onChange={handleChange}

                                />

                                <input

                                    type="time"

                                    name="endTime"

                                    value={formData.endTime}

                                    onChange={handleChange}

                                />
                                <select

                                    name="category"

                                    value={formData.category}

                                    onChange={handleChange}

                                >

                                    <option value="All">

                                        All Categories

                                    </option>

                                    <option value="Pizza">

                                        Pizza

                                    </option>

                                    <option value="Burger">

                                        Burger

                                    </option>

                                    <option value="Drinks">

                                        Drinks

                                    </option>

                                    <option value="Dessert">

                                        Dessert

                                    </option>

                                    <option value="Special">

                                        Special

                                    </option>

                                </select>

                                <select

                                    name="paymentMethod"

                                    value={formData.paymentMethod}

                                    onChange={handleChange}

                                >

                                    <option value="All">

                                        All Payment Methods

                                    </option>

                                    <option value="Cash On Delivery">

                                        Cash On Delivery

                                    </option>

                                    <option value="UPI">

                                        UPI

                                    </option>

                                    <option value="Credit Card">

                                        Credit Card

                                    </option>

                                    <option value="Debit Card">

                                        Debit Card

                                    </option>

                                </select>

                                <textarea

                                    name="description"

                                    placeholder="Coupon Description"

                                    value={formData.description}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="checkbox-grid">

                                <label>

                                    <input

                                        type="checkbox"

                                        name="active"

                                        checked={formData.active}

                                        onChange={handleChange}

                                    />

                                    Active

                                </label>

                                <label>

                                    <input

                                        type="checkbox"

                                        name="firstOrderOnly"

                                        checked={formData.firstOrderOnly}

                                        onChange={handleChange}

                                    />

                                    First Order Only

                                </label>

                                <label>

                                    <input

                                        type="checkbox"

                                        name="firstThreeOrders"

                                        checked={formData.firstThreeOrders}

                                        onChange={handleChange}

                                    />

                                    First 3 Orders

                                </label>

                                <label>

                                    <input

                                        type="checkbox"

                                        name="weekendOnly"

                                        checked={formData.weekendOnly}

                                        onChange={handleChange}

                                    />

                                    Weekend Only

                                </label>

                            </div>

                            <div className="coupon-buttons">

                                <button

                                    className="save-btn"

                                    onClick={async () => {

                                        try {

                                            if (editingCoupon) {

                                                await axios.put(

                                                    `${API_URL}/api/coupons/${editingCoupon._id}`,

                                                    formData

                                                );

                                            }

                                            else {

                                                await axios.post(

                                                    `${API_URL}/api/coupons`,

                                                    formData

                                                );

                                            }

                                            setShowForm(false);

                                            fetchCoupons();

                                        }

                                        catch (err) {

                                            console.log(err);

                                            alert(

                                                err.response?.data?.message ||

                                                "Unable to save coupon."

                                            );

                                        }

                                    }}

                                >

                                    {

                                        editingCoupon

                                            ?

                                            "Update Coupon"

                                            :

                                            "Create Coupon"

                                    }

                                </button>

                                <button

                                    className="cancel-btn"

                                    onClick={() => {

                                        setShowForm(false);

                                        setEditingCoupon(null);

                                    }}

                                >

                                    Cancel

                                </button>

                            </div>

                        </div>

                    </div>

                )

            }

        </div>

    );

}

export default AdminCoupons;