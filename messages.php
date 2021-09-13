

<?php

if(!empty($_REQUEST['collection'])) {
	$collection = $_REQUEST['collection'];
}

function mysqlconnect(){
  mysql_connect("localhost", "***", "***") or die(mysql_error());
  mysql_select_db("nftplayground") or die(mysql_error());
}

function get_messages($collection){
	$result=mysql_query("SELECT * FROM `msgs` WHERE `collection_name` LIKE '".$collection."' ORDER BY `time` DESC LIMIT 100");
	$numrows = mysql_num_rows($result);
	$msgs_array = array();
	while ($rows=mysql_fetch_array($result)){
		array_push($msgs_array,$rows);
	} 
	return $msgs_array;
}


mysqlconnect();
$messages_array = get_messages($collection);
$numrows = count($messages_array);

if ($numrows == 0){
	echo "<div class='alert alert-warning' role='alert'>You're the first one here from <i>".$collection."</i>! Leave a message and invite some friends :)</div>";
}

for( $i = 0; $i<$numrows; $i++ ) {



	$message = $messages_array[$i]['message'];
	$name = $messages_array[$i]['name'];
	$time = $messages_array[$i]['time'];

	echo "<div class='row'><div class='col-3'><b>".$name."</b></div><div class='col-6'>".$message."</div><div class='col-3'>".$time."</div></div>";

}

?>