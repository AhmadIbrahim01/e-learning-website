import React from "react";
import { logout } from "../utils/auth";


const InstructorDashboard = ()=>{
    return(
        <div>
            <h1>Instructor</h1>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default InstructorDashboard;