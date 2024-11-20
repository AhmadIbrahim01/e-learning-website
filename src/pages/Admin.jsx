import React, { useEffect, useState } from "react";
import axios from "axios";
import { logout } from "../utils/auth";
import ManageStudents from "./ManageStudents";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [courses_count, setCoursesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost/e-learning-website/server/api/getUsers.php");
        
        if (response.data.status === "success") {
          console.log("usrs", response.data.data);
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
          console.log(count(courses_response.data.data));
          console.log(courses_response.data);
          
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

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>
      <a href="/ManageStudents">manage students</a>

      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p>Loading users...</p>
      ) : (
<>
        <h1>Stats:</h1>
        <h1>Number of users: {users.length}</h1>
        <h1>Number of students: {count(users, "student")}</h1>
        <h1>Number of admins: {count(users, "admin")}</h1>
        <h1>Number of instructors: {count(users, "instructor")}</h1>
        <h1>Number of courses: {courses_count}</h1>
        <h1>Banned Instructors: {bannedCount(users, "instructor")}</h1>
        <h1>Banned Students: {bannedCount(users, "student")}</h1>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Is Banned</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.user_type}</td>
                  <td>{user.is_banned === "1"? "Yes" : "No"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users found</td>
              </tr>
            )}
          </tbody>
        </table>

        <ManageStudents />

        </>)}
    </div>
  );
};

export default Admin;
