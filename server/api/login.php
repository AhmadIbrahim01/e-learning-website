<?php

include "connection.php";

require "vendor/autoload.php";

use Firebase\JWT\JWT;

$secretKey = "Freedom";
$email = $_POST["email"];
$password = $_POST["password"];

$query = $connection->prepare("SELECT * FROM users WHERE email = ?");
$query->bind_param("s", $email);
$query->execute();

$result = $query->get_result();


if($result->num_rows != 0){
    $user = $result->fetch_assoc();

    $check = password_verify($password, $user["password"]);

    if($check){

        $payload = [
            "userId" => $user["id"]
        ]

        $token = JWT::encode($payload, $secretKey, "HS256");

        echo json_encode([
            "status" => "Successful",
            "message" => $user,
            "access_token" => $token,
        ]);
        
    } else {
        http_response_code(400);
        echo json_encode([
            "status" =>  "Invalid credentials",
        ]);
    }

} else {
    echo json_encode([
        "status" =>  "Invalid credentials",
    ]);
};


?>