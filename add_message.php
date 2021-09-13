<?php
	$collection = $_POST['collection'];
	$pfp = $_POST['pfp'];
	$message = $_POST['message'];

	mysql_connect("localhost", "***", "***") or die(mysql_error());
	mysql_select_db("nftplayground") or die(mysql_error());
	$query = "INSERT INTO `msgs` (`name`, `collection_name`, `message`) VALUES ('".$pfp."','".$collection."','".$message."');";
	$result = mysql_query($query);
	$response = mysql_insert_id();
	echo $response;
	mysql_close();
?>