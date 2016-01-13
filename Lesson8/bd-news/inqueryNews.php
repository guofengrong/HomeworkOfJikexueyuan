<?php
header("charset=utf-8");
$con = mysql_connect("localhost","root","");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());	//连接失败时显示无法连接并且抛出错误；
}else{
	//链接成功时从前端读取需要查询的新闻类型，然后对数据库中的newslist表单进行查询，将查询的结果进行赋值，同时得出查询结果的行数，然后逐行输出html标签，进行前端展示
	mysql_select_db('newslist', $con);
	mysql_query("set names utf8");
	$newsClass = $_REQUEST['newsclass'];
	$sql = "SELECT * FROM newslist WHERE newsclass = '$newsClass' order by newsid desc";
	$result = mysql_query($sql);
	$num = mysql_num_rows($result);
	echo "<table class='table'>";
	echo "<tr><th>序号</th><th>新闻图片地址</th><th>新闻标题</th><th>新闻内容</th><th>添加时间</th><th>操作</th></tr>";
	for ($i=0; $i < $num; $i++) { 
		$resultArr = mysql_fetch_assoc($result);
		$newsId = $resultArr['newsid'];
		$newsImg = $resultArr['newsimg'];
		$newsTitle = $resultArr['newstitle'];
		$newsContent = $resultArr['newscontent']; 
		$addTime = $resultArr['addtime'];
		echo "<tr><td class='newsid'>$newsId</td><td><img src='$newsImg'></img></td><td>$newsTitle</td><td><p class='news-content'>$newsContent</p></td><td>$addTime</td><td><input class='update' type='button' value='编辑'/><input class='delete' type='button' value='删除'/></td></tr>";
		// print_r($resultArr);

	}
	echo "</table>";

}
mysql_close($con);	//关闭连接
?>
