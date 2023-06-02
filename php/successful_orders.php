<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');
header('Content-Type: text/html; charset=utf-8');
$dbconn = pg_connect("host=95.213.151.174 dbname=postgres user=postgres password=pswd") or die("�� ������� ������������ � ���� ������");

// ��������� ������ �� ������� �������
$succes_order = json_decode(file_get_contents('php://input'), true);
$user_id = $succes_order['user_id'];
$itemIds = $succes_order['item_ids'];
$itemSizes = $succes_order['item_sizes'];
$itemQuantities = $succes_order['item_quantities'];
$itemPrices = $succes_order['item_prices'];

// ��������, ��� user_id, item_ids, item_sizes � item_quantities �� �������� �������
if (empty($user_id) || empty($itemIds) || empty($itemSizes) || empty($itemQuantities) || empty($itemPrices)) {
    die("�������� ��������� �������");
}

// ���������� ������ ��� SQL-�������
$queryValues = [];
$total_price = 0; // �������������� ���������� ��� ����� ���������

for ($i = 0; $i < count($itemIds); $i++) {
    $itemId = $itemIds[$i];
    $itemSize = $itemSizes[$i];
    $itemQuantity = $itemQuantities[$i];
    $itemPrice = $itemPrices[$i];

    if (is_numeric($itemId) && is_numeric($itemQuantity) && is_numeric($itemPrice)) {
        $queryValues[] = "($user_id, $itemId, '$itemSize', $itemPrice, $itemQuantity)";
        $total_price += $itemPrice * $itemQuantity; // ���������� ����� ���������
    }
}

if (empty($queryValues)) {
    die("�������� ��������� �������");
}

// ������������ � ���������� SQL-������� ��� ���������� ������� � ������� �������� �������
$query = "INSERT INTO successful_orders (user_id, merch_id, selected_size, total_price, quantity) VALUES " . implode(", ", $queryValues);
$result = pg_query($dbconn, $query);

// �������� ���������� ���������� �������
if ($result) {
    echo "������ ������� ��������� � ������� �������� �������. ����� ���������: $total_price";
} else {
    echo "������ ��� ���������� ������� � ������� �������� �������";
}

pg_close($dbconn);
?>
