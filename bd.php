<?php
class Database {
    private $db_host = '95.213.151.174';
    private $db_name = 'postgres';
    private $db_username = 'postgres';
    private $db_password = '';

    public function dbConnection() {
        try {
            $conn = new PDO("pgsql:host={$this->db_host};dbname={$this->db_name}", $this->db_username, $this->db_password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch(PDOException $e) {
            echo "������ ����������� ".$e->getMessage();
            exit;
        }
    }
}
