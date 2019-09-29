<?php


# 001-先连接数据库
$db_user = mysqli_connect("127.0.0.1", "root", "", "user");
$db_product = mysqli_connect("127.0.0.1", "root", "", "product");
//中文乱码解决
mysqli_set_charset($db_user,'utf8');
mysqli_set_charset($db_product,'utf8');

$id = $_REQUEST['id'];

//购物车数据
//code name mini_pics[0](-80) types price num shop_name promotion

$sql = "SELECT `product_code`,`type`,`num` FROM `user_cart` where `id`='$id' ";

$result = mysqli_query($db_user,$sql);

$codes = mysqli_fetch_all($result);
$arr = array();
// echo json_encode($codes,true);
forEach($codes as $value) {
    $code = $value[0];
    $type = $value[1];
    $num = $value[2];
    $sqll = "SELECT i.`code`,i.`name`,i.`small_pics`,i.`price`,i.`shop_name`,i.`promotion`,d.`types`  from `detail` d,`info` i where d.`code`=i.`code` and d.`code`='$code' ";

    $results = mysqli_query($db_product,$sqll);
    $data = mysqli_fetch_all($results);
    $data = $data[0];
    array_push($data,$type);
    array_push($data,$num);

    array_push($arr,$data);
}
echo json_encode($arr);




// echo json_encode($result,true);

# 003-把数据转换为JSON数据返回

// $response = array("status"=>"success","data" => $data);
// echo json_encode($data,true);
?>