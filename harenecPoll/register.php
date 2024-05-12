<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

require_once '../.config.php';

function checkEmpty($field)
{
    if (empty(trim($field))) {
        return true;
    }
    return false;
}

function checkName($firstLastName)
{
    if (!preg_match('/^[a-zA-Z]*$/', trim($firstLastName))) {
        return false;
    }
    return true;
}

function checkLength($field, $min, $max)
{
    $string = trim($field); // Odstranenie whitespaces.
    $length = strlen($string); // Zistenie dlzky retazca.
    if ($length < $min || $length > $max) {
        return false;
    }
    return true;
}

function checkUsername($username)
{
    if (!preg_match('/^[a-zA-Z0-9_]+$/', trim($username))) {
        return false;
    }
    return true;
}

function userExist($db, $nick)
{
    $exist = false;

    $param_login = trim($nick);

    $sql = "SELECT id_user FROM user WHERE nick = :nick";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(":nick", $param_login, PDO::PARAM_STR);

    $stmt->execute();

    if ($stmt->rowCount() == 1) {
        $exist = true;
    }

    unset($stmt);

    return $exist;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $errmsg = "";
    $login_errmsg = "";
    $password_errmsg = "";

    // Validacia username
    if (checkEmpty($_POST['usernameReg']) === true) {
        $login_errmsg = "Zadajte meno";
        $errmsg .= '<p>'.$login_errmsg.'</p>';
    } elseif (checkLength($_POST['usernameReg'], 6, 32) === false) {
        $login_errmsg = "Login musi mat min. 6 a max. 32 znakov";
        $errmsg .= '<p>'.$login_errmsg.'</p>';
    } elseif (checkUsername($_POST['usernameReg']) === false) {
        $login_errmsg = "Login moze obsahovat iba velke, male pismena, cislice a podtrznik";
        $errmsg .= '<p>'.$login_errmsg.'</p>';
    }

    if (userExist($pdo, $_POST['usernameReg'])) {
        $login_errmsg = "Pouzivatel s tymto loginom uz existuje";
        $errmsg .= '<p>'.$login_errmsg.'</p>';
    }

    if (checkEmpty($_POST['passwordReg']) === true) {
        $password_errmsg = "Zadajte Heslo";
        $errmsg .= '<p>'.$password_errmsg.'</p>';
    } elseif (checkLength($_POST['passwordReg'], 6, 32) === false) {
        $password_errmsg = "Heslo musi mat min. 6 a max. 32 znakov";
        $errmsg .= '<p>'.$password_errmsg.'</p>';
    } elseif (checkUsername($_POST['passwordReg']) === false) {
        $password_errmsg = "Heslo moze obsahovat iba velke, male pismena, cislice a podtrznik";
        $errmsg .= '<p>'.$password_errmsg.'</p>';
    }

    if (empty($errmsg)) {

        $sql = "INSERT INTO user (nick, password) VALUES (:nick, :password)";

        $nick = $_POST['usernameReg'];
        $hashed_password = password_hash($_POST['passwordReg'], PASSWORD_ARGON2ID);

        $stmt = $pdo->prepare($sql);

        $stmt->bindParam(":nick", $nick, PDO::PARAM_STR);
        $stmt->bindParam(":password", $hashed_password, PDO::PARAM_STR);

        if ($stmt->execute()) {
            $_SESSION["registred"] = true;
            header("location: login.php");
            echo "Podarilo sa";
        } else {
            echo "Ups. Nieco sa pokazilo";
        }

        unset($stmt);
    }
    unset($pdo);
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
    <div class="container">
        <div class="main-nav">
            <ul class="nav-list">
                <li class="nav-item">
                    <a class="nav-item" href="index.php">HomeXXX</a>
                </li>
                <li class="nav-item">
                    <a class="nav-item" href="login.php">PrihlásenieXXX</a>
                </li>
                <li class="nav-item">
                    <a class="nav-item" href="#">RegistráciaXXX</a>
                </li>
            </ul>
        </div>
    </div>
    <main class="container">
        <h2>RegistraciaXXX</h2>

        <div class="content-outline in-row centered">

            <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post" class="form-outline">
                <label for="usernameReg" class="margin-label">Používateľské menoXXX:</label>
                <input id="login" name="usernameReg" required type="text" />
                <p id="err-login" class="err hidden"></p>
                <!-- /*JOJO*/  pridany <p> pre vypis chybovej hlasky po odoslani formulara -->
                <?php if (!empty($login_errmsg)) : ?>
                    <p id="login-errmsg-after-submit" class="err"> <?php echo $login_errmsg; ?> </p>
                <?php else: ?>
                    <p id="login-errmsg-after-submit" class="err hidden"></p>
                <?php endif; ?>
                <!-- /*JOJO*/ -->

                

                <label for="passwordReg" class="margin-label">HesloXXX:</label>
                <input id="password" name="passwordReg" required type="password" />
                <p id="err-password" class="err hidden"></p>
                <!-- /*JOJO*/ pridany <p> pre vypis chybovej hlasky po odoslani formulara -->
                <?php if (!empty($password_errmsg)) : ?>
                    <p id="password-errmsg-after-submit" class="err"> <?php echo $password_errmsg; ?> </p>
                <?php else: ?>
                    <p id="password-errmsg-after-submit" class="err hidden"></p>
                <?php endif; ?>
                <!-- /*JOJO*/ -->

                

                <input id="submit-btn" name="register" type="submit" value="Register" />
            </form>
        </div>
    </main>


    <script src="js/register.js"></script>
</body>

</html>