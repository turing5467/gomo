<?php
 
//id product_code num  type
$id = $_REQUEST["id"];
$product_code = $_REQUEST["product_code"];
$num  = $_REQUEST["num"];
$type = $_REQUEST["type"];
$flag = $_REQUEST["flag"];

$db = mysqli_connect("127.0.0.1","root","","user");
mysqli_set_charset($db,'utf8');

$sql_q1 = "SELECT * FROM `user_cart` where `id`='$id' and `product_code`='$product_code' and `type`='$type' ";
$result1 = mysqli_query($db, $sql_q1);

if(mysqli_num_rows($result1) == 0) {
    //不曾加过购物车,则执行插入语句
    $sql = "INSERT into `user_cart` (`id`, `product_code`, `num`,`type`) VALUES ('$id', '$product_code', '$num','$type')";
}else {
    //否则,拿到原数量,并执行更新语句
    $pre_num = mysqli_fetch_all($result1, MYSQLI_ASSOC);
    // echo $flag;
    if($flag == 1) {
        $num = $num;
    }else {
        $num = $num + $pre_num["0"]["num"];

    }
    // update 表名 set 列=新值,列=新值,,where 筛选条件;
    $sql = "UPDATE `user_cart` set `num`='$num' where `id`='$id' and `product_code`='$product_code' and `type`='$type' ";
}

$result =  mysqli_query($db, $sql);



echo  json_encode($result);

?>