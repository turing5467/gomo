<?php
// phone,username,pwd
$phone = $_REQUEST['phone'];
$username = $_REQUEST['username'];
$pwd = $_REQUEST['pwd'];

/* 
$db = mysqli_connect("127.0.0.1", "root", "root", "webdata");
3.
4.插入数据操作：  
5.$sql = "INSERT INTO `userList` (`username`, `password`, `phone`) VALUES ('$username', '$password', '$phone')";
6.
7.执行SQL语句：  
8.$result = mysqli_query($db, $sql);
*/
$db = mysqli_connect("127.0.0.1", "root", "", "user");
$sql = "INSERT INTO `user_info` (`phone`, `username`, `password`) VALUES ('$phone', '$username', '$pwd')";
$result = mysqli_query($db, $sql);
echo result;
?>