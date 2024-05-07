<?php

class Question
{

    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function getAllQuestions()
    {
        /*
        Return all questions (Mainly for ADMIN)
        */

        $query = "SELECT * FROM question";
        $result = mysqli_query($this->conn, $query);
        $questions = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $questions[] = $row;
        }
        return $questions;
    }



    public function getQuestionsBySetId($setId)
    {
        /*
        Return questions contained in specific set (by setId)
        */

        $query = "SELECT * FROM question where id_set = $setId";
        $result = mysqli_query($this->conn, $query);
        $questionsBySet = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $questionsBySet[] = $row;
        }
        return $questionsBySet;
    }

    public function getQuestionByCode($questionCode){
        //pridat question.codes
        $query = "SELECT text_q 
            FROM question 
            WHERE question.code = '$questionCode'";
        $result = mysqli_query($this->conn, $query);
        $question = mysqli_fetch_assoc($result);
        return $question;
    }

    public function getActiveQuestion($question){
        $query = "SELECT active 
            FROM question 
            WHERE question.text_q = '$question'";
        $result = mysqli_query($this->conn, $query);
        $question = mysqli_fetch_assoc($result);
        $isActiveQuestion = $question['active'];

        if ($isActiveQuestion == 1) {
            return true;
        }else{
            return false;
        }
    }

    public function getQuestionIdByName($questionName)
    {
        /*
        Return question ID by its name (Part of MyConsole -> Info Button)
        */
        $query = "SELECT question.id_question FROM question WHERE text_q = $questionName";
        $result = mysqli_query($this->conn, $query);
        $questionId = mysqli_fetch_assoc($result);
        return $questionId;
    }

    public function deleteQuestionsByName($questionName)
    {
        /*
        Delete question by name (MyConsole -> Delete Button)
        */
        $query = "DELETE FROM question WHERE text_q = '$questionName'";
        $result = mysqli_query($this->conn, $query);

        if ($result) {
            return true;
        } else {
            return false;
        }
    }

    public function editQuestionByName($name, $data)
    {

        $textQ = $data['text_q'];
        $active = $data['active'];
        $open = $data['open'];
        $idSet = $data['id_set'];
        $creationDate = $data['creation_date'];

        $query = "UPDATE question 
                  SET text_q = '$textQ', active = '$active', open = '$open', id_set = '$idSet', creationDate = '$creationDate' 
                  WHERE text_q = '$name'";

        $result = mysqli_query($this->conn, $query);

        if ($result) {
            return true;
        } else {
            return false;
        }
    }

    public function getQuestionInfo($info){
        $query = "SELECT * FROM question where text_q = '$info'";
        $result = mysqli_query($this->conn, $query);
        $questionsBySet = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $questionInfo[] = $row;
        }
        return $questionInfo;
    }

    public function addQuestion($data)
    {
        $textQ = $data['text_q'];
        $active = $data['active'];
        $open = $data['open'];
        $idSet = $data['id_set'];
        $creationDate = $data['creation_date'];

        $textQ = mysqli_real_escape_string($this->conn, $textQ);
        $active = mysqli_real_escape_string($this->conn, $active);
        $open = mysqli_real_escape_string($this->conn, $open);
        $idSet = mysqli_real_escape_string($this->conn, $idSet);
        $creationDate = mysqli_real_escape_string($this->conn, $creationDate);

        $query = "INSERT INTO question (text_q, active, open, id_set, creationDate) VALUES ('$textQ', '$active', '$open', '$idSet', '$creationDate')";
        $stmt = mysqli_prepare($this->conn, $query);
        $result = mysqli_stmt_execute($stmt);

        if ($result) {
            if (mysqli_affected_rows($this->conn) > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
