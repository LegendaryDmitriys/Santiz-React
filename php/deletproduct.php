<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$delete = json_decode(file_get_contents('php://input'), true);

$user_id = $delete['user_id'];
$item_id = $delete['item_id'];
$selected_size = $delete['selected_size'];


if (!isset($user_id) || !isset($item_id) || !isset($selected_size)) {
    $response = array('status' => 'error', 'message' => '����������� ����������� ���������');
    echo json_encode($response);
    exit();
}

$dbconn = pg_connect("host=95.213.151.174 dbname=postgres user=postgres password=pswd") or die("�� ������� ������������ � ��");


$sql = "DELETE FROM orders WHERE user_id = $1 AND merch_id = $2 AND selected_size = $3";
$result = pg_query_params($dbconn, $sql, array($user_id, $item_id, $selected_size));


if ($result) {

    $response = array('status' => 'success', 'message' => '������ ������� �������');
    echo json_encode($response);
} else {
   
    $response = array('status' => 'error', 'message' => '������ ���������� ������� ��� ������ �� �������');
    echo json_encode($response);
}


pg_close($dbconn);
?>
