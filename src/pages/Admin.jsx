import React, { useEffect, useState } from "react";
import axios from "axios";
import { logout } from "../utils/auth";

const Admin = () => {
  const [users, setUsers] = useState([]);
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
  }, []);


    const count = (users, type) =>{
        let number = 0;
        users.forEach(user => {
            if(user.user_type == type) number += 1;
        })
        return number;
    }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>
      
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
                  <td>{user.is_banned == 1? "Yes" : "No"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
        </>)}
    </div>
  );
};

export default Admin;
