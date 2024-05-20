<?php
use Workerman\Worker;
use Workerman\Connection\TcpConnection;
use Workerman\Timer;

require_once '../vendor/autoload.php';

$ws_worker = new Worker("websocket://0.0.0.0:8283");
$ws_worker->count = 4; // 1 proces

$answers = [];

$ws_worker->onConnect = function ($connection) use ($ws_worker) {
    // $connection->closed = false;
    // $connection->send(prepareData("enemiesOnServer", $game->getPlayers()));
    var_dump("connected USER");


};

// receiving data from the client
$ws_worker->onMessage = function (TcpConnection $connection, $data) use ($ws_worker, &$answers) {
    $dataRcv = json_decode($data, true);
    var_dump($dataRcv);
    if ($dataRcv["type"] === "choices") {
        $connection->qId = $dataRcv["payload"]["questionId"];
        addQuestionAnswers($dataRcv["payload"]["questionId"], $dataRcv["payload"]["answers"]);
        var_dump($dataRcv);
        var_dump($answers);
        foreach ($answers as $ans) {
            if ($ans["qId"] == $dataRcv["payload"]["questionId"]) {
                sendDataToAll($ws_worker, "userAnswers", $ans, $dataRcv["payload"]["questionId"]);
                break;
            }
        }
    }
    if ($dataRcv["type"] === "deactivate") {
        $qRemoveId = $dataRcv["payload"];
        $connection->qId = $qRemoveId;
        foreach ($answers as $key => $ans) {
            if ($ans["qId"] == $qRemoveId) {
                echo "ANS: ";
                var_dump($ans);
                sendDataToAll($ws_worker, "userAnswers", $ans, $qRemoveId);
                unset ($answers[$key]);
                break;
            }
        }

        // Reindex the array to ensure the indexes are continuous
        $answers = array_values($answers);
        var_dump($answers);
    }

    // $player->update($dataRcv["payload"]["x"], $dataRcv["payload"]["y"]);
    // sendDataToAll($ws_worker, "endGame", $player->getUuid());
    // if ($dataRcv["type"] === "message") {
    //     sendDataToAll($ws_worker, "message", [$dataRcv["sender"], $dataRcv["payload"]]);
    // }

};


$ws_worker->onClose = function ($connection) use (&$game, $ws_worker) {

};

function prepareData($type, $data)
{
    $toSend = [
        "type" => $type,
        "payload" => $data
    ];
    return json_encode($toSend);
}


// userSpecifier (basically qId) is used in case of wanting to send data to only some users
// in out case we want that cuz we send to user only data with some question id 
function sendDataToAll($ws_worker, $type, $data, $userSpecifier = "")
{
    // echo "\n";
    $toSend = prepareData($type, $data);
    var_dump($toSend);
    //echo "\n" . $toSend;

    foreach ($ws_worker->connections as $conn) {
        //$conn->send($data);
        if ($userSpecifier != "") {
            if ($userSpecifier == $conn->qId) {
                echo "sendin";
                $conn->send($toSend);
            }
        } else {
            $conn->send($toSend);
        }
    }
}

function addQuestionAnswers($qid, $anss)
{
    global $answers;
    foreach ($answers as &$answer) {
        if ($answer["qId"] == $qid) {
            foreach ($anss as $ansId) {
                array_push($answer["answers"], $ansId);
            }
            unset($answer);
            return;
        }
    }
    $question = [
        "qId" => $qid,
        "answers" => []
    ];
    foreach ($anss as $ansId) {
        array_push($question["answers"], $ansId);
    }
    array_push($answers, $question);
}

// Run the worker
Worker::runAll();