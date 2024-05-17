<?php
use Workerman\Worker;
use Workerman\Connection\TcpConnection;
use Workerman\Timer;

require_once '../vendor/autoload.php';

$ws_worker = new Worker("websocket://0.0.0.0:8283");
$ws_worker->count = 4; // 1 proces

$answers = [];

$ws_worker->onConnect = function($connection) use (&$game, $ws_worker){
    // $connection->closed = false;
    // $connection->send(prepareData("enemiesOnServer", $game->getPlayers()));


    
};

// receiving data from the client
$ws_worker->onMessage = function(TcpConnection $connection, $data) use (&$game, $ws_worker) {
    $dataRcv = json_decode($data, true);

    var_dump($dataRcv);
    // $player->update($dataRcv["payload"]["x"], $dataRcv["payload"]["y"]);
    // sendDataToAll($ws_worker, "endGame", $player->getUuid());
    // if ($dataRcv["type"] === "message") {
    //     sendDataToAll($ws_worker, "message", [$dataRcv["sender"], $dataRcv["payload"]]);
    // }
     
};


$ws_worker->onClose = function($connection) use (&$game, $ws_worker){

};

function prepareData($type, $data) {
    $toSend = [
        "type" => $type,
        "payload" => $data
    ];
    return json_encode($toSend);
}

function sendDataToAll($ws_worker, $type, $data) {
    // echo "\n";
    $toSend = prepareData($type, $data);
    var_dump($toSend);
    //echo "\n" . $toSend;

    foreach ($ws_worker->connections as $conn) {
        //$conn->send($data);
        $conn->send($toSend);
    }
}

// Run the worker
Worker::runAll();