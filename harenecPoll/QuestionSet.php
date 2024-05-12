<?php

class QuestionSet
{

    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }


    public function getAllQuestionSets()
    {
        /*
        Return all questions set (Mainly for ADMIN)
        */

        $query = "SELECT * FROM question_set";
        $stmt = $this->pdo->query($query);
        $questionSets = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $questionSets;
    }


    public function getQuestionSetByUserId($userId)
    {
        /*
    Return question sets by their owner (userId)
    */

        $query = "SELECT name_set FROM question_set WHERE id_user = :userId";

        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':userId', $userId, PDO::PARAM_INT);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $userSets = $stmt->fetchAll(PDO::FETCH_COLUMN);
            return $userSets;
        } else {
            return [];
        }
    }

    public function getQuestionSetByUserName($userName)
    {
        /*
    Return question sets by their owner (userName)
    */

        $query = "SELECT name_set, id_set
            FROM question_set qs
            INNER JOIN user u ON qs.id_user = u.id_user
            WHERE u.nick = :userName";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':userName', $userName, PDO::PARAM_STR);
        $stmt->execute();

        $questionSets = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $questionSets;
    }

    public function getQuestionsBySetName($setName)
    {
        $query = "SELECT *
            FROM question
            WHERE id_set IN (
                SELECT id_set
                FROM question_set
                WHERE name_set = :setName
            )";

        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':setName', $setName, PDO::PARAM_STR);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getQuestionSetIdByItsName($nameSet)
    {
        /*
        Return question set ID by its name
        */

        $query = "SELECT id_set FROM question_set WHERE name_set = :nameSet";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':nameSet', $nameSet, PDO::PARAM_STR);
        $stmt->execute();

        $idByName = $stmt->fetchColumn();
        return $idByName;
    }

}
