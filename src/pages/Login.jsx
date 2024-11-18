import React from "react";
import axios from "axios";
import Button from "../components/base/Button";
import Input from "../components/base/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ()=>{

    const navigate = useNavigate("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    return(
        <div>
            <h1>Login</h1>
            {/* <Input type={"email"} name={"email"} placeholder={"Email"}/> */}
            {/* <Input type={"password"} name={"password"} placeholder={"Password"}/> */}

            <Input placeholder={"Email"} onChange={(e)=>{
                setEmail(e.target.value);
            }} />
            
            <Input placeholder={"Password"} onChange={(e)=>{
                setPassword(e.target.value);
            }} />
            
            <Button text={"Login"} onClick={async ()=>{

                const data = new FormData();

                data.append("email", email);
                data.append("password", password);

                try{
                    const result = await axios.post("http://localhost/e-learning-website/server/api/login.php",
                        data
                    );
                    
                    console.log(result)

                    if (result.ok) {
                        navigate("/register");
                    }

                } catch (error){
                    console.log(error);
                }

            }}/>
        </div>
    )
}

export default Login;