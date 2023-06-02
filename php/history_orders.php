<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

$dbconn = pg_connect("host=95.213.151.174 dbname=postgres user=postgres password=pswd");

if (!$dbconn) {
    die("Ошибка подключения: " . pg_last_error());
}


$user_id = $_GET['user_id'];

$query = "SELECT * FROM successful_orders  WHERE user_id=$1";
$result = pg_query_params($dbconn, $query, array($user_id));

if (!$result) {
    die("Ошибка в Sql запросе: " . pg_last_error());
}

$data = array();
while ($row = pg_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data);

pg_free_result($result);
pg_close($dbconn);

