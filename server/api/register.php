<?php

include "connection.php";

$name = $_POST["name"];
$email = $_POST["email"];
$password = $_POST["password"];
$user_type = $_POST["user_type"];

$hashed = password_hash($password, PASSWORD_DEFAULT);

$query = $connection->prepare("INSERT INTO users (name,email,password,user_type,is_banned) VALUES (?,?,?,?, 0)");
$query->bind_param("ssss", $name, $email, $hashed, $user_type);


$query->execute();
$result = $query->affected_rows;

if($result != 0){
    echo json_encode([
        "status" =>  "Successful",
        "message" => "$result users created",
    ]);
} else {
    echo json_encode([
        "status" =>  "Failed",
        "message" => "Couldn't create record",
    ]);
};


?>