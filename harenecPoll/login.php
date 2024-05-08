<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true) {
    header("location: index.php");
}

require_once '../.config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sql = "SELECT nick, id_user, password FROM user WHERE nick = :nick";

    $stmt = $pdo->prepare($sql);

    $stmt->bindParam(":nick", $_POST["username"], PDO::PARAM_STR);

    if ($stmt->execute()) {
        if ($stmt->rowCount() == 1) {
            $row = $stmt->fetch();

            $hashed_password = $row["password"];

            if (password_verify($_POST['password'], $hashed_password)) {
                $_SESSION["loggedin"] = true;
                $_SESSION["login"] = $row['nick'];
                $_SESSION["loginID"] = $row['id_user'];
                $_SESSION["logged"] = true;

                header("location: index.php");
                exit;
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
</head>

<body>
    <div class="container">
        <div class="main-nav">
            <ul class="nav-list">
                <li class="nav-item">
                    <a class="nav-item" href="index.php">HomeXXX</a>
                </li>
                <li class="nav-item">
                    <a class="nav-item nav-item-current" href="#">PrihlásenieXXX</a>
                </li>
                <li class="nav-item">
                    <a class="nav-item" href="register.php">RegistráciaXXX</a>
                </li>
            </ul>
        </div>
    </div>
    <main class="container">
        <h2>PrihlásenieXXX</h2>
        <div class="content-outline in-row centered">
            <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
                <label class="margin-label" for="username">UsernameXXX:</label>
                <input id="username" name="username" required="" type="text" />
                <p id="err-login" class="err hidden"></p>

                <label class="margin-label" for="password">PasswordXXX:</label>
                <input id="password" name="password" required="" type="password" />
                <p id="err-password" class="err hidden"></p>

                <input id="submit-btn" name="login" type="submit" value="Login" />
                
                <?php if (!empty($errmsg)) : ?>
                    <p class="err"><?php echo $errmsg; ?></p>
                <?php endif; ?>
            </form>
        </div>  
    </main>
</body>
<script src="js/login.js"></script>

</html>