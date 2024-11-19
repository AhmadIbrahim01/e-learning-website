import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

const Courses = () => {


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

      console.log(result.data);
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
    </div>
  );
};

export default Courses;
