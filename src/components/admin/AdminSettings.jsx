import "../../styles/AdminSettings.css";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

function AdminSettings() {
    const [currentPassword, setCurrentPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");
    const [deliveryCharge, setDeliveryCharge] = useState(40);

    const [freeDeliveryAbove, setFreeDeliveryAbove] = useState(499);

    const [estimatedTime, setEstimatedTime] = useState(30);

const API_URL = import.meta.env.VITE_API_URL;

    const [autoAccept, setAutoAccept] = useState(false);
    const [acceptOrders, setAcceptOrders] = useState(true);

    const [autoAcceptOrders, setAutoAcceptOrders] = useState(false);

    const [maximumOrders, setMaximumOrders] = useState(100);

    const [savingDelivery, setSavingDelivery] = useState(false);
    const [cancelTime, setCancelTime] = useState(60);

    const [allowCOD, setAllowCOD] = useState(true);

    const [allowOnline, setAllowOnline] = useState(true);

    const [autoConfirm, setAutoConfirm] = useState(false);

    const [minimumOrder, setMinimumOrder] = useState(99);

    const [maxOrders, setMaxOrders] = useState(100);

    const [savingOrders, setSavingOrders] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);

const [newOrderNotification, setNewOrderNotification] = useState(true);

const [soundNotification, setSoundNotification] = useState(true);

const [desktopNotification, setDesktopNotification] = useState(false);

const [lowStockNotification, setLowStockNotification] = useState(true);

const [savingNotifications, setSavingNotifications] = useState(false);

    const changePassword = async () => {

        if (!currentPassword || !newPassword || !confirmPassword) {

            alert("Please fill all fields.");

            return;

        }

        try {

            setLoading(true);


            const res = await axios.put(

                `${API_URL}/api/settings/change-password`,

                {

                    userId: localStorage.getItem("userId"),

                    currentPassword,

                    newPassword,

                    confirmPassword

                }

            );



            setCurrentPassword("");

            setNewPassword("");

            setConfirmPassword("");

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Unable to change password."

            );

        }

        finally {

            setLoading(false);

        }

    };
    const [showCurrent, setShowCurrent] = useState(false);

    const [showNew, setShowNew] = useState(false);

    const [showConfirm, setShowConfirm] = useState(false);




    const token = localStorage.getItem("token");

    const [admin, setAdmin] = useState({

        fullName: "",

        email: "",

        mobile: "",

        profileImage: ""

    });

    const [image, setImage] = useState(null);

    useEffect(() => {

        fetchProfile();

        fetchOrderSettings();

    }, []);

    const fetchProfile = async () => {

        try {
            console.log("Token:", token);

            const res = await axios.get(

                `${API_URL}/api/settings/profile`,

                {

                    headers: {

                        Authorization: token

                    }

                }

            );

            setAdmin(res.data.admin);

        }

        catch (err) {

            console.log(err);

        }

    };

    const handleChange = (e) => {

        setAdmin({

            ...admin,

            [e.target.name]: e.target.value

        });

    };

    const updateProfile = async () => {

        try {

            const formData = new FormData();

            formData.append(

                "fullName",

                admin.fullName

            );

            formData.append(

                "mobile",

                admin.mobile

            );

            if (image) {

                formData.append(

                    "profileImage",

                    image

                );

            }

            const res = await axios.put(

                `${API_URL}/api/settings/profile`,

                formData,

                {

                    headers: {

                        Authorization: token,

                        "Content-Type":

                            "multipart/form-data"

                    }

                }

            );

            alert(res.data.message);

            fetchProfile();

        }


        catch (err) {

            console.log(err);



        }

    };
    const fetchOrderSettings = async () => {

        try {

            const res = await axios.get(

                `${API_URL}/api/settings/orders`

            );

            const settings = res.data.settings;

            setCancelTime(settings.cancelTime);

            setAllowCOD(settings.allowCOD);

            setAllowOnline(settings.allowOnline);

            setAutoConfirm(settings.autoConfirm);

            setMinimumOrder(settings.minimumOrder);

            setMaxOrders(settings.maxOrders);

        }

        catch (err) {

            console.log(err);

        }

    };
    const saveOrderSettings = async () => {

        try {

            setSavingOrders(true);

            const res = await axios.put(

                `${API_URL}/api/settings/orders`,

                {

                    cancelTime,

                    allowCOD,

                    allowOnline,

                    autoConfirm,

                    minimumOrder,

                    maxOrders

                }

            );

            alert(res.data.message);

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Unable to save settings."

            );

        }

        finally {

            setSavingOrders(false);

        }

    };

    return (

        <div className="admin-settings">

            {/* ================= HEADER ================= */}

            <div className="settings-header">

                <h1>

                    ⚙ Admin Settings

                </h1>

                <p>

                    Manage your profile, security and restaurant settings.

                </p>

            </div>

            {/* ================= TOP TABS ================= */}

            <div className="settings-tabs">

                <button

                    className={`tab-btn ${activeTab === "profile" ? "active-tab" : ""}`}

                    onClick={() => setActiveTab("profile")}

                >

                    👤 Profile

                </button>

                <button

                    className={`tab-btn ${activeTab === "security" ? "active-tab" : ""}`}

                    onClick={() => setActiveTab("security")}

                >

                    🔒 Security

                </button>

                <button

                    className={`tab-btn ${activeTab === "delivery" ? "active-tab" : ""}`}

                    onClick={() => setActiveTab("delivery")}

                >

                    🚚 Delivery

                </button>

                <button

                    className={`tab-btn ${activeTab === "orders" ? "active-tab" : ""}`}

                    onClick={() => setActiveTab("orders")}

                >

                    📦 Orders

                </button>

                <button

                    className={`tab-btn ${activeTab === "notifications" ? "active-tab" : ""}`}

                    onClick={() => setActiveTab("notifications")}

                >

                    🔔 Notifications

                </button>

           

            </div>

            {/* ================= MAIN GRID ================= */}

            <div className="settings-grid">

                {/* ================= PROFILE ================= */}

                {

                    activeTab === "profile" &&

                    <div className="settings-card">

                        <h2>

                            👤 Admin Profile

                        </h2>

                        <p>

                            Update your administrator information.

                        </p>
                        {/* ================= PROFILE IMAGE ================= */}

                        <div className="profile-image">

                            {

                                admin.profileImage ?

                                    <img

                                        src={`${API_URL}/${admin.profileImage}`}

                                        alt="Admin"

                                    />

                                    :

                                    <div className="profile-placeholder">

                                        👤

                                    </div>

                            }

                        </div>

                        <label className="upload-btn">

                            📷 Change Profile Photo

                            <input

                                type="file"

                                hidden

                                onChange={(e) => setImage(e.target.files[0])}

                            />

                        </label>

                        <div className="input-group">

                            <label>

                                Full Name

                            </label>

                            <input

                                type="text"

                                name="fullName"

                                value={admin.fullName}

                                onChange={handleChange}

                                placeholder="Enter Full Name"

                            />

                        </div>

                        <div className="input-group">

                            <label>

                                Email Address

                            </label>

                            <input

                                type="email"

                                value={admin.email}

                                disabled

                            />

                        </div>

                        <div className="input-group">

                            <label>

                                Mobile Number

                            </label>

                            <input

                                type="text"

                                name="mobile"

                                value={admin.mobile}

                                onChange={handleChange}

                                placeholder="Enter Mobile Number"

                            />

                        </div>

                        <button

                            className="save-btn"

                            onClick={updateProfile}

                        >

                            💾 Save Profile

                        </button>

                    </div>
                }

                {/* ================= SECURITY CARD ================= */}

                {

                    activeTab === "security" &&

                    <div className="security-card">

                        <h2>

                            🔒 Security

                        </h2>

                        <p>

                            Protect your administrator account by changing your password.

                        </p>
                        <div className="setting-group">

                            <label>

                                Current Password

                            </label>

                            <div className="password-box">

                                <input

                                    type={showCurrent ? "text" : "password"}

                                    value={currentPassword}

                                    onChange={(e) => setCurrentPassword(e.target.value)}

                                    placeholder="Enter Current Password"

                                />

                                <span

                                    onClick={() => setShowCurrent(!showCurrent)}

                                >

                                    {

                                        showCurrent

                                            ?

                                            <FaEyeSlash />

                                            :

                                            <FaEye />

                                    }

                                </span>

                            </div>

                        </div>

                        <div className="setting-group">

                            <label>

                                New Password

                            </label>

                            <div className="password-box">

                                <input

                                    type={showNew ? "text" : "password"}

                                    value={newPassword}

                                    onChange={(e) => setNewPassword(e.target.value)}

                                    placeholder="Enter New Password"

                                />

                                <span

                                    onClick={() => setShowNew(!showNew)}

                                >

                                    {

                                        showNew

                                            ?

                                            <FaEyeSlash />

                                            :

                                            <FaEye />

                                    }

                                </span>

                            </div>

                        </div>

                        <div className="setting-group">

                            <label>

                                Confirm New Password

                            </label>

                            <div className="password-box">

                                <input

                                    type={showConfirm ? "text" : "password"}

                                    value={confirmPassword}

                                    onChange={(e) => setConfirmPassword(e.target.value)}

                                    placeholder="Confirm New Password"

                                />

                                <span

                                    onClick={() => setShowConfirm(!showConfirm)}

                                >

                                    {

                                        showConfirm

                                            ?

                                            <FaEyeSlash />

                                            :

                                            <FaEye />

                                    }

                                </span>

                            </div>

                        </div>

                        <div className="password-strength">

                            <div className="strength-bar">

                                <div

                                    className={`strength-fill ${newPassword.length >= 10
                                        ? "strong"
                                        : newPassword.length >= 6
                                            ? "medium"
                                            : "weak"
                                        }`}

                                ></div>

                            </div>

                            <small>

                                {

                                    newPassword.length >= 10

                                        ?

                                        "🟢 Strong Password"

                                        :

                                        newPassword.length >= 6

                                            ?

                                            "🟠 Medium Password"

                                            :

                                            "🔴 Weak Password"

                                }

                            </small>

                        </div>

                        <button

                            className="save-btn"

                            onClick={changePassword}

                            disabled={loading}

                        >

                            {

                                loading

                                    ?

                                    "Changing Password..."

                                    :

                                    "🔒 Change Password"

                            }

                        </button>

                    </div>
                }
                {/* ================= DELIVERY CARD ================= */}

                {

                    activeTab === "delivery" &&

                    <div className="delivery-card">

                        <div className="delivery-header">

                            <h2>

                                🚚 Delivery Settings

                            </h2>

                            <p>

                                Configure your restaurant's delivery system.

                            </p>

                        </div>

                        <div className="delivery-grid">

                            <div className="delivery-box">

                                <div className="delivery-icon">

                                    🚚

                                </div>

                                <h3>

                                    Delivery Charge

                                </h3>

                                <input

                                    type="number"

                                    value={deliveryCharge}

                                    onChange={(e) => setDeliveryCharge(e.target.value)}

                                />

                            </div>

                            <div className="delivery-box">

                                <div className="delivery-icon">

                                    🛵

                                </div>

                                <h3>

                                    Free Delivery Above

                                </h3>

                                <input

                                    type="number"

                                    value={freeDeliveryAbove}

                                    onChange={(e) => setFreeDeliveryAbove(e.target.value)}

                                />

                            </div>

                        </div>

                        <div className="delivery-slider-card">

                            <h3>

                                ⏱ Estimated Delivery Time

                            </h3>

                            <h1>

                                {estimatedTime} Minutes

                            </h1>

                            <input

                                type="range"

                                min="15"

                                max="90"

                                value={estimatedTime}

                                onChange={(e) => setEstimatedTime(e.target.value)}

                            />

                        </div>
                        <div className="delivery-grid">

                            {/* Accept Orders */}

                            <div className="delivery-box">

                                <h3>

                                    🟢 Accept Orders

                                </h3>

                                <label className="switch">

                                    <input

                                        type="checkbox"

                                        checked={acceptOrders}

                                        onChange={() =>

                                            setAcceptOrders(!acceptOrders)

                                        }

                                    />

                                    <span className="slider"></span>

                                </label>

                            </div>

                            {/* Auto Accept */}

                            <div className="delivery-box">

                                <h3>

                                    🤖 Auto Accept Orders

                                </h3>

                                <label className="switch">

                                    <input

                                        type="checkbox"

                                        checked={autoAcceptOrders}

                                        onChange={() =>

                                            setAutoAcceptOrders(

                                                !autoAcceptOrders

                                            )

                                        }

                                    />

                                    <span className="slider"></span>

                                </label>

                            </div>

                        </div>

                        <div className="delivery-grid">

                            <div className="delivery-box">

                                <div className="delivery-icon">

                                    📦

                                </div>

                                <h3>

                                    Maximum Orders Per Day

                                </h3>

                                <input

                                    type="number"

                                    value={maximumOrders}

                                    onChange={(e) =>

                                        setMaximumOrders(e.target.value)

                                    }

                                />

                            </div>

                            {/* Live Preview */}

                            <div className="delivery-preview">

                                <h2>

                                    📋 Live Preview

                                </h2>

                                <hr />

                                <p>

                                    🚚 Delivery Charge

                                    <span>

                                        ₹{deliveryCharge}

                                    </span>

                                </p>

                                <p>

                                    🛵 Free Delivery Above

                                    <span>

                                        ₹{freeDeliveryAbove}

                                    </span>

                                </p>

                                <p>

                                    ⏱ Delivery Time

                                    <span>

                                        {estimatedTime} min

                                    </span>

                                </p>

                                <p>

                                    📦 Daily Orders

                                    <span>

                                        {maximumOrders}

                                    </span>

                                </p>

                                <p>

                                    🟢 Store

                                    <span>

                                        {

                                            acceptOrders

                                                ?

                                                "OPEN"

                                                :

                                                "CLOSED"

                                        }

                                    </span>

                                </p>

                            </div>

                        </div>

                        <button

                            className="delivery-save-btn"

                        >

                            💾 Save Delivery Settings

                        </button>
                    </div>

                }
                {

                    activeTab === "orders" &&

                    <div className="orders-card">

                        <div className="orders-header">

                            <h2>

                                📦 Order Settings

                            </h2>

                            <p>

                                Configure how customer orders are accepted and processed.

                            </p>

                        </div>

                        <div className="orders-grid">

                            {/* Cancel Time */}

                            <div className="orders-box">

                                <div className="orders-icon">

                                    ⏳

                                </div>

                                <h3>

                                    Cancel Time

                                </h3>

                                <input

                                    type="number"

                                    value={cancelTime}

                                    onChange={(e) =>

                                        setCancelTime(e.target.value)

                                    }

                                />

                            </div>

                            {/* Minimum Order */}

                            <div className="orders-box">

                                <div className="orders-icon">

                                    🛒

                                </div>

                                <h3>

                                    Minimum Order

                                </h3>

                                <input

                                    type="number"

                                    value={minimumOrder}

                                    onChange={(e) =>

                                        setMinimumOrder(e.target.value)

                                    }

                                />

                            </div>

                        </div>

                        <div className="orders-grid">

                            {/* Maximum Orders */}

                            <div className="orders-box">

                                <div className="orders-icon">

                                    📦

                                </div>

                                <h3>

                                    Maximum Active Orders

                                </h3>

                                <input

                                    type="number"

                                    value={maxOrders}

                                    onChange={(e) =>

                                        setMaxOrders(e.target.value)

                                    }

                                />

                            </div>

                            {/* Preview */}

                            <div className="orders-preview">

                                <h2>

                                    📋 Preview

                                </h2>

                                <hr />

                                <p>

                                    Cancel Time

                                    <span>

                                        {cancelTime}s

                                    </span>

                                </p>

                                <p>

                                    Minimum Order

                                    <span>

                                        ₹{minimumOrder}

                                    </span>

                                </p>

                                <p>

                                    Active Orders

                                    <span>

                                        {maxOrders}

                                    </span>

                                </p>

                            </div>
                        </div>

                        {/* ================= TOGGLES ================= */}

                        <div className="orders-grid">

                            <div className="orders-box">

                                <h3>

                                    🤖 Auto Confirm Orders

                                </h3>

                                <label className="switch">

                                    <input

                                        type="checkbox"

                                        checked={autoConfirm}

                                        onChange={() =>

                                            setAutoConfirm(

                                                !autoConfirm

                                            )

                                        }

                                    />

                                    <span className="slider"></span>

                                </label>

                            </div>

                            <div className="orders-box">

                                <h3>

                                    🍽 Cash On Delivery

                                </h3>

                                <label className="switch">

                                    <input

                                        type="checkbox"

                                        checked={allowCOD}

                                        onChange={() =>

                                            setAllowCOD(

                                                !allowCOD

                                            )

                                        }

                                    />

                                    <span className="slider"></span>

                                </label>

                            </div>

                        </div>

                        <div className="orders-grid">

                            <div className="orders-box">

                                <h3>

                                    💳 Online Payments

                                </h3>

                                <label className="switch">

                                    <input

                                        type="checkbox"

                                        checked={allowOnline}

                                        onChange={() =>

                                            setAllowOnline(

                                                !allowOnline

                                            )

                                        }

                                    />

                                    <span className="slider"></span>

                                </label>

                            </div>

                            <div className="orders-box order-status-box">

                                <h3>

                                    📊 Current Status

                                </h3>

                                <p>

                                    {

                                        autoConfirm

                                            ?

                                            "🟢 Orders are confirmed automatically."

                                            :

                                            "🟡 Manual confirmation enabled."

                                    }

                                </p>

                                <p>

                                    {

                                        allowCOD

                                            ?

                                            "💵 COD Enabled"

                                            :

                                            "❌ COD Disabled"

                                    }

                                </p>

                                <p>

                                    {

                                        allowOnline

                                            ?

                                            "💳 Online Payments Enabled"

                                            :

                                            "❌ Online Payments Disabled"

                                    }

                                </p>

                            </div>

                        </div>

                        <button

                            className="orders-save-btn"

                            onClick={saveOrderSettings}

                            disabled={savingOrders}

                        >

                            {

                                savingOrders

                                    ?

                                    "Saving..."

                                    :

                                    "💾 Save Order Settings"

                            }

                        </button>

                    </div>

                }
                {

activeTab==="notifications" &&

<div className="notifications-card">

    <div className="notifications-header">

        <h2>

            🔔 Notification Settings

        </h2>

        <p>

            Manage how you receive important restaurant updates.

        </p>

    </div>

    <div className="notifications-grid">

        <div className="notifications-box">

            <h3>

                📧 Email Notifications

            </h3>

            <label className="switch">

                <input

                    type="checkbox"

                    checked={emailNotifications}

                    onChange={()=>

                        setEmailNotifications(!emailNotifications)

                    }

                />

                <span className="slider"></span>

            </label>

        </div>

        <div className="notifications-box">

            <h3>

                🛒 New Order Alerts

            </h3>

            <label className="switch">

                <input

                    type="checkbox"

                    checked={newOrderNotification}

                    onChange={()=>

                        setNewOrderNotification(!newOrderNotification)

                    }

                />

                <span className="slider"></span>

            </label>

        </div>

    </div>

    <div className="notifications-grid">

        <div className="notifications-box">

            <h3>

                🔊 Sound Notifications

            </h3>

            <label className="switch">

                <input

                    type="checkbox"

                    checked={soundNotification}

                    onChange={()=>

                        setSoundNotification(!soundNotification)

                    }

                />

                <span className="slider"></span>

            </label>

        </div>

        <div className="notifications-box">

            <h3>

                🖥 Desktop Notifications

            </h3>

            <label className="switch">

                <input

                    type="checkbox"

                    checked={desktopNotification}

                    onChange={()=>

                        setDesktopNotification(!desktopNotification)

                    }

                />

                <span className="slider"></span>

            </label>

        </div>

    </div>

    <div className="notifications-grid">

        <div className="notifications-box">

            <h3>

                📦 Low Stock Alerts

            </h3>

            <label className="switch">

                <input

                    type="checkbox"

                    checked={lowStockNotification}

                    onChange={()=>

                        setLowStockNotification(!lowStockNotification)

                    }

                />

                <span className="slider"></span>

            </label>

        </div>

        <div className="notifications-preview">

            <h2>

                📋 Notification Preview

            </h2>

            <hr/>

            <p>

                Email

                <span>

                    {emailNotifications ? "ON" : "OFF"}

                </span>

            </p>

            <p>

                New Orders

                <span>

                    {newOrderNotification ? "ON" : "OFF"}

                </span>

            </p>

            <p>

                Sounds

                <span>

                    {soundNotification ? "ON" : "OFF"}

                </span>

            </p>

            <p>

                Desktop

                <span>

                    {desktopNotification ? "ON" : "OFF"}

                </span>

            </p>

            <p>

                Low Stock

                <span>

                    {lowStockNotification ? "ON" : "OFF"}

                </span>

            </p>

        </div>

    </div>

    <button

        className="notifications-save-btn"

    >

        🔔 Save Notification Settings

    </button>

</div>

}

            </div>
        </div>





    );

}

export default AdminSettings;