import React from "react";


const AllCourses = ({ courses = [] }) => {
    return (
      <div>
        <h2>All Courses</h2>
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