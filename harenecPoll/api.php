<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once '../.config.php';
require_once 'QuestionSet.php';
require_once 'Question.php';
require_once 'Answer.php';

// Create an instance of the Set class
$QuestionSetObj = new QuestionSet($mysqli);

// Create an instance of the Question class
$QuestionObj = new Question($mysqli);

// Create an instance of the Question class
$AnswerObj = new Answer($mysqli);

$method = $_SERVER['REQUEST_METHOD'];
$method = 'GET';
//echo $endpoint;

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
                //get sets by user Name
                if (isset($_GET['username'])) {
                    $username = $_GET['username'];  
                    $setsByName = $QuestionSetObj->getQuestionSetByUserName($username);
                    echo json_encode($setsByName);
                //get sets by user ID
                } elseif (isset($_GET['userid'])) {
                    $userId = $_GET['userid'];
                    $setById = $QuestionSetObj->getQuestionSetByUserId($userId);
                    echo json_encode($setById);
                    //get questions by Set Name
                }elseif(isset($_GET['setname'])){
                    $setname = $_GET['setname'];
                    $questionsBySetName = $QuestionSetObj->getQuestionsBySetName($setname);
                    echo json_encode($questionsBySetName);
                }else {
                    //get all sets
                    $sets = $QuestionSetObj->getAllQuestionSets();
                    echo json_encode($sets);
                }
                break;
                case 'answer':
                    //get answers to questions
                    if (isset($_GET['questionAnswer'])) {
                        $questionAnswer = urldecode($_GET['questionAnswer']);
                        $answerByQuestion = $AnswerObj->getAnswersByQuestionName($questionAnswer);
                        echo json_encode($answerByQuestion);
                    }
                case 'question':
                    //get question by code
                    if (isset($_GET['questionCode'])) {
                        $questionCode = $_GET['questionCode'];
                        $question = $QuestionObj->getQuestionByCode($questionCode);
                        echo json_encode($question);
                    }elseif(isset($_GET['questionActive'])){
                        $question = urldecode($_GET['questionActive']);
                        $isActiveQuestion = $QuestionObj->getActiveQuestion($question);
                        echo json_encode($isActiveQuestion);
                    }   
                    break;
                break;
            default:
                break;
            }
    case 'DELETE':
        switch ($endpoint_without_query) {
            case 'questions':
                //delete by question name
                if (isset($_GET['questionName'])) {
                    $questionName = urldecode($_GET['questionName']);
                    $deleteByQuestionName = $QuestionObj->deleteQuestionsByName($questionName);
                    echo json_encode($deleteByQuestionName);
                    break;
                }
                break;
            default:
                break;  
            }
    case 'POST':
        //data from fetch function in js
        //$data = file_get_contents('php://input');

        //TEMPORARY
        $data = array(
            'text_q' => 'jurajbrilla ako sa mas?',
            'active' => 1, 
            'open' => 1,
            'id_set' => 1, 
            'creation_date' => '2024-05-05' 
        );

        $jsonData = json_encode($data); 
        $dataArray = json_decode($jsonData, true);
        //TEMPORARY 

        //print_r($dataArray) ;

        switch ($endpoint_without_query) {
            case 'create':
                //post function
                $postNewQuestion = $QuestionObj->addQuestion($dataArray);
                echo json_encode($postNewQuestion);
                break;
            default:
                break;
        }
    case 'PUT':

        //TEMPORARY
        $data = array(
            'text_q' => 'vyborne',
            'active' => 1,
            'open' => 1,
            'id_set' => 1,
            'creation_date' => '2024-05-05'
        );

        $jsonData = json_encode($data);
        $dataArray = json_decode($jsonData, true);
        //TEMPORARY 

        switch ($endpoint_without_query) {
            case 'update':
                if (isset($_GET['questionUpdate'])) {
                    $questionUpdate = urldecode($_GET['questionUpdate']);
                    //update function
                    $updateQuestion = $QuestionObj->editQuestionByName($questionUpdate, $dataArray);
                    echo json_encode($updateQuestion);
                }
                break;
                
            default:
                break;     
            }     
    default:
        break;
}