<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

require_once '../.config.php';

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

function checkEqual($password, $copyPassword)
{
    if ($password == $copyPassword) {
        return true;
    } else {
        return false;
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sql = "SELECT password FROM user WHERE nick = :nick";
    $stmt = $pdo->prepare($sql);

    $currentUser = $_SESSION["login"];

    $stmt->bindParam(":nick", $currentUser, PDO::PARAM_STR);

    $msgerr = "";

    if ($stmt->execute()) {
        if ($stmt->rowCount() == 1) {
            $row = $stmt->fetch();


            $hashed_password = $row["password"];

            if (password_verify($_POST['old-password'], $hashed_password)) {
                if (checkEqual($_POST['new-password'], $_POST['confirm-new-password'])) {
                    $newPassword = password_hash($_POST['new-password'], PASSWORD_ARGON2ID);
                    $query = "UPDATE user 
                            SET password = :newPassword
                            WHERE nick = :currentUser";

                    $stmt = $pdo->prepare($query);
                    $stmt->bindParam(':newPassword', $newPassword);
                    $stmt->bindParam(':currentUser', $currentUser);

                    if ($stmt->execute()) {
                        $output .= '<script src="js/scriptToast.js"></script>';
                        $output .= '<div id="snackbar">Operácia sa podarila</div>';
                        echo $output;
                    } else {
                        $msgerr = "Nastala chyba pri aktualizácii hesla.";
                        echo "Nastala chyba pri aktualizácii hesla.";
                    }
                }
            } else {
                $msgerr = "Zadaj správne staré heslo";
            }
        }
    }
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
                        <a class="nav-item nav-item-current" href="index.php" data-i18n="homepage_nav"></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-item" href="myConsole.php" data-i18n="my_console_page_nav"></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-item" href="logout.php" data-i18n="logout_page_nav"></a>
                        </li>
                        ';
                    echo '<script>var sessionLogin = "' . $_SESSION['login'] . '";</script>';
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
                <li class="language-buttons">
                    <button class="lang_btn" onclick="changeLanguage('en')">ENG</button>
                    <button class="lang_btn" onclick="changeLanguage('sk')">SVK</button>
                </li>
            </ul>
        </div>
    </div>
    <main class="container">
        <h2 class="centered" data-i18n="change_password_header"></h2>
        <div class="content-outline in-row centered">
            <form method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">
                <label class="margin-label" for="old-password" data-i18n="old_password_label"></label>
                <input id="old-password" name="old-password" required="" type="password" />
                <p id="err-old-password" class="err hidden"></p>

                <label class="margin-label" for="new-password" data-i18n="new_password_label"></label>
                <input id="new-password" name="new-password" required="" type="password" />
                <p id="err-new-password" class="err hidden"></p>

                <label class="margin-label" for="new-password" data-i18n="confirm_password_label"></label>
                <input id="confirm-new-password" name="confirm-new-password" required="" type="password" />
                <p id="err-confirm-new-password" class="err hidden"></p>

                <input id="submit-btn" name="login" type="submit" value="Change password" />
                <?php
                if (!(empty($msgerr))) {
                ?>
                    <div id="changePasswordModal" class="modal2 hidden">
                        <div class="info-modal">
                            <div class="modal-data">
                                Zadané staré heslo je nesprávne
                            </div>
                            <img id="close-modal" src="images/close-icon.svg" alt="close">
                        </div>
                    </div>

                    <script src="js/modalConfirmPassword.js"></script>
                <?php
                }
                ?>


            </form>
        </div>
    </main>
</body>
<script src="js/confirmPassword.js"></script>
<script src="js/languageScript.js"></script>

</html>