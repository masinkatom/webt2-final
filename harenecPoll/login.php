<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// session_start();

// require_once '../.config.php';

// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     $sql = "SELECT nick, password FROM user WHERE nick = :nick";

//     $stmt = $pdo->prepare($sql);

//     $stmt->bindParam(":nick", $_POST["username"], PDO::PARAM_STR);

//     if ($stmt->execute()) {
//         if ($stmt->rowCount() == 1) {
//             $row = $stmt->fetch();

//             $hashed_password = $row["password"];

//             if (password_verify($_POST['password'], $hashed_password)) {
//                 $_SESSION["loggedin"] = true;
//                 $_SESSION["login"] = $row['nick'];

//                 header("location: secure_page.php");
//                 exit;
//             } else {
//                 $errmsg = "Nesprávne meno alebo heslo.";
//             }
//         } else {
//             $errmsg = "Nesprávne meno alebo heslo.";
//         }
//     } else {
//         $errmsg = "Nesprávne meno alebo heslo.";
//     }
// } else {
//     $errmsg = "";
// }
// 
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
    <main class="container">
        <h2>PrihlásenieXXX</h2>

        <?php if (!empty($errmsg)) : ?>
            <div><?php echo $errmsg; ?></div>
        <?php endif; ?>
        <div class="content-outline in-row centered">
            <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
                <label for="username">UsernameXXX:</label>
                <input id="username" name="username" required="" type="text" />
                <p id="err-login" class="err hidden"></p>
                <label for="password">PasswordXXX:</label>
                <input id="password" name="password" required="" type="password" />
                <p id="err-password" class="err hidden"></p>
                <input id="submit-btn" name="login" type="button" value="Login" />
            </form>
        </div>
    </main>
</body>
<script src="js/login.js"></script>
</html>