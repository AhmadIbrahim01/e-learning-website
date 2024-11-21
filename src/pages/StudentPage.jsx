import React, { useState } from "react";
import axios from "axios";

const StudentPage = () => {
  const storedEmail = localStorage.getItem("email");
  const storedId = localStorage.getItem("id");

  const [courseId, setCourseId] = useState("");
  const [message, setMessage] = useState("");

  const handleAssignCourse = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      const response = await axios.post("http://localhost/e-learning-website/server/api/addStudentCourse.php", {
        student_id: storedId,
        course_id: courseId,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage("An error occurred while assigning the course. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Student Page</h1>
      <p>Email: {storedEmail}</p>
      <p>Student ID: {storedId}</p>

      <form onSubmit={handleAssignCourse} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <label htmlFor="courseId">
          Course ID:
          <input
            type="text"
            id="courseId"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            placeholder="Enter course ID"
            required
          />
        </label>

        <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "5px" }}>
          Assign Course
        </button>
      </form>

      {message && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default StudentPage;
