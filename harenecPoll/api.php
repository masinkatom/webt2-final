<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once '../.config.php';
require_once 'QuestionSet.php';
require_once 'Question.php';
require_once 'Answer.php';
require_once 'Stat.php';
require_once 'User.php';

// Create an instance of the user
$UserObj = new User($pdo);

// Create an instance of the Set class
$QuestionSetObj = new QuestionSet($pdo);

// Create an instance of the Question class
$QuestionObj = new Question($pdo);

// Create an instance of the Answer class
$AnswerObj = new Answer($pdo);

$StatObj = new Stat($pdo);

$method = $_SERVER['REQUEST_METHOD'];

$request_uri = $_SERVER['REQUEST_URI'];

$url_parts = explode('api.php/', $request_uri);

$endpoint = end($url_parts);

$parts_with_query = explode('?', $endpoint);
$endpoint_without_query = $parts_with_query[0];

header('Content-Type: application/json');

$method = 'GET';

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
                } elseif(isset($_GET['userId'])){
                    $userId = urldecode($_GET['userId']);
                    $userQuestions = $QuestionObj->getAllQUestionsByUserId($userId);
                    echo json_encode($userQuestions);
                }
                break;
            case 'stats':
                if(isset($_GET['userId'])){
                    $setId = $_GET['userId'];
                    $returnStatInfo = $StatObj->getHistoricStatByQuestionId($setId);
                    echo json_encode($returnStatInfo);
                }

            case 'users':
                if (isset($_GET['userName'])) {
                    $userName = urldecode(($_GET['userName']));
                    $idByName = $UserObj->getUserIdByName($userName);
                    echo json_encode($idByName);
                }else{
                    $users = $UserObj->returnAllUsersName();
                    echo json_encode($users);
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
            case 'deleteUser':
                if (isset($_GET['userName'])) {
                    $userName = urldecode($_GET['userName']);
                    $deletedUser = $UserObj->deleteUserByName($userName);
                    echo json_encode($deletedUser);
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
            'id_answer' => 1,
            'count' => 10,
        );*/

        //$jsonData = json_encode($data);
        //$dataArray = json_decode($jsonData, true);
        //TEMPORARY 

        //print_r($dataArray) ;

        //received data from js
        $data = json_decode(file_get_contents('php://input'), true);


        switch ($endpoint_without_query) {
            case 'create':
                $postNewQuestion = $QuestionObj->addQuestion($data);
                break;
            case 'createSet':
                $postNewSet = $QuestionObj->addSet($data);
                break;
                //TODO
            case 'createStat':
                $createStat = $StatObj->addStat($data);
                echo json_encode($createStat);
                break;
            default:
                break;
        }
        break;
    case 'PUT':
        //received data from js
        //$data = json_decode(file_get_contents('php://input'), true);

        $data = array(
            'adminValue' => 1
        );

        //print_r($data);
        switch ($endpoint_without_query) {
            case 'update':
                if (isset($_GET['questionUpdate'])) {
                    $questionUpdate = urldecode($_GET['questionUpdate']);
                    $updateQuestion = $QuestionObj->editQuestionByName(intval($questionUpdate), $data);
                    echo json_encode($updateQuestion);
                }elseif(isset($_GET['questionActiveUpdate'])){
                    $questionActiveUpdate = $_GET['questionActiveUpdate'];
                    $updateQuestion = $QuestionObj->editActiveQuestion($questionActiveUpdate);
                    echo json_encode($updateQuestion);
                }
                break;
            case 'updateUserFlag':
                if (isset($_GET['userName'])) {
                    $userName = urldecode($_GET['userName']);
                    $updatedUserFlag = $UserObj->setUserFlag($userName, $data);
                    echo json_encode($updatedUserFlag);
                }
                break;
            case 'editUser':
                if (isset($_GET['userName'])) {
                    $userName = urldecode($_GET['userName']);
                    $updateUser = $UserObj->editUserByName($userName, $data);
                    echo json_encode($updateUser);
                }
                break;
            default:
                break;
        }
        break;
    default:
        break;
}
