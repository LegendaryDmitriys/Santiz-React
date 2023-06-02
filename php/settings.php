<?php

// ��������� ���������� ��� �������� ������
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

$conn = pg_connect("host=95.213.151.174 dbname=postgres user=postgres password=pswd");

// ��������� ������ �����������
if (!$conn) {
    echo json_encode(['success' => false, 'message' => '������ ����������� � ���� ������: '.pg_last_error()]);
    exit;
}

$imgData = json_decode(file_get_contents('php://input'), true);
$userId = $imgData['userId'];
$avatarUrl = $imgData['avatarUrl'];

// ���������, ���������� �� ������ � ������������
$sql = "SELECT COUNT(*) FROM user_profiles WHERE user_id = $1";
$result = pg_query_params($conn, $sql, array($userId));

if (!$result) {
    echo json_encode(['success' => false, 'message' => '������ ���������� �������: '.pg_last_error()]);
    exit;
}

$row = pg_fetch_row($result);
$count = (int) $row[0];

// ���� ������ �� ����������, ������� ����� ������
if ($count === 0) {
    $sql = "INSERT INTO user_profiles (user_id, image_path) VALUES ($1, $2)";
    $result = pg_query_params($conn, $sql, array($userId, $avatarUrl));
} else {
    // ����� ��������� ������ � ������������ ������
    $sql = "UPDATE user_profiles SET image_path = $1 WHERE user_id = $2";
    $result = pg_query_params($conn, $sql, array($avatarUrl, $userId));
}

// ���������, ���� �� ������ ��� ���������� �������
if (!$result) {
    echo json_encode(['success' => false, 'message' => '������ ����������: '.pg_last_error()]);
    exit;
}

echo json_encode(['success' => true, 'message' => '��������� ���������']);

// ��������� ���������� � ����� ������
pg_close($conn);
?>
