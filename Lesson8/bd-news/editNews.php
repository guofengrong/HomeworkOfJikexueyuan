<?php
header("charset=utf-8");
$con = mysql_connect("localhost","root","");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());	//连接失败时显示无法连接并且抛出错误；
  }else{
  		//连接成功时，从前端读取对应的数据进行赋值，然后写入到表单中，写入成功后输出提交成功字样；
	  	mysql_select_db("newslist", $con);
	  	$newstitle=$_REQUEST['newstitle'];
	  	$newsclass=$_REQUEST['newsclass'];
	  	$newsimg=$_REQUEST['newsimg'];
	  	$newscontent=$_REQUEST['newscontent'];
	  	$addtime=$_REQUEST['addtime'];
		$sql = "INSERT INTO newslist (newsclass,newstitle,newsimg,newscontent,addtime) 
		VALUES ('".$newsclass."','".$newstitle."','".$newsimg."','".$newscontent."','".$addtime."')";
	  	mysql_query("set names utf8");
	  	$result = mysql_query($sql,$con);
	  	if (!$result) {
	  		die('Error'.mysql_error());
	  	}else{
	  		echo "提交成功";
	  	}
  }
mysql_close($con);	//操作完成后关闭连接
?>