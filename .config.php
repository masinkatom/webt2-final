<?php
$host = 'node24.webte.fei.stuba.sk';
$username = 'xbrilla';
$password = 'presovskaBorka22';
$dbname = 'WIAH';

try {
    // Create a new PDO instance
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

    // Set PDO to throw exceptions on errors
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Optionally, set the default fetch mode to associative array
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // Optionally, set character set
    $pdo->exec("SET NAMES 'utf8'");

    // Connection successful
    //echo "Connected successfully";
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Access-Control-Allow-Headers: Content-Type');
} catch (PDOException $e) {
    // Connection failed, handle the error
    echo "Connection failed: " . $e->getMessage();
}
