<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');


$dbconn = pg_connect("host=95.213.151.174 dbname=postgres user=postgres password=pswd")
or die("�� ������� ������������ � ��");


$changePass = json_decode(file_get_contents('php://input'), true);

$userId = $changePass['userId'];
$oldPassword = $changePass['oldPassword'];
$newPassword = $changePass['newPassword'];


$query = "SELECT * FROM users WHERE id=$userId";
$result = pg_query($query);
$user = pg_fetch_assoc($result);


if (password_verify($oldPassword, $user['password'])) {


    $newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);

 
    $updateQuery = "UPDATE users SET password='$newPasswordHash' WHERE id=$userId";
    pg_query($updateQuery);


    echo json_encode(array('success' => true));

} else {


    echo json_encode(array('success' => false, 'error' => '������ ������ ��������'));

}


pg_close($dbconn);

