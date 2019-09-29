<?php
$phone = $_REQUEST['phone'];
$password = $_REQUEST['password'];

// $db = $db = mysqli_connect('127.0.0.1','root','','user');
// $sql = "select * from user_info where phone=$phone and password=$password";
// $result = mysqli_query($db, $sql);
// $len = mysql_num_rows($result);
// echo $len;


$db = mysqli_connect('127.0.0.1', 'root', '', 'user');
$sql = "SELECT `id` from `user_info` where phone='$phone' and password='$password'";;
$result = mysqli_query($db,$sql);
// echo mysqli_num_rows($result);

$res = array("status" => "error");

if(mysqli_num_rows($result) == 1){
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
    $res["status"] = "success";
    $res["data"] = $data;
}
echo json_encode($res,true);
?>