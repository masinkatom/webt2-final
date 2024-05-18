<?php

// use BaconQrCode\Renderer\GDLibRenderer;
// use BaconQrCode\Writer;

// $renderer = new GDLibRenderer(400);
// $writer = new Writer($renderer);
// $writer->writeFile('Hello World!', 'qrcode.png');

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
                            <a class="nav-item" href="index.php" data-i18n="homepage_nav"></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-item" href="login.php" data-i18n="login_page_nav"></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-item" href="register.php" data-i18n="register_page_nav"></a>
                        </li>';
                }
                ?>
                <li class="language-buttons">
                    <button class="lang_btn" onclick="changeLanguage('en')">ENG</button>
                    <button class="lang_btn" onclick="changeLanguage('sk')">SVK</button>
                </li>
            </ul>
        </div>
    </div>

    <main class="container">
        <div class="content-outline">
            <h1 data-i18n="poll_header"></h1>
            <h4 class="centered" data-i18n="poll_warning"></h4>
            <br>
            <div class="in-column centered">
                <h2 id="question-element" class="spacer-b"></h2>
                <div id="answer-element" class="in-column"></div>
                <h2 id="question-404" class="fail hidden" data-i18n="question_404"></h2>
                <h2 id="question-notActive" class="fail hidden">Nie je aktivovaná!XXX</h2>
            </div>
            <div id="question-buttons" class="in-row spaced-between spacer-t hidden">
                <button id="results-send" class="btn-compact centered" data-i18n="show_correct_answers"></button>
                <button id="results-redirect" class="btn-compact centered hidden" data-i18n="show_results">></button>
            </div>

            <div id="current-stats" class="in-column spacer-t hidden">
                <h2>Aktuálne výsledky hlasovaniaXXX:</h2>

                <div id="currents-plot"></div>
            </div>
        </div>
        
    </main>

</body>
<script src="js/poll.js"></script>
<script src="js/languageScript.js"></script>

</html>