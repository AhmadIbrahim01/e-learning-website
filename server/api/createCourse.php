<?php
header('Content-Type: application/json');
include "connection.php";

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['course_name']) && isset($data['course_description'])) {
    $course_name = $connection->real_escape_string($data['course_name']);
    $course_description = $connection->real_escape_string($data['course_description']);

    $query = "INSERT INTO all_courses (course_name, course_description) VALUES ('$course_name', '$course_description')";

    if ($connection->query($query) === TRUE) {
        $last_id = $connection->insert_id;
        echo json_encode(["status" => "success", "message" => "Course added successfully", "id" => $last_id]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to add course: " . $connection->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Missing course name or description"]);
}

$connection->close();
?>