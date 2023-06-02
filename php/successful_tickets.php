<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');
header('Content-Type: text/html; charset=utf-8');

$dbconn = pg_connect("host=95.213.151.174 dbname=postgres user=postgres password=pswd");

if (!$dbconn) {
    die("Ошибка подключения к базе данных: " . pg_last_error());
}

try {

    $succes_ticket = json_decode(file_get_contents('php://input'), true);
    $userId = $succes_ticket['userId'];
    $selectedSeats = $succes_ticket['selectedSeats'];
    $ticketIds = $succes_ticket['ticketIds'];
    $tourIds = $succes_ticket['tourIds'];
    $prices = $succes_ticket['prices'];


    // Подготовка и выполнение запроса вставки данных
    $query = pg_prepare($dbconn, "insert_query", "INSERT INTO successful_orders_tickets (user_id, seat, id_tickets, tour_id, price) VALUES ($1, $2, $3, $4, $5)");

    foreach ($selectedSeats as $index => $seat) {
        $result = pg_execute($dbconn, "insert_query", array($userId, $seat, $ticketIds[$index], $tourIds, floatval($prices[$index])));

        if (!$result) {
            throw new Exception("Ошибка при выполнении запроса на вставку данных");
        }

        // Обновление статуса билета на "куплено"
        $updateQuery = "UPDATE tickets SET is_sold = true WHERE id = " . $ticketIds[$index];
        $updateResult = pg_query($dbconn, $updateQuery);

        if (!$updateResult) {
            throw new Exception("Ошибка при обновлении статуса билета");
        }
    }

    // Отправка успешного ответа клиенту
    $response = array('success' => true);
    echo json_encode($response);
} catch (Exception $e) {
    // Отправка ошибки клиенту
    $response = array('success' => false, 'error' => $e->getMessage());
    echo json_encode($response);
}

// Закрытие соединения с базой данных
pg_close($dbconn);
?>
