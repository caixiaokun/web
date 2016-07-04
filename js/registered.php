<?php
 header('Content-Type:text/html;charset=utf-8');
$link=mysql_connect('localhost','a0527161852','69e4193e');
mysql_query('set names utf8');
mysql_query('use a0527161852');
  if(isset($_POST['data'])){
	$uname=$_POST['data']['uname'];
	$pwd=$_POST['data']['pwd'];
	$sql="insert into user values(null,'$uname','$pwd')";
	mysql_query($sql);
	echo json_encode(array('info'=>'注册成功'));
}
else{
	  $username=$_GET['username'];
	 $sql="select *from user where username='$username'";
    $result=mysql_query($sql);
    $res=mysql_fetch_assoc($result);
    if($res['username']==$username&&$res['username']!=''){
        echo 1;
    }else{
        echo 2;
    }
}
  
?>