import React from "react";
import axios from "axios";
import Button from "../components/base/Button";
import Input from "../components/base/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex login">
      <div className="login-form flex column center">
        <h1>Login</h1>

        <Input
          placeholder={"Email"}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <Input
          placeholder={"Password"}
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <Button
          text={"Login"}
          onClick={async () => {
            try {
              const result = await axios.post(
                "http://localhost/e-learning-website/server/api/login.php",
                {
                  email: email,
                  password: password,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              const { access_token } = result.data;
              const user_type = result.data.message.user_type
              console.log(result.data);
              console.log(user_type);
              
              // Save the token in localStorage
              localStorage.setItem("token", access_token);

              // Redirect based on user type
              if (user_type === "instructor") {
                navigate("/InstructorDashboard");
              } else if (user_type === "student") {
                navigate("/StudentDashboard");
              } else {
                console.error("Unknown user type");
              }
            } catch (error) {
              console.error("Login failed:", error.response?.data || error.message);
            }
          }}
        />
        <p>Don't have an account? <span><a href="/register">Sign Up</a></span></p>

      </div>
      <div className="login-picture"></div>
    </div>
  );
};

export default Login;
