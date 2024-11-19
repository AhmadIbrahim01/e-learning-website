import React from "react";
import axios from "axios";
import Button from "../components/base/Button";
import Input from "../components/base/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ()=>{

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    return(
        <div>
            <h1>Login</h1>

            <Input placeholder={"Email"} onChange={(e)=>{
                setEmail(e.target.value);
            }} />
            
            <Input placeholder={"Password"} onChange={(e)=>{
                setPassword(e.target.value);
            }} />
            
            <Button text={"Login"} onClick={async ()=>{


                try{
                    const result = await axios.post("http://localhost/e-learning-website/server/api/login.php",
                    {
                        email: email,
                        password: password,
                    },
                    {
                        headers:{
                            "Content-Type": "application/json",
                        },

                    }
                    );
                    


                    // console.log(result)
                    // console.log(result.data)
                    // console.log(result.data.access_token)

                    navigate("/courses");

                    localStorage.setItem("token", result.data.access_token);

                } catch (error){
                    console.log(error);
                }

            }}/>
        </div>
    )
}

export default Login;