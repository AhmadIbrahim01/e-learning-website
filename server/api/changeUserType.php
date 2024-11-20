<?php
include "connection.php";

$user_id = $_POST['id'];
$new_user_type = $_POST['user_type'];

$sql = "UPDATE users SET user_type = ? WHERE id = ?";

$query = $connection->prepare($sql);
$query->bind_param("si", $new_user_type, $user_id);

if ($query->execute()) {
    echo json_encode([
        'status' => 'success',
        'message' => 'User type has been updated.'
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to update user type.'
    ]);
}

$query->close();
$connection->close();
?>
