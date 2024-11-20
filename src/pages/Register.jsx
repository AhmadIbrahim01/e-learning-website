import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        user_type: 'student',
    });

    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost/e-learning-website/server/api/register.php', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const result = response.data;
            console.log(result);
            console.log(response);
            
            const user_type = formData.user_type;

            if (result.status === 'Successful' && user_type === "instructor") {
                setStatus({ success: true, message: result.message });
                navigate("/InstructorDashboard");
            } else if (result.status === 'Successful' && user_type === "student") {
                setStatus({ success: true, message: result.message });
                navigate("/StudentDashboard");
            } else if (result.status === 'Failed') { // Check if the email is already in use
                setStatus({ success: false, message: result.message });
            }
        } catch (error) {
            setStatus({ success: false, message: 'An error occurred. Please try again.' });
        }
    };


    return (
        <div className="flex register">
            <div className="register-form flex column center">
                <h1>Register</h1>
                {status && status.message}
                <form className='register-form flex center column' onSubmit={handleSubmit}>
                    <div>
                        <input
                            className='input'
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            required
                            />
                    </div>
                    <div>
                        <input
                            className='input'
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                            />
                    </div>
                    <div>
                        <input
                            className='input'
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                            />
                    </div>
                    <div>
                        {/* <select
                            id="user_type"
                            name="user_type"
                            value={formData.user_type}
                            onChange={handleChange}
                            className="styled-select"
                            required
                            >
                            <option value="student">Student</option>
                            <option value="instructor">Instructor</option>
                        </select> */}
                    </div>
                    <button className='register-button' type="submit">Register</button>
                </form>
                <p>Already have an account? <span><a href="/login">Login</a></span></p>
            </div>
            <div className="register-picture"></div>
        </div>
    );
};

export default Register;
