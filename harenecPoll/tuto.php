<?php

session_start();

$content_signed = '<h2 class="hover-underline" data-i18n="tuto_signed_user">Pre prihláseného používateľa v sekcii Konzola:</h2>
        <ul class="px-4">
            <li data-i18n="signed_l1">Používateľ môže listovať a prehliadať otázky vo svojich setoch.</li>
            <li data-i18n="signed_l2">Používateľ môže otázku spustiť zeleným tlačidlom "Start".</li>
            <li data-i18n="signed_l3">Používateľ môže otázku deaktivovať červeným tlačidlom "Stop".</li>
            <li data-i18n="signed_l4">Používateľ si môže informatívne pozrieť otázku modrým tlačidlom "Info". Môže vidieť text otázky. Rovnako kliknutím na "Štatistiky" môže vidieť výsledky hlasovania za minulé roky.</li>
            <li data-i18n="signed_l5">Používateľ si môže nakopírovať otázku do iného setu, kliknutím na sivé tlačidlo "Kópia", zvolením setu, kam chce otázku nakopírovať a nasledným potvrdením operácie.</li>
            <li data-i18n="signed_l6">Používateľ môže editovať otázku kliknutím na "Edit". Zmení zvolené informácie a potvrdí operáciu.</li>
            <li data-i18n="signed_l7">Používateľ môže kliknutím na červené tlačidlo vymazať otázku. Rozhodnutie musí ešte raz potvrdiť, následne sa otázka navždy vymaže.</li>
        </ul>
        <h3 class="hover-underline">Pod zobrazenými setmi má používateľ možnosť:</h3>
        <ul class="px-4">
            <li data-i18n="below_sets_l1">Vytvoriť novú otázku, používateľ si bude môcť vybrať z možnosti otvorenej otázky bez možnosti, v takom prípade si bude môcť používateľ zvoliť, ako sa mu budú zobrazovať výsledky, či cez zoznam alebo tzv. "cloudmap"-y. Používateľ môže zvoliť možnosť zatvorenej otázky, kde používateľ vytvorí možnosti.</li>
            <li data-i18n="below_sets_l2">Vytvoriť nový set, kde zadá meno nového setu a potvrdí vytvorenie.</li>
            <li data-i18n="below_sets_l3">Prezerať si všetky používateľove otázky, filtrovať v tabuľke a vyhľadávať podľa konkrétnych otázok, dátumov vytvorenia atď...</li>
        </ul>';

$content_unsigned = '<h2 class="hover-underline" data-i18n="tuto_unsigned_user">Pre neprihláseného používateľa:</h2>
        <ul class="px-4">
            <li data-i18n="unsigned_l1">Používateľ sa môže zaregistrovať.</li>
            <li data-i18n="unsigned_l2">Používateľ sa môže prihlásiť.</li>
            <li data-i18n="unsigned_l3">Po vložení QR kódu alebo číselného kódu má používateľ možnosť pristúpiť k otázke.</li>
        </ul>
        <h2 class="hover-underline" data-i18n="tuto_admin">Pre administrátora:</h2>
        <ul class="px-4">
            <li data-i18n="admin_l1">Administrátor má tú istú funkcionalitu ako prihlásený používateľ.</li>
            <li data-i18n="admin_l2">Administrátor má správu nad všetkými používateľmi - CRUD operície, meniť im rolu.</li>
            <li data-i18n="admin_l3">Administrátor má prístup ku všetkým otázkam od všetkých používateľov.</li>
        </ul>';
 
$content .= $content_signed;
$content .= $content_unsigned;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $_SESSION['manual_content'] = $content;
    header('Location: pdf.php');
    exit;
}

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
</head>

<body>

    <div class="container">
        <div class="main-nav">
            <ul class="nav-list">
                <?php
                if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true) {
                    echo '
                        <li class="nav-item">
                            <a class="nav-item nav-item-current" href="#" data-i18n="my_console_page_nav"></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-item" href="logout.php" data-i18n="logout_page_nav"></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-item" href="changePassword.php" data-i18n="change_password_page_nav"></a>
                        </li>
                        ';
                    //echo $_SESSION["login"], $_SESSION["loginID"];
                    echo '<script>var sessionLogin = "' . $_SESSION['login'] . '";</script>';
                    echo '<script>var sessionLoginID = "' . $_SESSION["loginID"] . '";</script>';
                } else {
                    echo '<li class="nav-item">
                            <a class="nav-item" href="#" data-i18n="homepage_nav"></a>
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

    <h2 class="text-center my-1" data-i18n="tuto_header"></h2>

    <div class="container-two-colums px-5">
        <div class="column">
            <?php echo $content_signed; ?>
        </div>
        <div class="column">
            <?php echo $content_unsigned; ?>
            <form action="tuto.php" method="POST">
                <input type="hidden" name="export_to_pdf" value="PDF">
                <button type="submit" class="btn btn-primary btn-lg fs-3 w-50 my-5 p-3">Export PDF</button>
            </form>
        </div>
    <div>

</body>



<script src="js/languageScript.js"></script>

</html>