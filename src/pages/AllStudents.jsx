import React, { useState } from "react";
import axios from "axios";

const AllStudents = ({ students = [] }) => {
  const [updatedStudents, setUpdatedStudents] = useState(students);

  return (
    <div>
      <h2>Manage Students</h2>
      {updatedStudents.length > 0 ? (
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
            {updatedStudents.map((student) => (
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

export default AllStudents;
