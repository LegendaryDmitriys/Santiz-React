<?php
header("Access-Control-Allow-Origin: *");
$dbconn = pg_connect("host=95.213.151.174 dbname=postgres user=postgres password=pswd");

if (!$dbconn) {
    die("������ �����������: " . pg_last_error());
}

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $query = "SELECT tour.*, tickets.* FROM tour LEFT JOIN tickets ON tour.id = tickets.tour_id WHERE tour.id = $id";
    $result = pg_query($dbconn, $query);

    if (!$result) {
        die("������ � SQL �������: " . pg_last_error());
    }

    $data = pg_fetch_assoc($result);

    echo json_encode($data);

    pg_free_result($result);
} else {
    $query = "SELECT tour.*, tickets.* FROM tour LEFT JOIN tickets ON tour.id = tickets.tour_id";
    $result = pg_query($dbconn, $query);

    if (!$result) {
        die("������ � SQL �������: " . pg_last_error());
    }

    $data = array();
    while ($row = pg_fetch_assoc($result)) {
        $data[] = $row;
    }

    echo json_encode($data);

    pg_free_result($result);
}

pg_close($dbconn);
?>
