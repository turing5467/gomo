<?php
$phone = $_REQUEST['phone'];
$password = $_REQUEST['password'];

// $db = $db = mysqli_connect('127.0.0.1','root','','user');
// $sql = "select * from user_info where phone=$phone and password=$password";
// $result = mysqli_query($db, $sql);
// $len = mysql_num_rows($result);
// echo $len;


$conn = new mysqli('127.0.0.1', 'root', '', 'user');
$sql = "select * from user_info where phone=$phone and password=$password";;
$result = $conn->query($sql);
echo $result->num_rows;
?>