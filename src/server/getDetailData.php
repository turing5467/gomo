<?php

// header("content-type:text/html;charset=utf-8");

# 001-先连接数据库
$db = mysqli_connect("127.0.0.1", "root", "", "product");
//中文乱码解决
mysqli_set_charset($db,'utf8');

$code = $_REQUEST['code'];


#  $sql = "SELECT * FROM info limit $page , $size";
// $sql = "SELECT * FROM `detail` d inner join `info` i on d.code = i.code where d.`code` = $code";
$sql = "SELECT * FROM `detail` d,`info` i where d.`code` = i.`code` and i.`code`= '$code'";


$result = mysqli_query($db,$sql);
// echo json_encode($result,true);

# 003-把数据转换为JSON数据返回
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
// $response = array("status"=>"success","data" => $data);
echo json_encode($data,true);
?>