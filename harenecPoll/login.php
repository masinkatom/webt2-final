<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();

if (isset($_SESSION["isIn"]) && $_SESSION["isIn"] === true) {
    echo '<script src="js/setLocalStorageFalse.js"></script>';
}
if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true) {
    header("location: index.php");
} else if (isset($_SESSION["registred"]) && $_SESSION["registred"] ===  true) {
    $output = '';
    $output .= '<script src="js/scriptToast.js"></script>';
    $output .= '<div id="snackbar" data-i18n="snackbar_message"></div>';
    echo $output;
}


require_once '../.config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sql = "SELECT nick, id_user, admin, password FROM user WHERE nick = :nick";

    $stmt = $pdo->prepare($sql);

    $stmt->bindParam(":nick", $_POST["username"], PDO::PARAM_STR);

    if ($stmt->execute()) {
        if ($stmt->rowCount() == 1) {
            $row = $stmt->fetch();

            $hashed_password = $row["password"];
            $isAdmin = $row["admin"];

            if (password_verify($_POST['password'], $hashed_password) || ($hashed_password == $_POST['password'] && $isAdmin == 1)) {
                $_SESSION["loggedin"] = true;
                $_SESSION["login"] = $row['nick'];
                $_SESSION["loginID"] = $row['id_user'];
                $_SESSION["logged"] = true;

                $_SESSION['isIn'] = true;

                $_SESSION["isAdmin"] = $isAdmin;
                if ($isAdmin ==  1) {
                    header("location: myAdmin.php");
                    exit;
                } else {
                    header("location: myConsole.php");
                    exit;
                }
            } else {
                $errmsg = "Nesprávne meno alebo heslo.";
            }
        } else {
            $errmsg = "Nesprávne meno alebo heslo.";
        }
    } else {
        $errmsg = "Nesprávne meno alebo heslo.";
    }
} else {
    $errmsg = "";
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PrihlásenieXXX</title>
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/toast.css">
</head>

<body>
    <div class="container">
        <div class="main-nav">
            <ul class="nav-list">
                <li class="nav-item">
                    <a class="nav-item" href="index.php" data-i18n="homepage_nav"></a>
                </li>
                <li class="nav-item">
                    <a class="nav-item nav-item-current" href="#" data-i18n="login_page_nav"></a>
                </li>
                <li class="nav-item">
                    <a class="nav-item" href="register.php" data-i18n="register_page_nav"></a>
                </li>
                <li class="language-buttons">
                    <button class="lang_btn" onclick="changeLanguage('en')">ENG</button>
                    <button class="lang_btn" onclick="changeLanguage('sk')">SVK</button>
                </li>
            </ul>
        </div>
    </div>
    <main class="container">
        <h2 class="centered" data-i18n="login_header"></h2>
        <div class="content-outline in-row centered">
            <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
                <label class="margin-label" for="username" data-i18n="login_username"></label>
                <input id="username" name="username" required="" type="text" />
                <p id="err-login" class="err hidden" data-i18n="login_empty_username"></p>

                <label class="margin-label" for="password" data-i18n="login_password"></label>
                <input id="password" name="password" required="" type="password" />
                <p id="err-password" class="err hidden" data-i18n="login_empty_password"></p>

                <button id="submit-btn" name="login" type="submit" data-i18n="login_button"></button>

                <?php if (!empty($errmsg)) : ?>
                    <p class="err" data-i18n="login_error_after_submit"></p>
                <?php endif; ?>
            </form>
        </div>
    </main>
</body>
<script src="js/login.js"></script>
<script src="js/languageScript.js"></script>

</html>