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
            const user_type = formData.user_type;

            if (result.status === 'Successful' && user_type === "instructor") {
              setStatus({ success: true, message: result.message });
              navigate("/InstructorDashboard");
            } else if (result.status === 'Successful' && user_type === "student"){
              setStatus({ success: true, message: result.message });
              navigate("/StudentDashboard");
            } else {
              setStatus({ success: false, message: result.message });
            }
        } catch (error) {
            setStatus({ success: false, message: 'An error occurred. Please try again.' });
        }
    };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {status && (
        <div className={`status-message ${status.success ? 'success' : 'error'}`}>
          {status.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>




          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="user_type">User Type:</label>
          <select
            id="user_type"
            name="user_type"
            value={formData.user_type}
            onChange={handleChange}
            required
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
