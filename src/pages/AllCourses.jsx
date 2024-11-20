import React, { useState } from "react";
import axios from "axios";

const AllCourses = ({ courses = [], setCourses }) => {
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const handleEditClick = (course) => {
    setEditingCourse(course);
    setCourseName(course.course_name);
    setCourseDescription(course.course_description);
  };

  const handleCourseUpdate = async (e) => {
    e.preventDefault();

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

  return (
    <div>
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
