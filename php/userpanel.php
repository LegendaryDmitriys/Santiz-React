<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Cache-Control: max-age=86400');

// �������� userId �� ���������� �������
$userId = $_GET['userId'];



// ����������� � ����� ������
$pdo = new PDO('pgsql:host=95.213.151.174;dbname=postgres', 'postgres', 'pswd');

// �������������� ������
$stmt = $pdo->prepare('SELECT * FROM user_profiles WHERE user_id = :userId');
$stmt->bindParam(':userId', $userId);
$stmt->execute();

// �������� ������ �� ���� ������
$userProfiles = $stmt->fetchAll(PDO::FETCH_ASSOC);

// ���������� ������ � ������� JSON
echo json_encode($userProfiles);
?>
