import React from "react";
import axios from "axios";
import Button from "../components/base/Button";
import Input from "../components/base/Input";


const Login = ()=>{
    return(
        <div>
            <h1>Login</h1>
            <Input type={"email"} name={"email"} placeholder={"Email"}/>
            <Input type={"password"} name={"password"} placeholder={"Password"}/>
            <Button text={"Login"} onClick={()=>{
                console.log("Register")
            }}/>
        </div>
    )
}

export default Login;