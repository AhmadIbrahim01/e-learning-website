import React, { useState } from "react";
import axios from "axios";

const AllCourses = ({ courses = [], setCourses }) => {
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const handleRemoveCourse = async (courseId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (!confirmDelete) return;

    try {
      const response = await axios.post(
        "http://localhost/e-learning-website/server/api/removeCourse.php",
        { course_id: courseId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        const updatedCourses = courses.filter(course => course.id !== courseId);
        setCourses(updatedCourses);
        alert("Course deleted successfully.");
      } else {
        setError("Failed to delete course");
        alert(response.data.message || "Error deleting course.");
      }
    } catch (err) {
      console.error("Error removing course:", err);
      setError("Error removing course.");
      alert("Error deleting course.");
    }
  };

  const handleEditClick = (course) => {
    setEditingCourse(course);
    setCourseName(course.course_name);
    setCourseDescription(course.course_description);
  };

  const handleCourseUpdate = async (e) => {
    e.preventDefault();

    if (!courseName || !courseDescription) {
      setMessage("Please fill out both fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost/e-learning-website/server/api/editCourse.php",
        {
          course_id: editingCourse.id,
          course_name: courseName,
          course_description: courseDescription,
        }
      );

      if (response.data.status === "success") {
        const updatedCourses = courses.map((course) =>
          course.id === editingCourse.id
            ? { ...course, course_name: courseName, course_description: courseDescription }
            : course
        );
        setCourses(updatedCourses);
        setEditingCourse(null);
      } else {
        alert("Failed to update course");
      }
    } catch (err) {
      console.error("Error updating course:", err);
      alert("Error updating course");
    }
  };

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

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p>{message}</p>}


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
      
      <h2>All Courses</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Name</th>
            <th>Course Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.course_name}</td>
                <td>{course.course_description}</td>
                <td>
                  <button onClick={() => handleRemoveCourse(course.id)}>Delete</button>
                  <button onClick={() => handleEditClick(course)}>Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No courses found</td>
            </tr>
          )}
        </tbody>
      </table>

      {editingCourse && (
        <div className="modal">
          <h3>Edit Course</h3>
          <form onSubmit={handleCourseUpdate}>
            <div>
              <label>Course Name</label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Course Description</label>
              <textarea
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit">Save Changes</button>
            <button
              type="button"
              onClick={() => setEditingCourse(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AllCourses;
