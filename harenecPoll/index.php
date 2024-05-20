<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

$output = '';

if (isset($_SESSION["logged"]) && $_SESSION["logged"] === true) {
    $_SESSION["logged"] = false;
    if (isset($_SESSION["isIn"]) && $_SESSION["isIn"] === true) {
        echo '<script src="js/setLocalStorage.js"></script>';
    }
    $output .= '<script src="js/scriptToast.js"></script>';
    $output .= '<div id="snackbar" data-i18n="snackbar_message"></div>';
} elseif (isset($_SESSION["loggedout"]) && $_SESSION["loggedout"] === true) {
    $_SESSION["loggedout"] = false;
    $_SESSION["loggedin"] = false;
    if (isset($_SESSION["isIn"]) && $_SESSION["isIn"] === false) {
        echo '<script src="js/setLocalStorageFalse.js"></script>';
    }
    $output .= '<script src="js/scriptToast.js"></script>';
    $output .= '<div id="snackbar" data-i18n="snackbar_message"></div>';
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
                    echo '
                        <li class="nav-item">
                            <a class="nav-item nav-item-current" href="index.php" data-i18n="homepage_nav"></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-item" href="myConsole.php" data-i18n="my_console_page_nav"></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-item" href="logout.php" data-i18n="logout_page_nav"></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-item" href="changePassword.php" data-i18n="change_password_page_nav"></a>
                        </li>
                        <li class="language-buttons">
                            <button class="lang_btn" onclick="changeLanguage(`en`)">ENG</button>
                            <button class="lang_btn" onclick="changeLanguage(`sk`)">SVK</button>
                        </li>';
                } else {
                    echo '
                        <li class="nav-item">
                            <a class="nav-item nav-item-current" href="index.php" data-i18n="homepage_nav"></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-item" href="login.php" data-i18n="login_page_nav"></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-item" href="register.php" data-i18n="register_page_nav"></a>
                        </li>
                        <li class="language-buttons">
                            <button class="lang_btn" onclick="changeLanguage(`en`)">ENG</button>
                            <button class="lang_btn" onclick="changeLanguage(`sk`)">SVK</button>
                        </li>
                        ';
                ?>
            </ul>
        </div>
    </div>
    <?php 
        echo '<h1 class="centered">Curiosity Hub</h1>
            <div class="container">
                <div class="content-outline centered">
                    <form action="poll.php" method="GET" class="spacer-t spacer-b">
                        <h3 for="code" class="margin-label centered" data-i18n="code_header"></h3>
                        <input type="text" id="bigger-input-height" class="margin-y" name="code" placeholder=". . .">
                        <button type="submit" class="margin-y" data-i18n="code_button"></button>
                    </form>
                    <a href="tuto.php"><button class="lang_btn">Manual</button></a>
                </div>
            </div>';
    }
    ?>

<script src="js/languageScript.js"></script>
</body>

</html>