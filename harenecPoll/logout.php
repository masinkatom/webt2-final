<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    session_start();

    if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true) {
        $_SESSION["loggedout"] = true;
        $_SESSION['isIn'] = false;
        echo '<script src="js/setLocalStorageFalse.js"></script>';
        header("location: index.php");
    }else{
        header('location: index.php');
    }
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="css/main.css">
</head>

<body>

</body>

</html>