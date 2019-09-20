<?php
$json = file_get_contents("data.json");
# 002-把JSON数据转换为PHP数组
$arrData = json_decode($json,true);

# Array ( [src] => https://image2.suning.cn/uimg/b2c/newcatentries/0070090031-000000000803018569_1.jpg_400w_400h_4e [title] => 怡鲜来 丹麦进口冰鲜三文鱼刺身拼盘300g 日式刺身2款 新鲜生鱼片 北极贝刺身套餐 海鲜水产 [price] => 78.80 [disCount] => 400+评价 [shopName] => 怡鲜来旗舰店 )
// print_r($arrData);

# 003-先连接数据库
$db = mysqli_connect("127.0.0.1","root","root","SN");

# 004-遍历数组获取数组中每个元素
for($i = 0;$i<count($arrData);$i++)
{
  $src = $arrData[$i]["src"];
  $title = $arrData[$i]["title"];
  $price = floatval(substr($arrData[$i]["price"], 2));
  $disCount = $arrData[$i]["disCount"];
  $shopName = $arrData[$i]["shopName"];;
  $sql = "INSERT INTO `products` (`id`, `src`, `title`, `price`, `disCount`, `shopName`) 
VALUES (NULL, '$src', '$title', $price, '$disCount', '$shopName');";
  mysqli_query($db, $sql);
}

?>