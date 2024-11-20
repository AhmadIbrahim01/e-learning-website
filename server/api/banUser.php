<?php
include "connection.php";

$user_id = $_POST['id'];
$is_banned = $_POST['is_banned'];

$sql = "UPDATE users SET is_banned = ? WHERE id = ?";

$stmt = $connection->prepare($sql);
$stmt->bind_param("si", $is_banned, $user_id);

if ($stmt->execute()) {
    echo json_encode([
        'status' => 'success',
        'message' => 'User has been banned.'
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to ban the user.'
    ]);
}

$stmt->close();
$connection->close();
?>
