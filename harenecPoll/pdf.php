<?php 

session_start();
// Include the main TCPDF library (search for installation path).
require_once('tcpdf/tcpdf.php');

if (isset($_SESSION['manual_content'])) {

    $html = $_SESSION['manual_content'];
    // create new PDF document
    $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

    // set document information
    $pdf->SetCreator(PDF_CREATOR);
    $pdf->SetAuthor('Our Code World');
    $pdf->SetTitle('Example Write Html');
    $pdf->SetSubject('User Guide for Application');
    $pdf->SetKeywords('TCPDF, PDF, user guide, application');

    // set default header data
    $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, 'Curiosity hub', 'Autori: Juraj, Boris, Jozef, Tomas');

    // Set header and footer fonts
    $pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
    $pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

    $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

    // set margins
    $pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
    $pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

    // Set default font subsetting mode
    $pdf->setFontSubsetting(true);

    // Set font
    $pdf->SetFont('dejavusans', '', 12, '', true);

    // add a page
    $pdf->AddPage();

    $heading = '<h2 style="text-align: center">Návod na použitie</h2><br>';
    $pdf->writeHTML($heading, true, false, true, false, '');

    $pdf->writeHTML($html, true, false, true, false, '');

    $pdf->Output('manual.pdf', 'I');
} else {
    header('Location: tuto.php');
    exit;
}