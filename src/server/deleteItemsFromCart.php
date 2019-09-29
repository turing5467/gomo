<?php
 
//id product_code num  type
$id = $_REQUEST["id"];
$product_code = $_REQUEST["product_code"];
$type = $_REQUEST["type"]; 

$db = mysqli_connect("127.0.0.1","root","","user");
mysqli_set_charset($db,'utf8');

$sql = "DELETE from user_cart where id='$id'";

$result =  mysqli_query($db, $sql);

echo  json_encode($result);

?>