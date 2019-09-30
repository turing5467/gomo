<?php
// phone,username,pwd
$phone = $_REQUEST['phone'];
$username = $_REQUEST['username'];
$pwd = $_REQUEST['pwd'];


$db = mysqli_connect("127.0.0.1", "root", "", "user");
$sql = "INSERT INTO `user_info` (`phone`, `username`, `password`) VALUES ('$phone', '$username', '$pwd')";
$result = mysqli_query($db, $sql);
echo $result;
?>