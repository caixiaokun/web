<?php
header('Content-Type:text/html;charset=utf-8');
$link=mysql_connect('localhost','a0527161852','69e4193e');
mysql_query('set names utf8');
mysql_query('use a0527161852');
if(isset($_POST['data'])){
	$con=$_POST['data']['con'];
	$ant=$_POST['data']['ant'];
	$date=$_POST['data']['date'];
	$sql="insert into info values(null,'$con','$ant','$date')";
	mysql_query($sql);
	echo json_encode(array('info'=>'success'));
}
else{
		$sql=mysql_query("select * from info order by id");
		while ($row=mysql_fetch_array($sql)) {
				$sayList[] = array(
					'id'=>$row['id'],
					'content'=>$row['content'],
					'anthor'=>$row['anthor'],
					'date'=>$row['date']
				);
			}
	echo json_encode($sayList);
}
?>