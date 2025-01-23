<?php
// Database credentials
$servername = "auth-db1746.hstgr.io";
$username = "u453897290_imdadtrust"; 
$password = "pakistanIMDAD789+";
$dbname = "u453897290_imdadtrust";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
