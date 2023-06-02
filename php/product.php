<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents('php://input'), true);

$product = $data["product"];
$size = $data["size"];
$userId = $data["userId"];

$conn = pg_connect("host=localhost dbname=Santiz user=Admin password=Admin");

$result = pg_query_params($conn, "INSERT INTO orders (user_id, merch_id,selected_size) VALUES ($1, $2, $3)", array($userId, $product, $size));


if ($result) {

    $response = array("status" => "success");
    echo json_encode($response);
} else {

    $response = array("status" => "error", "message" => pg_last_error($conn));
    echo json_encode($response);
}


pg_close($conn);
?>
