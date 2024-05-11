<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

$output = '';

if (isset($_SESSION["logged"]) && $_SESSION["logged"] === true) {
    $_SESSION["logged"] = false;
    $output .= '<script src="js/scriptToast.js"></script>';
    $output .= '<div id="snackbar">Operácia sa podarila</div>';
} elseif (isset($_SESSION["loggedout"]) && $_SESSION["loggedout"] === true) {
    $_SESSION["loggedout"] = false;
    $_SESSION["loggedin"] = false;
    $output .= '<script src="js/scriptToast.js"></script>';
    $output .= '<div id="snackbar">Operácia sa podarila</div>';
}


echo $output;


?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HOPA</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdn.datatables.net/2.0.7/css/dataTables.dataTables.css">

    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/toast.css">
    <link rel="stylesheet" href="css/myConsole.css">
    </head>

<body>

    <div class="container">
        <div class="main-nav">
            <ul class="nav-list">
                <?php
                if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true) {
                    echo '<li class="nav-item">
                        <a class="nav-item" href="index.php">DomXXX</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-item nav-item-current" href="#">KonzXXX</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-item" href="logout.php">OdhláseXXX</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-item" href="changePassword.php">zmenaHeslaXXX</a>
                        </li>
                        ';
                    //echo $_SESSION["login"], $_SESSION["loginID"];
                        echo '<script>var sessionLogin = "' . $_SESSION['login'] . '";</script>';
                        echo '<script>var sessionLoginID = "' . $_SESSION["loginID"] . '";</script>';
                } else {
                    echo '<li class="nav-item">
                            <a class="nav-item" href="#">DomovXXX</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-item" href="login.php">PrihlásenieXXX</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-item" href="register.php">RegistráciaXXX</a>
                        </li>';
                }
                ?>
            </ul>
        </div>
    </div>

    <div class = "container">
        <div id="button-container" class="content-outline">
            <div id="x">
            </div>    
        <div>
    <div>    

    

    <div id="modalQR" class="modal2 hidden">
        <div class="info-modal">
            <h2 id="thesis-name-modal">POZOR DIV </h2>
            <div class="modal-data">
                TU VNUTRO DVU
            </div>
            <img id="close-modal" src="images/close-icon.svg" alt="close">
        </div>


    </div>


</body>


<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/2.0.7/js/dataTables.js"></script>
<script src="js/myConsole.js"></script>






</html>