
import { useState } from "react";
import "../styles/register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [agree, setAgree] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!fullName.trim())
            newErrors.fullName = "Full Name is required.";
        else if (!/^[A-Za-z ]+$/.test(fullName))
            newErrors.fullName = "Only alphabets and spaces are allowed.";
        else if (fullName.trim().length < 3)
            newErrors.fullName = "Name must contain at least 3 letters.";

        if (!email.trim())
            newErrors.email = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            newErrors.email = "Enter a valid email address.";

        if (!/^[6-9]\d{9}$/.test(mobile))
            newErrors.mobile = "Enter a valid 10-digit mobile number.";

        if (password.length < 8)
            newErrors.password = "Minimum 8 characters required.";
        else if (!/[A-Z]/.test(password))
            newErrors.password = "One uppercase letter required.";
        else if (!/[a-z]/.test(password))
            newErrors.password = "One lowercase letter required.";
        else if (!/[0-9]/.test(password))
            newErrors.password = "One number required.";
        else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
            newErrors.password = "One special character required.";

        if (confirmPassword !== password)
            newErrors.confirmPassword = "Passwords do not match.";

        if (!gender)
            newErrors.gender = "Please select your gender.";

        if (!dob)
            newErrors.dob = "Please select your date of birth.";

        if (!agree)
            newErrors.agree = "Please accept Terms & Conditions.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (e) => {

        e.preventDefault();

        if (!validate()) return;

        try {

            setLoading(true);

            const response = await axios.post(

                "http://localhost:5000/api/auth/register",

                {

                    fullName,

                    email,

                    mobile,

                    password,

                    gender,

                    dob

                }

            );

            alert(response.data.message);

            navigate("/verify-otp", {

                state: {

                    email

                }

            });

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Registration Failed"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (
        <div className="register-page">
            <form className="register-card" onSubmit={handleRegister}>

                <h1>Create Account</h1>

                <div className="profile-section">
                    <label htmlFor="profile">
                        {profileImage ?
                            <img src={profileImage} className="profile-preview" alt="" />
                            :
                            <div className="profile-placeholder"><p className="camera">📷</p></div>
                        }
                    </label>
                    <input
                        id="profile"
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImage}
                    />
                    <p>Upload Profile Picture</p>
                </div>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                {errors.fullName && <p className="error">{errors.fullName}</p>}

                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="error">{errors.email}</p>}

                <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                />
                {errors.mobile && <p className="error">{errors.mobile}</p>}

                <div className="password-box">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "🙈" : "👁"}
                    </button>
                </div>
                {errors.password && <p className="error">{errors.password}</p>}

                <div className="password-box">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? "🙈" : "👁"}
                    </button>
                </div>
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>
                {errors.gender && <p className="error">{errors.gender}</p>}

                <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                />
                {errors.dob && <p className="error">{errors.dob}</p>}

                <div className="terms">
                    <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                    />
                    <span>I agree to the Terms & Conditions</span>
                </div>
                {errors.agree && <p className="error">{errors.agree}</p>}

                <button

                    className="register-btn"

                    disabled={loading}

                >

                    {

                        loading

                            ?

                            "Sending OTP..."

                            :

                            "Create Account"

                    }

                </button>

                <p className="login-text">
                    Already have an account?
                </p>

                <a href="/login" className="login-link">
                    Login
                </a>

            </form>
        </div>
    );
}

export default Register;
