import '../styles/subnavbar.css'
import DarkMode from './DarkMode';
import Location from './Location';
import { Link } from "react-router-dom";

function SubNavbar({ cart }) {
  const totalItems = cart.reduce((total, item) => {
    return total + (item.quantity || 1);
  }, 0);
  return (
    <nav className="subnavbar-container">
      <ul>
        <li><a href="#">Wishlist</a></li>
        <li><Link to="/orders">Orders</Link></li>
        <li><a><DarkMode /></a></li>
        <li><a className='loc'><Location /></a></li>
        <li><Link to="/cart">Cart({totalItems})</Link></li>
      </ul>
    </nav>
  );
}

export default SubNavbar;