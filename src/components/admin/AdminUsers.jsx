import "../../styles/AdminUsers.css";

import axios from "axios";

import { useEffect, useState } from "react";

function AdminUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        fetchUsers();

        const interval = setInterval(() => {

            fetchUsers();

        }, 5000);

        return () => clearInterval(interval);

    }, []);

    const fetchUsers = async () => {

        try {

            const res = await axios.get(

                "http://localhost:5000/api/auth/users"

            );

            setUsers(res.data.users);

        }

        catch (err) {

            console.log(err);

        }

    };

    const activeUsers =

        users.filter(user => user.isOnline);

    const loggedOutUsers =

        users.filter(user => !user.isOnline);
    return (

        <div className="admin-users">

            <h1>

                👥 Users Management

            </h1>

            <div className="users-section">

                <div className="users-card">

                    <h2>

                        🟢 Active Users

                    </h2>

                    {

                        activeUsers.length === 0

                            ?

                            <p>

                                No Active Users

                            </p>

                            :

                            activeUsers.map(user => (

                                <div

                                    className="user-card"

                                    key={user._id}

                                >

                                    <div>

                                        <h3>

                                            {user.fullName}

                                        </h3>

                                        <p>

                                            📧 {user.email}

                                        </p>

                                        <p>

                                            📱 {user.mobile}

                                        </p>

                                    </div>

                                    <div className="user-time">

                                        <span className="online">

                                            ● Online

                                        </span>

                                        <p>

                                            Login :

                                            {

                                                new Date(user.lastLogin)

                                                    .toLocaleString()

                                            }

                                        </p>

                                    </div>

                                </div>

                            ))

                    }

                </div>

                <div className="users-card">

                    <h2>

                        ⚪ Logged Out Users

                    </h2>

                    {

                        loggedOutUsers.length === 0

                            ?

                            <p>

                                No Logged Out Users

                            </p>

                            :

                            loggedOutUsers.map(user => (

                                <div

                                    className="user-card"

                                    key={user._id}

                                >

                                    <div>

                                        <h3>

                                            {user.fullName}

                                        </h3>

                                        <p>

                                            📧 {user.email}

                                        </p>

                                        <p>

                                            📱 {user.mobile}

                                        </p>

                                    </div>

                                    <div className="user-time">

                                        <span className="offline">

                                            ● Offline

                                        </span>

                                        <p>

                                            Last Login :

                                            {

                                                user.lastLogin

                                                    ?

                                                    new Date(user.lastLogin)

                                                        .toLocaleString()

                                                    :

                                                    "Never"

                                            }

                                        </p>

                                        <p>

                                            Last Logout :

                                            {

                                                user.lastLogout

                                                    ?

                                                    new Date(user.lastLogout)

                                                        .toLocaleString()

                                                    :

                                                    "Never"

                                            }

                                        </p>

                                    </div>

                                </div>

                            ))

                    }

                </div>

            </div>

        </div>

    );

}

export default AdminUsers;