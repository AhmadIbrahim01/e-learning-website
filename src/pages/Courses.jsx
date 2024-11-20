import axios from "axios";
import React, { useState, useEffect } from "react";

const Courses = () => {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);

  const getCourses = async () => {
    try {
      const result = await axios.get(
        "http://localhost/e-learning-website/server/api/getCourses.php",
        {
          headers: {
            Authorization: localStorage.token,
          },
        }
      );

      if (result.data.status === "success" && result.data.data.length > 0) {
        setData(result.data.data);
        setFlag(true);
      } else {
        setFlag(false);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setFlag(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div>
      <h1>Courses</h1>
      {flag ? (
        <div>
          {data.map((user) => (
            <div key={user.id}>
              
              {user.courses.length > 0 ? (
                <>
                <h2>{user.name} ({user.user_type})</h2>
                <ul>
                  {user.courses.map((course) => (
                    <li key={course.id}>
                      <strong>{course.name}</strong>: {course.description}
                    </li>
                  ))}
                </ul>
                </>

              ) : (
                null
              )}
            </div>
          ))}
        </div>
      ) : (
        <h2>No data available or user has no courses</h2>
      )}
    </div>
  );
};

export default Courses;
