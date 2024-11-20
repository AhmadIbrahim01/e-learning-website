<?php

include "connection.php";

$name = $_POST["name"];
$email = $_POST["email"];
$password = $_POST["password"];
// $user_type = $_POST["user_type"];
$user_type = "student";

$query = $connection->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
$query->bind_param("s", $email);
$query->execute();
$query->bind_result($count);
$query->fetch();
$query->close();

if ($count > 0) {
    echo json_encode([
        "status" => "Failed",
        "message" => "Email already in use. Please use a different email."
    ]);
    exit;
}

$hashed = password_hash($password, PASSWORD_DEFAULT);

$query = $connection->prepare("INSERT INTO users (name, email, password, user_type, is_banned) VALUES (?, ?, ?, ?, 0)");
$query->bind_param("ssss", $name, $email, $hashed, $user_type);

$query->execute();
$result = $query->affected_rows;

if ($result != 0) {
    echo json_encode([
        "status" => "Successful",
        "message" => "$result user created",
    ]);
} else {
    echo json_encode([
        "status" => "Failed",
        "message" => "Couldn't create record",
    ]);
}

?>
