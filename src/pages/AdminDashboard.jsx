import Sidebar from "../components/admin/Sidebar";
import DashboardCards from "../components/admin/DashboardCard";
import RecentOrders from "../components/admin/RecentOrders";
import "../styles/AdminDashboard.css";
import axios from "axios";
import { useEffect, useState } from "react";

function AdminDashboard(){

    return(

        <div className="admin-container">

            <Sidebar/>

            <div className="admin-content">

                <h1>Welcome Admin 👋</h1>

                <DashboardCards/>

                <RecentOrders/>

            </div>

        </div>

    );

}

export default AdminDashboard;