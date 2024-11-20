import React, { useState } from "react";
import axios from "axios";

const AllCourses = ({ courses = [] }) => {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!courseName || !courseDescription) {
      setMessage("Please fill out both fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost/e-learning-website/server/api/createCourse.php",
        {
          course_name: courseName,
          course_description: courseDescription,
        }
      );

      if (response.data.status === "success") {
        setMessage("Course added successfully!");
        setCourseName("");
        setCourseDescription("");
      } else {
        setMessage("Failed to add course: " + response.data.message);
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div>
      <h2>All Courses</h2>

      <h3>Add a New Course</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="courseName">Course Name:</label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="courseDescription">Course Description:</label>
          <textarea
            id="courseDescription"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Add Course</button>
      </form>

      {message && <p>{message}</p>}

      <h3>Existing Courses</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Name</th>
            <th>Course Description</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.course_name}</td>
                <td>{course.course_description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No courses found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllCourses;
