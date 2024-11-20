import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddInstructor = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        user_type: 'instructor',
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
            } else if (result.status === 'Failed') {
                setStatus({ success: false, message: result.message });
            }
        } catch (error) {
            setStatus({ success: false, message: 'An error occurred. Please try again.' });
        }
    };


    return (
        <div className="flex register center">
            <div className="register-form flex column center">
                <h1>Add Instructor</h1>
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
                    <button className='register-button' type="submit">Add Instructor</button>
                </form>
            </div>
            {/* <div className="register-picture"></div> */}
        </div>
    );
};

export default AddInstructor;
