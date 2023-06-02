<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uploads_dir = './uploads'; // директория, куда будут загружаться файлы
    $tmp_name = $_FILES["file"]["tmp_name"];
    $name = basename($_FILES["file"]["name"]);
    $upload_path = "$uploads_dir/$name";
    if (move_uploaded_file($tmp_name, $upload_path)) {
        $fileUrl = "http://192.168.0.104/uploads/$name";
        echo json_encode(['fileUrl' => $fileUrl]);
    } else {
        header('HTTP/1.1 500 Internal Server Error');
        echo json_encode(['error' => 'Failed to upload file']);
    }
}