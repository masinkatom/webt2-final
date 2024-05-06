<?php

class QuestionSet
{

    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }


    public function getAllQuestionSets()
    {
        /*
        Return all questions set (Mainly for ADMIN)
        */

        $query = "SELECT * FROM question_set";
        $result = mysqli_query($this->conn, $query);
        $questionSets = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $questionSets[] = $row;
        }
        return $questionSets;
    }


    public function getQuestionSetByUserId($userId)
    {
        /*
    Return question sets by their owner (userId)
    */

        $query = "SELECT name_set FROM question_set WHERE id_user = $userId";

        $result = mysqli_query($this->conn, $query);

        if (mysqli_num_rows($result) > 0) {
            $userSets = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $userSets[] = $row['name_set'];
            }
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

        $query = "SELECT name_set
            FROM question_set qs
            INNER JOIN user u ON qs.id_user = u.id_user
            WHERE u.nick = '$userName'";
        $result = mysqli_query($this->conn, $query);

        $questionSets = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $questionSets[] = $row;
        }
        return $questionSets;
    }

    public function
    getQuestionsBySetName($setname){
        $query = "SELECT *
            FROM question
            WHERE id_set IN (
                SELECT id_set
                FROM question_set
                WHERE name_set = '$setname'
        )";

        $result = mysqli_query($this->conn, $query);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);

    }

    public function getQuestionSetIdByItsName($nameSet)
    {
        /*
        Return question set ID by its name
        */

        $query = "SELECT question_set.id_set FROM question_set where name_set = $nameSet";
        $result = mysqli_query($this->conn, $query);
        $idByName = mysqli_fetch_assoc($result);
        return $idByName;
    }
}
