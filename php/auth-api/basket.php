<?php
// Подключение к базе данных
$dbconn = pg_connect("host=95.213.151.174 dbname=postgres user=postgres password=pswd");

$data = json_decode(file_get_contents('php://input'), true);
$user_id = $_GET['user_id'];


$result = pg_query_params($dbconn, "SELECT merch_id FROM orders WHERE user_id = $1", array($user_id));
if (!$result) {
    echo "Ошибка выполнения запроса: " . pg_last_error($dbconn);
    exit;
}
$merch_ids = pg_fetch_all_columns($result);


$merch_info = array();
foreach ($merch_ids as $merch_id) {
    $result = pg_query_params($dbconn, "SELECT * FROM merch WHERE id = $1", array($merch_id));
    $merch_info[] = pg_fetch_assoc($result);
}


pg_close($dbconn);


echo json_encode($merch_info);
?>
