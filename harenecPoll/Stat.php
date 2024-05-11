<?php

class Stat
{

    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function addStat($data){

        $query = "INSERT INTO stats (id_answer, count, year)
                  VALUES (:id_answer, :count, :year)";

        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':id_answer', $data['id_answer'], PDO::PARAM_STR);
        $stmt->bindParam(':count', $data['count'], PDO::PARAM_STR);
        $currentYear = date('Y');
        $stmt->bindParam(':year', $currentYear , PDO::PARAM_STR);

        $result = $stmt->execute();

        if ($result) {
            return $data;
        } else {
            return false;
        }
    }
}

?>