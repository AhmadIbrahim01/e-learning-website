<?php

include "connection.php";

$result = $connection->query("SELECT * FROM users");

if ($result->num_rows > 0) {
    $users = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode([
        'status' => 'success',
        'data' => $users
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'No users found.'
    ]);
}

$connection->close();
?>
