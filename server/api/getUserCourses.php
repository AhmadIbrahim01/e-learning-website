<?php

    include "connection.php";
    require "vendor/autoload.php";

    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    $secretKey = "MyTopSecretKey";
    $headers = getallheaders();
    $jwt = $headers["Authorization"];

    $key = new Key($secretKey, "HS256");
    $payload = JWT::decode($jwt, $key);

    $id = $payload->userId;

    $query = $connection->prepare("SELECT * FROM courses WHERE user_id = ?");
    $query->bind_param("i", $id);
    $query->execute();

    $result = $query->get_result();

    if($result->num_rows != 0) {
        $courses = [];

        while($course = $result->fetch_assoc()) {
            $courses[] = $course;
        }

        http_response_code(200);

        echo json_encode([
            "message" => "Courses retrieved successfully",
            "courses" => $courses,
        ]);

    } else {
        http_response_code(404);

        echo json_encode([
            "message" => "User has no courses"
        ]);
}