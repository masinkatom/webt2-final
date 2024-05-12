<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once '../.config.php';
require_once 'User.php';

$UserObj = new User($pdo);

$method = $_SERVER['REQUEST_METHOD'];

$request_uri = $_SERVER['REQUEST_URI'];

$url_parts = explode('adminApi.php/', $request_uri);

$endpoint = end($url_parts);

$parts_with_query = explode('?', $endpoint);
$endpoint_without_query = $parts_with_query[0];

header('Content-Type: application/json');

$method = 'DELETE';

switch ($method) {
    case 'GET':
        switch ($endpoint_without_query) {
            case 'value': 
                break;
            
            default:
                break;
        }
    case 'DELETE':
        switch ($endpoint_without_query) {
            case 'deleteUser':
                if (isset($_GET['userName'])) {
                    $userName = urldecode($_GET['userName']);
                    $deletedUser= $UserObj->deleteUserByName($userName);
                    echo json_encode($deletedUser);
                }
                break;

            default:
                break;
        }
        break;
    case 'PUT':
        switch ($endpoint_without_query) {
            case 'value':
                break;

            default:
                break;
        }
        break;
    case 'POST':
        switch ($endpoint_without_query) {
            case 'value':
                break;

            default:
                break;
        }
        break;
    default:
        break;
    }


?>