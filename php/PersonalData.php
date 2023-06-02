<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

$postData = json_decode(file_get_contents('php://input'), true);
$userId = $postData["userId"];
$firstName = $postData["firstName"];
$lastName = $postData["lastName"];

$conn = pg_connect("host=95.213.151.174 dbname=postgres user=postgres password=pswd");


if (!$conn) {
    echo json_encode(['error' => '������ ����������� � ���� ������']);
    exit;
}


$query = "SELECT COUNT(*) FROM user_profiles WHERE user_id = $1";
$result = pg_query_params($conn, $query, array($userId));

if (!$result) {
    echo json_encode(['error' => '������ ���������� �������']);
    exit;
}

$row = pg_fetch_row($result);
$count = (int) $row[0];

if ($count === 0) {

    $query = "INSERT INTO user_profiles (user_id, first_name, last_name) VALUES ($1, $2, $3)";
    $result = pg_query_params($conn, $query, array($userId, $firstName, $lastName));
} else {

    $query = "UPDATE user_profiles SET first_name = $1, last_name = $2 WHERE user_id = $3";
    $result = pg_query_params($conn, $query, array($firstName, $lastName, $userId));
}

if ($result) {

    $response = [
        "userId" => $userId,
        "firstName" => $firstName,
        "lastName" => $lastName
    ];
    echo json_encode($response);
} else {
    echo json_encode(["error" => "������ ���������� ������"]);
}


pg_close($conn);
?>
