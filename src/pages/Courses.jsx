import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

const Courses = () => {

    const [data, setData] = useState("");
    const [flag, setFlag] = useState(false);

  const getCourses = async () => {
    try {
      const result = await axios.get(
        "http://localhost/e-learning-website/server/api/getUserCourses.php",
        {
          headers: {
            Authorization: localStorage.token,
          },
        }
      );

      console.log(result);
      const courseNames = result.data.courses.map(item => item.name).join(", ");
      setData(courseNames);
      setFlag(true);
      
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();

    console.log("Here");
  }, []);

  return (
    <div>
        <h1>Courses</h1>
        <h2>{flag ? data : "User has no courses"}</h2>
    </div>
  );
};

export default Courses;
