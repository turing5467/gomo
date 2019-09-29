<?php
# 001-先连接数据库
$db = mysqli_connect("127.0.0.1", "root", "", "product");

# 002-查询数据库得到所有的产品
$sql = "SELECT * FROM info";
$result = mysqli_query($db, $sql);

# 003-把数据转换为JSON数据返回
// print_r($result);
$totalCount = mysqli_num_rows($result); 
$size = 24;
$pageCount = ceil($totalCount/ $size);
// $response = array("status" => "success", "data" => $pageCount);
// echo json_encode($response, true);
$data = array($totalCount,$pageCount);
echo json_encode($data);
?>