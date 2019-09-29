<?php
$json = file_get_contents("./cat/main_product.json");
# 002-把JSON数据转换为PHP数组
$arrData = json_decode($json,true);


# 003-先连接数据库
$db = mysqli_connect("127.0.0.1","root","","product");

# 004-遍历数组获取数组中每个元素
for($i = 0;$i<count($arrData);$i++)
{
	$id = $arrData[$i]["code"];
	$small_pics = implode('&',$arrData[$i]["small_pics"]);
	$name = $arrData[$i]["name"];
	$price = floatval(substr($arrData[$i]["price"], 3));
	$prom_text = $arrData[$i]["prom_text"];

	$shop_name = $arrData[$i]["shop_name"];
	$shop_zy_tag = $arrData[$i]["shop_zy_tag"];
	$promotion = implode('&',$arrData[$i]["promotion"]);
	$sql = "INSERT INTO `info` (`id`, `small_pics`, `name`, `price`, `prom_text`, `shop_name`, `shop_zy_tag`, `promotion`)
	VALUES ('$id', '$small_pics', '$name', $price, '$prom_text', '$shop_name', '$shop_zy_tag','$promotion');";
	mysqli_query($db, $sql);
}

$sqll = "SELECT * FROM `info`";
$result = mysqli_query($db,$sqll);
echo result

?>