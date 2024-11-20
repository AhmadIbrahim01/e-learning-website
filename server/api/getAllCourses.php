<?php

include "connection.php";

$result = $connection->query("SELECT * FROM all_courses");

if ($result->num_rows > 0) {
    $courses = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode([
        'status' => 'success',
        'data' => $courses
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'No courses found.'
    ]);
}

$connection->close();
?>
