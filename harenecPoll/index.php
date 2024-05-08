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

    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/toast.css">
</head>

<body>

    <div class="container">
        <div class="main-nav">
            <ul class="nav-list">
                <?php
                if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true) {
                    echo '<li class="nav-item">
                        <a <a class="nav-item nav-item-current" href="#">DomovXXX</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-item" href="myConsole.php">MyConsoleXXX</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-item" href="logout.php">OdhlásenieXXX</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-item" href="changePassword.php">zmenaHeslaXXX</a>
                        </li>
                        ';
                } else {
                    echo '<li class="nav-item">
                        <a class="nav-item nav-item-current" href="index.php">DomovXXX</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-item" href="login.php">PrihlásenieXXX</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-item" href="register.php">RegistráciaXXX</a>
                        </li>';
                ?>        
            </ul>
        </div>
    </div>
    <?php 
        echo '<div class="container">
                <div class="content-outline centered">
                    <form action="">
                        <label for="code" class="margin-label">Zadaj kodXXX:</label>
                        <input type="text" name="code" placeholder="po zadani kodu redirect na otazku">
                        <button>Odoslat kodXXX</button>
                    </form>
                </div>
            </div>';
    }
    ?>

    
</body>

</html>