import React, { useState } from "react";
import axios from "axios";
import Button from "../components/base/Button";
import Input from "../components/base/Input";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
                  // the sent data is stringified
                  email: email,
                  password: password,
                },
                {
                  // To tell the backend that the data i sent is json
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              const { access_token } = result.data;
              const user_type = result.data.message.user_type;
              console.log(result.data);
              console.log(user_type);
              
              localStorage.setItem("token", access_token);

              if (user_type === "instructor") {
                navigate("/InstructorDashboard");
              } else if (user_type === "student") {
                navigate("/StudentDashboard");
              } else if (user_type === "admin") {
                navigate("/Admin");
              } else {
                console.error("Unknown user type");
              }

              setErrorMessage("");
            } catch (error) {
              console.error("Login failed:", error.response?.data || error.message);
              setErrorMessage("Invalid email or password. Please try again.");
            }
          }}
        />
        
        {errorMessage && (
          <p className="error-message" style={{ color: "red", marginTop: "10px" }}>
            {errorMessage}
          </p>
        )}

        <p>Don't have an account? <span><a href="/register">Sign Up</a></span></p>

      </div>
      <div className="login-picture"></div>
    </div>
  );
};

export default Login;
