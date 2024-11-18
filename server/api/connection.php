<?php

$host = "localhost";
$username = "root";
$password = "";
$dbname = "e_learning_db";


$connection = new mysqli($host, $username, $password, $dbname);


if($connection->connect_error){
    die("Connection Error");
} else {
    echo "Connection Successful";
}


?>