<?php
header("charset=utf-8");
$con = mysql_connect("localhost","root","");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());  //若链接不成功则抛出错误
}else{
	// 连接成功时执行
	$countNews = $_REQUEST['countnews'];
	mysql_select_db('newslist', $con);
	mysql_query("set names utf8");
	$newsClass = $_REQUEST['newsclass'];	//从js中读取当前点选的新闻类型，用于搜索数据库中相匹配的新闻及相关信息
	$sql = "SELECT * FROM newslist WHERE newsclass = '$newsClass' order by newsid asc limit 0,$countNews ";
	$result = mysql_query($sql);
	$num = mysql_num_rows($result);
	//将数据库表单中符合搜索条件的新闻各个信息分别赋值，
	//最后以html标签的形式输出
	for ($i=0; $i < $num; $i++) { 
		$resultArr = mysql_fetch_assoc($result);
		$newsId = $resultArr['newsid'];
		$newsImg = $resultArr['newsimg'];
		$newsTitle = $resultArr['newstitle'];
		$newsContent = $resultArr['newscontent']; 
		$addTime = $resultArr['addtime'];
		// print_r($resultArr);
		if ($newsImg==''||$newsImg == 'undefined') {
			echo "<div class='news-list-item'><div class='news-info'><div class='news-content'><h2 class='news-title'>$newsTitle</h2><p class='news-text'>$newsContent</p></div><div class='addtime'>$addTime</div></div></div>";
		}else{
			echo "<div class='news-list-item'><div class='news-img'><a href='#'><img src='$newsImg' alt='news-img'></a></div><div class='news-info'><div class='news-content'><h2 class='news-title'>$newsTitle</h2><p class='news-text'>$newsContent</p></div><div class='addtime'>$addTime</div></div></div>";
		}
	}
}
mysql_close($con);	//关闭连接
?>