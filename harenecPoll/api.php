<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once '../.config.php';
require_once 'QuestionSet.php';
require_once 'Question.php';
require_once 'Answer.php';

// Create an instance of the Set class
$QuestionSetObj = new QuestionSet($pdo);

// Create an instance of the Question class
$QuestionObj = new Question($pdo);

// Create an instance of the Answer class
$AnswerObj = new Answer($pdo);

$method = $_SERVER['REQUEST_METHOD'];

$request_uri = $_SERVER['REQUEST_URI'];

$url_parts = explode('api.php/', $request_uri);

$endpoint = end($url_parts);

$parts_with_query = explode('?', $endpoint);
$endpoint_without_query = $parts_with_query[0];

header('Content-Type: application/json');

switch ($method) {
    case 'GET':
        switch ($endpoint_without_query) {
            case 'sets':
                if (isset($_GET['username'])) {
                    $username = $_GET['username'];
                    $setsByName = $QuestionSetObj->getQuestionSetByUserName($username);
                    echo json_encode($setsByName);
                } elseif (isset($_GET['userid'])) {
                    $userId = $_GET['userid'];
                    $setById = $QuestionSetObj->getQuestionSetByUserId($userId);
                    echo json_encode($setById);
                } elseif (isset($_GET['setname'])) {
                    $setname = $_GET['setname'];
                    $questionsBySetName = $QuestionSetObj->getQuestionsBySetName($setname);
                    echo json_encode($questionsBySetName);
                } else {
                    $sets = $QuestionSetObj->getAllQuestionSets();
                    echo json_encode($sets);
                }
                break;
            case 'answer':
                if (isset($_GET['questionAnswer'])) {
                    $questionAnswer = urldecode($_GET['questionAnswer']);
                    $answerByQuestion = $AnswerObj->getAnswersByQuestionName($questionAnswer);
                    echo json_encode($answerByQuestion);
                }
                break;
            case 'question':
                if (isset($_GET['questionCode'])) {
                    $questionCode = $_GET['questionCode'];
                    $question = $QuestionObj->getQuestionByCode($questionCode);
                    echo json_encode($question);
                } elseif (isset($_GET['questionActive'])) {
                    $question = urldecode($_GET['questionActive']);
                    $isActiveQuestion = $QuestionObj->getActiveQuestion($question);
                    echo json_encode($isActiveQuestion);
                }
                break;
            default:
                break;
        }
        break;
    case 'DELETE':
        switch ($endpoint_without_query) {
            case 'questions':
                if (isset($_GET['questionName'])) {
                    $questionName = urldecode($_GET['questionName']);
                    $deleteByQuestionName = $QuestionObj->deleteQuestionsByName($questionName);
                    echo json_encode($deleteByQuestionName);
                }
                break;
            default:
                break;
        }
        break;
    case 'POST':
        //data from fetch function in js
        //$data = file_get_contents('php://input');

        //TEMPORARY
        /*$data = array(
            'text_q' => 'jurajbrilla ako sa mas?',
            'active' => 1,
            'open' => 1,
            'id_set' => 1,
            'creation_date' => '2024-05-05'
        );*/

        //$jsonData = json_encode($data);
        //$dataArray = json_decode($jsonData, true);
        //TEMPORARY 

        //print_r($dataArray) ;

        $data = json_decode(file_get_contents('php://input'), true);


        switch ($endpoint_without_query) {
            case 'create':
                $postNewQuestion = $QuestionObj->addQuestion($data);
                //echo json_encode($postNewQuestion);
                break;
            default:
                break;
        }
        break;
    case 'PUT':
        //TEMPORARY
        /*$data = array(
            'text_q' => 'vyborne',
            'creation_date' => '2024-05-05',
            'originName' => 'origiginal meno otakzy';
        );*/

        //$data = file_get_contents('php://input');

        //$jsonData = json_encode($data);
        //$dataArray = json_decode($jsonData, true);
        $data = json_decode(file_get_contents('php://input'), true);
        //echo $data;
        //$data = file_get_contents('php://input');
        //TEMPORARY 
        //echo $dataArray;
        print_r($data);
        switch ($endpoint_without_query) {
            case 'update':
                if (isset($_GET['questionUpdate'])) {
                    $questionUpdate = urldecode($_GET['questionUpdate']);
                    $updateQuestion = $QuestionObj->editQuestionByName(intval($questionUpdate), $data);
                    echo json_encode($updateQuestion);
                }
                break;

            default:
                break;
        }
        break;
    default:
        break;
}
