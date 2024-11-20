import React from "react";


const AllAdmins = ({ admin = [] }) => {
    return (
      <div>
        <h2>All admin</h2>
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
            {admin.length > 0 ? (
              admin.map((user) => (
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
                <td colSpan="5">No admin found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };
  


export default AllAdmins;