<?php

header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}


$host = "localhost";
$username = "root";
$password = "";
$dbname = "e_learning_db";


$connection = new mysqli($host, $username, $password, $dbname);


if($connection->connect_error){
    die("Connection Error");
}

// else {
//     echo "Connection Successful";
// }


?>