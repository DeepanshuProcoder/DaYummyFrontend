import "../styles/login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({

        emailOrMobile: "",

        password: ""

    });

    const [errors, setErrors] = useState({});

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setLoginData({

            ...loginData,

            [e.target.name]: e.target.value

        });

    };

    const validate = () => {

        let newErrors = {};

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const mobileRegex =
            /^[6-9]\d{9}$/;

        if (!loginData.emailOrMobile.trim()) {

            newErrors.emailOrMobile =
                "Email or Mobile Number is required";

        }

        else if (

            !emailRegex.test(loginData.emailOrMobile) &&

            !mobileRegex.test(loginData.emailOrMobile)

        ) {

            newErrors.emailOrMobile =
                "Enter a valid Email or Mobile Number";

        }

        if (!loginData.password) {

            newErrors.password =
                "Password is required";

        }

        else if (loginData.password.length < 8) {

            newErrors.password =
                "Password must be at least 8 characters";

        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) return;

        try {

            setLoading(true);

            const res = await axios.post(

                "http://localhost:5000/api/auth/login",

                loginData

            );
            localStorage.setItem("token", res.data.token);

            localStorage.setItem("role", res.data.user.role);

            localStorage.setItem("userId", res.data.user.id);

            localStorage.setItem("userName", res.data.user.fullName);

            localStorage.setItem("email", res.data.user.email);

            localStorage.setItem("user", JSON.stringify(res.data.user));


            console.log(res.data);
            console.log(res.data.user);

            window.dispatchEvent(new Event("authChanged"));

            if (res.data.user.role === "admin") {

                navigate("/");

            }
            else {

                navigate("/");

            }

        }

        catch (err) {

            setErrors({

                general:

                    err.response?.data?.message ||

                    "Login Failed"

            });

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-page">

            <form

                className="login-card"

                onSubmit={handleSubmit}

            >

                <h1>Welcome Back 👋</h1>

                <p>

                    Login to continue your food journey

                </p>

                {errors.general &&

                    <p className="error">

                        {errors.general}

                    </p>

                }

                <label>

                    Email / Mobile

                </label>

                <input

                    type="text"

                    name="emailOrMobile"

                    value={loginData.emailOrMobile}

                    onChange={handleChange}

                    placeholder="Enter Email or Mobile"

                />

                {errors.emailOrMobile &&

                    <p className="error">

                        {errors.emailOrMobile}

                    </p>

                }

                <label>

                    Password

                </label>

                <div className="password-box">

                    <input

                        type={

                            showPassword

                                ? "text"

                                : "password"

                        }

                        name="password"

                        value={loginData.password}

                        onChange={handleChange}

                        placeholder="Enter Password"

                    />

                    <span

                        className="eye"

                        onClick={() =>

                            setShowPassword(

                                !showPassword

                            )

                        }

                    >

                        {

                            showPassword

                                ? "🙈"

                                : "👁"

                        }

                    </span>

                </div>

                {errors.password &&

                    <p className="error">

                        {errors.password}

                    </p>

                }

                <div className="login-options">

                    <label>

                        <input type="checkbox" />

                        Remember Me

                    </label>

                    <Link to="/forgot-password">

                        Forgot Password?

                    </Link>

                </div>

                <button

                    className="login-btn"

                    disabled={loading}

                >

                    {

                        loading

                            ? "Logging In..."

                            : "Login"

                    }

                </button>

                <p className="register-link">

                    Don't have an account?

                    <Link to="/register">

                        Create Account

                    </Link>

                </p>

            </form>

        </div>

    );

}

export default Login;