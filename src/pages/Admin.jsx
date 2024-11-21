import React, { useEffect, useState } from "react";
import axios from "axios";
import { logout } from "../utils/auth";
import AllStudents from "./AllStudents";
import Instructors from "./Instructors";
import AllCourses from "./AllCourses";
import AllUsers from "./AllUsers";
import AllAdmins from "./AllAdmins";
import './Admin.css';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [courses_count, setCoursesCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost/e-learning-website/server/api/getUsers.php");
        
        if (response.data.status === "success") {
          setUsers(response.data.data);
        } else {
          setError(response.data.message || "An error occurred while fetching users.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    const fetchCourses = async () => {
      try {
        const courses_response = await axios.get("http://localhost/e-learning-website/server/api/getAllCourses.php");
        
        if (courses_response.data.status === "success") {
          setCoursesCount(count(courses_response.data.data));
          setCourses(courses_response.data.data);
        } else {
          setError(courses_response.data.message || "An error occurred while fetching users.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);


    const count = (users, type) =>{
        let number = 0;
        users.forEach(user => {
            if(user.user_type === type) number += 1;
        })
        return number;
    }
    const bannedCount = (users, type) =>{
        let number = 0;
        users.forEach(user => {
            if(user.user_type === type && user.is_banned === "1") number += 1;
        })
        return number;
    }

    const students = users.filter(user => user.user_type === "student");
    const instructors = users.filter(user => user.user_type === "instructor");
    const admins = users.filter(user => user.user_type === "admin");

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>
      <a href="/Students">Manage students</a>

      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <>
          <div className="dashboard-stats">
            <div className="stats-item">
              <h1>Number of users</h1>
              <p>{users.length}</p>
            </div>
            <div className="stats-item">
              <h1>Number of students</h1>
              <p>{count(users, "student")}</p>
            </div>
            <div className="stats-item">
              <h1>Number of admins</h1>
              <p>{count(users, "admin")}</p>
            </div>
            <div className="stats-item">
              <h1>Number of instructors</h1>
              <p>{count(users, "instructor")}</p>
            </div>
            <div className="stats-item">
              <h1>Number of courses</h1>
              <p>{courses_count}</p>
            </div>
            <div className="stats-item">
              <h1>Banned Instructors</h1>
              <p>{bannedCount(users, "instructor")}</p>
            </div>
            <div className="stats-item">
              <h1>Banned Students</h1>
              <p>{bannedCount(users, "student")}</p>
            </div>
          </div>

          <AllAdmins admin={admins || []} />
          <br />
          <AllStudents students={students || []} />
          <br />
          <Instructors instructors={instructors || []} />
          <br />
          <AllCourses courses={courses || []} />
          <br />
          <AllUsers users={users || []} />
        </>
      )}
    </div>
  );
};

export default Admin;
