<?php

header("Access-Control-Allow-Origin: *");
$dbconn = pg_connect("host=95.213.151.174 dbname=postgres user=postgres password=pswd");

if (!$dbconn) {
    die("Connection failed: " . pg_last_error());
}

// Check if album_id is set in the request
if (isset($_GET['album_id'])) {
    $albumId = pg_escape_string($_GET['album_id']);

    // Query tracks for a specific album
    $query = "SELECT * FROM track WHERE album_id = $albumId";
    $result = pg_query($dbconn, $query);

    if (!$result) {
        die("Error in SQL query: " . pg_last_error());
    }

    $data = array();
    while ($row = pg_fetch_assoc($result)) {
        $data[] = $row;
    }

    echo json_encode($data);

    pg_free_result($result);
} else {
    // Query all albums
    $query = "SELECT * FROM albums";
    $result = pg_query($dbconn, $query);

    if (!$result) {
        die("Error in SQL query: " . pg_last_error());
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
