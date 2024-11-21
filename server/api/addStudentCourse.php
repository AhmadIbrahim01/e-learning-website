<?php

include "connection.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['student_id']) || !isset($data['course_id'])) {
    echo json_encode(["status" => "error", "message" => "Invalid input data"]);
    exit;
}

$student_id = $data['student_id'];
$course_id = $data['course_id'];

$checkStudentQuery = "SELECT id FROM users WHERE id = ? AND user_type = 'student' AND is_banned = 0";
$query = $connection->prepare($checkStudentQuery);
$query->bind_param("i", $student_id);
$query->execute();
$result = $query->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["status" => "error", "message" => "Student not found or is banned"]);
    $query->close();
    $connection->close();
    exit;
}
$query->close();

$checkCourseQuery = "SELECT id FROM all_courses WHERE id = ?";
$query = $connection->prepare($checkCourseQuery);
$query->bind_param("i", $course_id);
$query->execute();
$result = $query->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["status" => "error", "message" => "Course not found"]);
    $query->close();
    $connection->close();
    exit;
}
$query->close();

$checkEnrollmentQuery = "SELECT * FROM student_courses WHERE student_id = ? AND course_id = ?";
$query = $connection->prepare($checkEnrollmentQuery);
$query->bind_param("ii", $student_id, $course_id);
$query->execute();
$result = $query->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Student already enrolled in this course"]);
    $query->close();
    $connection->close();
    exit;
}
$query->close();

$insertQuery = "INSERT INTO student_courses (student_id, course_id) VALUES (?, ?)";
$query = $connection->prepare($insertQuery);
$query->bind_param("ii", $student_id, $course_id);

if ($query->execute()) {
    echo json_encode(["status" => "success", "message" => "Course added successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to add course"]);
}

$query->close();
$connection->close();
?>
