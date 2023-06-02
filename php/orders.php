<?php
$conn = pg_connect("host=95.213.151.174 dbname=postgres user=postgres password=pswd");


$user_id = $_GET['user_id'];


$result = pg_query_params($conn, 'SELECT * FROM orders WHERE user_id = $1', [$user_id]);


if ($result) {
    $rows = pg_fetch_all($result);
    echo json_encode($rows);
} else {
    echo "������ ���������� �������";
}


pg_close($conn);
?>