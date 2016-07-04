<?php
    header('Content-Type:text/html;charset=utf-8');
    $link=mysql_connect('localhost','a0527161852','69e4193e');
    mysql_query('set names utf8');
    mysql_query('use a0527161852');
    $username=$_GET['username'];
    $password=$_GET['password'];
    $sql="select *from user where username='$username' limit 1";
    $result=mysql_query($sql);
    $res=mysql_fetch_assoc($result);
    if($res['password']==$password){
        echo 1;
    }else{
        echo 2;
    }
?>