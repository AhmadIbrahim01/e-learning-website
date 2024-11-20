import React, { useState } from "react";
import axios from "axios";

const AllUsers = ({ users = [] }) => {
  const [updatedUsers, setUpdatedUsers] = useState(users);

  const banUser = async (userId) => {
    const data = new FormData();
    data.append("id",userId);
    data.append("is_banned","1");
    try {
      const response = await axios.post("http://localhost/e-learning-website/server/api/banUser.php", data);

      if (response.data.status === "success") {
        setUpdatedUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId
              ? { ...user, is_banned: "1" }
              : user
          )
        );
      } else {
        alert("Failed to ban the user. Please try again.");
      }
    } catch (error) {
      console.error("Error banning user:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h2>All Users</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Is Banned</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {updatedUsers.length > 0 ? (
            updatedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.user_type}</td>
                <td>{user.is_banned === "1" ? "Yes" : "No"}</td>
                <td>
                  {user.is_banned === "0" && (
                    <button onClick={() => banUser(user.id)}>Ban</button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
