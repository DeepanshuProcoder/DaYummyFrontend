// Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/LogoWebsite.png";
import searchicon from "../assets/search.png";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const [showMenu, setShowMenu] = useState(false);
  const [menuPinned, setMenuPinned] = useState(false);
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    userName: localStorage.getItem("userName")
  });

  useEffect(() => {
    const updateAuth = () => {
      setAuth({
        token: localStorage.getItem("token"),
        role: localStorage.getItem("role"),
        userName: localStorage.getItem("userName")
      });
    };

    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowMenu(false);
        setMenuPinned(false);
      }
    };

    window.addEventListener("authChanged", updateAuth);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("authChanged", updateAuth);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logout = async () => {

    try {

        await axios.put(

            `http://localhost:5000/api/auth/logout/${localStorage.getItem("userId")}`

        );

    }

    catch(err){

        console.log(err);

    }

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    localStorage.removeItem("userName");

    localStorage.removeItem("email");

    localStorage.removeItem("userId");

    localStorage.removeItem("user");

    setShowMenu(false);

    setMenuPinned(false);

    window.dispatchEvent(new Event("authChanged"));

    navigate("/login");

};

  return (
    <nav className="navbar-container">
      <div className="logo-wrapper">
        <Link to="/"><img className="logo" src={logo} alt="Logo" /></Link>
        <Link to="/" className="logo-text">Da Yummy</Link>
      </div>

      <ul className="nav-links">
        <li><Link className="pop" to="/">Home</Link></li>
        <li><Link className="pop1" to="/menu">Menu</Link></li>
        <li><Link className="pop2" to="/about">About</Link></li>
        <li><Link className="pop3" to="/contact">Contact</Link></li>
      </ul>

      <div className="nav-utilities">
        <div className="search-wrapper">
          <input className="searchbar" placeholder="Search foods..." />
          <button className="search-btn-container">
            <img className="searchbtn" src={searchicon} alt="Search" />
          </button>
        </div>

        {auth.token && auth.role === "user" && (
          <div
            ref={profileRef}
            className="profile-wrapper"
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => !menuPinned && setShowMenu(false)}
            onClick={() => {
              setMenuPinned(!menuPinned);
              setShowMenu(true);
            }}
          >
            <FaUserCircle className="profile-icon" />
            <span className="profile-name">{auth.userName}</span>

            {showMenu && (
              <div className="profile-dropdown">
                <Link to="/profile">👤 My Profile</Link>
                <Link to="/orders"><FaClipboardList /> My Orders</Link>
                <button onClick={logout}><FaSignOutAlt /> Logout</button>
              </div>
            )}
          </div>
        )}

        {auth.token && auth.role === "admin" && (
          <Link to="/admin" className="admin-btn">Admin Panel</Link>
        )}

        {!auth.token && (
          <div className="auth-wrapper">
            <Link className="pop4" to="/login">LOGIN</Link>
            <Link className="pop5" to="/register">CREATE ACCOUNT</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
