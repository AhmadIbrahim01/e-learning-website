<?php
header("Content-Type: application/json");

include "connection.php";

$student_id = isset($_GET['student_id']) ? intval($_GET['student_id']) : 0;

if ($student_id <= 0) {
    echo json_encode(["success" => false, "message" => "Invalid student ID."]);
    exit;
}

$sql = "SELECT all_courses.course_name, all_courses.course_description 
        FROM student_courses 
        INNER JOIN all_courses ON student_courses.course_id = all_courses.id 
        WHERE student_courses.student_id = ?";

$query = $connection->prepare($sql);
$query->bind_param("i", $student_id);
$query->execute();
$result = $query->get_result();

$courses = [];
while ($row = $result->fetch_assoc()) {
    $courses[] = $row;
}

$query->close();
$connection->close();

echo json_encode(["success" => true, "data" => $courses]);
?>
