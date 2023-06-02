<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents('php://input'), true);

$product = $data["product"];
$size = $data["size"];
$userId = $data["userId"];

// создание подключения к БД
$conn = pg_connect("host=localhost dbname=Santiz user=Admin password=Admin");

// выполнение запроса на добавление в таблицу orderss
$result = pg_query_params($conn, "INSERT INTO orders (user_id, merch_id,selected_size) VALUES ($1, $2, $3)", array($userId, $product, $size));

// проверка результата выполнения запроса
if ($result) {
    // запрос выполнен успешно, возвращаем результат
    $response = array("status" => "success");
    echo json_encode($response);
} else {
    // произошла ошибка при выполнении запроса, возвращаем ошибку
    $response = array("status" => "error", "message" => pg_last_error($conn));
    echo json_encode($response);
}

// закрытие соединения с БД
pg_close($conn);
?>
