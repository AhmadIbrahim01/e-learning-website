<?php

include "connection.php";

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
        echo json_encode([
            "status" => "Successful",
            "message" => $user,
        ]);
        
    } else {
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