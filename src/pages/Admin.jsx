import React from "react";
import { logout } from "../utils/auth";


const Admin = ()=>{
    return(
        <div>
            <h1>Admin</h1>
            <button onClick={logout}>Logout</button>

        </div>
    )
}

export default Admin;