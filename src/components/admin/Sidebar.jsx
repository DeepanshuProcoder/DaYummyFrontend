import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Sidebar() {

    
    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("role");

        localStorage.removeItem("userName");

        localStorage.removeItem("email");

        localStorage.removeItem("userId");

        window.dispatchEvent(new Event("authChanged"));

        navigate("/");

    };

    return (

        <div className="sidebar">

            <h2>🍔 Da yummy</h2>

            <Link to="/admin">Dashboard</Link>

            <Link to="/admin/products">Products</Link>

            <Link to="/admin/orders">Orders</Link>

            <Link to="/admin/users">Users</Link>

            <Link to="/admin/reviews">Reviews</Link>

            <Link to="/admin/coupons">Coupons</Link>

            <Link to="/admin/settings">Settings</Link>

            <button

                className="logout"

                onClick={logout}

            >

                Logout

            </button>

        </div>

    );

}

export default Sidebar;