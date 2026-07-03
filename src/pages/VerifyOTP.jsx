import "../styles/VerifyOTP.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

function VerifyOTP() {

    const navigate = useNavigate();

    const { state } = useLocation();

    const email = state?.email;

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const inputs = useRef([]);

    const [timeLeft, setTimeLeft] = useState(60);

    const [loading, setLoading] = useState(false);
    const resendOTP = async () => {

        try {

            await axios.post(

                "http://localhost:5000/api/auth/resend-otp",

                {

                    email

                }

            );

            setTimeLeft(60);

            alert("OTP Sent Again");

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Unable to resend OTP"

            );

        }

    };

    useEffect(() => {

        if (timeLeft <= 0) return;

        const timer = setInterval(() => {

            setTimeLeft(prev => prev - 1);

        }, 1000);

        return () => clearInterval(timer);

    }, [timeLeft]);

    const handleChange = (value, index) => {

        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];

        newOtp[index] = value;

        setOtp(newOtp);

        if (value && index < 5) {

            inputs.current[index + 1].focus();

        }

    };

    const handleKeyDown = (e, index) => {

        if (e.key === "Backspace" && !otp[index] && index > 0) {

            inputs.current[index - 1].focus();

        }

    };

    const handlePaste = (e) => {

        const paste = e.clipboardData.getData("text").trim();

        if (!/^\d{6}$/.test(paste)) return;

        const digits = paste.split("");

        setOtp(digits);

        digits.forEach((digit, i) => {

            if (inputs.current[i]) {

                inputs.current[i].value = digit;

            }

        });

    };

    const verifyOTP = async () => {

        const code = otp.join("");

        if (code.length !== 6) {

            alert("Enter complete OTP");

            return;

        }

        try {

            setLoading(true);

            const res = await axios.post(

                "http://localhost:5000/api/auth/verify-otp",

                {

                    email,

                    otp: code

                }

            );

            alert(res.data.message);

            navigate("/login");

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Verification Failed"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="otp-page">

            <div className="otp-card">

                <h1>Verify Email</h1>

                <p>

                    OTP sent to

                    <br />

                    <b>{email}</b>

                </p>

                <div

                    className="otp-container"

                    onPaste={handlePaste}

                >

                    {otp.map((digit, index) => (

                        <input

                            key={index}

                            maxLength="1"

                            ref={(el) =>

                                inputs.current[index] = el

                            }

                            value={digit}

                            onChange={(e) =>

                                handleChange(

                                    e.target.value,

                                    index

                                )

                            }

                            onKeyDown={(e) =>

                                handleKeyDown(

                                    e,

                                    index

                                )

                            }

                        />

                    ))}

                </div>

                <h3>

                    {Math.floor(timeLeft / 60)}:

                    {String(timeLeft % 60).padStart(2, "0")}

                </h3>

                <button

                    onClick={verifyOTP}

                    className="verify-btn"

                    disabled={loading}

                >

                    {

                        loading

                            ?

                            "Verifying..."

                            :

                            "Verify OTP"

                    }

                </button>

                {

                    timeLeft === 0 &&

                    <button

                        className="resend-btn"

                        onClick={resendOTP}

                    >

                        Resend OTP

                    </button>

                }

            </div>

        </div>

    );

}

export default VerifyOTP;