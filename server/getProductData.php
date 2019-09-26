<?php

// header("content-type:text/html;charset=utf-8");

# 001-先连接数据库
$db = mysqli_connect("127.0.0.1", "root", "", "product");
//中文乱码解决

$size = 48;


mysqli_set_charset($db,'utf8');
$page = $_REQUEST["page"] * $size;  //0（0-20） 1（20-40） 2 3 4

//0-综合 1-升序 2-降序 3-评价降序 4-价格区间
$type = $_REQUEST["type"];



# 002-查询数据库得到所有的产品

if($type == 0){
  $sql = "SELECT * FROM info limit $page , $size";
}elseif($type ==1)
{
  $sql = "SELECT * FROM info  ORDER BY `info`.`price` ASC limit $page , $size";
}elseif($type == 2)
{
  $sql = "SELECT * FROM info  ORDER BY `info`.`price` DESC limit $page , $size";
}elseif($type == 3)
{
  $sql = "SELECT * FROM info  ORDER BY `info`.`comment` desc limit $page , $size";
}elseif($type == 4)
{
  $low_price = $_REQUEST['low_price'];
  $high_price = $_REQUEST['high_price'];
  $sql = "SELECT * FROM info where `price` BETWEEN $low_price AND $high_price limit $page , $size";
}

$result = mysqli_query($db,$sql);

# 003-把数据转换为JSON数据返回
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
$response = array("status"=>"success","data" => $data);
echo json_encode($response,true);
?>