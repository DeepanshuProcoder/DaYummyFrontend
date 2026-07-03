import AdminSettings from "./components/admin/AdminSettings";
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import Menu from './pages/Menu'
import Navbar from './components/Navbar'
import SubNavbar from './components/SubNavbar'
import Cart from "./pages/Cart";
import { useState, useEffect } from 'react'
import Register from './pages/Register'
import VerifyOTP from "./pages/VerifyOTP";
import Login from './pages/Login'
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import ProductManagement from "./pages/ProductManagement"
import ViewProduct from "./components/admin/ViewProduct";
import EditProduct from "./components/admin/EditProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import Orders from './pages/Orders'
import AdminOrders from "./pages/AdminOrders";
import Profile from "./pages/Profile";
import AdminUsers from "./components/admin/AdminUsers";
import AdminCoupons from './components/admin/AdminCoupons'
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  const [cart, setCart] = useState(() => {

    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });
  useEffect(() => {

    localStorage.setItem("cart", JSON.stringify(cart));

  }, [cart]);
  return (
    <BrowserRouter>
      <div className='Navd'><Navbar /></div>
      <SubNavbar cart={cart} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<Menu cart={cart}
          setCart={setCart} />} />
        <Route
          path="/cart"
          element={<Cart cart={cart} setCart={setCart}
          />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route

          path="/verify-otp"

          element={<VerifyOTP />}

        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route

          path="/admin"

          element={

            <ProtectedRoute>

              <AdminDashboard />

            </ProtectedRoute>

          }

        />
         <Route

          path="/contact"

          element={<Contact />}

        />
        <Route
          path="/admin/products"
          element={<ProtectedRoute>

            <ProductManagement />

          </ProtectedRoute>}
        />
        <Route
          path="/admin/products/add"
          element={<ProtectedRoute>

            <AddProduct />

          </ProtectedRoute>}
        />
        <Route

          path="/admin/products/view/:id"

          element={<ProtectedRoute>

            <ViewProduct />

          </ProtectedRoute>}

        />
        <Route

          path="/admin/products/edit/:id"

          element={<ProtectedRoute>

            <EditProduct />

          </ProtectedRoute>}

        />
        <Route
          path="/orders"
          element={<Orders />}
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <AdminOrders />
            </ProtectedRoute>
          }
        />
        <Route

          path="/profile"

          element={<Profile />}

        />
        <Route

          path="/admin/coupons"

          element={<AdminCoupons />}

        />
        <Route

          path="/admin/users"

          element={

            <ProtectedRoute>

              <AdminUsers />

            </ProtectedRoute>

          }

        />
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              setCart={setCart}
            />
          }
        /><Route

          path="/admin/settings"

          element={<AdminSettings />}

        />
        <Route
          path="/about"
          element={<About />}
        />
      </Routes>

    </BrowserRouter>

  )
}

export default App