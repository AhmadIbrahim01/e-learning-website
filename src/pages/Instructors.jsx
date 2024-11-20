import React from "react";


const Instructors = ({ instructors = [] }) => {
    return (
      <div>
        <h2>Manage Instructors</h2>
        {instructors.length > 0 ? (
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
              {instructors.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.user_type}</td>
                  <td>{student.is_banned === "1" ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No instructors found</p>
        )}
      </div>
    );
  };
  


export default Instructors;