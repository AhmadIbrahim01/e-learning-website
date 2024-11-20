<?php

include "connection.php";

require "vendor/autoload.php";

use Firebase\JWT\JWT;


// it always decode
// since we are getting the values stringified from the user
$data = json_decode(file_get_contents("php://input"),true);

$secretKey = "MyTopSecretKey";

$email = $data["email"] ?? null;
$password = $data["password"] ?? null;


if ($email == null || $password == null) {
    echo json_encode([
        "message" => "Credentials are required",
    ]);

    return;
}


$query = $connection->prepare("SELECT * FROM users WHERE email = ?");
$query->bind_param("s", $email);
$query->execute();

$result = $query->get_result();


if($result->num_rows != 0){
    $user = $result->fetch_assoc();

    $check = password_verify($password, $user["password"]);

    if($check){

        $payload = [
            "userId" => $user["id"],
            "userType" => $user["user_type"],
        ];

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
    http_response_code(400);
    echo json_encode([
        "status" =>  "Invalid credentials",
    ]);
};


?>