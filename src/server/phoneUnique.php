<?php
$phone = $_REQUEST['phone'];
$db = mysqli_connect("127.0.0.1","root","","user");
$sql = "SELECT * FROM user_info WHERE phone='$phone'";

// echo $sql;
$result = mysqli_query($db,$sql);


if(mysqli_num_rows($result) == "1"){
  echo 0;
}else{
  echo 1;
}

?>