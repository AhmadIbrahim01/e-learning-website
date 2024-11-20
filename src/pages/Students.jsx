import React from "react";


const Students = ({ students = [] }) => {
    return (
      <div>
        <h2>Manage Students</h2>
        {students.length > 0 ? (
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
              {students.map((student) => (
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
          <p>No students found</p>
        )}
      </div>
    );
  };
  


export default Students;