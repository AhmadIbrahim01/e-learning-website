import React from "react";
import { logout } from "../utils/auth";

const StudentDashboard = ()=>{
    return(
        <div>
            <h1>Student</h1>
            <button onClick={logout}>Logout</button>

        </div>
    )
}

export default StudentDashboard;