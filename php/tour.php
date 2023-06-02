<?php

header("Access-Control-Allow-Origin: *");
$dbconn = pg_connect("host=95.213.151.174 dbname=postgres user=postgres password=pswd");

if (!$dbconn) {
    die("������ �����������: " . pg_last_error());
}

$query = "SELECT * FROM tour";
$result = pg_query($dbconn, $query);

if (!$result) {
    die("������ � Sql �������: " . pg_last_error());
}

$data = array();
while ($row = pg_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data);

pg_free_result($result);
pg_close($dbconn);
?>
