import React, { useEffect, useState } from "react";
import { logout } from "../utils/auth";
import StudentPage from "./StudentPage";

const StudentDashboard = ()=>{
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        const storedId = localStorage.getItem("id");

        if (storedEmail && storedId) {
            setEmail(storedEmail);
            setId(storedId);
        }
    }, []);

    return(
        <div>
            <h1>Welcome Student, your email is: {email}!</h1>
            <p>Your ID: {id}</p>
            <button onClick={logout}>Logout</button>
            {/* <StudentPage email={storedEmail} id={storedId}/> */}
            <StudentPage/>
        </div>
    )
}

export default StudentDashboard;

