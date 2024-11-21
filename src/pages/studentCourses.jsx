import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StudentCourses.css";

const StudentCourses = () => {
  const storedId = localStorage.getItem("id");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost/e-learning-website/server/api/getUserCourses.php", {
          params: { student_id: storedId },
        });

        if (response.data.success) {
          setCourses(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch courses.");
        }
      } catch (err) {
        setError("An error occurred while fetching courses.");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [storedId]);

  return (
    <div className="courses-container">
      <h1>My Courses</h1>

      {loading && <p>Loading courses...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <ul className="course-list">
          {courses.map((course, index) => (
            <li key={index} className="course-item">
              <h2>{course.course_name}</h2>
              <p>{course.course_description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentCourses;
