<?php

include "connection.php";

$sql = "
    SELECT 
        users.id AS user_id,
        users.name AS user_name,
        users.email AS user_email,
        users.user_type,
        users.is_banned,
        all_courses.id AS course_id,
        all_courses.course_name,
        all_courses.course_description
    FROM users
    LEFT JOIN student_courses ON users.id = student_courses.student_id
    LEFT JOIN all_courses ON student_courses.course_id = all_courses.id
";

$result = $connection->query($sql);

$response = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $userId = $row['user_id'];

        if (!isset($response[$userId])) {
            $response[$userId] = [
                "id" => $row["user_id"],
                "name" => $row["user_name"],
                "email" => $row["user_email"],
                "user_type" => $row["user_type"],
                "is_banned" => $row["is_banned"],
                "courses" => []
            ];
        }

        if ($row["course_id"]) {
            $response[$userId]["courses"][] = [
                "id" => $row["course_id"],
                "name" => $row["course_name"],
                "description" => $row["course_description"]
            ];
        }
    }
}

$response = array_values($response);

header('Content-Type: application/json');
echo json_encode(["status" => "success", "data" => $response]);

$connection->close();
?>
