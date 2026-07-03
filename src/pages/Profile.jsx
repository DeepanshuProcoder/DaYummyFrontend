import "../styles/Profile.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Profile() {
const navigate = useNavigate();
const API_URL = import.meta.env.VITE_API_URL;
    const [profile, setProfile] = useState({

        fullName: "",

        email: "",

        mobile: "",

        gender: "",

        dob: ""

    });

    const [passwordData, setPasswordData] = useState({

        oldPassword: "",

        newPassword: "",

        confirmPassword: ""

    });

    const userId = localStorage.getItem("userId");

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

        navigate("/login");

        return;

    }

    fetchProfile();

}, []);

    const fetchProfile = async () => {

        try {

            const res = await axios.get(

                `${API_URL}/api/profile/${userId}`

            );

            setProfile(res.data.user);

        }

        catch (err) {

            console.log(err);

        }

    };

    const handleProfileChange = (e) => {

        setProfile({

            ...profile,

            [e.target.name]: e.target.value

        });

    };

    const handlePasswordChange = (e) => {

        setPasswordData({

            ...passwordData,

            [e.target.name]: e.target.value

        });

    };

    const saveProfile = async () => {

        try {

            const res = await axios.put(

                `${API_URL}/api/profile/${userId}`,

                profile

            );

            alert(res.data.message);

            localStorage.setItem(

                "user",

                JSON.stringify({

                    ...JSON.parse(localStorage.getItem("user")),

                    fullName: profile.fullName

                })

            );

            window.dispatchEvent(

                new Event("authChanged")

            );

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Unable to update profile."

            );

        }

    };

    const changePassword = async () => {

        if (

            passwordData.newPassword !==

            passwordData.confirmPassword

        ) {

            alert(

                "New passwords do not match."

            );

            return;

        }

        try {

            const res = await axios.put(

                `${API_URL}/api/profile/change-password/${userId}`,

                passwordData

            );

            alert(res.data.message);

            setPasswordData({

                oldPassword: "",

                newPassword: "",

                confirmPassword: ""

            });

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Unable to change password."

            );

        }

    };
    return (

        <div className="profile-page">

            <div className="profile-card">

                <div className="profile-header">

                    <div className="profile-avatar">

                        👤

                    </div>

                    <h1>

                        My Profile

                    </h1>

                    <p>

                        Manage your personal information

                    </p>

                </div>

                <div className="profile-form">

                    <div className="input-group">

                        <label>

                            Full Name

                        </label>

                        <input

                            type="text"

                            name="fullName"

                            value={profile.fullName}

                            onChange={handleProfileChange}

                        />

                    </div>

                    <div className="input-group">

                        <label>

                            Email Address

                        </label>

                        <div className="input-group">

                            <label>

                            

                            </label>

                            <input

                                type="email"

                                value={profile.email}

                                readOnly

                                className="readonly-input"

                            />

                            <small className="readonly-note">

                                Email address cannot be changed.

                            </small>

                        </div>

                    </div>

                    <div className="input-group">

                        <label>

                            Mobile Number

                        </label>

                        <input

                            type="text"

                            name="mobile"

                            value={profile.mobile}

                            onChange={handleProfileChange}

                        />

                    </div>

                    <div className="input-group">

                        <label>

                            Gender

                        </label>

                        <input

                            type="text"

                            value={profile.gender}

                            readOnly

                        />

                    </div>

                    <div className="input-group">

                        <label>

                            Date Of Birth

                        </label>

                        <input

                            type="date"


                            value={

                                profile.dob

                                    ?

                                    profile.dob.substring(0, 10)

                                    :

                                    ""

                            }

                            readOnly

                        />

                    </div>

                    <button

                        className="save-profile-btn"

                        onClick={saveProfile}

                    >

                        💾 Save Changes

                    </button>

                </div>

            </div>

            <div className="password-card">

                <h2>

                    🔒 Change Password

                </h2>

                <p>

                    Change your account password securely.

                </p>

                <div className="input-group">

                    <label>

                        Current Password

                    </label>

                    <input

                        type="password"

                        name="oldPassword"

                        value={passwordData.oldPassword}

                        onChange={handlePasswordChange}

                    />

                </div>

                <div className="input-group">

                    <label>

                        New Password

                    </label>

                    <input

                        type="password"

                        name="newPassword"

                        value={passwordData.newPassword}

                        onChange={handlePasswordChange}

                    />

                </div>

                <div className="input-group">

                    <label>

                        Confirm New Password

                    </label>

                    <input

                        type="password"

                        name="confirmPassword"

                        value={passwordData.confirmPassword}

                        onChange={handlePasswordChange}

                    />

                </div>

                <button

                    className="change-password-btn"

                    onClick={changePassword}

                >

                    🔐 Change Password

                </button>

            </div>

        </div>

    );

}

export default Profile;