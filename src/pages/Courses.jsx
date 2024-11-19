import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Courses = ()=>{

    const navigate = useNavigate();

    const getCourses = async () =>{
        try {
            const result = await axios.get(
                "http://localhost/e-learning-website/server/api/getUserCourses.php",
                {
                    headers:{
                        Authorization: localStorage.token,
                    },
                }
            
            );

            
            
            
        } catch (error) {
            if (error.response.status === 401){
                localStorage.clear();
                navigate("/");
            }
            
        }
    }

    useEffect(()=>{
        getCourses();
        
    }, [])


    return(
        <div>
            <h1>Courses</h1>
        </div>
    )
}

export default Courses;