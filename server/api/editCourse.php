<?php
header('Content-Type: application/json');
include "connection.php";

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['course_id']) && isset($data['course_name']) && isset($data['course_description'])) {

    $course_id = $connection->real_escape_string($data['course_id']);
    $course_name = $connection->real_escape_string($data['course_name']);
    $course_description = $connection->real_escape_string($data['course_description']);

    $query = "UPDATE all_courses SET course_name = '$course_name', course_description = '$course_description' WHERE id = $course_id";

    if ($connection->query($query) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Course updated successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to update course: " . $connection->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Missing course_id, course_name, or course_description"]);
}

$connection->close();
?>
