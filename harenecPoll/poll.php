<?php

require_once "server/curlHelper.php";

// $response = json_decode(sendRequest("https://node24.webte.fei.stuba.sk/harenecPoll/api.php/question?questionCode=". $_GET['code'], "GET"), true);

// echo json_decode($response['response'], true)[0]['active'];

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A Poll</title>
    <link rel="stylesheet" href="css/main.css">
    <script src="js/plotly-2.32.0.min.js" charset="utf-8"></script>
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
                            <a class="nav-item" href="myConsole.php">KonzXXX</a>
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
                            <a class="nav-item" href="index.php">DomovXXX</a>
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

    <main class="container">
        <div class="content-outline">
            <h1>OTÁZKAXXX:</h1>
            <h4 class="centered">(Pozor, otázka môže mať viacero správnych odpovedíXXX)</h4>
            <br>
            <div class="in-column centered">
                <h2 id="question-element" class="spacer-b"></h2>
                <div id="answer-element" class="in-column"></div>
                <h2 id="question-404" class="fail hidden">Neexistuje alebo nie je aktivovanáXXX!</h2>
            </div>
            <div id="question-buttons" class="in-row spaced-between spacer-t">
                <button id="results-send" class="btn-compact centered">Zobraz správne odpovedeXXX</button>
                <button id="results-redirect" class="btn-compact centered hidden">Zobraz výsledkyXXX ></button>
            </div>

            <div id="current-stats" class="in-column spacer-t hidden">
                <h2>Aktuálne výsledky hlasovania:</h2>

                <div id="currents-plot"></div>
            </div>
        </div>
        
    </main>

    <script src="js/poll.js"></script>
</body>

</html>