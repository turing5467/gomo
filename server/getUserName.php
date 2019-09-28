<?php
$id = $_REQUEST['id'];

$db = mysqli_connect('127.0.0.1', 'root', '', 'user');
$sql = "SELECT `username` from `user_info` where id='$id'";
$result = mysqli_query($db,$sql);


$res = array("status" => "error");

if(mysqli_num_rows($result) == 1){
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
    $res["status"] = "success";
    $res["data"] = $data;
}
echo json_encode($res,true);


?>