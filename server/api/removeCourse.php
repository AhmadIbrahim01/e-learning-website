<?php
header('Content-Type: application/json');
include "connection.php";

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['course_id'])) {
    $course_id = $connection->real_escape_string($data['course_id']);

    $delete_references_query = "DELETE FROM student_courses WHERE course_id = $course_id";
    
    if ($connection->query($delete_references_query) === TRUE) {
        $query = "DELETE FROM all_courses WHERE id = $course_id";

        if ($connection->query($query) === TRUE) {
            echo json_encode(["status" => "success", "message" => "Course deleted successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to delete course: " . $connection->error]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to remove course references: " . $connection->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Missing course_id"]);
}

$connection->close();
?>
